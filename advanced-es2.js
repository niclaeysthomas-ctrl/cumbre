/* ============================================================
   CUMBRE — Enrichissement 2 : leçons B2-C1 ciblant les pièges francophones
   Charger APRÈS data.js, exam-data.js, translations.js.
   ============================================================ */

window.LESSONS.push(
  {
    id: "cambio", title: "Verbos de cambio (« devenir »)", tag: "B2 · Le changement",
    note: "L'espagnol n'a pas un « devenir » unique : ponerse + adjectif (état/émotion passagère : se puso rojo/nervioso), volverse + adj (changement durable, involontaire : se volvió egoísta), hacerse + nom/adj (progressif, souvent voulu : se hizo médico/rico), quedarse + adj (résultat, souvent négatif : se quedó ciego/solo), convertirse en / llegar a ser + nom (transformation, aboutissement).",
    q: [
      ["Cuando le dieron la noticia, ______ muy nervioso.", ["se puso", "se hizo", "se volvió", "se quedó"], 0, "Émotion passagère → ponerse : se puso nervioso."],
      ["Con mucho esfuerzo, ______ médico.", ["se puso", "se hizo", "se volvió", "se quedó"], 1, "Profession/effort → hacerse : se hizo médico."],
      ["Después del accidente, ______ ciego.", ["se puso", "se hizo", "se volvió", "se quedó"], 3, "Résultat (souvent négatif) → quedarse : se quedó ciego."],
      ["Con el tiempo, ______ una persona muy egoísta.", ["se puso", "se hizo", "se volvió", "se quedó"], 2, "Changement durable involontaire → volverse : se volvió egoísta."],
      ["Ese pueblo ______ una gran ciudad.", ["se puso", "se quedó", "se convirtió en", "se hizo"], 2, "Transformation → convertirse en."],
      ["Al oír el piropo, ______ rojo como un tomate.", ["se puso", "se hizo", "se volvió", "se quedó"], 0, "Changement physique momentané → ponerse : se puso rojo."],
      ["A base de trabajar, ______ rico.", ["se puso", "se hizo", "se volvió", "se quedó"], 1, "Évolution progressive → hacerse rico."],
      ["Al final de la reunión, todos ______ callados.", ["se pusieron", "se hicieron", "se volvieron", "se quedaron"], 3, "État final/résultat → quedarse callados."]
    ]
  },
  {
    id: "serestaravz", title: "Ser/Estar avanzado", tag: "B2-C1 · Nuance",
    note: "Certains adjectifs CHANGENT de sens selon ser ou estar : ser listo (malin) / estar listo (prêt) ; ser bueno (bon, gentil) / estar bueno (délicieux, en forme) ; ser rico (riche) / estar rico (délicieux) ; ser aburrido (ennuyeux) / estar aburrido (s'ennuyer) ; ser orgulloso (orgueilleux) / estar orgulloso (fier) ; estar vivo (vivant) ; estar verde (pas mûr).",
    q: [
      ["Este niño ______ muy listo, aprende rapidísimo.", ["es", "está"], 0, "listo = malin → ser."],
      ["¿Nos vamos? Ya ______ listo.", ["soy", "estoy"], 1, "listo = prêt → estar."],
      ["Esta tortilla ______ riquísima.", ["es", "está"], 1, "délicieux → estar rico."],
      ["La conferencia ______ muy aburrida, me dormí.", ["era", "estaba"], 0, "ennuyeux (caractéristique) → ser aburrido."],
      ["No hago nada, ______ aburrido en casa.", ["soy", "estoy"], 1, "s'ennuyer (état) → estar aburrido."],
      ["Mi jefe ______ muy orgulloso y nunca admite un error.", ["es", "está"], 0, "orgueilleux (caractère) → ser orgulloso."],
      ["Estos plátanos todavía ______ verdes, no los comas.", ["son", "están"], 1, "pas mûr → estar verde."],
      ["Su abuelo tiene 95 años y todavía ______ vivo.", ["es", "está"], 1, "vivant → estar vivo."]
    ]
  },
  {
    id: "regimen", title: "Verbos + preposición", tag: "B2 · Régime",
    note: "Beaucoup de verbes imposent une préposition précise, souvent différente du français : soñar CON (rêver de), contar CON (compter sur), pensar EN (penser à), tratar DE (essayer de), acordarse DE (se souvenir de), insistir EN, tardar EN (mettre du temps à), depender DE, enamorarse DE (tomber amoureux de), fijarse EN (remarquer).",
    q: [
      ["Siempre sueño ______ viajar a Japón.", ["con", "en", "de", "a"], 0, "soñar CON."],
      ["Puedes contar ______ mi apoyo.", ["en", "con", "de", "a"], 1, "contar CON = compter sur."],
      ["No dejo de pensar ______ ti.", ["de", "en", "con", "a"], 1, "pensar EN."],
      ["Voy a tratar ______ terminarlo hoy.", ["de", "en", "con", "a"], 0, "tratar DE = essayer de."],
      ["No me acuerdo ______ su nombre.", ["de", "en", "con", "a"], 0, "acordarse DE."],
      ["El tren tarda dos horas ______ llegar.", ["de", "a", "en", "por"], 2, "tardar EN."],
      ["Todo depende ______ ti.", ["de", "en", "con", "a"], 0, "depender DE."],
      ["Se enamoró ______ una compañera de clase.", ["de", "en", "con", "a"], 0, "enamorarse DE."]
    ]
  },
  {
    id: "conectores", title: "Conectores del discurso", tag: "C1 · Structurer",
    note: "Pour organiser un texte ou un exposé (clé au C1) : introduire (en primer lugar, para empezar), ajouter (además, asimismo), opposer (sin embargo, no obstante, en cambio), cause (ya que, puesto que, debido a), conséquence (por lo tanto, por consiguiente, así que), conclure (en conclusión, en resumen, en definitiva).",
    q: [
      ["Es tarde; ______, deberíamos volver a casa.", ["sin embargo", "por lo tanto", "además", "por ejemplo"], 1, "Conséquence → por lo tanto."],
      ["El plan es caro; ______, es el único viable.", ["por lo tanto", "sin embargo", "ya que", "es decir"], 1, "Opposition → sin embargo."],
      ["No salimos ______ estaba lloviendo.", ["por lo tanto", "así que", "ya que", "además"], 2, "Cause → ya que."],
      ["______, quiero dar las gracias a todos por venir.", ["Por lo tanto", "En primer lugar", "Sin embargo", "En cambio"], 1, "Introduction → En primer lugar."],
      ["Es un buen profesional; ______, es muy simpático.", ["sin embargo", "además", "ya que", "por eso"], 1, "Addition → además."],
      ["______, podemos concluir que el proyecto es un éxito.", ["Sin embargo", "En resumen", "Además", "Ya que"], 1, "Conclusion → En resumen."],
      ["Él prefiere la ciudad; ella, ______, prefiere el campo.", ["por lo tanto", "en cambio", "además", "así que"], 1, "Contraste → en cambio."],
      ["Se canceló el vuelo ______ la niebla.", ["debido a", "así que", "sin embargo", "aunque"], 0, "Cause + nom → debido a."]
    ]
  }
);

/* --- Items d'examen (B2-C1) --- */
window.EXAM_GRAMMAR.push(
  ["Después de años de esfuerzo, ______ un pintor reconocido.", ["se puso", "se hizo", "se quedó", "se puso a"], 1, "hacerse (évolution) : se hizo.", 2],
  ["Cuenta ______ nosotros para lo que necesites.", ["en", "con", "de", "a"], 1, "contar CON.", 2],
  ["La sopa ______ buenísima, ¿la has probado?", ["es", "está", "son", "era"], 1, "délicieux → estar : está.", 2],
  ["Insistió ______ pagar la cuenta él mismo.", ["de", "en", "con", "a"], 1, "insistir EN.", 2],
  ["Con la crisis, mucha gente ______ pesimista.", ["se puso", "se volvió", "se hizo", "se quedó"], 1, "Changement durable → volverse : se volvió.", 3],
  ["El éxito de la empresa depende ______ la inversión.", ["de", "en", "con", "a"], 0, "depender DE.", 2],
  ["El pueblo ______ en un destino turístico muy popular.", ["se hizo", "se convirtió", "se puso", "se quedó"], 1, "convertirse EN : se convirtió.", 3],
  ["No me fijé ______ el detalle que mencionas.", ["de", "en", "con", "a"], 1, "fijarse EN.", 3],
  ["El proyecto es arriesgado; ______, vale la pena intentarlo.", ["por lo tanto", "no obstante", "ya que", "es decir"], 1, "Opposition soutenue → no obstante.", 3],
  ["Al recibir el premio, ______ a llorar de la emoción.", ["se puso", "se hizo", "se quedó", "se volvió"], 0, "ponerse a + inf = se mettre à : se puso a llorar.", 3],
  ["Tardé una hora ______ encontrar aparcamiento.", ["de", "a", "en", "por"], 2, "tardar EN.", 2],
  ["Este ejercicio ______ muy fácil, lo hago en un minuto.", ["es", "está", "son", "era"], 0, "caractéristique → ser : es.", 2]
);

/* --- Traductions (Verbos & régime) --- */
window.TRANSLATIONS.push(
  { fr:"Il est devenu médecin après des années d'études.", en:"Se hizo médico tras años de estudio.", alt:["Llegó a ser médico tras años de estudio."], cat:"Verbos & régime", point:"verbos de cambio (hacerse)", note:"« devenir + profession » par l'effort → hacerse : se hizo médico.", level:"B2" },
  { fr:"Elle est devenue folle de joie.", en:"Se volvió loca de alegría.", alt:["Se puso loca de alegría."], cat:"Verbos & régime", point:"volverse / ponerse", note:"Changement durable → volverse ; réaction ponctuelle → ponerse.", level:"B2" },
  { fr:"Tu peux compter sur moi.", en:"Puedes contar conmigo.", alt:[], cat:"Verbos & régime", point:"contar con", note:"« compter sur » → contar CON ; « conmigo » = avec moi.", level:"B1" },
  { fr:"Je rêve de vivre à l'étranger.", en:"Sueño con vivir en el extranjero.", alt:[], cat:"Verbos & régime", point:"soñar con", note:"« rêver de » → soñar CON + infinitif.", level:"B1" },
  { fr:"Ça dépend de toi.", en:"Depende de ti.", alt:[], cat:"Verbos & régime", point:"depender de", note:"« dépendre de » → depender DE.", level:"A2" },
  { fr:"Le village est devenu une grande ville.", en:"El pueblo se convirtió en una gran ciudad.", alt:[], cat:"Verbos & régime", point:"convertirse en", note:"Transformation → convertirse EN.", level:"B2" },
  { fr:"Il a mis deux heures à répondre.", en:"Tardó dos horas en responder.", alt:[], cat:"Verbos & régime", point:"tardar en", note:"« mettre du temps à » → tardar EN.", level:"B1" },
  { fr:"Ce plat est délicieux.", en:"Este plato está riquísimo.", alt:["Este plato está buenísimo."], cat:"Verbos & régime", point:"estar (goût)", note:"« délicieux » → estar rico/bueno (jamais ser).", level:"B1" },
  { fr:"Il est très malin, il comprend tout vite.", en:"Es muy listo, lo entiende todo rápido.", alt:[], cat:"Verbos & régime", point:"ser listo", note:"« malin » → ser listo (≠ estar listo = prêt).", level:"B1" },
  { fr:"Elle s'est mise à pleurer.", en:"Se puso a llorar.", alt:[], cat:"Verbos & régime", point:"ponerse a + inf", note:"« se mettre à » → ponerse a + infinitif.", level:"B1" },
  { fr:"Je ne me souviens pas de son adresse.", en:"No me acuerdo de su dirección.", alt:["No recuerdo su dirección."], cat:"Verbos & régime", point:"acordarse de", note:"« se souvenir de » → acordarse DE (pronominal) ; ou « recordar » (transitif, sans de).", level:"B1" },
  { fr:"Bien qu'il fasse froid, nous sortirons.", en:"Aunque haga frío, saldremos.", alt:["Aunque hace frío, saldremos."], cat:"Verbos & régime", point:"aunque + subj/ind", note:"Hypothèse/futur → subj « haga » ; fait constaté → indicatif « hace ».", level:"C1" }
);
