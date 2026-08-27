/* ============================================================
   990 — Logique application (locale-first, localStorage)
   ============================================================ */
'use strict';

const DAY = 86400000;
let NEW_PER_DAY = 15;           // nouvelles cartes introduites par jour (piloté par le régime)
const MAX_INT = 365;            // plafond d'intervalle (jours) — un mot revu ~1×/an
const todayStr = () => new Date().toISOString().slice(0, 10);

/* ---------- État persistant ---------- */
const DEFAULT = {
  xp: 0,
  streak: 0,
  lastActive: null,
  lessons: {},          // id -> {best: %, done: bool}
  cards: {},            // index -> {ease, interval(jours), reps, due(ms), lapses, introduced}
  shadow: {},           // id de texte -> true (shadowing travaillé)
  dudas: {},            // id de mini-cours -> true (point consulté)
  lecturas: {},         // id de lecture -> true (lue)
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
  daily: { date: todayStr(), cards: 0, trans: 0, study: 0, pron: 0, conj: 0, credited: 0 }, // objectif du jour
  pronDays: 0,          // jours où la session de prononciation a été faite
  conjDone: 0,          // total de verbes conjugués (validés)
  conjPerfect: 0,       // total de verbes conjugués sans faute (6/6)
  conjState: null,      // { date, done[3], score[3], ans[3][6] } — défi conjugaison du jour
  mistakes: {},         // erreurs à rejouer (clé -> {kind,q,opts,correct,expl,cat,audio,box})
  register: {},         // SRS-lite du module Espagnol soutenu
  redaccion: {},        // expression écrite : id -> {text, done, ts}
  transDir: 'fr2en',    // sens de la traduction : fr2en ou en2fr
  badges: [],           // trophées débloqués (ids)
  longDone: 0,          // sessions d'écoute Part 3/4 terminées
  perfectDays: 0,       // jours où l'objectif du jour a été atteint
  slowAudio: false,     // vitesse d'écoute réduite
  voix: null,           // nom de la voix espagnole choisie (null = automatique)
  regime: 'rapido',     // intensité quotidienne (cf REGIMES)
  firstRun: true
};

// Objectifs quotidiens
let GOAL_CARDS = 20, GOAL_TRANS = 5; const GOAL_CONJ = 3;
/* Régimes d'intensité : pilotent le VOLUME quotidien (cartes à réviser, phrases à
   traduire, nouvelles cartes/jour). La conjugaison reste à 3 verbes (module à taille fixe). */
const REGIMES = {
  tranquilo: { emoji: '🌱', name: 'Tranquilo', cards: 15, trans: 5,  neu: 10, desc: "Jours chargés : l'essentiel, sans se noyer." },
  rapido:    { emoji: '🔥', name: 'Rápido',    cards: 30, trans: 8,  neu: 22, desc: "Le bon rythme pour avancer vite et tenir dans la durée." },
  intensivo: { emoji: '⚡', name: 'Intensivo', cards: 50, trans: 12, neu: 30, desc: "Gros volume quotidien. Le C1 sans traîner." },
  atope:     { emoji: '🚀', name: 'A tope',    cards: 80, trans: 18, neu: 40, desc: "Sprint. Soutenable quelques semaines, pas toute l'année." }
};
const REGIME_ORDER = ['tranquilo', 'rapido', 'intensivo', 'atope'];
const DEFAULT_REGIME = 'rapido';
function currentRegime() { return REGIMES[S.regime] || REGIMES[DEFAULT_REGIME]; }
function applyRegime() { const r = currentRegime(); GOAL_CARDS = r.cards; GOAL_TRANS = r.trans; NEW_PER_DAY = r.neu; }
function setRegime(k) { if (!REGIMES[k]) return; S.regime = k; save(); applyRegime(); toast(REGIMES[k].emoji + ' Intensité : ' + REGIMES[k].name); render(); }
function resetDailyIfNeeded() {
  if (!S.daily || S.daily.date !== todayStr()) S.daily = { date: todayStr(), cards: 0, trans: 0, study: 0, pron: 0, conj: 0 };
}
function bumpDaily(field, n) { resetDailyIfNeeded(); S.daily[field] = (S.daily[field] || 0) + (n || 1); save(); checkDailyDone(); }
function markStudy() { resetDailyIfNeeded(); S.daily.study = 1; save(); checkDailyDone(); }
function dailyProgress() {
  resetDailyIfNeeded();
  const c = Math.min(1, S.daily.cards / GOAL_CARDS);
  const t = Math.min(1, S.daily.trans / GOAL_TRANS);
  const s = S.daily.study ? 1 : 0;
  const p = S.daily.pron ? 1 : 0;
  const j = Math.min(1, (S.daily.conj || 0) / GOAL_CONJ);
  return { c, t, s, p, j, pct: Math.round((c + t + s + p + j) / 5 * 100), done: (c >= 1 && t >= 1 && s >= 1 && p >= 1 && j >= 1) };
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
applyRegime();                 // aligne les quotas quotidiens sur le régime choisi
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
/* mots ajoutés par l'utilisateur (depuis la Lecture du jour) : ré-injectés
   dans le deck à chaque ouverture, APRÈS le vocabulaire intégré (indices stables) */
if (S.userVocab && S.userVocab.length) window.VOCAB = window.VOCAB.concat(S.userVocab);
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
/* ---------- FSRS (Free Spaced Repetition Scheduler v5, paramètres par défaut) ----------
   Modèle Difficulté / Stabilité / Récupérabilité : au lieu d'un simple facteur SM-2,
   on estime la stabilité de la mémoire de CHAQUE carte et on planifie la prochaine
   révision pour une rétention cible (90 %). Plus efficace à long terme. */
const FSRS_W = [0.40255,1.18385,3.173,15.69105,7.1949,0.5345,1.4604,0.0046,1.54575,0.1192,1.01925,1.9395,0.11,0.29605,2.2698,0.2315,2.9898,0.51655,0.6621];
const FSRS_RR = 0.9;                                    // rétention cible
const FSRS_DECAY = -0.5;
const FSRS_FACTOR = Math.pow(0.9, 1 / FSRS_DECAY) - 1;  // ≈ 19/81
function _clampD(d) { return Math.min(10, Math.max(1, d)); }
function fsrsInitS(g) { return FSRS_W[g - 1]; }
function fsrsInitD(g) { return _clampD(FSRS_W[4] - Math.exp(FSRS_W[5] * (g - 1)) + 1); }
function fsrsRetr(t, S) { return Math.pow(1 + FSRS_FACTOR * t / S, FSRS_DECAY); }
function fsrsNextD(D, g) {
  const nd = D + (-FSRS_W[6] * (g - 3)) * (10 - D) / 9;           // amortissement linéaire
  return _clampD(FSRS_W[7] * fsrsInitD(4) + (1 - FSRS_W[7]) * nd); // retour vers la moyenne
}
function fsrsSuccS(D, S, R, g) {
  const hard = g === 2 ? FSRS_W[15] : 1, easy = g === 4 ? FSRS_W[16] : 1;
  return S * (1 + Math.exp(FSRS_W[8]) * (11 - D) * Math.pow(S, -FSRS_W[9]) * (Math.exp((1 - R) * FSRS_W[10]) - 1) * hard * easy);
}
function fsrsFailS(D, S, R) {
  return Math.min(S, FSRS_W[11] * Math.pow(D, -FSRS_W[12]) * (Math.pow(S + 1, FSRS_W[13]) - 1) * Math.exp((1 - R) * FSRS_W[14]));
}
function fsrsIntervalDays(S) { return (S / FSRS_FACTOR) * (Math.pow(FSRS_RR, 1 / FSRS_DECAY) - 1); } // = S quand RR=0.9
// migre une carte SM-2 déjà apprise vers la mémoire FSRS (sans perte de progression)
function fsrsMigrate(c) {
  if (typeof c.fsrsS !== 'number' && c.introduced && c.interval >= 1) {
    c.fsrsS = Math.max(1, c.interval);
    c.fsrsD = _clampD(11.7 - 2.68 * (c.ease || 2.5));
  }
}
// planifie sans muter : { D, S, interval(jours), due, learning }
function fsrsSchedule(c, rating, now) {
  const g = rating + 1;                         // 1=Again 2=Hard 3=Good 4=Easy
  let D = c.fsrsD, S = c.fsrsS;
  if (typeof S !== 'number') { D = fsrsInitD(g); S = fsrsInitS(g); }
  else {
    const t = c.last ? Math.max(0, (now - c.last) / DAY) : Math.max(1, c.interval || 1);
    const R = fsrsRetr(t, S);
    D = fsrsNextD(D, g);
    S = g === 1 ? fsrsFailS(D, S, R) : fsrsSuccS(D, S, R, g);
  }
  if (g === 1) return { D, S, interval: 0, due: now + 60 * 1000, learning: true };
  const iv = Math.min(MAX_INT, Math.max(1, Math.round(fsrsIntervalDays(S))));
  return { D, S, interval: iv, due: now + iv * DAY, learning: false };
}

// rating: 0 again, 1 hard, 2 good, 3 easy
function rateCard(i, rating) {
  const c = cardState(i);
  const wasReview = !!c.introduced && c.interval >= 1;   // vraie révision (pour le diagnostic)
  const wasMature = c.interval >= 21;
  const prevInt = c.interval;
  fsrsMigrate(c);
  if (!c.introduced) { c.introduced = true; S.newToday += 1; }
  const now = Date.now();
  const sc = fsrsSchedule(c, rating, now);
  c.fsrsD = sc.D; c.fsrsS = sc.S; c.last = now;
  if (sc.learning) {                              // Again → reprise dans la session
    c.reps = 0; c.lapses += 1; c.interval = 0; c.due = sc.due;
  } else {
    let iv = sc.interval;
    if (iv >= 3) { const f = 1 + (Math.random() * 0.12 - 0.06); iv = Math.min(MAX_INT, Math.max(2, Math.round(iv * f))); } // fuzz ±6 %
    c.interval = iv; c.reps += 1; c.due = now + iv * DAY;
  }
  if (typeof c.ease !== 'number') c.ease = 2.5;   // champ conservé (compat / affichage)
  S.cards[i] = c;
  S.reviewsDone += 1;
  if (!S.revLog) S.revLog = [];
  S.revLog.push({ t: now, r: rating, v: wasReview ? 1 : 0, m: wasMature ? 1 : 0, pi: prevInt });
  if (S.revLog.length > 3000) S.revLog = S.revLog.slice(-3000);
  addXp(rating === 0 ? 1 : 3);
  save();
}
function nextDueLabel(i, rating) {          // aperçu sur les boutons
  if (rating === 0) return '< 1 j';
  const c = Object.assign({}, cardState(i));   // clone : on ne mute pas l'état réel
  fsrsMigrate(c);
  const sc = fsrsSchedule(c, rating, Date.now());
  let iv = sc.interval;
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

/* ============================================================
   LECTURA DEL DÍA — textes C1-C2 avec aides à la compréhension
   ============================================================ */
function lecOfToday(){ const doy=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/864e5);
  const nuevos=LECTURAS.filter(l=>!lecDone(l.id)); const pool=nuevos.length?nuevos:LECTURAS;  /* priorité aux textes non lus */
  return pool[doy%pool.length]; }
function lecDone(id){ return S.lecturas && S.lecturas[id]; }
let LEC=null;
function renderLecturaHome(){
  window.scrollTo(0,0);
  const hoy=lecOfToday(), done=LECTURAS.filter(l=>lecDone(l.id)).length;
  const rows=LECTURAS.map(l=>`
    <button class="tile" onclick="openLectura('${l.id}')">
      <div class="ic e">${lecDone(l.id)?'✅':'📖'}</div>
      <div class="body"><div class="t">${l.title}</div><div class="d">${l.theme}</div></div>
      <div class="badge zero">${l.level}</div>
    </button>`).join('');
  app.innerHTML=`
    <div class="card" style="border-color:var(--accent)">
      <h2>📖 Lectura del día</h2>
      <div class="sub">Des textes C1-C2 que j'écris pour toi, sur des sujets d'avenir. Touche un mot souligné pour son sens, révise le glossaire et les expressions, puis teste ta compréhension. Lire de l'espagnol authentique, c'est ce qui fait décoller à ce niveau.</div>
      <button class="btn mt" onclick="openLectura('${hoy.id}')">${lecDone(hoy.id)?'Relire':'Lire'} celle du jour · ${hoy.level}</button>
      <div class="sub center mt" style="font-size:13px">« ${hoy.title} »</div>
    </div>
    <div class="sub mb" style="padding-left:4px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:12px">Toutes les lectures · ${done}/${LECTURAS.length} lues</div>
    ${rows}
    <button class="btn ghost mt" onclick="setView('home')">Accueil</button>
  `;
}
function glossHtml(txt){ return txt.replace(/\[([^\]]+)\]/g,(m,w)=>`<span class="gl${wordInDeck(w)?' added':''}" onclick="lecGloss(this)">${w}</span>`); }
function lecGloss(el){ const w=el.textContent.trim(); const g=(LEC&&LEC.glosario[w])||''; lecWordSheet(w,g); }

/* --- ajout d'un mot de la lecture aux cartes Anki --- */
function wordInDeck(w){ const n=String(w).toLowerCase().trim(); return VOCAB.some(v=>String(v[0]).toLowerCase().trim()===n); }
function closeWordSheet(){ const s=document.getElementById('wsheet'); if(s) s.remove(); }
function lecWordSheet(word, gloss){
  closeWordSheet();
  const inDeck=wordInDeck(word);
  const sheet=document.createElement('div'); sheet.id='wsheet'; sheet.className='wsheet';
  const box=document.createElement('div'); box.className='wsheet-in';
  const head=document.createElement('div'); head.style.cssText='display:flex;align-items:center;gap:10px';
  const b=document.createElement('b'); b.style.fontSize='18px'; b.textContent=word;
  const spk=document.createElement('button'); spk.textContent='🔊';
  spk.style.cssText='background:none;border:1px solid var(--line);border-radius:8px;padding:2px 8px;color:var(--muted);font-size:14px';
  spk.onclick=()=>speak(word);
  const x=document.createElement('button'); x.textContent='✕';
  x.style.cssText='margin-left:auto;background:none;border:none;color:var(--muted);font-size:18px';
  x.onclick=closeWordSheet;
  head.append(b,spk,x);
  const def=document.createElement('div'); def.className='sub mt'; def.style.cssText='font-size:14px;color:var(--txt)'; def.textContent=gloss||'—';
  const add=document.createElement('button'); add.id='wsheetAdd'; add.className='btn mt'+(inDeck?' sec':'');
  add.textContent=inDeck?'✓ Déjà dans tes cartes':'🃏 Ajouter aux cartes Anki';
  if(inDeck) add.disabled=true; else add.onclick=()=>addWordToAnki(word, gloss);
  box.append(head,def,add); sheet.append(box); document.body.appendChild(sheet);
}
function addWordToAnki(word, gloss){
  const w=String(word).trim();
  if(wordInDeck(w)){ toast('Déjà dans tes cartes ✓'); return; }
  if(!S.userVocab) S.userVocab=[];
  const card=[w, gloss||w, '', 'Lectura'];
  S.userVocab.push(card); VOCAB.push(card); VOCAB_ORDER.push(VOCAB.length-1);
  save();
  toast('🃏 « '+w+' » ajouté à tes cartes');
  const btn=document.getElementById('wsheetAdd'); if(btn){ btn.textContent='✓ Ajouté à tes cartes'; btn.className='btn sec mt'; btn.disabled=true; }
  document.querySelectorAll('.gl').forEach(el=>{ if(el.textContent.trim().toLowerCase()===w.toLowerCase()) el.classList.add('added'); });
}
function openLectura(id){
  const l=LECTURAS.find(x=>x.id===id); if(!l) return;
  LEC={id, glosario:l.glosario, preguntas:l.preguntas, correct:0};
  window.scrollTo(0,0);
  app.innerHTML=`
    <div class="qmeta"><span>📖 Lectura · <span style="color:var(--accent)">${l.level}</span></span><span>${l.theme}</span></div>
    <div class="card"><h2 style="font-size:19px">${l.title}</h2><div class="sub mt" style="font-size:13px">${l.intro}</div></div>
    <div class="card lectext">${l.parrafos.map(p=>`<p>${glossHtml(p)}</p>`).join('')}</div>
    <div class="sub center" style="font-size:12px;margin:-4px 0 14px">👆 Touche un mot <span class="gl">souligné</span> : son sens s'affiche, et tu peux l'<b style="color:var(--txt)">ajouter à tes cartes Anki</b>.</div>
    <div class="card"><h3 style="font-size:15px;margin-bottom:10px">📘 Glosario</h3>
      ${Object.entries(l.glosario).map(([w,g])=>`<div class="glrow"><b>${w}</b><span>${g}</span></div>`).join('')}</div>
    <div class="card"><h3 style="font-size:15px;margin-bottom:10px">🔑 Expresiones clave · à réutiliser</h3>
      ${l.claves.map(([es,fr])=>`<div class="glrow"><b>${es}</b><span>${fr}</span></div>`).join('')}</div>
    <div class="card"><h3 style="font-size:15px;margin-bottom:12px">✍️ ¿Lo has entendido?</h3>
      ${l.preguntas.map((q,qi)=>`<div class="lq" data-a="${q.a}">
        <div style="font-weight:700;margin-bottom:8px">${qi+1}. ${q.q}</div>
        <div id="lqo-${qi}">${q.opts.map((o,oi)=>`<button class="opt" onclick="lecAnswer(${qi},${oi})">${o}</button>`).join('')}</div>
        <div id="lqe-${qi}" class="expl" style="display:none"></div></div>`).join('')}
    </div>
    <button class="btn ghost mt" onclick="renderLecturaHome()">← Toutes les lectures</button>
  `;
}
function lecAnswer(qi,oi){
  const box=document.querySelectorAll('.lq')[qi];
  if(!box||box.dataset.answered) return;
  box.dataset.answered='1';
  const a=+box.dataset.a;
  box.querySelectorAll('#lqo-'+qi+' .opt').forEach((b,i)=>{ b.setAttribute('disabled','');
    if(i===a) b.classList.add('good'); else if(i===oi) b.classList.add('bad'); else b.classList.add('dim'); });
  const ex=document.getElementById('lqe-'+qi); if(ex){ ex.textContent=LEC.preguntas[qi].exp; ex.style.display='block'; }
  if(oi===a) LEC.correct++;
  addXp(oi===a?3:1);
  if([...document.querySelectorAll('.lq')].every(b=>b.dataset.answered)){
    if(!S.lecturas) S.lecturas={}; S.lecturas[LEC.id]=true; markStudy(); save();
    toast('📖 ¡Lectura terminada! '+LEC.correct+'/'+LEC.preguntas.length);
  }
}

function render() {
  refreshHeader();
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('on', b.dataset.v === view));
  window.scrollTo(0, 0);
  if (view === 'home') return renderHome();
  if (view === 'grammar') return renderGrammarList();
  if (view === 'anki') return renderAnkiHome();
  if (view === 'listen') return renderListenHome();
  if (view === 'shadow') return renderShadowHome();
  if (view === 'lectura') return renderLecturaHome();
  if (view === 'pron') return renderPronHome();
  if (view === 'hablar') return renderHablarHome();
  if (view === 'redaccion') return renderRedaccionHome();
  if (view === 'conj') return renderConjHome();
  if (view === 'afondo') return renderAfondoHome();
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
  { id: 'xp1000', ic: '⭐', title: 'Mille XP', desc: '1000 XP cumulés', test: () => S.xp >= 1000 },
  { id: 'pron7', ic: '👅', title: 'Lengua de trapo', desc: '7 sessions de prononciation', test: () => (S.pronDays || 0) >= 7 },
  { id: 'conj25', ic: '🔩', title: 'Conjugueur', desc: '25 verbes conjugués', test: () => (S.conjDone || 0) >= 25 },
  { id: 'conj100', ic: '⚙️', title: 'Machine à conjuguer', desc: '100 verbes conjugués', test: () => (S.conjDone || 0) >= 100 },
  { id: 'redac3', ic: '📝', title: 'Redactor', desc: '3 rédactions travaillées', test: () => redaccionDone() >= 3 }
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
  if (dp.j < 1) return { title: 'Conjugaison obligatoire', msg: `${GOAL_CONJ} verbes du jour à conjuguer en entier — c'est là que la grammaire devient un réflexe. Pas d'esquive.`, btn: 'Conjuguer', action: "setView('conj')" };
  if (dp.t < 1 && buildTransQueue('Tous').length) return { title: 'Passe à la production', msg: 'Traduire des phrases rend ta grammaire active — le vrai déclic bilingue.', btn: 'Traduire', action: "setView('traduire')" };
  if (!dp.p) return { title: 'Travaille ta bouche', msg: 'La session de prononciation du jour : le R roulé surtout. 5 minutes qui changent ton accent.', btn: 'Prononcer', action: "setView('pron')" };
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
        ${goalLine(dp.j >= 1, 'Conjuguer 3 verbes', `${Math.min(S.daily.conj || 0, GOAL_CONJ)}/${GOAL_CONJ}`)}
        ${goalLine(dp.p >= 1, 'Prononciation (R · ñ)', dp.p ? 'fait' : '0/1')}
        ${goalLine(dp.t >= 1, 'Traduire des phrases', `${Math.min(S.daily.trans, GOAL_TRANS)}/${GOAL_TRANS}`)}
        ${goalLine(dp.s >= 1, 'Étudier (grammaire/écoute)', dp.s ? 'fait' : '0/1')}
        <div class="sub mt" style="font-size:12px;color:var(--muted)">Intensité : <b style="color:var(--txt)">${currentRegime().emoji} ${currentRegime().name}</b> · <span style="color:var(--accent);cursor:pointer" onclick="setView('anki')">régler ›</span></div>
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

    ${(typeof LECTURAS !== 'undefined') ? `
    <button class="tile" style="${lecDone(lecOfToday().id)?'':'border-color:var(--accent)'}" onclick="setView('lectura')">
      <div class="ic a">📖</div>
      <div class="body"><div class="t">Lecture du jour · ${lecOfToday().level}</div><div class="d">« ${lecOfToday().title} » — texte + aides</div></div>
      <div class="badge ${lecDone(lecOfToday().id)?'':'zero'}">${lecDone(lecOfToday().id)?'✓':'!'}</div>
    </button>` : ''}

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

    <button class="tile" style="${dp.j>=1?'':'border-color:var(--blue)'}" onclick="setView('conj')">
      <div class="ic g">🔩</div>
      <div class="body"><div class="t">Conjugaison du jour</div><div class="d">3 verbes · 3 temps · à conjuguer en entier</div></div>
      <div class="badge ${dp.j>=1?'':'zero'}">${Math.min(S.daily.conj||0,GOAL_CONJ)}/${GOAL_CONJ}</div>
    </button>

    <button class="tile" style="${dp.p>=1?'':'border-color:var(--accent)'}" onclick="setView('pron')">
      <div class="ic a">👅</div>
      <div class="body"><div class="t">Prononciation du jour</div><div class="d">Le R roulé & la ñ — modèle audio + technique</div></div>
      <div class="badge ${dp.p>=1?'':'zero'}">${dp.p>=1?'✓':'!'}</div>
    </button>

    <button class="tile" onclick="setView('hablar')">
      <div class="ic l">🗣️</div>
      <div class="body"><div class="t">Hablar — parler d'un sujet</div><div class="d">Monologue guidé (DELE) : plan, chrono, analyse & modèle</div></div>
      <div class="badge zero">${(typeof HABLAR!=='undefined')?HABLAR.length:0}</div>
    </button>

    <button class="tile" style="border-color:var(--good)" onclick="setView('redaccion')">
      <div class="ic e">✍️</div>
      <div class="body"><div class="t">Rédaction — expression écrite</div><div class="d">Essai d'opinion, mail formel… guión, connecteurs, modèle + correction par Claude</div></div>
      <div class="badge zero">${(typeof REDACCION!=='undefined')?REDACCION.length:0}</div>
    </button>

    <button class="tile" onclick="setView('grammar')">
      <div class="ic g">📘</div>
      <div class="body"><div class="t">Grammaire Part 5</div><div class="d">${doneLessons} / ${LESSONS.length} leçons validées</div></div>
      <div class="badge ${doneLessons===LESSONS.length?'':'zero'}">${doneLessons}/${LESSONS.length}</div>
    </button>

    <button class="tile" onclick="setView('afondo')">
      <div class="ic l">🚀</div>
      <div class="body"><div class="t">A fondo · entraînement bonus</div><div class="d">Verbes qui changent · concordance des temps · repaso — quand tu as plus de temps</div></div>
      <div class="badge zero">＋</div>
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
  estiloindirecto: [], pasivase: [], conectores: [],
  /* palier C1-C2 */
  seinvol: ['Nuances C2'], concesivas: ['Nuances C2'], relativo: ['Nuances C2'],
  loneutro: ['Nuances C2'], causafin: ['Nuances C2'], correlacion: ['Nuances C2'],
  /* palier C1->C2 (lot 4) */
  pronominales: ['Matices C1'], probabilidad: ['Matices C1'], consecomp: ['Matices C1'], acentuacion: []
};
function doneLessons() { return LESSONS.filter(l => S.lessons[l.id] && S.lessons[l.id].done); }
function buildMix(n) {
  n = n || 12;
  const done = doneLessons();
  const mcq = [];
  done.forEach(l => l.q.forEach(q => mcq.push({
    type: 'mcq', lessonTitle: l.title, stem: q[0], opts: q[1], correct: q[2], expl: q[3]
  })));
  // + exemples supplémentaires « A fondo » des leçons validées
  done.forEach(l => ((typeof LESSON_EXTRA !== 'undefined' && LESSON_EXTRA[l.id]) || []).forEach(q => mcq.push({
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
  const dpg = dailyProgress();
  const conjCard = `
    <div class="card" style="border-color:${dpg.j >= 1 ? 'var(--good)' : 'var(--accent)'}">
      <h2 style="font-size:16px">🔩 Conjugaison du jour ${dpg.j >= 1 ? '✅' : ''}</h2>
      <div class="sub">Obligatoire : <b style="color:var(--txt)">3 verbes</b> tirés à <b style="color:var(--txt)">3 temps différents</b>, à conjuguer <b style="color:var(--txt)">en entier</b> (les 6 personnes). Réguliers et irréguliers. Correction automatique, accents compris.</div>
      <button class="btn mt" onclick="setView('conj')">${dpg.j >= 1 ? `Revoir · ${Math.min(S.daily.conj || 0, GOAL_CONJ)}/${GOAL_CONJ} fait` : `Conjuguer · ${Math.min(S.daily.conj || 0, GOAL_CONJ)}/${GOAL_CONJ}`}</button>
    </div>`;
  const tensesCard = `
    <div class="card" style="border-color:var(--blue)">
      <h2 style="font-size:16px">📖 Les temps · conjugaisons</h2>
      <div class="sub">La référence complète : formation, verbes modèles, irréguliers clés et exemples traduits — impératif, subjonctif imparfait, hypothèses… Consultable à tout moment, sans quiz.</div>
      <button class="btn sec mt" onclick="renderTensesList()">Ouvrir la référence · ${TENSES.length} temps</button>
    </div>`;
  const dudasN = (typeof DUDAS !== 'undefined') ? DUDAS.length : 0;
  const dudasDone = (typeof DUDAS !== 'undefined') ? DUDAS.filter(d => dudaDone(d.id)).length : 0;
  const dudasCard = dudasN ? `
    <div class="card" style="border-color:var(--accent)">
      <h2 style="font-size:16px">💡 Dudas y matices</h2>
      <div class="sub">Les petits pièges qui font la différence : <b style="color:var(--txt)">nada/ningún</b>, <b style="color:var(--txt)">gran/grande</b>, saber/conocer, por qué/porque, le « lo » neutre… Règle claire + exemples + le piège francophone + mini-test.</div>
      <button class="btn sec mt" onclick="renderDudasList()">Ouvrir · ${dudasN} points ${dudasDone ? `· ${dudasDone} vus` : ''}</button>
    </div>` : '';
  app.innerHTML = `
    <div class="card">
      <h2>Grammaire</h2>
      <div class="sub">Valide une leçon (≥ 70 %) pour débloquer la suivante. Chaque bonne réponse rapporte de l'XP.</div>
    </div>
    ${conjCard}
    <div class="card" style="border-color:var(--purple)">
      <h2 style="font-size:16px">🚀 A fondo · entraînement bonus</h2>
      <div class="sub">Pour aller plus vite les jours où tu as du temps : <b style="color:var(--txt)">verbes qui changent</b> (diphtongue/affaiblissement), <b style="color:var(--txt)">concordance des temps</b>, et <b style="color:var(--txt)">repaso</b> d'une leçon avec de nouveaux exemples.</div>
      <button class="btn sec mt" onclick="setView('afondo')">Ouvrir A fondo</button>
    </div>
    ${dudasCard}
    ${tensesCard}
    ${mixCard}
    ${rows}
  `;
}

/* ---------- DUDAS Y MATICES : mini-cours ciblés ---------- */
function dudaDone(id) { return S.dudas && S.dudas[id]; }
function renderDudasList() {
  window.scrollTo(0, 0);
  const done = (DUDAS || []).filter(d => dudaDone(d.id)).length;
  const rows = DUDAS.map(d => `
    <div class="lrow ${dudaDone(d.id) ? 'done' : ''}" onclick="renderDuda('${d.id}')">
      <div class="n">${dudaDone(d.id) ? '✓' : '💡'}</div>
      <div class="info"><div class="tt">${d.title}</div><div class="tg">${d.tag}</div></div>
      <div class="sc">›</div>
    </div>`).join('');
  app.innerHTML = `
    <div class="card">
      <h2>Dudas y matices</h2>
      <div class="sub">Les points qui coincent : nada/ningún, gran/grande, ser/estar qui changent le sens, por qué/porque… Une règle claire, des exemples contrastés, le piège francophone, et un mini-test. Consultable quand tu veux.</div>
      <div class="sub center mt" style="font-size:13px">${done}/${DUDAS.length} points consultés</div>
    </div>
    ${rows}
    <button class="btn ghost mt" onclick="setView('grammar')">Retour à la grammaire</button>
  `;
}
function renderDuda(id) {
  const d = DUDAS.find(x => x.id === id);
  if (!d) return renderDudasList();
  window.scrollTo(0, 0);
  const cuerpo = d.cuerpo.map(b => `
    <div class="tsec">
      <div style="font-size:14.5px;line-height:1.55">${b.t}</div>
      ${(b.ej || []).map(([es, fr]) => `<div class="exs mt"><span class="es">${es}</span><span class="fr">${fr}</span></div>`).join('')}
    </div>`).join('');
  const check = (d.check && d.check.length) ? `
    <div class="tsec"><div class="th">✍️ Compruébalo</div>
      ${d.check.map((c, ci) => `
        <div class="dcheck" data-correct="${c[2]}" style="margin:10px 0">
          <div style="font-weight:600;margin-bottom:6px">${c[0]}</div>
          <div id="dopts-${ci}">${c[1].map((o, oi) => `<button class="opt" onclick="dudaAnswer(${ci},${oi})">${o}</button>`).join('')}</div>
          <div id="dexpl-${ci}" class="expl" style="display:none"></div>
        </div>`).join('')}
    </div>` : '';
  app.innerHTML = `
    <div class="card">
      <div class="pill warn">${d.tag}</div>
      <h2 class="mt">${d.title}</h2>
      <div class="expl mt" style="border-color:var(--accent)"><b>La clave</b><br>${d.clave}</div>
      ${cuerpo}
      ${d.error ? `<div class="expl mt" style="border-color:var(--bad)"><b>❗ El error típico francófono</b><br>${d.error}</div>` : ''}
      ${check}
    </div>
    <button class="btn ghost mt" onclick="renderDudasList()">← Todas las dudas</button>
  `;
  DUDA_CUR = { id, expls: (d.check || []).map(c => c[3]) };
  if (!d.check || !d.check.length) markDudaDone(id);   // sans test, la lecture suffit
}
let DUDA_CUR = null;
function dudaAnswer(ci, oi) {
  const box = document.querySelectorAll('.dcheck')[ci];
  if (!box || box.dataset.answered) return;
  box.dataset.answered = '1';
  const correct = +box.dataset.correct;
  box.querySelectorAll('#dopts-' + ci + ' .opt').forEach((b, i) => {
    b.setAttribute('disabled', '');
    if (i === correct) b.classList.add('good');
    else if (i === oi) b.classList.add('bad');
    else b.classList.add('dim');
  });
  const ex = document.getElementById('dexpl-' + ci);
  if (ex) { ex.textContent = (DUDA_CUR && DUDA_CUR.expls[ci]) || ''; ex.style.display = 'block'; }
  addXp(oi === correct ? 2 : 1);
  // point consulté = validé quand tous les check sont répondus (ou dès la lecture s'il n'y en a pas)
  const boxes = document.querySelectorAll('.dcheck');
  if ([...boxes].every(b => b.dataset.answered) && DUDA_CUR) markDudaDone(DUDA_CUR.id);
}
function markDudaDone(id) {
  if (!S.dudas) S.dudas = {};
  if (!S.dudas[id]) { S.dudas[id] = true; markStudy(); save(); }
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

/* ---------- DIAGNOSTIC : efficacité du SRS ---------- */
function srsStats() {
  const log = S.revLog || [];
  const now = Date.now();
  const rev = log.filter(x => x.v);                 // vraies révisions (carte déjà mûrie)
  const mat = log.filter(x => x.m);                 // révisions de cartes ancrées (≥21 j)
  const nRev = rev.length;
  const retention = nRev ? Math.round(rev.filter(x => x.r >= 2).length / nRev * 100) : null;
  const matRet = mat.length >= 10 ? Math.round(mat.filter(x => x.r >= 2).length / mat.length * 100) : null;
  const againRate = nRev ? Math.round(rev.filter(x => x.r === 0).length / nRev * 100) : null;
  const dist = [0, 0, 0, 0]; rev.forEach(x => dist[x.r]++);
  // rythme 30 j
  const days = {}; log.filter(x => x.t >= now - 30 * DAY).forEach(x => { const d = new Date(x.t).toISOString().slice(0, 10); days[d] = (days[d] || 0) + 1; });
  const activeDays = Object.keys(days).length;
  const last30 = Object.values(days).reduce((a, b) => a + b, 0);
  // maturation du deck
  let bLearn = 0, bYoung = 0, bMat = 0;
  for (const i in S.cards) { const c = S.cards[i]; if (!c.introduced) continue; if (c.interval >= 21) bMat++; else if (c.interval >= 7) bYoung++; else bLearn++; }
  // charge à venir (7 jours)
  const fore = [0, 0, 0, 0, 0, 0, 0];
  for (const i in S.cards) { const c = S.cards[i]; if (!c.introduced) continue; const d = Math.floor((c.due - now) / DAY); if (d >= 0 && d < 7) fore[d]++; else if (c.due <= now) fore[0]++; }
  return { nRev, total: log.length, retention, matRet, againRate, dist, last30, activeDays, avgDay: activeDays ? Math.round(last30 / activeDays) : 0, bLearn, bYoung, bMat, fore };
}
function renderSrsDiag() {
  window.scrollTo(0, 0);
  const s = srsStats();
  const enough = s.retention != null && s.nRev >= 30;
  let verdict, vcol;
  if (!enough) { verdict = "Il faut environ 30 révisions de cartes déjà apprises pour un diagnostic fiable. L'app enregistre déjà tout — reviens ici après quelques jours de révisions."; vcol = 'var(--muted)'; }
  else if (s.retention >= 92) { verdict = "Rétention très élevée. Excellent pour la mémoire, mais tu revois sans doute tes cartes un peu trop tôt : tu peux te permettre plus de nouvelles cartes par jour sans risque."; vcol = 'var(--blue)'; }
  else if (s.retention >= 82) { verdict = "Zone idéale (~85–90 %). L'algorithme est bien calibré : tu revois chaque mot juste avant de l'oublier, sans perdre de temps. C'est exactement le but d'un SRS."; vcol = 'var(--good)'; }
  else { verdict = "Rétention un peu basse : trop de mots oubliés au moment de les revoir. Réflexe : appuie sur « Encore » / « Difficile » sans culpabiliser (ça raccourcit les intervalles), et n'introduis pas trop de nouvelles cartes d'un coup."; vcol = 'var(--accent)'; }
  const distTot = Math.max(1, s.dist.reduce((a, b) => a + b, 0));
  const bar = (label, n, col) => `
    <div style="display:flex;align-items:center;gap:8px;margin:4px 0;font-size:13px">
      <span style="width:74px;color:var(--muted)">${label}</span>
      <div style="flex:1;height:10px;background:var(--bg2);border-radius:6px;overflow:hidden"><i style="display:block;height:100%;width:${Math.round(n / distTot * 100)}%;background:${col}"></i></div>
      <span style="width:52px;text-align:right;font-weight:700">${Math.round(n / distTot * 100)}%</span>
    </div>`;
  const foreMax = Math.max(1, ...s.fore);
  const foreBars = s.fore.map((n, k) => `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
      <div style="width:100%;height:70px;display:flex;align-items:flex-end"><div style="width:100%;background:var(--accent);border-radius:4px;height:${Math.round(n / foreMax * 70)}px;min-height:${n ? 3 : 0}px"></div></div>
      <small style="font-size:10px;color:var(--muted)">${k === 0 ? 'auj' : 'J+' + k}</small>
      <small style="font-size:10px;color:var(--txt);font-weight:700">${n}</small>
    </div>`).join('');
  const matur = s.bLearn + s.bYoung + s.bMat;
  app.innerHTML = `
    <button class="btn ghost" style="width:auto;padding:8px 14px;margin-bottom:12px" onclick="renderAnkiHome()">‹ Cartes</button>
    <div class="card" style="border-color:${vcol}">
      <h2>📊 Efficacité de l'algorithme</h2>
      <div class="sub mt">La bonne mesure d'un système de révision espacée n'est pas « combien de cartes », mais le <b style="color:var(--txt)">taux de rétention</b> : le % de cartes que tu retrouves correctement au moment où elles reviennent. La cible d'un bon SRS est <b style="color:var(--txt)">85–90 %</b> — assez haut pour ne pas oublier, assez bas pour ne pas réviser dans le vide.</div>
    </div>
    <div class="card center">
      <div class="sub">Ton taux de rétention ${enough ? '' : '(provisoire)'}</div>
      <div style="font-size:52px;font-weight:900;color:${enough ? vcol : 'var(--muted)'};line-height:1.1">${s.retention != null ? s.retention + '%' : '—'}</div>
      <div class="sub">sur ${s.nRev} révision(s) de cartes déjà apprises</div>
      <div class="scoreline mt">
        <div><div class="v" style="font-size:22px">${s.matRet != null ? s.matRet + '%' : '—'}</div><div class="k">rétention cartes ancrées</div></div>
        <div><div class="v" style="font-size:22px">${s.againRate != null ? s.againRate + '%' : '—'}</div><div class="k">taux d'oubli (« Encore »)</div></div>
        <div><div class="v" style="font-size:22px">${s.avgDay || '—'}</div><div class="k">révisions / jour actif</div></div>
      </div>
    </div>
    <div class="card" style="background:linear-gradient(135deg,${vcol}18,var(--card));border-color:${vcol}">
      <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:${vcol}">Verdict</div>
      <div class="mt" style="font-size:14.5px;line-height:1.55">${verdict}</div>
    </div>
    <div class="card">
      <h3 style="font-size:15px;margin-bottom:8px">Répartition de tes réponses (révisions)</h3>
      ${bar('Encore', s.dist[0], 'var(--bad)')}
      ${bar('Difficile', s.dist[1], 'var(--accent)')}
      ${bar('Correct', s.dist[2], 'var(--blue)')}
      ${bar('Facile', s.dist[3], 'var(--good)')}
      <div class="sub mt" style="font-size:12px">Idéalement, « Encore » reste autour de 10–15 %. Beaucoup plus = intervalles trop longs ; presque zéro = tu révises trop tôt.</div>
    </div>
    <div class="card">
      <h3 style="font-size:15px;margin-bottom:8px">Maturation du deck (${matur} cartes apprises)</h3>
      ${bar('En cours', s.bLearn, 'var(--accent)')}
      ${bar('Jeunes', s.bYoung, 'var(--blue)')}
      ${bar('Ancrées', s.bMat, 'var(--good)')}
      <div class="sub mt" style="font-size:12px">« Ancrées » = intervalle ≥ 21 jours : les mots qui sont vraiment passés en mémoire long terme.</div>
    </div>
    <div class="card">
      <h3 style="font-size:15px;margin-bottom:10px">Charge de révisions à venir (7 jours)</h3>
      <div style="display:flex;gap:6px;align-items:flex-end">${foreBars}</div>
      <div class="sub mt" style="font-size:12px">Grâce à la dispersion (fuzz) que je viens d'ajouter, ces piles devraient rester régulières plutôt que de former des pics.</div>
    </div>
    <div class="card">
      <h3 style="font-size:14px;margin-bottom:6px">🔧 L'algorithme : passage à FSRS</h3>
      <div class="sub" style="font-size:13px;line-height:1.6">
        · <b style="color:var(--txt)">FSRS</b> (l'algo moderne d'Anki) remplace le vieux SM-2 : il estime la <i>stabilité</i> de ta mémoire pour chaque mot et planifie la révision pile pour une rétention de ${Math.round(FSRS_RR*100)} %. Plus efficace : moins de révisions pour une meilleure mémoire.<br>
        · Ta progression a été <b style="color:var(--txt)">migrée sans perte</b> vers FSRS.<br>
        · <b style="color:var(--txt)">Fuzz ±6 %</b> + <b style="color:var(--txt)">plafond 1 an</b> + journalisation (ce diagnostic).
      </div>
    </div>
  `;
}

/* ---------- ANKI : accueil session ---------- */
function renderAnkiHome() {
  const due = dueCards().length;
  const news = newAvailable(false).length;         // nouvelles dispo aujourd'hui (plafonné)
  const total = due + news;
  const remaining = totalUnlearned();              // toutes les cartes encore jamais vues
  const unlimitedTotal = due + remaining;
  const rg = currentRegime();
  const regChips = REGIME_ORDER.map(k => {
    const r = REGIMES[k], on = (S.regime || DEFAULT_REGIME) === k;
    return `<button class="segchip" style="${on ? 'border-color:var(--accent);color:var(--accent);font-weight:800' : ''}" onclick="setRegime('${k}')">${r.emoji} ${r.name}</button>`;
  }).join('');
  // répartition par thème
  const themes = {};
  VOCAB.forEach(v => { themes[v[3]] = (themes[v[3]] || 0) + 1; });
  const themeHtml = Object.entries(themes).map(([t, n]) =>
    `<button class="segchip" onclick="startThemeReview('${t}')">${t} <span class="cnt">${n}</span></button>`).join('');
  app.innerHTML = `
    <div class="card">
      <h2 style="font-size:16px">⚙️ Intensité quotidienne</h2>
      <div class="sub">Règle ton volume du jour. Monte-le quand tu veux tout donner, baisse-le les jours pris — c'est toi qui tiens le curseur.</div>
      <div class="mt" style="display:flex;flex-wrap:wrap;gap:8px">${regChips}</div>
      <div class="sub mt"><b style="color:var(--txt)">${rg.emoji} ${rg.name}</b> — ${rg.desc}</div>
      <div class="sub mt" style="color:var(--muted)">≈ <b style="color:var(--txt)">${rg.cards}</b> cartes · <b style="color:var(--txt)">${rg.trans}</b> traductions · <b style="color:var(--txt)">${GOAL_CONJ}</b> verbes · jusqu'à <b style="color:var(--txt)">${rg.neu}</b> nouveaux mots/jour</div>
      ${(S.regime === 'atope' || S.regime === 'intensivo') ? `<div class="pill warn mt">Gros volume : chaque nouveau mot revient en révision quelques jours plus tard. Tiens le rythme, ou redescends d'un cran sans culpabiliser.</div>` : ''}
    </div>
    <div class="card">
      <h2>Cartes de vocabulaire</h2>
      <div class="sub">Répétition espacée <b style="color:var(--txt)">FSRS</b> (l'algorithme moderne d'Anki), sens tiré <b style="color:var(--txt)">au hasard</b> 🇪🇸→🇫🇷 ou 🇫🇷→🇪🇸 : tu dois savoir <i>produire</i> le mot, pas juste le reconnaître. Objectif : de A2 à C1, du quotidien au registre soutenu.</div>
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
    <button class="btn sec" onclick="renderSrsDiag()">📊 Diagnostic — l'algo est-il efficace ?</button>
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
    <button class="tile" style="border-color:var(--accent)" onclick="setView('shadow')">
      <div class="ic l">🎙️</div>
      <div class="body"><div class="t">Shadowing · répète en simultané</div><div class="d">Prosodie + automaticité — le levier B2→C1</div></div>
      <div class="badge zero">${SHADOWING.filter(t => shDone(t.id)).length}/${SHADOWING.length}</div>
    </button>
    <button class="tile" onclick="setView('pron')">
      <div class="ic a">👅</div>
      <div class="body"><div class="t">Prononciation du jour · R & ñ</div><div class="d">Le R roulé surtout — modèle audio, technique, paires minimales</div></div>
      <div class="badge ${dailyProgress().p>=1?'':'zero'}">${dailyProgress().p>=1?'✓':'!'}</div>
    </button>
    <button class="btn ghost mt" onclick="toggleSlow()">🐢 Vitesse : ${S.slowAudio ? 'Lente' : 'Normale'}</button>
    <button class="btn ghost mt" onclick="cycleVoix()">🗣️ Voix : ${nomVoix()}</button>
    <div class="sub center mt">Écouter de l'espagnol authentique, c'est ce qui débloque la compréhension.</div>
  `;
}
function toggleSlow() { S.slowAudio = !S.slowAudio; save(); renderListenHome(); toast(S.slowAudio ? 'Écoute ralentie 🐢' : 'Écoute à vitesse normale'); }

/* ============================================================
   SHADOWING — répétition en simultané (prosodie + automaticité)
   ============================================================ */
let SH = null;                        // état de session
const SH_RATES = [0.7, 0.85, 1.0];
function shDone(id) { return S.shadow && S.shadow[id]; }
function shRate() { return SH_RATES[SH ? SH.rate : 1]; }
function shSpeak(text, onend) {
  if (!('speechSynthesis' in window)) { toast('Synthèse vocale indisponible'); return; }
  const moi = ++sessionVoix;
  clearTimeout(timerVoix);
  speechSynthesis.cancel();
  timerVoix = setTimeout(() => {
    if (moi !== sessionVoix) return;
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = 'es-ES'; u.pitch = 1; u.rate = shRate();
    if (voiceES) u.voice = voiceES;
    let passe = false;
    const fin = () => { if (passe) return; passe = true; if (onend && moi === sessionVoix) onend(); };
    u.onend = fin;
    u.onerror = e => { if (e.error === 'interrupted' || e.error === 'canceled') return; fin(); };
    speechSynthesis.speak(u);
  }, 90);
}
function renderShadowHome() {
  const done = SHADOWING.filter(t => shDone(t.id)).length;
  app.innerHTML = `
    <div class="card" style="border-color:var(--accent)">
      <h2>🎙️ Shadowing</h2>
      <div class="sub">La technique qui casse le plateau B2→C1 : tu <b style="color:var(--txt)">répètes en même temps</b> que la voix, avec un léger décalage. Ça entraîne la prosodie et surtout l'<b style="color:var(--txt)">automaticité</b> — quand l'espagnol sort sans passer par le français.</div>
      <div class="sub mt" style="font-size:13px">Comment faire : écoute une phrase, puis rejoue-la en te superposant à la voix (~1 s de retard). Vise le rythme et la mélodie, pas la perfection. Commence lentement, accélère quand c'est fluide.</div>
    </div>
    <button class="btn ghost mt" onclick="setView('listen')">← Compréhension orale</button>
    <div class="sub center mt mb" style="font-size:13px">${done}/${SHADOWING.length} textes travaillés</div>
    ${SHADOWING.map(t => `
      <button class="tile" onclick="startShadow('${t.id}')">
        <div class="ic l">${shDone(t.id) ? '✅' : '🎙️'}</div>
        <div class="body"><div class="t">${t.title}</div><div class="d">${t.theme} · ${t.lines.length} frases</div></div>
        <div class="badge zero">${t.level}</div>
      </button>`).join('')}
  `;
}
function startShadow(id) {
  const t = SHADOWING.find(x => x.id === id);
  SH = { t, rate: 1, cur: -1, playing: false, mode: null };
  renderShadowCard();
}
function shHighlight(i) {
  SH.cur = i;
  document.querySelectorAll('.shline').forEach((el, k) => {
    el.classList.toggle('on', k === i);
  });
  const el = document.querySelector('.shline.on');
  if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
}
/* lecture continue : surligne chaque phrase à mesure */
function shPlayAll(from) {
  const t = SH.t; SH.playing = true; SH.mode = 'all';
  const step = i => {
    if (!SH || !SH.playing || i >= t.lines.length) { SH.playing = false; shHighlight(-1); shUpdateBtns(); return; }
    shHighlight(i);
    shSpeak(t.lines[i], () => { if (SH && SH.playing) setTimeout(() => step(i + 1), 180); });
  };
  step(from || 0);
  shUpdateBtns();
}
/* mode shadowing : phrase, PUIS un silence de sa durée (le temps de la répéter), puis la suivante */
function shPlayShadow(from) {
  const t = SH.t; SH.playing = true; SH.mode = 'shadow';
  const step = i => {
    if (!SH || !SH.playing || i >= t.lines.length) { SH.playing = false; shHighlight(-1); shUpdateBtns(); return; }
    shHighlight(i);
    const words = t.lines[i].split(/\s+/).length;
    const gap = Math.max(700, (words / 2.3) / shRate() * 1000);  // ≈ durée de la phrase, pour la répéter
    const fb = document.getElementById('shFb');
    shSpeak(t.lines[i], () => {
      if (!SH || !SH.playing) return;
      if (fb) fb.textContent = '🗣️ ¡Repite!';
      setTimeout(() => { if (fb) fb.textContent = ''; if (SH && SH.playing) step(i + 1); }, gap);
    });
  };
  step(from || 0);
  shUpdateBtns();
}
function shStop() { SH.playing = false; SH.mode = null; stopSpeak(); shHighlight(-1); const fb = document.getElementById('shFb'); if (fb) fb.textContent = ''; shUpdateBtns(); }
function shSetRate(r) { SH.rate = r; if (SH.playing) { const m = SH.mode, i = Math.max(0, SH.cur); shStop(); m === 'shadow' ? shPlayShadow(i) : shPlayAll(i); } else renderShadowCard(); }
function shUpdateBtns() {
  const p = document.getElementById('shPlay'), s = document.getElementById('shShadow');
  if (p) p.textContent = (SH.playing && SH.mode === 'all') ? '⏹ Detener' : '▶ Escuchar entero';
  if (s) s.textContent = (SH.playing && SH.mode === 'shadow') ? '⏹ Detener' : '🎙️ Modo shadowing';
}
function shMarkDone() {
  if (!S.shadow) S.shadow = {};
  const first = !S.shadow[SH.t.id];
  S.shadow[SH.t.id] = true;
  bumpDaily('study'); markStudy();
  addXp(first ? 15 : 6);
  toast(first ? '🎙️ ¡Bien! Texto trabajado · +15 XP' : 'Repasado · +6 XP');
  save();
  renderShadowHome();
}
function renderShadowCard() {
  const t = SH.t;
  app.innerHTML = `
    <div class="qmeta"><span>🎙️ Shadowing · <span style="color:var(--accent)">${t.level}</span></span><span>${t.theme}</span></div>
    <div class="card"><b>${t.title}</b><div class="sub mt" style="font-size:13px">💡 ${t.tip}</div></div>
    <div class="shbox">
      ${t.lines.map((l, i) => `<div class="shline" onclick="shTap(${i})">${l}</div>`).join('')}
    </div>
    <div id="shFb" class="center" style="color:var(--accent);font-weight:700;height:22px;margin:6px 0"></div>
    <div class="shrate">
      <span class="sub">Velocidad</span>
      ${SH_RATES.map((r, i) => `<button class="segchip ${SH.rate === i ? 'on' : ''}" onclick="shSetRate(${i})">${['🐢 0.7×', '0.85×', '1× 🏃'][i]}</button>`).join('')}
    </div>
    <button class="btn mt" id="shPlay" onclick="SH.playing && SH.mode==='all' ? shStop() : shPlayAll(0)">▶ Escuchar entero</button>
    <button class="btn sec mt" id="shShadow" onclick="SH.playing && SH.mode==='shadow' ? shStop() : shPlayShadow(0)">🎙️ Modo shadowing</button>
    <div class="sub center mt" style="font-size:12px">Astuce : touche une phrase pour l'entendre seule et la boucler.</div>
    <button class="btn ghost mt" onclick="shMarkDone()">✅ Texto trabajado</button>
    <button class="btn ghost" onclick="stopSpeak();renderShadowHome()">← Todos los textos</button>
  `;
  shUpdateBtns();
}
function shTap(i) {
  if (SH.playing) shStop();
  shHighlight(i);
  shSpeak(SH.t.lines[i], () => shHighlight(-1));
}
function voixES() { return ('speechSynthesis' in window) ? speechSynthesis.getVoices().filter(estES) : []; }
function nomVoix() {
  if (!voixDispo()) return 'aucune voix espagnole';
  return (voiceES ? voiceES.name + ' · ' + voiceES.lang : 'automatique') + (S.voix ? '' : ' (auto)');
}
/* Fait défiler les voix espagnoles du système : utile quand l'appareil
   propose du castillan et du latino-américain et qu'on veut trancher. */
function cycleVoix() {
  const es = voixES();
  if (!es.length) { toast("Aucune voix espagnole installée sur cet appareil"); return; }
  const k = es.findIndex(v => v.name === (voiceES && voiceES.name));
  const suivante = es[(k + 1) % es.length];
  S.voix = suivante.name; save(); pickVoice(); renderListenHome();
  speak('Hola, así sueno yo.');
}
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

/* ---------- Synthèse vocale ----------
   Trois pièges du Web Speech API, corrigés ici :
   1. cancel() est asynchrone. Enchaîner speak() dans la foulée fait perdre
      l'énoncé — deux appuis rapprochés sur 🔊 donnaient le silence.
   2. Chrome coupe toute lecture au bout d'environ 15 s. Un resume()
      périodique la relance sans effet audible.
   3. iOS n'autorise la première lecture que dans un geste utilisateur.
      On déverrouille au premier contact avec un énoncé vide. */
let voiceES = null, voiceW = null, voiceM = null, voixPrevenu = false;
function estES(v) { return /^es/i.test(v.lang); }
function pickVoice() {
  const vs = speechSynthesis.getVoices();
  if (!vs.length) return;
  const es = vs.filter(estES);
  const esES = es.filter(v => /^es[-_]ES/i.test(v.lang));   // castillan d'abord : l'app vise le DELE
  const pref = S.voix && es.find(v => v.name === S.voix);
  const socle = esES.concat(es);
  // \b : sans lui, /male/ reconnaît aussi « female »
  voiceW = socle.find(v => /\bfemale\b|Mónica|Monica|Marisol|Paulina|Helena|Lucía|Lucia/i.test(v.name)) || esES[0] || es[0] || null;
  voiceM = socle.find(v => /\bmale\b|Jorge|Diego|Juan|Enrique|Carlos|Pablo/i.test(v.name)) || esES[0] || es[0] || null;
  voiceES = pref || esES[0] || es[0] || null;   // jamais de repli sur une voix non espagnole
  if (!es.length && !voixPrevenu) {
    voixPrevenu = true;
    setTimeout(() => toast("Aucune voix espagnole installée sur cet appareil"), 1200);
  }
}
if ('speechSynthesis' in window) {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
  // Chrome s'arrête vers 15 s : on le relance discrètement.
  setInterval(() => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) speechSynthesis.resume();
  }, 9000);
  // iOS : la toute première lecture doit naître d'un geste.
  const debloquer = () => {
    try { const u = new SpeechSynthesisUtterance(''); u.volume = 0; speechSynthesis.speak(u); } catch (e) {}
    document.removeEventListener('pointerdown', debloquer);
  };
  document.addEventListener('pointerdown', debloquer, { once: true });
}
function voixDispo() { return ('speechSynthesis' in window) && speechSynthesis.getVoices().some(estES); }
function audioRate(base) { return base * (S.slowAudio ? 0.78 : 1); }
function prepare(texte, spk) {
  const u = new SpeechSynthesisUtterance(texte);
  u.lang = 'es-ES';
  if (spk === 'W') { u.pitch = 1.25; u.rate = audioRate(0.95); if (voiceW) u.voice = voiceW; }
  else if (spk === 'M') { u.pitch = 0.8; u.rate = audioRate(0.92); if (voiceM) u.voice = voiceM; }
  else { u.pitch = 1; u.rate = audioRate(0.95); if (voiceES) u.voice = voiceES; }
  return u;
}
let sessionVoix = 0, timerVoix = null;
/* Annule proprement, puis parle après un souffle : sans ce délai, cancel()
   n'a pas fini de vider la file et l'énoncé suivant est avalé. */
function speak(text, spk) {
  if (!('speechSynthesis' in window)) { toast('Synthèse vocale indisponible'); return; }
  if (!text || !String(text).trim()) return;
  const moi = ++sessionVoix;
  clearTimeout(timerVoix);
  speechSynthesis.cancel();
  timerVoix = setTimeout(() => {
    if (moi !== sessionVoix) return;
    speechSynthesis.speak(prepare(String(text), spk));
  }, 90);
}
function stopSpeak() { sessionVoix++; clearTimeout(timerVoix); speechSynthesis.cancel(); }
// Joue un dialogue ligne par ligne, en différenciant les locuteurs (voix + hauteur).
function speakLines(lines, i, onDone) {
  if (!('speechSynthesis' in window)) { toast('Synthèse vocale indisponible'); return; }
  if (i === 0) { stopSpeak(); }
  const moi = i === 0 ? ++sessionVoix : sessionVoix;
  const suite = () => {
    if (moi !== sessionVoix) return;              // une autre lecture a pris la main
    if (i >= lines.length) { if (onDone) onDone(); return; }
    const u = prepare(lines[i].text, lines[i].spk);
    let passe = false;
    const avancer = () => { if (passe) return; passe = true; speakLines(lines, i + 1, onDone); };
    u.onend = avancer;
    u.onerror = e => { if (e.error === 'interrupted' || e.error === 'canceled') return; avancer(); };
    speechSynthesis.speak(u);
  };
  i === 0 ? setTimeout(suite, 90) : suite();
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

/* ============================================================
   SÉLECTION DÉTERMINISTE DU JOUR (même contenu toute la journée,
   nouveau contenu chaque jour, en rotation)
   ============================================================ */
function daySeed() { return Math.floor(Date.parse(todayStr()) / DAY); }
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
// renvoie n ÉLÉMENTS de arr, mélange déterministe selon seed
function seededPickVals(arr, n, seed) {
  const idx = arr.map((_, i) => i), rnd = mulberry32(seed >>> 0);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  return idx.slice(0, Math.min(n, arr.length)).map(i => arr[i]);
}
function deaccent(s) {
  return (s || '').normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : (s || '');
}

/* ============================================================
   PRONONCIATION — le R (surtout roulé) et la ñ. Drill quotidien.
   ============================================================ */
let PSES = null;
function hlR(word) { return String(word).replace(/r+/g, m => `<span class="hlr">${m}</span>`).replace(/ñ/g, '<span class="hln">ñ</span>'); }
function hlEne(word) { return String(word).replace(/ñ/g, '<span class="hln">ñ</span>'); }
function pronSay(text) { speak(text); }
function pronSayTw() { if (PSES) speak(PSES.twister.es); }

function pronSession() {
  const seed = daySeed(), P = PRON;
  const rr = P.R.filter(x => x.k === 'rr'), ini = P.R.filter(x => x.k === 'ini'), clus = P.R.filter(x => x.k === 'clus');
  const rItems = [].concat(
    seededPickVals(rr, 3, seed * 7 + 1),
    seededPickVals(ini, 2, seed * 7 + 2),
    seededPickVals(clus, 1, seed * 7 + 3)
  );
  return {
    tip: P.tipsR[seed % P.tipsR.length],
    rItems,
    pairs: seededPickVals(P.pairs, 3, seed * 7 + 4),
    eneItems: seededPickVals(P.ene, 3, seed * 7 + 5),
    twister: P.twisters[seed % P.twisters.length]
  };
}
function pronMark(btn, ok) {
  const row = btn.closest('.prow'); if (!row) return;
  row.classList.remove('m-ok', 'm-again');
  row.classList.add(ok ? 'm-ok' : 'm-again');
}
function renderPronHome() {
  window.scrollTo(0, 0);
  PSES = pronSession();
  const dp = dailyProgress();
  const rRow = it => `
    <div class="prow">
      <button class="pspk" onclick="pronSay('${it.es}')">🔊</button>
      <div class="pw"><div class="pes">${hlR(it.es)}</div><div class="pfr">${it.fr}</div></div>
      <div class="pmark">
        <button class="pm again" onclick="pronMark(this,0)" title="À retravailler">🔁</button>
        <button class="pm ok" onclick="pronMark(this,1)" title="Maîtrisé">✅</button>
      </div>
    </div>`;
  const pairRow = p => `
    <div class="ppair">
      <div class="pp"><button class="pspk sm" onclick="pronSay('${p.r}')">🔊</button><div><b>${hlR(p.r)}</b><small>${p.fr}</small></div></div>
      <div class="ppx">↔</div>
      <div class="pp"><button class="pspk sm" onclick="pronSay('${p.rr}')">🔊</button><div><b>${hlR(p.rr)}</b><small>${p.frr}</small></div></div>
    </div>`;
  const eneRow = it => `
    <div class="prow">
      <button class="pspk" onclick="pronSay('${it.es}')">🔊</button>
      <div class="pw"><div class="pes">${hlEne(it.es)}</div><div class="pfr">${it.fr}</div></div>
    </div>`;
  app.innerHTML = `
    <div class="card">
      <h2>Prononciation du jour ${dp.p >= 1 ? '✅' : ''}</h2>
      <div class="sub">Le nerf de la guerre pour un francophone : le <b style="color:var(--txt)">R roulé</b>. Écoute le modèle (voix castillane 🔊), répète à voix haute, auto-évalue-toi. On ne triche pas avec l'oreille.</div>
    </div>

    <div class="card" style="border-color:var(--accent)">
      <div class="th" style="color:var(--accent)">🎯 Technique du R</div>
      <div style="font-size:14.5px;line-height:1.55;margin-top:6px">${PSES.tip}</div>
      <div class="prowdrill mt">
        <button class="btn sec" onclick="pronSay('rrra rrre rrri rrro rrru')">🔊 rra · rre · rri · rro · rru</button>
      </div>
    </div>

    <div class="card">
      <div class="th">🔊 Mots du jour — le R</div>
      <div class="cleg" style="margin-bottom:10px">Rouge = R roulé (rr, r initial, r après n/l/s). Écoute, répète, coche.</div>
      ${PSES.rItems.map(rRow).join('')}
    </div>

    <div class="card">
      <div class="th">⚖️ Paires minimales — un battement vs vibration</div>
      <div class="cleg" style="margin-bottom:10px">Le sens change ! Entends-tu la différence ?</div>
      ${PSES.pairs.map(pairRow).join('')}
    </div>

    <div class="card">
      <div class="th">Ñ · le son « gn »</div>
      <div style="font-size:13.5px;line-height:1.5;margin:6px 0 12px;color:var(--muted)">${PRON.tipEne}</div>
      ${PSES.eneItems.map(eneRow).join('')}
    </div>

    <div class="card" style="border-color:var(--purple)">
      <div class="th" style="color:var(--purple)">🌀 Trabalenguas — le boss</div>
      <div class="ptw mt">${hlR(PSES.twister.es)}</div>
      <div class="pfr" style="margin:8px 0">${PSES.twister.fr}</div>
      <button class="btn sec" onclick="pronSayTw()">🔊 Écouter en entier</button>
      <div class="expl mt" style="border-color:var(--purple)">${PSES.twister.note}</div>
    </div>

    ${dp.p >= 1
      ? `<div class="card center" style="border-color:var(--good)"><b style="color:var(--good)">✅ Session validée aujourd'hui.</b><div class="sub mt">Tu peux continuer à t'entraîner autant que tu veux. Nouveau lot demain.</div></div>`
      : `<button class="btn" onclick="pronFinish()">✅ J'ai travaillé ma prononciation à voix haute</button>`}
    <button class="btn ghost mt" onclick="setView('home')">Retour</button>
  `;
}
function pronFinish() {
  resetDailyIfNeeded();
  if (!S.daily.pron) { S.daily.pron = 1; S.pronDays = (S.pronDays || 0) + 1; addXp(10); }
  save(); checkDailyDone(); checkAchievements();
  toast('👅 Prononciation validée — +10 XP');
  setView('home');
}

/* ============================================================
   CONJUGAISON — obligatoire : 3 verbes × 3 temps, en entier.
   ============================================================ */
const CONJ_TENSES = [
  { k: 'pres', name: "Présent de l'indicatif", ref: null, hint: 'Le présent courant : yo hablo, tú hablas…' },
  { k: 'indef', name: 'Passé simple · indefinido', ref: 'pasados', hint: 'Action ponctuelle et achevée : ayer, el lunes, de repente…' },
  { k: 'imperf', name: 'Imparfait · imperfecto', ref: 'pasados', hint: 'Décor, habitude, description : antes, siempre, mientras…' },
  { k: 'fut', name: 'Futur simple', ref: 'futuro', hint: 'Actions futures : mañana, la semana que viene…' },
  { k: 'cond', name: 'Conditionnel', ref: 'condicional', hint: 'Politesse, hypothèse, futur du passé : me gustaría, dijo que vendría…' },
  { k: 'subjpres', name: 'Subjonctif présent', ref: 'subjpres', hint: 'Volonté, émotion, doute : quiero que…, no creo que…' },
  { k: 'subjimp', name: 'Subjonctif imparfait', ref: 'subjimp', hint: 'Concordance au passé, hypothèse : si tuviera…, quería que…' }
];
const CONJ_PRON = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos'];
const CONJ_TMAP = {}; CONJ_TENSES.forEach(t => CONJ_TMAP[t.k] = t);

function conjToday() {
  const seed = daySeed();
  const tenses = seededPickVals(CONJ_TENSES, 3, seed * 13 + 1);
  const regs = [], irrs = [];
  CONJUG.forEach((v, i) => { (v.irr ? irrs : regs).push(i); });
  const a = seededPickVals(regs, 1, seed * 13 + 2)[0];             // au moins 1 régulier
  const b = seededPickVals(irrs, 1, seed * 13 + 3)[0];             // au moins 1 irrégulier
  const rest = CONJUG.map((_, i) => i).filter(i => i !== a && i !== b);
  const c = seededPickVals(rest, 1, seed * 13 + 4)[0];
  const order = seededPickVals([a, b, c], 3, seed * 13 + 5);       // ordre mélangé
  return order.map((vi, k) => ({ vi, tk: tenses[k].k }));
}
function conjState() {
  const t = todayStr();
  if (!S.conjState || S.conjState.date !== t)
    S.conjState = { date: t, done: [false, false, false], score: [0, 0, 0], ans: [['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']] };
  return S.conjState;
}
function normConj(s) { return String(s == null ? '' : s).trim().toLowerCase().replace(/\s+/g, ' '); }
function conjFieldClass(u, c) {
  const nu = normConj(u), nc = normConj(c);
  if (nu === nc && nu) return 'ok';
  if (nu && deaccent(nu) === deaccent(nc)) return 'accent';
  return 'bad';
}
let conjFocus = null;
function conjInsert(ch) {
  const el = conjFocus && document.getElementById(conjFocus);
  if (!el) { toast('Touche d\'abord un champ 🙂'); return; }
  const s = el.selectionStart != null ? el.selectionStart : el.value.length;
  const e = el.selectionEnd != null ? el.selectionEnd : el.value.length;
  el.value = el.value.slice(0, s) + ch + el.value.slice(e);
  el.focus(); const p = s + ch.length; try { el.setSelectionRange(p, p); } catch (x) {}
}
function renderConjHome() {
  window.scrollTo(0, 0);
  const today = conjToday(), st = conjState(), dp = dailyProgress();
  const cards = today.map((ch, k) => {
    const v = CONJUG[ch.vi], tm = CONJ_TMAP[ch.tk], forms = v.t[ch.tk];
    const done = st.done[k];
    const inputs = CONJ_PRON.map((pr, p) => {
      const id = 'cj-' + k + '-' + p;
      const val = escapeHtml((st.ans[k] && st.ans[k][p]) || '');
      let res = '';
      if (done) {
        const cls = conjFieldClass(st.ans[k][p], forms[p]);
        res = `<div class="cjres ${cls}">${cls === 'ok' ? '✓ ' + forms[p] : cls === 'accent' ? '≈ accent → <b>' + forms[p] + '</b>' : '✗ → <b>' + forms[p] + '</b>'}</div>`;
      }
      return `<div class="cjfield">
        <label>${pr}</label>
        <input id="${id}" type="text" value="${val}" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" lang="es" onfocus="conjFocus=this.id" placeholder="…">
        ${res}</div>`;
    }).join('');
    const refLink = tm.ref ? `<button class="btn ghost mt" style="font-size:13px;padding:8px" onclick="renderTense('${tm.ref}')">📖 Revoir : ${tm.name}</button>` : '';
    return `
      <div class="card cjcard ${done ? 'done' : ''}">
        <div class="cjhead">
          <div>
            <div class="cjinf">${v.inf} <span class="cjfr">— ${v.fr}</span></div>
            <div class="cjtag"><span class="pill ${v.irr ? 'warn' : ''}">${v.irr ? 'irrégulier' : 'régulier'}</span> <b style="color:var(--blue)">${tm.name}</b></div>
          </div>
          ${done ? `<div class="cjscore ${st.score[k] === 6 ? 'perfect' : ''}">${st.score[k]}/6</div>` : ''}
        </div>
        <div class="cjhint">${tm.hint}</div>
        <div class="cjgrid">${inputs}</div>
        <button class="btn ${done ? 'sec' : ''} mt" onclick="checkConj(${k})">${done ? 'Re-corriger' : 'Corriger'}</button>
        ${done ? refLink : ''}
      </div>`;
  }).join('');
  app.innerHTML = `
    <div class="accbar" id="accbar">
      ${['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü'].map(c => `<button onclick="conjInsert('${c}')">${c}</button>`).join('')}
    </div>
    <div class="card">
      <h2>Conjugaison du jour ${dp.j >= 1 ? '🏆' : ''}</h2>
      <div class="sub">Obligatoire. <b style="color:var(--txt)">3 verbes</b>, <b style="color:var(--txt)">3 temps différents</b>, à conjuguer <b style="color:var(--txt)">en entier</b> (les 6 personnes). Écris tout, puis « Corriger » : je vérifie chaque forme, <b style="color:var(--txt)">accents compris</b>. Barre d'accents en haut.</div>
      <div class="sub center mt" style="font-weight:800;color:${dp.j >= 1 ? 'var(--good)' : 'var(--muted)'}">${st.done.filter(Boolean).length}/${GOAL_CONJ} verbes validés aujourd'hui</div>
    </div>
    ${cards}
    <button class="btn ghost mt" onclick="setView('home')">Retour</button>
  `;
}
function checkConj(k) {
  resetDailyIfNeeded();
  const today = conjToday(), ch = today[k], v = CONJUG[ch.vi], forms = v.t[ch.tk], st = conjState();
  const ans = [];
  for (let p = 0; p < 6; p++) { const el = document.getElementById('cj-' + k + '-' + p); ans[p] = el ? el.value : ''; }
  st.ans[k] = ans;
  let score = 0;
  for (let p = 0; p < 6; p++) if (normConj(ans[p]) === normConj(forms[p])) score++;
  st.score[k] = score;
  const wasDone = st.done[k];
  if (!wasDone) {
    st.done[k] = true;
    S.conjDone = (S.conjDone || 0) + 1;
    if (score === 6) S.conjPerfect = (S.conjPerfect || 0) + 1;
    addXp(3 + score);
  }
  S.daily.conj = st.done.filter(Boolean).length;
  save(); checkDailyDone(); checkAchievements();
  renderConjHome();
  const el = document.getElementById('cj-' + k + '-0');
  if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  if (!wasDone) toast(score === 6 ? '✅ Parfait — 6/6 !' : score >= 4 ? `👍 ${score}/6 — regarde les formes en rouge` : `${score}/6 — revois ce temps, c'est comme ça qu'on apprend`);
}

/* ============================================================
   A FONDO — entraînement BONUS (hors objectif du jour)
   1) Verbos que cambian : diphtongue / affaiblissement (la forme)
   2) Concordancia de tiempos : QCM (le fond)
   3) Repaso a fondo : une leçon validée + ses exemples supplémentaires
   ============================================================ */
function afondoStats() {
  const done = doneLessons();
  let extra = 0; done.forEach(l => { extra += ((typeof LESSON_EXTRA !== 'undefined' && LESSON_EXTRA[l.id]) || []).length; });
  return { done: done.length, extra };
}
/* ---------- DRILL AU RÉFLEXE : Ser/Estar & Por/Para (automatisation) ---------- */
let RFX=null;
const RFX_LABEL={serestar:'Ser / Estar', porpara:'Por / Para', mix:'Ser/Estar & Por/Para'};
function reflexPool(mode){
  const pool=[];
  if(mode!=='porpara' && typeof SERESTAR_DRILL!=='undefined') SERESTAR_DRILL.forEach(it=>pool.push({stem:it[0],opts:[it[1],it[2]],correct:0,expl:it[3],cat:'Ser/Estar'}));
  if(mode!=='serestar' && typeof PORPARA_DRILL!=='undefined') PORPARA_DRILL.forEach(it=>pool.push({stem:it[0],opts:['por','para'],correct:it[1]==='por'?0:1,expl:it[2],cat:'Por/Para'}));
  return pool;
}
function startReflex(mode){
  const pool=reflexPool(mode);
  if(!pool.length){ toast('Rien à réviser ici 🙂'); return; }
  RFX={mode,pool,bag:[],n:0,ok:0,streak:0,best:0,answered:false,live:true};
  renderReflex();
}
function renderReflex(){
  window.scrollTo(0,0);
  if(!RFX.bag.length) RFX.bag=shuffle(RFX.pool.slice());
  const it=RFX.cur=RFX.bag.pop(); RFX.answered=false;
  let opts=it.opts, correct=it.correct;
  if(it.cat==='Ser/Estar' && Math.random()<0.5){ opts=[it.opts[1],it.opts[0]]; correct=1; }
  RFX.dispOpts=opts; RFX.dispCorrect=correct;
  const stemHtml=it.stem.replace('______','<span class="blank">______</span>');
  const acc=RFX.n?Math.round(100*RFX.ok/RFX.n):0;
  app.innerHTML=`
    <div class="qmeta"><span>${RFX_LABEL[RFX.mode]} · réflexe</span><span>🔥 ${RFX.streak}${RFX.best>RFX.streak?' · rec '+RFX.best:''}</span></div>
    <div class="pbar mb"><i style="width:${acc}%"></i></div>
    <div class="sub" style="margin-bottom:10px">${RFX.n?acc+'% · '+RFX.n+' faites — vite, au feeling':'Choisis vite : c\'est le réflexe qu\'on installe, pas la réflexion.'}</div>
    <div class="stem">${stemHtml}</div>
    <div class="row2" id="rfxopts">
      ${opts.map((o,k)=>`<button class="opt" style="text-align:center;font-size:19px;font-weight:800;padding:16px" onclick="reflexAnswer(${k})">${o}</button>`).join('')}
    </div>
    <div id="rfxafter"></div>
    <button class="btn ghost mt" onclick="finishReflex()">■ Stop &amp; bilan</button>
  `;
}
function reflexAnswer(k){
  if(!RFX||RFX.answered) return; RFX.answered=true;
  const it=RFX.cur, correct=RFX.dispCorrect, ok=(k===correct);
  document.querySelectorAll('#rfxopts .opt').forEach((b,idx)=>{ b.setAttribute('disabled',''); if(idx===correct)b.classList.add('good'); else if(idx===k)b.classList.add('bad'); else b.classList.add('dim'); });
  RFX.n++;
  if(ok){ RFX.ok++; RFX.streak++; if(RFX.streak>RFX.best)RFX.best=RFX.streak; }
  else { RFX.streak=0; recordMistake({kind:'gram',q:it.stem,opts:it.opts,correct:it.correct,expl:it.expl,cat:'Réflexe · '+it.cat}); }
  document.getElementById('rfxafter').innerHTML=`<div class="expl ${ok?'ok':'no'}" style="margin-top:10px">${ok?'✓ ':'✗ '+RFX.dispOpts[correct]+'. '}${it.expl}</div>`;
  setTimeout(()=>{ if(RFX&&RFX.live&&RFX.answered) renderReflex(); }, ok?600:1900);
}
function finishReflex(){
  if(!RFX) return; RFX.live=false;
  const acc=RFX.n?Math.round(100*RFX.ok/RFX.n):0, xp=Math.min(80,RFX.ok*2);
  markStudy(); if(xp) addXp(xp); save(); if(typeof checkAchievements==='function') checkAchievements();
  const msg=RFX.n>=25?'Ça, c\'est du volume — le réflexe se construit exactement là.':RFX.n>=10?'Bien. C\'est la répétition qui rend le choix automatique : reviens-y.':'Court — enchaîne beaucoup, souvent : c\'est comme ça que ça devient naturel.';
  app.innerHTML=`
    <div class="card big"><div class="em">${acc>=85?'🎉':acc>=60?'💪':'📚'}</div>
      <div class="score" style="color:${acc>=70?'var(--good)':'var(--accent)'}">${acc}%</div>
      <div class="lab">${RFX.ok}/${RFX.n} · meilleure série ${RFX.best}</div>
      <div class="mt sub">${msg} +${xp} XP</div></div>
    <button class="btn" onclick="startReflex('${RFX.mode}')">↻ Encore</button>
    <button class="btn ghost mt" onclick="renderAfondoHome()">← A fondo</button>`;
}
function renderAfondoHome() {
  window.scrollTo(0, 0);
  const st = afondoStats();
  app.innerHTML = `
    <div class="card">
      <h2>🚀 A fondo</h2>
      <div class="sub">Entraînement <b style="color:var(--txt)">bonus</b>, hors objectif du jour : pour les jours où tu as plus de temps et où tu veux progresser plus vite. Ça rapporte de l'XP et valide « étudier ».</div>
    </div>

    <div class="card" style="border-color:var(--good)">
      <h2 style="font-size:16px">⚡ Ser/Estar & Por/Para · au réflexe</h2>
      <div class="sub">Le drill rapide pour que le bon choix devienne <b style="color:var(--txt)">automatique</b> : des dizaines de phrases, 2 boutons, correction immédiate, en boucle. Tous les cas — y compris les adjectifs qui changent de sens (<i>es listo</i> ≠ <i>está listo</i>).</div>
      <button class="btn mt" onclick="startReflex('serestar')">Ser / Estar</button>
      <div class="row2 mt">
        <button class="btn sec" onclick="startReflex('porpara')">Por / Para</button>
        <button class="btn sec" onclick="startReflex('mix')">Les deux</button>
      </div>
    </div>

    <div class="card" style="border-color:var(--blue)">
      <h2 style="font-size:16px">🔁 Verbos que cambian · la forme</h2>
      <div class="sub">Conjuguer au <b style="color:var(--txt)">présent</b> les verbes à <b style="color:var(--txt)">diphtongue</b> (e→ie, o→ue) et à <b style="color:var(--txt)">affaiblissement</b> (e→i) — la règle de la « botte » : yo·tú·él·ellos changent, nosotros/vosotros non. Correction accents compris.</div>
      <button class="btn mt" onclick="startStemDrill()">S'entraîner · 5 verbes</button>
      <button class="btn sec mt" onclick="renderTense('presente')" style="font-size:13px;padding:9px">📖 Revoir la règle</button>
    </div>

    <div class="card" style="border-color:var(--purple)">
      <h2 style="font-size:16px">🧩 Concordancia de tiempos · le fond</h2>
      <div class="sub">Le point C1 : quel temps dans la subordonnée selon la principale (présent→subj. présent, passé→subj. imparfait), le <b style="color:var(--txt)">style indirect</b> et les phrases en <b style="color:var(--txt)">si</b>.</div>
      <button class="btn mt" onclick="startConcord()">S'entraîner · ${(typeof CONCORD !== 'undefined' ? CONCORD.length : 0)} questions</button>
      <button class="btn sec mt" onclick="renderTense('subjimp')" style="font-size:13px;padding:9px">📖 Revoir : subj. imparfait</button>
    </div>

    <div class="card" style="border-color:var(--accent)">
      <h2 style="font-size:16px">📚 Repaso a fondo · plus d'exemples</h2>
      <div class="sub">Reprends une leçon <b style="color:var(--txt)">déjà validée</b> avec ses exemples habituels <b style="color:var(--txt)">+ de nouveaux</b>, pour ancrer le réflexe.</div>
      ${st.done
        ? `<button class="btn mt" onclick="renderRepasoPick()">Choisir une leçon · ${st.done} dispo·s${st.extra ? ` · +${st.extra} nouveaux exemples` : ''}</button>`
        : `<div class="sub mt" style="color:var(--dim)">🔒 Valide au moins une leçon d'abord.</div>`}
    </div>

    <div class="card">
      <h2 style="font-size:16px">🔀 Mix grammaire</h2>
      <div class="sub">Le rebrassage mélangé de toutes tes leçons validées (questions + nouveaux exemples + traductions liées).</div>
      ${st.done ? `<button class="btn sec mt" onclick="startMix()">Démarrer le mix</button>` : `<div class="sub mt" style="color:var(--dim)">🔒 Valide une leçon.</div>`}
    </div>

    <button class="btn ghost mt" onclick="setView('home')">Retour</button>
  `;
}

/* ---- 1) Drill : verbes à changement de radical (présent) ---- */
let AF_STEM = null;
function startStemDrill() {
  const idx = shuffle(STEMV.map((_, i) => i)).slice(0, 5);
  AF_STEM = { batch: idx, ans: {}, done: {}, score: {} };
  renderStemDrill();
}
function renderStemDrill() {
  window.scrollTo(0, 0);
  const cards = AF_STEM.batch.map((vi, k) => {
    const v = STEMV[vi], ty = STEM_TYPES[v.type], done = AF_STEM.done[k];
    const inputs = CONJ_PRON.map((pr, p) => {
      const id = 'sm-' + k + '-' + p;
      const val = escapeHtml((AF_STEM.ans[k] && AF_STEM.ans[k][p]) || '');
      const boot = (p !== 3 && p !== 4); // nosotros(3)/vosotros(4) ne changent pas
      let res = '';
      if (done) {
        const cls = conjFieldClass(AF_STEM.ans[k][p], v.pres[p]);
        res = `<div class="cjres ${cls}">${cls === 'ok' ? '✓ ' + v.pres[p] : cls === 'accent' ? '≈ accent → <b>' + v.pres[p] + '</b>' : '✗ → <b>' + v.pres[p] + '</b>'}</div>`;
      }
      return `<div class="cjfield">
        <label>${pr}${boot ? ' <span style="color:var(--accent)">•</span>' : ''}</label>
        <input id="${id}" type="text" value="${val}" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" lang="es" onfocus="conjFocus=this.id" placeholder="…">
        ${res}</div>`;
    }).join('');
    return `
      <div class="card cjcard ${done ? 'done' : ''}">
        <div class="cjhead">
          <div>
            <div class="cjinf">${v.inf} <span class="cjfr">— ${v.fr}</span></div>
            <div class="cjtag"><span class="pill warn">${ty.lab}</span> <b style="color:var(--blue)">présent · ${ty.kind}</b></div>
          </div>
          ${done ? `<div class="cjscore ${AF_STEM.score[k] === 6 ? 'perfect' : ''}">${AF_STEM.score[k]}/6</div>` : ''}
        </div>
        <div class="cjhint">La « botte » : <span style="color:var(--accent)">•</span> = radical qui change (yo·tú·él·ellos). <b>nosotros/vosotros</b> gardent le radical de l'infinitif.</div>
        <div class="cjgrid">${inputs}</div>
        <button class="btn ${done ? 'sec' : ''} mt" onclick="checkStem(${k})">${done ? 'Re-corriger' : 'Corriger'}</button>
      </div>`;
  }).join('');
  const allDone = AF_STEM.batch.every((_, k) => AF_STEM.done[k]);
  app.innerHTML = `
    <div class="accbar" id="accbar">
      ${['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü'].map(c => `<button onclick="conjInsert('${c}')">${c}</button>`).join('')}
    </div>
    <div class="card">
      <h2>Verbos que cambian</h2>
      <div class="sub">Conjugue chaque verbe au <b style="color:var(--txt)">présent</b> (les 6 personnes), puis « Corriger ». Le piège classique : mettre la diphtongue à <b style="color:var(--txt)">nosotros/vosotros</b> — ne le fais pas.</div>
    </div>
    ${cards}
    ${allDone ? `<button class="btn mt" onclick="startStemDrill()">🔁 Autre série de 5</button>` : ''}
    <button class="btn ghost mt" onclick="renderAfondoHome()">← A fondo</button>
  `;
}
function checkStem(k) {
  const v = STEMV[AF_STEM.batch[k]];
  const ans = [];
  for (let p = 0; p < 6; p++) { const el = document.getElementById('sm-' + k + '-' + p); ans[p] = el ? el.value : ''; }
  AF_STEM.ans[k] = ans;
  let score = 0;
  for (let p = 0; p < 6; p++) if (normConj(ans[p]) === normConj(v.pres[p])) score++;
  const wasDone = AF_STEM.done[k];
  AF_STEM.score[k] = score; AF_STEM.done[k] = true;
  if (!wasDone) { addXp(2 + score); markStudy(); touchDay(); save(); checkAchievements(); }
  renderStemDrill();
  const el = document.getElementById('sm-' + k + '-0');
  if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  if (!wasDone) toast(score === 6 ? '✅ Parfait — 6/6 !' : `${score}/6 — regarde les formes en rouge`);
}

/* ---- 2 & 3) QCM bonus générique (concordancia + repaso) ---- */
let BQ = null;
function startBonusQuiz(o) {
  const items = shuffle((o.items || []).slice());
  if (!items.length) { toast('Rien à réviser ici 🙂'); return; }
  BQ = { title: o.title, cat: o.cat || o.title, restart: o.restart || 'renderAfondoHome()', items, i: 0, correct: 0, answered: false };
  renderBQ();
}
function renderBQ() {
  window.scrollTo(0, 0);
  const [stem, opts] = BQ.items[BQ.i];
  BQ.answered = false;
  const stemHtml = stem.replace('______', '<span class="blank">______</span>');
  const optHtml = opts.map((o, k) => `<button class="opt" data-k="${k}" onclick="bqAnswer(${k})"><span class="lab">${'ABCD'[k]}</span>${o}</button>`).join('');
  app.innerHTML = `
    <div class="qmeta"><span>${BQ.title}</span><span>${BQ.i + 1} / ${BQ.items.length}</span></div>
    <div class="pbar mb"><i style="width:${BQ.i / BQ.items.length * 100}%"></i></div>
    <div class="stem">${stemHtml}</div>
    <div id="opts">${optHtml}</div>
    <div id="after"></div>
  `;
}
function bqAnswer(k) {
  if (BQ.answered) return;
  BQ.answered = true;
  const [stem, opts, correct, expl] = BQ.items[BQ.i];
  document.querySelectorAll('#opts .opt').forEach((b, idx) => {
    b.setAttribute('disabled', '');
    if (idx === correct) b.classList.add('good');
    else if (idx === k) b.classList.add('bad');
    else b.classList.add('dim');
  });
  const ok = k === correct;
  if (ok) { BQ.correct++; addXp(4); }
  else recordMistake({ kind: 'gram', q: stem, opts, correct, expl, cat: BQ.cat });
  const last = BQ.i === BQ.items.length - 1;
  document.getElementById('after').innerHTML =
    `<div class="expl ${ok ? 'ok' : 'no'}">${ok ? '✅ Correct. ' : '❌ Réponse : ' + 'ABCD'[correct] + '. '}${expl}</div>
     <button class="btn mt" onclick="${last ? 'finishBQ()' : 'bqNext()'}">${last ? 'Voir le résultat' : 'Suivant'}</button>`;
  document.getElementById('after').scrollIntoView({ behavior: 'smooth', block: 'end' });
}
function bqNext() { BQ.i++; renderBQ(); }
function finishBQ() {
  const total = BQ.items.length, pct = Math.round(BQ.correct / total * 100);
  markStudy(); touchDay(); save(); checkAchievements();
  app.innerHTML = `
    <div class="card big">
      <div class="em">${pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚'}</div>
      <div class="score" style="color:${pct >= 70 ? 'var(--good)' : 'var(--accent)'}">${pct}%</div>
      <div class="lab">${BQ.correct} / ${total} bonnes réponses</div>
      <div class="mt sub">Entraînement bonus validé.</div>
    </div>
    <button class="btn" onclick="${BQ.restart}">Refaire</button>
    <button class="btn ghost mt" onclick="renderAfondoHome()">← A fondo</button>
  `;
}
function startConcord() {
  startBonusQuiz({ title: 'Concordancia de tiempos', cat: 'Concordancia de tiempos', items: (typeof CONCORD !== 'undefined' ? CONCORD : []), restart: 'startConcord()' });
}
function renderRepasoPick() {
  window.scrollTo(0, 0);
  const rows = doneLessons().map(l => {
    const nx = ((typeof LESSON_EXTRA !== 'undefined' && LESSON_EXTRA[l.id]) || []).length;
    return `
      <div class="lrow done" onclick="startRepaso('${l.id}')">
        <div class="n">✓</div>
        <div class="info"><div class="tt">${l.title}</div><div class="tg">${l.tag} · ${l.q.length + nx} questions${nx ? ` (+${nx} nouveaux)` : ''}</div></div>
        <div class="sc">›</div>
      </div>`;
  }).join('');
  app.innerHTML = `
    <div class="card">
      <h2>Repaso a fondo</h2>
      <div class="sub">Choisis une leçon validée. Tu la rejoues avec ses questions habituelles + de nouveaux exemples. Ça ne change pas ton score de leçon : c'est du bonus.</div>
    </div>
    ${rows || '<div class="sub">Valide d\'abord une leçon.</div>'}
    <button class="btn ghost mt" onclick="renderAfondoHome()">← A fondo</button>
  `;
}
function startRepaso(id) {
  const l = LESSONS.find(x => x.id === id);
  if (!l) return renderRepasoPick();
  const extra = (typeof LESSON_EXTRA !== 'undefined' && LESSON_EXTRA[id]) || [];
  startBonusQuiz({ title: l.title, cat: 'Grammaire · ' + l.title, items: l.q.concat(extra), restart: `startRepaso('${id}')` });
}

/* ============================================================
   REDACCIÓN — expression écrite (DELE C1). Le vrai correcteur, c'est Claude.
   ============================================================ */
function copyText(text, msg) {
  const ok = () => toast(msg || '📋 Copié');
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, () => prompt('Copie le texte :', text));
  else prompt('Copie le texte :', text);
}
function redaccionState(id) { S.redaccion = S.redaccion || {}; return S.redaccion[id] || { text: '', done: false, ts: 0 }; }
function redaccionDone() { S.redaccion = S.redaccion || {}; let n = 0; for (const k in S.redaccion) if (S.redaccion[k] && S.redaccion[k].done) n++; return n; }
function wordCount(t) { const w = (t || '').trim(); return w ? w.split(/\s+/).length : 0; }

function renderRedaccionHome() {
  window.scrollTo(0, 0);
  if (typeof REDACCION === 'undefined') { app.innerHTML = '<div class="card">Module indisponible.</div>'; return; }
  const rows = REDACCION.map(r => {
    const st = redaccionState(r.id), wc = wordCount(st.text);
    const badge = st.done ? '<div class="badge">✓</div>' : (wc > 0 ? `<div class="badge zero">${wc} m</div>` : '<div class="badge zero">›</div>');
    return `
      <button class="tile" onclick="renderRedaccion('${r.id}')">
        <div class="ic e">✍️</div>
        <div class="body"><div class="t">${r.titulo}</div><div class="d">${r.tipo} · ${r.palabras} mots · ${r.tiempo}</div></div>
        ${badge}
      </button>`;
  }).join('');
  app.innerHTML = `
    <div class="card">
      <h2>✍️ Rédaction — expression écrite</h2>
      <div class="sub">Le chaînon qui fait passer au C1 : <b style="color:var(--txt)">produire</b>, pas seulement reconnaître. Choisis un sujet, écris avec les aides (plan, connecteurs), puis <b style="color:var(--txt)">copie ton texte et colle-le à Claude</b> pour une vraie correction. Un modèle C1 t'attend une fois que tu as écrit.</div>
      <div class="sub mt" style="color:var(--muted)">${redaccionDone()} rédaction(s) travaillée(s)</div>
    </div>
    ${rows}
    <button class="btn ghost mt" onclick="setView('home')">← Accueil</button>
  `;
}

function renderRedaccion(id) {
  window.scrollTo(0, 0);
  const r = (typeof REDACCION !== 'undefined') && REDACCION.find(x => x.id === id);
  if (!r) return renderRedaccionHome();
  const st = redaccionState(id);
  const esc = s => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const aid = (title, items) => `
    <details class="aid"><summary>${title}</summary>
      <ul class="aidul">${items.map(i => `<li>${i}</li>`).join('')}</ul>
    </details>`;
  const conBox = `
    <details class="aid"><summary>🧩 Connecteurs utiles</summary>
      <div class="conwrap">${r.conectores.map(c => `<span class="conchip">${c}</span>`).join('')}</div>
    </details>`;
  app.innerHTML = `
    <div class="card">
      <div class="sub" style="text-transform:uppercase;letter-spacing:.06em;font-size:11px;font-weight:800;color:var(--accent)">${r.tipo} · ${r.nivel}</div>
      <h2 style="margin-top:4px">${r.titulo}</h2>
      <div class="sub mt">${r.consigna}</div>
      <div class="sub mt" style="color:var(--muted)">🎯 ${r.palabras} mots · ⏱ ${r.tiempo}</div>
    </div>
    ${aid('🧭 Guión (plan)', r.guion)}
    ${conBox}
    ${aid('💡 Recuerda', r.recuerda)}
    <div class="card">
      <h2 style="font-size:16px">Ton texte</h2>
      <textarea id="redac-ta" class="redac" placeholder="Escribe aquí en español…" oninput="redacInput('${id}')">${esc(st.text)}</textarea>
      <div class="sub mt" style="display:flex;justify-content:space-between">
        <span id="redac-wc">${wordCount(st.text)} mots</span>
        <span id="redac-save" style="color:var(--muted)"></span>
      </div>
      <button class="btn mt" onclick="redacExport('${id}')">📋 Copier pour correction (Claude)</button>
      <div class="row2 mt">
        <button class="btn sec" onclick="revealModelo('${id}')">👁 Modèle C1</button>
        <button class="btn sec" onclick="toggleCheck('${id}')">✅ Auto-évaluation</button>
      </div>
      <div id="redac-check" style="display:none"></div>
      <div id="redac-modelo" style="display:none"></div>
    </div>
    <button class="btn ghost mt" onclick="setView('redaccion')">← Tous les sujets</button>
  `;
}
function redacInput(id) {
  const ta = document.getElementById('redac-ta'); if (!ta) return;
  S.redaccion = S.redaccion || {};
  const prev = S.redaccion[id] || { done: false };
  S.redaccion[id] = { text: ta.value, done: !!prev.done, ts: Date.now() };
  save();
  const wc = document.getElementById('redac-wc'); if (wc) wc.textContent = wordCount(ta.value) + ' mots';
  const sv = document.getElementById('redac-save'); if (sv) sv.textContent = '✓ enregistré';
}
function toggleCheck(id) {
  const r = REDACCION.find(x => x.id === id); if (!r) return;
  const box = document.getElementById('redac-check'); if (!box) return;
  if (!box.dataset.filled) { box.dataset.filled = '1'; box.innerHTML = `<div class="card mt"><h2 style="font-size:15px">Auto-évaluation</h2><ul class="aidul">${r.checklist.map(c => `<li>${c}</li>`).join('')}</ul></div>`; }
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}
function revealModelo(id) {
  const r = REDACCION.find(x => x.id === id); if (!r) return;
  if (wordCount(redaccionState(id).text) < 30) { toast('Écris d\'abord — sinon tu te prives de l\'effort 😉'); return; }
  const box = document.getElementById('redac-modelo'); if (!box) return;
  if (!box.dataset.filled) { box.dataset.filled = '1'; box.innerHTML = `<div class="card mt" style="border-color:var(--good)"><h2 style="font-size:15px">Modèle C1 — à comparer, pas à copier</h2><div class="modelo">${r.modelo.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>')}</div></div>`; }
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}
function redacExport(id) {
  const r = REDACCION.find(x => x.id === id); if (!r) return;
  const st = redaccionState(id);
  if (wordCount(st.text) < 20) { toast('Écris ton texte d\'abord ✍️'); return; }
  const block = `Corrige mon texte en espagnol et monte-le au niveau C1 : dis-moi ce qui trahit un francophone, propose une version native, et note-moi selon les critères DELE (adéquation à la tâche, cohérence, richesse, correction).\n\nCONSIGNE : ${r.consigna}\nTYPE : ${r.tipo} · Objectif : ${r.palabras} mots\n\nMON TEXTE :\n«${st.text.trim()}»`;
  copyText(block, '📋 Copié — colle-le à Claude pour ta correction');
  const already = redaccionState(id).done;
  S.redaccion[id] = { text: st.text, done: true, ts: Date.now() };
  if (!already) addXp(20);
  markStudy(); save(); checkAchievements();
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
