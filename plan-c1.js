/* ============================================================
   CUMBRE — PLAN C1 · 8 semaines, et EL TALLER qui le fait tourner
   2026-11-15.
   ------------------------------------------------------------
   CE QUE LE DIAGNOSTIC A DIT, ET CE QUE ÇA CHANGE.
   Indice 73/100, B2. Mais le détail est beaucoup plus utile que la
   bande :
     · LECTURE 17/18, dont 5/6 au niveau C1. C'est fini. Or c'est le
       module sur lequel l'app insistait le plus — « Lectura del día »
       occupait un jour sur deux du pilier obligatoire. On entraînait
       la compétence déjà acquise.
     · RECONNAÎTRE 83 % contre PRODUIRE 71 %, et THÈME 5/12. Tout ce
       qui est à options marche, tout ce qui part de rien s'effondre.
     · SUBJONCTIF : 3/3 en B1, 6/12 en B2. Et les fautes se séparent
       en deux familles qui n'ont pas le même remède —
         ne pas DÉCLENCHER : « Aunque es difícil », « En cuanto
           contesta », « me extraña que no llame » ;
         ne pas FABRIQUER la forme : « trayéramos », « dicieras ».
     · PASSÉ : deux phrases fautives non repérées, « Ayer he visto »
       et « Cuando era joven he vivido ». Même calque du français.
   ------------------------------------------------------------
   LE PLAN NE FAIT PAS QUE RAJOUTER.
   Rajouter du travail à quelqu'un qui en a déjà trop ne produit pas
   plus de travail, ça produit de l'abandon. Donc le socle quotidien
   PERD deux obligations et en gagne une seule :
     — sort la lecture du pilier obligatoire (17/18, rien à y gagner) ;
     — sort la prononciation du socle (non mesurée, et il travaille
       souvent sans son) ; elle reste accessible, elle n'est plus due ;
     + entre EL TALLER, 12 items tapés, environ huit minutes.
   ------------------------------------------------------------
   LES POIDS SONT DÉRIVÉS DU PROFIL, PAS ÉCRITS EN DUR.
   planPesos() lit S.diag et répartit les douze items du jour selon le
   NOMBRE d'items ratés par compétence au diagnostic — pas selon le
   pourcentage. Un chantier à 60 % sur vingt items coûte plus de points
   qu'un chantier à 50 % sur quatre : c'est la masse d'erreur qu'on
   veut récupérer, pas le taux. Conséquence utile : après le prochain
   diagnostic, la répartition se refait toute seule.
   ============================================================ */
'use strict';

const PLAN_DIAS = 60;                       // deux mois, à la demande
const GOAL_TALLER = 12;                     // items tapés par jour

/* Les cinq chantiers, et les compétences du diagnostic qui les alimentent. */
const PLAN_CHANTIERS = [
  { k:'gatillo',   bank:'TALLER_GATILLO',   tags:['modo'], part:0.6,
    t:'Déclencher le subjonctif',  d:'Poser le subjonctif quand la structure l\'exige — et NE PAS le poser quand elle ne l\'exige pas. Un tiers des items appelle l\'indicatif, exprès.' },
  { k:'subjmorfo', bank:'TALLER_SUBJMORFO', tags:['modo'], part:0.4,
    t:'Fabriquer la forme',        d:'trajeron → trajera, dijeron → dijera. Le subjonctif imparfait se construit sur la 3ᵉ personne du pluriel du prétérit. Purement mécanique, donc rapide à réparer.' },
  { k:'pasado',    bank:'TALLER_PASADO',    tags:['tiempos'], part:1,
    t:'Le système du passé',       d:'Prétérit contre passé composé, imparfait, plus-que-parfait, futur de probabilité. « Ayer he visto » est le calque à tuer en premier.' },
  { k:'relat',     bank:'TALLER_RELAT',     tags:['relativos'], part:1,
    t:'Les relatives',             d:'del que, cuyo, quien, fue entonces cuando. Le « dont » français cache la préposition que l\'espagnol exige.' },
  { k:'c1lex',     bank:'TALLER_C1LEX',     tags:['idiom','lexico','conectores'], part:1,
    t:'Lexique et connecteurs C1', d:'Le verbe qui va avec le nom, la locution figée, le connecteur qui dit exactement le rapport voulu. À ce stade, c\'est ça qui sépare un B2 d\'un C1.' }
];

/* Les quatre phases. Tous les chantiers tournent tous les jours — on ne
   met pas un sujet au placard pendant trois semaines, il serait oublié —
   mais le multiplicateur déplace le centre de gravité au fil des semaines. */
const PLAN_FASES = [
  { s:[1,3],  t:'Le subjonctif en production',  mult:{ gatillo:2.2, subjmorfo:2.2, pasado:1, relat:.6, c1lex:.7 },
    why:'C\'est le plus gros gisement de points et le plus structurant : tant qu\'il ne part pas tout seul, chaque phrase coûte un calcul.' },
  { s:[4,5],  t:'Le système du passé',          mult:{ gatillo:1, subjmorfo:1.2, pasado:2.4, relat:.8, c1lex:1 },
    why:'Le subjonctif imparfait se construit sur le prétérit : travailler le passé consolide le chantier précédent au lieu de le quitter.' },
  { s:[6,7],  t:'Lexique C1 et relatives',      mult:{ gatillo:.8, subjmorfo:.8, pasado:1, relat:1.8, c1lex:2.4 },
    why:'La grammaire tient : ce qui plafonne le niveau devient le mot juste et la locution. C\'est ce qui se voit le plus vite à l\'écrit.' },
  { s:[8,8],  t:'Tout en thème',                mult:{ gatillo:1, subjmorfo:1, pasado:1, relat:1, c1lex:1 }, trad:6,
    why:'Dernière semaine : moitié de la séance en traduction pure, le seul format où rien n\'est donné. Puis on repasse le diagnostic.' }
];

/* ACTIVATION AUTOMATIQUE, mais jamais silencieuse ni définitive.
   La demande était « adapte l'app », pas « donne-moi un bouton » : dès
   qu'un diagnostic existe, le plan démarre. Deux garde-fous, parce que
   changer l'objectif quotidien de quelqu'un sans le lui dire est le plus
   sûr moyen de lui faire fermer l'app :
     · une bannière d'accueil explique ce qui a changé, tant qu'elle n'a
       pas été lue (planVisto) ;
     · « Arrêter le plan » écrit on:0, et on:0 n'est JAMAIS réactivé
       automatiquement — un refus explicite se respecte. */
function planAuto() {
  if (S.diag && !S.plan) { S.plan = { on: 1, start: Date.now(), auto: 1, visto: 0 }; save(); }
}
function planStart() { return (S.diag && S.diag.ts) ? S.diag.ts : null; }
function planActive() { planAuto(); return !!(S.diag && S.plan && S.plan.on); }
function planDay() { const t = planStart(); return t ? Math.floor((Date.now() - t) / DAY) + 1 : 0; }
function planWeek() { return Math.max(1, Math.min(9, Math.ceil(planDay() / 7))); }
function planLeft() { return Math.max(0, PLAN_DIAS - planDay() + 1); }
function planEndDate() {
  const t = planStart(); if (!t) return '—';
  return new Date(t + PLAN_DIAS * DAY).toISOString().slice(0, 10);
}
function planFase() {
  const w = planWeek();
  return PLAN_FASES.find(f => w >= f.s[0] && w <= f.s[1]) || PLAN_FASES[PLAN_FASES.length - 1];
}

/* Masse d'erreur par chantier, lue dans le diagnostic. */
function planPesos() {
  const D = S.diag;
  const base = {};
  PLAN_CHANTIERS.forEach(c => {
    let falladas = 0;
    c.tags.forEach(tag => {
      const x = D && D.tags && D.tags[tag];
      if (x) falladas += (x.n - x.ok);
    });
    base[c.k] = Math.max(0.5, falladas * c.part);   // plancher : aucun chantier n'est abandonné
  });
  const f = planFase();
  const pond = {};
  PLAN_CHANTIERS.forEach(c => { pond[c.k] = base[c.k] * (f.mult[c.k] || 1); });
  return { base, pond };
}

/* Répartition des places du jour, par la méthode du plus fort reste :
   les arrondis ne doivent pas faire perdre ou inventer un item. */
function planReparto(nTotal) {
  const { pond } = planPesos();
  const suma = PLAN_CHANTIERS.reduce((s, c) => s + pond[c.k], 0) || 1;
  const exact = {}, ent = {};
  let usados = 0;
  PLAN_CHANTIERS.forEach(c => {
    exact[c.k] = pond[c.k] / suma * nTotal;
    ent[c.k] = Math.max(1, Math.floor(exact[c.k]));
    usados += ent[c.k];
  });
  while (usados > nTotal) {                       // trop de planchers : on rogne le plus gros
    const k = PLAN_CHANTIERS.map(c => c.k).filter(k => ent[k] > 1).sort((a, b) => ent[b] - ent[a])[0];
    if (!k) break; ent[k]--; usados--;
  }
  const restos = PLAN_CHANTIERS.map(c => [c.k, exact[c.k] - Math.floor(exact[c.k])]).sort((a, b) => b[1] - a[1]);
  let i = 0;
  while (usados < nTotal) { ent[restos[i % restos.length][0]]++; usados++; i++; }
  return ent;
}

/* ============================================================
   EL TALLER — la séance
   ============================================================ */
function tallerState() {
  if (!S.taller) S.taller = { box:{}, vistos:{}, dia:{ date:todayStr(), n:0 }, hechos:0, aciertos:0, hist:[] };
  if (S.taller.dia.date !== todayStr()) S.taller.dia = { date: todayStr(), n: 0 };
  return S.taller;
}
function tallerHoy() { return tallerState().dia.n; }
function tallerLeft() { return Math.max(0, GOAL_TALLER - tallerHoy()); }
function tallerDone() { return tallerHoy() >= GOAL_TALLER; }

function tallerBank(k) { return window[PLAN_CHANTIERS.find(c => c.k === k).bank] || []; }
function tallerId(k, i) { return k[0] + i; }

/* Priorité : ce qui a été RATÉ (box 0 et déjà vu), puis le neuf, puis le
   moins consolidé. Une faute non rejouée est une faute qu'on refera. */
function tallerPick(k, n) {
  const T = tallerState(), bank = tallerBank(k);
  const pool = bank.map((it, i) => {
    const id = tallerId(k, i), box = T.box[id] == null ? -1 : T.box[id];
    const visto = T.vistos[id] || 0;
    const rango = box === -1 ? 1 : (box === 0 ? 0 : 2 + box);   // 0 = raté, 1 = neuf, 2+ = consolidé
    return { it, i, id, k, rango, visto };
  });
  return shuffle(pool).sort((a, b) => a.rango - b.rango || a.visto - b.visto).slice(0, n);
}

let TL = null;
function tallerStart() {
  const f = planFase();
  const nTrad = f.trad || 2;
  const nLibre = GOAL_TALLER - nTrad;
  const rep = planReparto(nLibre);
  let items = [];
  PLAN_CHANTIERS.forEach(c => { items = items.concat(tallerPick(c.k, rep[c.k])); });
  items = shuffle(items);
  /* Le thème ferme toujours la séance : c'est l'épreuve de sortie, elle
     n'a de sens qu'une fois les mécanismes remis en bouche. */
  const T = tallerState();
  const trads = shuffle(TALLER_TRAD.map((it, i) => {
    const id = 't' + i, box = T.box[id] == null ? -1 : T.box[id];
    return { it, i, id, k:'trad', rango: box === -1 ? 1 : (box === 0 ? 0 : 2 + box), visto: T.vistos[id] || 0 };
  })).sort((a, b) => a.rango - b.rango || a.visto - b.visto).slice(0, nTrad);
  TL = { items: items.concat(trads), i:0, ok:0, errores:[] };
  tallerRender();
}

function tallerRender() {
  if (TL.i >= TL.items.length) return tallerFinish();
  const x = TL.items[TL.i], it = x.it;
  const esTrad = x.k === 'trad';
  const ch = PLAN_CHANTIERS.find(c => c.k === x.k);
  const enonce = esTrad ? it[0] : it[0];
  app.innerHTML = `
    <div class="exbar">
      <span class="sec L">${esTrad ? 'Traducir' : (ch ? ch.t : x.k)}</span>
      <span class="sub">${TL.i + 1} / ${TL.items.length}</span>
    </div>
    <div class="pbar mb"><i style="width:${TL.i / TL.items.length * 100}%"></i></div>
    <div class="stem" ${esTrad ? 'style="font-style:italic"' : ''}>${escapeHtml(enonce).replace('______', '<span class="blank">______</span>')}</div>
    ${esTrad ? `<textarea id="dgin" class="dg-in" rows="2" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="en español…"></textarea>`
             : `<input id="dgin" class="dg-in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="ta réponse…">`}
    <div class="dg-keys">${DIAG_KEYS.map(c => `<button onclick="diagKey('${c}')">${c}</button>`).join('')}</div>
    <button class="btn mt" onclick="tallerCheck()">Valider →</button>
    <div class="mt"><button class="btn ghost" onclick="setView('plan')">Arrêter la séance</button></div>
  `;
  window.scrollTo(0, 0);
  const inp = document.getElementById('dgin');
  if (inp) {
    if (!esTrad) inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); tallerCheck(); } });
    setTimeout(() => { try { inp.focus(); } catch (e) {} }, 120);
  }
}

function tallerCheck() {
  const el = document.getElementById('dgin');
  const v = el ? el.value.trim() : '';
  if (!v) { toast('Écris quelque chose — ou un tiret si tu sèches.'); return; }
  const x = TL.items[TL.i], it = x.it;
  let veredicto;
  if (x.k === 'trad') {
    veredicto = it[2].every(re => new RegExp(re).test(diagNorm(v))) ? 'ok' : 'ko';
  } else {
    veredicto = diagCheckLibre({ a: it[1] }, v);
  }
  const T = tallerState();
  T.vistos[x.id] = (T.vistos[x.id] || 0) + 1;
  T.box[x.id] = veredicto === 'ko' ? 0 : Math.min(4, (T.box[x.id] || 0) + 1);
  T.dia.n++; T.hechos++;
  if (veredicto !== 'ko') { T.aciertos++; TL.ok++; } else TL.errores.push({ x, mio: v });
  save();
  tallerFeedback(veredicto, v);
}

/* Ici, à l'inverse du diagnostic, la correction est IMMÉDIATE et obligatoire.
   Le diagnostic mesure, donc il se tait ; le taller entraîne, donc il parle.
   Une réponse tapée sans retour immédiat installe la faute aussi bien que
   la forme juste. */
function tallerFeedback(veredicto, mio) {
  const x = TL.items[TL.i], it = x.it;
  const buenas = x.k === 'trad' ? it[1].join('  ·  ') : it[1].join(' / ');
  const expl = x.k === 'trad' ? it[3] : it[2];
  const head = veredicto === 'ok' ? '<div class="fb ok">✓ Exact</div>'
            : veredicto === 'acento' ? '<div class="fb acc">≈ Juste, mais l\'accent manque</div>'
            : '<div class="fb ko">✗ Non</div>';
  app.innerHTML = `
    <div class="exbar"><span class="sec L">${x.k === 'trad' ? 'Traducir' : (PLAN_CHANTIERS.find(c => c.k === x.k) || {}).t}</span>
      <span class="sub">${TL.i + 1} / ${TL.items.length}</span></div>
    ${head}
    <div class="stem" style="font-size:16px">${escapeHtml(
        /* L'indice entre parenthèses — « (ser) », « (ir, nosotros) » — sert à
           poser la question. Dans la phrase RECONSTITUÉE il n'a plus rien à
           y faire : on veut lire la phrase espagnole, pas la consigne. */
        it[0].replace(/\s*\([^()]*\)\s*$/, '')
      ).replace('______', '<b style="color:var(--accent)">' + escapeHtml(veredicto === 'ko' ? '____' : mio) + '</b>')}</div>
    <div class="card">
      ${veredicto === 'ko' ? `<div class="sub">Ta réponse : <span style="color:var(--bad,#d9534f)">« ${escapeHtml(mio)} »</span></div>` : ''}
      <div class="sub" style="margin-top:4px">${veredicto === 'ok' ? 'Réponse' : 'La bonne réponse'} : <b style="color:var(--good)">${escapeHtml(buenas)}</b></div>
      <div class="sub mt">${expl}</div>
    </div>
    <button class="btn" onclick="tallerNext()">Suivant →</button>
  `;
  window.scrollTo(0, 0);
}
function tallerNext() { TL.i++; tallerRender(); }

function tallerFinish() {
  const T = tallerState();
  markStudy(); touchDay();
  addXp(10 + TL.ok * 2);
  T.hist.push({ d: todayStr(), n: TL.items.length, ok: TL.ok });
  if (T.hist.length > 90) T.hist = T.hist.slice(-90);
  save();
  checkDailyDone();
  const pct = Math.round(TL.ok / TL.items.length * 100);
  app.innerHTML = `
    <div class="card big">
      <div class="em">${pct >= 85 ? '🔥' : pct >= 60 ? '💪' : '🧱'}</div>
      <div class="score">${TL.ok}/${TL.items.length}</div>
      <div class="lab">Semaine ${planWeek()} · ${planFase().t}</div>
    </div>
    ${TL.errores.length ? `<div class="card">
      <h2 style="font-size:15px">Les ${TL.errores.length} à refaire</h2>
      <div class="sub mb">Elles repassent <b style="color:var(--txt)">en priorité</b> dans ta prochaine séance — pas forcément en premier : l'ordre reste mélangé, sinon tu reconnaîtrais la question à sa place au lieu de la traiter. Une faute qu'on ne rejoue pas est une faute qu'on refera.</div>
      ${TL.errores.map(e => `<div class="review-item">
        <div class="qq">${escapeHtml(e.x.it[0]).replace('______', '____')}</div>
        <div class="ans"><span class="ko">« ${escapeHtml(e.mio)} »</span> → <span class="ok">${escapeHtml(e.x.k === 'trad' ? e.x.it[1][0] : e.x.it[1].join(' / '))}</span></div>
      </div>`).join('')}
    </div>` : '<div class="card center">Séance sans faute. 🔥</div>'}
    ${tallerLeft() > 0 ? `<button class="btn" onclick="tallerStart()">Encore ${tallerLeft()} items pour l'objectif</button>` : ''}
    <button class="btn ghost mt" onclick="setView('plan')">Retour au plan</button>
  `;
  window.scrollTo(0, 0);
}

/* ============================================================
   L'ÉCRAN DU PLAN
   ============================================================ */
function planActivar() {
  S.plan = { on: 1, start: Date.now(), visto: 1 };
  /* Le robinet des cartes neuves se referme pendant le plan : huit
     semaines de dette de révisions mangeraient le temps du taller, et
     c'est le taller qui vise la cible. */
  if (S.regime === 'intensivo') S.regime = 'rapido';
  save(); toast('Plan C1 activé — cible : ' + planEndDate());
  render();
}
function planDesactivar() {
  if (!confirm('Arrêter le plan C1 ? L\'objectif du jour revient à sa forme précédente.')) return;
  S.plan = { on: 0, visto: 1 }; save();
  toast('Plan arrêté — l\'objectif du jour revient à sa forme précédente');
  render();
}

function renderPlanHome() {
  if (!S.diag) {
    app.innerHTML = `<div class="card"><h2>🎯 Plan C1</h2>
      <div class="sub">Le plan se construit sur ton diagnostic : il répartit le travail quotidien selon ce que tu as réellement raté, compétence par compétence. Sans diagnostic, il n'y a rien à répartir.</div>
      <button class="btn mt" onclick="setView('diag')">Passer le diagnostic d'abord</button></div>`;
    return;
  }
  const D = S.diag, dia = planDay(), left = planLeft(), f = planFase(), { base, pond } = planPesos();
  const rep = planReparto(GOAL_TALLER - (f.trad || 2));
  const T = tallerState();
  const suma = PLAN_CHANTIERS.reduce((s, c) => s + pond[c.k], 0) || 1;

  const filas = PLAN_CHANTIERS.map(c => {
    const bank = tallerBank(c.k);
    const dominados = bank.filter((_, i) => (T.box[tallerId(c.k, i)] || 0) >= 2).length;
    const pctDom = Math.round(dominados / bank.length * 100);
    return `<div class="card" style="padding:12px">
      <div style="display:flex;align-items:baseline;gap:8px">
        <b style="font-size:15px">${c.t}</b>
        <span class="sub" style="margin-left:auto">${rep[c.k]} item${rep[c.k] > 1 ? 's' : ''}/jour</span>
      </div>
      <div class="sub" style="margin-top:4px">${c.d}</div>
      <div class="dg-bar" style="margin-top:8px"><i style="width:${Math.max(2, pctDom)}%;background:var(--accent)"></i></div>
      <div class="sub" style="font-size:12px;margin-top:4px">${dominados}/${bank.length} items tenus (deux réussites d'affilée)</div>
    </div>`;
  }).join('');

  const fases = PLAN_FASES.map(x => {
    const act = planWeek() >= x.s[0] && planWeek() <= x.s[1];
    return `<div class="sub" style="padding:6px 0;border-bottom:1px solid var(--line);${act ? 'color:var(--txt)' : ''}">
      <b style="color:${act ? 'var(--accent)' : 'var(--muted)'}">S${x.s[0]}${x.s[1] > x.s[0] ? '–' + x.s[1] : ''}</b> · ${x.t}${act ? ' <span style="color:var(--accent)">← tu es ici</span>' : ''}
      <div style="font-size:12px;color:var(--muted)">${x.why}</div></div>`;
  }).join('');

  app.innerHTML = `
    <div class="card" style="border-color:var(--accent)">
      <h2>🎯 Objectif C1 · ${planEndDate()}</h2>
      <div class="sub">Point de départ mesuré le ${D.date} : <b style="color:var(--txt)">${D.cefr}, indice ${D.idx}/100</b>, reconnaissance ${D.recon}% contre production ${D.rappel}%.
      ${planActive()
        ? `Jour <b style="color:var(--txt)">${dia}</b> sur ${PLAN_DIAS} · <b style="color:var(--txt)">${left} jours restants</b>.`
        : 'Le plan n\'est pas encore activé.'}</div>
      ${planActive()
        ? `<div class="pbar mt"><i style="width:${Math.min(100, dia / PLAN_DIAS * 100)}%"></i></div>`
        : `<button class="btn mt" onclick="planActivar()">Activer le plan 8 semaines</button>`}
    </div>

    ${planActive() ? `
    <button class="tile" style="border-color:${tallerDone() ? 'var(--line)' : 'var(--accent)'}" onclick="tallerStart()">
      <div class="ic e">🛠</div>
      <div class="body"><div class="t">EL TALLER · ${tallerHoy()}/${GOAL_TALLER} aujourd'hui</div>
        <div class="d">${tallerDone() ? 'Objectif du jour atteint. Tu peux continuer librement.' : `${tallerLeft()} items à taper, environ ${Math.ceil(tallerLeft() * 40 / 60)} min.`}</div></div>
      <div class="badge ${tallerDone() ? 'zero' : ''}">${tallerDone() ? '✓' : tallerLeft()}</div>
    </button>` : ''}

    <div class="card">
      <h2 style="font-size:16px">Ce que le plan a RETIRÉ</h2>
      <div class="sub">Un plan qui n'enlève rien n'est pas un plan, c'est une liste de vœux.
      <br><br><b style="color:var(--txt)">· La lecture sort du socle obligatoire.</b> 17/18 au diagnostic, 5/6 au niveau C1. Elle reste disponible, elle n'est plus due : continuer à l'imposer un jour sur deux, c'était entraîner ta meilleure compétence.
      <br><b style="color:var(--txt)">· La prononciation sort du socle.</b> Le diagnostic ne la mesure pas, l'objectif est écrit, et tu travailles souvent sans son. Elle reste cliquable.
      <br><br>À la place, une seule obligation nouvelle : les ${GOAL_TALLER} items du taller.</div>
    </div>

    <div class="card">
      <h2 style="font-size:16px">Les quatre phases</h2>
      <div class="sub mb">Tous les chantiers tournent tous les jours — mettre un sujet au placard trois semaines, c'est l'oublier — mais le centre de gravité se déplace.</div>
      ${fases}
    </div>

    <div class="card">
      <h2 style="font-size:16px">La répartition du jour</h2>
      <div class="sub mb">Calculée sur le NOMBRE d'items ratés au diagnostic, pas sur le pourcentage : un chantier à 60 % sur vingt items coûte plus de points qu'un chantier à 50 % sur quatre. Elle se refera toute seule après le prochain diagnostic.</div>
    </div>
    ${filas}

    <div class="card">
      <h2 style="font-size:16px">Le ${planEndDate()}</h2>
      <div class="sub">Repasse le diagnostic. Il est conçu pour ça : banque fixe, ordre fixe, mêmes formats. Les deux chiffres à regarder ne sont pas la bande CEFR mais
      <b style="color:var(--txt)">l'écart reconnaissance / production</b> (83 / 71 aujourd'hui) et <b style="color:var(--txt)">le thème</b> (5/12 aujourd'hui). Si ces deux-là bougent, le C1 est réel ; si seule la bande bouge, c'est du bruit.</div>
      ${planActive() ? `<button class="btn ghost mt" onclick="planDesactivar()">Arrêter le plan</button>` : ''}
    </div>
  `;
  window.scrollTo(0, 0);
}

/* Styles du retour immédiat */
(function planStyles() {
  const s = document.createElement('style');
  s.textContent = `
  .fb{border-radius:12px;padding:11px 14px;font-weight:800;font-size:16px;margin-bottom:12px;text-align:center}
  .fb.ok{background:rgba(60,180,110,.14);color:var(--good);border:1px solid var(--good)}
  .fb.ko{background:rgba(217,83,79,.13);color:var(--bad,#d9534f);border:1px solid var(--bad,#d9534f)}
  .fb.acc{background:rgba(224,163,62,.13);color:var(--warn,#e0a33e);border:1px solid var(--warn,#e0a33e)}
  `;
  document.head.appendChild(s);
})();

/* La bannière d'annonce ne se montre qu'une fois : passé ce clic, le plan
   est acquis et l'accueil n'a plus à le répéter tous les jours. */
function planVisto() { if (S.plan) { S.plan.visto = 1; save(); } setView('plan'); }
