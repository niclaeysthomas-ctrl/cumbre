/* ============================================================
   CUMBRE — CHARLA CON CLAUDE : vraie conversation + bilan importé
   ALLER  : l'app prépare un message (ton profil + consignes + sujet)
            et ouvre Claude.
   RETOUR : tu écris « fin », Claude rend un bilan JSON ; collé ici,
            les erreurs deviennent des questions dans « Mes erreurs »,
            les mots des cartes, et les points à travailler nourrissent
            la conversation suivante. Claude ne se souvient de rien
            d'une discussion à l'autre : c'est l'app qui retient.
   Charger AVANT app.js : fonctions seulement, aucun accès à S au
   chargement (S, VOCAB, app… n'existent qu'une fois app.js exécuté).
   ============================================================ */

const CH_MODES = [
  { k: 'escena', ic: '🎬', name: 'Escenas B1/B2', d: "Jeu de rôle guidé : Claude joue un personnage (serveur, pharmacienne, agent immobilier…), tu as une mission et des mots à placer ; Claude emploie un autre vocabulaire que tu dois comprendre. Le bilan dit ce que tu as placé ou non." },
  { k: 'charla', ic: '💬', name: 'Charla', d: 'Une vraie conversation : Claude pose des questions, rebondit et donne aussi son avis.' },
  { k: 'debate', ic: '🔥', name: 'Debate', d: "Claude défend la position opposée à la tienne et ne lâche rien : il faut argumenter, nuancer, concéder, réfuter." },
  { k: 'rol', ic: '🎭', name: 'Situación', d: 'Jeu de rôle de la vie réelle. Claude joue un personnage pas très coopératif et crée des complications.' },
  { k: 'dele', ic: '🎓', name: 'DELE C1 oral', d: "Les 3 tareas de l'oral (format 2024), Claude examinateur : résumé + avis sur un article (raccourci à ~400 mots), entretien, puis négociation entre 4 options." },
  { k: 'debil', ic: '🎯', name: 'Mes points faibles', d: "Claude choisit un sujet qui t'oblige à employer tes structures fragiles, sans te dire lesquelles il vise." }
];
const CH_TEMAS = ['El teletrabajo', 'La inteligencia artificial', 'Las redes sociales', 'El precio de la vivienda',
  'El turismo masivo', 'El cambio climático', 'La educación', 'Vivir en el extranjero',
  'El libro que estoy leyendo', 'Cine y series', 'Comer bien', 'Mi semana'];
const CH_ROLES = [
  'Llamo a un propietario para alquilar un piso en Madrid',
  'Devuelvo un producto defectuoso y la tienda no quiere',
  'Entrevista de trabajo en una empresa española',
  'En el médico: explico mis síntomas',
  'Hablo con un vecino muy ruidoso',
  'Negocio un plazo con mi jefe',
  'He perdido mi vuelo y hablo con la aerolínea',
  'Organizo una cena con amigos que no se ponen de acuerdo'
];
const CH_SORPRESA = '🎲 Sorpresa';
const CH_FORMAT = '{"cumbre":1,"tema":"…","resumen":"2-3 phrases en français : ce qui va, ce qui coince","nivel":"B2+",'
  + '"errores":[{"dije":"ma phrase fautive","correcto":"la version juste","regla":"la règle, 1 phrase en français","cat":"Subjuntivo",'
  + '"q":"nouvelle phrase courte avec ______ à la place du passage corrigé","opts":["4 choix dont la bonne réponse"],"correct":0}],'
  + '"vocab":[{"es":"…","fr":"…","ej":"exemple"}],"trabajar":["2-3 points pour la prochaine fois"]}';

function chEnsure() {
  if (!S.charla || typeof S.charla !== 'object') S.charla = { modo: 'escena', tema: CH_TEMAS[0], libre: '' };
  if (!S.charla.escNivel) S.charla.escNivel = 'B1';
  if (!Array.isArray(S.charlas)) S.charlas = [];
  return S.charla;
}

/* ---------- Le profil envoyé à Claude ---------- */
function chNivel() {
  if (S.estScore == null) return "non mesuré dans l'app (vise B2 → C1)";
  let s = cefrLabel(S.estScore) + (S.levelDeclared && !(S.history || []).length ? ' (déclaré, pas encore testé)' : " (estimé par les tests de l'app)");
  const dh = S.dele && Array.isArray(S.dele.hist) && S.dele.hist.length ? S.dele.hist[S.dele.hist.length - 1] : null;
  if (dh) s += ' · dernier DELE C1 écrit (compréhension + usage) : ' + dh.pct + ' %';
  return s;
}
/* Catégories de grammaire où dorment le plus d'erreurs non résolues. */
function chWeakCats(n) {
  const vague = /^(grammaire|lecture|gramática|léxico|écoute.*|examen.*)$/i;
  const cnt = {};
  for (const k in (S.mistakes || {})) {
    const m = S.mistakes[k];
    if (!m || (m.kind !== 'gram' && m.kind !== 'charla')) continue;
    let c = String(m.cat || '').replace(/<[^>]*>/g, '').trim();
    const p = c.lastIndexOf(' · ');
    if (p >= 0) c = c.slice(p + 3).trim();
    if (!c || vague.test(c)) continue;
    cnt[c] = (cnt[c] || 0) + 1;
  }
  return Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, n).map(x => x[0]);
}
/* Les mots qui résistent : les plus fragiles en mémoire, ceux déjà oubliés d'abord. */
function chFragileWords(n) {
  if (typeof buildReviseQueue !== 'function') return [];
  const pool = buildReviseQueue().slice(0, 40);
  pool.sort((a, b) => ((S.cards[b] && S.cards[b].lapses) || 0) - ((S.cards[a] && S.cards[a].lapses) || 0));
  const out = [], seen = new Set();
  for (const i of pool) {
    if (out.length >= n) break;
    const v = VOCAB[i]; if (!v) continue;
    const w = String(v[0]).replace(/\s*\([^)]*\)/g, '').trim();
    if (!w || w.length > 40 || seen.has(w.toLowerCase())) continue;
    seen.add(w.toLowerCase()); out.push(w);
  }
  return out;
}
function chLastTrabajar() {
  const h = S.charlas || [];
  const last = h[h.length - 1];
  return last && Array.isArray(last.trabajar) ? last.trabajar.slice(0, 3) : [];
}
/* ---------- Escenas ---------- */
function chEscList() { return (typeof ESCENAS !== 'undefined' && Array.isArray(ESCENAS)) ? ESCENAS : []; }
function chEscena() {
  const c = chEnsure(), L = chEscList();
  return L.find(e => e.id === c.escena) || L.find(e => e.nivel === c.escNivel) || L[0] || null;
}
function chEscDone(id) { return (S.charlas || []).filter(h => h.escena === id); }
function chSetEsc(id) { const c = chEnsure(); c.escena = id; save(); renderCharlaHome(); }
function chSetEscNivel(n) {
  const c = chEnsure(); c.escNivel = n;
  const cur = chEscena(); if (!cur || cur.nivel !== n) { const f = chEscList().find(e => e.nivel === n); if (f) c.escena = f.id; }
  save(); renderCharlaHome();
}
/* Au hasard, en privilégiant les scènes jamais jouées du niveau choisi. */
function chEscRandom() {
  const c = chEnsure(), L = chEscList().filter(e => e.nivel === c.escNivel && e.id !== c.escena);
  const neuves = L.filter(e => !chEscDone(e.id).length);
  const pool = neuves.length ? neuves : L;
  if (pool.length) chSetEsc(pool[Math.floor(Math.random() * pool.length)].id);
}
function chFormat() {
  if (chEnsure().modo !== 'escena') return CH_FORMAT;
  return CH_FORMAT.replace('"nivel":"B2+",', '"nivel":"B2+","mision":"cumplida | parcial | no cumplida","usados":["mots de ma liste que j\'ai bien placés"],"no_usados":["mots de ma liste non placés ou mal employés"],');
}

function chTemaActual() {
  const c = chEnsure();
  if (c.modo === 'escena') { const e = chEscena(); return e ? e.ic + ' ' + e.titulo + ' (' + e.nivel + ')' : 'Escena'; }
  const libre = String(c.libre || '').trim();
  if (libre) return libre;
  if (c.modo === 'rol') return CH_ROLES.includes(c.tema) || c.tema === CH_SORPRESA ? c.tema : CH_ROLES[0];
  return CH_TEMAS.includes(c.tema) || c.tema === CH_SORPRESA ? c.tema : CH_TEMAS[0];
}

function chPrompt() {
  const c = chEnsure();
  const temaRaw = chTemaActual();
  const sorpresa = temaRaw === CH_SORPRESA;
  const tema = sorpresa ? 'un sujet de ton choix, adapté à mon niveau' : temaRaw;
  const cats = chWeakCats(3), mots = chFragileWords(8), prev = chLastTrabajar();

  const profil = ['- Niveau : ' + chNivel()];
  if (cats.length) profil.push('- Points faibles repérés par l\'app : ' + cats.join(', '));
  if (prev.length) profil.push('- À travailler depuis notre dernière conversation : ' + prev.join(' ; '));
  if (mots.length) profil.push('- Mots qui me résistent (glisse-les naturellement, vois si je les réutilise) : ' + mots.join(', '));

  const e = c.modo === 'escena' ? chEscena() : null;
  const ex = {
    escena: e ? `SCÈNE DE JEU DE RÔLE — niveau ${e.nivel} : « ${e.titulo} »
- Ton personnage : ${e.rol}
- Le cadre : ${e.escena}
- Ma mission (je la connais, ne me la répète pas) : ${e.mision}

Vocabulaire que JE dois placer (ne le dis pas à ma place ; crée des situations où j'en ai besoin) :
${e.usar.map(w => '  • ' + w).join('\n')}

Vocabulaire que TU dois employer naturellement au fil de la scène (à moi de le comprendre ; si je demande « ¿qué significa…? », explique en espagnol simple, sans sortir du rôle) :
${e.oir.map(w => '  • ' + w).join('\n')}

Complications à introduire au bon moment, une à la fois :
${e.giros.map(w => '  • ' + w).join('\n')}

Grammaire visée : ${e.gram}

DÉROULÉ
- Commence directement dans le rôle, par la première réplique de ton personnage (aucune présentation hors jeu).
- Niveau ${e.nivel} : ${e.nivel === 'B1' ? 'phrases claires, vocabulaire courant, débit naturel — mais pas de simplification artificielle' : 'espagnol naturel et idiomatique, registre adapté au personnage, quelques tournures plus soutenues'}.
- Si j'écris « pista », sors du rôle en UNE ligne en français : un indice sur ce que je pourrais dire, en me poussant vers un mot de ma liste pas encore utilisé. Puis reprends le rôle.
- Ne conclus pas la scène toi-même tant que ma mission n'est ni accomplie ni clairement ratée ; quand elle l'est, ton personnage clôt la scène et tu me rappelles d'écrire « fin ».
- Dans le bilan : « mision » = cumplida / parcial / no cumplida ; « usados » et « no_usados » = les mots de MA liste ; mets dans « vocab » les mots de ma liste que je n'ai pas placés, plus ceux de ta liste que je n'ai pas compris.` : '',
    charla: `Conversation naturelle sur : ${tema}. Pose des questions ouvertes, rebondis sur ce que je dis et donne aussi ton avis, pour que ce soit un vrai échange et pas une interview.`,
    debate: `Débat sur : ${tema}. Demande-moi d'abord ma position, puis défends la position opposée avec de vrais arguments. Ne cède pas facilement : oblige-moi à argumenter, nuancer, concéder et réfuter avec des structures de niveau C1.`,
    rol: sorpresa
      ? 'Jeu de rôle dans une situation de la vie réelle en Espagne, de ton choix. Pose la scène en une phrase (qui tu es, où on est), puis joue ton personnage de façon réaliste : pas trop coopératif, crée une ou deux complications que je dois résoudre.'
      : `Jeu de rôle : « ${tema} ». Pose la scène en une phrase (qui tu es, où on est), puis joue ton personnage de façon réaliste : pas trop coopératif, crée une ou deux complications que je dois résoudre.`,
    dele: `Simulation de l'épreuve orale du DELE C1 (format 2024), toi dans le rôle de l'examinateur, thème : ${tema}. Tarea 1 : donne-moi un article de presse d'environ 400 mots ; je le résume puis je donne mon avis. Tarea 2 : interroge-moi sur ce thème, une question à la fois (4-5 questions), en relançant mes réponses. Tarea 3 : propose une situation avec 4 options et négocie avec moi pour en choisir une ; défends une autre option que la mienne. Annonce chaque tarea. Dans « resumen », dis si je serais apto à l'oral selon toi, et pourquoi.`,
    debil: `Conversation pensée pour me faire employer mes structures fragiles : ${cats.length ? cats.join(', ') : 'subjonctif, concordance des temps, ser/estar, por/para'}. Choisis un sujet du quotidien qui m'y oblige (hypothèses → si + imparfait du subjonctif, souhaits → ojalá…), sans me dire ce que tu vises. Si j'évite une structure, relance pour m'y ramener.`
  }[c.modo] || '';

  return `Sois mon partenaire de conversation en espagnol. Je suis francophone et je prépare le DELE C1. Ce message vient de mon app d'entraînement, Cumbre.

MON PROFIL
${profil.join('\n')}

RÈGLES
- Uniquement en espagnol d'Espagne, registre naturel. Messages courts (3 à 5 phrases) qui finissent par une question ou une relance : c'est moi qui dois parler le plus.
- ${c.modo === 'escena' && e ? 'Adapte ton espagnol au niveau de la scène (' + e.nivel + ').' : 'Reste juste au-dessus de mon niveau.'}
- Ne me corrige pas pendant l'échange. Si une phrase est incompréhensible, reformule-la naturellement dans ta réponse et continue. Garde tout le reste pour le bilan.
- J'écris en dictée vocale : ignore ponctuation, majuscules, accents et mots visiblement mal transcrits. Si une même déformation revient, signale-la dans le bilan comme piste de prononciation.
- Si j'écris en français ou que je bloque, donne-moi le mot espagnol et continue.

EXERCICE
${ex}

BILAN
Quand j'écris « fin », arrête-toi et réponds UNIQUEMENT avec un bloc de code json, au format :
${chFormat()}
Jusqu'à 12 erreurs, les plus utiles, une par problème distinct ; pour chacune, une phrase d'exercice nouvelle (pas ma phrase recopiée). 5 à 10 mots utiles que je n'ai pas su dire ou que tu as introduits.

Commence maintenant, directement en espagnol.`;
}
function chAskBilan() {
  return `Fin. Donne-moi le bilan de cette conversation, UNIQUEMENT dans un bloc de code json, au format :
${chFormat()}
Jusqu'à 12 erreurs, les plus utiles, une par problème distinct ; pour chacune, une phrase d'exercice nouvelle (pas ma phrase recopiée). 5 à 10 mots utiles. Ignore ponctuation, majuscules et accents (j'écris en dictée vocale).`;
}

/* ---------- Écran ---------- */
function renderCharlaHome() {
  view = 'charla';
  document.querySelectorAll('.nav button').forEach(b => b.classList.remove('on'));
  window.scrollTo(0, 0);
  const c = chEnsure();
  const esc = s => escapeHtml(String(s == null ? '' : s)).replace(/"/g, '&quot;');
  const js = s => esc(String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"));
  const modo = CH_MODES.find(m => m.k === c.modo) || CH_MODES[0];
  const temas = c.modo === 'rol' ? CH_ROLES : CH_TEMAS;
  const temaSel = String(c.libre || '').trim() ? null : chTemaActual();
  const esc0 = c.modo === 'escena' ? chEscena() : null;
  const escUI = !esc0 ? '' : (() => {
    const lvl = ['B1', 'B2'].map(n => `<button class="segchip ${c.escNivel === n ? 'on' : ''}" onclick="chSetEscNivel('${n}')">${n} <span class="cnt">${chEscList().filter(e => e.nivel === n).length}</span></button>`).join('');
    const chips = chEscList().filter(e => e.nivel === c.escNivel).map(e => {
      const d = chEscDone(e.id).length;
      return `<button class="segchip ${e.id === esc0.id ? 'on' : ''}" onclick="chSetEsc('${e.id}')">${e.ic} ${esc(e.titulo)}${d ? ' <span class="cnt">✓' + (d > 1 ? d : '') + '</span>' : ''}</button>`;
    }).join('');
    const tags = arr => arr.map(w => `<span class="segchip" style="padding:4px 9px;font-size:12px;font-weight:600">${esc(w)}</span>`).join(' ');
    const last = chEscDone(esc0.id).slice(-1)[0];
    return `<div class="segwrap">${lvl}<button class="segchip" onclick="chEscRandom()">🎲 Au hasard</button></div>
      <div class="segwrap mt">${chips}</div>
      <div class="card mt" style="border-color:var(--accent)">
        <h2 style="font-size:16px">${esc0.ic} ${esc(esc0.titulo)} · ${esc0.nivel}</h2>
        <div class="sub mt"><b style="color:var(--txt)">Claude joue :</b> ${esc(esc0.rol)}</div>
        <div class="sub mt"><b style="color:var(--txt)">La scène :</b> ${esc(esc0.escena)}</div>
        <div class="sub mt"><b style="color:var(--accent)">🎯 Ta mission :</b> ${esc(esc0.mision)}</div>
        <div class="sub mt"><b style="color:var(--txt)">🗣️ À placer :</b></div>
        <div class="segwrap" style="gap:6px;margin-top:6px">${tags(esc0.usar)}</div>
        <details class="aid mt"><summary>👂 Ce que Claude va employer (à comprendre)</summary><div class="segwrap" style="gap:6px;margin-top:6px">${tags(esc0.oir)}</div></details>
        <div class="sub mt" style="font-size:12.5px">📐 ${esc(esc0.gram)} · Bloqué ? Écris <b style="color:var(--accent)">pista</b>.</div>
        ${last ? `<div class="sub mt" style="font-size:12.5px">Dernière fois : mission <b style="color:var(--txt)">${esc(last.mision || '?')}</b>${last.noUsados && last.noUsados.length ? ' · pas placés : ' + esc(last.noUsados.join(', ')) : ''}</div>` : ''}
      </div>`;
  })();
  const temaChips = c.modo === 'escena' ? escUI : c.modo === 'debil'
    ? `<div class="sub">${chWeakCats(3).length ? 'Ciblés : <b style="color:var(--txt)">' + esc(chWeakCats(3).join(' · ')) + '</b>' : "L'app n'a pas encore assez d'erreurs de grammaire pour cibler : Claude visera les classiques (subjonctif, concordance, ser/estar, por/para)."}</div>`
    : `<div class="segwrap" id="ch-temas">${temas.concat([CH_SORPRESA]).map(t =>
        `<button class="segchip ${t === temaSel ? 'on' : ''}" data-t="${esc(t)}" onclick="chSetTema('${js(t)}')">${esc(t)}</button>`).join('')}</div>
       <input id="ch-libre" class="transinput mt" style="min-height:0" autocomplete="off" value="${esc(c.libre || '')}"
         placeholder="…ou ton propre sujet (en espagnol ou en français)" oninput="chLibre(this.value)">`;
  const hist = (S.charlas || []).slice(-5).reverse().map(h => `
    <div class="glrow"><b>${esc(h.date)} · ${esc(h.tema || '—')}</b><span>${h.nivel ? esc(h.nivel) + ' · ' : ''}${h.nErr} erreur(s) · ${h.nVoc} mot(s)</span></div>`).join('');
  const msg = chPrompt();

  app.innerHTML = `
    <button class="btn ghost" style="width:auto;padding:8px 14px;margin-bottom:12px" onclick="setView('home')">‹ Accueil</button>
    <div class="card" style="border-color:var(--purple)">
      <h2>💬 Charla con Claude</h2>
      <div class="sub mt">Parler vraiment, pas seulement reconnaître. <b style="color:var(--txt)">1.</b> Choisis un exercice et un sujet.
      <b style="color:var(--txt)">2.</b> Ouvre Claude : le message part avec ton profil (niveau, points faibles, mots qui résistent).
      <b style="color:var(--txt)">3.</b> Discute, en dictée vocale si tu veux. <b style="color:var(--txt)">4.</b> Écris <b style="color:var(--accent)">fin</b>, copie le bloc que Claude te donne et colle-le en bas : tes erreurs deviennent des exercices, tes nouveaux mots des cartes.</div>
    </div>

    <div class="sub mb" style="padding-left:4px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:12px">1 · Exercice</div>
    <div class="segwrap">${CH_MODES.map(m => `<button class="segchip ${m.k === c.modo ? 'on' : ''}" onclick="chSetModo('${m.k}')">${m.ic} ${m.name}</button>`).join('')}</div>
    <div class="sub mt mb" style="font-size:13px">${esc(modo.d)}</div>

    ${c.modo === 'debil' ? '' : `<div class="sub mb" style="padding-left:4px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:12px">2 · ${c.modo === 'escena' ? 'Niveau et scène' : c.modo === 'rol' ? 'Situation' : 'Sujet'}</div>`}
    ${temaChips}

    <details class="aid mt"><summary>👁 Voir le message envoyé à Claude (<span id="ch-len">${msg.length}</span> caractères)</summary>
      <div id="ch-prev" class="sub" style="white-space:pre-wrap;font-size:12.5px;color:var(--txt);line-height:1.5">${esc(msg)}</div>
    </details>
    <button class="btn" onclick="chOpen(false)">💬 Ouvrir Claude avec ce message</button>
    <button class="btn sec mt" onclick="chOpen(true)">📋 Copier le message seulement</button>
    <div class="sub mt" style="font-size:12.5px">🎙️ Sur iPhone, la dictée transcrit dans la langue du clavier actif : passe sur le clavier <b style="color:var(--txt)">Español</b> avant de parler.</div>

    <div class="card mt" style="border-color:var(--good)">
      <h2 style="font-size:16px">↩️ Le bilan de Claude</h2>
      <div class="sub mt">Écris <b style="color:var(--accent)">fin</b> dans Claude, touche « Copier » sur le bloc de code, puis reviens ici.</div>
      <button class="btn mt" onclick="chPasteImport()">📥 Coller et importer</button>
      <textarea id="ch-bilan" class="redac" style="min-height:110px" placeholder="…ou colle le bilan ici à la main" onpaste="setTimeout(()=>chImport(true),60)"></textarea>
      <button class="btn sec mt" onclick="chImport(false)">⬇︎ Importer ce qui est collé</button>
      <div id="ch-err"></div>
      <button class="btn ghost mt" onclick="copyText(chAskBilan(),'📋 Copié — colle-le dans Claude')">Claude n'a pas donné le bon format ? Copier la relance</button>
    </div>

    ${hist ? `<div class="card"><h2 style="font-size:15px;margin-bottom:10px">🗂️ Dernières conversations</h2>${hist}</div>` : ''}
  `;
}
function chSetModo(k) { const c = chEnsure(); if (!CH_MODES.some(m => m.k === k)) return; c.modo = k; save(); renderCharlaHome(); }
function chSetTema(t) { const c = chEnsure(); c.tema = t; c.libre = ''; save(); renderCharlaHome(); }
let chLibreT = null;
function chLibre(v) {
  const c = chEnsure(); c.libre = String(v || '').slice(0, 200);
  const sel = c.libre.trim() ? null : chTemaActual();
  document.querySelectorAll('#ch-temas .segchip').forEach(b => b.classList.toggle('on', b.dataset.t === sel));
  const msg = chPrompt();
  const p = document.getElementById('ch-prev'); if (p) p.textContent = msg;
  const l = document.getElementById('ch-len'); if (l) l.textContent = msg.length;
  clearTimeout(chLibreT); chLibreT = setTimeout(save, 400);
}

/* Copie TOUJOURS (si le lien ne pré-remplit pas — app Claude native, lien
   trop long —, il suffit de coller), puis ouvre claude.ai/new?q=…
   Ce paramètre q n'est pas documenté par Anthropic : il peut changer. */
function chOpen(copyOnly) {
  const c = chEnsure();
  const prompt = chPrompt();
  c.pending = { ts: Date.now(), modo: c.modo, tema: chTemaActual(), escena: c.modo === 'escena' && chEscena() ? chEscena().id : null };
  save();
  copyText(prompt, copyOnly ? '📋 Message copié — colle-le dans une nouvelle conversation Claude'
    : '📋 Message copié aussi — s\'il n\'apparaît pas dans Claude, colle-le');
  if (copyOnly) return;
  const url = 'https://claude.ai/new?q=' + encodeURIComponent(prompt);
  const w = window.open(url, '_blank');
  if (!w) location.href = url;
}

/* ---------- Retour : lecture du bilan ---------- */
function chParse(raw) {
  const t = String(raw || '');
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a < 0 || b <= a) return null;
  const body = t.slice(a, b + 1);
  const tries = [
    s => s,
    s => s.replace(/\r?\n/g, ' ').replace(/,\s*([}\]])/g, '$1'),
    s => s.replace(/\r?\n/g, ' ').replace(/,\s*([}\]])/g, '$1').replace(/[“”„]/g, '"')
  ];
  for (const f of tries) {
    try {
      const o = JSON.parse(f(body));
      if (o && typeof o === 'object' && (Array.isArray(o.errores) || Array.isArray(o.vocab))) return o;
    } catch (e) { }
  }
  return null;
}
function chStr(v, max) { return String(v == null ? '' : v).replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, max || 300); }
/* Une erreur du bilan → une question de « Mes erreurs » (QCM à trou).
   Si l'exercice fourni est inutilisable, on en fabrique un : ta phrase vs la bonne. */
function chMistakeFrom(e) {
  const dije = chStr(e.dije), correcto = chStr(e.correcto), regla = chStr(e.regla, 400);
  const cat = chStr(e.cat, 40) || 'Conversación';
  let q = chStr(e.q, 300).replace(/_{3,}/g, '______');
  let opts = Array.isArray(e.opts) ? e.opts.map(o => chStr(o, 120)).filter(Boolean) : [];
  let ok = Number.isInteger(e.correct) ? e.correct : parseInt(e.correct, 10);
  let good = opts[ok];
  opts = Array.from(new Set(opts));
  if (q.includes('______') && good && opts.length >= 2) {
    const wrong = opts.filter(o => o !== good);
    shuffle(wrong);
    opts = [good].concat(wrong.slice(0, 3));
  } else if (correcto && dije && correcto !== dije) {
    q = 'Version correcte de « ' + dije + ' » : ______';
    good = correcto; opts = [correcto, dije];
  } else return null;
  shuffle(opts);
  const expl = (regla ? regla + ' ' : '') + (dije && correcto ? '— Tu as dit « ' + dije + ' » → « ' + correcto + ' ».' : '');
  return {
    kind: 'charla', q: escapeHtml(q), opts: opts.map(escapeHtml), correct: opts.indexOf(good),
    expl: escapeHtml(expl.trim()), cat: escapeHtml('Conversation · ' + cat),
    _dije: dije, _correcto: correcto, _regla: regla
  };
}
async function chPasteImport() {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      const t = await navigator.clipboard.readText();
      if (t && t.trim()) { const ta = document.getElementById('ch-bilan'); if (ta) ta.value = t; return chImport(false); }
    }
  } catch (e) { }
  const ta = document.getElementById('ch-bilan');
  if (ta) ta.focus();
  toast('Colle le bilan dans la zone en dessous');
}
function chImport(silent) {
  const ta = document.getElementById('ch-bilan'); if (!ta) return;
  const errBox = document.getElementById('ch-err');
  const r = chParse(ta.value);
  if (!r) {
    if (silent) return;
    if (errBox) errBox.innerHTML = `<div class="expl no mt">Je ne trouve pas de bilan lisible. Vérifie que tu as copié <b>tout</b> le bloc de code (de « { » à « } »). Si Claude a répondu autrement, touche « Copier la relance » ci-dessous et colle-la-lui.</div>`;
    return;
  }
  chEnsure();
  const h = qkey(JSON.stringify(r));
  if (S.charlas.some(x => x.h === h)) { toast('Ce bilan est déjà importé ✓'); return; }

  const errs = [];
  (Array.isArray(r.errores) ? r.errores : []).slice(0, 15).forEach(e => {
    if (!e || typeof e !== 'object') return;
    const m = chMistakeFrom(e); if (!m) return;
    recordMistake(m); errs.push(m);
  });
  let nVoc = 0, nDup = 0;
  (Array.isArray(r.vocab) ? r.vocab : []).slice(0, 15).forEach(v => {
    if (!v || typeof v !== 'object') return;
    const es = mpClean(v.es), fr = mpClean(v.fr);
    if (!es || !fr) return;
    if (wordInDeck(es)) { nDup++; return; }
    addWordToAnki(es, fr, mpClean(v.ej || ''), 'Conversación'); nVoc++;
  });
  const pend = S.charla.pending || {};
  const entry = {
    ts: Date.now(), date: todayStr(), h, modo: pend.modo || '',
    tema: chStr(r.tema, 80) || chStr(pend.tema, 80), nivel: chStr(r.nivel, 12), resumen: chStr(r.resumen, 600),
    trabajar: (Array.isArray(r.trabajar) ? r.trabajar : []).map(x => chStr(x, 160)).filter(Boolean).slice(0, 4),
    nErr: errs.length, nVoc
  };
  if (pend.escena) {
    entry.escena = pend.escena;
    entry.mision = chStr(r.mision, 30);
    entry.usados = (Array.isArray(r.usados) ? r.usados : []).map(x => chStr(x, 60)).filter(Boolean).slice(0, 12);
    entry.noUsados = (Array.isArray(r.no_usados) ? r.no_usados : []).map(x => chStr(x, 60)).filter(Boolean).slice(0, 12);
  }
  S.charlas.push(entry);
  if (S.charlas.length > 30) S.charlas = S.charlas.slice(-30);
  S.charla.pending = null;
  addXp(25); markStudy(); touchDay(); save();
  if (typeof checkAchievements === 'function') checkAchievements();
  chShowResult(entry, errs, nDup);
  toast('🗨️ Bilan importé · +25 XP');
}
function chShowResult(entry, errs, nDup) {
  window.scrollTo(0, 0);
  const esc = s => escapeHtml(String(s == null ? '' : s));
  const errList = errs.map(m => `
    <div class="review-item">
      ${m._dije ? `<div class="ans"><span class="ko">${esc(m._dije)}</span></div>` : ''}
      ${m._correcto ? `<div style="color:var(--good);font-weight:700;margin-top:3px">${esc(m._correcto)}</div>` : ''}
      ${m._regla ? `<div class="sub" style="font-size:13px;margin-top:4px">${esc(m._regla)}</div>` : ''}
    </div>`).join('');
  app.innerHTML = `
    <div class="card big">
      <div class="em">🗨️</div>
      <div class="lab">Bilan importé${entry.nivel ? ' · niveau observé ' + esc(entry.nivel) : ''}</div>
      ${entry.resumen ? `<div class="sub mt" style="text-align:left">${esc(entry.resumen)}</div>` : ''}
    </div>
    <div class="card">
      ${entry.escena ? `<div class="goal ${/^cumplida/i.test(entry.mision) ? 'ok' : ''}"><span class="gk">🎬</span><span class="gt">Mission : <b>${esc(entry.mision || '?')}</b></span></div>
      ${entry.usados && entry.usados.length ? `<div class="sub mt" style="font-size:13px">✅ Placés : ${esc(entry.usados.join(', '))}</div>` : ''}
      ${entry.noUsados && entry.noUsados.length ? `<div class="sub mt" style="font-size:13px">⬜ Pas placés : ${esc(entry.noUsados.join(', '))}</div>` : ''}` : ''}
      <div class="goal ok"><span class="gk">🎯</span><span class="gt">${errs.length} erreur(s) ajoutée(s) à « Mes erreurs »</span></div>
      <div class="goal ok"><span class="gk">🃏</span><span class="gt">${entry.nVoc} mot(s) ajouté(s) à tes cartes${nDup ? ` <span style="color:var(--muted);font-size:12px">(${nDup} déjà présent·s)</span>` : ''}</span></div>
      ${entry.trabajar.length ? `<div class="sub mt"><b style="color:var(--txt)">La prochaine fois :</b> ${entry.trabajar.map(esc).join(' · ')}<br><span style="font-size:12px">Ces points seront glissés dans ton prochain message à Claude.</span></div>` : ''}
    </div>
    ${errList ? `<div class="sub mb" style="padding-left:4px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:12px">Tes erreurs</div>${errList}` : ''}
    ${errs.length ? `<button class="btn mt" onclick="startMistakes()">🎯 Rejouer mes erreurs maintenant</button>` : ''}
    <button class="btn sec mt" onclick="renderCharlaHome()">💬 Nouvelle conversation</button>
    <button class="btn ghost mt" onclick="setView('home')">Accueil</button>
  `;
}
