/* ============================================================
   CUMBRE — Contenu AVANCÉ (B2-C1) : le palier vers le C1
   Pousse des leçons, des items d'examen durs et des traductions C1.
   Charger APRÈS data.js, exam-data.js, translations.js.
   ============================================================ */

window.LESSONS.push(
  {
    id: "perfindef", title: "Perfecto vs Indefinido", tag: "B2 · Le passé",
    note: "Pretérito perfecto (he/has + participe) : action passée reliée au présent ou dans une période NON terminée (hoy, esta semana, este año, ya, todavía, alguna vez). Indefinido : action close dans le passé (ayer, la semana pasada, en 2010). En Espagne on distingue beaucoup ; en Amérique on préfère l'indefinido.",
    q: [
      ["Hoy ______ tres cafés.", ["tomé", "he tomado", "tomaba", "tomo"], 1, "« hoy » (période actuelle) → perfecto : he tomado."],
      ["Ayer ______ al médico.", ["he ido", "fui", "iba", "voy"], 1, "« ayer » (clos) → indefinido : fui."],
      ["¿______ alguna vez a México?", ["Estuviste", "Has estado", "Estabas", "Estás"], 1, "« alguna vez » (expérience) → has estado."],
      ["Todavía no ______ la película.", ["vimos", "hemos visto", "veíamos", "vemos"], 1, "« todavía no » → perfecto : hemos visto."],
      ["La semana pasada ______ mucho.", ["ha llovido", "llovió", "llovía", "llueve"], 1, "« la semana pasada » → indefinido : llovió."],
      ["Este año ______ dos veces a España.", ["viajé", "he viajado", "viajaba", "viajo"], 1, "« este año » (non terminé) → he viajado."],
      ["En 1998 ______ el mundial.", ["han ganado", "ganaron", "ganaban", "ganan"], 1, "Année passée précise → indefinido : ganaron."],
      ["Ya ______ los deberes.", ["hice", "he hecho", "hacía", "hago"], 1, "« ya » (pertinence présente) → he hecho."]
    ]
  },
  {
    id: "estiloindirecto", title: "Estilo indirecto", tag: "B2 · Discours rapporté",
    note: "Au discours indirect au passé, les temps reculent : présent→imparfait, indefinido/perfecto→plus-que-parfait, futur→conditionnel, impératif/subj. présent→subj. imparfait. Les déictiques changent (hoy→aquel día, aquí→allí, mañana→al día siguiente).",
    q: [
      ["«Estoy cansado». → Dijo que ______ cansado.", ["está", "estaba", "estará", "esté"], 1, "présent → imparfait : estaba."],
      ["«Vendré mañana». → Dijo que ______ al día siguiente.", ["vendrá", "vendría", "viene", "venga"], 1, "futur → conditionnel : vendría."],
      ["«Llamé a Ana». → Dijo que ______ a Ana.", ["llamó", "había llamado", "llama", "llamaba"], 1, "indefinido → plus-que-parfait : había llamado."],
      ["«Ven aquí». → Me pidió que ______ allí.", ["voy", "vaya", "fuera", "iré"], 2, "impératif → subj. imparfait : fuera."],
      ["«¿Has terminado?». → Me preguntó si ______.", ["he terminado", "había terminado", "termino", "termine"], 1, "perfecto → plus-que-parfait : había terminado."],
      ["«Quiero que estudies». → Dijo que quería que ______.", ["estudias", "estudies", "estudiaras", "estudiabas"], 2, "subj. présent → subj. imparfait : estudiaras."],
      ["«No puedo ir». → Contestó que no ______ ir.", ["puede", "podía", "podría", "pueda"], 1, "présent → imparfait : podía."],
      ["«Te llamaré hoy». → Dijo que me llamaría ______.", ["hoy", "aquel día", "ayer", "ahora"], 1, "déictique « hoy » → « aquel día »."]
    ]
  },
  {
    id: "perifrasis", title: "Perífrasis verbales", tag: "B2 · Aspect",
    note: "Verbe + (préposition) + infinitif/gérondif à valeur aspectuelle : « acabar de + inf » (venir de), « ponerse a + inf » (se mettre à), « volver a + inf » (refaire), « dejar de + inf » (arrêter de), « llevar + gérondif » (ça fait... que), « seguir + gérondif » (continuer à), « estar a punto de + inf » (être sur le point de).",
    q: [
      ["______ llegar, no ha comido todavía.", ["Acaba de", "Vuelve a", "Deja de", "Lleva"], 0, "« acabar de + inf » = venir de : Acaba de llegar."],
      ["De repente ______ llover.", ["se puso a", "dejó de", "acabó de", "volvió a"], 0, "« ponerse a » = se mettre à : se puso a llover."],
      ["______ dos años estudiando español.", ["Llevo", "Acabo", "Vuelvo", "Dejo"], 0, "« llevar + gérondif » = ça fait 2 ans que : Llevo... estudiando."],
      ["Después de la operación, ______ fumar.", ["dejó de", "volvió a", "acabó de", "se puso a"], 0, "« dejar de » = arrêter de : dejó de fumar."],
      ["Inténtalo otra vez: ______ intentarlo.", ["vuelve a", "deja de", "acaba de", "lleva"], 0, "« volver a + inf » = refaire : vuelve a intentarlo."],
      ["El tren ______ salir, ¡corre!", ["está a punto de", "acaba de", "deja de", "lleva"], 0, "« estar a punto de » = être sur le point de."],
      ["A pesar del ruido, ______ trabajando.", ["sigue", "deja de", "acaba de", "vuelve a"], 0, "« seguir + gérondif » = continuer à : sigue trabajando."],
      ["______ una hora esperándote.", ["Llevo", "Acabo de", "Vuelvo a", "Dejo de"], 0, "« llevar + durée + gérondif » : Llevo una hora esperándote."]
    ]
  },
  {
    id: "pasivase", title: "Pasiva y « se »", tag: "B2-C1 · Voix",
    note: "Passif périphrastique : « ser + participe (+ por) » (formel, rare à l'oral). Passif pronominal (pasiva refleja) : « se + verbe à la 3e pers. », très courant : « se venden pisos » (le verbe s'accorde au sujet). « se » impersonnel : « se dice que... », « aquí se vive bien ».",
    q: [
      ["______ pisos en esta zona.", ["Se vende", "Se venden", "Venden se", "Se vendió"], 1, "Passif pronominal, sujet pluriel « pisos » → Se venden."],
      ["El puente ______ en 1920.", ["fue construido", "construyó", "se construye", "construía"], 0, "Passif périphrastique passé : fue construido."],
      ["______ que va a subir el precio.", ["Se dice", "Dice", "Se dicen", "Dicen"], 0, "« se » impersonnel : Se dice que..."],
      ["Aquí ______ muy bien.", ["se vive", "se viven", "vive", "se vivió"], 0, "« se » impersonnel : se vive bien."],
      ["Los resultados ______ mañana.", ["se publicará", "se publicarán", "publican", "se publica"], 1, "Sujet pluriel « resultados » → se publicarán."],
      ["El acuerdo ______ por ambas partes.", ["se firma", "fue firmado", "firmó", "firmaba"], 1, "Passif périphrastique + « por » : fue firmado."],
      ["No ______ fumar aquí.", ["se puede", "se pueden", "puede", "se pudo"], 0, "« no se puede » = interdiction impersonnelle."],
      ["En España ______ mucho aceite de oliva.", ["se consume", "se consumen", "consume", "se consumió"], 0, "Sujet singulier « aceite » → se consume."]
    ]
  },
  {
    id: "subjcontraste", title: "Subjuntivo vs Indicativo", tag: "C1 · Contraste",
    note: "Relatives : indicatif si l'antécédent existe/est connu (« el chico que habla ruso »), subjonctif s'il est indéfini/inexistant (« un chico que hable ruso »). Concessives : « aunque + indicatif » (fait réel) ≠ « + subjonctif » (hypothèse). Temporelles : « cuando + subjonctif » = futur. « No es que + subjonctif ».",
    q: [
      ["Busco un piso que ______ terraza.", ["tiene", "tenga", "tendrá", "tenía"], 1, "Antécédent indéfini/désiré → subj. : tenga."],
      ["Conozco a alguien que ______ chino.", ["habla", "hable", "hablará", "hablara"], 0, "Antécédent connu/existant → indicatif : habla."],
      ["Aunque ______ caro, lo voy a comprar.", ["es", "sea", "fuera", "será"], 0, "« aunque » + fait réel → indicatif : es."],
      ["Aunque ______ caro, lo compraría.", ["es", "sea", "fuera", "será"], 2, "Concession hypothétique → subj. imparfait : fuera."],
      ["Cuando ______ mayor, quiero ser médico.", ["soy", "sea", "seré", "era"], 1, "« cuando » + futur → subj. : sea."],
      ["Cuando ______ joven, jugaba al fútbol.", ["soy", "sea", "era", "fuera"], 2, "« cuando » + habitude passée → indicatif : era."],
      ["No hay nadie que ______ hacerlo.", ["puede", "pueda", "podrá", "podía"], 1, "Antécédent négatif → subj. : pueda."],
      ["No es que no ______ ganas, es que no tengo tiempo.", ["tengo", "tenga", "tendré", "tenía"], 1, "« no es que » → subjonctif : tenga."]
    ]
  }
);

/* --- Items d'examen très difficiles (C1, diff 3) --- */
window.EXAM_GRAMMAR.push(
  ["Me dijo que ______ al día siguiente.", ["viene", "vendría", "vendrá", "venga"], 1, "Discours indirect : futur → conditionnel : vendría.", 3],
  ["Llevo tres horas ______ este informe.", ["escribir", "escribiendo", "escrito", "escribo"], 1, "« llevar + gérondif » : escribiendo.", 3],
  ["En esta tienda ______ productos ecológicos.", ["se vende", "se venden", "venden", "se vendía"], 1, "Passif pronominal pluriel : se venden.", 3],
  ["Aunque ______ toda la noche, no aprobó.", ["estudia", "estudió", "estudiara", "estudie"], 1, "Concession + fait réel passé → indicatif : estudió.", 3],
  ["Busco a alguien que ______ ayudarme con esto.", ["puede", "pueda", "podrá", "podía"], 1, "Antécédent indéfini → subj. : pueda.", 3],
  ["Acababa de salir cuando ______ el teléfono.", ["suena", "sonó", "sonaba", "ha sonado"], 1, "Action ponctuelle → indefinido : sonó.", 3],
  ["Si me lo ______ antes, te habría ayudado.", ["dices", "dijiste", "hubieras dicho", "decías"], 2, "Irréel du passé : hubieras dicho.", 3],
  ["No es que no me ______, es que no puedo.", ["interesa", "interese", "interesará", "interesaba"], 1, "« no es que » + subj. : interese.", 3],
  ["El informe ______ ayer por el director.", ["se firma", "fue firmado", "firmó", "firmaba"], 1, "Passif périphrastique + « por » : fue firmado.", 3],
  ["Por más que lo ______, no lo entiendo.", ["intento", "intente", "intentara", "intentaré"], 1, "« por más que » + subj. : intente.", 3],
  ["Ojalá ______ venido a la fiesta.", ["has", "hayas", "hubieras", "habías"], 2, "« Ojalá » + irréel du passé : hubieras venido.", 3],
  ["En cuanto ______ la noticia, se puso a llorar.", ["supo", "sabía", "sepa", "ha sabido"], 0, "« en cuanto » + passé ponctuel → indicatif : supo.", 3]
);

/* --- Traductions de haut niveau (Nuances C1) --- */
window.TRANSLATIONS.push(
  { fr:"Il vient de partir.", en:"Acaba de irse.", alt:["Se acaba de ir."], cat:"Nuances C1", point:"perífrasis « acabar de »", note:"« acabar de + inf » = venir de : Acaba de irse.", level:"B2" },
  { fr:"Ça fait deux ans que j'apprends l'espagnol.", en:"Llevo dos años aprendiendo español.", alt:["Hace dos años que aprendo español."], cat:"Nuances C1", point:"llevar + gérondif", note:"« llevar + durée + gérondif » = ça fait... que. Variante : « Hace dos años que... ».", level:"B2" },
  { fr:"Il m'a dit qu'il viendrait le lendemain.", en:"Me dijo que vendría al día siguiente.", alt:[], cat:"Nuances C1", point:"estilo indirecto", note:"Futur → conditionnel (vendría) ; « mañana » → « al día siguiente ».", level:"B2" },
  { fr:"On dit qu'il va démissionner.", en:"Se dice que va a dimitir.", alt:["Dicen que va a dimitir."], cat:"Nuances C1", point:"« se » impersonnel", note:"« Se dice que... ». « dimitir » = démissionner (d'un poste).", level:"B2" },
  { fr:"Bien qu'il soit riche, il vit simplement.", en:"Aunque es rico, vive de forma sencilla.", alt:["Aunque sea rico, vive de forma sencilla."], cat:"Nuances C1", point:"aunque + indicatif/subjonctif", note:"Fait réel → indicatif « es » ; nuance de concession → subjonctif « sea ».", level:"C1" },
  { fr:"Je cherche quelqu'un qui parle chinois.", en:"Busco a alguien que hable chino.", alt:[], cat:"Nuances C1", point:"relative + subjonctif", note:"Antécédent indéfini → subjonctif : hable. Noter le « a » personnel : busco A alguien.", level:"C1" },
  { fr:"Dès que j'aurai fini, je t'appellerai.", en:"En cuanto termine, te llamaré.", alt:["Cuando termine, te llamaré."], cat:"Nuances C1", point:"temporel + subjonctif (futur)", note:"« en cuanto / cuando » à valeur de futur → subjonctif : termine.", level:"B2" },
  { fr:"Si tu me l'avais dit, je t'aurais aidé.", en:"Si me lo hubieras dicho, te habría ayudado.", alt:["De habérmelo dicho, te habría ayudado."], cat:"Nuances C1", point:"irréel du passé", note:"« Si hubieras + participe, habría + participe ». Tournure soutenue : « De habérmelo dicho... ».", level:"C1" },
  { fr:"Il ne s'agit pas d'argent, mais de principe.", en:"No se trata de dinero, sino de principios.", alt:[], cat:"Nuances C1", point:"« no... sino »", note:"« se trata de » = il s'agit de ; « no X, sino Y » = non pas X mais Y.", level:"C1" },
  { fr:"Quoi qu'il arrive, je te soutiendrai.", en:"Pase lo que pase, te apoyaré.", alt:["Ocurra lo que ocurra, te apoyaré."], cat:"Nuances C1", point:"subjonctif redoublé (concession)", note:"« pase lo que pase » = quoi qu'il arrive (subjonctif redoublé, très idiomatique).", level:"C1" },
  { fr:"J'aurais aimé le savoir plus tôt.", en:"Me habría gustado saberlo antes.", alt:["Ojalá lo hubiera sabido antes."], cat:"Nuances C1", point:"regret (conditionnel composé)", note:"« me habría gustado + inf » ; ou « Ojalá + hubiera + participe » pour le regret.", level:"C1" },
  { fr:"Ça vaut la peine d'essayer.", en:"Vale la pena intentarlo.", alt:["Merece la pena intentarlo."], cat:"Nuances C1", point:"« valer/merecer la pena »", note:"« valer / merecer la pena + inf » = valoir la peine de.", level:"B2" }
);
