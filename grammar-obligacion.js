/* ============================================================
   CUMBRE — Leçon de grammaire : l'obligation & la nécessité
   hay que / tener que / deber / deber de / necesitar
   Insérée dans LESSONS après « por/para » (niveau B1). Charger APRÈS data.js.
   ============================================================ */
(function () {
  const lesson = {
    id: "obligacion",
    title: "Obligation : hay que / tener que / deber",
    tag: "B1 · Usage",
    note: "Exprimer l'obligation et la nécessité — quel outil pour quel cas :<br>" +
      "• <b>hay que + infinitif</b> = obligation GÉNÉRALE, impersonnelle (« il faut »), sans sujet précis. <i>Hay que estudiar.</i><br>" +
      "• <b>tener que + infinitif</b> = obligation PERSONNELLE et forte (« je dois / il faut que je »). <i>Tengo que trabajar.</i><br>" +
      "• <b>deber + infinitif</b> = obligation MORALE ou conseil, ton plus soutenu/atténué (« tu devrais »). <i>Debes ayudar.</i><br>" +
      "• <b>deber de + infinitif</b> = PROBABILITÉ, supposition (« ça doit être ») — à ne pas confondre ! <i>Deben de ser las cinco</i> (il doit être 5 h).<br>" +
      "• <b>necesitar + infinitif/nom</b> = avoir BESOIN de. <i>Necesito dormir.</i><br>" +
      "Réflexe : général → <b>hay que</b> · personnel/impératif → <b>tener que</b> · devoir moral → <b>deber</b> · supposition → <b>deber de</b>.",
    q: [
      ["En España, ______ conducir por la derecha.",
        ["hay que", "tengo que", "debo de", "necesito"], 0,
        "Règle générale, impersonnelle (valable pour tous) → hay que."],
      ["No puedo salir esta noche: ______ terminar el informe.",
        ["tengo que", "hay que", "debo de", "hace falta"], 0,
        "Obligation personnelle et concrète (moi, maintenant) → tener que : tengo que."],
      ["Ya está oscuro... ______ ser más de las ocho.",
        ["tienen que", "deben de", "hay que", "deben"], 1,
        "Supposition / probabilité (« ça doit être ») → deber de : deben de ser."],
      ["______ respetar a los mayores; es cuestión de educación.",
        ["Debes", "Debes de", "Hay", "Necesitas de"], 0,
        "Devoir moral / principe → deber (sans « de ») : Debes."],
      ["Estoy agotado, de verdad ______ descansar.",
        ["necesito", "hay que", "debo de", "tengo"], 0,
        "Exprimer un besoin → necesitar : necesito. (« tengo » seul serait incorrect : il faudrait « tengo que ».)"],
      ["¿Qué ______ hacer para renovar el DNI?",
        ["hay que", "tengo", "debo de", "necesito de"], 0,
        "Démarche générale (n'importe qui) → hay que : ¿qué hay que hacer?"],
      ["Mañana yo ______ levantarme a las seis para el tren.",
        ["tengo que", "hay que", "debo de", "hace falta"], 0,
        "Obligation personnelle datée → tener que : tengo que."],
      ["El coche no está: Marta ______ de haber salido ya.",
        ["tiene", "debe", "hay", "necesita"], 1,
        "Déduction logique (« elle a dû sortir ») → deber de : debe de haber salido."],
      ["Para aprobar, no basta con asistir: ______ trabajar en casa también.",
        ["hay que", "debo de", "tienes de", "necesitas que"], 0,
        "Vérité générale sur la réussite → hay que."],
      ["Le duele el pecho; ______ ir al médico cuanto antes (conseil ferme).",
        ["debería", "debe de", "hay de", "necesita de"], 0,
        "Conseil / obligation morale atténuée → deber (au conditionnel « debería » = il devrait)."]
    ]
  };
  const L = window.LESSONS;
  if (!L) return;
  let idx = L.findIndex(x => x.id === "porpara");
  if (idx < 0) idx = L.findIndex(x => x.id === "pronombres");
  L.splice(idx >= 0 ? idx + 1 : L.length, 0, lesson);
})();
