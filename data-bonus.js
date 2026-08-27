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
    "Doute au passé (no creía) → subj. imparfait : fuera."],
  ["Cuando ______ a casa, ya había anochecido.", ["llego", "llegué", "llegara", "llegaba"], 1,
    "« cuando » + fait passé ponctuel → indicatif (indefinido) : llegué."],
  ["Te lo diré cuando ______ el momento.", ["llega", "llegue", "llegara", "llegará"], 1,
    "« cuando » à valeur de futur → subj. présent : llegue (jamais le futur après cuando)."],
  ["Buscaban a alguien que ______ varios idiomas.", ["habla", "hable", "hablara", "hablará"], 2,
    "Antécédent indéfini + principale au passé → subj. imparfait : hablara."],
  ["Es imprescindible que todos ______ a la reunión.", ["asisten", "asistan", "asistieran", "asistirán"], 1,
    "Nécessité au présent (es imprescindible que) → subj. présent : asistan."],
  ["Era imprescindible que todos ______ a la reunión.", ["asistan", "asistieran", "asisten", "asistirán"], 1,
    "La même au passé (era) → subj. imparfait : asistieran."],
  ["No pensé que ______ tan lejos.", ["está", "esté", "estuviera", "estará"], 2,
    "Doute au passé (no pensé) → subj. imparfait : estuviera."],
  ["Me alegra que ya ______ terminado el informe.", ["has", "hayas", "hubieras", "habías"], 1,
    "Émotion au présent + antériorité → passé du subj. : hayas terminado."],
  ["Ojalá no ______ dicho aquello ayer.", ["haya", "hubiera", "había", "habría"], 1,
    "Regret sur le passé → pluscuamperfecto de subj. : hubiera dicho."],
  ["Le pedí que me ______ en cuanto pudiera.", ["llama", "llame", "llamara", "llamará"], 2,
    "Principale au passé (pedí) → subj. imparfait : llamara."],
  ["Haré lo que haga falta con tal de que ______ contento.", ["estás", "estés", "estuvieras", "estarás"], 1,
    "« con tal de que » + principale au présent → subj. présent : estés."]
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
  ],

  /* ===== Leçons AVANCÉES (B2 → C2) : mêmes 4 exemples chacune, ===== */
  /* ===== alimentent automatiquement le Repaso ET le Mix grammaire. ===== */

  // --- advanced-es.js (B2-C1) ---
  perfindef: [
    ["Nunca ______ nieve en mi ciudad.", ["vi", "he visto", "veía", "veré"], 1, "« nunca » (bilan jusqu'à présent, expérience de vie) → perfecto : he visto."],
    ["Hace dos años ______ a España por primera vez.", ["he viajado", "viajé", "viajaba", "viajo"], 1, "« hace + durée » = moment précis et clos → indefinido : viajé."],
    ["Anoche ______ pronto porque estaba agotado.", ["me he acostado", "me acosté", "me acostaba", "me acuesto"], 1, "« anoche » (période terminée) → indefinido : me acosté."],
    ["Últimamente mi vida ______ mucho.", ["cambió", "ha cambiado", "cambiaba", "cambia"], 1, "« últimamente » (période reliée au présent) → perfecto : ha cambiado."]
  ],
  estiloindirecto: [
    ["«Te ayudaré con eso». → Prometió que me ______ con eso.", ["ayuda", "ayudará", "ayudaría", "ayude"], 2, "futur → conditionnel : ayudaría."],
    ["«Ya he comprado el regalo». → Comentó que ya ______ el regalo.", ["compró", "había comprado", "ha comprado", "compraba"], 1, "perfecto → plus-que-parfait : había comprado."],
    ["«Ven a mi casa». → Me dijo que ______ a su casa.", ["voy", "vaya", "fuera", "iré"], 2, "impératif → subj. imparfait : fuera."],
    ["«Lo haré mañana». → Aseguró que lo haría ______.", ["mañana", "al día siguiente", "ayer", "hoy"], 1, "déictique « mañana » → « al día siguiente »."]
  ],
  perifrasis: [
    ["Después de discutir, ______ pidiéndose perdón.", ["acabaron", "siguieron", "llevan", "están a punto de"], 0, "« acabar + gérondif » = finir par : acabaron pidiéndose perdón."],
    ["Poco a poco, la situación ______ mejorando.", ["va", "acaba de", "deja de", "vuelve a"], 0, "« ir + gérondif » = progression graduelle : va mejorando."],
    ["En cuanto abrieron las puertas, la gente ______ a entrar.", ["empezó", "acabó", "dejó", "llevó"], 0, "« empezar a + inf » = commencer à : empezó a entrar."],
    ["No le hagas caso, ______ diciendo tonterías todo el día.", ["anda", "lleva", "acaba de", "vuelve a"], 0, "« andar + gérondif » = passer son temps à (nuance répétée/agaçante) : anda diciendo tonterías."]
  ],
  pasivase: [
    ["______ camareros con experiencia para el verano.", ["Se busca", "Se buscan", "Busca", "Se buscó"], 1, "Passif pronominal, sujet pluriel « camareros » → Se buscan."],
    ["La novela ______ por un autor casi desconocido.", ["se escribió", "fue escrita", "escribió", "se escribe"], 1, "Passif périphrastique + « por » ; accord au féminin : fue escrita."],
    ["En este pueblo ______ muy tranquilo.", ["se vive", "se viven", "vive", "se vivió"], 0, "« se » impersonnel (aucun sujet) → se vive."],
    ["No ______ los resultados hasta el lunes.", ["se sabrá", "se sabrán", "sabrán", "se sabe"], 1, "Sujet pluriel « los resultados » → se sabrán."]
  ],
  subjcontraste: [
    ["Necesito un ayudante que ______ inglés y alemán.", ["sabe", "sepa", "sabrá", "sabía"], 1, "Antécédent encore à trouver (indéfini) → subj. : sepa."],
    ["Tengo un vecino que ______ el violín cada noche.", ["toca", "toque", "tocará", "tocara"], 0, "Antécédent réel et connu → indicatif : toca."],
    ["Haremos la excursión cuando ______ mejor tiempo.", ["hace", "haga", "hará", "hacía"], 1, "« cuando » à valeur de futur → subj. : haga."],
    ["Espera aquí hasta que yo ______.", ["vuelvo", "vuelva", "volveré", "volvía"], 1, "« hasta que » + action future → subj. : vuelva."]
  ],

  // --- advanced-es2.js (B2-C1) ---
  cambio: [
    ["Tras años de esfuerzo, ______ presidente de la compañía.", ["se puso", "llegó a ser", "se quedó", "se puso a"], 1, "Aboutissement d'un long parcours → llegar a ser : llegó a ser presidente."],
    ["Al ver tanta sangre, ______ pálido y casi se desmaya.", ["se puso", "se hizo", "se volvió", "se quedó"], 0, "Réaction physique momentanée → ponerse : se puso pálido."],
    ["Con tanta presión, poco a poco ______ loco.", ["se puso", "se hizo", "se volvió", "se quedó"], 2, "Changement mental durable et involontaire → volverse : se volvió loco."],
    ["Date prisa, que ______ tarde y perderemos el tren.", ["se pone", "se hace", "se vuelve", "se queda"], 1, "« hacerse tarde » = se faire tard (expression figée) → se hace tarde."]
  ],
  serestaravz: [
    ["Mi tío ______ muy rico: tiene tres casas y un yate.", ["es", "está"], 0, "rico = riche/fortuné (caractéristique) → ser. (estar rico = délicieux)"],
    ["Ese comercial ______ muy interesado, solo piensa en el dinero.", ["es", "está"], 0, "interesado = intéressé/vénal (caractère) → ser. (estar interesado en = s'intéresser à)"],
    ["Hoy no voy a trabajar porque ______ malo, tengo fiebre.", ["soy", "estoy"], 1, "estar malo = être malade → estoy. (ser malo = être méchant)"],
    ["El recepcionista ______ muy atento con todos los clientes.", ["es", "está"], 0, "atento = prévenant/serviable (qualité) → ser. (estar atento a = être attentif à)"]
  ],
  regimen: [
    ["No te preocupes ______ eso, todo saldrá bien.", ["por", "de", "en", "con"], 0, "preocuparse POR = se soucier de : por eso."],
    ["Mi hermano se queja ______ todo constantemente.", ["de", "por", "en", "a"], 0, "quejarse DE = se plaindre de : de todo."],
    ["¿Puedo confiar ______ ti para este secreto?", ["en", "de", "con", "a"], 0, "confiar EN = faire confiance à : en ti."],
    ["Por fin se atrevió ______ decirle la verdad.", ["a", "de", "en", "con"], 0, "atreverse A + inf = oser : a decirle la verdad."]
  ],
  conectores: [
    ["El proyecto tiene riesgos; ______, hemos decidido seguir adelante.", ["por eso", "no obstante", "ya que", "es decir"], 1, "Opposition, registre soutenu → no obstante."],
    ["Faltaban datos; ______, la reunión se aplazó.", ["sin embargo", "por consiguiente", "aunque", "en cambio"], 1, "Conséquence, registre soutenu → por consiguiente."],
    ["Llega el lunes, ______, dentro de tres días.", ["sin embargo", "es decir", "no obstante", "en cambio"], 1, "Reformulation / précision → es decir (c'est-à-dire)."],
    ["Me encanta la montaña; ______, mi pareja prefiere la playa.", ["por lo tanto", "así que", "por otro lado", "ya que"], 2, "Introduire un autre aspect → por otro lado."]
  ],

  // --- advanced-es3.js (C1-C2) ---
  seinvol: [
    ["¡Cuidado, que ______ la comida! (sans le vouloir)", ["se te quema", "te quemas", "quemas", "se quema"], 0, "se + te + verbe accordé avec « la comida » : se te quema."],
    ["Al camarero se le ______ los platos al suelo.", ["cayó", "cayeron", "caían", "cae"], 1, "Accord avec « los platos » (pluriel) → cayeron."],
    ["Perdona, ______ decirte que llamó tu madre.", ["olvidé", "se me olvidó", "me olvidé", "se me olvidaron"], 1, "Oubli involontaire, une seule chose (+ infinitif) → se me olvidó."],
    ["Fregando los vasos, ______ dos sin querer.", ["se me rompieron", "se me rompió", "rompí", "me rompí"], 0, "Accord avec « dos (vasos) » (pluriel) → se me rompieron."]
  ],
  concesivas: [
    ["Por muy rico que ______, el dinero no da la felicidad.", ["es", "sea", "será", "fuera"], 1, "« por muy + adj + que » → subjonctif : sea."],
    ["A pesar de ______ cada día, no consigue adelgazar.", ["entrenar", "que entrena", "entrenando", "de entrenar"], 0, "« a pesar de + infinitif » (même sujet) : a pesar de entrenar."],
    ["Aunque me lo ______ de rodillas, no cambiaría de idea.", ["pide", "pida", "pidiera", "pedía"], 2, "Hypothèse irréelle → aunque + subj. imparfait ; principale au conditionnel : pidiera… cambiaría."],
    ["Aprobó el examen, y eso que apenas ______.", ["estudia", "estudió", "estudiara", "estudie"], 1, "« y eso que » (concession familière) + fait réel passé → indicatif : estudió."]
  ],
  relativo: [
    ["La casa ______ vivo ahora es muy luminosa.", ["que", "en la que", "cuya", "quien"], 1, "Après préposition (vivir EN) → « en la que »."],
    ["Ese es el escritor ______ novelas he leído todas.", ["que", "cuyas", "cuyos", "de quien"], 1, "« cuyas » s'accorde avec « novelas » (chose possédée, fém. plur.)."],
    ["Volvimos al pueblo ______ nacimos.", ["que", "donde", "cual", "cuyo"], 1, "Lieu → « donde » (= en el que) : el pueblo donde nacimos."],
    ["Es un asunto delicado, sobre ______ se ha escrito mucho.", ["el que", "que", "cuyo", "lo cual"], 0, "Après préposition, antécédent « asunto » → « sobre el que » (ou « el cual », soutenu)."]
  ],
  loneutro: [
    ["______ mejor de todo fue el final de la película.", ["El", "Lo", "La", "Los"], 1, "lo + adjectif (idée abstraite / superlatif neutre) : Lo mejor."],
    ["No te imaginas ______ corre ese coche.", ["lo rápido que", "el rápido que", "qué rápido", "cuánto rápido"], 0, "Intensif : lo + adverbe + que → lo rápido que corre."],
    ["______ tuyo no tiene una solución fácil.", ["Lo", "El", "La", "Ello"], 0, "« lo tuyo » = ton affaire, ton cas → Lo tuyo."],
    ["Ayer hablé con el jefe de ______ del ascenso.", ["lo", "el", "ello", "la"], 0, "« lo de + nom » = l'affaire de : lo del ascenso."]
  ],
  causafin: [
    ["______ no había entradas, nos quedamos en casa.", ["Como", "Porque", "Pues", "Así que"], 0, "Cause en tête de phrase → Como (« porque » ne peut pas ouvrir la phrase ici)."],
    ["Cerró con llave a fin de que nadie ______ entrar.", ["puede", "pudiera", "podía", "podrá"], 1, "« a fin de que » + subj. ; principale au passé → imparfait : pudiera."],
    ["Aprobó todos los exámenes, ______ sus padres lo felicitaron.", ["así que", "para que", "de ahí que", "como"], 0, "Conséquence réelle → así que."],
    ["Se lo perdoné, ______ al fin y al cabo es mi hermano.", ["puesto que", "para que", "así que", "de ahí que"], 0, "Cause justificative, registre soutenu → puesto que."]
  ],
  correlacion: [
    ["Dudo que Marta ______ la respuesta en este momento.", ["sabe", "sepa", "supiera", "sabrá"], 1, "Principale au présent, action simultanée → subj. présent : sepa."],
    ["Dudaba que Marta ______ la respuesta.", ["sepa", "supiera", "haya sabido", "sabe"], 1, "Principale au passé → subj. imparfait : supiera."],
    ["Me gustaría que me ______ toda la verdad.", ["dices", "digas", "dijeras", "dijiste"], 2, "« me gustaría » (conditionnel) → subj. imparfait : dijeras."],
    ["Es una pena que no ______ venir a la boda el mes pasado.", ["puedas", "pudieras", "hayas podido", "podías"], 2, "Principale au présent + fait passé → passé du subj. : hayas podido."]
  ],

  // --- advanced-es4.js (C1-C2) ---
  pronominales: [
    ["Todos se marcharon; yo prefiero ______ un rato más.", ["quedar", "quedarme", "quedar en", "irme"], 1, "« quedarse » = rester sur place → quedarme. (quedar = convenir d'un RDV)"],
    ["Se ______ el pan; habrá que comprar más.", ["acabó", "acabó de", "quedó", "terminó de"], 0, "« acabarse » = s'épuiser, être fini → se acabó el pan."],
    ["Te ______ mucho a tu hermano, sois casi idénticos.", ["pareces", "parece", "ves", "encuentras"], 0, "« parecerse a » = ressembler à → te pareces a tu hermano."],
    ["No me ______ a saltar desde tan alto, me da vértigo.", ["atrevo", "atrevía", "niego", "acuerdo"], 0, "« atreverse a » = oser → no me atrevo a saltar."]
  ],
  probabilidad: [
    ["¿Dónde está Juan? ______ en el gimnasio, como cada tarde.", ["Está", "Estará", "Estaría", "Esté"], 1, "Conjecture au présent → futur : estará (« il doit être »)."],
    ["Cuando la llamé anoche, ya ______ dormida y no contestó.", ["está", "estará", "estaría", "esté"], 2, "Conjecture dans le PASSÉ → conditionnel : estaría dormida."],
    ["Tal vez ______ mejor esperar un poco antes de decidir.", ["es", "sea", "será", "fuera"], 1, "« tal vez » + subjonctif (doute) → sea mejor."],
    ["Han llamado a la puerta; ______ ser el cartero.", ["debe de", "debe", "tiene", "hay que"], 0, "Probabilité → deber de : debe de ser (≠ « debe ser » = obligation)."]
  ],
  consecomp: [
    ["Habla ______ rápido que casi no lo entiendo.", ["tan", "tanto", "tanta", "muy"], 0, "« tan + adverbe + que » : tan rápido que."],
    ["Tiene ______ libros que no le caben en casa.", ["tantos", "tan", "tanto", "muchos"], 0, "« tantos + nom masc. plur. + que » (accord) : tantos libros que."],
    ["El examen no era ______ difícil como esperaba.", ["tan", "tanto", "tanta", "más"], 0, "Comparaison d'égalité : « tan + adj + como » : tan difícil como."],
    ["Con el calentamiento, los veranos son ______ calurosos.", ["cada vez más", "tanto más", "tan más", "muy más"], 0, "Progression : « cada vez más + adj » = de plus en plus : cada vez más calurosos."]
  ],
  acentuacion: [
    ["______ casa es más grande que la mía.", ["Tu", "Tú"], 0, "« Tu » (possessif : ta/ton) sans tilde ≠ « tú » (pronom : toi)."],
    ["A ______ me da igual lo que digan los demás.", ["mi", "mí"], 1, "« mí » (pronom, après préposition) porte la tilde ≠ « mi » (possessif)."],
    ["¿______ vives ahora exactamente?", ["Donde", "Dónde"], 1, "Interrogatif → « dónde » avec tilde."],
    ["La palabra « árbol » lleva tilde porque es llana y acaba en…", ["-l", "-n", "-s", "vocal"], 0, "Une llana prend la tilde si elle finit par une consonne AUTRE que -n ou -s : árbo**l**."]
  ],

  // --- grammar-obligacion.js (B1) ---
  obligacion: [
    ["Para mantenerse sano, ______ comer bien y hacer ejercicio.", ["hay que", "tengo que", "debo de", "necesito de"], 0, "Vérité générale, impersonnelle → hay que."],
    ["Son casi las tres; Pedro ______ de estar a punto de llegar.", ["tiene", "debe", "hay", "necesita"], 1, "Supposition (« il doit être sur le point ») → deber de : debe de estar."],
    ["No ______ que gritar, te oigo perfectamente.", ["hay", "tengo", "debo", "necesito"], 0, "« no hay que » = il ne faut pas / ce n'est pas la peine : no hay que gritar."],
    ["A esta salsa le ______ falta un poco de sal.", ["hace", "hay", "tiene", "debe"], 0, "« hacer falta » = manquer, être nécessaire : le hace falta sal."]
  ]
};
