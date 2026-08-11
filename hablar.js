/* ============================================================
   CUMBRE — HABLAR : entraîneur de production orale
   Flux type DELE : Préparation (plan + boîte à outils) → Parler
   (chrono + reconnaissance vocale si dispo) → Bilan (analyse du
   monologue + modèle). Utilise app, S, save, addXp, bumpDaily,
   markStudy, toast, speak, stopSpeak (définis dans app.js).
   Charger AVANT app.js.
   ============================================================ */
let H = null;
const SR_CLASS = window.SpeechRecognition || window.webkitSpeechRecognition || null;
function hbNorm(s){ return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
function hbDone(id){ return !!(S.hablar && S.hablar[id]); }
function hbMMSS(s){ s=Math.max(0,Math.round(s)); return Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); }
function hbLevelColor(l){ return l==='C1'?'var(--purple)':l==='B2'?'var(--blue)':'var(--good)'; }

/* -------- accueil -------- */
function renderHablarHome(){
  view='hablar';
  document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('on'));
  window.scrollTo(0,0);
  const done = HABLAR.filter(t=>hbDone(t.id)).length;
  const kit = HABLAR_KIT.map(g=>`<div style="margin-bottom:6px"><b style="color:var(--accent);font-size:12px">${g.fn}</b> <span class="sub" style="font-size:12.5px">${g.items.join(' · ')}</span></div>`).join('');
  app.innerHTML = `
    <button class="btn ghost" style="width:auto;padding:8px 14px;margin-bottom:12px" onclick="setView('home')">‹ Accueil</button>
    <div class="card" style="border-color:var(--accent)">
      <h2>🗣️ Hablar — parler d'un sujet</h2>
      <div class="sub mt">La compétence la plus dure à travailler seul. La méthode qui marche : un <b style="color:var(--txt)">monologue chronométré</b> chaque jour sur un thème, en t'appuyant sur un plan et des connecteurs, puis tu <b style="color:var(--txt)">t'écoutes</b> et tu recommences. Ici, l'app te guide et — si ton navigateur le permet — <b style="color:var(--txt)">transcrit</b> ce que tu dis pour te donner un retour.</div>
    </div>
    <div class="card">
      <h2 style="font-size:15px;margin-bottom:8px">🧰 Boîte à outils — les mots qui donnent de la fluidité</h2>
      ${kit}
    </div>
    <div class="sub center mb" style="font-size:13px">${done}/${HABLAR.length} sujets travaillés</div>
    ${HABLAR.map(t=>`
      <button class="tile" onclick="startHablar('${t.id}')">
        <div class="ic l">${hbDone(t.id)?'✅':'🗣️'}</div>
        <div class="body"><div class="t">${t.prompt.length>52?t.prompt.slice(0,52)+'…':t.prompt}</div><div class="d"><span style="color:${hbLevelColor(t.level)};font-weight:700">${t.level}</span> · ${t.type} · objetivo ${hbMMSS(t.sec)}</div></div>
      </button>`).join('')}
    ${!SR_CLASS ? `<div class="card mt"><div class="sub">ℹ️ La <b style="color:var(--txt)">transcription automatique</b> de ta voix n'est pas disponible sur ce navigateur (souvent le cas sur iPhone/Safari). Le chrono, le plan et le modèle fonctionnent quand même — parle à voix haute, c'est l'essentiel. Sur Chrome (ordi/Android), tu auras en plus l'analyse de ton monologue.</div></div>` : ''}
  `;
}

/* -------- démarrage / phases -------- */
function startHablar(id){
  const t = HABLAR.find(x=>x.id===id); if(!t) return;
  H = { t, phase:'prep', transcript:'', finalText:'', recording:false, rec:null, t0:0, elapsed:0, timer:null };
  renderHablar();
}
function hbBack(){ hbStopRec(); if(H&&H.timer){clearInterval(H.timer);} stopSpeak&&stopSpeak(); renderHablarHome(); }

function renderHablar(){
  if(H.phase==='prep') return renderHablarPrep();
  if(H.phase==='hablar') return renderHablarSpeak();
  if(H.phase==='fin') return renderHablarFin();
}

function kitCard(){
  return `<div class="card" style="padding:12px 14px">${HABLAR_KIT.map(g=>`<div style="margin-bottom:5px"><b style="color:var(--accent);font-size:11.5px">${g.fn} :</b> <span class="sub" style="font-size:12px">${g.items.join(' · ')}</span></div>`).join('')}</div>`;
}

function renderHablarPrep(){
  const t=H.t;
  window.scrollTo(0,0);
  app.innerHTML = `
    <button class="btn ghost" style="width:auto;padding:8px 14px;margin-bottom:12px" onclick="hbBack()">‹ Sujets</button>
    <div class="sub" style="font-weight:700"><span style="color:${hbLevelColor(t.level)}">${t.level}</span> · ${t.type} · objetivo ${hbMMSS(t.sec)}</div>
    <h2 class="mt" style="font-size:20px;line-height:1.35">${t.prompt}</h2>
    <div class="card mt">
      <h2 style="font-size:14px;margin-bottom:8px">🗺️ Plan (guion)</h2>
      ${t.guion.map((g,i)=>`<div class="sub" style="font-size:14px;color:var(--txt);padding:3px 0">${i+1}. ${g}</div>`).join('')}
    </div>
    <div class="card">
      <h2 style="font-size:14px;margin-bottom:8px">❓ Preguntas para desarrollar ideas</h2>
      ${t.preguntas.map(q=>`<div class="sub" style="font-size:13.5px;padding:2px 0">· ${q}</div>`).join('')}
    </div>
    <div class="card">
      <h2 style="font-size:14px;margin-bottom:8px">📚 Léxico útil</h2>
      ${t.lexico.map(l=>`<div class="vrow"><div class="vinfo"><div class="ven">${l[0]} <button class="rspk" style="background:none;border:1px solid var(--line);border-radius:8px;padding:1px 6px;font-size:12px;color:var(--muted)" onclick="event.stopPropagation();speak('${l[0].replace(/'/g,"\\'")}')">🔊</button></div><div class="vfr">${l[1]}</div></div></div>`).join('')}
    </div>
    <h2 style="font-size:14px;margin:16px 0 6px;padding-left:2px">🧰 Boîte à outils</h2>
    ${kitCard()}
    <button class="btn mt" onclick="hbGoSpeak()">▶ Empezar a hablar</button>
    <div class="sub center mt" style="font-size:12px">Prends 1–2 min pour préparer mentalement, puis lance-toi sans lire — improvise avec le plan sous les yeux.</div>
  `;
}

/* -------- phase parler -------- */
function hbGoSpeak(){ H.phase='hablar'; H.t0=Date.now(); H.elapsed=0; renderHablarSpeak();
  H.timer=setInterval(()=>{ H.elapsed=(Date.now()-H.t0)/1000; const el=document.getElementById('hbTime');
    if(el){ el.textContent=hbMMSS(H.elapsed); if(H.elapsed>=H.t.sec) el.style.color='var(--good)'; } },500);
}
function renderHablarSpeak(){
  const t=H.t;
  window.scrollTo(0,0);
  const recBlock = SR_CLASS ? `
    <button class="btn" id="hbRecBtn" onclick="hbToggleRec()">🎙️ Grabar mi monólogo</button>
    <div class="sub center mt" style="font-size:12px">Autorise le micro. Parle en continu ; je transcris pour l'analyse.</div>
    <div id="hbLive" class="script mt" style="min-height:60px;white-space:pre-wrap;font-size:14px"></div>`
   : `<div class="card mt"><div class="sub">🎤 Pas de transcription sur ce navigateur : parle simplement à voix haute en suivant le plan. Le chrono t'accompagne.</div></div>`;
  app.innerHTML = `
    <div class="exbar"><div class="sec">🗣️ HABLANDO</div>
      <div class="timer">⏱️ <span id="hbTime">0:00</span> <span class="sub" style="font-size:11px">/ ${hbMMSS(t.sec)}</span></div></div>
    <div class="sub mt" style="font-size:14px;color:var(--txt)">${t.prompt}</div>
    <div class="card mt" style="padding:12px 14px">
      <b style="font-size:12px;color:var(--accent)">Plan</b>
      ${t.guion.map((g,i)=>`<div class="sub" style="font-size:13px;color:var(--txt);padding:2px 0">${i+1}. ${g}</div>`).join('')}
    </div>
    ${kitCard()}
    ${recBlock}
    <button class="btn sec mt" onclick="hbFinish()">✔ He terminado</button>
    <button class="btn ghost" onclick="hbBack()">Salir</button>
  `;
  const el=document.getElementById('hbTime'); if(el) el.textContent=hbMMSS(H.elapsed);
}
function hbToggleRec(){ H.recording ? hbStopRec() : hbStartRec(); const b=document.getElementById('hbRecBtn');
  if(b){ b.textContent = H.recording ? '⏹ Detener grabación' : '🎙️ Grabar mi monólogo'; b.classList.toggle('sec',H.recording); } }
function hbStartRec(){ if(!SR_CLASS) return;
  try{ H.rec=new SR_CLASS(); }catch(e){ return; }
  H.rec.lang='es-ES'; H.rec.continuous=true; H.rec.interimResults=true; H.finalText='';
  H.rec.onresult=e=>{ let interim=''; for(let i=e.resultIndex;i<e.results.length;i++){ const r=e.results[i];
      if(r.isFinal) H.finalText+=r[0].transcript+' '; else interim+=r[0].transcript; }
    H.transcript=(H.finalText+interim).trim();
    const live=document.getElementById('hbLive');
    if(live){ const n=H.transcript?H.transcript.split(/\s+/).length:0; live.innerHTML=(H.transcript||'…')+`<div class="sub mt" style="font-size:11px">${n} palabras</div>`; } };
  H.rec.onerror=ev=>{ if(ev.error==='not-allowed'){ toast('Micro refusé — active-le pour la transcription.'); } };
  H.rec.onend=()=>{ if(H.recording){ try{H.rec.start();}catch(e){} } };
  H.recording=true; try{H.rec.start();}catch(e){} }
function hbStopRec(){ if(H){ H.recording=false; if(H.rec){ try{H.rec.stop();}catch(e){} } } }

/* -------- bilan -------- */
function hbFinish(){ hbStopRec(); if(H.timer){clearInterval(H.timer);H.timer=null;} H.phase='fin'; renderHablarFin(); }

function hbAnalyse(){
  const nt = hbNorm(H.transcript);
  const words = H.transcript ? H.transcript.split(/\s+/).filter(Boolean).length : 0;
  const dur = Math.max(1, H.elapsed);
  const wpm = Math.round(words/(dur/60));
  // connecteurs utilisés
  const usedConn=[];
  HABLAR_KIT.forEach(g=>g.items.forEach(it=>{
    const clean=hbNorm(it.replace(/…|\?|¿|\(|\)/g,'').trim());
    if(clean.length>=3 && nt.includes(clean)) usedConn.push(it.replace('…','').trim());
  }));
  // léxico utilisé
  const usedLex=[];
  H.t.lexico.forEach(l=>{ const base=hbNorm(l[0].split(/[ +(]/)[0]); if(base.length>=3 && nt.includes(base)) usedLex.push(l[0]); });
  return { words, dur, wpm, usedConn:[...new Set(usedConn)], usedLex };
}

function renderHablarFin(){
  const t=H.t; window.scrollTo(0,0);
  const hasT = !!(SR_CLASS && H.transcript);
  let statsCard='';
  if(hasT){
    const a=hbAnalyse();
    const objOk = H.elapsed>=t.sec*0.8;
    statsCard = `
      <div class="card">
        <h2 style="font-size:15px;margin-bottom:8px">📊 Tu monólogo</h2>
        <div class="scoreline">
          <div><div class="v">${a.words}</div><div class="k">palabras</div></div>
          <div><div class="v" style="color:${objOk?'var(--good)':'var(--accent)'}">${hbMMSS(a.dur)}</div><div class="k">duración</div></div>
          <div><div class="v">${a.wpm}</div><div class="k">palabras/min</div></div>
        </div>
        <div class="sub mt" style="font-size:13px">🧰 Connecteurs utilisés (${a.usedConn.length}) : ${a.usedConn.length?('<span style="color:var(--txt)">'+a.usedConn.slice(0,8).join(' · ')+'</span>'):'aucun repéré — vises-en au moins 3 la prochaine fois'}</div>
        <div class="sub mt" style="font-size:13px">📚 Léxico utilisé : ${a.usedLex.length?('<span style="color:var(--txt)">'+a.usedLex.join(' · ')+'</span>'):'aucun mot de la liste — réutilise-les !'}</div>
        <div class="script mt" style="font-size:14px;white-space:pre-wrap"><b class="sub" style="font-size:11px">TRANSCRIPTION</b><br>${H.transcript}</div>
      </div>`;
  }
  const checks = [
    "J'ai parlé au moins l'objectif de temps",
    "J'ai suivi mon plan (intro → idées → conclusion)",
    "J'ai utilisé au moins 3 connecteurs",
    "J'ai donné au moins un exemple concret",
    "J'ai parlé sans m'arrêter (fluidité)"
  ];
  app.innerHTML = `
    <button class="btn ghost" style="width:auto;padding:8px 14px;margin-bottom:12px" onclick="hbBack()">‹ Sujets</button>
    <h2 style="font-size:18px;line-height:1.35">${t.prompt}</h2>
    ${statsCard}
    <div class="card">
      <h2 style="font-size:15px;margin-bottom:8px">✅ Auto-évaluation</h2>
      ${checks.map((c,i)=>`<label class="goal" style="cursor:pointer"><input type="checkbox" style="width:18px;height:18px;accent-color:var(--good)"> <span class="gt" style="color:var(--txt)">${c}</span></label>`).join('')}
    </div>
    <div class="card" style="border-color:var(--good)">
      <h2 style="font-size:15px;margin-bottom:6px">🎧 Modèle — écoute et compare</h2>
      <div class="sub mb" style="font-size:12px">Repère 2-3 tournures que tu pourrais réutiliser. Ne cherche pas à le réciter : inspire-toi de sa structure.</div>
      <button class="btn sec" onclick="speak(HABLAR.find(x=>x.id==='${t.id}').modelo)">🔊 Écouter le modèle</button>
      <div class="script mt" style="font-size:14.5px;line-height:1.6">${t.modelo}</div>
    </div>
    <button class="btn mt" onclick="hbMarkDone('${t.id}')">${hbDone(t.id)?'✓ Refait — revalider':'Marquer comme fait (+20 XP)'}</button>
    <button class="btn ghost" onclick="startHablar('${t.id}')">↻ Recommencer ce sujet</button>
  `;
}

function hbMarkDone(id){
  if(!S.hablar) S.hablar={};
  const first=!S.hablar[id];
  S.hablar[id]=true;
  bumpDaily('study'); markStudy();
  if(first){ addXp(20); toast('🗣️ ¡Bien hablado! +20 XP · objectif « étudier » validé'); }
  else { save(); toast('Objectif « étudier » validé ✓'); }
  stopSpeak&&stopSpeak();
  renderHablarHome();
}
