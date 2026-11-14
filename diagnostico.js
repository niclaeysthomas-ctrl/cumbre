/* ============================================================
   CUMBRE — EL DIAGNÓSTICO · moteur
   2026-11-14.
   ------------------------------------------------------------
   CE QUE CE MODULE FAIT, ET POURQUOI IL EST SÉPARÉ DE L'EXAMEN.
   L'examen (buildExam) produit UN NOMBRE : 0-100, une bande CEFR, une
   courbe. C'est ce qu'il faut pour savoir si on progresse, et ça ne
   suffit pas pour savoir quoi changer. Un 68/100 ne dit pas s'il faut
   travailler le subjonctif, les prépositions ou le lexique.
   Le diagnostic produit un PROFIL : pour chaque compétence (modo, prep,
   tiempos, lexico…) et pour chaque niveau (A2→C1), un taux de réussite,
   plus deux mesures que l'examen ne donne pas du tout :
     · l'ÉCART RECONNAISSANCE / RAPPEL — même tag, mêmes niveaux, une
       fois en QCM et une fois en réponse tapée. Un gros écart veut dire
       « je comprends mais je ne produis pas » : c'est un problème
       d'entraînement (il faut du rappel actif), pas de connaissance.
     · la DÉTECTION D'ERREURS — savoir qu'une phrase sonne faux. C'est
       ce qui manque quand une faute est fossilisée, et aucun QCM ne le
       mesure, parce qu'un QCM affiche toujours la bonne forme.
   ------------------------------------------------------------
   TROIS DÉCISIONS DE CONCEPTION, assumées :
   1. AUCUN RETOUR PENDANT LE TEST. Pas de « correct ! » item par item.
      Corriger pendant la mesure, c'est enseigner pendant la mesure :
      les items suivants ne mesurent plus la même chose. Les corrections
      arrivent toutes à la fin, d'un coup, et elles sont complètes.
   2. ORDRE FIXE, PAS DE TIRAGE. Un diagnostic doit être reproductible.
   3. REPRISE POSSIBLE. Cent cinquante items en une fois, sur un téléphone, c'est
      long : l'état est sauvegardé à chaque réponse et le test reprend
      exactement là où il s'est arrêté. Un test qu'on ne peut pas mettre
      en pause est un test qu'on ne finit pas.
   ------------------------------------------------------------
   CE QU'IL N'ÉCRIT PAS. Le diagnostic ne pousse rien dans S.history :
   ce n'est pas le même instrument que l'évaluation (pas d'écoute, des
   formats différents, un barème différent), et mélanger deux
   instruments sur une même courbe rend la courbe illisible. Il écrit
   S.diag, et rien d'autre que S.diag (plus S.level, qui est un réglage
   d'app, pas une mesure).
   ============================================================ */
'use strict';

/* ---------- Composition du test, dans l'ordre de passage ---------- */
const DIAG_SECTIONS = [
  /* `short` sert la barre du haut. Sans lui, les sections 1 et 2 s'y
     affichaient toutes deux « GRAMÁTICA » : impossible de savoir, en cours
     de test, si on est encore en QCM ou déjà en production. */
  { k:'G', t:'Gramática · elegir',      short:'Elegir',   sub:'Une seule bonne réponse sur quatre. Ce que tu RECONNAIS.', icon:'①' },
  { k:'P', t:'Gramática · producir',    short:'Producir', sub:'Pas d\'options : la forme doit sortir de ta tête. Ce que tu PRODUIS.', icon:'②' },
  { k:'E', t:'Cazar el error',          short:'Error',    sub:'Une phrase, un mot fautif. Touche le mot qui ne va pas.', icon:'③' },
  { k:'L', t:'Léxico y registro',       short:'Léxico',   sub:'Le verbe qui va avec le nom, la locution, le ton juste.', icon:'④' },
  { k:'R', t:'Lectura',                 short:'Lectura',  sub:'Quatre textes. Les questions portent sur ce que le texte implique.', icon:'⑤' },
  { k:'T', t:'Del francés al español',  short:'Traducir', sub:'Douze phrases à fabriquer. La section la plus dure.', icon:'⑥' }
];

function diagTotal() {
  return DIAG_QCM.length + DIAG_LIBRE.length + DIAG_ERROR.length + DIAG_LEXICO.length
       + DIAG_LECTURA.reduce((s, p) => s + p.qs.length, 0) + DIAG_TRAD.length;
}

function diagItems() {
  const out = [];
  DIAG_QCM.forEach((x, k) => out.push({ ...x, sec:'G', id:'G' + k }));
  DIAG_LIBRE.forEach((x, k) => out.push({ ...x, sec:'P', id:'P' + k }));
  DIAG_ERROR.forEach((x, k) => out.push({ ...x, sec:'E', id:'E' + k }));
  DIAG_LEXICO.forEach((x, k) => out.push({ ...x, sec:'L', id:'L' + k }));
  DIAG_LECTURA.forEach(p => p.qs.forEach((q, k) => out.push({
    t:'qcm', sec:'R', id:'R' + p.id + k, lvl:p.lvl, tag:q.tag || 'lectura',
    q:q.q, o:q.o, c:q.c, e:q.e, passage:p.text, ptitle:p.title, pid:p.id
  })));
  DIAG_TRAD.forEach((x, k) => out.push({ ...x, sec:'T', id:'T' + k }));
  return out;
}

/* ---------- Comparaison des réponses tapées ----------
   Tolérante sur ce qui n'est pas de la langue (casse, ponctuation,
   espaces) et sur l'accent — mais l'accent manquant est compté à part,
   jamais effacé : « hablo » et « habló » ne sont pas la même personne,
   et savoir si l'accent est le problème change ce qu'il faut réviser. */
function diagNorm(s) {
  return deaccent(String(s == null ? '' : s).toLowerCase())
    .replace(/[¡!¿?.,;:()"«»'’]/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
function diagStrict(s) {
  return String(s == null ? '' : s).toLowerCase()
    .replace(/[¡!¿?.,;:()"«»'’]/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
/* Renvoie 'ok' | 'acento' | 'ko' */
function diagCheckLibre(it, given) {
  const g = diagNorm(given), gs = diagStrict(given);
  if (!g) return 'ko';
  if (it.a.some(x => diagStrict(x) === gs)) return 'ok';
  if (it.a.some(x => diagNorm(x) === g)) return 'acento';
  return 'ko';
}
function diagCheckTrad(it, given) {
  const g = diagNorm(given);
  if (!g) return 'ko';
  return it.must.every(re => new RegExp(re).test(g)) ? 'ok' : 'ko';
}

/* ============================================================
   PASSAGE DU TEST
   ============================================================ */
let DG = null;

function diagState() {
  if (!S.diagRun) return null;
  return S.diagRun;
}
function diagStart(reprendre) {
  const items = diagItems();
  if (reprendre && S.diagRun && S.diagRun.n === items.length) {
    DG = { items, i: S.diagRun.i, ans: S.diagRun.ans, secs: S.diagRun.secs || 0, started: S.diagRun.started };
  } else {
    DG = { items, i: 0, ans: {}, secs: 0, started: Date.now() };
    S.diagRun = { n: items.length, i: 0, ans: {}, secs: 0, started: DG.started };
    save();
  }
  DG.tick = Date.now();
  diagRender();
}
function diagPersist() {
  DG.secs = (DG.secs || 0) + Math.round((Date.now() - DG.tick) / 1000);
  DG.tick = Date.now();
  S.diagRun = { n: DG.items.length, i: DG.i, ans: DG.ans, secs: DG.secs, started: DG.started };
  save();
}
function diagQuit() {
  diagPersist();
  toast('Diagnostic mis en pause — il reprendra à la question ' + (DG.i + 1));
  setView('diag');
}

/* Barre d'insertion : taper á é í ó ú ñ sur un téléphone est pénible, et
   une faute d'accent due au clavier n'est pas une faute d'espagnol. */
const DIAG_KEYS = ['á','é','í','ó','ú','ñ','ü'];
function diagKey(ch) {
  const el = document.getElementById('dgin');
  if (!el) return;
  const p = el.selectionStart == null ? el.value.length : el.selectionStart;
  el.value = el.value.slice(0, p) + ch + el.value.slice(el.selectionEnd == null ? p : el.selectionEnd);
  el.focus();
  const np = p + ch.length;
  try { el.setSelectionRange(np, np); } catch (e) {}
}

function diagRender() {
  const it = DG.items[DG.i], n = DG.items.length;
  const sec = DIAG_SECTIONS.find(s => s.k === it.sec);
  const secItems = DG.items.filter(x => x.sec === it.sec);
  const secPos = secItems.indexOf(it) + 1;
  const first = secPos === 1;
  const prev = DG.items[DG.i - 1];
  const newPassage = it.passage && (!prev || prev.pid !== it.pid);

  let body = '';
  if (first) body += `<div class="dg-sec"><div class="ic">${sec.icon}</div><div><b>${sec.t}</b><div class="sub">${sec.sub}</div></div></div>`;
  if (newPassage) body += `<div class="passage"><div class="pt">${it.ptitle}</div>${escapeHtml(it.passage).replace(/\n/g, '<br>')}</div>`;
  else if (it.passage) body += `<details class="dg-det"><summary>Revoir le texte « ${it.ptitle} »</summary><div class="passage">${escapeHtml(it.passage).replace(/\n/g, '<br>')}</div></details>`;

  if (it.t === 'qcm') {
    body += `<div class="stem">${escapeHtml(it.q).replace('______', '<span class="blank">______</span>')}</div>`;
    const prevA = DG.ans[it.id];
    body += `<div id="opts">${it.o.map((o, k) =>
      `<button class="opt" onclick="diagAnswer(${k})" style="${prevA === k ? 'border-color:var(--accent)' : ''}"><span class="lab">${'ABCD'[k]}</span>${escapeHtml(o)}${prevA === k ? ' <span class="sub">· ta réponse</span>' : ''}</button>`).join('')}</div>`;
  } else if (it.t === 'libre') {
    body += `<div class="stem">${escapeHtml(it.q).replace('______', '<span class="blank">______</span>')}</div>`;
    body += `<input id="dgin" class="dg-in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="ta réponse…">
      <div class="dg-keys">${DIAG_KEYS.map(c => `<button onclick="diagKey('${c}')">${c}</button>`).join('')}</div>
      <button class="btn mt" onclick="diagAnswerText()">Valider →</button>
      <div class="sub center" style="font-size:12px;margin-top:6px">Tape seulement ce qui remplace le blanc.</div>`;
  } else if (it.t === 'error') {
    body += `<div class="sub mb">Touche le mot fautif :</div>
      <div class="dg-words">${it.w.map((w, k) => `<button class="dgw" onclick="diagAnswer(${k})" style="${DG.ans[it.id] === k ? 'border-color:var(--accent);color:var(--accent)' : ''}">${escapeHtml(w)}</button>`).join('')}</div>`;
  } else if (it.t === 'trad') {
    body += `<div class="stem" style="font-style:italic">${escapeHtml(it.fr)}</div>`;
    body += `<textarea id="dgin" class="dg-in" rows="2" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="en español…"></textarea>
      <div class="dg-keys">${DIAG_KEYS.map(c => `<button onclick="diagKey('${c}')">${c}</button>`).join('')}</div>
      <button class="btn mt" onclick="diagAnswerText()">Valider →</button>`;
  }

  app.innerHTML = `
    <div class="exbar">
      <span class="sec ${it.sec === 'R' ? 'R' : 'L'}">${sec.short} ${secPos}/${secItems.length}</span>
      <span class="sub">${DG.i + 1} / ${n}</span>
    </div>
    <div class="pbar mb"><i style="width:${DG.i / n * 100}%"></i></div>
    ${body}
    <div class="mt" style="display:flex;gap:8px">
      ${DG.i > 0 ? `<button class="btn ghost" onclick="diagBack()">‹ Précédente</button>` : ''}
      <button class="btn ghost" onclick="diagQuit()">Pause — reprendre plus tard</button>
    </div>
    <div class="sub center mt" style="font-size:12px">Pas de correction avant la fin : corriger en route changerait ce que mesurent les questions suivantes.</div>
  `;
  window.scrollTo(0, 0);
  const inp = document.getElementById('dgin');
  if (inp) {
    const old = DG.ans[it.id];
    if (old != null) inp.value = old;
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' && it.t !== 'trad') { e.preventDefault(); diagAnswerText(); } });
    setTimeout(() => { try { inp.focus(); } catch (e) {} }, 120);
  }
}
function diagBack() { if (DG.i > 0) { DG.i--; diagPersist(); diagRender(); } }
function diagAnswer(k) { DG.ans[DG.items[DG.i].id] = k; diagNext(); }
function diagAnswerText() {
  const el = document.getElementById('dgin');
  const v = el ? el.value.trim() : '';
  if (!v) { toast('Écris quelque chose — ou laisse un tiret si tu ne sais pas.'); return; }
  DG.ans[DG.items[DG.i].id] = v;
  diagNext();
}
function diagNext() {
  if (DG.i >= DG.items.length - 1) { diagPersist(); return diagFinish(); }
  DG.i++; diagPersist(); diagRender();
}

/* ============================================================
   DÉPOUILLEMENT
   ============================================================ */
function diagGrade(it, given) {
  if (given == null || given === '') return 'ko';
  if (it.t === 'qcm' || it.t === 'error') return given === it.c ? 'ok' : 'ko';
  if (it.t === 'libre') return diagCheckLibre(it, given);
  if (it.t === 'trad') return diagCheckTrad(it, given);
  return 'ko';
}
function diagGivenLabel(it, given) {
  if (given == null || given === '') return '(sans réponse)';
  if (it.t === 'qcm') return 'ABCD'[given] + '. ' + it.o[given];
  if (it.t === 'error') return '« ' + it.w[given] + ' »';
  return '« ' + given + ' »';
}
function diagGoodLabel(it) {
  if (it.t === 'qcm') return 'ABCD'[it.c] + '. ' + it.o[it.c];
  if (it.t === 'error') return it.fix;
  if (it.t === 'libre') return it.a.join(' / ');
  if (it.t === 'trad') return it.a.join(' / ');
  return '';
}

/* PALIER TENU, et le trou éventuel en dessous.
   ------------------------------------------------------------------
   Première version, jetée : on montait du bas vers le haut et on
   s'arrêtait au premier palier sous 67 %. Résultat observé au test :
   « Indicatif / subjonctif, 74 % de réussite globale » affiché « < A2 »,
   parce que le palier B1 avait un creux. C'est une aberration, et pire
   qu'une absence de mesure — elle se lit comme un verdict.
   La cause est que l'escalier strict suppose une compétence homogène :
   on tiendrait tous les paliers jusqu'au sien puis plus aucun. Ce n'est
   pas vrai d'une langue apprise par bribes, où le subjonctif après
   « ojalá » peut être solide et la concordance au passé non.
   Donc deux nombres au lieu d'un, chacun honnête :
     · le PALIER TENU = le plus haut niveau réussi à 67 % ou mieux
       (au moins deux items à ce niveau, sinon c'est du hasard) ;
     · le TROU = un niveau INFÉRIEUR au palier tenu où la réussite tombe
       sous 50 %. Un palier C1 tenu avec un trou en B1 n'est pas un C1 :
       c'est exactement ce qu'il faut voir, et le signaler vaut mieux que
       de l'écraser en un seul chiffre faux. */
function diagTagLevel(per) {
  let lvl = 0, hole = 0;
  for (let L = 5; L >= 2; L--) {
    const c = per[L];
    if (c && c.n >= 2 && c.ok / c.n >= 0.67) { lvl = L; break; }
  }
  if (lvl) for (let L = 2; L < lvl; L++) {
    const c = per[L];
    if (c && c.n >= 2 && c.ok / c.n < 0.5) { hole = L; break; }
  }
  return { lvl, hole };
}
const DIAG_CEFR = { 0:'aucun', 2:'A2', 3:'B1', 4:'B2', 5:'C1' };
/* Un palier décerné sur deux ou trois items ne veut rien dire : on affiche
   « n.d. » plutôt qu'un chiffre qui aura l'air d'une mesure. */
function diagLevelLabel(niv, n) {
  if (n < 4) return 'n.d.';
  const L = (niv && typeof niv === 'object') ? niv.lvl : niv;
  const h = (niv && typeof niv === 'object') ? niv.hole : 0;
  return (DIAG_CEFR[L] || '—') + (h ? ' ⚠' : '');
}
const DIAG_TAGNAMES = {
  modo:'Indicatif / subjonctif', tiempos:'Temps et concordance', serestar:'Ser / estar',
  prep:'Prépositions et régimes', relativos:'Relatives', pron:'Pronoms, se, datifs',
  perifrasis:'Périphrases verbales', conectores:'Connecteurs', morfo:'Morphologie et accords',
  lexico:'Précision lexicale', idiom:'Locutions figées', calco:'Calques du français',
  registro:'Registre', lectura:'Compréhension écrite'
};

function diagCompute(items, ans) {
  const tags = {}, fmt = {}, lvls = {}, wrong = [], accents = [];
  let wsum = 0, wok = 0;
  items.forEach(it => {
    const g = diagGrade(it, ans[it.id]);
    const ok = g === 'ok' || g === 'acento';
    if (g === 'acento') accents.push({ id:it.id, q:it.q, given:ans[it.id], good:it.a.join(' / ') });
    const T = tags[it.tag] = tags[it.tag] || { n:0, ok:0, per:{} };
    T.n++; if (ok) T.ok++;
    const P = T.per[it.lvl] = T.per[it.lvl] || { n:0, ok:0 };
    P.n++; if (ok) P.ok++;
    const F = fmt[it.sec] = fmt[it.sec] || { n:0, ok:0 };
    F.n++; if (ok) F.ok++;
    const Lv = lvls[it.lvl] = lvls[it.lvl] || { n:0, ok:0 };
    Lv.n++; if (ok) Lv.ok++;
    wsum += it.lvl; if (ok) wok += it.lvl;
    if (!ok) wrong.push({ sec:it.sec, tag:it.tag, lvl:it.lvl, t:it.t, id:it.id,
      q: (it.t === 'trad' ? it.fr : (it.t === 'error' ? it.w.join(' ') : it.q)).slice(0, 120),
      given: diagGivenLabel(it, ans[it.id]), good: diagGoodLabel(it), e: it.e });
  });

  /* Écart reconnaissance / rappel. On ne compare que ce qui est comparable :
     la grammaire, à partir de B1, section G (QCM) contre section P (tapé). */
  const cmp = sec => {
    let n = 0, ok = 0;
    items.forEach(it => { if (it.sec === sec && it.lvl >= 3) { n++; if (diagGrade(it, ans[it.id]) !== 'ko') ok++; } });
    return n ? Math.round(ok / n * 100) : null;
  };
  const recon = cmp('G'), rappel = cmp('P');

  const idx = wsum ? Math.round(wok / wsum * 100) : 0;
  const cefr = idx >= 85 ? 'C1' : idx >= 70 ? 'B2' : idx >= 55 ? 'B1' : idx >= 38 ? 'A2' : 'A1';
  return { idx, cefr, tags, fmt, lvls, wrong, accents, recon, rappel };
}

function diagFinish() {
  const R = diagCompute(DG.items, DG.ans);
  const mins = Math.max(1, Math.round((DG.secs || 0) / 60));
  const niveles = {};
  Object.keys(R.tags).forEach(t => { niveles[t] = diagTagLevel(R.tags[t].per); });

  S.diag = {
    v: 1, date: todayStr(), ts: Date.now(), mins,
    idx: R.idx, cefr: R.cefr,
    recon: R.recon, rappel: R.rappel,
    niveles,
    tags: Object.fromEntries(Object.keys(R.tags).map(t => [t, { n:R.tags[t].n, ok:R.tags[t].ok,
      per: Object.fromEntries(Object.keys(R.tags[t].per).map(L => [L, [R.tags[t].per[L].n, R.tags[t].per[L].ok]])) }])),
    fmt: Object.fromEntries(Object.keys(R.fmt).map(k => [k, [R.fmt[k].n, R.fmt[k].ok]])),
    lvls: Object.fromEntries(Object.keys(R.lvls).map(k => [k, [R.lvls[k].n, R.lvls[k].ok]])),
    wrong: R.wrong.map(w => ({ id:w.id, s:w.sec, g:w.tag, l:w.lvl, t:w.t, q:w.q, mio:String(w.given).slice(0, 90), bien:String(w.good).slice(0, 90) })),
    acentos: R.accents.map(a => ({ q:a.q, mio:a.given, bien:a.good })),
    /* Les réponses tapées sont gardées TELLES QUELLES — c'est le seul
       moyen de les relire à la main, et la correction automatique du thème
       n'est pas fiable. Seul l'énoncé est abrégé : il est déjà dans le code. */
    libre: DG.items.filter(x => x.t === 'libre').map(x => [x.id, DG.ans[x.id] || '', diagGrade(x, DG.ans[x.id])]),
    trad:  DG.items.filter(x => x.t === 'trad').map(x => [x.fr.slice(0, 60), DG.ans[x.id] || '', diagGrade(x, DG.ans[x.id])])
  };
  S.diagRun = null;
  S.placementDone = true;
  S.estScore = R.idx;
  S.level = R.idx >= 72 ? 3 : R.idx >= 50 ? 2 : 1;
  addXp(120);
  markStudy(); touchDay(); save();
  if (!saveHealthy()) toast('⚠️ Résultat calculé mais sauvegarde refusée — exporte le profil MAINTENANT');
  diagReport();
}

/* ---------- Le rapport ---------- */
function diagBar(pct, col) {
  return `<div class="dg-bar"><i style="width:${Math.max(2, pct)}%;background:${col}"></i></div>`;
}
function diagColor(pct) { return pct >= 80 ? 'var(--good)' : pct >= 60 ? 'var(--accent)' : pct >= 40 ? 'var(--warn,#e0a33e)' : 'var(--bad,#d9534f)'; }

function diagReport() {
  const D = S.diag;
  if (!D) return setView('diag');
  const tagRows = Object.keys(D.tags)
    .map(t => { const x = D.tags[t]; return { t, pct: Math.round(x.ok / x.n * 100), n: x.n, lvl: D.niveles[t], per: x.per }; })
    .sort((a, b) => a.pct - b.pct)
    .map(r => `
      <div class="dg-row">
        <div class="dg-nm">${DIAG_TAGNAMES[r.t] || r.t}<span class="sub"> · ${r.n} items</span></div>
        <div class="dg-lv" title="${(r.lvl && r.lvl.hole) ? 'trou en ' + DIAG_CEFR[r.lvl.hole] : ''}">${diagLevelLabel(r.lvl, r.n)}</div>
        <div class="dg-pc">${r.pct}%</div>
        ${diagBar(r.pct, diagColor(r.pct))}
      </div>`).join('');

  const faibles = Object.keys(D.tags)
    .map(t => { const x = D.tags[t]; return { t, pct: Math.round(x.ok / x.n * 100), n: x.n }; })
    .filter(r => r.n >= 4).sort((a, b) => a.pct - b.pct).slice(0, 4);

  const gap = (D.recon != null && D.rappel != null) ? D.recon - D.rappel : null;
  /* Trois lectures distinctes, et une seule était écrite au départ. Un écart
     NÉGATIF — produire mieux que reconnaître — n'est pas « négligeable » : il
     veut dire que les distracteurs du QCM font plus de dégâts que le vide,
     donc que les formes concurrentes ne sont pas discriminées. Ce n'est pas
     le même chantier que l'écart positif, et ça ne se soigne pas pareil. */
  const gapCard = gap == null ? '' : `
    <div class="card" style="border-color:${Math.abs(gap) >= 20 ? 'var(--bad,#d9534f)' : 'var(--line)'}">
      <h2 style="font-size:16px">Reconnaître ${D.recon}% · produire ${D.rappel}%</h2>
      <div class="sub">Mêmes compétences, mêmes niveaux, deux formats : à choisir parmi quatre réponses, et à taper sans aucune option.
      ${gap >= 20
        ? `<b style="color:var(--txt)">Tu reconnais ${gap} points de plus que tu ne produis.</b> C'est le résultat le plus actionnable du test : la connaissance est là, elle n'est pas <i>disponible</i>. Aucune heure de QCM supplémentaire ne la rendra disponible — seul le rappel actif le fait.`
        : gap <= -10
          ? `<b style="color:var(--txt)">Tu produis ${-gap} points de mieux que tu ne reconnais.</b> C'est l'inverse du cas habituel, et ça se lit précisément : les formes te viennent, mais mises côte à côte avec leurs concurrentes, tu te fais déloger. Le chantier n'est pas la production, c'est la DISCRIMINATION — savoir pourquoi « tenga » et pas « tendrá », pas seulement sortir « tenga ».`
        : Math.abs(gap) <= 5
          ? `L'écart est de ${gap} point${Math.abs(gap) > 1 ? 's' : ''} : négligeable. Ce que tu reconnais, tu le produis. C'est rare, et ça veut dire que le plafond est ailleurs — dans ce que tu ne connais pas encore, pas dans ce qui dort.`
          : `L'écart est de ${gap} points : modéré, dans un sens ou dans l'autre. Reconnaissance et production marchent du même pas.`}</div>
    </div>`;

  const fmtNames = { G:'Grammaire · QCM', P:'Grammaire · tapé', E:'Détection d\'erreurs', L:'Lexique et registre', R:'Lecture', T:'Thème FR→ES' };
  const fmtRows = Object.keys(fmtNames).filter(k => D.fmt[k]).map(k => {
    const [n, ok] = D.fmt[k], pct = Math.round(ok / n * 100);
    return `<div class="dg-row"><div class="dg-nm">${fmtNames[k]}${k === 'T' ? ' <span class="sub">(indicatif)</span>' : ''}</div><div class="dg-pc">${ok}/${n}</div>${diagBar(pct, diagColor(pct))}</div>`;
  }).join('');

  const lvlRows = [2, 3, 4, 5].filter(L => D.lvls[L]).map(L => {
    const [n, ok] = D.lvls[L], pct = Math.round(ok / n * 100);
    return `<div class="dg-row"><div class="dg-nm">${DIAG_CEFR[L]}</div><div class="dg-pc">${ok}/${n}</div>${diagBar(pct, diagColor(pct))}</div>`;
  }).join('');

  app.innerHTML = `
    <div class="card big">
      <div class="em">🧭</div>
      <div class="score">${D.cefr}<span style="font-size:20px;color:var(--muted)"> · indice ${D.idx}/100</span></div>
      <div class="lab">Diagnostic du ${D.date} · ${D.mins} min · ${diagTotal()} items</div>
    </div>
    <div class="card">
      <div class="sub">Cet indice n'est <b style="color:var(--txt)">pas</b> comparable à ton score d'évaluation : pas d'écoute, d'autres formats, un autre barème. Il n'entre pas dans ta courbe.
      Ce qui compte ici est en dessous : le détail par compétence.</div>
    </div>

    ${gapCard}

    <div class="card">
      <h2 style="font-size:16px">Par compétence</h2>
      <div class="sub mb">Palier tenu = le plus haut niveau réussi à 67 % ou mieux, sur au moins quatre items. Le <b style="color:var(--txt)">⚠</b> signale un trou à un niveau INFÉRIEUR au palier affiché (moins de 50 % de réussite) : la compétence est acquise en haut et percée en bas, et c'est le trou qu'il faut boucher d'abord.</div>
      ${tagRows}
    </div>

    <div class="card">
      <h2 style="font-size:16px">Par format</h2>
      ${fmtRows}
      <div class="sub mt" style="font-size:12px">Le thème FR→ES est corrigé automatiquement sur la présence des éléments décisifs : il laisse passer des fautes et peut refuser une bonne traduction tournée autrement. Tes phrases sont gardées telles quelles dans le profil exporté.</div>
    </div>

    <div class="card">
      <h2 style="font-size:16px">Par niveau CEFR</h2>
      ${lvlRows}
    </div>

    <div class="card" style="border-color:var(--accent)">
      <h2 style="font-size:16px">Les quatre chantiers</h2>
      <div class="sub mb">Par taux de réussite croissant, sur les compétences testées au moins quatre fois.</div>
      ${faibles.map((r, k) => `<div class="sub" style="margin-bottom:4px"><b style="color:var(--txt)">${k + 1}. ${DIAG_TAGNAMES[r.t] || r.t}</b> — ${r.pct}% sur ${r.n} items</div>`).join('')}
    </div>

    ${D.acentos.length ? `<div class="card"><h2 style="font-size:16px">${D.acentos.length} accent${D.acentos.length > 1 ? 's' : ''} seulement</h2>
      <div class="sub">Formes justes, accent faux. Compté correct ici — la grammaire est bonne — mais noté : à l'écrit ça se voit.</div>
      ${D.acentos.map(a => `<div class="sub" style="font-size:13px">· « ${escapeHtml(a.mio)} » → <b style="color:var(--txt)">${escapeHtml(a.bien)}</b></div>`).join('')}
    </div>` : ''}

    <button class="btn" onclick="diagExport()">📋 Copier le profil (à me coller)</button>
    <button class="btn sec mt" onclick="diagDownload()">⬇︎ Télécharger le profil (JSON)</button>
    <button class="btn sec mt" onclick="diagWrongs()">Revoir mes ${D.wrong.length} erreur${D.wrong.length > 1 ? 's' : ''}</button>
    <button class="btn ghost mt" onclick="setView('diag')">Terminé</button>
  `;
  window.scrollTo(0, 0);
}

function diagWrongs() {
  const D = S.diag;
  const secN = { G:'Gramática QCM', P:'Gramática tapé', E:'Error', L:'Léxico', R:'Lectura', T:'Traducción' };
  const groups = {};
  D.wrong.forEach(w => { (groups[w.g] = groups[w.g] || []).push(w); });
  const html = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length).map(g => `
    <div class="card">
      <h2 style="font-size:15px">${DIAG_TAGNAMES[g] || g} · ${groups[g].length} erreur${groups[g].length > 1 ? 's' : ''}</h2>
      ${groups[g].map(w => `
        <div class="review-item">
          <div class="qq">${escapeHtml(w.q).replace('______', '____')} <span class="sub">[${secN[w.s]} · ${DIAG_CEFR[w.l]}]</span></div>
          <div class="ans"><span class="ko">${escapeHtml(w.mio)}</span> → <span class="ok">${escapeHtml(w.bien)}</span></div>
          ${w.e ? `<div class="sub mt">${w.e}</div>` : ''}
        </div>`).join('')}
    </div>`).join('');
  app.innerHTML = `<div class="card"><h2>Correction complète</h2>
    <div class="sub">Groupée par compétence : c'est la forme utile. Dix erreurs éparpillées, c'est du bruit ; dix erreurs toutes sur les prépositions, c'est un chantier.
    Ces questions ne partiront pas dans « Revoir mes erreurs » : le diagnostic ne se révise pas, sinon il ne mesure plus rien.</div></div>
    ${html}
    <button class="btn ghost mt" onclick="diagReport()">‹ Retour au profil</button>`;
  window.scrollTo(0, 0);
}

/* ---------- Sortie : le profil, en texte ----------
   Le but du test n'est pas l'écran : c'est de pouvoir tailler l'app sur
   mesure. Il faut donc que le profil sorte de l'app sous une forme que
   je peux lire en entier, réponses tapées comprises. */
function diagProfileText() {
  const D = S.diag;
  return JSON.stringify(D);
}
function diagExport() {
  const txt = diagProfileText();
  const done = () => toast('Profil copié — colle-le dans Claude Code');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(done, () => diagExportFallback(txt));
  } else diagExportFallback(txt);
}
function diagExportFallback(txt) {
  app.innerHTML = `<div class="card"><h2>Copie manuelle</h2>
    <div class="sub">Le presse-papier a été refusé par le navigateur. Sélectionne tout le texte ci-dessous et copie-le.</div>
    <textarea class="redac" style="min-height:300px;font-size:12px">${escapeHtml(txt)}</textarea></div>
    <button class="btn ghost mt" onclick="diagReport()">‹ Retour</button>`;
  const ta = document.querySelector('textarea.redac');
  if (ta) { ta.focus(); ta.select(); }
}
function diagDownload() {
  const blob = new Blob([diagProfileText()], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cumbre-diagnostico-' + S.diag.date + '.json';
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

/* ============================================================
   ACCUEIL DU MODULE
   ============================================================ */
function renderDiagHome() {
  const run = diagState();
  const D = S.diag;
  const n = diagTotal();

  app.innerHTML = `
    <div class="card" style="border-color:var(--accent)">
      <h2>🧭 El diagnóstico</h2>
      <div class="sub">Un test <b style="color:var(--txt)">unique</b>, long, sans une seule question d'écoute. Il ne sert pas à suivre ta progression — l'évaluation est là pour ça — il sert à <b style="color:var(--txt)">décider quoi régler dans l'app</b>.
      ${n} items, six sections, 60 à 80 minutes. Tu peux t'arrêter et reprendre : chaque réponse est sauvegardée.</div>
    </div>

    <div class="card">
      <h2 style="font-size:15px">Ce qu'il mesure que l'évaluation ne mesure pas</h2>
      <div class="sub"><b style="color:var(--txt)">1. Le rappel, pas seulement la reconnaissance.</b> ${DIAG_LIBRE.length} items de grammaire sans aucune option : la forme doit sortir de ta tête. Reconnaître « tenga » parmi quatre formes et la produire dans le vide sont deux compétences différentes, et seule la seconde sert à parler.
      <br><br><b style="color:var(--txt)">2. L'oreille interne.</b> ${DIAG_ERROR.length} phrases dont un mot est faux, à repérer. Un QCM affiche toujours la bonne forme quelque part : il ne peut pas voir une faute fossilisée. Celui-là peut.
      <br><br><b style="color:var(--txt)">3. La production libre.</b> ${DIAG_TRAD.length} phrases à traduire du français, chacune bâtie sur une structure qui ne se calque pas.
      <br><br><b style="color:var(--txt)">4. Un profil, pas un score.</b> Chaque item porte une compétence et un niveau : la sortie est un niveau par compétence, de A2 à C1.</div>
    </div>

    ${run ? `
      <div class="card" style="border-color:var(--good)">
        <h2 style="font-size:15px">Test en cours</h2>
        <div class="sub">Tu en es à la question <b style="color:var(--txt)">${run.i + 1}</b> sur ${run.n}, ${Math.round((run.secs || 0) / 60)} min de passées.</div>
        <button class="btn mt" onclick="diagStart(true)">Reprendre où j'en étais</button>
        <button class="btn ghost mt" onclick="if(confirm('Recommencer à zéro ? Les réponses déjà données seront perdues.')){S.diagRun=null;save();diagStart(false);}">Recommencer à zéro</button>
      </div>`
    : D ? `
      <div class="card">
        <h2 style="font-size:15px">Profil du ${D.date}</h2>
        <div class="sub">${D.cefr} · indice ${D.idx}/100 · reconnaissance ${D.recon}% contre production ${D.rappel}%.</div>
        <button class="btn mt" onclick="diagReport()">Revoir le profil complet</button>
        <button class="btn sec mt" onclick="diagExport()">📋 Copier le profil</button>
        <button class="btn ghost mt" onclick="if(confirm('Repasser le diagnostic ? Le profil actuel sera remplacé. Un diagnostic ne se repasse utilement qu\\'après des mois de travail.')){S.diagRun=null;save();diagStart(false);}">Repasser le diagnostic</button>
      </div>`
    : `<button class="btn" onclick="diagStart(false)">Commencer le diagnostic</button>
       <div class="sub center mt" style="font-size:12px">Aucune correction ne s'affichera avant la fin. C'est voulu.</div>`}
  `;
  window.scrollTo(0, 0);
}

/* ---------- Styles propres au module ---------- */
(function diagStyles() {
  const css = `
  .dg-sec{display:flex;gap:12px;align-items:center;background:var(--card2);border:1px solid var(--accent);border-radius:14px;padding:12px;margin-bottom:14px}
  .dg-sec .ic{font-size:26px;color:var(--accent)}
  .dg-det{margin-bottom:12px}
  .dg-det summary{cursor:pointer;color:var(--accent);font-size:13px;padding:6px 0}
  .dg-in{width:100%;box-sizing:border-box;background:var(--card2);color:var(--txt);border:1px solid var(--line);border-radius:12px;padding:13px;font:inherit;font-size:17px;margin-top:10px}
  .dg-in:focus{outline:none;border-color:var(--accent)}
  .dg-keys{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
  .dg-keys button{background:var(--card2);color:var(--txt);border:1px solid var(--line);border-radius:9px;min-width:38px;height:38px;font-size:17px;cursor:pointer}
  .dg-keys button:active{border-color:var(--accent)}
  .dg-words{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}
  .dgw{background:var(--card2);color:var(--txt);border:1px solid var(--line);border-radius:10px;padding:11px 13px;font:inherit;font-size:17px;cursor:pointer}
  .dgw:active{border-color:var(--accent);color:var(--accent)}
  .dg-row{display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid var(--line)}
  .dg-row:last-child{border-bottom:none}
  .dg-nm{font-size:14px}
  .dg-lv{font-size:12px;font-weight:800;color:var(--accent);min-width:26px;text-align:right}
  .dg-pc{font-size:13px;color:var(--muted);min-width:46px;text-align:right}
  .dg-bar{grid-column:1/-1;height:5px;background:var(--line);border-radius:4px;overflow:hidden}
  .dg-bar i{display:block;height:100%;border-radius:4px}
  `;
  const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
})();
