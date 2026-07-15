/* ============================================================
   CUMBRE — Banque d'items pour test de niveau & examens blancs (espagnol)
   ============================================================ */

/* --- GRAMMAIRE / COMPLÉTION --- g = [phrase, [options], bonne, explFR, difficulté(1-3)] */
window.EXAM_GRAMMAR = [
  ["Nosotros ______ estudiantes de la universidad.", ["somos", "estamos", "están", "es"], 0, "Identité → ser : somos.", 1],
  ["El museo ______ cerrado los lunes.", ["es", "está", "son", "están"], 1, "estar + participe (état) → está.", 1],
  ["A ella le ______ los animales.", ["gusta", "gustan", "gustas", "gusto"], 1, "Sujet pluriel « los animales » → gustan.", 1],
  ["Ayer nosotros ______ al cine.", ["íbamos", "fuimos", "vamos", "iremos"], 1, "Action ponctuelle → indefinido : fuimos.", 1],
  ["Cuando era niño, ______ en un pueblo.", ["viví", "vivía", "viviré", "viva"], 1, "Habitude/description → imperfecto : vivía.", 1],
  ["Estudio mucho ______ aprobar el examen.", ["por", "para"], 1, "But → para.", 1],
  ["Gracias ______ venir a mi fiesta.", ["por", "para"], 0, "Motif → por.", 1],
  ["El próximo verano ______ a Argentina.", ["voy", "iré", "vaya", "fui"], 1, "Futur → iré.", 1],
  ["Quiero que tú me ______ la verdad.", ["dices", "digas", "dirás", "decir"], 1, "Souhait + subjonctif → digas.", 2],
  ["No creo que ______ a llover hoy.", ["va", "vaya", "irá", "fue"], 1, "Négation d'opinion → subj. : vaya.", 2],
  ["Es necesario que todos ______ puntuales.", ["son", "sean", "serán", "ser"], 1, "Impersonnel + subj. → sean.", 2],
  ["En cuanto ______ el informe, te lo envío.", ["termino", "termine", "terminaré", "terminar"], 1, "Temporel à valeur de futur → subj. : termine.", 2],
  ["¿El coche? ______ compré la semana pasada.", ["Le", "Lo", "La", "Los"], 1, "COD masc. sing. → Lo.", 2],
  ["No ______ tan deprisa, es peligroso.", ["conduces", "conduzcas", "conduce", "conducir"], 1, "Impératif négatif → subj. : no conduzcas.", 2],
  ["Llevo dos horas ______ el autobús.", ["esperar", "esperando", "esperado", "espero"], 1, "« llevar + gérondif » = ça fait... que : esperando.", 2],
  ["Ojalá ______ aprobar el DELE este año.", ["puedo", "pueda", "podré", "pude"], 1, "« Ojalá » + subj. → pueda.", 2],
  ["El libro ______ leí es muy interesante.", ["que", "cual", "quien", "cuyo"], 0, "Relatif COD → que.", 2],
  ["Es la ciudad ______ nací.", ["que", "donde", "cual", "cuando"], 1, "Lieu → donde.", 2],
  ["En 2010 ______ en Sevilla durante seis meses.", ["vivía", "viví", "viviré", "viva"], 1, "Période délimitée passée → indefinido : viví.", 2],
  ["Si ______ tiempo, iría contigo.", ["tengo", "tuviera", "tendría", "tuve"], 1, "Hypothèse irréelle → subj. imparfait : tuviera.", 3],
  ["Me pidió que le ______ con la mudanza.", ["ayudo", "ayudara", "ayudaré", "ayude"], 1, "Demande au passé → subj. imparfait : ayudara.", 3],
  ["Actúa como si ______ el jefe.", ["es", "sea", "fuera", "era"], 2, "« como si » + subj. imparfait → fuera.", 3],
  ["No conozco a nadie que ______ hablar ruso.", ["sabe", "sepa", "sabrá", "saber"], 1, "Antécédent négatif/indéfini → subj. : sepa.", 3],
  ["Por mucho que ______, no lo conseguirá.", ["intenta", "intente", "intentará", "intentar"], 1, "« por mucho que » + subj. → intente.", 3],
  ["Me alegro de que ______ aprobado.", ["has", "hayas", "habrás", "haber"], 1, "Émotion + subj. passé → hayas aprobado.", 3],
  ["Aunque ______ mañana, no cambiaré de opinión.", ["llueve", "llueva", "lloverá", "llover"], 1, "« aunque » + hypothèse → subj. : llueva.", 3],
  ["Dile a Marta la noticia. → ______.", ["Dísela", "Dígala", "Dísele", "Dilela"], 0, "COI (a Marta→se) + COD (la) collés → Dísela.", 3],
  ["Nada más ______, me llamó.", ["llegar", "llego", "llegue", "llegando"], 0, "« nada más + infinitif » = dès que : llegar.", 3]
];

/* --- LECTURE (comprensión) --- passage = { title, text, qs:[[q,[opts],bonne,explFR]], diff } */
window.READING = [
  {
    title: "Correo — Confirmación de reserva", diff: 1,
    text:
`De: reservas@hotelsol.es
Para: t.dupont@correo.fr
Asunto: Su reserva

Estimado Sr. Dupont:

Le confirmamos su reserva de una habitación doble del 5 al 8 de julio. El desayuno está incluido. La recepción está abierta las 24 horas. Si necesita algo, no dude en llamarnos.

Un cordial saludo,
Hotel Sol`,
    qs: [
      ["¿Cuántas noches se queda el Sr. Dupont?", ["Dos", "Tres", "Cinco", "Ocho"], 1, "Du 5 au 8 juillet = 3 nuits."],
      ["¿Qué está incluido en la reserva?", ["La cena", "El desayuno", "El aparcamiento", "Las bebidas"], 1, "« El desayuno está incluido »."],
      ["¿Cuándo está abierta la recepción?", ["Solo de día", "Las 24 horas", "Por la mañana", "Los fines de semana"], 1, "« abierta las 24 horas »."]
    ]
  },
  {
    title: "Aviso a los vecinos", diff: 1,
    text:
`AVISO A LOS VECINOS

El agua se cortará el sábado de 9:00 a 14:00 por obras de mantenimiento. Les recomendamos guardar agua para esa mañana. El servicio volverá a la normalidad por la tarde. Disculpen las molestias.

La administración`,
    qs: [
      ["¿Cuándo se cortará el agua?", ["El viernes por la tarde", "El sábado por la mañana", "El domingo", "El lunes"], 1, "Samedi de 9h à 14h."],
      ["¿Qué recomiendan hacer?", ["Salir de casa", "Guardar agua", "Llamar a un fontanero", "Cerrar las ventanas"], 1, "« recomendamos guardar agua »."]
    ]
  },
  {
    title: "Anuncio — Se busca camarero/a", diff: 2,
    text:
`SE BUSCA CAMARERO/A

Restaurante en el centro busca camarero/a con experiencia. Se requiere disponibilidad los fines de semana y nivel básico de inglés. Ofrecemos contrato estable y buen ambiente de trabajo. Enviar currículum a empleo@labrasa.es antes del 30 de junio.`,
    qs: [
      ["¿Qué puesto se ofrece?", ["Cocinero", "Camarero/a", "Recepcionista", "Repartidor"], 1, "« Se busca camarero/a »."],
      ["¿Qué se requiere?", ["Tener coche", "Disponibilidad los fines de semana", "Cinco años de experiencia", "Hablar francés"], 1, "« disponibilidad los fines de semana »."],
      ["¿Cómo hay que solicitar el puesto?", ["Por teléfono", "En persona", "Por correo electrónico", "Rellenando un formulario"], 2, "Envoyer le CV par courriel."]
    ]
  },
  {
    title: "Mensajes", diff: 2,
    text:
`Lucía (18:02): ¿Vamos al cine esta noche?
Pablo (18:05): Vale, ¿qué película?
Lucía (18:06): La nueva de ciencia ficción, a las nueve.
Pablo (18:07): Perfecto. ¿Quedamos a las ocho y media en la plaza?
Lucía (18:08): ¡Genial, allí nos vemos!`,
    qs: [
      ["¿Qué proponen hacer?", ["Cenar fuera", "Ir al cine", "Ver una serie en casa", "Dar un paseo"], 1, "« ¿Vamos al cine? »."],
      ["¿A qué hora quedan?", ["A las ocho", "A las ocho y media", "A las nueve", "A las diez"], 1, "« a las ocho y media en la plaza »."]
    ]
  },
  {
    title: "Artículo — El auge del teletrabajo", diff: 3,
    text:
`El teletrabajo se ha consolidado en España tras la pandemia. Según un estudio reciente, casi el 30% de los empleados trabaja desde casa al menos dos días por semana. Las empresas destacan el ahorro en costes y una mayor satisfacción de los trabajadores, aunque algunos expertos advierten del riesgo de aislamiento. Se espera que esta tendencia siga creciendo en los próximos años.`,
    qs: [
      ["¿De qué trata el artículo?", ["Del turismo", "Del teletrabajo", "De la educación", "Del transporte"], 1, "Le télétravail."],
      ["¿Qué porcentaje trabaja desde casa?", ["El 3%", "Casi el 30%", "La mitad", "El 80%"], 1, "« casi el 30% »."],
      ["¿Qué riesgo señalan los expertos?", ["El aislamiento", "El coste", "La contaminación", "El desempleo"], 0, "« el riesgo de aislamiento »."]
    ]
  }
];

/* --- ÉCOUTE courte (question orale → 3 réponses) --- l = [pregunta, [respuestas], bonne, difficulté] */
window.EXAM_LISTEN = [
  ["¿Dónde está la estación de tren?", ["A las ocho.", "Al final de esta calle.", "Es muy grande."], 1, 1],
  ["¿A qué hora abre la tienda?", ["En el centro.", "A las diez.", "Sí, está abierta."], 1, 1],
  ["¿Quieres un café?", ["No, gracias.", "En la cocina.", "Es tarde."], 0, 1],
  ["¿Cuándo llega el autobús?", ["Del aeropuerto.", "Dentro de cinco minutos.", "Sí, llegó."], 1, 1],
  ["¿De dónde eres?", ["Soy de Francia.", "Tengo veinte años.", "Estoy bien."], 0, 1],
  ["¿Cuánta gente vendrá?", ["Unas veinte personas.", "En la sala.", "Vinieron ayer."], 0, 1],
  ["¿Por qué llegas tarde?", ["A las nueve.", "Porque había mucho tráfico.", "En coche."], 1, 2],
  ["¿Cómo fue el examen?", ["Muy bien, creo.", "En la universidad.", "Mañana."], 0, 2],
  ["¿Me puedes ayudar con esto?", ["Claro, ahora mismo.", "Es difícil.", "No lo sé."], 0, 2],
  ["¿Has terminado el informe?", ["Casi, me falta poco.", "Es largo.", "En la oficina."], 0, 2],
  ["¿De quién es este abrigo?", ["Creo que es de Ana.", "Hace frío.", "En el armario."], 0, 2],
  ["¿Prefieres té o café?", ["Un café, por favor.", "Sí, gracias.", "Está caliente."], 0, 2],
  ["¿Vamos andando o en metro?", ["En metro es más rápido.", "Sí, vamos.", "Es lejos."], 0, 2],
  ["¿Qué te ha parecido la película?", ["Me ha encantado.", "En el cine.", "A las diez."], 0, 2],
  ["¿Desde cuándo vives aquí?", ["Desde hace tres años.", "En el segundo piso.", "Sí, vivo aquí."], 0, 2],
  ["¿No habíamos quedado a las siete?", ["No, lo cambiamos a las ocho.", "En la plaza.", "Llegó pronto."], 0, 3],
  ["¿Te importa si abro la ventana?", ["No, en absoluto.", "Está cerrada.", "Sí, la ventana."], 0, 3],
  ["El nuevo compañero empezó hoy, ¿verdad?", ["Sí, esta mañana.", "En recursos humanos.", "Es muy alto."], 0, 3]
];
