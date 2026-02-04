// App State
let state = {
    categories: [],
    subreddits: [],
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'lastPosted',
    editingSubId: null,
    editingCategoryId: null,
    deleteTarget: null,
    quickDateSubId: null
};

// DOM Elements
const el = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    loadState();
    render();
    bindEvents();
});

function initElements() {
    el.categoryTabs = document.getElementById('categoryTabs');
    el.subredditContainer = document.getElementById('subredditContainer');
    el.searchInput = document.getElementById('searchInput');
    el.sortSelect = document.getElementById('sortSelect');
    el.totalSubs = document.getElementById('totalSubs');
    el.selectedCount = document.getElementById('selectedCount');

    // Modals
    el.modalOverlay = document.getElementById('modalOverlay');
    el.subForm = document.getElementById('subForm');
    el.modalTitle = document.getElementById('modalTitle');
    el.categoryModalOverlay = document.getElementById('categoryModalOverlay');
    el.categoryForm = document.getElementById('categoryForm');
    el.deleteModalOverlay = document.getElementById('deleteModalOverlay');
    el.deleteMessage = document.getElementById('deleteMessage');
    el.menuOverlay = document.getElementById('menuOverlay');
    el.menuCategoryList = document.getElementById('menuCategoryList');

    // Form inputs
    el.subUrl = document.getElementById('subUrl');
    el.subType = document.getElementById('subType');
    el.subSubscribers = document.getElementById('subSubscribers');
    el.subNature = document.getElementById('subNature');
    el.subCategory = document.getElementById('subCategory');
    el.subChatGPT = document.getElementById('subChatGPT');
    el.subLastPosted = document.getElementById('subLastPosted');
    el.categoryName = document.getElementById('categoryName');
    el.categoryColor = document.getElementById('categoryColor');

    // Quick date sheet
    el.quickDateSheet = document.getElementById('quickDateSheet');
    el.sheetSubName = document.getElementById('sheetSubName');
    el.sheetCustomDate = document.getElementById('sheetCustomDate');
}

function loadState() {
    const data = loadData();
    state.categories = data.categories;
    state.subreddits = data.subreddits;
}

function saveState() {
    saveData(state.categories, state.subreddits);
}

// Helpers
function getSubName(url) {
    const match = url.match(/reddit\.com\/r\/([^\/]+)/);
    return match ? `r/${match[1]}` : url;
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
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    return date.toLocaleDateString('vi-VN');
}

function getDateClass(dateStr) {
    if (!dateStr) return 'posted-old';
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return 'posted-today';
    if (diffDays <= 7) return 'posted-week';
    return 'posted-old';
}

function getDateDaysAgo(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
}

// Render
function render() {
    renderCategoryTabs();
    renderSubreddits();
    updateStats();
    populateCategorySelect();
    renderMenuCategories();
}

function renderCategoryTabs() {
    const counts = {};
    state.subreddits.forEach(sub => {
        counts[sub.category] = (counts[sub.category] || 0) + 1;
    });

    let html = `<button class="cat-tab ${state.activeCategory === 'all' ? 'active' : ''}" data-cat="all">Tất cả <span class="count">${state.subreddits.length}</span></button>`;

    state.categories.forEach(cat => {
        html += `<button class="cat-tab ${state.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}" style="border-color: ${cat.color}">${cat.name} <span class="count">${counts[cat.id] || 0}</span></button>`;
    });

    el.categoryTabs.innerHTML = html;
}

function renderSubreddits() {
    let filtered = [...state.subreddits];

    // Filter by category
    if (state.activeCategory !== 'all') {
        filtered = filtered.filter(sub => sub.category === state.activeCategory);
    }

    // Filter by search
    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(sub =>
            getSubName(sub.url).toLowerCase().includes(q) ||
            (sub.type && sub.type.toLowerCase().includes(q)) ||
            (sub.nature && sub.nature.toLowerCase().includes(q))
        );
    }

    // Sort
    filtered.sort((a, b) => {
        switch (state.sortBy) {
            case 'lastPosted':
                // Items without dates go to bottom
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

    if (filtered.length === 0) {
        el.subredditContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <h3>Không tìm thấy</h3>
                <p>Thử từ khóa khác hoặc thêm sub mới</p>
            </div>
        `;
        return;
    }

    el.subredditContainer.innerHTML = filtered.map(sub => {
        const cat = state.categories.find(c => c.id === sub.category);
        const dateClass = getDateClass(sub.lastPosted);

        return `
            <div class="sub-card" data-id="${sub.id}">
                <div class="sub-header">
                    <div class="sub-name">
                        <a href="${sub.url}" target="_blank">${getSubName(sub.url)}</a>
                    </div>
                    <div class="sub-actions-row">
                        <button onclick="editSub(${sub.id})">✏️</button>
                        <button onclick="deleteSub(${sub.id})">🗑️</button>
                    </div>
                </div>
                
                <div class="sub-meta-row">
                    ${sub.type ? `<span class="sub-tag">${sub.type}</span>` : ''}
                    ${sub.subscribers ? `<span class="sub-tag subscribers">👥 ${sub.subscribers}</span>` : ''}
                    ${cat ? `<span class="sub-tag category" style="background: ${cat.color}20; color: ${cat.color}">${cat.name}</span>` : ''}
                </div>
                
                <div class="sub-date-row">
                    <div class="sub-date ${dateClass}">
                        📅 ${formatDate(sub.lastPosted)}
                    </div>
                    <button class="date-update-btn" onclick="openQuickDate(${sub.id})">
                        Cập nhật
                    </button>
                </div>
                
                <div class="sub-links">
                    <a href="${sub.url}" target="_blank" class="sub-link-btn">🔗 Reddit</a>
                    ${sub.chatGPT ? `<a href="${sub.chatGPT}" target="_blank" class="sub-link-btn">💬 ChatGPT</a>` : `<button class="sub-link-btn" onclick="addChatGPT(${sub.id})">➕ ChatGPT</button>`}
                </div>
                
                ${sub.nature ? `<div class="sub-nature">📝 ${sub.nature}</div>` : ''}
            </div>
        `;
    }).join('');
}

function updateStats() {
    el.totalSubs.textContent = state.subreddits.length;
    const filtered = state.activeCategory === 'all'
        ? state.subreddits.length
        : state.subreddits.filter(s => s.category === state.activeCategory).length;
    el.selectedCount.textContent = filtered;
}

function populateCategorySelect() {
    el.subCategory.innerHTML = state.categories.map(cat =>
        `<option value="${cat.id}">${cat.name}</option>`
    ).join('');
}

function renderMenuCategories() {
    el.menuCategoryList.innerHTML = state.categories.map(cat => `
        <li>
            <span style="color: ${cat.color}">${cat.name}</span>
            <div>
                <button onclick="editCategory('${cat.id}')" style="background:none;border:none;cursor:pointer">✏️</button>
                <button onclick="deleteCategory('${cat.id}')" style="background:none;border:none;cursor:pointer">🗑️</button>
            </div>
        </li>
    `).join('');
}

// Events
function bindEvents() {
    // Category tabs
    el.categoryTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.cat-tab');
        if (tab) {
            state.activeCategory = tab.dataset.cat;
            render();
        }
    });

    // Search
    el.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderSubreddits();
    });

    // Sort
    el.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderSubreddits();
    });

    // Bottom nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const view = item.dataset.view;
            if (view === 'add') {
                openSubModal();
            } else {
                document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                item.classList.add('active');
                state.activeCategory = view;
                render();
            }
        });
    });

    // Add Sub button
    document.getElementById('addSubBtn').addEventListener('click', () => openSubModal());

    // Menu
    document.getElementById('menuBtn').addEventListener('click', () => {
        el.menuOverlay.classList.add('active');
    });
    document.getElementById('closeMenu').addEventListener('click', closeMenu);
    el.menuOverlay.addEventListener('click', (e) => {
        if (e.target === el.menuOverlay) closeMenu();
    });

    // Modals
    document.getElementById('closeModal').addEventListener('click', closeSubModal);
    document.getElementById('cancelBtn').addEventListener('click', closeSubModal);
    document.getElementById('closeCategoryModal').addEventListener('click', closeCategoryModal);
    document.getElementById('cancelCategoryBtn').addEventListener('click', closeCategoryModal);
    document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);
    document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);
    document.getElementById('confirmDeleteBtn').addEventListener('click', handleDelete);

    // Forms
    el.subForm.addEventListener('submit', handleSubSubmit);
    el.categoryForm.addEventListener('submit', handleCategorySubmit);

    // Quick dates in form
    document.querySelectorAll('.quick-date').forEach(btn => {
        btn.addEventListener('click', () => {
            el.subLastPosted.value = getDateDaysAgo(parseInt(btn.dataset.days));
        });
    });

    // Quick date sheet
    document.getElementById('closeSheet').addEventListener('click', closeQuickDate);
    el.quickDateSheet.addEventListener('click', (e) => {
        if (e.target === el.quickDateSheet) closeQuickDate();
    });

    document.querySelectorAll('.quick-date-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (state.quickDateSubId) {
                updateSubDate(state.quickDateSubId, getDateDaysAgo(parseInt(btn.dataset.days)));
                closeQuickDate();
            }
        });
    });

    document.getElementById('applyCustomDate').addEventListener('click', () => {
        if (state.quickDateSubId && el.sheetCustomDate.value) {
            updateSubDate(state.quickDateSubId, el.sheetCustomDate.value);
            closeQuickDate();
        }
    });

    // Modal overlay clicks
    el.modalOverlay.addEventListener('click', (e) => {
        if (e.target === el.modalOverlay) closeSubModal();
    });
    el.categoryModalOverlay.addEventListener('click', (e) => {
        if (e.target === el.categoryModalOverlay) closeCategoryModal();
    });
    el.deleteModalOverlay.addEventListener('click', (e) => {
        if (e.target === el.deleteModalOverlay) closeDeleteModal();
    });
}

// Modal Functions
function openSubModal(sub = null) {
    state.editingSubId = sub ? sub.id : null;
    el.modalTitle.textContent = sub ? 'Sửa Subreddit' : 'Thêm Subreddit';

    el.subUrl.value = sub ? sub.url : '';
    el.subType.value = sub ? sub.type || '' : '';
    el.subSubscribers.value = sub ? sub.subscribers || '' : '';
    el.subNature.value = sub ? sub.nature || '' : '';
    el.subCategory.value = sub ? sub.category : state.categories[0]?.id || '';
    el.subChatGPT.value = sub ? sub.chatGPT || '' : '';
    el.subLastPosted.value = sub ? sub.lastPosted || '' : '';

    el.modalOverlay.classList.add('active');
}

function closeSubModal() {
    el.modalOverlay.classList.remove('active');
    state.editingSubId = null;
    el.subForm.reset();
}

function openCategoryModal(cat = null) {
    state.editingCategoryId = cat ? cat.id : null;
    document.getElementById('categoryModalTitle').textContent = cat ? 'Sửa Category' : 'Thêm Category';

    el.categoryName.value = cat ? cat.name : '';
    el.categoryColor.value = cat ? cat.color : '#6366f1';

    el.categoryModalOverlay.classList.add('active');
    closeMenu();
}

function closeCategoryModal() {
    el.categoryModalOverlay.classList.remove('active');
    state.editingCategoryId = null;
    el.categoryForm.reset();
}

function closeDeleteModal() {
    el.deleteModalOverlay.classList.remove('active');
    state.deleteTarget = null;
}

function closeMenu() {
    el.menuOverlay.classList.remove('active');
}

function openQuickDate(id) {
    const sub = state.subreddits.find(s => s.id === id);
    if (sub) {
        state.quickDateSubId = id;
        el.sheetSubName.textContent = getSubName(sub.url);
        el.sheetCustomDate.value = sub.lastPosted || '';
        el.quickDateSheet.classList.add('active');
    }
}

function closeQuickDate() {
    el.quickDateSheet.classList.remove('active');
    state.quickDateSubId = null;
}

function updateSubDate(id, date) {
    const sub = state.subreddits.find(s => s.id === id);
    if (sub) {
        sub.lastPosted = date;
        saveState();
        render();
    }
}

function addChatGPT(id) {
    const link = prompt('Nhập link ChatGPT:');
    if (link) {
        const sub = state.subreddits.find(s => s.id === id);
        if (sub) {
            sub.chatGPT = link;
            saveState();
            render();
        }
    }
}

// CRUD
function handleSubSubmit(e) {
    e.preventDefault();

    const subData = {
        url: el.subUrl.value,
        type: el.subType.value,
        subscribers: el.subSubscribers.value,
        nature: el.subNature.value,
        category: el.subCategory.value,
        chatGPT: el.subChatGPT.value,
        lastPosted: el.subLastPosted.value
    };

    if (state.editingSubId) {
        const index = state.subreddits.findIndex(s => s.id === state.editingSubId);
        if (index !== -1) {
            state.subreddits[index] = { ...state.subreddits[index], ...subData };
        }
    } else {
        const maxId = Math.max(...state.subreddits.map(s => s.id), 0);
        state.subreddits.push({ id: maxId + 1, ...subData });
    }

    saveState();
    closeSubModal();
    render();
}

function handleCategorySubmit(e) {
    e.preventDefault();

    const catData = {
        name: el.categoryName.value,
        color: el.categoryColor.value
    };

    if (state.editingCategoryId) {
        const index = state.categories.findIndex(c => c.id === state.editingCategoryId);
        if (index !== -1) {
            state.categories[index] = { ...state.categories[index], ...catData };
        }
    } else {
        const id = catData.name.toLowerCase().replace(/\s+/g, '-');
        state.categories.push({ id, ...catData });
    }

    saveState();
    closeCategoryModal();
    render();
}

function editSub(id) {
    const sub = state.subreddits.find(s => s.id === id);
    if (sub) openSubModal(sub);
}

function deleteSub(id) {
    const sub = state.subreddits.find(s => s.id === id);
    if (sub) {
        state.deleteTarget = { type: 'sub', id };
        el.deleteMessage.textContent = `Xóa ${getSubName(sub.url)}?`;
        el.deleteModalOverlay.classList.add('active');
    }
}

function editCategory(id) {
    const cat = state.categories.find(c => c.id === id);
    if (cat) openCategoryModal(cat);
}

function deleteCategory(id) {
    const cat = state.categories.find(c => c.id === id);
    if (cat) {
        state.deleteTarget = { type: 'category', id };
        el.deleteMessage.textContent = `Xóa category "${cat.name}"?`;
        el.deleteModalOverlay.classList.add('active');
        closeMenu();
    }
}

function handleDelete() {
    if (!state.deleteTarget) return;

    if (state.deleteTarget.type === 'sub') {
        state.subreddits = state.subreddits.filter(s => s.id !== state.deleteTarget.id);
    } else if (state.deleteTarget.type === 'category') {
        const defaultCat = state.categories.find(c => c.id !== state.deleteTarget.id);
        if (defaultCat) {
            state.subreddits.forEach(s => {
                if (s.category === state.deleteTarget.id) {
                    s.category = defaultCat.id;
                }
            });
        }
        state.categories = state.categories.filter(c => c.id !== state.deleteTarget.id);
        if (state.activeCategory === state.deleteTarget.id) {
            state.activeCategory = 'all';
        }
    }

    saveState();
    closeDeleteModal();
    render();
}

// Export & Reset
function exportData() {
    let markdown = '# Reddit Sub Manager Export\n\n';

    state.categories.forEach(cat => {
        const subs = state.subreddits.filter(s => s.category === cat.id);
        if (subs.length === 0) return;

        markdown += `## ${cat.name}\n\n`;
        markdown += '| Subreddit | Type | Subscribers | Last Posted | ChatGPT |\n';
        markdown += '|-----------|------|-------------|-------------|----------|\n';

        subs.forEach(sub => {
            const chatLink = sub.chatGPT ? `[Link](${sub.chatGPT})` : '-';
            markdown += `| [${getSubName(sub.url)}](${sub.url}) | ${sub.type || ''} | ${sub.subscribers || ''} | ${sub.lastPosted || '-'} | ${chatLink} |\n`;
        });

        markdown += '\n';
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subreddits-export.md';
    a.click();
    URL.revokeObjectURL(url);
    closeMenu();
}

function resetData() {
    if (confirm('Reset tất cả data về mặc định?')) {
        localStorage.removeItem('reddit_categories');
        localStorage.removeItem('reddit_subreddits');
        location.reload();
    }
}
