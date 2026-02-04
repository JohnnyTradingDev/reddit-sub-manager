let state = { categories: [], subreddits: [], cat: 'all', q: '', sort: 'lastPosted', view: 'card', editId: null, catEditId: null, delTarget: null, dateId: null };
const $ = id => document.getElementById(id);

document.addEventListener('DOMContentLoaded', () => {
    const d = loadData();
    state.categories = d.categories;
    state.subreddits = d.subreddits;
    render();
    bind();
});

function save() { saveData(state.categories, state.subreddits); }
function getName(url) { const m = url.match(/r\/([^\/]+)/); return m ? 'r/' + m[1] : url; }
function parseSub(s) { if (!s) return 0; const n = parseFloat(s.replace(/[^0-9.]/g, '')); return s.toLowerCase().includes('m') ? n * 1e6 : s.toLowerCase().includes('k') ? n * 1e3 : n; }
function fmtDate(d) { if (!d) return '-'; const diff = Math.floor((new Date() - new Date(d)) / 864e5); return diff === 0 ? 'Nay' : diff === 1 ? 'Qua' : diff < 7 ? diff + 'd' : diff < 30 ? Math.floor(diff / 7) + 'w' : new Date(d).toLocaleDateString('vi'); }
function dateClass(d) { if (!d) return 'r'; const diff = Math.floor((new Date() - new Date(d)) / 864e5); return diff <= 1 ? 'g' : diff <= 7 ? 'y' : 'r'; }
function daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().split('T')[0]; }

function render() { renderTabs(); renderContent(); renderCatSelect(); renderMenuCats(); }

function renderTabs() {
    const counts = {};
    state.subreddits.forEach(s => counts[s.category] = (counts[s.category] || 0) + 1);
    let h = `<div class="tab ${state.cat === 'all' ? 'active' : ''}" data-c="all">All<span class="n">${state.subreddits.length}</span></div>`;
    state.categories.forEach(c => h += `<div class="tab ${state.cat === c.id ? 'active' : ''}" data-c="${c.id}">${c.name}<span class="n">${counts[c.id] || 0}</span></div>`);
    $('tabs').innerHTML = h;
}

function renderContent() {
    let list = [...state.subreddits];
    if (state.cat !== 'all') list = list.filter(s => s.category === state.cat);
    if (state.q) { const q = state.q.toLowerCase(); list = list.filter(s => getName(s.url).toLowerCase().includes(q) || (s.type || '').toLowerCase().includes(q)); }
    list.sort((a, b) => {
        if (state.sort === 'lastPosted') { if (!a.lastPosted && !b.lastPosted) return 0; if (!a.lastPosted) return 1; if (!b.lastPosted) return -1; return new Date(b.lastPosted) - new Date(a.lastPosted); }
        if (state.sort === 'subscribers') return parseSub(b.subscribers) - parseSub(a.subscribers);
        return getName(a.url).localeCompare(getName(b.url));
    });
    if (!list.length) { $('content').innerHTML = '<div class="empty"><div>📭</div><h3>Không có</h3><p>Thử từ khóa khác</p></div>'; return; }
    $('content').innerHTML = state.view === 'table' ? renderTable(list) : renderCards(list);
}

function renderCards(list) {
    return list.map(s => {
        const cat = state.categories.find(c => c.id === s.category);
        return `<div class="card">
            <div class="card-top">
                <div class="card-name"><a href="${s.url}" target="_blank">${getName(s.url)}</a></div>
                <div class="card-btns">
                    ${s.chatGPT ? `<a href="${s.chatGPT}" target="_blank" class="link-btn" style="width:28px;padding:0;line-height:28px">💬</a>` : ''}
                    <button onclick="edit(${s.id})">✏️</button>
                    <button onclick="del(${s.id})">🗑</button>
                </div>
            </div>
            <div class="card-meta">
                ${s.type ? `<span class="tag">${s.type}</span>` : ''}
                ${s.subscribers ? `<span class="tag sub">${s.subscribers}</span>` : ''}
                ${cat ? `<span class="tag cat" style="background:${cat.color}20;color:${cat.color}">${cat.name}</span>` : ''}
            </div>
            <div class="card-date">
                <span class="date ${dateClass(s.lastPosted)}">📅 ${fmtDate(s.lastPosted)}</span>
                <button class="date-btn" onclick="openDate(${s.id})">Cập nhật</button>
            </div>
            ${s.nature ? `<div class="card-note">📝 ${s.nature}</div>` : ''}
        </div>`;
    }).join('');
}

function renderTable(list) {
    let h = '<table class="table"><thead><tr><th>Sub</th><th>Type</th><th>📅</th><th></th></tr></thead><tbody>';
    list.forEach(s => {
        h += `<tr>
            <td><a href="${s.url}" target="_blank">${getName(s.url).replace('r/', '')}</a>${s.chatGPT ? ` <a href="${s.chatGPT}" target="_blank">💬</a>` : ''}</td>
            <td>${s.type || '-'}</td>
            <td class="date ${dateClass(s.lastPosted)}" onclick="openDate(${s.id})" style="cursor:pointer">${fmtDate(s.lastPosted)}</td>
            <td class="act"><button onclick="edit(${s.id})">✏</button><button onclick="del(${s.id})">🗑</button></td>
        </tr>`;
    });
    return h + '</tbody></table>';
}

function renderCatSelect() { $('subCat').innerHTML = state.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join(''); }
function renderMenuCats() { $('menuCats').innerHTML = '<h4>Categories</h4><ul>' + state.categories.map(c => `<li><span style="color:${c.color}">${c.name}</span><div><button onclick="editCat('${c.id}')">✏</button><button onclick="delCat('${c.id}')">🗑</button></div></li>`).join('') + '</ul>'; }

function bind() {
    $('tabs').onclick = e => { const t = e.target.closest('.tab'); if (t) { state.cat = t.dataset.c; render(); } };
    $('search').oninput = e => { state.q = e.target.value; renderContent(); };
    $('sort').onchange = e => { state.sort = e.target.value; renderContent(); };
    $('viewToggle').onclick = () => { state.view = state.view === 'card' ? 'table' : 'card'; $('viewToggle').textContent = state.view === 'card' ? '☰' : '▦'; renderContent(); };
    document.querySelectorAll('.nav-btn').forEach(b => b.onclick = () => { document.querySelectorAll('.nav-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); state.cat = b.dataset.cat; render(); });
    $('addBtn').onclick = () => openSub();
    $('menuBtn').onclick = () => $('menuOverlay').classList.add('active');
    $('closeMenu').onclick = () => $('menuOverlay').classList.remove('active');
    $('menuOverlay').onclick = e => { if (e.target === $('menuOverlay')) $('menuOverlay').classList.remove('active'); };
    $('closeSub').onclick = $('cancelSub').onclick = closeSub;
    $('subOverlay').onclick = e => { if (e.target === $('subOverlay')) closeSub(); };
    $('subForm').onsubmit = submitSub;
    $('closeCat').onclick = $('cancelCat').onclick = closeCat;
    $('catOverlay').onclick = e => { if (e.target === $('catOverlay')) closeCat(); };
    $('catForm').onsubmit = submitCat;
    $('closeDate').onclick = () => $('dateOverlay').classList.remove('active');
    $('dateOverlay').onclick = e => { if (e.target === $('dateOverlay')) $('dateOverlay').classList.remove('active'); };
    document.querySelectorAll('.date-grid button').forEach(b => b.onclick = () => { if (state.dateId) { updateDate(state.dateId, daysAgo(+b.dataset.d)); $('dateOverlay').classList.remove('active'); } });
    $('applyDate').onclick = () => { if (state.dateId && $('customDate').value) { updateDate(state.dateId, $('customDate').value); $('dateOverlay').classList.remove('active'); } };
    document.querySelectorAll('.quick-dates button').forEach(b => b.onclick = () => $('subDate').value = daysAgo(+b.dataset.d));
    $('closeDel').onclick = $('cancelDel').onclick = () => $('delOverlay').classList.remove('active');
    $('delOverlay').onclick = e => { if (e.target === $('delOverlay')) $('delOverlay').classList.remove('active'); };
    $('confirmDel').onclick = confirmDel;
}

function openSub(s = null) {
    state.editId = s ? s.id : null;
    $('subTitle').textContent = s ? 'Sửa' : 'Thêm';
    $('subUrl').value = s ? s.url : '';
    $('subType').value = s ? s.type || '' : '';
    $('subSubs').value = s ? s.subscribers || '' : '';
    $('subCat').value = s ? s.category : state.categories[0]?.id || '';
    $('subGPT').value = s ? s.chatGPT || '' : '';
    $('subDate').value = s ? s.lastPosted || '' : '';
    $('subNature').value = s ? s.nature || '' : '';
    $('subOverlay').classList.add('active');
}
function closeSub() { $('subOverlay').classList.remove('active'); $('subForm').reset(); }
function submitSub(e) {
    e.preventDefault();
    const data = { url: $('subUrl').value, type: $('subType').value, subscribers: $('subSubs').value, category: $('subCat').value, chatGPT: $('subGPT').value, lastPosted: $('subDate').value, nature: $('subNature').value };
    if (state.editId) { const i = state.subreddits.findIndex(s => s.id === state.editId); if (i >= 0) state.subreddits[i] = { ...state.subreddits[i], ...data }; }
    else { const maxId = Math.max(...state.subreddits.map(s => s.id), 0); state.subreddits.push({ id: maxId + 1, ...data }); }
    save(); closeSub(); render();
}
function edit(id) { const s = state.subreddits.find(x => x.id === id); if (s) openSub(s); }

function openCategoryModal(c = null) {
    state.catEditId = c ? c.id : null;
    $('catTitle').textContent = c ? 'Sửa' : 'Thêm';
    $('catName').value = c ? c.name : '';
    $('catColor').value = c ? c.color : '#6366f1';
    $('catOverlay').classList.add('active');
    $('menuOverlay').classList.remove('active');
}
function closeCat() { $('catOverlay').classList.remove('active'); $('catForm').reset(); }
function submitCat(e) {
    e.preventDefault();
    const data = { name: $('catName').value, color: $('catColor').value };
    if (state.catEditId) { const i = state.categories.findIndex(c => c.id === state.catEditId); if (i >= 0) state.categories[i] = { ...state.categories[i], ...data }; }
    else { state.categories.push({ id: data.name.toLowerCase().replace(/\s+/g, '-'), ...data }); }
    save(); closeCat(); render();
}
function editCat(id) { const c = state.categories.find(x => x.id === id); if (c) openCategoryModal(c); }
function delCat(id) { const c = state.categories.find(x => x.id === id); if (c) { state.delTarget = { type: 'cat', id }; $('delMsg').textContent = `Xóa "${c.name}"?`; $('delOverlay').classList.add('active'); $('menuOverlay').classList.remove('active'); } }

function openDate(id) { const s = state.subreddits.find(x => x.id === id); if (s) { state.dateId = id; $('dateSub').textContent = getName(s.url); $('customDate').value = s.lastPosted || ''; $('dateOverlay').classList.add('active'); } }
function updateDate(id, d) { const s = state.subreddits.find(x => x.id === id); if (s) { s.lastPosted = d; save(); render(); } }

function del(id) { const s = state.subreddits.find(x => x.id === id); if (s) { state.delTarget = { type: 'sub', id }; $('delMsg').textContent = `Xóa ${getName(s.url)}?`; $('delOverlay').classList.add('active'); } }
function confirmDel() {
    if (!state.delTarget) return;
    if (state.delTarget.type === 'sub') state.subreddits = state.subreddits.filter(s => s.id !== state.delTarget.id);
    else { const def = state.categories.find(c => c.id !== state.delTarget.id); if (def) state.subreddits.forEach(s => { if (s.category === state.delTarget.id) s.category = def.id; }); state.categories = state.categories.filter(c => c.id !== state.delTarget.id); if (state.cat === state.delTarget.id) state.cat = 'all'; }
    save(); $('delOverlay').classList.remove('active'); render();
}

function exportData() {
    let md = '# Reddit Subs Export\n\n';
    state.categories.forEach(c => {
        const subs = state.subreddits.filter(s => s.category === c.id);
        if (!subs.length) return;
        md += `## ${c.name}\n| Sub | Type | Subs | Date | GPT |\n|-----|------|------|------|-----|\n`;
        subs.forEach(s => { md += `| [${getName(s.url)}](${s.url}) | ${s.type || '-'} | ${s.subscribers || '-'} | ${s.lastPosted || '-'} | ${s.chatGPT ? '[Link](' + s.chatGPT + ')' : '-'} |\n`; });
        md += '\n';
    });
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([md])); a.download = 'subs.md'; a.click();
    $('menuOverlay').classList.remove('active');
}

function resetData() { if (confirm('Reset all?')) { localStorage.clear(); location.reload(); } }
