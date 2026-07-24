/* ============================================================
   CUMBRE — Vocabulaire : vie quotidienne & thèmes sous-couverts
   [ES, FR, exemple ES, thème] (+ 5e champ optionnel = note au reveal)
   Priorité : ce dont on a besoin POUR VIVRE en espagnol.
   Chaque entrée vérifiée absente du corpus existant (pas de doublon SRS).
   ============================================================ */
window.VOCAB = window.VOCAB.concat([

  // --- La vie quotidienne (A2-B1) ---
  ["trasnochar", "veiller très tard", "Trasnoché estudiando para el examen.", "Día a día"],
  ["echar una siesta", "faire une sieste", "Después de comer echo una siesta.", "Día a día"],
  ["hacer la compra", "faire les courses", "Los sábados hacemos la compra.", "Día a día", "« la compra » (alimentaire) ≠ « las compras » (shopping)."],
  ["poner la lavadora", "faire une machine (lessive)", "He puesto la lavadora esta mañana.", "Día a día", "Littéralement « mettre le lave-linge » — tournure figée."],
  ["tender la ropa", "étendre le linge", "Voy a tender la ropa antes de que llueva.", "Día a día"],
  ["planchar", "repasser", "Odio planchar las camisas.", "Día a día"],
  ["fregar los platos", "faire la vaisselle", "Te toca fregar los platos.", "Día a día", "« te toca » = c'est ton tour."],
  ["barrer", "balayer", "Barre el suelo, por favor.", "Día a día"],
  ["la escoba", "le balai", "¿Dónde está la escoba?", "Día a día"],
  ["la almohada", "l'oreiller", "Esta almohada es muy dura.", "Día a día"],
  ["el mando", "la télécommande", "¿Has visto el mando de la tele?", "Día a día"],
  ["el recibo", "le reçu, le ticket", "Guarda el recibo por si acaso.", "Día a día", "« por si acaso » = au cas où."],
  ["apañárselas", "se débrouiller", "No te preocupes, ya me las apaño.", "Día a día", "Verbe pronominal figé (« las » invariable). Synonyme : arreglárselas."],

  // --- Au restaurant / commander (A2-B1) ---
  ["el primero", "l'entrée (1er plat)", "De primero, una ensalada.", "Restaurante", "« de primero / de segundo / de postre » : structure pour commander."],
  ["la cuenta", "l'addition", "La cuenta, por favor.", "Restaurante", "« pedir la cuenta » = demander l'addition."],
  ["la propina", "le pourboire", "Dejamos algo de propina.", "Restaurante"],
  ["el camarero", "le serveur", "Llama al camarero, por favor.", "Restaurante"],
  ["la ración", "la portion (à partager)", "Pedimos una ración de calamares.", "Restaurante", "Institution espagnole : plat à partager. « media ración » = demi-portion."],
  ["el pincho", "la petite portion sur pain", "Un pincho de tortilla, por favor.", "Restaurante", "Typique du nord (Pays basque). Version « chic » de la tapa."],
  ["estar rico", "être bon (au goût)", "Esto está riquísimo.", "Restaurante", "« estar rico » (goût) ≠ « ser rico » (riche). Estar + comida = c'est délicieux."],
  ["para llevar", "à emporter", "Un café para llevar.", "Restaurante", "Contraire : « para tomar aquí »."],
  ["la caña", "le demi (bière pression)", "Ponme una caña, por favor.", "Restaurante", "Boisson-clé de la vie sociale espagnole. « ponme » = sers-moi."],

  // --- En ville & transports (A2-B1) ---
  ["el carril", "la voie, la file", "El carril bici pasa por aquí.", "Ciudad", "« carril bici » = piste cyclable ; « carril bus » = voie de bus."],
  ["el paso de cebra", "le passage piéton", "Cruza por el paso de cebra.", "Ciudad", "Littéralement « passage zèbre »."],
  ["la rotonda", "le rond-point", "Toma la segunda salida de la rotonda.", "Ciudad", "« la salida » = la sortie (du rond-point)."],
  ["el peatón", "le piéton", "Los peatones tienen prioridad.", "Ciudad"],
  ["aparcar", "se garer", "No encuentro dónde aparcar.", "Ciudad", "En Amérique : « estacionar » ou « parquear »."],
  ["el aparcamiento", "le parking", "El aparcamiento está lleno.", "Ciudad"],
  ["la matrícula", "la plaque d'immatriculation", "Apunté la matrícula del coche.", "Ciudad", "Aussi : les frais/l'inscription (université)."],
  ["el andén", "le quai (gare)", "El tren sale del andén 4.", "Ciudad"],
  ["hacer transbordo", "changer (de ligne)", "Haz transbordo en Sol.", "Ciudad", "Métro/train : changer de ligne."],
  ["el casco antiguo", "la vieille ville", "El casco antiguo es precioso.", "Ciudad", "« casco histórico » = centre historique."],
  ["callejear", "flâner dans les rues", "Nos pasamos la tarde callejeando.", "Ciudad", "De « calle » (rue) : se promener sans but précis."],

  // --- Démarches & rendez-vous (B1-B2) ---
  ["el trámite", "la démarche (administrative)", "Los trámites llevan semanas.", "Gestiones"],
  ["el papeleo", "la paperasse", "Odio todo el papeleo.", "Gestiones"],
  ["la cita previa", "le rendez-vous (préalable)", "Necesitas cita previa para el DNI.", "Gestiones", "Incontournable en Espagne : rendez-vous à prendre à l'avance."],
  ["el DNI", "la carte d'identité", "Trae el DNI y una foto.", "Gestiones", "« Documento Nacional de Identidad ». L'équivalent pour étrangers : le NIE."],
  ["empadronarse", "s'inscrire à la mairie", "Hay que empadronarse al llegar.", "Gestiones", "« el padrón » = registre municipal ; obligatoire pour résider."],
  ["rellenar", "remplir (un formulaire)", "Rellena el formulario con letra clara.", "Gestiones", "« rellenar un impreso » = remplir un formulaire."],
  ["el sello", "le cachet, le tampon", "Falta el sello del ayuntamiento.", "Gestiones", "Aussi : le timbre (courrier)."],
  ["el justificante", "le justificatif", "Guarda el justificante de pago.", "Gestiones"],
  ["la ventanilla", "le guichet", "Diríjase a la ventanilla 3.", "Gestiones"],

  // --- Travail & argent (B1-B2) ---
  ["el finiquito", "le solde de tout compte", "Firmó el finiquito al irse.", "Trabajo+"],
  ["cotizar", "cotiser", "Llevo diez años cotizando.", "Trabajo+", "Cotiser à la sécurité sociale / retraite."],
  ["el sindicato", "le syndicat", "El sindicato convocó una huelga.", "Trabajo+"],
  ["estar sin blanca", "être fauché", "A fin de mes estoy sin blanca.", "Trabajo+", "Familier : ne plus avoir un sou. « la blanca » = ancienne pièce."],

  // --- Relations & famille (B1-B2) ---
  ["caer bien", "être sympathique (à qqn)", "Tu amigo me cae muy bien.", "Relaciones", "Type gustar : « me cae bien » = il me plaît (comme personne). Contraire : caer mal / caer gordo."],
  ["hacer las paces", "se réconcilier", "Discutieron pero ya hicieron las paces.", "Relaciones"],
  ["dar plantón", "poser un lapin", "Me dio plantón en la primera cita.", "Relaciones", "« dar plantón a alguien » = ne pas venir à un rendez-vous."],
  ["ligar", "draguer", "Se fue a la fiesta a ligar.", "Relaciones", "Familier mais très courant. « un ligue » = un flirt."],
  ["quedar con", "avoir/prendre rendez-vous avec", "He quedado con Ana a las ocho.", "Relaciones", "« quedar » (sans pronom) = se donner rendez-vous. À ne pas confondre avec « quedarse » (rester)."],
  ["el/la cuñado/a", "le beau-frère / la belle-sœur", "Mi cuñada es enfermera.", "Relaciones", "Frère/sœur du conjoint, ou conjoint du frère/de la sœur."],
  ["el/la suegro/a", "le beau-père / la belle-mère", "Como en casa de mis suegros los domingos.", "Relaciones", "Parents du conjoint. « los suegros » = les beaux-parents."],
  ["hacer buenas migas", "bien s'entendre (d'emblée)", "Desde el principio hicimos buenas migas.", "Relaciones", "Idiome : accrocher tout de suite avec quelqu'un."],
  ["el/la pesado/a", "le/la lourd(e), casse-pieds", "No seas pesado.", "Relaciones", "« ser un pesado » = être collant/insistant."],
  ["el rollo", "le truc, l'histoire (fam.)", "¡Qué rollo de película!", "Relaciones", "« qué rollo » = quelle barbe ; « buen rollo » = bonne ambiance."],

  // --- Émotions & réactions (B1-B2) ---
  ["dar rabia", "énerver, faire enrager", "Me da rabia perder el tren.", "Emociones+", "Type gustar : « me da rabia » = ça m'agace profondément."],
  ["dar vergüenza", "faire honte, gêner", "Me da vergüenza hablar en público.", "Emociones+", "« vergüenza ajena » = la honte pour quelqu'un d'autre (gêne)."],
  ["estar harto de", "en avoir marre de", "Estoy harto de esperar.", "Emociones+", "« harto de + inf./nom » = saturé de."],
  ["agobiarse", "se stresser, être submergé", "No te agobies, hay tiempo.", "Emociones+"],
  ["ilusionarse", "se réjouir d'avance", "Se ilusionó con el viaje.", "Emociones+", "« hacer ilusión » = faire très plaisir (attente joyeuse), sans lien avec « illusion »."],
  ["desahogarse", "se soulager, vider son sac", "Llamó a su madre para desahogarse.", "Emociones+"],
  ["animarse", "se motiver, se décider", "Al final me animé a ir.", "Emociones+", "« animarse a + inf. » = se décider à ; « ¡anímate! » = courage !"],
  ["estar de bajón", "avoir le moral à zéro", "Hoy estoy un poco de bajón.", "Emociones+", "Familier. « bajón » = coup de déprime, coup de fatigue."],

  // --- Verbes à préposition (B2) ---
  ["contar con", "compter sur / avec", "Cuento contigo para la mudanza.", "Verbos+prep", "« contar con alguien » = compter sur ; « contar con algo » = disposer de."],
  ["tratarse de", "s'agir de", "Se trata de un malentendido.", "Verbos+prep", "Impersonnel : « se trata de » = il s'agit de. Jamais « es sobre »."],
  ["fijarse en", "faire attention à, remarquer", "Fíjate en los detalles.", "Verbos+prep", "« fijarse EN » = remarquer. À ne pas confondre avec « fijar » (fixer)."],
  ["renunciar a", "renoncer à", "Renunció a su puesto.", "Verbos+prep"],
  ["dedicarse a", "faire (métier) / se consacrer à", "¿A qué te dedicas?", "Verbos+prep", "« ¿a qué te dedicas? » = quel est ton métier ? (question standard)."],

  // --- Modismos supplémentaires (B2-C1) ---
  ["irse por las ramas", "tourner autour du pot", "No te vayas por las ramas, ve al grano.", "Modismos+", "Contraire : « ir al grano » = aller à l'essentiel."],
  ["ir sobre ruedas", "aller comme sur des roulettes", "El proyecto va sobre ruedas.", "Modismos+"],
  ["poner verde a alguien", "critiquer, dire du mal de qqn", "En cuanto se fue, lo pusieron verde.", "Modismos+", "Littéralement « rendre vert » = descendre quelqu'un en son absence."],
  ["ser un cero a la izquierda", "être une quantité négligeable", "En esa empresa soy un cero a la izquierda.", "Modismos+", "Ne compter pour rien, comme un zéro devant un nombre."],
  ["llevarse un chasco", "être déçu", "Me llevé un buen chasco con la película.", "Modismos+", "« un chasco » = une déception, une déconvenue."],
  ["por si las moscas", "au cas où", "Llévate el paraguas, por si las moscas.", "Modismos+", "Variante familière et imagée de « por si acaso »."]

]);
