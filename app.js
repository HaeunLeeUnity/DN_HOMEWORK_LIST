/* ========================================
   Dragon Nest Homework Checklist - App
   ======================================== */

// ── Default Task Data ──────────────────────────────────────────────────────

const DEFAULT_DAILY_TASKS = [
  { id: 'd1', name: '피로도 소진',  category: '일일', tags: [{ text: '피로도', type: 'type' }], maxCount: 1 },
  { id: 'd2', name: '피로회복제1', category: '일일', tags: [{ text: '피로도', type: 'type' }], maxCount: 1 },
  { id: 'd3', name: '피로회복제2', category: '일일', tags: [{ text: '피로도', type: 'type' }], maxCount: 1 },
];

const DEFAULT_WEEKLY_TASKS = [
  // 하위 컨텐츠
  { id: 'w1',  name: '미노타우루스 네스트',       category: '하위 컨텐츠', tags: [{ text: '네스트', type: 'type' }], maxCount: 1 },
  { id: 'w2',  name: '켈베로스 네스트 노말',      category: '하위 컨텐츠', tags: [{ text: '네스트', type: 'type' }], maxCount: 1 },
  { id: 'w3',  name: '켈베로스 네스트 헬',        category: '하위 컨텐츠', tags: [{ text: '네스트', type: 'type' }, { text: '헬', type: 'reward' }], maxCount: 1 },
  // 지옥 8사
  { id: 'w4',  name: '만티코어 네스트 노말',      category: '지옥 8사', tags: [{ text: '네스트', type: 'type' }], maxCount: 1 },
  { id: 'w5',  name: '만티코어 네스트 헬',        category: '지옥 8사', tags: [{ text: '네스트', type: 'type' }, { text: '헬', type: 'reward' }], maxCount: 1 },
  { id: 'w6',  name: '아포칼립스 네스트 노말',    category: '지옥 8사', tags: [{ text: '네스트', type: 'type' }], maxCount: 1 },
  { id: 'w7',  name: '아포칼립스 네스트 헬',      category: '지옥 8사', tags: [{ text: '네스트', type: 'type' }, { text: '헬', type: 'reward' }], maxCount: 1 },
  // 씨드래곤
  { id: 'w8',  name: '씨드래곤 네스트 외곽',      category: '씨드래곤', tags: [{ text: '네스트', type: 'type' }], maxCount: 1 },
  { id: 'w9',  name: '씨드래곤 네스트 코어',      category: '씨드래곤', tags: [{ text: '네스트', type: 'type' }], maxCount: 1 },
  // 하이엔드 컨텐츠
  { id: 'w10', name: '씨드 클래식',               category: '하이엔드 컨텐츠', tags: [{ text: '하이엔드', type: 'reward' }], maxCount: 1 },
  { id: 'w11', name: '씨드래곤 하드코어',          category: '하이엔드 컨텐츠', tags: [{ text: '하이엔드', type: 'reward' }, { text: 'HC', type: 'type' }], maxCount: 1 },
  // 탈것 컨텐츠
  { id: 'w12', name: '아포칼립스 네스트 챌린지',  category: '탈것 컨텐츠', tags: [{ text: '챌린지', type: 'type' }], maxCount: 1 },
  { id: 'w13', name: '켈베로스 네스트 챌린지',    category: '탈것 컨텐츠', tags: [{ text: '챌린지', type: 'type' }], maxCount: 1 },
  // 원더풀 테마파크
  { id: 'w14', name: '보스러쉬',                  category: '원더풀 테마파크', tags: [{ text: '테마파크', type: 'type' }], maxCount: 1 },
  { id: 'w15', name: '페르시아고블',              category: '원더풀 테마파크', tags: [{ text: '테마파크', type: 'type' }], maxCount: 1 },
  { id: 'w18', name: '김오크의 역습',             category: '원더풀 테마파크', tags: [{ text: '테마파크', type: 'type' }], maxCount: 1 },
  { id: 'w19', name: '수도원 보물창고',            category: '원더풀 테마파크', tags: [{ text: '테마파크', type: 'type' }], maxCount: 1 },
  { id: 'w20', name: '험난한 길',                 category: '원더풀 테마파크', tags: [{ text: '테마파크', type: 'type' }], maxCount: 1 },
  // 기타
  { id: 'w16', name: '연회장',                    category: '기타', tags: [{ text: '기타', type: 'type' }], maxCount: 1 },
  { id: 'w17', name: '질투',                      category: '기타', tags: [{ text: '기타', type: 'type' }], maxCount: 1 },
  { id: 'w21', name: '혼돈의 틈 카말라',           category: '기타', tags: [{ text: '기타', type: 'type' }], maxCount: 1 },
  { id: 'w22', name: '혼돈의 틈 바이라',           category: '기타', tags: [{ text: '기타', type: 'type' }], maxCount: 1 },
];

// ── Storage Helpers ────────────────────────────────────────────────────────

const STORAGE_KEY = 'dn_checklist_v1';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveState() {
  const toSave = {
    ...state,
    disabled: Object.fromEntries(
      Object.entries(state.disabled).map(([k, v]) => [k, [...v]])
    ),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

// ── App State ──────────────────────────────────────────────────────────────

let state = {
  characters: [],           // [{ id, name, classKey }]
  activeCharId: null,
  checks: {},               // { charId: { taskId: count } }
  disabled: {},             // { charId: Set<taskId> } — stored as arrays in JSON
  customTasks: [],          // future: user-added tasks
  lastDailyReset: null,     // ISO string
  lastWeeklyReset: null,    // ISO string
};

function initState() {
  const saved = loadState();
  if (saved) {
    state = {
      ...state,
      ...saved,
      disabled: Object.fromEntries(
        Object.entries(saved.disabled || {}).map(([k, v]) => [k, new Set(v)])
      ),
    };
  }
  // activeCharId가 없거나 유효하지 않으면 첫 캐릭터로 초기화
  if (!state.activeCharId || !state.characters.find(c => c.id === state.activeCharId)) {
    state.activeCharId = state.characters[0]?.id ?? null;
  }
  checkResets();
}

// ── Reset Logic ────────────────────────────────────────────────────────────

function getResetTimes() {
  const now = new Date();

  // Daily: next 09:00
  const nextDaily = new Date(now);
  nextDaily.setHours(9, 0, 0, 0);
  if (now >= nextDaily) nextDaily.setDate(nextDaily.getDate() + 1);

  // Weekly: next Saturday 09:00
  const nextWeekly = new Date(now);
  nextWeekly.setHours(9, 0, 0, 0);
  const day = nextWeekly.getDay(); // 0=Sun,6=Sat
  const daysUntilSat = (6 - day + 7) % 7 || 7;
  nextWeekly.setDate(nextWeekly.getDate() + daysUntilSat);

  return { nextDaily, nextWeekly };
}

function checkResets() {
  const now = new Date();

  // Daily reset check
  const todayReset = new Date(now);
  todayReset.setHours(9, 0, 0, 0);
  const lastDaily = state.lastDailyReset ? new Date(state.lastDailyReset) : null;

  if (!lastDaily || lastDaily < todayReset && now >= todayReset) {
    // Reset all daily tasks
    for (const charId in state.checks) {
      DEFAULT_DAILY_TASKS.forEach(t => {
        if (state.checks[charId]) delete state.checks[charId][t.id];
      });
    }
    state.lastDailyReset = now.toISOString();
  }

  // Weekly reset check: last Saturday 09:00
  const lastWeekly = state.lastWeeklyReset ? new Date(state.lastWeeklyReset) : null;
  const thisSatReset = new Date(now);
  thisSatReset.setHours(9, 0, 0, 0);
  const dayOfWeek = thisSatReset.getDay();
  thisSatReset.setDate(thisSatReset.getDate() - ((dayOfWeek + 1) % 7)); // go back to last Saturday

  if (!lastWeekly || lastWeekly < thisSatReset && now >= thisSatReset) {
    for (const charId in state.checks) {
      DEFAULT_WEEKLY_TASKS.forEach(t => {
        if (state.checks[charId]) delete state.checks[charId][t.id];
      });
    }
    state.lastWeeklyReset = now.toISOString();
  }

  saveState();
}

// ── Timer Display ──────────────────────────────────────────────────────────

function formatDuration(ms) {
  if (ms <= 0) return '00:00:00';
  const totalSecs = Math.floor(ms / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
}

function formatDurationWeekly(ms) {
  if (ms <= 0) return '00:00:00:00';
  const totalSecs = Math.floor(ms / 1000);
  const d = Math.floor(totalSecs / 86400);
  const h = Math.floor((totalSecs % 86400) / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  if (d > 0) return `${d}일 ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
}

function updateTimers() {
  const now = Date.now();
  const { nextDaily, nextWeekly } = getResetTimes();
  document.getElementById('daily-timer').textContent = formatDuration(nextDaily - now);
  document.getElementById('weekly-timer').textContent = formatDurationWeekly(nextWeekly - now);
}

// ── Check State Helpers ────────────────────────────────────────────────────

function getCheck(charId, taskId) {
  return state.checks[charId]?.[taskId] ?? 0;
}

function setCheck(charId, taskId, count) {
  if (!state.checks[charId]) state.checks[charId] = {};
  state.checks[charId][taskId] = count;
  saveState();
}

function isDisabled(charId, taskId) {
  return state.disabled[charId]?.has(taskId) ?? false;
}

function toggleDisabled(charId, taskId) {
  if (!state.disabled[charId]) state.disabled[charId] = new Set();
  if (state.disabled[charId].has(taskId)) {
    state.disabled[charId].delete(taskId);
  } else {
    state.disabled[charId].add(taskId);
  }
  saveState();
}

// ── Effective Tasks per Character ─────────────────────────────────────────

function getActiveTasks(charId, tasks) {
  if (!charId) return tasks;
  return tasks.filter(t => !isDisabled(charId, t.id));
}

// ── Render Functions ───────────────────────────────────────────────────────

function renderCharacterTabs() {
  const container = document.getElementById('character-tabs');
  container.innerHTML = state.characters.map(c => {
    const cls = CLASS_INFO[c.classKey];
    return `
      <div class="char-tab ${state.activeCharId === c.id ? 'active' : ''}" data-char-id="${c.id}" role="button" tabindex="0">
        ${cls ? `<img class="char-tab-class-icon" src="${cls.icon}" alt="${cls.label}" />` : ''}
        <span class="char-tab-info">
          <span class="char-tab-name">${escHtml(c.name)}</span>
          <span class="char-tab-class">${cls ? cls.label : ''}</span>
        </span>
        <button class="char-tab-remove" data-remove-char="${c.id}" title="캐릭터 삭제">✕</button>
      </div>
    `;
  }).join('');
}

function buildTaskCard(task, currentCount, isDone, type, charId) {
  const tagsHtml = task.tags.map(tag => {
    const cls = tag.type === 'count' ? 'tag-count'
              : tag.type === 'reward' ? 'tag-reward' : 'tag-type';
    return `<span class="task-tag ${cls}">${escHtml(tag.text)}</span>`;
  }).join('');

  let countDotsHtml = '';
  if (task.maxCount > 1) {
    const dots = Array.from({ length: task.maxCount }, (_, i) =>
      `<span class="count-dot ${i < currentCount ? 'filled' : ''}" data-task="${task.id}" data-idx="${i}" data-type="${type}"></span>`
    ).join('');
    countDotsHtml = `<div class="task-count-row">${dots}</div>`;
  }

  return `
    <div class="task-card ${isDone ? 'completed' : ''}"
         data-task="${task.id}" data-type="${type}" data-max="${task.maxCount}">
      <div class="task-checkbox">
        <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="2,6 5,9 10,3"/>
        </svg>
      </div>
      <div class="task-body">
        <div class="task-name">${escHtml(task.name)}</div>
        <div class="task-meta">${tagsHtml}</div>
        ${countDotsHtml}
      </div>
    </div>
  `;
}

function renderTasks(type) {
  const tasks = type === 'daily' ? DEFAULT_DAILY_TASKS : DEFAULT_WEEKLY_TASKS;
  const containerId = type === 'daily' ? 'daily-tasks' : 'weekly-tasks';
  const progressId  = type === 'daily' ? 'daily-progress' : 'weekly-progress';
  const container   = document.getElementById(containerId);
  const charId      = state.activeCharId;

  if (!charId) {
    container.innerHTML = `<div class="empty-state"><span class="empty-icon">👤</span>캐릭터를 추가해 숙제를 관리하세요.</div>`;
    updateProgress(progressId, 0, 0, type);
    return;
  }

  const activeTasks = getActiveTasks(charId, tasks);

  let completedCount = 0;

  // Group tasks by category
  const hasCats = activeTasks.some(t => t.category);
  let html = '';

  if (hasCats) {
    // Collect categories in order (preserve first-seen order)
    const catOrder = [];
    const catMap = {};
    activeTasks.forEach(task => {
      const cat = task.category || '';
      if (!catMap[cat]) { catMap[cat] = []; catOrder.push(cat); }
      catMap[cat].push(task);
    });

    catOrder.forEach(cat => {
      const catTasks = catMap[cat];
      const catDone = catTasks.filter(t => getCheck(charId, t.id) >= t.maxCount).length;
      completedCount += catDone;

      html += `<div class="task-category-header">
        <span class="cat-name">${escHtml(cat)}</span>
        <span class="cat-progress">${catDone}/${catTasks.length}</span>
      </div>`;

      catTasks.forEach(task => {
        const cnt = getCheck(charId, task.id);
        const isDone = cnt >= task.maxCount;
        html += buildTaskCard(task, cnt, isDone, type, charId);
      });
    });
  } else {
    activeTasks.forEach(task => {
      const cnt = getCheck(charId, task.id);
      const isDone = cnt >= task.maxCount;
      if (isDone) completedCount++;
      html += buildTaskCard(task, cnt, isDone, type, charId);
    });
  }

  if (activeTasks.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📋</span>
        모든 숙제가 비활성화되어 있습니다.<br>설정에서 숙제를 활성화하세요.
      </div>
    `;
  } else {
    if (completedCount === activeTasks.length) {
      html += `<div class="all-done-banner">✅ 모든 숙제 완료!</div>`;
    }
    container.innerHTML = html;
  }

  updateProgress(progressId, completedCount, activeTasks.length, type);
}

function updateProgress(progressId, done, total, type) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const el = document.getElementById(progressId);
  if (!el) return;
  el.querySelector('.progress-text').textContent = `${done} / ${total}`;
  el.querySelector('.progress-fill').style.width = `${pct}%`;
}

function renderAll() {
  renderCharacterTabs();
  renderTasks('daily');
  renderTasks('weekly');
}

// ── Event Handlers ─────────────────────────────────────────────────────────

function handleTaskClick(e) {
  // Count dot click
  const dot = e.target.closest('.count-dot');
  if (dot) {
    e.stopPropagation();
    const taskId  = dot.dataset.task;
    const idx     = parseInt(dot.dataset.idx);
    const type    = dot.dataset.type;
    const charId  = state.activeCharId;
    const tasks   = type === 'daily' ? DEFAULT_DAILY_TASKS : DEFAULT_WEEKLY_TASKS;
    const task    = tasks.find(t => t.id === taskId);
    if (!task) return;

    const cur = getCheck(charId, taskId);
    const newVal = cur === idx + 1 ? idx : idx + 1;
    setCheck(charId, taskId, newVal);
    renderTasks(type);
    return;
  }

  // Task card click (toggle complete)
  const card = e.target.closest('.task-card');
  if (!card) return;
  const taskId   = card.dataset.task;
  const type     = card.dataset.type;
  const maxCount = parseInt(card.dataset.max);
  const charId   = state.activeCharId;

  const cur = getCheck(charId, taskId);
  setCheck(charId, taskId, cur >= maxCount ? 0 : maxCount);
  renderTasks(type);
}

// Character tab click
document.getElementById('character-tabs').addEventListener('click', e => {
  const removeBtn = e.target.closest('[data-remove-char]');
  if (removeBtn) {
    e.stopPropagation();
    const charId = removeBtn.dataset.removeChar;
    if (!confirm('캐릭터를 삭제하시겠습니까?')) return;
    state.characters = state.characters.filter(c => c.id !== charId);
    if (state.activeCharId === charId) state.activeCharId = state.characters[0]?.id ?? null;
    saveState();
    renderAll();
    // 편집 모드 복원
    if (editMode) document.getElementById('character-tabs').classList.add('edit-mode');
    return;
  }

  const tab = e.target.closest('.char-tab');
  if (!tab) return;
  state.activeCharId = tab.dataset.charId;
  saveState();
  renderAll();
});

// Task clicks
document.getElementById('daily-tasks').addEventListener('click', handleTaskClick);
document.getElementById('weekly-tasks').addEventListener('click', handleTaskClick);

// ── Class Definitions ──────────────────────────────────────────────────────

const CLASS_INFO = {
  warrior:   { label: '워리어',   icon: 'icons/Warrior_Class_Icon.webp' },
  archer:    { label: '아처',     icon: 'icons/Archer_Class_Icon.webp' },
  sorceress: { label: '소서리스', icon: 'icons/Sorceress_Class_Icon.webp' },
  cleric:    { label: '클래릭',   icon: 'icons/Cleric_Class_Icon.webp' },
  academic:  { label: '아카데믹', icon: 'icons/Tinkerer_Class_Icon.webp' },
};

// ── Edit Mode ─────────────────────────────────────────────────────────────

let editMode = false;

document.getElementById('edit-chars-btn').addEventListener('click', () => {
  editMode = !editMode;
  document.getElementById('edit-chars-btn').classList.toggle('active', editMode);
  document.getElementById('character-tabs').classList.toggle('edit-mode', editMode);
});

// ── Add Character Modal ────────────────────────────────────────────────────

let selectedClass = null;

document.getElementById('add-char-btn').addEventListener('click', () => {
  document.getElementById('new-char-name').value = '';
  selectedClass = null;
  document.querySelectorAll('.class-pick-btn').forEach(b => b.classList.remove('selected'));
  openModal('add-char-modal');
});

document.getElementById('class-picker').addEventListener('click', e => {
  const btn = e.target.closest('.class-pick-btn');
  if (!btn) return;
  document.querySelectorAll('.class-pick-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedClass = btn.dataset.class;
});

document.getElementById('confirm-add-char').addEventListener('click', () => {
  const name = document.getElementById('new-char-name').value.trim();
  if (!name) { document.getElementById('new-char-name').focus(); return; }
  if (!selectedClass) {
    document.getElementById('class-picker').classList.add('shake');
    setTimeout(() => document.getElementById('class-picker').classList.remove('shake'), 400);
    return;
  }
  const id = 'char_' + Date.now();
  state.characters.push({ id, name, classKey: selectedClass });
  state.checks[id] = {};
  state.disabled[id] = new Set();
  state.activeCharId = id;
  saveState();
  closeModal('add-char-modal');
  renderAll();
});

// ── Settings Modal ─────────────────────────────────────────────────────────

let settingsCharId = null;

document.getElementById('settings-btn').addEventListener('click', () => {
  settingsCharId = state.characters[0]?.id ?? null;
  renderSettingsModal();
  openModal('settings-modal');
});

function renderSettingsModal() {
  const charTabsEl = document.getElementById('settings-char-tabs');
  const taskListEl = document.getElementById('settings-task-list');

  if (state.characters.length === 0) {
    charTabsEl.innerHTML = '';
    taskListEl.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">등록된 캐릭터가 없습니다. 먼저 캐릭터를 추가해주세요.</p>';
    return;
  }

  charTabsEl.innerHTML = state.characters.map(c => {
    const cls = CLASS_INFO[c.classKey];
    return `
      <button class="settings-char-tab ${settingsCharId === c.id ? 'active' : ''}"
              data-settings-char="${c.id}">
        ${cls ? `<img src="${cls.icon}" alt="${cls.label}" style="width:20px;height:20px;object-fit:contain;vertical-align:middle;" />` : ''}
        ${escHtml(c.name)}
      </button>
    `;
  }).join('');

  const allTasks = [
    { type: '일일 숙제', tasks: DEFAULT_DAILY_TASKS },
    { type: '주간 숙제', tasks: DEFAULT_WEEKLY_TASKS },
  ];

  taskListEl.innerHTML = allTasks.map(section => {
    // Group by category
    const catOrder = [];
    const catMap = {};
    section.tasks.forEach(t => {
      const cat = t.category || '';
      if (!catMap[cat]) { catMap[cat] = []; catOrder.push(cat); }
      catMap[cat].push(t);
    });

    const rowsHtml = catOrder.map(cat => {
      const label = cat || section.type;
      const rows = catMap[cat].map(task => {
        const active = !isDisabled(settingsCharId, task.id);
        return `
          <div class="settings-task-row ${active ? '' : 'inactive'}"
               data-toggle-task="${task.id}" data-toggle-char="${settingsCharId}">
            <div class="settings-toggle ${active ? 'on' : ''}"></div>
            <span class="settings-task-name">${escHtml(task.name)}</span>
          </div>
        `;
      }).join('');
      return `<div class="settings-section-title">${escHtml(label)}</div>${rows}`;
    }).join('');

    return rowsHtml;
  }).join('');
}

document.getElementById('settings-char-tabs').addEventListener('click', e => {
  const btn = e.target.closest('[data-settings-char]');
  if (!btn) return;
  settingsCharId = btn.dataset.settingsChar;
  renderSettingsModal();
});

document.getElementById('settings-task-list').addEventListener('click', e => {
  const row = e.target.closest('[data-toggle-task]');
  if (!row) return;
  const taskId = row.dataset.toggleTask;
  const charId = row.dataset.toggleChar;
  toggleDisabled(charId, taskId);
  renderSettingsModal();
  renderAll();
});

// ── Modal Utilities ────────────────────────────────────────────────────────

function openModal(id) {
  document.getElementById(id).style.display = '';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.modal));
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay').forEach(o => {
      if (o.style.display !== 'none') closeModal(o.id);
    });
  }
});

// ── Helpers ────────────────────────────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Boot ──────────────────────────────────────────────────────────────────

initState();
renderAll();
updateTimers();
setInterval(updateTimers, 1000);
setInterval(checkResets, 60 * 1000);
