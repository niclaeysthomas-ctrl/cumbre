/* ============================================================
   CUMBRE — Données (grammaire espagnole A2→C1 + vocabulaire FR↔ES)
   ============================================================ */

/* --- LEÇONS DE GRAMMAIRE (débloquées niveau par niveau, ≥70%) ---
   q = [phrase, [options], indexBonne, explicationFR]
*/
window.LESSONS = [
  {
    id: "serestar", title: "Ser vs Estar", tag: "A2 · Fondations",
    note: "« ser » = identité, caractéristique durable, heure, origine, profession. « estar » = état passager, lieu/position, « estar + gérondif ». Ex : « Soy francés » (identité) ≠ « Estoy cansado » (état).",
    q: [
      ["María ______ médica en un hospital de Madrid.", ["es", "está", "ser", "son"], 0, "Profession → ser : es."],
      ["Los niños ______ cansados después del partido.", ["son", "están", "es", "está"], 1, "État passager → estar : están."],
      ["La reunión ______ a las tres de la tarde.", ["es", "está", "son", "están"], 0, "Heure d'un événement → ser : es."],
      ["Madrid ______ en el centro de España.", ["es", "está", "son", "están"], 1, "Localisation → estar : está."],
      ["Este café ______ muy caliente, ten cuidado.", ["es", "está", "son", "eres"], 1, "Condition ponctuelle → estar : está."],
      ["Mis abuelos ______ de Andalucía.", ["son", "están", "es", "está"], 0, "Origine → ser : son."],
      ["¿Dónde ______ las llaves? No las encuentro.", ["son", "están", "es", "está"], 1, "Localisation → estar : están."],
      ["Mi hermana ______ muy inteligente y simpática.", ["es", "está", "son", "están"], 0, "Caractéristique durable → ser : es."]
    ]
  },
  {
    id: "gustar", title: "Gustar y verbos similares", tag: "A2 · Fondations",
    note: "« gustar » se construit à l'envers du français : « me gusta el cine » = j'aime le cinéma (litt. le cinéma me plaît). La personne = pronom (me, te, le, nos, os, les) ; le verbe s'accorde avec la CHOSE : « me gusta el libro » / « me gustan los libros ». Idem : encantar, interesar, doler, faltar.",
    q: [
      ["A mí ______ mucho la música latina.", ["me gusta", "me gustan", "gusto", "me gusto"], 0, "Sujet singulier « la música » → me gusta."],
      ["A Juan ______ los videojuegos.", ["le gusta", "le gustan", "gusta", "les gusta"], 1, "Sujet pluriel « los videojuegos » → le gustan."],
      ["¿______ el chocolate?", ["Te gusta", "Te gustan", "Gustas", "Le gusta"], 0, "Singulier → Te gusta."],
      ["Nos ______ mucho estas ciudades.", ["gusta", "gustan", "gustamos", "gusto"], 1, "Pluriel « estas ciudades » → gustan."],
      ["A los turistas ______ la playa.", ["le gusta", "les gusta", "les gustan", "gusta"], 1, "« A los turistas » → pronom « les » ; « la playa » singulier → les gusta."],
      ["Me ______ la cabeza después de estudiar.", ["duele", "duelen", "duelo", "dueles"], 0, "« doler » comme gustar ; « la cabeza » singulier → me duele."],
      ["A ella le ______ dos euros para el billete.", ["falta", "faltan", "falto", "faltas"], 1, "« dos euros » pluriel → le faltan."],
      ["¿Os ______ las tapas españolas?", ["gusta", "gustan", "gustáis", "gustamos"], 1, "Pluriel → gustan."]
    ]
  },
  {
    id: "pronombres", title: "Pronombres de objeto", tag: "B1 · Fondations",
    note: "COD (lo, la, los, las / me, te, nos, os) = complément direct ; COI (le, les) = complément indirect. Ordre : COI + COD avant le verbe : « Me lo da ». « le/les » deviennent « se » devant lo/la/los/las. Avec infinitif/impératif, on colle : « Dámelo », « voy a dártelo ».",
    q: [
      ["¿El libro? Juan ______ compró ayer.", ["lo", "le", "la", "los"], 0, "« el libro » masc. sing. (COD) → lo."],
      ["Escribí una carta a mis padres y ______ envié.", ["le la", "les la", "se la", "la les"], 2, "COI « les » devant COD « la » → devient « se la »."],
      ["¿Me puedes pasar la sal? — Sí, ahora ______ paso.", ["te la", "te lo", "se la", "me la"], 0, "à toi (te) + la sal (la) → te la."],
      ["Dame el bolígrafo. → ¡______!", ["Dámelo", "Me lo da", "Lo dame", "Da me lo"], 0, "Impératif + pronoms collés : Dámelo."],
      ["Es un secreto: no ______ cuentes a María.", ["se lo", "le lo", "lo le", "la"], 0, "COI (a María = le) + COD (lo) → se lo."],
      ["Vi a Ana en la fiesta y ______ saludé.", ["la", "le", "lo", "se"], 0, "« a Ana » COD féminin → la."],
      ["Voy a comprar flores para ti; voy a ______.", ["comprártelas", "te las comprar", "comprarte las", "las comprarte"], 0, "Infinitif + pronoms collés : comprártelas."],
      ["A mis amigos ______ conté la verdad.", ["les", "los", "le", "se"], 0, "COI pluriel « a mis amigos » → les."]
    ]
  },
  {
    id: "pasados", title: "Indefinido vs Imperfecto", tag: "B1 · Le passé",
    note: "Imparfait (imperfecto : -aba / -ía) = description, habitude, cadre (« il était, il faisait »). Passé simple (indefinido : -é / -í...) = action ponctuelle achevée (« il fit »). Ex : « Cuando era niño, jugaba... » (habitude) / « Ayer jugué al fútbol » (action précise).",
    q: [
      ["Ayer ______ a mis abuelos en su casa.", ["visitaba", "visité", "visitaría", "visito"], 1, "Action ponctuelle → indefinido : visité."],
      ["Cuando ______ pequeño, vivía en Sevilla.", ["fui", "era", "fue", "soy"], 1, "État/description → imperfecto : era."],
      ["Todos los veranos ______ a la playa con mi familia.", ["fuimos", "íbamos", "fuéramos", "vamos"], 1, "Habitude → imperfecto : íbamos."],
      ["La semana pasada ______ una película estupenda.", ["veía", "vi", "vería", "veo"], 1, "Ponctuel → vi."],
      ["______ las diez cuando llegó a casa.", ["Fueron", "Eran", "Son", "Fue"], 1, "L'heure dans le passé → imperfecto : Eran."],
      ["Mientras yo ______, sonó el teléfono.", ["cociné", "cocinaba", "cocinaría", "cocino"], 1, "Cadre/action en cours → imperfecto : cocinaba."],
      ["El año pasado ______ a México por primera vez.", ["viajaba", "viajé", "viajaría", "viajo"], 1, "Ponctuel daté → viajé."],
      ["De niña, ______ mucho miedo a la oscuridad.", ["tuve", "tenía", "tendría", "tengo"], 1, "État durable passé → imperfecto : tenía."]
    ]
  },
  {
    id: "futcond", title: "Futuro y Condicional", tag: "B1 · Le futur",
    note: "Futur : infinitif + -é/-ás/-á/-emos/-éis/-án (hablaré). Irréguliers : tener→tendré, poder→podré, hacer→haré, decir→diré, salir→saldré, venir→vendré, poner→pondré, saber→sabré, querer→querré. Conditionnel : mêmes radicaux + -ía (tendría). « ir a + infinitif » = futur proche.",
    q: [
      ["Mañana ______ el resultado del examen.", ["sabo", "sabré", "sabería", "supe"], 1, "Futur irrégulier de saber → sabré."],
      ["Si tengo tiempo, ______ al gimnasio.", ["iré", "iría", "vaya", "fui"], 0, "Condition réelle → futur : iré."],
      ["¿______ ayudarme con esto, por favor?", ["Puedes", "Podrás", "Podrías", "Pudiste"], 2, "Politesse → conditionnel : Podrías."],
      ["El próximo año ______ una casa más grande.", ["tengo", "tendré", "tenía", "tuve"], 1, "Futur → tendré."],
      ["Dijo que ______ a la fiesta.", ["viene", "vendrá", "vendría", "vino"], 2, "Discours indirect au passé → conditionnel : vendría."],
      ["Yo que tú, ______ con un médico.", ["hablo", "hablaré", "hablaría", "hablé"], 2, "Conseil hypothétique → conditionnel : hablaría."],
      ["Esta tarde ______ a estudiar en la biblioteca.", ["voy", "iré", "vaya", "fui"], 0, "Futur proche « voy a estudiar »."],
      ["No sé dónde está; ______ en casa.", ["estará", "está", "estaría", "estuvo"], 0, "Futur de probabilité : estará (il doit être...)."]
    ]
  },
  {
    id: "porpara", title: "Por vs Para", tag: "B1 · Prépositions",
    note: "« para » = but, destinataire, échéance, destination, opinion (souvent « pour »). « por » = cause/motif, prix/échange, moyen, durée, lieu de passage (souvent « par / à cause de »). Ex : « Estudio para aprobar » (but) / « Gracias por tu ayuda » (cause).",
    q: [
      ["Estudio español ______ trabajar en España.", ["por", "para"], 1, "But → para."],
      ["Gracias ______ tu ayuda.", ["por", "para"], 0, "Cause/motif → por."],
      ["Este regalo es ______ ti.", ["por", "para"], 1, "Destinataire → para."],
      ["Pagué veinte euros ______ el libro.", ["por", "para"], 0, "Prix/échange → por."],
      ["Tenemos que terminar el informe ______ el viernes.", ["por", "para"], 1, "Échéance → para."],
      ["Viajamos ______ toda España en tren.", ["por", "para"], 0, "Lieu de passage → por."],
      ["______ mí, esta es la mejor opción.", ["Por", "Para"], 1, "Opinion → Para mí."],
      ["No pude dormir ______ el ruido.", ["por", "para"], 0, "Cause → por."]
    ]
  },
  {
    id: "subjpres", title: "Subjuntivo presente", tag: "B1 · Subjonctif",
    note: "Le subjonctif présent se forme sur la 1re pers. du présent (-o) avec terminaisons inversées : -ar → -e (hable), -er/-ir → -a (coma, viva). On l'emploie après un souhait, une émotion, un doute, une nécessité, souvent avec « que ». Ex : « Quiero que vengas », « Es importante que estudies ».",
    q: [
      ["Quiero que (tú) ______ a la fiesta.", ["vienes", "vengas", "vengues", "venir"], 1, "Souhait + que → subjonctif : vengas."],
      ["Es importante que ______ más agua.", ["bebemos", "bebamos", "bebimos", "beber"], 1, "Nécessité impersonnelle → subj. : bebamos."],
      ["Espero que ______ bien el examen.", ["haces", "hagas", "hará", "hacer"], 1, "Souhait → hagas."],
      ["No creo que ______ verdad.", ["es", "sea", "será", "fue"], 1, "Doute/négation d'opinion → subj. : sea."],
      ["Ojalá ______ buen tiempo mañana.", ["hace", "haga", "hará", "hizo"], 1, "« Ojalá » + subj. : haga."],
      ["Te pido que me ______ la verdad.", ["dices", "digas", "dirás", "decir"], 1, "Demande → digas."],
      ["Es una lástima que no ______ venir.", ["puedes", "puedas", "podrás", "poder"], 1, "Émotion → puedas."],
      ["Cuando ______ a Madrid, te llamaré.", ["llego", "llegue", "llegaré", "llegar"], 1, "« cuando » + futur → subj. : llegue."]
    ]
  },
  {
    id: "subjtrig", title: "Subjuntivo — más usos", tag: "B2 · Subjonctif",
    note: "Le subjonctif est déclenché par l'émotion (me alegro de que), le doute/la négation (no pienso que), la volonté (prefiero que), l'impersonnel (es posible que) et des connecteurs : para que, antes de que, sin que, a menos que, aunque (hypothèse). Après une certitude (creo que, es verdad que) → indicatif.",
    q: [
      ["Me alegro de que ______ aquí.", ["estás", "estés", "estarás", "estar"], 1, "Émotion → estés."],
      ["Te lo explico para que lo ______.", ["entiendes", "entiendas", "entenderás", "entender"], 1, "« para que » + subj. → entiendas."],
      ["No pienso que ______ razón.", ["tiene", "tenga", "tendrá", "tener"], 1, "Négation d'opinion → tenga."],
      ["Llámame antes de que ______ el tren.", ["sale", "salga", "saldrá", "salir"], 1, "« antes de que » + subj. → salga."],
      ["Iré a la fiesta a menos que ______ demasiado tarde.", ["es", "sea", "será", "fue"], 1, "« a menos que » + subj. → sea."],
      ["Creo que ______ a llover.", ["va", "vaya", "irá", "fuera"], 0, "Certitude « creo que » → indicatif : va."],
      ["Es posible que ______ mañana.", ["vienen", "vengan", "vendrán", "venir"], 1, "« es posible que » + subj. → vengan."],
      ["Aunque ______ dinero, no lo compraría.", ["tengo", "tenga", "tendré", "tuve"], 1, "« aunque » + hypothèse → subj. : tenga."]
    ]
  },
  {
    id: "imperativo", title: "Imperativo (mandatos)", tag: "B2 · Ordres",
    note: "Impératif affirmatif « tú » = 3e pers. présent (habla, come, escribe) ; irréguliers : di, haz, ve, pon, sal, ten, ven, sé. Négatif et « usted » = subjonctif (no hables, hable usted). Les pronoms se collent à l'affirmatif (dímelo) et précèdent au négatif (no me lo digas).",
    q: [
      ["¡______ la ventana, por favor!", ["Abre", "Abra", "Abres", "Abrir"], 0, "Impératif tú → Abre."],
      ["______ usted aquí, por favor.", ["Siéntate", "Siéntese", "Se siente", "Sienta"], 1, "Usted → subj. + pronom collé : Siéntese."],
      ["No ______ tan rápido.", ["hablas", "hables", "habla", "hablar"], 1, "Négatif tú → subj. : no hables."],
      ["______ cuidado con el escalón.", ["Ten", "Tienes", "Tiene", "Tener"], 0, "Irrégulier : Ten."],
      ["Chicos, ______ los deberes ahora.", ["haced", "hagan", "hacen", "hacer"], 0, "Impératif vosotros → haced."],
      ["¿El informe? ______ mañana.", ["Dámelo", "Me lo da", "Dalo me", "Da me lo"], 0, "Pronoms collés : Dámelo."],
      ["No me ______ eso, por favor.", ["dices", "digas", "di", "decir"], 1, "Négatif → no digas."],
      ["______ recto y gire a la derecha.", ["Sigue", "Siga", "Sigues", "Seguir"], 1, "Usted → Siga."]
    ]
  },
  {
    id: "sicond", title: "Si condicional & subj. imperfecto", tag: "C1 · Hypothèse",
    note: "Hypothèse irréelle : « Si + imparfait du subjonctif (-ara/-iera) + conditionnel » : « Si tuviera dinero, viajaría ». Réel : « Si + présent, présent/futur ». L'imparfait du subjonctif se forme sur la 3e pers. pluriel du passé simple (hablaron→hablara, tuvieron→tuviera). Irréel du passé : « Si hubiera + participe, habría + participe ».",
    q: [
      ["Si ______ más tiempo, aprendería a tocar la guitarra.", ["tengo", "tuviera", "tendría", "tuve"], 1, "Hypothèse irréelle → imparfait subj. : tuviera."],
      ["Si ______ rico, viajaría por todo el mundo.", ["soy", "fuera", "sería", "fui"], 1, "→ fuera."],
      ["Si llueve mañana, ______ en casa.", ["me quedo", "me quedaría", "me quedara", "quedarme"], 0, "Condition réelle → présent : me quedo."],
      ["Me gustaría que ______ conmigo.", ["vienes", "vinieras", "vendrías", "vengas"], 1, "« me gustaría que » → imparfait subj. : vinieras."],
      ["Si lo ______, te lo diría.", ["sé", "supiera", "sabría", "supe"], 1, "→ supiera."],
      ["Actuó como si no ______ nada.", ["sabe", "supiera", "sabría", "sabía"], 1, "« como si » + imparfait subj. → supiera."],
      ["Si hubiera estudiado más, ______ el examen.", ["apruebo", "aprobaría", "habría aprobado", "aprobé"], 2, "Irréel du passé → habría aprobado."],
      ["Ojalá ______ estar allí ahora.", ["puedo", "pudiera", "podría", "pude"], 1, "« Ojalá » + irréel → pudiera."]
    ]
  }
];

/* --- VOCABULAIRE (cartes SRS) — [ES, FR, exemple ES, thème] --- */
window.VOCAB = [
  // Personnes & famille
  ["el hermano", "le frère", "Mi hermano es mayor que yo.", "Personas"],
  ["la pareja", "le/la partenaire, le couple", "Vino a la fiesta con su pareja.", "Personas"],
  ["el vecino", "le voisin", "El vecino de al lado es muy amable.", "Personas"],
  ["el jefe", "le patron, le chef", "Mi jefe es bastante exigente.", "Personas"],
  ["el niño", "l'enfant, le garçon", "El niño juega en el parque.", "Personas"],
  ["la gente", "les gens", "Hay mucha gente en la calle.", "Personas"],
  ["el amigo", "l'ami", "Voy al cine con un amigo.", "Personas"],
  ["la abuela", "la grand-mère", "Mi abuela cocina muy bien.", "Personas"],
  ["el compañero", "le collègue, le camarade", "Es un compañero de trabajo.", "Personas"],
  ["el/la joven", "le/la jeune", "Muchos jóvenes buscan trabajo.", "Personas"],

  // Maison
  ["la casa", "la maison", "Vivo en una casa antigua.", "Casa"],
  ["el piso", "l'appartement, l'étage", "Alquilo un piso en el centro.", "Casa"],
  ["la cocina", "la cuisine", "La cocina es pequeña pero cómoda.", "Casa"],
  ["el dormitorio", "la chambre", "Mi dormitorio da al jardín.", "Casa"],
  ["la llave", "la clé", "He perdido las llaves de casa.", "Casa"],
  ["la ventana", "la fenêtre", "Abre la ventana, por favor.", "Casa"],
  ["la silla", "la chaise", "Siéntate en esta silla.", "Casa"],
  ["la mesa", "la table", "Pon los platos en la mesa.", "Casa"],
  ["el armario", "l'armoire, le placard", "La ropa está en el armario.", "Casa"],
  ["la escalera", "l'escalier, l'échelle", "Sube por la escalera.", "Casa"],
  ["el aseo", "les toilettes", "¿Dónde está el aseo?", "Casa"],
  ["la nevera", "le frigo", "Guarda la leche en la nevera.", "Casa"],

  // Nourriture
  ["la comida", "le repas, la nourriture", "La comida está lista.", "Comida"],
  ["el desayuno", "le petit-déjeuner", "Tomo café en el desayuno.", "Comida"],
  ["la cena", "le dîner", "La cena es a las nueve.", "Comida"],
  ["el pan", "le pain", "Compra pan en la panadería.", "Comida"],
  ["la carne", "la viande", "No como carne los lunes.", "Comida"],
  ["el pescado", "le poisson", "El pescado está muy fresco.", "Comida"],
  ["la fruta", "le fruit", "Como fruta todos los días.", "Comida"],
  ["la verdura", "les légumes", "Hay que comer más verdura.", "Comida"],
  ["el huevo", "l'œuf", "Quiero dos huevos fritos.", "Comida"],
  ["el queso", "le fromage", "Este queso es manchego.", "Comida"],
  ["el aceite", "l'huile", "Cocino con aceite de oliva.", "Comida"],
  ["la bebida", "la boisson", "¿Qué bebida prefieres?", "Comida"],
  ["probar", "goûter, essayer", "¿Quieres probar las tapas?", "Comida"],
  ["tener hambre", "avoir faim", "Tengo mucha hambre.", "Comida"],

  // Ville & déplacements
  ["la calle", "la rue", "Vivo en una calle tranquila.", "Ciudad"],
  ["el barrio", "le quartier", "Es un barrio muy animado.", "Ciudad"],
  ["la plaza", "la place", "Quedamos en la plaza mayor.", "Ciudad"],
  ["la tienda", "le magasin", "La tienda cierra a las ocho.", "Ciudad"],
  ["la parada", "l'arrêt (bus)", "La parada está enfrente.", "Ciudad"],
  ["el ayuntamiento", "la mairie", "El ayuntamiento está en el centro.", "Ciudad"],
  ["la acera", "le trottoir", "Camina por la acera.", "Ciudad"],
  ["el semáforo", "le feu de circulation", "Gira a la derecha en el semáforo.", "Ciudad"],
  ["el coche", "la voiture", "Voy al trabajo en coche.", "Ciudad"],
  ["el billete", "le billet, le ticket", "Compré un billete de tren.", "Ciudad"],
  ["la esquina", "le coin (de rue)", "La farmacia está en la esquina.", "Ciudad"],
  ["cruzar", "traverser", "Cruza con cuidado.", "Ciudad"],

  // Travail & études
  ["el trabajo", "le travail", "Empiezo el trabajo a las nueve.", "Trabajo"],
  ["la empresa", "l'entreprise", "Trabajo en una empresa grande.", "Trabajo"],
  ["la reunión", "la réunion", "La reunión dura una hora.", "Trabajo"],
  ["el sueldo", "le salaire", "El sueldo no es muy alto.", "Trabajo"],
  ["la entrevista", "l'entretien", "Tengo una entrevista de trabajo.", "Trabajo"],
  ["el horario", "l'horaire, l'emploi du temps", "El horario es flexible.", "Trabajo"],
  ["la beca", "la bourse (études)", "Consiguió una beca Erasmus.", "Trabajo"],
  ["el informe", "le rapport", "Tengo que entregar el informe.", "Trabajo"],
  ["la empresa emergente", "la start-up", "Fundó una empresa emergente.", "Trabajo"],
  ["el plazo", "le délai, l'échéance", "El plazo termina el viernes.", "Trabajo"],
  ["reunirse", "se réunir", "Nos reunimos cada lunes.", "Trabajo"],
  ["contratar", "embaucher, recruter", "Van a contratar a dos personas.", "Trabajo"],

  // Temps & météo
  ["el tiempo", "le temps (météo/durée)", "Hoy hace buen tiempo.", "Tiempo"],
  ["hoy", "aujourd'hui", "Hoy es lunes.", "Tiempo"],
  ["ayer", "hier", "Ayer llovió mucho.", "Tiempo"],
  ["mañana", "demain, le matin", "Mañana tengo clase.", "Tiempo"],
  ["la semana", "la semaine", "La semana que viene viajo.", "Tiempo"],
  ["el fin de semana", "le week-end", "El fin de semana descanso.", "Tiempo"],
  ["temprano", "tôt", "Me levanto temprano.", "Tiempo"],
  ["tarde", "tard, l'après-midi", "Llegó tarde a la reunión.", "Tiempo"],
  ["la lluvia", "la pluie", "La lluvia no para.", "Tiempo"],
  ["el sol", "le soleil", "Hace sol en el sur.", "Tiempo"],
  ["la nube", "le nuage", "El cielo está lleno de nubes.", "Tiempo"],
  ["hace frío", "il fait froid", "En invierno hace frío.", "Tiempo"],

  // Verbes courants
  ["hacer", "faire", "¿Qué haces esta tarde?", "Verbos"],
  ["decir", "dire", "No sé qué decir.", "Verbos"],
  ["poder", "pouvoir", "No puedo venir hoy.", "Verbos"],
  ["querer", "vouloir, aimer", "Quiero aprender español.", "Verbos"],
  ["saber", "savoir", "No sé su número.", "Verbos"],
  ["conocer", "connaître", "Conozco un buen restaurante.", "Verbos"],
  ["poner", "mettre", "Pon la mesa, por favor.", "Verbos"],
  ["traer", "apporter", "¿Puedes traer el vino?", "Verbos"],
  ["llevar", "porter, emmener", "Llevo el paraguas por si acaso.", "Verbos"],
  ["conseguir", "obtenir, réussir à", "Conseguí el trabajo.", "Verbos"],
  ["intentar", "essayer, tenter", "Voy a intentarlo otra vez.", "Verbos"],
  ["quedar", "rester ; se donner rendez-vous", "Quedamos a las siete.", "Verbos"],
  ["olvidar", "oublier", "Olvidé las llaves en casa.", "Verbos"],
  ["ayudar", "aider", "¿Me puedes ayudar?", "Verbos"],
  ["empezar", "commencer", "La película empieza ahora.", "Verbos"],
  ["terminar", "terminer", "Termino a las seis.", "Verbos"],

  // Adjectifs
  ["bonito", "joli, beau", "Es un pueblo muy bonito.", "Adjetivos"],
  ["feo", "laid", "El tiempo está feo hoy.", "Adjetivos"],
  ["caro", "cher", "Este restaurante es muy caro.", "Adjetivos"],
  ["barato", "bon marché", "Encontré un hotel barato.", "Adjetivos"],
  ["fácil", "facile", "El examen fue fácil.", "Adjetivos"],
  ["difícil", "difficile", "Es una decisión difícil.", "Adjetivos"],
  ["rápido", "rapide", "El tren es muy rápido.", "Adjetivos"],
  ["lento", "lent", "La conexión es muy lenta.", "Adjetivos"],
  ["fuerte", "fort", "Tiene un carácter fuerte.", "Adjetivos"],
  ["débil", "faible", "Se siente débil hoy.", "Adjetivos"],
  ["ocupado", "occupé", "Estoy muy ocupado esta semana.", "Adjetivos"],
  ["cansado", "fatigué", "Estoy cansado del viaje.", "Adjetivos"],
  ["contento", "content", "Estoy contento con el resultado.", "Adjetivos"],
  ["orgulloso", "fier", "Estoy orgulloso de ti.", "Adjetivos"]
];
