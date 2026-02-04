// ========== STATE ==========
let state = {
    categories: [],
    subreddits: [],
    activeCat: 'all',
    searchQuery: '',
    sortBy: 'lastPosted',
    viewMode: 'card', // card or table
    editSubId: null,
    editCatId: null,
    deleteTarget: null,
    quickDateId: null
};

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    render();
    bindEvents();
});

function loadState() {
    const data = loadData();
    state.categories = data.categories;
    state.subreddits = data.subreddits;
}

function saveState() {
    saveData(state.categories, state.subreddits);
}

// ========== HELPERS ==========
function $(id) { return document.getElementById(id); }

function getSubName(url) {
    const match = url.match(/reddit\.com\/r\/([^\/]+)/);
    return match ? 'r/' + match[1] : url;
}

function parseSubscribers(str) {
    if (!str) return 0;
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    if (str.toLowerCase().includes('m')) return num * 1000000;
    if (str.toLowerCase().includes('k')) return num * 1000;
    return num;
}

function formatDate(dateStr) {
    if (!dateStr) return 'Chưa đăng';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diff === 0) return 'Hôm nay';
    if (diff === 1) return 'Hôm qua';
    if (diff < 7) return diff + ' ngày';
    if (diff < 30) return Math.floor(diff / 7) + ' tuần';
    return date.toLocaleDateString('vi-VN');
}

function getDateColorClass(dateStr) {
    if (!dateStr) return 'red';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diff <= 1) return 'green';
    if (diff <= 7) return 'yellow';
    return 'red';
}

function getDaysAgo(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
}

// ========== RENDER ==========
function render() {
    renderTabs();
    renderContent();
    renderCategorySelect();
    renderMenuCategories();
    updateStats();
}

function renderTabs() {
    const counts = {};
    state.subreddits.forEach(s => {
        counts[s.category] = (counts[s.category] || 0) + 1;
    });

    let html = `<div class="tab ${state.activeCat === 'all' ? 'active' : ''}" data-cat="all">
        Tất cả <span class="count">${state.subreddits.length}</span>
    </div>`;

    state.categories.forEach(cat => {
        html += `<div class="tab ${state.activeCat === cat.id ? 'active' : ''}" data-cat="${cat.id}">
            ${cat.name} <span class="count">${counts[cat.id] || 0}</span>
        </div>`;
    });

    $('tabs').innerHTML = html;
}

function renderContent() {
    let list = [...state.subreddits];

    // Filter by category
    if (state.activeCat !== 'all') {
        list = list.filter(s => s.category === state.activeCat);
    }

    // Filter by search
    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        list = list.filter(s =>
            getSubName(s.url).toLowerCase().includes(q) ||
            (s.type || '').toLowerCase().includes(q) ||
            (s.nature || '').toLowerCase().includes(q)
        );
    }

    // Sort
    list.sort((a, b) => {
        switch (state.sortBy) {
            case 'lastPosted':
                if (!a.lastPosted && !b.lastPosted) return 0;
                if (!a.lastPosted) return 1;
                if (!b.lastPosted) return -1;
                return new Date(b.lastPosted) - new Date(a.lastPosted);
            case 'subscribers':
                return parseSubscribers(b.subscribers) - parseSubscribers(a.subscribers);
            default:
                return getSubName(a.url).localeCompare(getSubName(b.url));
        }
    });

    if (list.length === 0) {
        $('mainContent').innerHTML = `
            <div class="empty-state">
                <div class="icon">📭</div>
                <h3>Không tìm thấy</h3>
                <p>Thử từ khóa khác hoặc thêm sub mới</p>
            </div>
        `;
        return;
    }

    $('mainContent').innerHTML = state.viewMode === 'table'
        ? renderTable(list)
        : renderCards(list);
}

function renderCards(list) {
    return list.map(sub => {
        const cat = state.categories.find(c => c.id === sub.category);
        const dateClass = getDateColorClass(sub.lastPosted);

        return `
            <div class="sub-card">
                <div class="card-header">
                    <div class="card-name">
                        <a href="${sub.url}" target="_blank">${getSubName(sub.url)}</a>
                    </div>
                    <div class="card-actions">
                        ${sub.chatGPT ? `<a href="${sub.chatGPT}" target="_blank" style="width:30px;height:30px;background:var(--card-hover);border-radius:8px;display:flex;align-items:center;justify-content:center;text-decoration:none">💬</a>` : ''}
                        <button onclick="openEditSub(${sub.id})">✏️</button>
                        <button onclick="openDeleteSub(${sub.id})">🗑</button>
                    </div>
                </div>
                
                <div class="card-tags">
                    ${sub.type ? `<span class="tag type">${sub.type}</span>` : ''}
                    ${sub.subscribers ? `<span class="tag subs">👥 ${sub.subscribers}</span>` : ''}
                    ${cat ? `<span class="tag cat" style="background: ${cat.color}22; color: ${cat.color}">${cat.name}</span>` : ''}
                </div>
                
                <div class="card-footer">
                    <div class="card-date ${dateClass}">
                        📅 ${formatDate(sub.lastPosted)}
                    </div>
                    <button class="update-btn" onclick="openQuickDate(${sub.id})">Cập nhật</button>
                </div>
                
                ${sub.nature ? `<div class="card-note">📝 ${sub.nature}</div>` : ''}
            </div>
        `;
    }).join('');
}

function renderTable(list) {
    let html = `
        <div class="table-wrap">
            <table class="sub-table">
                <thead>
                    <tr>
                        <th>Subreddit</th>
                        <th>Type</th>
                        <th>📅</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
    `;

    list.forEach(sub => {
        const dateClass = getDateColorClass(sub.lastPosted);
        html += `
            <tr>
                <td>
                    <a href="${sub.url}" target="_blank">${getSubName(sub.url).replace('r/', '')}</a>
                    ${sub.chatGPT ? ` <a href="${sub.chatGPT}" target="_blank">💬</a>` : ''}
                </td>
                <td>${sub.type || '-'}</td>
                <td class="date-cell ${dateClass}" onclick="openQuickDate(${sub.id})">${formatDate(sub.lastPosted)}</td>
                <td class="actions">
                    <button onclick="openEditSub(${sub.id})">✏️</button>
                    <button onclick="openDeleteSub(${sub.id})">🗑</button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table></div>';
    return html;
}

function renderCategorySelect() {
    $('fCat').innerHTML = state.categories.map(c =>
        `<option value="${c.id}">${c.name}</option>`
    ).join('');
}

function renderMenuCategories() {
    $('catList').innerHTML = state.categories.map(c => `
        <li>
            <span style="color: ${c.color}">${c.name}</span>
            <div>
                <button onclick="openEditCat('${c.id}')">✏️</button>
                <button onclick="openDeleteCat('${c.id}')">🗑</button>
            </div>
        </li>
    `).join('');
}

function updateStats() {
    const filtered = state.activeCat === 'all'
        ? state.subreddits.length
        : state.subreddits.filter(s => s.category === state.activeCat).length;
    $('totalCount').textContent = filtered;
    $('viewLabel').textContent = state.viewMode === 'card' ? 'Card view' : 'Table view';
}

// ========== EVENT BINDINGS ==========
function bindEvents() {
    // Tabs
    $('tabs').addEventListener('click', e => {
        const tab = e.target.closest('.tab');
        if (tab) {
            state.activeCat = tab.dataset.cat;
            render();
        }
    });

    // Search
    $('searchInput').addEventListener('input', e => {
        state.searchQuery = e.target.value;
        renderContent();
    });

    // Sort
    $('sortSelect').addEventListener('change', e => {
        state.sortBy = e.target.value;
        renderContent();
    });

    // View toggle
    $('viewBtn').addEventListener('click', () => {
        state.viewMode = state.viewMode === 'card' ? 'table' : 'card';
        $('viewBtn').textContent = state.viewMode === 'card' ? '☰' : '▦';
        render();
    });

    // Bottom nav
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.activeCat = btn.dataset.cat;
            render();
        });
    });

    // Header buttons
    $('addBtn').addEventListener('click', () => openAddSub());
    $('menuBtn').addEventListener('click', () => $('menuOverlay').classList.add('active'));

    // Menu
    $('closeMenuBtn').addEventListener('click', closeMenu);
    $('menuOverlay').addEventListener('click', e => {
        if (e.target === $('menuOverlay')) closeMenu();
    });
    $('addCatBtn').addEventListener('click', () => openAddCat());
    $('exportBtn').addEventListener('click', exportData);
    $('resetBtn').addEventListener('click', resetData);

    // Sub Modal
    $('closeSubBtn').addEventListener('click', closeSubModal);
    $('cancelSubBtn').addEventListener('click', closeSubModal);
    $('subOverlay').addEventListener('click', e => {
        if (e.target === $('subOverlay')) closeSubModal();
    });
    $('subForm').addEventListener('submit', handleSubSubmit);

    // Quick date buttons in form
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $('fDate').value = getDaysAgo(parseInt(btn.dataset.days));
        });
    });

    // Category Modal
    $('closeCatBtn').addEventListener('click', closeCatModal);
    $('cancelCatBtn').addEventListener('click', closeCatModal);
    $('catOverlay').addEventListener('click', e => {
        if (e.target === $('catOverlay')) closeCatModal();
    });
    $('catForm').addEventListener('submit', handleCatSubmit);

    // Quick Date Sheet
    $('closeDateBtn').addEventListener('click', closeDateSheet);
    $('dateOverlay').addEventListener('click', e => {
        if (e.target === $('dateOverlay')) closeDateSheet();
    });
    document.querySelectorAll('.date-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            if (state.quickDateId) {
                updateSubDate(state.quickDateId, getDaysAgo(parseInt(btn.dataset.days)));
                closeDateSheet();
            }
        });
    });
    $('applyDateBtn').addEventListener('click', () => {
        if (state.quickDateId && $('customDateInput').value) {
            updateSubDate(state.quickDateId, $('customDateInput').value);
            closeDateSheet();
        }
    });

    // Delete Modal
    $('closeDelBtn').addEventListener('click', closeDelModal);
    $('cancelDelBtn').addEventListener('click', closeDelModal);
    $('delOverlay').addEventListener('click', e => {
        if (e.target === $('delOverlay')) closeDelModal();
    });
    $('confirmDelBtn').addEventListener('click', handleDelete);
}

// ========== MODAL FUNCTIONS ==========

// --- Menu ---
function closeMenu() {
    $('menuOverlay').classList.remove('active');
}

// --- Sub Modal ---
function openAddSub() {
    state.editSubId = null;
    $('subModalTitle').textContent = '➕ Thêm Subreddit';
    $('fUrl').value = '';
    $('fType').value = '';
    $('fSubs').value = '';
    $('fCat').value = state.categories[0]?.id || '';
    $('fGpt').value = '';
    $('fDate').value = '';
    $('fNote').value = '';
    $('subOverlay').classList.add('active');
}

function openEditSub(id) {
    const sub = state.subreddits.find(s => s.id === id);
    if (!sub) return;

    state.editSubId = id;
    $('subModalTitle').textContent = '✏️ Sửa Subreddit';
    $('fUrl').value = sub.url;
    $('fType').value = sub.type || '';
    $('fSubs').value = sub.subscribers || '';
    $('fCat').value = sub.category;
    $('fGpt').value = sub.chatGPT || '';
    $('fDate').value = sub.lastPosted || '';
    $('fNote').value = sub.nature || '';
    $('subOverlay').classList.add('active');
}

function closeSubModal() {
    $('subOverlay').classList.remove('active');
    $('subForm').reset();
    state.editSubId = null;
}

function handleSubSubmit(e) {
    e.preventDefault();

    const data = {
        url: $('fUrl').value,
        type: $('fType').value,
        subscribers: $('fSubs').value,
        category: $('fCat').value,
        chatGPT: $('fGpt').value,
        lastPosted: $('fDate').value,
        nature: $('fNote').value
    };

    if (state.editSubId) {
        const idx = state.subreddits.findIndex(s => s.id === state.editSubId);
        if (idx >= 0) {
            state.subreddits[idx] = { ...state.subreddits[idx], ...data };
        }
    } else {
        const maxId = Math.max(...state.subreddits.map(s => s.id), 0);
        state.subreddits.push({ id: maxId + 1, ...data });
    }

    saveState();
    closeSubModal();
    render();
}

// --- Category Modal ---
function openAddCat() {
    closeMenu();
    state.editCatId = null;
    $('catModalTitle').textContent = '➕ Thêm Category';
    $('fCatName').value = '';
    $('fCatColor').value = '#6366f1';
    $('catOverlay').classList.add('active');
}

function openEditCat(id) {
    closeMenu();
    const cat = state.categories.find(c => c.id === id);
    if (!cat) return;

    state.editCatId = id;
    $('catModalTitle').textContent = '✏️ Sửa Category';
    $('fCatName').value = cat.name;
    $('fCatColor').value = cat.color;
    $('catOverlay').classList.add('active');
}

function closeCatModal() {
    $('catOverlay').classList.remove('active');
    $('catForm').reset();
    state.editCatId = null;
}

function handleCatSubmit(e) {
    e.preventDefault();

    const data = {
        name: $('fCatName').value,
        color: $('fCatColor').value
    };

    if (state.editCatId) {
        const idx = state.categories.findIndex(c => c.id === state.editCatId);
        if (idx >= 0) {
            state.categories[idx] = { ...state.categories[idx], ...data };
        }
    } else {
        const id = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        state.categories.push({ id, ...data });
    }

    saveState();
    closeCatModal();
    render();
}

// --- Quick Date Sheet ---
function openQuickDate(id) {
    const sub = state.subreddits.find(s => s.id === id);
    if (!sub) return;

    state.quickDateId = id;
    $('dateSubName').textContent = getSubName(sub.url);
    $('customDateInput').value = sub.lastPosted || '';
    $('dateOverlay').classList.add('active');
}

function closeDateSheet() {
    $('dateOverlay').classList.remove('active');
    state.quickDateId = null;
}

function updateSubDate(id, date) {
    const sub = state.subreddits.find(s => s.id === id);
    if (sub) {
        sub.lastPosted = date;
        saveState();
        render();
    }
}

// --- Delete Modal ---
function openDeleteSub(id) {
    const sub = state.subreddits.find(s => s.id === id);
    if (!sub) return;

    state.deleteTarget = { type: 'sub', id };
    $('delMessage').textContent = `Bạn có chắc muốn xóa ${getSubName(sub.url)}?`;
    $('delOverlay').classList.add('active');
}

function openDeleteCat(id) {
    closeMenu();
    const cat = state.categories.find(c => c.id === id);
    if (!cat) return;

    const count = state.subreddits.filter(s => s.category === id).length;
    state.deleteTarget = { type: 'cat', id };
    $('delMessage').textContent = `Xóa category "${cat.name}"? (${count} subs sẽ chuyển sang category khác)`;
    $('delOverlay').classList.add('active');
}

function closeDelModal() {
    $('delOverlay').classList.remove('active');
    state.deleteTarget = null;
}

function handleDelete() {
    if (!state.deleteTarget) return;

    if (state.deleteTarget.type === 'sub') {
        state.subreddits = state.subreddits.filter(s => s.id !== state.deleteTarget.id);
    } else {
        // Move subs to first available category
        const defaultCat = state.categories.find(c => c.id !== state.deleteTarget.id);
        if (defaultCat) {
            state.subreddits.forEach(s => {
                if (s.category === state.deleteTarget.id) {
                    s.category = defaultCat.id;
                }
            });
        }
        state.categories = state.categories.filter(c => c.id !== state.deleteTarget.id);
        if (state.activeCat === state.deleteTarget.id) {
            state.activeCat = 'all';
        }
    }

    saveState();
    closeDelModal();
    render();
}

// ========== EXPORT & RESET ==========
function exportData() {
    closeMenu();

    let md = '# Reddit Sub Manager Export\n\n';
    md += `Exported: ${new Date().toLocaleString('vi-VN')}\n\n`;

    state.categories.forEach(cat => {
        const subs = state.subreddits.filter(s => s.category === cat.id);
        if (subs.length === 0) return;

        md += `## ${cat.name}\n\n`;
        md += '| Sub | Type | Subs | Last Posted | ChatGPT |\n';
        md += '|-----|------|------|-------------|----------|\n';

        subs.forEach(s => {
            const gpt = s.chatGPT ? `[Link](${s.chatGPT})` : '-';
            md += `| [${getSubName(s.url)}](${s.url}) | ${s.type || '-'} | ${s.subscribers || '-'} | ${s.lastPosted || '-'} | ${gpt} |\n`;
        });

        md += '\n';
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reddit-subs-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
}

function resetData() {
    closeMenu();
    if (confirm('⚠️ Reset tất cả data về mặc định?\n\nDữ liệu hiện tại sẽ bị xóa!')) {
        localStorage.removeItem('reddit_categories');
        localStorage.removeItem('reddit_subreddits');
        location.reload();
    }
}
