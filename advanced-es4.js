/* ============================================================
   CUMBRE — Palier C1→C2 (lot 4) : 4 nouvelles leçons de grammaire
   pour préparer le niveau suivant. Format identique aux leçons :
   q = [phrase, [options], indexBonne, explicationFR]
   Ajoutées EN FIN de parcours (débloquées après les leçons C1-C2).
   ============================================================ */
window.LESSONS.push(
  {
    id: "pronominales", title: "Verbos pronominales (el « se »)", tag: "C1 · Le « se »",
    note: "Beaucoup de verbes CHANGENT DE SENS avec le pronom « se » : ir (aller) → irse (partir, s'en aller) · dormir (dormir) → dormirse (s'endormir) · quedar (convenir d'un RDV) → quedarse (rester sur place) · acordar (convenir) → acordarse de (se souvenir) · llevar (porter) → llevarse (emporter ; llevarse bien/mal = s'entendre) · caer (tomber, au fig.) → caerse (chuter) · ocurrir (arriver) → ocurrírsele algo a alguien (avoir une idée) · negar (nier) → negarse a (refuser de).",
    q: [
      ["Es tarde, me ______ ya. ¡Hasta mañana!", ["voy", "salgo", "vengo", "quedo"], 0, "« irse » = partir/s'en aller → me voy. (ir = se rendre quelque part ; irse = quitter un lieu)"],
      ["Estaba tan cansado que me ______ en el sofá.", ["dormí", "dormía", "duermo", "dormiré"], 0, "« dormirse » = s'endormir (fait ponctuel) → me dormí. (dormir = dormir, la durée)"],
      ["¿______ de mí? Nos conocimos en Madrid.", ["Recuerdas", "Te acuerdas", "Acuerdas", "Te recuerdas"], 1, "« acordarse de » = se souvenir → Te acuerdas de mí. (recordar est transitif : « ¿Me recuerdas? », mais jamais « te recuerdas »)"],
      ["No me ______ con él; discutimos a todas horas.", ["llevo bien", "traigo", "llevo", "voy"], 0, "« llevarse bien/mal con alguien » = s'entendre → no me llevo bien con él."],
      ["Se le ______ una idea genial para el proyecto.", ["ocurrió", "ocurre", "pensó", "tuvo idea"], 0, "« ocurrírsele algo a alguien » = avoir une idée (qui vient à l'esprit) → se le ocurrió una idea."],
      ["El niño se ______ al suelo y empezó a llorar.", ["cayó", "caía", "cae", "cayó bien"], 0, "« caerse » = tomber (chute) → se cayó al suelo. (caer bien = être sympathique, autre sens)"],
      ["Se ______ a firmar el contrato sin leerlo.", ["negó", "denegó", "rechazó", "negaba"], 0, "« negarse a + infinitif » = refuser de → se negó a firmar. (negar = nier)"],
      ["Hemos ______ en vernos el sábado por la tarde.", ["quedado", "permanecido", "quedado en casa", "restado"], 0, "« quedar (en) » = convenir d'un rendez-vous → hemos quedado en vernos. (quedarse = rester sur place)"]
    ]
  },
  {
    id: "probabilidad", title: "Probabilidad y conjetura", tag: "C1 · Probabilité",
    note: "Exprimer une SUPPOSITION sans « creo que » : le FUTUR de conjecture au présent (« Serán las tres » = il doit être trois heures) ; le CONDITIONNEL de conjecture au passé (« Estaría enfermo » = il devait être malade) ; « deber de + infinitif » (probabilité, ≠ deber = obligation) ; « tener que + infinitif » (déduction quasi certaine). Adverbes : a lo mejor + INDICATIF ; puede que + SUBJONCTIF ; quizá(s) / tal vez + subj (doute) ou ind (assertion).",
    q: [
      ["No contesta el teléfono; ______ durmiendo.", ["está", "estará", "estaría", "esté"], 1, "Supposition au présent → futur de conjecture : estará durmiendo (« il doit dormir »)."],
      ["______ las dos de la mañana cuando por fin llegó.", ["Eran", "Serían", "Serán", "Fueran"], 1, "Supposition dans le PASSÉ → conditionnel de conjecture : serían las dos."],
      ["No está en la oficina; ______ estar enfermo.", ["debe de", "debe", "tiene", "hay que"], 0, "Probabilité → « deber de + inf » : debe de estar enfermo (≠ « debe estar » = obligation)."],
      ["Las luces están apagadas; no ______ nadie en casa.", ["habrá", "hay", "haya", "hubiera"], 0, "Conjecture avec « haber » → futur : no habrá nadie (« il ne doit y avoir personne »)."],
      ["Ha aprobado sin estudiar nada; ______ que ser muy listo.", ["debe", "tiene", "tiene que", "hay"], 2, "Déduction quasi certaine → « tener que + inf » : tiene que ser muy listo."],
      ["Coge el paraguas: ______ llueva esta tarde.", ["a lo mejor", "puede que", "quizás no", "igual que"], 1, "« puede que » exige le SUBJONCTIF → puede que llueva."],
      ["______ viene mañana, pero no estoy seguro.", ["Puede que", "Quizás que", "A lo mejor", "Ojalá"], 2, "« a lo mejor » se construit avec l'INDICATIF → a lo mejor viene."],
      ["Quizás ______ razón; no lo había pensado así.", ["tienes", "tengas", "tendrás", "tuvieras"], 1, "« quizá(s) » + subjonctif marque le doute → quizás tengas razón. (l'indicatif serait plus assertif)"]
    ]
  },
  {
    id: "consecomp", title: "Consecutivas y comparativas", tag: "C1 · Conséquence",
    note: "CONSÉQUENCE : « tan + adjectif/adverbe + que » (es tan alto que…) · « tanto/-a/-os/-as + nom + que » (accord avec le nom : tanta hambre que…) · « verbe + tanto que » (invariable : trabaja tanto que…) · « de tal modo/manera que » · « de ahí que + SUBJONCTIF » · « así que » (+ indicatif). COMPARAISON progressive : « cuanto más…, más/menos… » (Cuanto más estudio, más aprendo).",
    q: [
      ["Es ______ inteligente que aprende todo enseguida.", ["tan", "tanto", "tanta", "muy"], 0, "« tan + adjectif + que » = si… que : tan inteligente que."],
      ["Había ______ gente que no pudimos entrar.", ["tanta", "tan", "tanto", "muy"], 0, "« tanta + nom féminin + que » (accord avec le nom) : tanta gente que."],
      ["Comió ______ que se puso malo.", ["tanto", "tan", "tanta", "muy"], 0, "Après un VERBE : « verbe + tanto que » (invariable) : comió tanto que."],
      ["Estaba lloviendo, ______ nos quedamos en casa.", ["así que", "de ahí que", "tan que", "tanto que"], 0, "Conséquence réelle (indicatif) → « así que » : así que nos quedamos."],
      ["No avisó a nadie, de ahí que todos se ______ enfadado.", ["han", "habían", "hayan", "habrían"], 2, "« de ahí que » exige le SUBJONCTIF : de ahí que se hayan enfadado."],
      ["______ más lo pienso, menos lo entiendo.", ["Cuanto", "Cuanta", "Tanto", "Más"], 0, "Corrélation progressive : « Cuanto más…, menos… » = plus… moins…"],
      ["Cuanto ______ dinero tiene, más gasta.", ["más", "muy", "tan", "mucho"], 0, "« Cuanto más + nom…, más… » : cuanto más dinero, más gasta."],
      ["Habló de tal ______ que nos convenció a todos.", ["modo", "manera de", "tanto", "forma de"], 0, "« de tal modo/manera que » = de telle façon que : de tal modo que nos convenció."]
    ]
  },
  {
    id: "acentuacion", title: "Acentuación y tilde diacrítica", tag: "C1-C2 · Ortografía",
    note: "Règle générale : AGUDAS (accent sur la dernière syllabe) → tilde si le mot finit par voyelle, -n ou -s (café, canción) ; LLANAS (avant-dernière) → tilde si le mot finit par AUTRE chose (árbol, lápiz) ; ESDRÚJULAS (antépénultième) → TOUJOURS la tilde (rápido, teléfono). La TILDE DIACRÍTIQUE distingue des homophones : tú/tu, él/el, sí/si, sé/se, más/mas, té/te, dé/de, aún(=todavía)/aun(=incluso) ; et qué, quién, cómo, dónde, cuándo dans l'interrogation/l'exclamation. Piège : « ti » ne prend JAMAIS de tilde.",
    q: [
      ["No sé si vendrá, pero ______ que lo intentará.", ["se", "sé"], 1, "« sé » (verbe saber, « je sais ») porte la tilde ≠ « se » (pronom)."],
      ["Este regalo es para ______.", ["ti", "tí"], 0, "« ti » ne porte JAMAIS de tilde (piège classique, contrairement à « mí » et « sí »)."],
      ["¿______ quieres tomar, café o té?", ["Que", "Qué"], 1, "Dans une question, « qué » (interrogatif) porte la tilde."],
      ["______ es mi hermano, no mi primo.", ["El", "Él"], 1, "« Él » (pronom : il/lui) porte la tilde ≠ « el » (article)."],
      ["Quiero más pan, ______ no más sopa.", ["mas", "más"], 0, "« mas » (= pero, sans tilde, littéraire) = mais. (« más » avec tilde = plus)"],
      ["Todavía no ha llegado; ______ lo estamos esperando.", ["aun", "aún"], 1, "« aún » (= todavía, encore) porte la tilde ≠ « aun » (= incluso, même)."],
      ["La palabra « ______ » es esdrújula y siempre lleva tilde.", ["rapido", "rápido", "rapidó", "rrápido"], 1, "Les esdrújulas (accent sur l'antépénultième) portent TOUJOURS la tilde : rápido."],
      ["« Canción » lleva tilde porque es aguda y acaba en…", ["-n", "-r", "-l", "-d"], 0, "Les agudas prennent la tilde si elles finissent par voyelle, -n ou -s : canció**n**."]
    ]
  }
);

/* --- traductions liées (cat « Matices C1 ») : alimentent Traduire + le Mix --- */
window.TRANSLATIONS.push(
  { fr: "Il est tard, je m'en vais.", en: "Es tarde, me voy.", alt: ["Se hace tarde, me voy."], cat: "Matices C1", point: "irse = partir" },
  { fr: "Je me suis endormi devant la télé.", en: "Me dormí delante de la tele.", alt: ["Me quedé dormido delante de la tele."], cat: "Matices C1", point: "dormirse = s'endormir" },
  { fr: "Tu te souviens de ce jour-là ?", en: "¿Te acuerdas de aquel día?", alt: ["¿Recuerdas aquel día?"], cat: "Matices C1", point: "acordarse de" },
  { fr: "Je m'entends très bien avec mes collègues.", en: "Me llevo muy bien con mis compañeros.", alt: [], cat: "Matices C1", point: "llevarse bien con" },
  { fr: "Il doit être malade, il n'est pas venu.", en: "Debe de estar enfermo, no ha venido.", alt: ["Estará enfermo, no ha venido."], cat: "Matices C1", point: "deber de = probabilité" },
  { fr: "Il devait être minuit quand il est rentré.", en: "Serían las doce cuando volvió.", alt: ["Debían de ser las doce cuando volvió."], cat: "Matices C1", point: "conditionnel de conjecture" },
  { fr: "Il se peut qu'il pleuve demain.", en: "Puede que llueva mañana.", alt: ["A lo mejor llueve mañana."], cat: "Matices C1", point: "puede que + subjonctif" },
  { fr: "Il y avait tellement de monde que nous ne sommes pas entrés.", en: "Había tanta gente que no entramos.", alt: ["Había tanta gente que no pudimos entrar."], cat: "Matices C1", point: "tanta… que" },
  { fr: "Plus j'y pense, moins je comprends.", en: "Cuanto más lo pienso, menos lo entiendo.", alt: [], cat: "Matices C1", point: "cuanto más… menos…" },
  { fr: "Il a tellement travaillé qu'il est tombé malade.", en: "Trabajó tanto que se puso enfermo.", alt: ["Trabajó tanto que cayó enfermo."], cat: "Matices C1", point: "verbe + tanto que" }
);
