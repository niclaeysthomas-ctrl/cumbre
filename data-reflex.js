/* ============================================================
   CUMBRE — Drill « au réflexe » : SER/ESTAR & POR/PARA
   Objectif : automatiser le bon choix par le volume.
   SERESTAR_DRILL : [phrase(avec ___), forme JUSTE, forme FAUSSE, explication courte]
   PORPARA_DRILL  : [phrase(avec ___), 'por'|'para', explication courte]
   Tous les items vérifiés à la main.
   ============================================================ */
window.SERESTAR_DRILL = [
  // — SER : identité / caractéristique / origine / matière / possession —
  ["María ______ profesora de historia.", "es", "está", "Profession → ser."],
  ["Este anillo ______ de oro.", "es", "está", "Matière → ser."],
  ["El coche ______ de mi hermano.", "es", "está", "Possession → ser."],
  ["Nosotros ______ de Sevilla.", "somos", "estamos", "Origine → ser."],
  ["Mi abuela ______ muy generosa.", "es", "está", "Caractère durable → ser."],
  ["Barcelona ______ una ciudad preciosa.", "es", "está", "Définition/identité → ser (une ville EST)."],
  ["El regalo ______ para ti.", "es", "está", "Destinataire → ser (es para ti)."],
  ["Estos zapatos ______ muy caros.", "son", "están", "Caractéristique (prix habituel) → ser."],
  // — SER : heure, date, événement (le grand piège du lieu d'un événement) —
  ["Ya ______ las tres de la tarde.", "son", "están", "Heure → ser (son las…)."],
  ["La conferencia ______ el lunes por la mañana.", "es", "está", "Un ÉVÉNEMENT « a lieu » → ser."],
  ["La fiesta ______ en casa de Ana.", "es", "está", "LIEU d'un ÉVÉNEMENT → ser (piège : événement, pas objet)."],
  ["¿Cuánto ______ todo? — Veinte euros.", "es", "está", "Prix total → ser."],
  ["El examen ______ importante para la nota.", "es", "está", "Jugement/généralité → ser."],
  // — ESTAR : état passager / lieu / résultat / gérondif —
  ["Los niños ______ cansados tras el partido.", "están", "son", "État passager → estar."],
  ["Madrid ______ en el centro de España.", "está", "es", "Localisation → estar."],
  ["La sopa ______ demasiado caliente.", "está", "es", "Condition ponctuelle → estar."],
  ["¿Dónde ______ mis llaves?", "están", "son", "Localisation → estar."],
  ["El museo ______ cerrado los lunes.", "está", "es", "Résultat/état → estar cerrado."],
  ["Ahora mismo ______ estudiando para el examen.", "estoy", "soy", "estar + gérondif → estar."],
  ["Después del viaje ______ muy contentos.", "estamos", "somos", "Humeur/état → estar."],
  ["El vaso ______ roto, ten cuidado.", "está", "es", "Résultat d'un changement → estar roto."],
  ["Mi hermano ______ de vacaciones esta semana.", "está", "es", "« estar de » (situation temporaire) → estar."],
  ["El cielo ______ nublado hoy.", "está", "es", "Météo ponctuelle → estar."],
  ["El agua del mar ______ fría en abril.", "está", "es", "Condition ponctuelle → estar."],
  // — Adjectifs qui CHANGENT DE SENS (le vrai C1) —
  ["Tu hijo ______ muy listo, entiende todo enseguida.", "es", "está", "« ser listo » = malin, intelligent."],
  ["Ya podemos salir, ______ listos.", "estamos", "somos", "« estar listo » = être prêt (≠ ser listo = malin)."],
  ["Esta película ______ muy aburrida, me dormí.", "es", "está", "« ser aburrido » = ennuyeux (la chose)."],
  ["No sé qué hacer, ______ muy aburrido en casa.", "estoy", "soy", "« estar aburrido » = s'ennuyer (l'état)."],
  ["Su familia ______ muy rica, tienen tres casas.", "es", "está", "« ser rico » = riche."],
  ["¡Prueba el pastel! ______ riquísimo.", "está", "es", "« estar rico » = délicieux (goût)."],
  ["Pedro ______ muy bueno, siempre ayuda a todos.", "es", "está", "« ser bueno » = bon/gentil (caractère)."],
  ["No ha venido porque ______ malo, tiene gripe.", "está", "es", "« estar malo » = être malade."],
  ["Todavía no comas los plátanos, ______ verdes.", "están", "son", "« estar verde » = pas mûr (≠ ser verde = couleur)."],
  ["¡Qué guapo ______ hoy con ese traje!", "estás", "eres", "« estar guapo » = beau aujourd'hui (ponctuel) ≠ ser guapo."],
  ["Mi vecino ______ muy interesado, solo piensa en el dinero.", "es", "está", "« ser interesado » = vénal (caractère)."],
  ["______ muy interesado en ese puesto de trabajo.", "Estoy", "Soy", "« estar interesado en » = intéressé par (état)."]
];

window.PORPARA_DRILL = [
  // — PARA : but, destinataire, destination, échéance, opinion, usage —
  ["Estudio mucho ______ aprobar el examen.", "para", "But → para."],
  ["Este regalo es ______ ti.", "para", "Destinataire → para."],
  ["Salimos ______ Madrid a las ocho.", "para", "Destination → para."],
  ["Tenemos que entregarlo ______ el viernes.", "para", "Échéance → para."],
  ["______ mí, es la mejor solución.", "para", "Opinion → para mí."],
  ["______ ser tan joven, toca muy bien.", "para", "Contraste → « para ser… »."],
  ["Necesito una crema ______ las manos.", "para", "Usage → para."],
  ["Estudia ______ médico.", "para", "But (devenir) → estudiar para."],
  ["Reservé una mesa ______ dos personas.", "para", "Destination/usage → una mesa para dos."],
  ["Salgo ahora ______ llegar a tiempo.", "para", "But → para."],
  ["Es un ejercicio difícil ______ un principiante.", "para", "Point de vue → para."],
  ["Trabaja duro ______ que sus hijos estudien.", "para", "« para que » + subjonctif = but."],
  // — POR : cause, prix, moyen, durée, passage, échange, agent —
  ["Gracias ______ tu ayuda.", "por", "Cause/motif → por."],
  ["Pagué cincuenta euros ______ estos zapatos.", "por", "Prix/échange → por."],
  ["Hablamos ______ teléfono cada domingo.", "por", "Moyen → por."],
  ["Estuvimos en Italia ______ dos semanas.", "por", "Durée → por."],
  ["Paseamos ______ el parque toda la tarde.", "por", "Lieu de passage → por."],
  ["No salí ______ la lluvia.", "por", "Cause → por."],
  ["Si no puedes ir, iré yo ______ ti.", "por", "À la place de → por."],
  ["Voy al súper ______ pan.", "por", "En quête de (ir por) → por."],
  ["La novela fue escrita ______ García Márquez.", "por", "Agent (voix passive) → por."],
  ["Nos vemos dos veces ______ semana.", "por", "Fréquence → por."],
  ["Te llamo mañana ______ la mañana.", "por", "Moment de la journée → por la mañana."],
  ["Cámbialo ______ otro más grande.", "por", "Échange → por."],
  ["Lo felicité ______ su ascenso.", "por", "Motif (féliciter pour) → por."],
  ["Este tren pasa ______ Valencia.", "por", "Lieu de passage → por."],
  ["Vendió el cuadro ______ mil euros.", "por", "Prix → por."],
  ["Brindo ______ tu éxito.", "por", "En l'honneur de → por."],
  // — POR : locutions figées à automatiser —
  ["¡______ fin llegaste!", "por", "Locution : « por fin » (enfin)."],
  ["______ supuesto que te ayudo.", "por", "« por supuesto » (bien sûr)."],
  ["Estaba cansado; ______ eso me fui.", "por", "« por eso » (c'est pourquoi)."],
  ["______ lo visto, no va a venir.", "por", "« por lo visto » (apparemment)."],
  ["Coge el paraguas ______ si acaso.", "por", "« por si acaso » (au cas où)."],
  ["______ cierto, ¿has visto a Ana?", "por", "« por cierto » (au fait)."],
  ["Lo dejamos ______ imposible.", "por", "« dar por + adj » → por."],
  ["Hazlo ______ mí, te lo pido.", "por", "Faveur/cause → por (por mí)."]
];
