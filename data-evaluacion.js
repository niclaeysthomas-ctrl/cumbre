/* ============================================================
   CUMBRE — BANQUE D'ÉVALUATION (réservée à la mesure)
   2026-11-11. Ces questions ne servent QU'AU TEST DE NIVEAU.
   Elles n'apparaissent dans aucun entraînement, et une question ratée
   ici ne part PAS dans « Revoir mes erreurs ».
   ------------------------------------------------------------
   POURQUOI. Jusqu'à aujourd'hui, l'épreuve d'écoute du test était
   EXAM_LISTEN — c'est-à-dire exactement l'exercice d'écoute quotidien.
   On s'entraînait sur l'épreuve, on rejouait ses erreurs d'examen dans
   « Revoir mes erreurs », et le score montait sans que l'espagnol bouge.
   Une mesure qu'on révise n'est plus une mesure.
   ------------------------------------------------------------
   RÈGLES DE CETTE BANQUE, à tenir :
   1. Rien de ce fichier n'est proposé en entraînement. Jamais.
   2. Les erreurs d'évaluation ne sont pas rejouées.
   3. Les items les MOINS utilisés sont tirés en premier (evalLeastUsed) :
      60 questions de grammaire pour 15 par test = quatre tests avant de
      revoir une question.
   4. Un test tous les deux mois. Plus souvent, on mesure du bruit.
   Formats identiques aux banques d'entraînement :
     EVAL_GRAMMAR : [énoncé avec ______, options, index correct, explication, difficulté 1-3]
     EVAL_LISTEN  : [phrase lue à voix haute, options, index correct, difficulté]
     EVAL_READING : { id, title, diff, text, qs:[[question, options, index, explication]] }
   ============================================================ */

window.EVAL_GRAMMAR = [
  ["No creo que ______ razón en este asunto.", ["tiene", "tenga", "tendrá", "tuviera"], 1, "no creer que + subjonctif présent : l'opinion niée entraîne le subjonctif.", 2],
  ["Me molesta que la gente ______ sin escuchar.", ["opina", "opine", "opinara", "opinaría"], 1, "Verbe de sentiment + que → subjonctif ; concordance au présent.", 2],
  ["Si ______ antes, habríamos cogido el tren.", ["salimos", "saliéramos", "hubiéramos salido", "habíamos salido"], 2, "Condition irréelle du passé : si + plus-que-parfait du subjonctif → conditionnel composé.", 3],
  ["Por mucho que ______, no lo vas a convencer.", ["insistes", "insistas", "insistirás", "insistías"], 1, "por mucho que + subjonctif quand l'effort est envisagé, non constaté.", 3],
  ["En cuanto ______ la respuesta, te aviso.", ["tengo", "tenga", "tendré", "tuviera"], 1, "Conjonction temporelle + futur → subjonctif présent. Jamais de futur après en cuanto.", 2],
  ["Lo hizo sin que nadie se ______ cuenta.", ["da", "diera", "dé", "daba"], 1, "sin que + subjonctif ; concordance au passé → imparfait du subjonctif.", 2],
  ["Es la película más rara ______ he visto nunca.", ["de las que", "que", "la que", "cual"], 1, "Superlatif + que + passé composé. L'ajout de « de las que » est un calque.", 2],
  ["Llevaba dos horas ______ cuando llegamos.", ["esperar", "esperando", "esperado", "que esperaba"], 1, "llevar + gérondif = durée depuis. « Llevaba esperando dos horas ».", 1],
  ["______ lo dijeras tú, no me lo creería.", ["Aunque", "Si", "Como", "Mientras"], 0, "aunque + subjonctif = « même si », hypothèse concédée.", 2],
  ["Se fue del país ______ no volver jamás.", ["por", "para", "a", "de"], 1, "para + infinitif = but. por exprimerait la cause.", 1],
  ["Lo compré ______ veinte euros.", ["para", "por", "de", "en"], 1, "por = prix, échange. « por veinte euros ».", 1],
  ["Nos prometió que lo ______ antes del lunes.", ["termina", "termine", "terminaría", "terminará"], 2, "Discours rapporté au passé : le futur devient conditionnel.", 2],
  ["Ojalá no ______ tanto el mes pasado.", ["llueve", "llovió", "hubiera llovido", "llueva"], 2, "Ojalá + plus-que-parfait du subjonctif : regret sur le passé.", 3],
  ["Cuanto más lo pienso, ______ lo entiendo.", ["menos", "menor", "poco", "nada"], 0, "Corrélation cuanto más… menos… (invariable devant un verbe).", 2],
  ["Habrá unas cien personas, ______ que no quepan todas.", ["así", "de modo", "así es", "de ahí"], 3, "de ahí que + subjonctif = « d'où le fait que ».", 3],
  ["Nada más ______, se dio cuenta del error.", ["entrar", "entrando", "que entró", "entrado"], 0, "nada más + INFINITIF = dès que. Tournure très fréquente, piège classique.", 3],
  ["No es que no ______ ganas, es que no tengo tiempo.", ["tengo", "tenga", "tendría", "tuve"], 1, "no es que + subjonctif : on écarte une explication.", 2],
  ["El problema ______ te hablé sigue sin resolverse.", ["que", "del que", "el que", "cual"], 1, "hablar DE algo → relatif avec préposition : del que.", 2],
  ["Se lo dije a ella, no ______ ti.", ["a", "para", "por", "de"], 0, "Complément d'objet indirect de personne : a ti.", 1],
  ["Acabo ______ llegar de Madrid.", ["por", "de", "a", "en"], 1, "acabar de + infinitif = venir de. acabar por = finir par.", 1],
  ["Como no ______ pronto, nos vamos sin él.", ["llega", "llegue", "llegara", "llegaría"], 1, "como + subjonctif = condition menaçante (« si jamais »).", 3],
  ["Siento mucho que ______ que irte tan pronto.", ["tienes", "tengas", "tuvieras", "tendrás"], 1, "sentir que + subjonctif.", 1],
  ["Es imprescindible que todos ______ a la hora.", ["llegan", "lleguen", "llegarán", "llegaban"], 1, "Es imprescindible que + subjonctif.", 1],
  ["Está ______ de que le den una respuesta.", ["esperando", "a la espera", "esperar", "espera"], 1, "a la espera de que + subjonctif. Registre soutenu.", 2],
  ["Me consta ______ hizo todo lo posible.", ["de que", "que", "el que", "a que"], 1, "constar que, sans préposition : ajouter « de » est du dequeísmo.", 3],
  ["Estoy seguro ______ vendrá.", ["que", "de que", "a que", "en que"], 1, "estar seguro DE que : ici la préposition est obligatoire (queísmo si on l'omet).", 3],
  ["Se puso a llorar ______ oír la noticia.", ["al", "en", "por", "de"], 0, "al + infinitif = au moment où.", 1],
  ["No hay nadie que ______ hacerlo mejor.", ["sabe", "sepa", "sabría", "supiera"], 1, "Antécédent nié ou indéfini → relative au subjonctif.", 2],
  ["Busco un piso que ______ terraza.", ["tiene", "tenga", "tendrá", "tuviera"], 1, "Antécédent non identifié → subjonctif. Avec « tiene », le logement existe déjà.", 2],
  ["Vivo aquí ______ hace diez años.", ["desde", "desde hace", "hace", "por"], 2, "« hace diez años » suffit ; « desde hace » est correct sans « vivo aquí desde ».", 2],
  ["Lo terminaré ______ el viernes.", ["por", "para", "hasta", "en"], 1, "para = échéance. por indiquerait une durée approximative.", 1],
  ["______ mucho que trabaje, nunca le reconocen nada.", ["Aun", "Aunque", "Por", "Pese"], 2, "Por mucho que + subjonctif (concession d'intensité).", 3],
  ["Se me ______ las llaves en casa.", ["olvidé", "olvidaron", "olvidó", "he olvidado"], 1, "Tournure pronominale d'accident : le sujet est « las llaves » → pluriel.", 2],
  ["A mí me ______ los documentos ayer.", ["entregué", "entregaron", "entregó", "entregaba"], 1, "Sujet indéfini (on) → 3ᵉ personne du pluriel.", 1],
  ["Dudo que ______ terminado a tiempo.", ["han", "hayan", "habrán", "habían"], 1, "dudar que + subjonctif ; action achevée → subjonctif passé.", 2],
  ["Nos quedamos ______ saber qué pasó.", ["sin", "para", "por", "de"], 0, "quedarse sin + infinitif = rester sans (ne pas obtenir).", 2],
  ["Cada vez que lo ______, me cuenta lo mismo.", ["veo", "vea", "viera", "veré"], 0, "Habitude réelle au présent → indicatif.", 1],
  ["Trabaja como si no ______ nada que perder.", ["tiene", "tenga", "tuviera", "tendría"], 2, "como si + imparfait du subjonctif, toujours.", 2],
  ["Le pedí que me ______ un favor.", ["hace", "haga", "hiciera", "haría"], 2, "Verbe de volonté au passé → imparfait du subjonctif.", 1],
  ["De haberlo ______, no habría venido.", ["sabido", "sabiendo", "sabe", "sepa"], 0, "de + infinitif composé = condition irréelle du passé, registre soutenu.", 3],
  ["Es un asunto ______ índole muy delicada.", ["de", "con", "en", "por"], 0, "de índole + adjectif : « d'une nature… ». Figé.", 3],
  ["Nos vemos ______ que acabe la reunión.", ["cuando", "en cuanto", "mientras", "desde"], 1, "en cuanto = dès que + subjonctif pour le futur.", 2],
  ["No pienso ______ por vencido.", ["darme", "darse", "dar", "dándome"], 0, "darse por vencido : le pronom s'accorde au sujet (yo → darme).", 2],
  ["Vino ______ que nadie lo invitara.", ["sin", "para", "por", "aun"], 0, "sin que + subjonctif.", 1],
  ["Ya ______ dos años que no lo veo.", ["son", "hace", "está", "lleva"], 1, "hace + durée (impersonnel, toujours au singulier).", 1],
  ["Está deseando que ______ las vacaciones.", ["llegan", "lleguen", "llegarán", "llegaban"], 1, "desear que + subjonctif.", 1],
  ["Me lo contó tal y ______ había pasado.", ["cómo", "como", "cual", "que"], 1, "tal y como, sans accent : comparaison, non interrogation.", 2],
  ["Por si ______, lleva el paraguas.", ["llueve", "llueva", "lloviera", "llovería"], 0, "por si + indicatif dans l'usage courant (por si acaso llueve).", 2],
  ["Lo haré ______ pueda.", ["en cuanto", "en cuanto que", "cuanto", "cuando que"], 0, "en cuanto + subjonctif. « en cuanto que » signifie « en tant que ».", 2],
  ["Se comporta ______ un niño.", ["como", "cómo", "que", "igual"], 0, "como = comme (comparaison), sans accent.", 1],
  ["No me acuerdo ______ su nombre.", ["de", "a", "en", "por"], 0, "acordarse DE algo. (Mais recordar algo, sans préposition.)", 2],
  ["Insistió ______ que lo acompañáramos.", ["en", "a", "de", "por"], 0, "insistir EN que + subjonctif.", 2],
  ["Se empeñó ______ hacerlo solo.", ["de", "en", "a", "por"], 1, "empeñarse EN + infinitif = s'obstiner à.", 3],
  ["Quedamos ______ vernos el jueves.", ["de", "en", "a", "por"], 1, "quedar EN algo = convenir de. (quedar con alguien = donner rendez-vous.)", 3],
  ["Está harto ______ que le digan lo mismo.", ["de", "con", "por", "en"], 0, "estar harto DE que + subjonctif.", 2],
  ["Nos avisó de que ______ un retraso.", ["hay", "haya", "había", "hubiera"], 2, "Discours rapporté au passé : présent → imparfait.", 2],
  ["Cuanto antes lo hagas, ______.", ["mejor", "el mejor", "más mejor", "mejor que"], 0, "cuanto antes…, mejor : formule figée.", 1],
  ["Tiene fama ______ ser muy exigente.", ["de", "en", "por", "a"], 0, "tener fama DE + infinitif.", 2],
  ["No vaya a ser que se ______.", ["enfada", "enfade", "enfadara", "enfadaría"], 1, "no vaya a ser que + subjonctif : crainte préventive.", 3],
  ["Se lo dije ______ que lo supiera.", ["por", "para", "a", "de"], 1, "para que + subjonctif = but.", 1]
];

/* ------------------------------------------------------------
   ÉCOUTE — 30 items. On entend la phrase, on choisit la réponse
   qui s'enchaîne. Ces 30-là ne sont jamais proposées à l'entraînement.
   ------------------------------------------------------------ */
window.EVAL_LISTEN = [
  ["¿Te importaría echarme una mano con esto?", ["Claro, dime qué hago.", "Sí, me importa mucho.", "No, no me gusta nada."], 0, 2],
  ["¿Qué tal si lo dejamos para el lunes?", ["Por mí perfecto.", "Lo dejé el lunes.", "Es que el lunes fue ayer."], 0, 2],
  ["Se me ha ido el santo al cielo.", ["¿Otra vez te has despistado?", "¿Y a qué hora sale el vuelo?", "Pues reza un poco más."], 0, 3],
  ["Llevo toda la mañana dándole vueltas.", ["Pues déjalo estar un rato.", "Pues gira a la derecha.", "Pues súbete al coche."], 0, 3],
  ["No te lo tomes a mal, pero no me convence.", ["Tranquilo, prefiero que me lo digas.", "Pues yo lo tomé bien frío.", "Me lo tomo con leche."], 0, 2],
  ["¿Me puedes pasar el cargador?", ["Toma, está enchufado ahí.", "Sí, cargué el coche ayer.", "No, ya pagué yo."], 0, 1],
  ["Está todo manga por hombro.", ["Ya recojo yo un poco.", "Pues ponte otra camisa.", "Me duele el hombro, sí."], 0, 3],
  ["¿A qué hora te viene bien quedar?", ["Sobre las siete, si te parece.", "Me viene muy bien, gracias.", "Quedé bien con todos."], 0, 1],
  ["Me han dado plantón.", ["Vaya, ¿y no te avisó?", "¿Y qué planta era?", "Pues riégala poco."], 0, 3],
  ["Ni se te ocurra decírselo.", ["Descuida, no diré nada.", "Se me ocurrió ayer.", "Vale, se lo digo mañana."], 0, 2],
  ["¿Te queda mucho para terminar?", ["Un cuarto de hora como mucho.", "Me queda grande, sí.", "Terminé hace un mes."], 0, 1],
  ["Lo dejamos en el aire, entonces.", ["Vale, ya lo concretamos.", "Sí, hace mucho viento.", "Lo dejé en la mesa."], 0, 3],
  ["Me da corte preguntárselo.", ["Si quieres se lo pregunto yo.", "Pues córtalo tú.", "¿Y cuánto te costó?"], 0, 3],
  ["¿Cómo llevas lo del traslado?", ["Pues con mucha pereza, la verdad.", "Lo llevo en la maleta.", "Llevo dos horas aquí."], 0, 2],
  ["Se nos ha ido de las manos.", ["Habrá que replantearlo todo.", "Pues lávatelas bien.", "A mí no se me cayó."], 0, 3],
  ["No doy abasto con tanto trabajo.", ["¿Por qué no delegas algo?", "Pues compra más abastos.", "Yo tampoco doy clases."], 0, 3],
  ["¿Sabes si abren los domingos?", ["Creo que hasta las dos.", "Sí, lo abrí yo.", "El domingo fue ayer."], 0, 1],
  ["Está al caer.", ["Entonces esperamos un poco.", "Pues que no se caiga.", "Se cayó la semana pasada."], 0, 3],
  ["Me suena su cara de algo.", ["A lo mejor del gimnasio.", "Pues súbele el volumen.", "Suena muy bien, sí."], 0, 2],
  ["¿Te hace un café?", ["Venga, pero rápido.", "Lo hace muy bien.", "Lo hice yo esta mañana."], 0, 2],
  ["Lo que faltaba.", ["Ya, hoy no es tu día.", "Pues cómpralo.", "No falta nadie."], 0, 2],
  ["He quedado en llamarle mañana.", ["Pues no se te olvide.", "Yo me quedé en casa.", "Llamé yo anoche."], 0, 2],
  ["Como sigas así, te vas a agotar.", ["Tienes razón, voy a parar.", "Sigo recto, entonces.", "Lo agoté todo ayer."], 0, 3],
  ["No es por nada, pero te lo avisé.", ["Ya, ya… tenías razón.", "Gracias por nada.", "¿Avisaste a la policía?"], 0, 3],
  ["¿Qué te ha parecido la reunión?", ["Un poco larga, para lo que era.", "Me pareció en la calle.", "Nos reunimos el jueves."], 0, 2],
  ["Dale recuerdos de mi parte.", ["De tu parte, sin falta.", "No recuerdo nada.", "Mi parte es esta."], 0, 2],
  ["Se me hace cuesta arriba madrugar.", ["A mí también, no veas.", "Yo subo por la cuesta.", "Arriba está cerrado."], 0, 3],
  ["¿Me echas un cable con el informe?", ["Dame diez minutos y lo vemos.", "El cable está roto.", "Lo eché a la basura."], 0, 3],
  ["Total, que al final no fui.", ["Pues te perdiste una buena.", "El total son treinta euros.", "Fui yo el que fue."], 0, 3],
  ["Tengo la mosca detrás de la oreja.", ["¿Crees que nos oculta algo?", "Pues espántala.", "A mí me pican mucho."], 0, 3]
];

/* ------------------------------------------------------------
   LECTURE — 8 passages, 4 questions chacun. Textes d'opinion,
   registre C1. Réservés à l'évaluation.
   ------------------------------------------------------------ */
window.EVAL_READING = [
{ id:"ev_ruido", title:"El derecho al silencio", diff:3,
  text:"Durante décadas, el ruido se consideró el precio inevitable del progreso: una ciudad que suena es una ciudad que funciona. Esa idea empieza a resquebrajarse. Los estudios epidemiológicos han dejado de tratar el ruido como una molestia estética para situarlo donde corresponde, entre los factores de riesgo cardiovascular. Lo llamativo no es el hallazgo, sino la lentitud con que se ha traducido en normas. Mientras la contaminación del aire ha generado zonas de bajas emisiones y titulares, la acústica sigue relegada a ordenanzas municipales que nadie fiscaliza. Quizá porque el ruido no deja rastro: no mancha las fachadas ni se mide en los pulmones de nadie con una fotografía elocuente. Hay, además, una resistencia cultural. Pedir silencio suena a privilegio, a vecino quisquilloso, casi a enemigo de la fiesta. Y sin embargo el silencio no es un lujo estético: es la condición del sueño, y el sueño, la condición de todo lo demás.",
  qs:[
    ["El autor sostiene que el ruido…", ["es un problema estético menor", "ha sido reconocido como riesgo sanitario sin que la norma lo siga", "ya está correctamente regulado", "preocupa más que la contaminación del aire"], 1, "« Los estudios… lo sitúan entre los factores de riesgo » mais « la lentitud con que se ha traducido en normas »."],
    ["¿Por qué, según el texto, el ruido recibe menos atención que el aire?", ["porque es menos frecuente", "porque no deja rastro visible ni imágenes elocuentes", "porque afecta a menos gente", "porque es más caro de medir"], 1, "« el ruido no deja rastro: no mancha las fachadas… »"],
    ["« Esa idea empieza a resquebrajarse » significa que…", ["se refuerza", "se agrieta, pierde solidez", "se repite", "se demuestra"], 1, "resquebrajarse = se fissurer."],
    ["La última frase sirve para…", ["relativizar el problema", "rebatir la idea de que pedir silencio es un capricho", "proponer una ley concreta", "criticar a los vecinos"], 1, "« el silencio no es un lujo estético: es la condición del sueño »."]
  ]},
{ id:"ev_merito", title:"La trampa del mérito", diff:3,
  text:"Pocas ideas resultan tan cómodas como la del mérito. Si cada cual ocupa el lugar que se ha ganado, el reparto deja de ser un problema político y pasa a ser una cuestión de esfuerzo individual. El razonamiento es impecable salvo por un detalle: presupone una línea de salida común que no existe. Nadie elige el idioma que se habla en su casa, ni los libros que había en ella, ni la red de contactos que su apellido abre o cierra. Conviene no confundir la crítica con el desprecio al esfuerzo. Que el mérito no lo explique todo no significa que no explique nada; quien se levanta a las seis para estudiar hace algo que quien no se levanta no hace. El problema aparece cuando el mérito deja de ser una descripción parcial para convertirse en una justificación total, y el que queda atrás carga además con la sospecha de no haberlo intentado lo suficiente.",
  qs:[
    ["La objeción central del autor a la idea de mérito es que…", ["el esfuerzo no sirve de nada", "supone un punto de partida igual que no existe", "solo importan los contactos", "nadie se esfuerza ya"], 1, "« presupone una línea de salida común que no existe »."],
    ["¿Qué matiz introduce el autor?", ["que el esfuerzo es irrelevante", "que criticar el mérito no equivale a despreciar el esfuerzo", "que el mérito lo explica todo", "que estudiar no sirve"], 1, "« Conviene no confundir la crítica con el desprecio al esfuerzo »."],
    ["Según el texto, el daño mayor se produce cuando el mérito…", ["se mide mal", "pasa de descripción parcial a justificación total", "se premia poco", "se enseña en la escuela"], 1, "C'est la phrase finale."],
    ["El tono del texto es…", ["irónico y despectivo", "argumentativo y matizado", "neutro y descriptivo", "indignado"], 1, "Il concède puis nuance : « no significa que no explique nada »."]
  ]},
{ id:"ev_memoria", title:"Recordar no es archivar", diff:3,
  text:"Solemos imaginar la memoria como un archivo: hechos guardados que se recuperan intactos. La investigación lleva décadas desmintiéndolo. Cada evocación reescribe ligeramente el recuerdo, que vuelve a almacenarse con las marcas del momento en que fue invocado. Recordar no es leer un expediente; es volver a contarlo, y toda narración elige. Esto tiene consecuencias incómodas. Un testimonio sincero puede ser falso sin que nadie mienta, y la repetición —el mecanismo que creemos garante de fidelidad— es justamente lo que más deforma. De ahí la prudencia de los jueces con los recuerdos demasiado nítidos: una escena recordada con detalle cinematográfico suele haber pasado muchas veces por el taller.",
  qs:[
    ["La tesis del texto es que la memoria…", ["guarda los hechos intactos", "se modifica en cada evocación", "mejora con la repetición", "es siempre fiable si hay sinceridad"], 1, "« Cada evocación reescribe ligeramente el recuerdo »."],
    ["« Un testimonio sincero puede ser falso » porque…", ["el testigo miente", "la memoria se deforma sin intención", "los jueces se equivocan", "los detalles se olvidan"], 1, "Sincérité et exactitude sont deux choses distinctes."],
    ["¿Qué papel juega la repetición?", ["fija el recuerdo", "lo deforma más", "no influye", "lo borra"], 1, "« la repetición… es justamente lo que más deforma »."],
    ["« Haber pasado por el taller » es una imagen que sugiere…", ["autenticidad", "reelaboración, retoque", "olvido", "rapidez"], 1, "El taller = l'atelier de réparation : le souvenir a été retouché."]
  ]},
{ id:"ev_lengua", title:"Lenguas que se apagan", diff:3,
  text:"Una lengua no muere el día en que fallece su último hablante, sino mucho antes: el día en que deja de usarse para discutir de dinero, de amor o de política. Mientras una lengua sirva para pedir un préstamo o para pelearse, está viva, por pocos que sean los que la hablen. Cuando queda reducida a las canciones de la abuela y a los topónimos, ya está embalsamada aunque los censos la cuenten. Por eso las políticas de rescate que se limitan a lo simbólico —señalización bilingüe, festivales, una asignatura semanal— fracasan con tanta frecuencia. Dan dignidad, no utilidad. Y una lengua se transmite por utilidad, no por respeto: los niños aprenden el idioma en el que ocurre la vida.",
  qs:[
    ["Para el autor, una lengua muere cuando…", ["muere su último hablante", "deja de usarse para los asuntos cotidianos importantes", "se deja de enseñar", "pierde su escritura"], 1, "« el día en que deja de usarse para discutir de dinero, de amor o de política »."],
    ["¿Por qué fracasan las políticas simbólicas?", ["porque son caras", "porque dan dignidad pero no utilidad", "porque nadie las aplica", "porque los niños las rechazan"], 1, "C'est la phrase « Dan dignidad, no utilidad »."],
    ["« Ya está embalsamada » quiere decir que la lengua…", ["está protegida y sana", "se conserva sin vida real", "está prohibida", "crece de nuevo"], 1, "Embaumée : conservée mais morte."],
    ["La idea final del texto es que la transmisión depende de…", ["el respeto institucional", "el uso real en la vida", "el número de hablantes", "la escritura"], 1, "« los niños aprenden el idioma en el que ocurre la vida »."]
  ]},
{ id:"ev_prisa", title:"El elogio de la lentitud, revisado", diff:2,
  text:"El discurso contra la prisa se ha vuelto tan común que conviene mirarlo con cierta distancia. Nadie defiende ya vivir corriendo; todos aseguran querer parar. Y sin embargo seguimos corriendo, lo cual sugiere que el problema no está en la falta de convicción sino en otra parte. Buena parte de nuestra prisa no es una elección de carácter, sino una respuesta razonable a sistemas que penalizan la lentitud: un trabajo que mide la productividad por hora, un transporte que castiga el retraso, una ciudad cara donde el tiempo perdido se paga en dinero. Reducirlo a un problema de actitud —«aprende a respirar»— traslada al individuo una carga que es colectiva. La lentitud, como el silencio, se ha convertido en un bien de lujo: lo disfruta quien puede permitírselo.",
  qs:[
    ["¿Qué critica el autor del discurso habitual sobre la prisa?", ["que nadie lo comparta", "que atribuya al individuo un problema de origen colectivo", "que sea demasiado nuevo", "que defienda correr más"], 1, "« traslada al individuo una carga que es colectiva »."],
    ["La contradicción que señala al principio es que…", ["todos quieren parar y sin embargo siguen corriendo", "nadie quiere parar", "la gente corre por gusto", "los sistemas premian la lentitud"], 0, "« todos aseguran querer parar. Y sin embargo seguimos corriendo »."],
    ["« Un bien de lujo » significa aquí que la lentitud…", ["es cara de producir", "solo está al alcance de algunos", "no vale nada", "está de moda"], 1, "« lo disfruta quien puede permitírselo »."],
    ["El texto se apoya sobre todo en…", ["datos estadísticos", "ejemplos de sistemas que penalizan la lentitud", "testimonios personales", "citas de autoridad"], 1, "Travail, transport, ville chère."]
  ]},
{ id:"ev_ia_trabajo", title:"Lo que automatiza y lo que no", diff:3,
  text:"Las previsiones sobre el empleo y la automatización suelen fallar por el mismo sitio: confunden tareas con oficios. Un oficio es un paquete heterogéneo de tareas, y la automatización no se lleva el paquete entero, sino las piezas más codificables. El resultado no suele ser la desaparición del puesto, sino su recomposición: desaparece lo repetitivo, crece lo que exige juicio, trato o responsabilidad. Eso no significa que el cambio sea indoloro. Recomponer un oficio obliga a reaprenderlo, y no todo el mundo tiene la edad, el tiempo o el dinero para hacerlo. Conviene, en todo caso, desconfiar de las cifras redondas: quien anuncia que un porcentaje exacto de empleos desaparecerá en una década suele estar vendiendo algo, sea un informe o una ansiedad.",
  qs:[
    ["El error habitual de las previsiones, según el texto, es…", ["exagerar los plazos", "confundir tareas con oficios", "ignorar la tecnología", "fiarse de los trabajadores"], 1, "C'est la première phrase."],
    ["El efecto más probable de la automatización es…", ["la desaparición del puesto", "su recomposición", "su multiplicación", "ningún efecto"], 1, "« no suele ser la desaparición del puesto, sino su recomposición »."],
    ["¿Qué matiz añade el autor sobre ese cambio?", ["que es indoloro", "que exige reaprender, y no todos pueden", "que es rápido", "que solo afecta a los jóvenes"], 1, "« no todo el mundo tiene la edad, el tiempo o el dinero »."],
    ["La frase final advierte contra…", ["los sindicatos", "las cifras precisas y rotundas", "los informes públicos", "la tecnología"], 1, "« desconfiar de las cifras redondas »."]
  ]},
{ id:"ev_vivienda", title:"Un problema de oferta, y algo más", diff:2,
  text:"Cuando se discute el precio de la vivienda, el debate se atasca enseguida en una disyuntiva falsa: o se construye más, o se regula el alquiler. Quienes defienden lo primero tienen de su parte una regularidad incómoda para sus adversarios: allí donde la oferta no crece, los precios suben, se regule lo que se regule. Quienes defienden lo segundo recuerdan, con igual razón, que construir lleva años y que la gente paga el alquiler el día uno de cada mes. El error está en tratar como alternativas dos medidas que operan en plazos distintos. La regulación es un analgésico; la oferta, un tratamiento. Administrar solo el analgésico cronifica la dolencia; esperar al tratamiento sin calmar el dolor es una crueldad administrativa.",
  qs:[
    ["La tesis del autor es que construir y regular…", ["son incompatibles", "actúan en plazos distintos y se complementan", "son ambas inútiles", "deben elegirse por votación"], 1, "« dos medidas que operan en plazos distintos »."],
    ["¿Qué argumento concede a los partidarios de regular?", ["que los precios bajan siempre", "que el alquiler se paga cada mes y construir lleva años", "que la oferta no importa", "que la vivienda debe ser gratuita"], 1, "« construir lleva años y… el día uno de cada mes »."],
    ["La metáfora del analgésico sugiere que la regulación…", ["cura el problema", "alivia sin resolver", "lo empeora", "es innecesaria"], 1, "Analgésique = soulage la douleur, ne traite pas la cause."],
    ["« Una disyuntiva falsa » es…", ["una elección mal planteada entre dos opciones", "una mentira deliberada", "una pregunta retórica", "un dato erróneo"], 0, "Faux dilemme."]
  ]},
{ id:"ev_deporte", title:"El cuerpo como proyecto", diff:2,
  text:"Nunca se había hecho tanto deporte ni se había disfrutado tan poco haciéndolo. Las aplicaciones han convertido el paseo en una métrica, la carrera en una curva y el descanso en un dato que se justifica. Quien corre con el reloj delante no corre: audita. El cambio es sutil pero profundo: la actividad deja de valer por sí misma y pasa a valer por lo que demuestra. Se entiende el atractivo —medir motiva, y a mucha gente la ha sacado del sofá—, pero conviene recordar lo que se pierde por el camino. El aburrimiento, por ejemplo, que es donde descansa la cabeza; o la posibilidad de un día malo que no haya que explicar a nadie, ni siquiera a una gráfica.",
  qs:[
    ["La crítica principal del texto es que medir el ejercicio…", ["lo hace menos eficaz", "lo convierte en algo que vale por lo que demuestra", "lo encarece", "lo hace peligroso"], 1, "« pasa a valer por lo que demuestra »."],
    ["« Quien corre con el reloj delante no corre: audita » es…", ["una exageración irónica que resume la tesis", "un dato técnico", "una cita", "una recomendación"], 0, "Formule frappante qui condense l'argument."],
    ["¿Qué concesión hace el autor?", ["que medir no motiva a nadie", "que medir ha sacado a mucha gente del sofá", "que el deporte es inútil", "que las apps son gratuitas"], 1, "« medir motiva, y a mucha gente la ha sacado del sofá »."],
    ["Según el final, lo que se pierde es…", ["velocidad y fuerza", "el aburrimiento y el derecho a un mal día sin justificarlo", "tiempo libre", "dinero"], 1, "C'est la dernière phrase."]
  ]}
];
