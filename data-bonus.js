/* ============================================================
   CUMBRE — « A FONDO » : données bonus (entraînement approfondi)
   - STEMV        : verbes à changement de radical (présent), par type
   - CONCORD      : concordancia de tiempos (QCM) — le « fond »
   - LESSON_EXTRA : exemples supplémentaires par leçon (alimentent le Mix + le repaso)
   Toutes les formes ont été vérifiées à la main.
   ============================================================ */

/* Présent de l'indicatif. LA RÈGLE DE LA « BOTTE » : le changement de radical
   touche les 4 formes accentuées sur le radical (yo · tú · él · ellos) mais
   JAMAIS nosotros/vosotros (accentuées sur la terminaison). */
window.STEM_TYPES = {
  ie:  { lab: 'e → ie', kind: 'diphtongue' },
  ue:  { lab: 'o → ue', kind: 'diphtongue' },
  uue: { lab: 'u → ue', kind: 'diphtongue' },
  i:   { lab: 'e → i',  kind: 'affaiblissement (verbes en -ir)' }
};
window.STEMV = [
  // e → ie
  { inf: 'pensar',     fr: 'penser',           type: 'ie', pres: ['pienso', 'piensas', 'piensa', 'pensamos', 'pensáis', 'piensan'] },
  { inf: 'empezar',    fr: 'commencer',        type: 'ie', pres: ['empiezo', 'empiezas', 'empieza', 'empezamos', 'empezáis', 'empiezan'] },
  { inf: 'cerrar',     fr: 'fermer',           type: 'ie', pres: ['cierro', 'cierras', 'cierra', 'cerramos', 'cerráis', 'cierran'] },
  { inf: 'entender',   fr: 'comprendre',       type: 'ie', pres: ['entiendo', 'entiendes', 'entiende', 'entendemos', 'entendéis', 'entienden'] },
  { inf: 'perder',     fr: 'perdre',           type: 'ie', pres: ['pierdo', 'pierdes', 'pierde', 'perdemos', 'perdéis', 'pierden'] },
  { inf: 'querer',     fr: 'vouloir / aimer',  type: 'ie', pres: ['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'] },
  { inf: 'preferir',   fr: 'préférer',         type: 'ie', pres: ['prefiero', 'prefieres', 'prefiere', 'preferimos', 'preferís', 'prefieren'] },
  { inf: 'sentir',     fr: 'ressentir',        type: 'ie', pres: ['siento', 'sientes', 'siente', 'sentimos', 'sentís', 'sienten'] },
  { inf: 'comenzar',   fr: 'commencer',        type: 'ie', pres: ['comienzo', 'comienzas', 'comienza', 'comenzamos', 'comenzáis', 'comienzan'] },
  { inf: 'recomendar', fr: 'recommander',      type: 'ie', pres: ['recomiendo', 'recomiendas', 'recomienda', 'recomendamos', 'recomendáis', 'recomiendan'] },
  // o → ue
  { inf: 'poder',      fr: 'pouvoir',          type: 'ue', pres: ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'] },
  { inf: 'volver',     fr: 'revenir',          type: 'ue', pres: ['vuelvo', 'vuelves', 'vuelve', 'volvemos', 'volvéis', 'vuelven'] },
  { inf: 'dormir',     fr: 'dormir',           type: 'ue', pres: ['duermo', 'duermes', 'duerme', 'dormimos', 'dormís', 'duermen'] },
  { inf: 'contar',     fr: 'raconter / compter', type: 'ue', pres: ['cuento', 'cuentas', 'cuenta', 'contamos', 'contáis', 'cuentan'] },
  { inf: 'encontrar',  fr: 'trouver',          type: 'ue', pres: ['encuentro', 'encuentras', 'encuentra', 'encontramos', 'encontráis', 'encuentran'] },
  { inf: 'recordar',   fr: 'se rappeler',      type: 'ue', pres: ['recuerdo', 'recuerdas', 'recuerda', 'recordamos', 'recordáis', 'recuerdan'] },
  { inf: 'mostrar',    fr: 'montrer',          type: 'ue', pres: ['muestro', 'muestras', 'muestra', 'mostramos', 'mostráis', 'muestran'] },
  { inf: 'soñar',      fr: 'rêver',            type: 'ue', pres: ['sueño', 'sueñas', 'sueña', 'soñamos', 'soñáis', 'sueñan'] },
  { inf: 'morir',      fr: 'mourir',           type: 'ue', pres: ['muero', 'mueres', 'muere', 'morimos', 'morís', 'mueren'] },
  // u → ue (le seul verbe espagnol de ce type)
  { inf: 'jugar',      fr: 'jouer',            type: 'uue', pres: ['juego', 'juegas', 'juega', 'jugamos', 'jugáis', 'juegan'] },
  // e → i (uniquement des verbes en -ir)
  { inf: 'pedir',      fr: 'demander',         type: 'i', pres: ['pido', 'pides', 'pide', 'pedimos', 'pedís', 'piden'] },
  { inf: 'servir',     fr: 'servir',           type: 'i', pres: ['sirvo', 'sirves', 'sirve', 'servimos', 'servís', 'sirven'] },
  { inf: 'repetir',    fr: 'répéter',          type: 'i', pres: ['repito', 'repites', 'repite', 'repetimos', 'repetís', 'repiten'] },
  { inf: 'seguir',     fr: 'suivre',           type: 'i', pres: ['sigo', 'sigues', 'sigue', 'seguimos', 'seguís', 'siguen'] },
  { inf: 'conseguir',  fr: 'obtenir',          type: 'i', pres: ['consigo', 'consigues', 'consigue', 'conseguimos', 'conseguís', 'consiguen'] },
  { inf: 'vestir',     fr: 'habiller',         type: 'i', pres: ['visto', 'vistes', 'viste', 'vestimos', 'vestís', 'visten'] }
];

/* ---------- CONCORDANCIA DE TIEMPOS (le « fond ») ----------
   Format identique aux leçons : [phrase, [options], indexBonne, explicationFR] */
window.CONCORD = [
  ["Me pidió que le ______ la verdad.", ["digo", "diga", "dijera", "diré"], 2,
    "Verbe principal au PASSÉ (pidió) → subjonctif IMPARFAIT : dijera. (concordance passé → -ra/-se)"],
  ["Es necesario que ______ ahora mismo.", ["sales", "salgas", "salieras", "saldrás"], 1,
    "Principale au PRÉSENT (es necesario que) → subjonctif PRÉSENT : salgas."],
  ["Quería que todos ______ contentos.", ["estén", "estuvieran", "están", "estarán"], 1,
    "Principale au passé (quería) → subjonctif imparfait : estuvieran."],
  ["Me dijo que ______ cansado. (au style direct : « Estoy cansado »)", ["está", "estaba", "estuviera", "esté"], 1,
    "Style indirect au passé : présent « estoy » → imparfait « estaba »."],
  ["Prometió que ______ al día siguiente. (« Vendré mañana »)", ["viene", "vendrá", "vendría", "viniera"], 2,
    "Style indirect : futur « vendré » → conditionnel « vendría » (le futur du passé)."],
  ["Nos comentó que ya ______ la novela. (« He terminado la novela »)", ["ha terminado", "había terminado", "terminó", "termine"], 1,
    "Style indirect : passé composé « he terminado » → plus-que-parfait « había terminado »."],
  ["Si ______ más tiempo, aprendería ruso.", ["tengo", "tuviera", "tendría", "tuve"], 1,
    "Hypothèse irréelle du présent : Si + subj. imparfait → conditionnel."],
  ["Si hubiéramos salido antes, no ______ el tren.", ["perdíamos", "perderíamos", "habríamos perdido", "perdemos"], 2,
    "Irréel du PASSÉ : Si + pluscuamperfecto de subj. → conditionnel COMPOSÉ (habríamos perdido)."],
  ["Te llamo para que ______ los detalles.", ["sabes", "sepas", "supieras", "sabrás"], 1,
    "« para que » + principale au présent → subj. présent : sepas."],
  ["Le rogué que no ______ nada a nadie.", ["dice", "diga", "dijera", "dirá"], 2,
    "Principale au passé (rogué) → subj. imparfait : dijera."],
  ["Cuando ______ mayor, viajaré por el mundo.", ["soy", "sea", "fuera", "seré"], 1,
    "« cuando » + fait futur → subj. présent : sea (jamais le futur de l'indicatif après cuando)."],
  ["Actuaba como si no ______ nada.", ["sabe", "supiera", "sabía", "sepa"], 1,
    "« como si » exige TOUJOURS le subjonctif imparfait : supiera."],
  ["Me alegré de que ______ venir.", ["puedas", "pudieras", "puedes", "podías"], 1,
    "Émotion au passé (me alegré) → subj. imparfait : pudieras."],
  ["Le pediré que me ______ un favor.", ["hace", "haga", "hiciera", "hará"], 1,
    "Principale au futur (pediré) → subj. présent : haga."],
  ["Ojalá ______ aprobado el examen la semana pasada.", ["haya", "hubiera", "había", "habría"], 1,
    "Regret sur le passé → pluscuamperfecto de subj. : hubiera aprobado."],
  ["No creía que ______ tan difícil.", ["es", "sea", "fuera", "será"], 2,
    "Doute au passé (no creía) → subj. imparfait : fuera."]
];

/* ---------- EXEMPLES SUPPLÉMENTAIRES PAR LEÇON ----------
   Clé = id de la leçon (data.js). Alimentent le Mix grammaire ET le « Repaso a fondo ».
   Format : [phrase, [options], indexBonne, explicationFR] */
window.LESSON_EXTRA = {
  serestar: [
    ["El concierto ______ en el estadio.", ["es", "está"], 0, "Lieu d'un ÉVÉNEMENT → ser : es (≠ localisation d'un objet, qui prend estar)."],
    ["La sopa ya ______ fría, no la quiero.", ["es", "está"], 1, "État/résultat passager → estar : está fría."],
    ["Este jersey ______ de lana.", ["es", "está"], 0, "Matière → ser : es de lana."],
    ["No puedo salir, ______ enfermo.", ["soy", "estoy"], 1, "État de santé → estar : estoy enfermo."]
  ],
  gustar: [
    ["A nosotros ______ las películas de terror.", ["nos gusta", "nos gustan"], 1, "Sujet pluriel « las películas » → nos gustan."],
    ["A mis padres les ______ viajar en verano.", ["gusta", "gustan"], 0, "Le sujet est l'infinitif « viajar » (singulier) → gusta."],
    ["A Marta le ______ los animales.", ["encanta", "encantan"], 1, "« encantar » fonctionne comme gustar ; « los animales » pluriel → encantan."],
    ["¿A ti no te ______ nada este plan?", ["interesa", "interesan"], 0, "« este plan » singulier → interesa."]
  ],
  pronombres: [
    ["¿Las llaves? Creo que ______ dejé en casa.", ["las", "les", "los", "se"], 0, "« las llaves » COD fém. pluriel → las."],
    ["Compré un regalo a mi madre y ______ di ayer.", ["le lo", "se lo", "lo le", "se los"], 1, "COI « le » + COD « lo » → se lo (le devient se)."],
    ["Este boli es de Ana; tienes que ______.", ["devolvérselo", "se lo devolver", "devolverle lo", "lo devolverle"], 0, "Infinitif + pronoms collés : devolvérselo (a Ana = se, el boli = lo)."],
    ["A vosotros ______ lo explico mañana.", ["os", "les", "se", "vos"], 0, "COI 2e pers. pluriel « a vosotros » → os."]
  ],
  pasados: [
    ["Mientras ______ la tele, alguien llamó a la puerta.", ["veía", "vi", "veré", "veo"], 0, "Action-décor en cours (mientras) → imperfecto : veía."],
    ["El verano pasado ______ a Italia dos semanas.", ["iba", "fui", "iré", "voy"], 1, "Séjour ponctuel daté → indefinido : fui."],
    ["De pequeños, mis hermanos y yo ______ mucho en el parque.", ["jugamos", "jugábamos", "jugaremos", "jugaríamos"], 1, "Habitude passée → imperfecto : jugábamos."],
    ["Anoche ______ tarde y no oí el despertador.", ["me acostaba", "me acosté", "me acuesto", "me acostaré"], 1, "Fait ponctuel (anoche) → indefinido : me acosté."]
  ],
  futcond: [
    ["¿Qué hora es? — No sé, ______ las diez.", ["son", "serán", "serían", "fueron"], 1, "Probabilité au présent → futur : serán (« il doit être »)."],
    ["Me prometió que me ______ un mensaje.", ["envía", "enviará", "enviaría", "envió"], 2, "Futur du passé (discours indirect) → conditionnel : enviaría."],
    ["Mañana ______ que madrugar para el examen.", ["tengo", "tendré", "tendría", "tuve"], 1, "Action future (mañana) → futur : tendré."],
    ["Yo en tu lugar no ______ nada todavía.", ["digo", "diré", "diría", "dije"], 2, "Conseil hypothétique (yo en tu lugar) → conditionnel : diría."]
  ],
  porpara: [
    ["Estudio mucho ______ aprobar el examen.", ["por", "para"], 1, "But → para."],
    ["Te llamo ______ teléfono esta noche.", ["por", "para"], 0, "Moyen → por (por teléfono)."],
    ["Caminamos ______ el parque durante una hora.", ["por", "para"], 0, "Lieu de passage → por el parque."],
    ["Han cambiado la reunión ______ el jueves.", ["por", "para"], 1, "Échéance / date limite → para el jueves."]
  ],
  subjpres: [
    ["Te aconsejo que ______ al médico.", ["vas", "vayas", "irás", "ir"], 1, "Conseil + que → subj. présent : vayas."],
    ["Es mejor que lo ______ tú mismo.", ["haces", "hagas", "harás", "hacer"], 1, "Tournure impersonnelle de valeur → subj. : hagas."],
    ["No hay nadie que ______ resolverlo.", ["puede", "pueda", "podrá", "poder"], 1, "Antécédent nié/indéfini → subj. : pueda."],
    ["Dudo que ______ a tiempo.", ["llegan", "lleguen", "llegarán", "llegar"], 1, "Doute (dudar que) → subj. : lleguen."]
  ],
  subjtrig: [
    ["Trabaja mucho para que sus hijos ______ estudiar.", ["pueden", "puedan", "podrán", "poder"], 1, "« para que » → subj. : puedan."],
    ["Es evidente que ______ razón.", ["tienes", "tengas", "tendrás", "tener"], 0, "« es evidente que » = certitude → INDICATIF : tienes."],
    ["Saldremos aunque ______ mal tiempo.", ["hace", "haga", "hará", "hizo"], 1, "« aunque » + éventualité (fait non constaté) → subj. : haga."],
    ["Llámame en cuanto ______ a casa.", ["llegas", "llegues", "llegarás", "llegar"], 1, "« en cuanto » + fait futur → subj. : llegues."]
  ],
  imperativo: [
    ["¡No ______ tan tarde, por favor!", ["llegues", "llega", "llegas", "llegar"], 0, "Impératif NÉGATIF tú → subjonctif : no llegues."],
    ["______ usted por aquí, por favor.", ["Pasa", "Pase", "Pasas", "Pasar"], 1, "Vouvoiement (usted) → subj. : Pase."],
    ["Niños, ______ las manos antes de comer.", ["laváis", "lavaos", "lavad", "laven"], 2, "Impératif affirmatif vosotros → lavad (l'infinitif -r devient -d)."],
    ["¿El informe? ______ ahora mismo.", ["Háztelo", "Házmelo", "Me lo haz", "Haz me lo"], 1, "Affirmatif + pronoms collés + accent : Házmelo."]
  ],
  sicond: [
    ["Si me lo ______, te ayudaría.", ["pides", "pidieras", "pedirías", "pediste"], 1, "Hypothèse irréelle → Si + subj. imparfait : pidieras."],
    ["Si ______ mañana, no saldremos.", ["llueve", "lloviera", "llovería", "llovió"], 0, "Condition RÉELLE → Si + présent : llueve."],
    ["Si hubiera estudiado más, ______ el examen.", ["aprobaba", "aprobaría", "habría aprobado", "apruebo"], 2, "Irréel du passé → habría aprobado."],
    ["Habla como si lo ______ todo.", ["sabe", "supiera", "sabía", "sepa"], 1, "« como si » → subj. imparfait : supiera."]
  ]
};
