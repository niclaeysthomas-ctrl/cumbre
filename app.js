/* ============================================================
   990 — Logique application (locale-first, localStorage)
   ============================================================ */
'use strict';

const DAY = 86400000;
const NEW_PER_DAY = 15;         // nouvelles cartes introduites par jour
const todayStr = () => new Date().toISOString().slice(0, 10);

/* ---------- État persistant ---------- */
const DEFAULT = {
  xp: 0,
  streak: 0,
  lastActive: null,
  lessons: {},          // id -> {best: %, done: bool}
  cards: {},            // index -> {ease, interval(jours), reps, due(ms), lapses, introduced}
  newToday: 0,
  newDate: todayStr(),
  reviewsDone: 0,       // total révisions cartes (stat)
  seenListen: 0,
  placementDone: false, // test de niveau initial fait ?
  estScore: null,       // dernière estimation /990
  level: 2,             // bande de difficulté visée (1 facile · 2 std · 3 difficile)
  history: [],          // [{ts, date, total, L, R, kind, diff, mins}]
  trans: {},            // index -> état SRS-lite des traductions
  transDone: 0,         // total de phrases travaillées
  daily: { date: todayStr(), cards: 0, trans: 0, study: 0, credited: 0 }, // objectif du jour
  mistakes: {},         // erreurs à rejouer (clé -> {kind,q,opts,correct,expl,cat,audio,box})
  register: {},         // SRS-lite du module Espagnol soutenu
  transDir: 'fr2en',    // sens de la traduction : fr2en ou en2fr
  badges: [],           // trophées débloqués (ids)
  longDone: 0,          // sessions d'écoute Part 3/4 terminées
  perfectDays: 0,       // jours où l'objectif du jour a été atteint
  slowAudio: false,     // vitesse d'écoute réduite
  firstRun: true
};

// Objectifs quotidiens
const GOAL_CARDS = 20, GOAL_TRANS = 5;
function resetDailyIfNeeded() {
  if (!S.daily || S.daily.date !== todayStr()) S.daily = { date: todayStr(), cards: 0, trans: 0, study: 0 };
}
function bumpDaily(field, n) { resetDailyIfNeeded(); S.daily[field] = (S.daily[field] || 0) + (n || 1); save(); checkDailyDone(); }
function markStudy() { resetDailyIfNeeded(); S.daily.study = 1; save(); checkDailyDone(); }
function dailyProgress() {
  resetDailyIfNeeded();
  const c = Math.min(1, S.daily.cards / GOAL_CARDS);
  const t = Math.min(1, S.daily.trans / GOAL_TRANS);
  const s = S.daily.study ? 1 : 0;
  return { c, t, s, pct: Math.round((c + t + s) / 3 * 100), done: (c >= 1 && t >= 1 && s >= 1) };
}
function checkDailyDone() {
  resetDailyIfNeeded();
  if (dailyProgress().done && !S.daily.credited) {
    S.daily.credited = 1; S.perfectDays = (S.perfectDays || 0) + 1; save();
    toast('🏆 Objectif du jour atteint !');
    checkAchievements();
  }
}

/* Transfert de progression entre conteneurs de stockage (PWA installée vs Safari
   vs autre appareil : iOS isole le localStorage de chaque contexte — même URL,
   progression différente). ?restore=<base64> importe tout l'état puis nettoie l'URL. */
(function () { try {
  const p = new URLSearchParams(location.search).get('restore'); if (!p) return;
  let b = p.replace(/-/g, '+').replace(/_/g, '/'); while (b.length % 4) b += '=';
  const obj = JSON.parse(decodeURIComponent(escape(atob(b))));
  if (obj && typeof obj === 'object' && obj.cards !== undefined) localStorage.setItem('tcumbre', JSON.stringify(obj));
  history.replaceState(null, '', location.pathname);
} catch (e) {} })();
function transferLink() {
  const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(S)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const url = location.origin + location.pathname + '?restore=' + b64;
  const done = () => toast('📦 Lien copié — ouvre-le là où tu veux retrouver ta progression (Safari, PWA, autre appareil)');
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, () => prompt('Copie ce lien :', url));
  else prompt('Copie ce lien :', url);
}
let S = load();
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem('tcumbre') || '{}');
    return Object.assign({}, DEFAULT, raw);
  } catch (e) { return Object.assign({}, DEFAULT); }
}
function save() { localStorage.setItem('tcumbre', JSON.stringify(S)); }

/* ---------- Gestion jour / streak ---------- */
function touchDay() {
  const t = todayStr();
  resetDailyIfNeeded();
  if (S.newDate !== t) { S.newDate = t; S.newToday = 0; }
  if (S.lastActive !== t) {
    const y = new Date(Date.now() - DAY).toISOString().slice(0, 10);
    if (S.lastActive === y) S.streak += 1;
    else if (S.lastActive !== t) S.streak = 1;
    S.lastActive = t;
    save();
  }
  if (typeof checkAchievements === 'function') checkAchievements();
}

/* ---------- XP / niveau ---------- */
function levelFromXp(xp) {           // paliers croissants
  let lv = 1, need = 100, acc = 0;
  while (xp >= acc + need) { acc += need; lv++; need = Math.round(need * 1.35); }
  return { lv, into: xp - acc, need, floor: acc };
}
function addXp(n) {
  const before = levelFromXp(S.xp).lv;
  S.xp += n; save();
  const after = levelFromXp(S.xp).lv;
  if (after > before) toast(`⭐ Niveau ${after} atteint !`);
}

/* ---------- SRS (SM-2 simplifié, façon Anki) ---------- */
function cardState(i) {
  return S.cards[i] || { ease: 2.5, interval: 0, reps: 0, due: 0, lapses: 0, introduced: false };
}
// files du jour
function dueCards() {
  const now = Date.now();
  const rev = [];         // cartes déjà introduites et dues
  for (const i in S.cards) {
    const c = S.cards[i];
    if (c.introduced && c.due <= now) rev.push(+i);
  }
  return rev;
}
// Ordre d'introduction des cartes : mélange déterministe pour brasser les thèmes
// (quotidien, business, idiomes...) dès le premier jour, mais stable d'un chargement à l'autre.
function seededOrder(n, seed) {
  let s = seed >>> 0;
  const rnd = () => { s |= 0; s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const a = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const VOCAB_ORDER = seededOrder(VOCAB.length, 990);
function newAvailable(unlimited) {
  const cap = unlimited ? Infinity : Math.max(0, NEW_PER_DAY - S.newToday);
  const out = [];
  for (const i of VOCAB_ORDER) {
    if (out.length >= cap) break;
    if (!S.cards[i] || !S.cards[i].introduced) out.push(i);
  }
  return out;
}
function totalUnlearned() {
  let n = 0;
  for (const i of VOCAB_ORDER) if (!S.cards[i] || !S.cards[i].introduced) n++;
  return n;
}
const WAVE = 25; // taille d'une vague en mode sans plafond
function buildQueue(unlimited) {
  // révisions d'abord, puis nouvelles cartes.
  // Sans plafond quotidien : on sert par VAGUES de 25 — une file de 300 cartes
  // affichée d'un coup décourage et ne fait rien apprendre de plus.
  const q = dueCards().concat(newAvailable(unlimited));
  return unlimited ? q.slice(0, WAVE) : q;
}
// File d'un thème précis (révisions dues + toutes les nouvelles du thème, sans plafond)
function buildThemeQueue(theme) {
  const now = Date.now();
  const due = [], news = [];
  for (let i = 0; i < VOCAB.length; i++) {
    if (VOCAB[i][3] !== theme) continue;
    const c = S.cards[i];
    if (c && c.introduced) { if (c.due <= now) due.push(i); }
    else news.push(i);
  }
  shuffle(due); shuffle(news);
  return due.concat(news);
}
// rating: 0 again, 1 hard, 2 good, 3 easy
function rateCard(i, rating) {
  const c = cardState(i);
  if (!c.introduced) { c.introduced = true; S.newToday += 1; }
  const now = Date.now();
  if (rating === 0) {                       // Again
    c.reps = 0; c.lapses += 1;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.interval = 0;
    c.due = now + 60 * 1000;                // revient dans la session (~1 min)
  } else {
    if (c.interval < 1) {                   // carte en apprentissage
      c.interval = rating === 1 ? 1 : rating === 2 ? 1 : 4;
    } else {
      const mult = rating === 1 ? 1.2 : rating === 2 ? c.ease : c.ease * 1.3;
      c.interval = Math.round(c.interval * mult);
    }
    if (rating === 1) c.ease = Math.max(1.3, c.ease - 0.15);
    if (rating === 3) c.ease = c.ease + 0.15;
    c.reps += 1;
    c.due = now + Math.max(1, c.interval) * DAY;
  }
  S.cards[i] = c;
  S.reviewsDone += 1;
  addXp(rating === 0 ? 1 : 3);
  save();
}
function nextDueLabel(i, rating) {          // aperçu sur les boutons
  const c = cardState(i);
  if (rating === 0) return '<1 j';
  let iv;
  if (c.interval < 1) iv = rating === 1 ? 1 : rating === 2 ? 1 : 4;
  else { const m = rating === 1 ? 1.2 : rating === 2 ? c.ease : c.ease * 1.3; iv = Math.round(c.interval * m); }
  iv = Math.max(1, iv);
  return iv === 1 ? '1 j' : iv + ' j';
}

/* ---------- Vocabulaire appris (stat) ---------- */
function learnedCount() {
  let n = 0;
  for (const i in S.cards) if (S.cards[i].introduced) n++;
  return n;
}
function matureCount() {
  let n = 0;
  for (const i in S.cards) if (S.cards[i].interval >= 21) n++;
  return n;
}

/* ---------- Déblocage leçons ---------- */
function lessonUnlocked(idx) {
  if (idx === 0) return true;
  const prev = LESSONS[idx - 1];
  return S.lessons[prev.id] && S.lessons[prev.id].done;
}

/* ============================================================
   RENDU DES VUES
   ============================================================ */
const app = document.getElementById('app');
let view = 'home';

function setView(v) {
  view = v;
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
  render();
}
document.querySelectorAll('.nav button').forEach(b => b.addEventListener('click', () => setView(b.dataset.v)));

function refreshHeader() {
  document.getElementById('streak').textContent = S.streak;
  document.getElementById('hlevel').textContent = levelFromXp(S.xp).lv;
}

function render() {
  refreshHeader();
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('on', b.dataset.v === view));
  window.scrollTo(0, 0);
  if (view === 'home') return renderHome();
  if (view === 'grammar') return renderGrammarList();
  if (view === 'anki') return renderAnkiHome();
  if (view === 'listen') return renderListenHome();
  if (view === 'exam') return renderExamHome();
  if (view === 'traduire') return renderTransHome();
}

/* ============================================================
   TROPHÉES
   ============================================================ */
const ACHIEVEMENTS = [
  { id: 'first', ic: '🎯', title: 'Premiers pas', desc: 'Passer le test de niveau', test: () => S.placementDone },
  { id: 'streak3', ic: '🔥', title: 'En rythme', desc: 'Série de 3 jours', test: () => S.streak >= 3 },
  { id: 'streak7', ic: '🔥', title: 'Une semaine !', desc: 'Série de 7 jours', test: () => S.streak >= 7 },
  { id: 'streak30', ic: '🔥', title: 'Machine', desc: 'Série de 30 jours', test: () => S.streak >= 30 },
  { id: 'perfect1', ic: '🌟', title: 'Journée parfaite', desc: 'Atteindre l\'objectif du jour', test: () => (S.perfectDays || 0) >= 1 },
  { id: 'perfect7', ic: '🌟', title: 'Semaine parfaite', desc: '7 objectifs du jour atteints', test: () => (S.perfectDays || 0) >= 7 },
  { id: 'voc50', ic: '📇', title: '50 mots', desc: '50 mots appris', test: () => learnedCount() >= 50 },
  { id: 'voc200', ic: '📚', title: '200 mots', desc: '200 mots appris', test: () => learnedCount() >= 200 },
  { id: 'voc500', ic: '📚', title: '500 mots', desc: '500 mots appris', test: () => learnedCount() >= 500 },
  { id: 'vocmat', ic: '🧠', title: 'Mémoire d\'acier', desc: '100 mots ancrés (≥21j)', test: () => matureCount() >= 100 },
  { id: 'trans25', ic: '✍️', title: 'Traducteur', desc: '25 phrases traduites', test: () => transSeen() >= 25 },
  { id: 'transmat', ic: '🖋️', title: 'Plume bilingue', desc: '25 traductions maîtrisées', test: () => transMastered() >= 25 },
  { id: 'gramall', ic: '📘', title: 'Grammairien', desc: 'Toutes les leçons validées', test: () => LESSONS.every(l => S.lessons[l.id] && S.lessons[l.id].done) },
  { id: 'listen5', ic: '🎧', title: 'Bonne oreille', desc: '5 sessions Part 3/4', test: () => (S.longDone || 0) >= 5 },
  { id: 'exam600', ic: '📈', title: 'Cap B1', desc: 'Niveau estimé B1', test: () => (S.estScore || 0) >= 55 },
  { id: 'exam785', ic: '🎓', title: 'Cap B2', desc: 'Niveau estimé B2', test: () => (S.estScore || 0) >= 72 },
  { id: 'exam900', ic: '🏆', title: 'Cumbre C1', desc: 'Niveau estimé C1', test: () => (S.estScore || 0) >= 88 },
  { id: 'xp1000', ic: '⭐', title: 'Mille XP', desc: '1000 XP cumulés', test: () => S.xp >= 1000 }
];
function earnedIds() { const s = []; ACHIEVEMENTS.forEach(a => { try { if (a.test()) s.push(a.id); } catch (e) {} }); return s; }
function checkAchievements() {
  const earned = earnedIds();
  const fresh = earned.filter(id => !(S.badges || []).includes(id));
  if (fresh.length) {
    S.badges = Array.from(new Set([...(S.badges || []), ...earned]));
    save();
    const a = ACHIEVEMENTS.find(x => x.id === fresh[0]);
    toast(`🏆 Trophée : ${a.title}${fresh.length > 1 ? ` (+${fresh.length - 1})` : ''}`);
  }
}
function renderAchievements() {
  const earned = new Set(S.badges || []);
  const cards = ACHIEVEMENTS.map(a => {
    const got = earned.has(a.id);
    return `<div class="trophy ${got ? 'got' : ''}">
      <div class="tic">${got ? a.ic : '🔒'}</div>
      <div class="tt2">${a.title}</div>
      <div class="td">${a.desc}</div>
    </div>`;
  }).join('');
  app.innerHTML = `
    <div class="card">
      <h2>Trophées</h2>
      <div class="sub">${earned.size} / ${ACHIEVEMENTS.length} débloqués. Chaque palier récompense un vrai progrès vers le bilinguisme.</div>
    </div>
    <div class="trophygrid">${cards}</div>
    <button class="btn ghost mt" onclick="setView('home')">Retour</button>
  `;
  window.scrollTo(0, 0);
}

/* Anneau de progression (objectif du jour) */
function ringSvg(pct) {
  const r = 30, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
  return `<svg width="76" height="76" viewBox="0 0 76 76" style="flex:0 0 auto">
    <circle cx="38" cy="38" r="${r}" fill="none" stroke="var(--bg2)" stroke-width="7"/>
    <circle cx="38" cy="38" r="${r}" fill="none" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 38 38)"/>
    <text x="38" y="43" text-anchor="middle" fill="var(--txt)" font-size="18" font-weight="800">${pct}%</text>
  </svg>`;
}

/* Coach : recommandation du moment + point faible */
function weakPoint() {
  const h = S.history;
  if (!h.length) return null;
  const last = h[h.length - 1];
  if (!last.lt || !last.rt) return null;
  const lp = last.lc / last.lt, rp = last.rc / last.rt;
  if (lp + 0.12 < rp) return '⚠️ Point faible : l\'écoute — enchaîne des Part 3/4.';
  if (rp + 0.12 < lp) return '⚠️ Point faible : lecture & grammaire — traduis et fais des leçons.';
  return null;
}
function coachAdvice() {
  const due = dueCards().length;
  const dp = dailyProgress();
  if (due > 0) return { title: 'Priorité : réviser', msg: `${due} carte(s) sont dues. Les revoir à temps, c'est là que la mémoire se joue.`, btn: 'Réviser', action: 'startReview(false)' };
  if (mistakeCount() >= 3) return { title: 'Corrige tes erreurs', msg: `Tu as ${mistakeCount()} question(s) déjà ratée(s) en attente. Les rejouer jusqu'à les maîtriser, c'est le plus direct vers le sans-faute.`, btn: 'Revoir mes erreurs', action: 'startMistakes()' };
  if (dp.t < 1 && buildTransQueue('Tous').length) return { title: 'Passe à la production', msg: 'Traduire des phrases rend ta grammaire active — le vrai déclic bilingue.', btn: 'Traduire', action: "setView('traduire')" };
  if (!dp.s) return { title: 'Un peu d\'étude', msg: 'Une session d\'écoute ou une leçon de grammaire pour valider ta journée.', btn: 'Écouter', action: "setView('listen')" };
  if (dp.c < 1) return { title: 'Apprends du vocabulaire', msg: 'De nouvelles cartes t\'attendent aujourd\'hui.', btn: 'Cartes', action: 'startReview(false)' };
  return { title: 'Journée bouclée 🏆', msg: 'Tout est à jour. Un examen blanc pour mesurer tes progrès ?', btn: 'Examen blanc', action: "setView('exam')" };
}

/* ---------- ACCUEIL ---------- */
function renderHome() {
  const L = levelFromXp(S.xp);
  const due = dueCards().length;
  const news = newAvailable().length;
  const doneLessons = LESSONS.filter(l => S.lessons[l.id] && S.lessons[l.id].done).length;
  const pct = Math.round(L.into / L.need * 100);

  const placementBanner = !S.placementDone ? `
    <div class="banner">
      <div class="t">🎯 Fais ton test de niveau</div>
      <div class="d">Un test complet (écoute + grammaire + lecture) pour estimer ton niveau CEFR actuel (A1→C1) et démarrer ta courbe de progression.</div>
      <button class="btn" onclick="startExam('placement')">Commencer le test de niveau</button>
    </div>` : '';

  const scoreCard = S.estScore != null ? `
    <button class="tile" onclick="setView('exam')">
      <div class="ic e">📈</div>
      <div class="body"><div class="t">Niveau estimé</div><div class="d">${scoreBand(S.estScore)} · ${S.history.length} test(s) passé(s)</div></div>
      <div class="badge">${cefrLabel(S.estScore)}</div>
    </button>` : '';

  const dp = dailyProgress();
  const goalLine = (ok, txt, sub) =>
    `<div class="goal ${ok ? 'ok' : ''}"><span class="gk">${ok ? '✅' : '⬜️'}</span><span class="gt">${txt}</span><span class="gs">${sub}</span></div>`;
  const objectiveCard = `
    <div class="card" style="display:flex;gap:16px;align-items:center">
      ${ringSvg(dp.pct)}
      <div style="flex:1;min-width:0">
        <h2 style="font-size:16px;margin-bottom:6px">Objectif du jour ${dp.done ? '🏆' : ''}</h2>
        ${goalLine(dp.c >= 1, 'Réviser des cartes', `${Math.min(S.daily.cards, GOAL_CARDS)}/${GOAL_CARDS}`)}
        ${goalLine(dp.t >= 1, 'Traduire des phrases', `${Math.min(S.daily.trans, GOAL_TRANS)}/${GOAL_TRANS}`)}
        ${goalLine(dp.s >= 1, 'Étudier (grammaire/écoute)', dp.s ? 'fait' : '0/1')}
      </div>
    </div>`;

  const co = coachAdvice();
  const wp = weakPoint();
  const coachCard = `
    <div class="card coach">
      <div class="coach-h">🧭 Le coach</div>
      <div class="coach-t">${co.title}</div>
      <div class="sub mt">${co.msg}</div>
      ${wp ? `<div class="pill warn mt">${wp}</div>` : ''}
      <button class="btn mt" onclick="${co.action}">${co.btn}</button>
    </div>`;
  const nBadges = (S.badges || []).length;

  app.innerHTML = `
    ${placementBanner}
    ${objectiveCard}
    ${coachCard}
    <div class="xpwrap" onclick="renderAchievements()" style="cursor:pointer">
      <div class="lv"><b>Niveau ${L.lv}</b><span>${L.into} / ${L.need} XP</span></div>
      <div class="pbar mt"><i style="width:${pct}%"></i></div>
      <div class="sub mt" style="display:flex;justify-content:space-between">
        <span>🔥 Série : <b style="color:var(--txt)">${S.streak} j</b></span>
        <span>🏆 <b style="color:var(--txt)">${nBadges}/${ACHIEVEMENTS.length}</b> trophées ›</span>
      </div>
    </div>

    <div class="sub mb" style="padding-left:4px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:12px">À faire aujourd'hui</div>

    ${mistakeCount() > 0 ? `
    <button class="tile" onclick="startMistakes()" style="border-color:var(--bad)">
      <div class="ic" style="background:linear-gradient(135deg,#ff5c6c33,#ff5c6c11);color:var(--bad)">🎯</div>
      <div class="body"><div class="t">Revoir mes erreurs</div><div class="d">Rejoue les questions ratées jusqu'à les maîtriser</div></div>
      <div class="badge" style="background:var(--bad);color:#2a0509">${mistakeCount()}</div>
    </button>` : ''}

    <button class="tile" onclick="startReview()">
      <div class="ic a">🃏</div>
      <div class="body"><div class="t">Réviser les cartes</div><div class="d">${due} révision(s) · ${news} nouvelle(s)</div></div>
      <div class="badge ${(due+news)===0?'zero':''}">${due + news}</div>
    </button>

    <button class="tile" onclick="setView('grammar')">
      <div class="ic g">📘</div>
      <div class="body"><div class="t">Grammaire Part 5</div><div class="d">${doneLessons} / ${LESSONS.length} leçons validées</div></div>
      <div class="badge ${doneLessons===LESSONS.length?'':'zero'}">${doneLessons}/${LESSONS.length}</div>
    </button>

    <button class="tile" onclick="setView('listen')">
      <div class="ic l">🎧</div>
      <div class="body"><div class="t">Compréhension orale</div><div class="d">Part 2 · Part 3/4 (conversations & exposés)</div></div>
      <div class="badge zero">${EXAM_LISTEN.length + CONVERSATIONS.length}</div>
    </button>

    <button class="tile" onclick="setView('traduire')">
      <div class="ic e">✍️</div>
      <div class="body"><div class="t">Traduire (FR ⇄ ES)</div><div class="d">Phrases + correction idiomatique & grammaire</div></div>
      <div class="badge zero">${TRANSLATIONS.length}</div>
    </button>

    <button class="tile" onclick="renderRegisterHome()">
      <div class="ic a">✨</div>
      <div class="body"><div class="t">Espagnol soutenu</div><div class="d">Élever le registre : du neutre vers l'élégant</div></div>
      <div class="badge zero">${REGISTER.length}</div>
    </button>

    ${scoreCard}

    <div class="card mt">
      <h2>Ta progression</h2>
      <div class="row2 mt">
        <div><div class="logo" style="font-size:26px">${learnedCount()}</div><div class="sub">mots vus</div></div>
        <div><div class="logo" style="font-size:26px">${matureCount()}</div><div class="sub">mots ancrés (≥21j)</div></div>
      </div>
      <div class="row2 mt">
        <div><div class="logo" style="font-size:26px">${S.reviewsDone}</div><div class="sub">révisions totales</div></div>
        <div><div class="logo" style="font-size:26px">${VOCAB.length}</div><div class="sub">mots au total</div></div>
      </div>
    </div>
  `;
}

/* ---------- GRAMMAIRE : liste ---------- */
/* ============================================================
   MIX GRAMMAIRE — rebrasse les leçons validées + les traductions liées
   ============================================================ */
// Correspondance leçon → catégories de traduction portant sur le même point
const LESSON_TRANS = {
  serestar: ['Ser/Estar'], serestaravz: ['Ser/Estar'],
  gustar: ['Gustar & pronoms'], pronombres: ['Gustar & pronoms'],
  pasados: ['Passé'], perfindef: ['Passé'],
  futcond: ['Futur/Conditionnel'],
  porpara: ['Por/Para'],
  subjpres: ['Subjonctif'], subjtrig: ['Subjonctif'], subjcontraste: ['Subjonctif'],
  sicond: ['Hypothèse C1'],
  imperativo: ['Impératif'],
  cambio: ['Verbos & régime'], regimen: ['Verbos & régime'], perifrasis: ['Verbos & régime'],
  estiloindirecto: [], pasivase: [], conectores: []
};
function doneLessons() { return LESSONS.filter(l => S.lessons[l.id] && S.lessons[l.id].done); }
function buildMix(n) {
  n = n || 12;
  const done = doneLessons();
  const mcq = [];
  done.forEach(l => l.q.forEach(q => mcq.push({
    type: 'mcq', lessonTitle: l.title, stem: q[0], opts: q[1], correct: q[2], expl: q[3]
  })));
  const cats = new Set();
  done.forEach(l => (LESSON_TRANS[l.id] || []).forEach(c => cats.add(c)));
  const tr = [];
  TRANSLATIONS.forEach((t, i) => { if (cats.has(t.cat)) tr.push({ type: 'trad', idx: i, t }); });
  shuffle(mcq); shuffle(tr);
  const nTr = Math.min(tr.length, Math.round(n * 0.3));
  const nMcq = Math.min(mcq.length, n - nTr);
  return shuffle(mcq.slice(0, nMcq).concat(tr.slice(0, nTr)));
}

let MIX = null;
function startMix() {
  const items = buildMix(12);
  if (!items.length) { toast('Valide d\'abord une leçon 🙂'); return; }
  MIX = { items, i: 0, correct: 0, total: 0, answered: false };
  renderMix();
}
function renderMix() {
  if (MIX.i >= MIX.items.length) return finishMix();
  const it = MIX.items[MIX.i];
  MIX.answered = false;
  const head = `
    <div class="qmeta">
      <span>🔀 Mix · ${it.type === 'mcq' ? it.lessonTitle : 'traduction — ' + it.t.cat}</span>
      <span>${MIX.i + 1} / ${MIX.items.length}</span>
    </div>
    <div class="pbar mb"><i style="width:${MIX.i / MIX.items.length * 100}%"></i></div>`;
  if (it.type === 'mcq') {
    app.innerHTML = head + `
      <div class="stem">${it.stem.replace('______', '<span class="blank">______</span>')}</div>
      <div id="opts">${it.opts.map((o, k) =>
        `<button class="opt" onclick="mixAnswer(${k})"><span class="lab">${'ABCD'[k]}</span>${o}</button>`).join('')}</div>
      <div id="after"></div>
      <div class="mt"><button class="btn ghost" onclick="setView('grammar')">Quitter</button></div>`;
  } else {
    app.innerHTML = head + `
      <div class="transfr">${it.t.fr}</div>
      <textarea id="mix-in" class="transinput" rows="2" placeholder="Écris ta traduction en espagnol (facultatif)…"></textarea>
      <button class="btn" onclick="revealMixTrad()">Voir la correction</button>
      <div class="mt"><button class="btn ghost" onclick="setView('grammar')">Quitter</button></div>`;
  }
  window.scrollTo(0, 0);
}
function mixAnswer(k) {
  if (MIX.answered) return;
  MIX.answered = true;
  const it = MIX.items[MIX.i];
  document.querySelectorAll('#opts .opt').forEach((b, idx) => {
    b.setAttribute('disabled', '');
    if (idx === it.correct) b.classList.add('good');
    else if (idx === k) b.classList.add('bad');
    else b.classList.add('dim');
  });
  const ok = k === it.correct;
  MIX.total++;
  if (ok) { MIX.correct++; addXp(4); }
  else recordMistake({ kind: 'gram', q: it.stem, opts: it.opts, correct: it.correct, expl: it.expl, cat: 'Mix · ' + it.lessonTitle });
  const last = MIX.i === MIX.items.length - 1;
  document.getElementById('after').innerHTML = `
    <div class="expl ${ok ? 'ok' : 'no'}">${ok ? '✅ Correct. ' : '❌ Réponse : ' + 'ABCD'[it.correct] + '. '}${it.expl}</div>
    <button class="btn mt" onclick="${last ? 'finishMix()' : 'nextMix()'}">${last ? 'Résultat' : 'Suivant'}</button>`;
  document.getElementById('after').scrollIntoView({ behavior: 'smooth', block: 'end' });
}
function revealMixTrad() {
  if (MIX.answered) return;
  MIX.answered = true;
  const it = MIX.items[MIX.i], t = it.t;
  const mine = (document.getElementById('mix-in') || {}).value || '';
  const mineHtml = mine.trim() ? `<div class="trans-mine"><div class="lbl">Ta réponse</div>${escapeHtml(mine.trim())}</div>` : '';
  const altHtml = (t.alt && t.alt.length)
    ? `<div class="trans-alt">Aussi correct : ${t.alt.map(a => '« ' + escapeHtml(a) + ' »').join(' · ')}</div>` : '';
  const esEsc = t.en.replace(/'/g, "\\'");
  const last = MIX.i === MIX.items.length - 1;
  app.innerHTML = `
    <div class="qmeta"><span>🔀 Mix · traduction — ${t.cat}</span><span>${MIX.i + 1} / ${MIX.items.length}</span></div>
    <div class="transfr small">${t.fr}</div>
    ${mineHtml}
    <div class="trans-model">
      <div class="lbl">Correction idiomatique <button class="spk sm" onclick="speak('${esEsc}')" title="Écouter l'espagnol">🔊</button></div>
      <div class="en">${t.en}</div>
      ${altHtml}
    </div>
    <div class="expl" style="border-color:var(--purple)"><b>${t.point}</b><br>${t.note}</div>
    <div class="sub center mt mb">Sans regarder, tu l'avais ?</div>
    <div class="row2">
      <button class="btn sec" style="color:var(--bad)" onclick="rateMixTrad(0)">Raté</button>
      <button class="btn sec" style="color:var(--good)" onclick="rateMixTrad(1)">Je l'avais</button>
    </div>
    <div class="mt"><button class="btn ghost" onclick="${last ? 'finishMix()' : 'nextMix()'}">${last ? 'Résultat' : 'Passer'}</button></div>`;
  window.scrollTo(0, 0);
}
function rateMixTrad(ok) {
  const it = MIX.items[MIX.i];
  rateTrans(it.idx, ok ? 2 : 0);   // nourrit la répétition espacée des traductions
  MIX.total++;
  if (ok) { MIX.correct++; addXp(6); }
  bumpDaily('trans');
  MIX.i >= MIX.items.length - 1 ? finishMix() : nextMix();
}
function nextMix() { MIX.i++; renderMix(); }
function finishMix() {
  const pct = MIX.total ? Math.round(MIX.correct / MIX.total * 100) : 0;
  markStudy(); touchDay(); save();
  app.innerHTML = `
    <div class="card big">
      <div class="em">${pct >= 85 ? '🏆' : pct >= 60 ? '🔀' : '💪'}</div>
      <div class="score" style="color:${pct >= 70 ? 'var(--good)' : 'var(--accent)'}">${pct}%</div>
      <div class="lab">${MIX.correct} / ${MIX.total} sur le mix</div>
      <div class="mt sub">${pct >= 85 ? 'Tes leçons sont vraiment ancrées.' : 'Les ratés sont partis dans « Mes erreurs » — rejoue-les.'}</div>
    </div>
    <button class="btn" onclick="startMix()">Refaire un mix</button>
    <button class="btn ghost mt" onclick="setView('grammar')">Retour aux leçons</button>`;
  window.scrollTo(0, 0);
}

function renderGrammarList() {
  const rows = LESSONS.map((l, idx) => {
    const st = S.lessons[l.id];
    const unlocked = lessonUnlocked(idx);
    const done = st && st.done;
    const best = st ? st.best : null;
    return `
      <div class="lrow ${done ? 'done' : ''} ${unlocked ? '' : 'locked'}" ${unlocked ? `onclick="startLesson(${idx})"` : ''}>
        <div class="n">${done ? '✓' : unlocked ? (idx + 1) : '🔒'}</div>
        <div class="info"><div class="tt">${l.title}</div><div class="tg">${l.tag} · ${l.q.length} questions</div></div>
        <div class="sc ${best >= 70 ? 'pass' : ''}">${best != null ? best + '%' : ''}</div>
      </div>`;
  }).join('');
  const done = doneLessons();
  const nCats = new Set();
  done.forEach(l => (LESSON_TRANS[l.id] || []).forEach(c => nCats.add(c)));
  const nTrad = TRANSLATIONS.filter(t => nCats.has(t.cat)).length;
  const mixCard = `
    <div class="card" style="border-color:var(--accent)">
      <h2 style="font-size:16px">🔀 Mix grammaire</h2>
      <div class="sub">Un entraînement mélangé : des questions tirées de tes leçons <b style="color:var(--txt)">déjà validées</b>${nTrad ? ` + des <b style="color:var(--txt)">phrases à traduire</b> sur ces mêmes points` : ''}. C'est le rebrassage qui ancre vraiment.</div>
      ${done.length
        ? `<button class="btn mt" onclick="startMix()">Démarrer le mix · 12 questions</button>
           <div class="sub center mt">${done.length} leçon(s) validée(s)${nTrad ? ` · ${nTrad} traduction(s) liée(s)` : ''}</div>`
        : `<div class="sub mt" style="color:var(--dim)">🔒 Valide au moins une leçon pour débloquer le mix.</div>`}
    </div>`;
  const tensesCard = `
    <div class="card" style="border-color:var(--blue)">
      <h2 style="font-size:16px">📖 Les temps · conjugaisons</h2>
      <div class="sub">La référence complète : formation, verbes modèles, irréguliers clés et exemples traduits — impératif, subjonctif imparfait, hypothèses… Consultable à tout moment, sans quiz.</div>
      <button class="btn sec mt" onclick="renderTensesList()">Ouvrir la référence · ${TENSES.length} temps</button>
    </div>`;
  app.innerHTML = `
    <div class="card">
      <h2>Grammaire</h2>
      <div class="sub">Valide une leçon (≥ 70 %) pour débloquer la suivante. Chaque bonne réponse rapporte de l'XP.</div>
    </div>
    ${tensesCard}
    ${mixCard}
    ${rows}
  `;
}

/* ---------- RÉFÉRENCE : Les temps (conjugaisons) ---------- */
function tenseHTML(t) {
  let h = `<div class="expl mt" style="border-color:var(--blue)"><b>Quand l'utiliser</b><br>${t.when}</div>`;
  if (t.formation) h += `<div class="tsec"><div class="th">🔧 Formation</div><div class="tirr">${t.formation}</div></div>`;
  if (t.models && t.models.length) {
    h += `<div class="tsec"><div class="th">📋 Conjugaison</div><div class="cleg">yo · tú · él/ella · nosotros · vosotros · ellos</div>`;
    t.models.forEach(([inf, forms]) => { h += `<div class="cv"><b>${inf}</b><span>${forms}</span></div>`; });
    h += `</div>`;
  }
  if (t.extra) h += `<div class="tsec">${t.extra}</div>`;
  if (t.irregulars) h += `<div class="tsec"><div class="th">⚠️ Irréguliers clés</div><div class="tirr">${t.irregulars}</div></div>`;
  if (t.examples) h += `<div class="tsec"><div class="th">💬 Exemples</div>${t.examples.map(([es, fr]) => `<div class="exs"><span class="es">${es}</span><span class="fr">${fr}</span></div>`).join('')}</div>`;
  return h;
}
function renderTensesList() {
  window.scrollTo(0, 0);
  const rows = TENSES.map(t => `
    <div class="lrow" onclick="renderTense('${t.id}')">
      <div class="n">📖</div>
      <div class="info"><div class="tt">${t.name}</div><div class="tg">${t.tag}</div></div>
      <div class="sc">›</div>
    </div>`).join('');
  app.innerHTML = `
    <div class="card">
      <h2>Les temps · conjugaisons</h2>
      <div class="sub">Formation, verbes modèles, irréguliers et exemples complets. Touche un temps pour le détail.</div>
    </div>
    ${rows}
    <button class="btn ghost mt" onclick="setView('grammar')">Retour à la grammaire</button>
  `;
}
function renderTense(id) {
  const t = TENSES.find(x => x.id === id);
  if (!t) return renderTensesList();
  window.scrollTo(0, 0);
  app.innerHTML = `
    <div class="card">
      <div class="pill warn">${t.tag}</div>
      <h2 class="mt">${t.name}</h2>
      ${tenseHTML(t)}
    </div>
    <button class="btn ghost mt" onclick="renderTensesList()">← Tous les temps</button>
  `;
}

/* ---------- GRAMMAIRE : quiz ---------- */
let Q = null;
function startLesson(idx) {
  const l = LESSONS[idx];
  Q = { idx, l, i: 0, correct: 0, answered: false, order: shuffle([...Array(l.q.length).keys()]) };
  renderLessonIntro();
}
function renderLessonIntro() {
  const l = Q.l;
  app.innerHTML = `
    <div class="card">
      <div class="pill warn">${l.tag}</div>
      <h2 class="mt">${l.title}</h2>
      <div class="expl mt" style="border-color:var(--blue)">${l.note}</div>
    </div>
    <button class="btn" onclick="renderQuestion()">Commencer · ${l.q.length} questions</button>
    <button class="btn ghost mt" onclick="setView('grammar')">Retour</button>
  `;
}
function renderQuestion() {
  const l = Q.l;
  const qi = Q.order[Q.i];
  const [stem, opts, correct, expl] = l.q[qi];
  Q.answered = false;
  const stemHtml = stem.replace('______', '<span class="blank">______</span>');
  const optHtml = opts.map((o, k) => `
    <button class="opt" data-k="${k}" onclick="answer(${k},${correct})">
      <span class="lab">${'ABCD'[k]}</span>${o}
    </button>`).join('');
  app.innerHTML = `
    <div class="qmeta"><span>${l.title}</span><span>${Q.i + 1} / ${l.q.length}</span></div>
    <div class="pbar mb"><i style="width:${(Q.i) / l.q.length * 100}%"></i></div>
    <div class="stem">${stemHtml}</div>
    <div id="opts">${optHtml}</div>
    <div id="after"></div>
  `;
}
function answer(k, correct) {
  if (Q.answered) return;
  Q.answered = true;
  const [stem, opts, , expl] = Q.l.q[Q.order[Q.i]];
  const btns = document.querySelectorAll('#opts .opt');
  btns.forEach((b, idx) => {
    b.setAttribute('disabled', '');
    if (idx === correct) b.classList.add('good');
    else if (idx === k) b.classList.add('bad');
    else b.classList.add('dim');
  });
  const ok = k === correct;
  if (ok) { Q.correct++; addXp(4); }
  else recordMistake({ kind: 'gram', q: stem, opts, correct, expl, cat: 'Grammaire · ' + Q.l.title });
  const last = Q.i === Q.l.q.length - 1;
  document.getElementById('after').innerHTML = `
    <div class="expl ${ok ? 'ok' : 'no'}">${ok ? '✅ Correct. ' : '❌ Réponse : ' + 'ABCD'[correct] + '. '}${expl}</div>
    <button class="btn mt" onclick="${last ? 'finishLesson()' : 'nextQuestion()'}">${last ? 'Voir le résultat' : 'Suivant'}</button>
  `;
  document.getElementById('after').scrollIntoView({ behavior: 'smooth', block: 'end' });
}
function nextQuestion() { Q.i++; renderQuestion(); }
function finishLesson() {
  const total = Q.l.q.length;
  const pct = Math.round(Q.correct / total * 100);
  const pass = pct >= 70;
  const prev = S.lessons[Q.l.id] || { best: 0, done: false };
  const st = { best: Math.max(prev.best, pct), done: prev.done || pass };
  S.lessons[Q.l.id] = st;
  if (pass && !prev.done) addXp(25);   // bonus déblocage
  markStudy(); touchDay(); save();
  const justUnlocked = pass && Q.idx + 1 < LESSONS.length && !prev.done;
  app.innerHTML = `
    <div class="card big">
      <div class="em">${pass ? '🎉' : '💪'}</div>
      <div class="score" style="color:${pass ? 'var(--good)' : 'var(--accent)'}">${pct}%</div>
      <div class="lab">${Q.correct} / ${total} bonnes réponses</div>
      <div class="mt sub">${pass ? 'Leçon validée !' : 'Il te faut 70 % pour valider. Réessaie.'}</div>
      ${justUnlocked ? `<div class="pill warn mt">🔓 Leçon suivante débloquée</div>` : ''}
    </div>
    <button class="btn" onclick="startLesson(${Q.idx})">Refaire</button>
    ${pass && Q.idx + 1 < LESSONS.length ? `<button class="btn sec mt" onclick="startLesson(${Q.idx + 1})">Leçon suivante →</button>` : ''}
    <button class="btn ghost mt" onclick="setView('grammar')">Retour aux leçons</button>
  `;
}

/* ---------- ANKI : accueil session ---------- */
function renderAnkiHome() {
  const due = dueCards().length;
  const news = newAvailable(false).length;         // nouvelles dispo aujourd'hui (plafonné)
  const total = due + news;
  const remaining = totalUnlearned();              // toutes les cartes encore jamais vues
  const unlimitedTotal = due + remaining;
  // répartition par thème
  const themes = {};
  VOCAB.forEach(v => { themes[v[3]] = (themes[v[3]] || 0) + 1; });
  const themeHtml = Object.entries(themes).map(([t, n]) =>
    `<button class="segchip" onclick="startThemeReview('${t}')">${t} <span class="cnt">${n}</span></button>`).join('');
  app.innerHTML = `
    <div class="card">
      <h2>Cartes de vocabulaire</h2>
      <div class="sub">Répétition espacée SM‑2, sens tiré <b style="color:var(--txt)">au hasard</b> 🇪🇸→🇫🇷 ou 🇫🇷→🇪🇸 : tu dois savoir <i>produire</i> le mot, pas juste le reconnaître. Objectif : de A2 à C1, du quotidien au registre soutenu.</div>
      <div class="row2 mt">
        <div><div class="logo" style="font-size:24px;color:var(--blue)">${due}</div><div class="sub">à réviser</div></div>
        <div><div class="logo" style="font-size:24px;color:var(--accent)">${learnedCount()}<span style="font-size:15px;color:var(--muted)"> / ${VOCAB.length}</span></div><div class="sub">mots appris</div></div>
      </div>
    </div>

    <div class="card">
      <h2 style="font-size:16px">Session du jour</h2>
      <div class="sub">Rythme régulier : révisions dues + ${NEW_PER_DAY} nouvelles cartes max. Le plus efficace pour la mémoire long terme.</div>
      <button class="btn mt" onclick="startReview(false)" ${total === 0 ? 'disabled' : ''}>
        ${total === 0 ? 'Rien à réviser pour aujourd’hui 🎉' : `Démarrer · ${total} carte(s)`}
      </button>
    </div>

    <div class="card" style="border-color:var(--accent)">
      <h2 style="font-size:16px">🌊 Par vagues de ${WAVE}</h2>
      <div class="sub">Sans plafond quotidien, mais par vagues digestes : ${WAVE} cartes, tu souffles, tu enchaînes si tu veux. Une carte ratée revient quelques cartes plus loin, dans la même vague, jusqu'à ce qu'elle tienne.</div>
      <button class="btn mt sec" style="border-color:var(--accent);color:var(--accent)" onclick="startReview(true)" ${unlimitedTotal === 0 ? 'disabled' : ''}>
        ${unlimitedTotal === 0 ? 'Tout est appris 🏆' : `Lancer une vague · ${Math.min(WAVE, unlimitedTotal)} carte(s) sur ${unlimitedTotal}`}
      </button>
      <div class="sub center mt">${remaining} mot(s) encore jamais vus</div>
    </div>

    <button class="btn sec" onclick="renderVocabBrowser('')">🔍 Parcourir / rechercher les ${VOCAB.length} mots</button>

    <div class="card mt">
      <h2 style="font-size:15px">Thèmes (${Object.keys(themes).length}) · touche pour réviser</h2>
      <div class="segwrap mt">${themeHtml}</div>
    </div>
    <button class="btn ghost" onclick="transferLink()">📦 Transférer ma progression (lien à ouvrir ailleurs)</button>
    ${learnedCount() > 0 ? `<button class="btn ghost" onclick="resetCardsConfirm()">Réinitialiser la progression des cartes</button>` : ''}
  `;
}

/* ---------- Parcourir / rechercher le vocabulaire ---------- */
function vocabStatus(i) {
  const c = S.cards[i];
  if (!c || !c.introduced) return { cls: 'st-new', lab: 'nouveau' };
  if (c.interval >= 21) return { cls: 'st-mat', lab: 'ancré' };
  return { cls: 'st-lrn', lab: 'en cours' };
}
function vocabRows(query) {
  const q = (query || '').trim().toLowerCase();
  const matches = [];
  for (let i = 0; i < VOCAB.length; i++) {
    const [en, fr, ex, theme] = VOCAB[i];
    if (!q || en.toLowerCase().includes(q) || fr.toLowerCase().includes(q) || theme.toLowerCase().includes(q)) {
      matches.push(i);
      if (matches.length >= 120) break;
    }
  }
  if (!matches.length) return `<div class="sub center mt">Aucun mot trouvé.</div>`;
  return matches.map(i => {
    const [en, fr] = VOCAB[i];
    const theme = VOCAB[i][3];
    const st = vocabStatus(i);
    const enEsc = en.replace(/'/g, "\\'");
    return `<div class="vrow">
      <button class="spk sm" onclick="speak('${enEsc}')" title="Écouter">🔊</button>
      <div class="vinfo"><div class="ven">${en}</div><div class="vfr">${fr}</div></div>
      <div class="vmeta"><span class="pill">${theme}</span><span class="vst ${st.cls}">${st.lab}</span></div>
    </div>`;
  }).join('');
}
function renderVocabBrowser(query) {
  app.innerHTML = `
    <div class="card">
      <h2>Dictionnaire — ${VOCAB.length} mots</h2>
      <div class="sub">Cherche en français ou en espagnol (ou par thème). Touche 🔊 pour écouter la prononciation.</div>
      <input id="vocab-search" class="transinput mt" style="min-height:0" placeholder="Rechercher… (ex. grue, crane, animaux)" oninput="filterVocab(this.value)" value="${(query || '').replace(/"/g, '&quot;')}">
    </div>
    <div id="vocab-results">${vocabRows(query)}</div>
    <button class="btn ghost mt" onclick="setView('anki')">Retour</button>
  `;
  const inp = document.getElementById('vocab-search');
  if (inp && query) { inp.focus(); inp.setSelectionRange(query.length, query.length); }
}
function filterVocab(q) {
  const el = document.getElementById('vocab-results');
  if (el) el.innerHTML = vocabRows(q);
}

/* ---------- ANKI : session de révision ---------- */
let R = null;
function startReview(unlimited) {
  const queue = buildQueue(unlimited);
  if (queue.length === 0) { setView('anki'); toast('Aucune carte à réviser pour le moment 🎉'); return; }
  R = { queue, pos: 0, shown: false, reviewed: 0, unlimited: !!unlimited, theme: null };
  renderCard();
}
function startThemeReview(theme) {
  const queue = buildThemeQueue(theme);
  if (queue.length === 0) { toast('Ce thème est déjà à jour 🎉'); return; }
  R = { queue, pos: 0, shown: false, reviewed: 0, unlimited: true, theme };
  renderCard();
}
// Sépare la traduction française de ses notes "explicatives" (faux-amis, gloses
// qui contiennent la réponse) — celles-ci ne doivent PAS spoiler le recto.
// Les parenthèses désambiguatrices courtes ("(un examen)", "(à boire)") restent devant.
function splitGloss(s) {
  const notes = [];
  const core = s.replace(/\s*\(([^)]*)\)/g, (m, inner) => {
    if (/[≠=«»]/.test(inner)) { notes.push(inner.trim()); return ''; }
    return m; // désambiguateur utile : on le garde au recto
  }).replace(/\s{2,}/g, ' ').replace(/\s+([;,.])/g, '$1').trim();
  return { core: core || s, note: notes.join(' · ') };
}
function renderCard() {
  if (R.pos >= R.queue.length) return finishReview();
  const i = R.queue[R.pos];
  const en = VOCAB[i][0], ex = VOCAB[i][2], theme = VOCAB[i][3];
  const frSplit = splitGloss(VOCAB[i][1]);
  const fr = frSplit.core;
  // note affichée UNIQUEMENT au reveal : faux-amis (splitGloss) + éventuel 5ᵉ champ
  // explicite (ex. usage ser/estar d'un adjectif) — jamais d'indice au recto.
  const gloss = [frSplit.note, VOCAB[i][4] || ''].filter(Boolean).join('<br>');
  const isNew = !S.cards[i] || !S.cards[i].introduced;
  // Sens tiré au hasard : produire l’espagnol OU le français
  R.dir = Math.random() < 0.5 ? 'en2fr' : 'fr2en';
  const prompt = R.dir === 'en2fr' ? en : fr;
  const answer = R.dir === 'en2fr' ? fr : en;
  const dirBadge = R.dir === 'en2fr' ? '🇪🇸 → 🇫🇷' : '🇫🇷 → 🇪🇸';
  const psize = prompt.length > 30 ? '19px' : prompt.length > 18 ? '24px' : '30px';
  const enEsc = en.replace(/'/g, "\\'");
  R.shown = false;
  app.innerHTML = `
    <div class="qmeta"><span>${isNew ? '🆕 Nouvelle' : '🔁 Révision'}</span><span>${R.pos + 1} / ${R.queue.length}</span></div>
    <div class="flash" onclick="flip()">
      <div class="theme">${theme} · <span style="color:var(--accent)">${dirBadge}</span></div>
      <div class="front" style="font-size:${psize}">${prompt}</div>
      <div id="cardback" class="hidden">
        <div class="back">${answer}</div>
        <div class="ex">“${ex}”</div>
        ${gloss ? `<div class="gloss">💡 ${gloss}</div>` : ''}
      </div>
      <div id="taphint" class="tap">${R.dir === 'en2fr' ? 'Traduis en français' : 'Traduis en espagnol'} · touche pour révéler ▽</div>
    </div>
    <button id="spk" class="spk ${R.dir === 'fr2en' ? 'hidden' : ''}" onclick="speak('${enEsc}');event.stopPropagation()" title="Écouter l'espagnol">🔊</button>
    <div id="ratebar"></div>
  `;
}
function flip() {
  if (R.shown) return;
  R.shown = true;
  document.getElementById('cardback').classList.remove('hidden');
  document.getElementById('taphint').classList.add('hidden');
  const i = R.queue[R.pos];
  if (R.dir === 'fr2en') {                 // l'espagnol était caché : on le révèle et on le prononce
    const s = document.getElementById('spk'); if (s) s.classList.remove('hidden');
    speak(VOCAB[i][0]);
  }
  document.getElementById('ratebar').innerHTML = `
    <div class="srsrow">
      <button class="again" onclick="doRate(0)">Encore<small>${nextDueLabel(i,0)}</small></button>
      <button class="hard" onclick="doRate(1)">Difficile<small>${nextDueLabel(i,1)}</small></button>
      <button class="good" onclick="doRate(2)">Bien<small>${nextDueLabel(i,2)}</small></button>
      <button class="easy" onclick="doRate(3)">Facile<small>${nextDueLabel(i,3)}</small></button>
    </div>`;
}
function doRate(rating) {
  const i = R.queue[R.pos];
  const before = cardState(i);
  rateCard(i, rating);
  R.reviewed++;
  bumpDaily('cards');
  // "Encore" : la carte revient 4 positions plus loin — pas en fin de file,
  // où elle mettrait une heure à repasser dans une grosse session
  if (rating === 0) R.queue.splice(Math.min(R.pos + 5, R.queue.length), 0, i);
  R.pos++;
  touchDay();
  renderCard();
}
function finishReview() {
  touchDay(); save();
  app.innerHTML = `
    <div class="card big">
      <div class="em">🧠</div>
      <div class="score" style="color:var(--good)">+${R.reviewed}</div>
      <div class="lab">carte(s) travaillée(s)</div>
      <div class="mt sub">Reviens demain : les cartes réapparaîtront au moment optimal.</div>
    </div>
    <button class="btn" onclick="setView('anki')">Terminé</button>
    ${R.theme
      ? (buildThemeQueue(R.theme).length ? `<button class="btn sec mt" onclick="startThemeReview('${R.theme}')">Continuer « ${R.theme} » (${buildThemeQueue(R.theme).length})</button>` : '')
      : R.unlimited
      ? ((dueCards().length + totalUnlearned()) ? `<button class="btn sec mt" onclick="startReview(true)">🌊 Vague suivante · ${dueCards().length + totalUnlearned()} restante(s)</button>` : '')
      : (buildQueue(false).length ? `<button class="btn sec mt" onclick="startReview(false)">Continuer (${buildQueue(false).length})</button>` : '')}
  `;
}
function resetCardsConfirm() {
  if (confirm('Réinitialiser toute la progression des cartes ? (les stats de grammaire et XP sont conservées)')) {
    S.cards = {}; S.newToday = 0; save(); toast('Cartes réinitialisées'); renderAnkiHome();
  }
}

/* ---------- ÉCOUTE : menu ---------- */
let LST = null;
function renderListenHome() {
  const nConv = CONVERSATIONS.filter(c => c.type === 'conv').length;
  const nTalk = CONVERSATIONS.filter(c => c.type === 'talk').length;
  app.innerHTML = `
    <div class="card">
      <h2>Compréhension orale</h2>
      <div class="sub">Toutes les voix sont générées par le navigateur (rien à télécharger). 🔈 Vérifie que le son est activé.</div>
    </div>
    <button class="tile" onclick="startListen()">
      <div class="ic l">🗣️</div>
      <div class="body"><div class="t">Part 2 · Question → réponse</div><div class="d">Questions courtes, 3 réponses au choix</div></div>
      <div class="badge zero">${EXAM_LISTEN.length}</div>
    </button>
    <button class="tile" onclick="startLong()">
      <div class="ic l">💬</div>
      <div class="body"><div class="t">Part 3/4 · Conversations & exposés</div><div class="d">Dialogues joués, puis questions de compréhension</div></div>
      <div class="badge zero">${nConv + nTalk}</div>
    </button>
    <button class="btn ghost mt" onclick="toggleSlow()">🐢 Vitesse : ${S.slowAudio ? 'Lente' : 'Normale'}</button>
    <div class="sub center mt">Écouter de l'espagnol authentique, c'est ce qui débloque la compréhension.</div>
  `;
}
function toggleSlow() { S.slowAudio = !S.slowAudio; save(); renderListenHome(); toast(S.slowAudio ? 'Écoute ralentie 🐢' : 'Écoute à vitesse normale'); }
function startListen() {
  LST = { order: shuffle([...Array(EXAM_LISTEN.length).keys()]), i: 0, correct: 0, answered: false };
  renderListen();
}
function renderListen() {
  const idx = LST.order[LST.i];
  const [q, opts, correct] = EXAM_LISTEN[idx];
  LST.answered = false;
  const optHtml = opts.map((o, k) =>
    `<button class="opt" onclick="answerListen(${k},${correct})"><span class="lab">${'ABC'[k]}</span>${o}</button>`).join('');
  app.innerHTML = `
    <div class="qmeta"><span>Part 2</span><span>${LST.i + 1} / ${EXAM_LISTEN.length}</span></div>
    <div class="pbar mb"><i style="width:${LST.i / EXAM_LISTEN.length * 100}%"></i></div>
    <button class="spk" onclick="speak('${q.replace(/'/g, "\\'")}')" style="width:88px;height:88px;font-size:34px">🔊</button>
    <div class="center sub mb">Touche pour (ré)écouter la question</div>
    <div id="opts">${optHtml}</div>
    <div id="after"></div>
  `;
  setTimeout(() => speak(q), 350);
}
function answerListen(k, correct) {
  if (LST.answered) return;
  LST.answered = true;
  const idx = LST.order[LST.i];
  const [q, opts] = EXAM_LISTEN[idx];
  document.querySelectorAll('#opts .opt').forEach((b, i2) => {
    b.setAttribute('disabled', '');
    if (i2 === correct) b.classList.add('good');
    else if (i2 === k) b.classList.add('bad');
    else b.classList.add('dim');
  });
  const ok = k === correct;
  if (ok) { LST.correct++; addXp(3); }
  else recordMistake({ kind: 'listen', q, opts, correct, cat: 'Écoute Part 2', audio: q });
  const last = LST.i === EXAM_LISTEN.length - 1;
  document.getElementById('after').innerHTML = `
    <div class="expl ${ok ? 'ok' : 'no'}">${ok ? '✅ Correct !' : '❌ Bonne réponse : ' + 'ABC'[correct]}<br><span class="sub">Question : « ${q} »</span></div>
    <button class="btn mt" onclick="${last ? 'finishListen()' : 'nextListen()'}">${last ? 'Résultat' : 'Suivant'}</button>
  `;
}
function nextListen() { LST.i++; renderListen(); }
function finishListen() {
  const pct = Math.round(LST.correct / EXAM_LISTEN.length * 100);
  S.seenListen += 1; markStudy(); touchDay(); save();
  app.innerHTML = `
    <div class="card big">
      <div class="em">🎧</div>
      <div class="score">${pct}%</div>
      <div class="lab">${LST.correct} / ${EXAM_LISTEN.length}</div>
    </div>
    <button class="btn" onclick="startListen()">Refaire</button>
    <button class="btn ghost mt" onclick="setView('listen')">Retour</button>
  `;
}

/* ---------- ÉCOUTE Part 3/4 : conversations & exposés ---------- */
let LG = null;
function startLong() {
  LG = { order: shuffle([...Array(CONVERSATIONS.length).keys()]), pi: 0, qi: 0, correct: 0, total: 0, answered: false };
  renderLong();
}
function playLong() { const p = CONVERSATIONS[LG.order[LG.pi]]; speakLines(p.lines, 0); }
function renderLong() {
  const p = CONVERSATIONS[LG.order[LG.pi]];
  const nq = p.qs.length;
  const [q, opts, correct] = p.qs[LG.qi];
  LG.answered = false;
  const typeLabel = p.type === 'conv' ? '💬 Conversation (Part 3)' : '📢 Exposé (Part 4)';
  const optHtml = opts.map((o, k) =>
    `<button class="opt" onclick="answerLong(${k},${correct})"><span class="lab">${'ABCD'[k]}</span>${o}</button>`).join('');
  app.innerHTML = `
    <div class="qmeta"><span>${typeLabel} · <span style="color:var(--accent)">${p.level}</span></span><span>Passage ${LG.pi + 1}/${CONVERSATIONS.length}</span></div>
    <button class="spk" onclick="playLong()" style="width:84px;height:84px;font-size:32px">🔊</button>
    <div class="center sub mb">Touche pour (ré)écouter · question ${LG.qi + 1}/${nq}</div>
    <div class="stem" style="font-size:17px">${q}</div>
    <div id="opts">${optHtml}</div>
    <div id="after"></div>
  `;
  if (LG.qi === 0) setTimeout(playLong, 350);   // joue le dialogue en arrivant sur le passage
}
function answerLong(k, correct) {
  if (LG.answered) return;
  LG.answered = true;
  const p = CONVERSATIONS[LG.order[LG.pi]];
  const [qText, qOpts] = p.qs[LG.qi];
  document.querySelectorAll('#opts .opt').forEach((b, i2) => {
    b.setAttribute('disabled', '');
    if (i2 === correct) b.classList.add('good');
    else if (i2 === k) b.classList.add('bad');
    else b.classList.add('dim');
  });
  const ok = k === correct;
  LG.total++;
  if (ok) { LG.correct++; addXp(3); }
  else recordMistake({ kind: 'long', q: qText, opts: qOpts, correct, cat: (p.type === 'conv' ? 'Écoute · conversation' : 'Écoute · exposé') });
  const lastQ = LG.qi === p.qs.length - 1;
  const lastP = LG.pi === CONVERSATIONS.length - 1;
  const script = p.lines.map(l => {
    const who = l.spk === 'W' ? '👩 ' : l.spk === 'M' ? '👨 ' : '🔊 ';
    return `<div style="margin-bottom:4px">${who}${l.text}</div>`;
  }).join('');
  document.getElementById('after').innerHTML = `
    <div class="expl ${ok ? 'ok' : 'no'}">${ok ? '✅ Correct !' : '❌ Bonne réponse : ' + 'ABCD'[correct]}</div>
    <details class="script mt"><summary>Voir la transcription</summary><div class="mt">${script}</div></details>
    <button class="btn mt" onclick="${(lastQ && lastP) ? 'finishLong()' : 'nextLong()'}">${(lastQ && lastP) ? 'Résultat' : (lastQ ? 'Passage suivant' : 'Question suivante')}</button>
  `;
  document.getElementById('after').scrollIntoView({ behavior: 'smooth', block: 'end' });
}
function nextLong() {
  const p = CONVERSATIONS[LG.order[LG.pi]];
  if (LG.qi < p.qs.length - 1) { LG.qi++; }
  else { LG.pi++; LG.qi = 0; }
  renderLong();
  window.scrollTo(0, 0);
}
function finishLong() {
  const pct = Math.round(LG.correct / LG.total * 100);
  S.longDone = (S.longDone || 0) + 1;
  markStudy(); touchDay(); save();
  app.innerHTML = `
    <div class="card big">
      <div class="em">🎧</div>
      <div class="score">${pct}%</div>
      <div class="lab">${LG.correct} / ${LG.total} bonnes réponses</div>
    </div>
    <button class="btn" onclick="startLong()">Refaire (nouvel ordre)</button>
    <button class="btn ghost mt" onclick="setView('listen')">Retour</button>
  `;
}

/* ---------- Synthèse vocale ---------- */
let voiceEN = null, voiceW = null, voiceM = null;
function pickVoice() {
  const vs = speechSynthesis.getVoices();
  const es = vs.filter(v => /^es/i.test(v.lang));
  voiceEN = es.find(v => /es-ES/i.test(v.lang)) || es[0] || vs[0] || null;
  voiceW = es.find(v => /female|Mónica|Monica|Marisol|Paulina|Helena|Google español/i.test(v.name)) || voiceEN;
  voiceM = es.find(v => /male|Jorge|Diego|Juan|Enrique|Carlos|Pablo/i.test(v.name)) || voiceEN;
}
if ('speechSynthesis' in window) {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
}
function audioRate(base) { return base * (S.slowAudio ? 0.78 : 1); }
function speak(text) {
  if (!('speechSynthesis' in window)) { toast('Synthèse vocale indisponible'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'es-ES'; u.rate = audioRate(0.95); u.pitch = 1;
  if (voiceEN) u.voice = voiceEN;
  speechSynthesis.speak(u);
}
// Joue un dialogue ligne par ligne, en différenciant les locuteurs (voix + hauteur).
function speakLines(lines, i, onDone) {
  if (!('speechSynthesis' in window)) { toast('Synthèse vocale indisponible'); return; }
  if (i === 0) speechSynthesis.cancel();
  if (i >= lines.length) { if (onDone) onDone(); return; }
  const ln = lines[i];
  const u = new SpeechSynthesisUtterance(ln.text);
  u.lang = 'es-ES';
  if (ln.spk === 'W') { u.pitch = 1.3; u.rate = audioRate(0.95); if (voiceW) u.voice = voiceW; }
  else if (ln.spk === 'M') { u.pitch = 0.7; u.rate = audioRate(0.92); if (voiceM) u.voice = voiceM; }
  else { u.pitch = 1; u.rate = audioRate(0.95); if (voiceEN) u.voice = voiceEN; }
  u.onend = () => speakLines(lines, i + 1, onDone);
  speechSynthesis.speak(u);
}

/* ---------- Utilitaires ---------- */
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
let toastT;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ============================================================
   EXAMEN — test de niveau & examen blanc chronométré
   ============================================================ */

/* Score CEFR (indice 0-100) : proportion correcte × plafond selon la difficulté */
function cefrCeiling(diff) { return diff === 3 ? 100 : diff === 2 ? 80 : diff === 1 ? 58 : 90; }
function examScore(pct, diff) { return Math.max(0, Math.min(100, Math.round(pct * cefrCeiling(diff)))); }
function scoreBand(idx) {
  if (idx >= 88) return 'Objectif C1 atteint 🎯';
  if (idx >= 72) return 'Avancé (B2)';
  if (idx >= 55) return 'Intermédiaire (B1)';
  if (idx >= 38) return 'Élémentaire (A2)';
  if (idx >= 20) return 'Grand débutant (A1)';
  return 'Débutant';
}
function cefrLabel(idx) {
  if (idx >= 88) return 'C1'; if (idx >= 72) return 'B2'; if (idx >= 55) return 'B1';
  if (idx >= 38) return 'A2'; if (idx >= 20) return 'A1'; return '—';
}
function levelFromScore(idx) { if (idx >= 72) return 3; if (idx >= 50) return 2; return 1; }

/* Sélection filtrée par difficulté (avec repli si le vivier est trop petit) */
function pickItems(pool, n, diff) {
  let src = pool;
  if (diff) {
    const near = pool.filter(x => Math.abs(x._d - diff) <= 1);   // ±1 niveau
    if (near.length >= n) src = near;
  }
  return shuffle(src.slice()).slice(0, n);
}

/* Construit un examen. kind = 'placement' | 'blanc' ; diff = 1|2|3|null */
function buildExam(kind, diff) {
  const cfg = kind === 'placement'
    ? { L: 8, G: 8, P: 4, mins: 15 }
    : { L: 15, G: 15, P: 10, mins: 30 };

  // Écoute
  const listenPool = EXAM_LISTEN.map(a => ({ _d: a[3], section: 'L', audio: a[0], opts: a[1], correct: a[2] }));
  const listen = pickItems(listenPool, cfg.L, diff);

  // Grammaire / complétion (Reading)
  const gPool = EXAM_GRAMMAR.map(a => ({ _d: a[4], section: 'R', stem: a[0], opts: a[1], correct: a[2], expl: a[3] }));
  const grammar = pickItems(gPool, cfg.G, diff);

  // Lecture Part 7 : on tire des passages entiers jusqu'au quota de questions
  const passages = shuffle(READING.slice());
  const reading = [];
  for (const p of passages) {
    if (reading.length >= cfg.P) break;
    for (const q of p.qs) {
      reading.push({ _d: p.diff, section: 'R', passage: p.text, ptitle: p.title, stem: q[0], opts: q[1], correct: q[2], expl: q[3] });
    }
  }
  const readingCut = reading.slice(0, Math.max(cfg.P, 0));

  // Ordre : écoute d'abord (Part 2), puis lecture = grammaire mélangée, puis passages regroupés
  const items = listen.concat(shuffle(grammar)).concat(readingCut);
  return { items, mins: cfg.mins };
}

let EX = null, exTimer = null;
function startExam(kind, diff) {
  const d = diff || (kind === 'placement' ? null : S.level);
  const built = buildExam(kind, d);
  EX = { kind, diff: d, items: built.items, i: 0, answers: [], start: Date.now(), suggestMins: built.mins };
  renderExamRun();
  startExamTimer();
}
function startExamTimer() {
  clearInterval(exTimer);
  exTimer = setInterval(() => {
    const el = document.getElementById('extime');
    if (!el) { clearInterval(exTimer); return; }
    const s = Math.floor((Date.now() - EX.start) / 1000);
    el.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }, 1000);
}
function renderExamRun() {
  const it = EX.items[EX.i];
  const n = EX.items.length;
  const secLabel = it.section === 'L' ? 'Écoute' : 'Lecture';
  const isNewPassage = it.ptitle && (EX.i === 0 || EX.items[EX.i - 1].ptitle !== it.ptitle);
  const passageHtml = it.passage
    ? `<div class="passage"><div class="pt">${it.ptitle}</div>${escapeHtml(it.passage)}</div>` : '';
  let body;
  if (it.section === 'L') {
    body = `
      <button class="spk" onclick="speak('${it.audio.replace(/'/g, "\\'")}')" style="width:84px;height:84px;font-size:32px">🔊</button>
      <div class="center sub mb">Touche pour (ré)écouter</div>`;
  } else {
    body = `${passageHtml}<div class="stem">${it.stem.replace('______', '<span class="blank">______</span>')}</div>`;
  }
  const nOpt = it.opts.length;
  const optHtml = it.opts.map((o, k) =>
    `<button class="opt" onclick="examAnswer(${k})"><span class="lab">${'ABCD'[k]}</span>${o}</button>`).join('');
  const last = EX.i === n - 1;
  app.innerHTML = `
    <div class="exbar">
      <span class="sec ${it.section}">${secLabel}</span>
      <span class="timer">⏱ <span id="extime">00:00</span></span>
      <span class="sub">${EX.i + 1} / ${n}</span>
    </div>
    <div class="pbar mb"><i style="width:${EX.i / n * 100}%"></i></div>
    ${body}
    <div id="opts">${optHtml}</div>
    <div class="mt"><button class="btn ghost" onclick="quitExam()">Abandonner l'examen</button></div>
  `;
  if (it.section === 'L') setTimeout(() => speak(it.audio), 300);
}
function examAnswer(k) {
  EX.answers[EX.i] = k;
  if (EX.i === EX.items.length - 1) return finishExam();
  EX.i++;
  renderExamRun();
  window.scrollTo(0, 0);
}
function quitExam() {
  if (confirm('Abandonner l\'examen en cours ? Les réponses ne seront pas enregistrées.')) {
    clearInterval(exTimer); speechSynthesis.cancel(); setView('exam');
  }
}
function finishExam() {
  clearInterval(exTimer); speechSynthesis.cancel();
  const mins = Math.max(1, Math.round((Date.now() - EX.start) / 60000));
  let lc = 0, lt = 0, rc = 0, rt = 0;
  EX.items.forEach((it, idx) => {
    const ok = EX.answers[idx] === it.correct;
    if (it.section === 'L') { lt++; if (ok) lc++; } else { rt++; if (ok) rc++; }
  });
  const totalCorrect = lc + rc, totalQ = lt + rt;
  const pct = totalQ ? totalCorrect / totalQ : 0;
  const total = examScore(pct, EX.diff);   // indice CEFR /100 (placement: diff null → plafond 90)

  const rec = { ts: Date.now(), date: todayStr(), total, L: Math.round((lt ? lc / lt : 0) * 100), R: Math.round((rt ? rc / rt : 0) * 100), kind: EX.kind, diff: EX.diff, mins,
                lc, lt, rc, rt };
  S.history.push(rec);
  S.estScore = total;
  S.level = levelFromScore(total);
  if (EX.kind === 'placement') S.placementDone = true;
  addXp(EX.kind === 'placement' ? 40 : 30);
  markStudy(); touchDay(); save();

  const prev = S.history.length >= 2 ? S.history[S.history.length - 2].total : null;
  const delta = prev != null ? total - prev : null;
  const deltaHtml = delta != null
    ? `<div class="pill ${delta >= 0 ? '' : 'warn'}" style="margin-top:8px">${delta >= 0 ? '▲ +' : '▼ '}${delta} pts depuis le dernier</div>` : '';

  EX._wrong = EX.items.map((it, idx) => ({ it, a: EX.answers[idx] })).filter(x => x.a !== x.it.correct);
  EX._wrong.forEach(w => recordMistake({
    kind: w.it.section === 'L' ? 'listen' : 'gram',
    q: w.it.section === 'L' ? w.it.audio : w.it.stem,
    opts: w.it.opts, correct: w.it.correct, expl: w.it.expl || '',
    cat: w.it.section === 'L' ? 'Examen · écoute' : 'Examen · ' + (w.it.ptitle ? 'lecture' : 'grammaire'),
    audio: w.it.section === 'L' ? w.it.audio : null
  }));

  app.innerHTML = `
    <div class="card big">
      <div class="em">${total >= 88 ? '🏆' : total >= 72 ? '🎉' : '📊'}</div>
      <div class="score">${cefrLabel(total)}<span style="font-size:20px;color:var(--muted)"> · ${total}/100</span></div>
      <div class="lab">${scoreBand(total)}</div>
      ${deltaHtml}
    </div>
    <div class="card">
      <div class="scoreline">
        <div><div class="v" style="color:var(--purple)">${rec.L}%</div><div class="k">Écoute</div></div>
        <div><div class="v" style="color:var(--blue)">${rec.R}%</div><div class="k">Grammaire/Lecture</div></div>
        <div><div class="v">${mins}′</div><div class="k">durée</div></div>
      </div>
      <div class="sub center">Écoute ${lc}/${lt} · Grammaire/Lecture ${rc}/${rt} bonnes réponses</div>
    </div>
    ${EX._wrong.length ? `<button class="btn sec" onclick="renderExamReview()">Revoir mes ${EX._wrong.length} erreur(s)</button>` : '<div class="card center">Sans-faute ! 🔥</div>'}
    <button class="btn ghost mt" onclick="setView('exam')">Retour aux examens</button>
    <div class="sub center mt">Estimation indicative pour suivre ta progression, pas un score officiel.</div>
  `;
}
function renderExamReview() {
  const rows = EX._wrong.map(w => {
    const it = w.it;
    const yourAns = w.a != null ? 'ABCD'[w.a] + '. ' + it.opts[w.a] : '(sans réponse)';
    const good = 'ABCD'[it.correct] + '. ' + it.opts[it.correct];
    const q = it.section === 'L' ? '🔊 ' + it.audio : (it.ptitle ? '📄 ' + it.stem : it.stem.replace('______', '____'));
    return `<div class="review-item">
      <div class="qq">${q}</div>
      <div class="ans"><span class="ko">${yourAns}</span> → <span class="ok">${good}</span></div>
      ${it.expl ? `<div class="sub mt">${it.expl}</div>` : ''}
    </div>`;
  }).join('');
  app.innerHTML = `
    <div class="card"><h2>Correction</h2><div class="sub">${EX._wrong.length} erreur(s) à revoir.</div></div>
    ${rows}
    <button class="btn ghost mt" onclick="setView('exam')">Terminé</button>
  `;
  window.scrollTo(0, 0);
}

/* Courbe de progression (SVG) */
function progressChart() {
  const h = S.history;
  if (h.length < 1) return '';
  const W = 320, H = 130, pad = 24;
  const pts = h.map(r => r.total);
  const min = 0, max = 100;
  const x = i => pad + (h.length === 1 ? (W - 2 * pad) / 2 : i * (W - 2 * pad) / (h.length - 1));
  const y = v => H - pad - (v - min) / (max - min) * (H - 2 * pad);
  const line = pts.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  const dots = pts.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="var(--accent)"/>`).join('');
  // ligne cible C1 (88)
  const yTarget = y(88);
  const targetLine = `<line x1="${pad}" y1="${yTarget}" x2="${W - pad}" y2="${yTarget}" stroke="var(--good)" stroke-dasharray="4 4" stroke-width="1" opacity=".6"/>
       <text x="${W - pad}" y="${yTarget - 4}" fill="var(--good)" font-size="9" text-anchor="end">cible C1</text>`;
  return `
    <svg class="donut" viewBox="0 0 ${W} ${H}" width="100%" style="max-width:360px">
      ${targetLine}
      ${h.length > 1 ? `<polyline points="${line}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>` : ''}
      ${dots}
      <text x="${x(0)}" y="${H - 6}" fill="var(--muted)" font-size="9" text-anchor="middle">1er</text>
      <text x="${x(h.length - 1)}" y="${H - 6}" fill="var(--muted)" font-size="9" text-anchor="middle">actuel</text>
    </svg>`;
}

/* Onglet Examen */
function renderExamHome() {
  if (!S.placementDone) {
    app.innerHTML = `
      <div class="card">
        <h2>Test de niveau</h2>
        <div class="sub">Avant tout : passe un test complet pour estimer ton niveau CEFR de départ (A1→C1). Il combine écoute, grammaire et lecture, et démarre ta courbe de progression.</div>
      </div>
      <button class="btn" onclick="startExam('placement')">Passer le test de niveau (~15 min)</button>
      <div class="sub center mt">20 questions · estimation A1→C1</div>
    `;
    return;
  }
  const cur = S.level;
  const segBtn = (d, name, sub) =>
    `<button class="${cur === d ? 'on' : ''}" onclick="setExamDiff(${d})" data-d="${d}">${name}<small>${sub}</small></button>`;
  const histRows = S.history.slice().reverse().slice(0, 8).map(r => `
    <div class="hist">
      <div><b>${cefrLabel(r.total)}</b> <span class="sub">${r.total}/100</span><div class="d">${r.kind === 'placement' ? 'Test de niveau' : 'Examen blanc'} · ${r.date}</div></div>
      <div class="sub" style="text-align:right">Écoute ${r.L}% · Gram ${r.R}%<div class="d">${r.mins}′</div></div>
    </div>`).join('');

  app.innerHTML = `
    <div class="card">
      <div class="sub" style="text-transform:uppercase;letter-spacing:.06em;font-size:11px;font-weight:800">Niveau estimé</div>
      <div style="display:flex;align-items:baseline;gap:10px"><div class="logo" style="font-size:40px">${cefrLabel(S.estScore)}</div><div class="sub">${S.estScore}/100</div></div>
      <div class="pill mt">${scoreBand(S.estScore)}</div>
      ${progressChart()}
    </div>

    <div class="card">
      <h2 style="font-size:16px">Nouvel examen blanc</h2>
      <div class="sub">40 questions chronométrées (écoute + grammaire + lecture). Choisis la difficulté :</div>
      <div class="seg" id="diffseg">
        ${segBtn(1, 'Facile', 'A2–B1')}
        ${segBtn(2, 'Standard', 'B1–B2')}
        ${segBtn(3, 'Difficile', 'B2–C1')}
      </div>
      <button class="btn" onclick="startExam('blanc')">Démarrer l'examen blanc</button>
    </div>

    ${histRows ? `<div class="card"><h2 style="font-size:16px">Historique</h2><div class="mt">${histRows}</div></div>` : ''}
    <button class="btn ghost" onclick="startExam('placement')">Refaire un test de niveau</button>
  `;
}
function setExamDiff(d) {
  S.level = d; save();
  document.querySelectorAll('#diffseg button').forEach(b => b.classList.toggle('on', +b.dataset.d === d));
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ============================================================
   MES ERREURS — rejoue les questions ratées jusqu'à les maîtriser
   (méthode Leitner : 2 bonnes réponses d'affilée = acquise)
   ============================================================ */
function qkey(s) { let h = 0; for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; } return 'm' + (h >>> 0); }
function recordMistake(m) {
  if (!S.mistakes) S.mistakes = {};
  const k = qkey((m.q || '') + '|' + m.kind);
  S.mistakes[k] = { kind: m.kind, q: m.q, opts: m.opts, correct: m.correct, expl: m.expl || '', cat: m.cat || '', audio: m.audio || null, box: 0, ts: Date.now() };
  save();
}
function mistakeCount() { return Object.keys(S.mistakes || {}).length; }

let MR = null;
function startMistakes() {
  const keys = Object.keys(S.mistakes || {});
  if (!keys.length) { toast('Aucune erreur à revoir 🎉'); setView('home'); return; }
  keys.sort((a, b) => (S.mistakes[a].box - S.mistakes[b].box) || (S.mistakes[a].ts - S.mistakes[b].ts));
  MR = { keys, pos: 0, done: 0, answered: false };
  renderMistake();
}
function renderMistake() {
  if (MR.pos >= MR.keys.length) return finishMistakes();
  const key = MR.keys[MR.pos];
  const m = S.mistakes[key];
  if (!m) { MR.pos++; return renderMistake(); }
  MR.answered = false;
  const audioBtn = m.audio
    ? `<button class="spk" onclick="speak('${(m.audio).replace(/'/g, "\\'")}')" style="width:74px;height:74px;font-size:29px">🔊</button><div class="center sub mb">Touche pour (ré)écouter</div>` : '';
  const stemHtml = m.audio
    ? `<div class="stem" style="font-size:17px">${m.q}</div>`
    : `<div class="stem">${(m.q || '').replace('______', '<span class="blank">______</span>')}</div>`;
  const optHtml = m.opts.map((o, idx) =>
    `<button class="opt" onclick="answerMistake(${idx})"><span class="lab">${'ABCD'[idx]}</span>${o}</button>`).join('');
  app.innerHTML = `
    <div class="qmeta"><span>🎯 Erreur · ${m.cat || ''}</span><span>${MR.pos + 1}/${MR.keys.length}</span></div>
    <div class="pbar mb"><i style="width:${MR.pos / MR.keys.length * 100}%"></i></div>
    ${audioBtn}
    ${stemHtml}
    <div id="opts">${optHtml}</div>
    <div id="after"></div>
    <div class="mt"><button class="btn ghost" onclick="setView('home')">Quitter</button></div>
  `;
  if (m.audio) setTimeout(() => speak(m.audio), 300);
}
function answerMistake(k) {
  if (MR.answered) return;
  MR.answered = true;
  const key = MR.keys[MR.pos];
  const m = S.mistakes[key];
  document.querySelectorAll('#opts .opt').forEach((b, idx) => {
    b.setAttribute('disabled', '');
    if (idx === m.correct) b.classList.add('good');
    else if (idx === k) b.classList.add('bad');
    else b.classList.add('dim');
  });
  const ok = k === m.correct;
  if (ok) { m.box = (m.box || 0) + 1; addXp(2); if (m.box >= 2) delete S.mistakes[key]; }
  else { m.box = 0; }
  save();
  MR.done++;
  const graduated = ok && !S.mistakes[key];
  const last = MR.pos === MR.keys.length - 1;
  document.getElementById('after').innerHTML = `
    <div class="expl ${ok ? 'ok' : 'no'}">${ok ? (graduated ? '✅ Maîtrisée ! Elle sort de ta liste d\'erreurs.' : '✅ Correct — encore une bonne réponse et elle est acquise.') : '❌ Bonne réponse : ' + 'ABCD'[m.correct] + '.'} ${m.expl || ''}</div>
    <button class="btn mt" onclick="${last ? 'finishMistakes()' : 'nextMistake()'}">${last ? 'Terminé' : 'Suivant'}</button>
  `;
  document.getElementById('after').scrollIntoView({ behavior: 'smooth', block: 'end' });
}
function nextMistake() { MR.pos++; renderMistake(); window.scrollTo(0, 0); }
function finishMistakes() {
  touchDay(); save();
  const left = mistakeCount();
  app.innerHTML = `
    <div class="card big">
      <div class="em">${left ? '🎯' : '🎉'}</div>
      <div class="score" style="color:var(--good)">${left}</div>
      <div class="lab">erreur(s) restantes</div>
      <div class="mt sub">${left ? 'Reviens jusqu\'à ce que la liste soit vide : c\'est le chemin le plus court vers le sans-faute.' : 'Plus aucune erreur en attente. Impeccable !'}</div>
    </div>
    <button class="btn" onclick="setView('home')">Accueil</button>
    ${left ? `<button class="btn sec mt" onclick="startMistakes()">Continuer (${left})</button>` : ''}
  `;
}

/* ============================================================
   TRADUIRE — version FR ⇄ ES, correction idiomatique + grammaire
   ============================================================ */
function transState(i) { return S.trans[i] || { ease: 2.5, interval: 0, reps: 0, due: 0, introduced: false }; }
function rateTrans(i, rating) {
  const c = transState(i);
  c.introduced = true;
  const now = Date.now();
  if (rating === 0) { c.reps = 0; c.ease = Math.max(1.3, c.ease - 0.2); c.interval = 0; c.due = now + 60 * 1000; }
  else {
    if (c.interval < 1) c.interval = rating === 3 ? 4 : 1;
    else { const m = rating === 1 ? 1.2 : rating === 2 ? c.ease : c.ease * 1.3; c.interval = Math.round(c.interval * m); }
    if (rating === 1) c.ease = Math.max(1.3, c.ease - 0.15);
    if (rating === 3) c.ease += 0.15;
    c.reps += 1; c.due = now + Math.max(1, c.interval) * DAY;
  }
  S.trans[i] = c; S.transDone = (S.transDone || 0) + 1;
  addXp(rating === 0 ? 2 : 6); save();
}
function transCats() { const s = []; TRANSLATIONS.forEach(t => { if (!s.includes(t.cat)) s.push(t.cat); }); return s; }
function transMastered() { let n = 0; for (const i in S.trans) if (S.trans[i].interval >= 21) n++; return n; }
function transSeen() { let n = 0; for (const i in S.trans) if (S.trans[i].introduced) n++; return n; }
function buildTransQueue(cat) {
  const now = Date.now();
  const due = [], news = [];
  TRANSLATIONS.forEach((t, i) => {
    if (cat !== 'Tous' && t.cat !== cat) return;
    const st = S.trans[i];
    if (st && st.introduced) { if (st.due <= now) due.push(i); }
    else news.push(i);
  });
  shuffle(due); shuffle(news);
  const items = due.concat(news);
  const cap = cat === 'Tous' ? 12 : items.length;   // catégorie ciblée = tout ; « Tous » = lot de 12
  return items.slice(0, Math.max(due.length, cap));
}

let transCat = 'Tous';
function setTransCat(c) { transCat = c; renderTransHome(); }
function setTransDir(d) { S.transDir = d; save(); renderTransHome(); }
function renderTransHome() {
  const cats = ['Tous'].concat(transCats());
  const chips = cats.map(c => {
    const n = c === 'Tous' ? TRANSLATIONS.length : TRANSLATIONS.filter(t => t.cat === c).length;
    return `<button class="segchip ${transCat === c ? 'on' : ''}" onclick="setTransCat('${c}')">${c} <span class="cnt">${n}</span></button>`;
  }).join('');
  const qlen = buildTransQueue(transCat).length;
  const dir = S.transDir === "en2fr" ? "ES → FR" : "FR → ES";
  app.innerHTML = `
    <div class="card">
      <h2>Traduire · version ${dir}</h2>
      <div class="sub">Traduis la phrase (dans ta tête ou en l'écrivant), puis compare à une <b style="color:var(--txt)">correction idiomatique</b>. Chaque phrase entraîne un point précis : subjonctif, inversion, conditionnels mixtes, discours indirect… et du bon vocabulaire.</div>
      <div class="row2 mt">
        <div><div class="logo" style="font-size:24px;color:var(--blue)">${transSeen()}<span style="font-size:15px;color:var(--muted)"> / ${TRANSLATIONS.length}</span></div><div class="sub">phrases vues</div></div>
        <div><div class="logo" style="font-size:24px;color:var(--good)">${transMastered()}</div><div class="sub">maîtrisées (≥21j)</div></div>
      </div>
    </div>
    <div class="seg">
      <button class="${S.transDir === 'fr2en' ? 'on' : ''}" onclick="setTransDir('fr2en')">🇫🇷 → 🇪🇸<small>thème</small></button>
      <button class="${S.transDir === 'en2fr' ? 'on' : ''}" onclick="setTransDir('en2fr')">🇪🇸 → 🇫🇷<small>version</small></button>
    </div>
    <div class="card">
      <h2 style="font-size:15px">Cible un point de grammaire</h2>
      <div class="segwrap mt">${chips}</div>
    </div>
    <button class="btn" onclick="startTrans()" ${qlen === 0 ? 'disabled' : ''}>
      ${qlen === 0 ? 'Tout est à jour ici 🎉' : `Démarrer · ${qlen} phrase(s)`}
    </button>
  `;
}

let TR = null;
function startTrans() {
  const queue = buildTransQueue(transCat);
  if (!queue.length) { toast('Rien à traduire ici pour le moment 🎉'); return; }
  TR = { queue, pos: 0, done: 0, shown: false };
  renderTransCard();
}
function renderTransCard() {
  if (TR.pos >= TR.queue.length) return finishTrans();
  const t = TRANSLATIONS[TR.queue[TR.pos]];
  const en2fr = S.transDir === 'en2fr';
  const prompt = en2fr ? t.en : t.fr;
  TR.shown = false;
  app.innerHTML = `
    <div class="qmeta"><span>${t.cat} · <span style="color:var(--accent)">${t.level}</span></span><span>${TR.pos + 1} / ${TR.queue.length}</span></div>
    <div class="pbar mb"><i style="width:${TR.pos / TR.queue.length * 100}%"></i></div>
    <div class="transfr">${prompt}${en2fr ? ` <button class="spk sm" onclick="speak('${t.en.replace(/'/g, "\\'")}')" title="Écouter">🔊</button>` : ''}</div>
    <textarea id="trans-in" class="transinput" rows="2" placeholder="${en2fr ? 'Écris ta traduction en français' : 'Écris ta traduction en espagnol'} (facultatif)…"></textarea>
    <button class="btn" onclick="revealTrans()">Voir la correction</button>
    <div class="mt"><button class="btn ghost" onclick="setView('traduire')">Quitter</button></div>
  `;
}
function revealTrans() {
  if (TR.shown) return;
  TR.shown = true;
  const t = TRANSLATIONS[TR.queue[TR.pos]];
  const en2fr = S.transDir === 'en2fr';
  const prompt = en2fr ? t.en : t.fr;
  const model = en2fr ? t.fr : t.en;
  const mine = (document.getElementById('trans-in') || {}).value || '';
  const mineHtml = mine.trim()
    ? `<div class="trans-mine"><div class="lbl">Ta réponse</div>${escapeHtml(mine.trim())}</div>` : '';
  const altHtml = (!en2fr && t.alt && t.alt.length)
    ? `<div class="trans-alt">Aussi correct : ${t.alt.map(a => '« ' + escapeHtml(a) + ' »').join(' · ')}</div>` : '';
  const enEsc = t.en.replace(/'/g, "\\'");
  app.innerHTML = `
    <div class="qmeta"><span>${t.cat} · <span style="color:var(--accent)">${t.level}</span></span><span>${TR.pos + 1} / ${TR.queue.length}</span></div>
    <div class="transfr small">${prompt}</div>
    ${mineHtml}
    <div class="trans-model">
      <div class="lbl">Correction idiomatique <button class="spk sm" onclick="speak('${enEsc}')" title="Écouter l'espagnol">🔊</button></div>
      <div class="en">${model}</div>
      ${altHtml}
    </div>
    <div class="expl" style="border-color:var(--purple)"><b>${t.point}</b><br>${t.note}</div>
    <div class="sub center mt mb">Sans regarder, ta traduction était…</div>
    <div class="srsrow">
      <button class="again" onclick="doRateTrans(0)">À revoir</button>
      <button class="hard" onclick="doRateTrans(1)">Approximative</button>
      <button class="good" onclick="doRateTrans(2)">Correcte</button>
      <button class="easy" onclick="doRateTrans(3)">Parfaite</button>
    </div>
  `;
  window.scrollTo(0, 0);
}
function doRateTrans(rating) {
  const i = TR.queue[TR.pos];
  rateTrans(i, rating);
  TR.done++;
  bumpDaily('trans');
  if (rating === 0) TR.queue.push(i);
  TR.pos++;
  touchDay();
  renderTransCard();
}
function finishTrans() {
  touchDay(); save();
  app.innerHTML = `
    <div class="card big">
      <div class="em">✍️</div>
      <div class="score" style="color:var(--good)">+${TR.done}</div>
      <div class="lab">phrase(s) traduite(s)</div>
      <div class="mt sub">La traduction, c'est là que la grammaire et le vocabulaire deviennent actifs. Reviens régulièrement.</div>
    </div>
    <button class="btn" onclick="setView('traduire')">Terminé</button>
    ${buildTransQueue(transCat).length ? `<button class="btn sec mt" onclick="startTrans()">Continuer (${buildTransQueue(transCat).length})</button>` : ''}
  `;
}

/* ============================================================
   ANGLAIS SOUTENU — reformuler du neutre vers l’élégant (ES → ES)
   ============================================================ */
function regState(i) { return S.register[i] || { ease: 2.5, interval: 0, reps: 0, due: 0, introduced: false }; }
function rateRegister(i, rating) {
  const c = regState(i);
  c.introduced = true;
  const now = Date.now();
  if (rating === 0) { c.reps = 0; c.ease = Math.max(1.3, c.ease - 0.2); c.interval = 0; c.due = now + 60 * 1000; }
  else {
    if (c.interval < 1) c.interval = rating === 3 ? 4 : 1;
    else { const m = rating === 1 ? 1.2 : rating === 2 ? c.ease : c.ease * 1.3; c.interval = Math.round(c.interval * m); }
    if (rating === 1) c.ease = Math.max(1.3, c.ease - 0.15);
    if (rating === 3) c.ease += 0.15;
    c.reps += 1; c.due = now + Math.max(1, c.interval) * DAY;
  }
  S.register[i] = c; addXp(rating === 0 ? 2 : 6); save();
}
function regCats() { const s = []; REGISTER.forEach(t => { if (!s.includes(t.cat)) s.push(t.cat); }); return s; }
function regSeen() { let n = 0; for (const i in S.register) if (S.register[i].introduced) n++; return n; }
function regMastered() { let n = 0; for (const i in S.register) if (S.register[i].interval >= 21) n++; return n; }
function buildRegQueue(cat) {
  const now = Date.now();
  const due = [], news = [];
  REGISTER.forEach((t, i) => {
    if (cat !== 'Tous' && t.cat !== cat) return;
    const st = S.register[i];
    if (st && st.introduced) { if (st.due <= now) due.push(i); }
    else news.push(i);
  });
  shuffle(due); shuffle(news);
  const items = due.concat(news);
  const cap = cat === 'Tous' ? 12 : items.length;
  return items.slice(0, Math.max(due.length, cap));
}
let regCat = 'Tous';
function setRegCat(c) { regCat = c; renderRegisterHome(); }
function renderRegisterHome() {
  const cats = ['Tous'].concat(regCats());
  const chips = cats.map(c => {
    const n = c === 'Tous' ? REGISTER.length : REGISTER.filter(t => t.cat === c).length;
    return `<button class="segchip ${regCat === c ? 'on' : ''}" onclick="setRegCat('${c}')">${c} <span class="cnt">${n}</span></button>`;
  }).join('');
  const qlen = buildRegQueue(regCat).length;
  app.innerHTML = `
    <div class="card">
      <h2>✨ Espagnol soutenu</h2>
      <div class="sub">On passe du correct à l'<b style="color:var(--txt)">élégant</b>. Une phrase neutre s'affiche : reformule-la dans un registre soutenu, puis compare à une version raffinée avec l'explication du procédé (mot choisi, nominalisation, atténuation…).</div>
      <div class="row2 mt">
        <div><div class="logo" style="font-size:24px;color:var(--blue)">${regSeen()}<span style="font-size:15px;color:var(--muted)"> / ${REGISTER.length}</span></div><div class="sub">tournures vues</div></div>
        <div><div class="logo" style="font-size:24px;color:var(--good)">${regMastered()}</div><div class="sub">maîtrisées (≥21j)</div></div>
      </div>
    </div>
    <div class="card">
      <h2 style="font-size:15px">Cible un procédé de style</h2>
      <div class="segwrap mt">${chips}</div>
    </div>
    <button class="btn" onclick="startReg()" ${qlen === 0 ? 'disabled' : ''}>
      ${qlen === 0 ? 'Tout est à jour ici 🎉' : `Démarrer · ${qlen} tournure(s)`}
    </button>
    <button class="btn ghost mt" onclick="setView('home')">Retour</button>
  `;
}
let RG = null;
function startReg() {
  const queue = buildRegQueue(regCat);
  if (!queue.length) { toast('Rien à travailler ici pour le moment 🎉'); return; }
  RG = { queue, pos: 0, done: 0, shown: false };
  renderRegCard();
}
function renderRegCard() {
  if (RG.pos >= RG.queue.length) return finishReg();
  const t = REGISTER[RG.queue[RG.pos]];
  RG.shown = false;
  app.innerHTML = `
    <div class="qmeta"><span>${t.cat} · <span style="color:var(--accent)">${t.level}</span></span><span>${RG.pos + 1} / ${RG.queue.length}</span></div>
    <div class="pbar mb"><i style="width:${RG.pos / RG.queue.length * 100}%"></i></div>
    <div class="trans-mine"><div class="lbl">Version neutre</div>${t.plain}</div>
    <textarea id="reg-in" class="transinput" rows="2" placeholder="Reformule dans un registre soutenu (facultatif)…"></textarea>
    <button class="btn" onclick="revealReg()">Voir la version soutenue</button>
    <div class="mt"><button class="btn ghost" onclick="renderRegisterHome()">Quitter</button></div>
  `;
}
function revealReg() {
  if (RG.shown) return;
  RG.shown = true;
  const t = REGISTER[RG.queue[RG.pos]];
  const mine = (document.getElementById('reg-in') || {}).value || '';
  const mineHtml = mine.trim() ? `<div class="trans-mine"><div class="lbl">Ta reformulation</div>${escapeHtml(mine.trim())}</div>` : '';
  const altHtml = (t.alt && t.alt.length) ? `<div class="trans-alt">Autres tournures : ${t.alt.map(a => '« ' + escapeHtml(a) + ' »').join(' · ')}</div>` : '';
  const enEsc = t.elevated.replace(/'/g, "\\'");
  app.innerHTML = `
    <div class="qmeta"><span>${t.cat} · <span style="color:var(--accent)">${t.level}</span></span><span>${RG.pos + 1} / ${RG.queue.length}</span></div>
    <div class="trans-mine"><div class="lbl">Version neutre</div>${t.plain}</div>
    ${mineHtml}
    <div class="trans-model">
      <div class="lbl">Version soutenue <button class="spk sm" onclick="speak('${enEsc}')" title="Écouter">🔊</button></div>
      <div class="en">${t.elevated}</div>
      ${altHtml}
    </div>
    <div class="expl" style="border-color:var(--purple)">${t.note}</div>
    <div class="sub center mt mb">Ta version était…</div>
    <div class="srsrow">
      <button class="again" onclick="doRateReg(0)">À revoir</button>
      <button class="hard" onclick="doRateReg(1)">Timide</button>
      <button class="good" onclick="doRateReg(2)">Soignée</button>
      <button class="easy" onclick="doRateReg(3)">Élégante</button>
    </div>
  `;
  window.scrollTo(0, 0);
}
function doRateReg(rating) {
  const i = RG.queue[RG.pos];
  rateRegister(i, rating);
  RG.done++;
  bumpDaily('trans');
  if (rating === 0) RG.queue.push(i);
  RG.pos++;
  touchDay();
  renderRegCard();
}
function finishReg() {
  touchDay(); save();
  app.innerHTML = `
    <div class="card big">
      <div class="em">✨</div>
      <div class="score" style="color:var(--good)">+${RG.done}</div>
      <div class="lab">tournure(s) travaillée(s)</div>
      <div class="mt sub">Un registre soutenu se construit tournure par tournure. C'est la marque d’un espagnol vraiment maîtrisé.</div>
    </div>
    <button class="btn" onclick="renderRegisterHome()">Terminé</button>
    ${buildRegQueue(regCat).length ? `<button class="btn sec mt" onclick="startReg()">Continuer (${buildRegQueue(regCat).length})</button>` : ''}
  `;
}

/* ---------- Boot ---------- */
if (!S.badges) S.badges = [];
// Migration silencieuse : si des trophées sont déjà mérités mais jamais enregistrés, on les scelle sans notifier.
if (S.badges.length === 0) { const pre = earnedIds(); if (pre.length) { S.badges = pre; save(); } }
touchDay();
if (S.firstRun && !S.placementDone) { S.firstRun = false; save(); view = 'exam'; }
render();

/* ---------- Service worker ---------- */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
