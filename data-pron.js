/* ============================================================
   CUMBRE — PRONONCIATION : le R (simple & roulé) et la ñ
   Drill quotidien. On ne peut pas noter le son : c'est un
   entraînement guidé (modèle audio + technique + auto-éval).
   k : 'rr' (roulé intervocalique) · 'ini' (r initial roulé)
       'clus' (r après n/l/s, roulé) · 'simple' (r battu)
   ============================================================ */
window.PRON = {

  /* Technique articulatoire du R (une astuce affichée par jour, en rotation) */
  tipsR: [
    "Le <b>R roulé</b> (rr), ce n'est PAS le R français (guttural, dans la gorge). La <b>pointe</b> de la langue vibre <b>librement</b> contre la crête juste derrière les dents du haut. Langue <b>détendue</b>, tu envoies de l'air : elle claque toute seule, comme un moteur qui tourne.",
    "<b>Astuce du D/T</b> : dis très vite « <i>tede-tede-tede</i> » (ou l'anglais « <i>butter, ladder</i> » façon américaine). Ta langue tape déjà au bon endroit. Accélère jusqu'à ce que ça se mette à vibrer : c'est ça, la <b>rr</b>.",
    "<b>Un battement = r</b> (pe<b>r</b>o, ca<b>r</b>a). <b>Plusieurs battements = rr</b> (pe<b>rr</b>o, ca<b>rr</b>o). En <b>début de mot</b> et <b>après n / l / s</b>, le r simple écrit se prononce <b>roulé</b> : <i>rojo, Enrique, alrededor</i>.",
    "<b>Relâche.</b> Le R roulé sort mieux <b>détendu</b> que forcé : souffle régulier, langue molle qui flotte, mâchoire ouverte. Beaucoup y arrivent d'abord <b>allongés</b> — ça décrispe la langue.",
    "<b>Isole la vibration</b> : prolonge un « <i>rrrrr</i> » seul, puis colle une voyelle — <i>rra, rre, rri, rro, rru</i>. Les mots viennent après. 5 min/jour : c'est un muscle qui s'entraîne.",
  ],
  tipEne: "La <b>ñ</b> = le « <b>gn</b> » français de <i>monta<b>gn</b>e, oi<b>gn</b>on</i>. Le dos de la langue s'appuie sur le palais : <i>mañana</i> ≈ « ma-<b>gna</b>-na ». Bonne nouvelle — ce son, tu l'as déjà en français.",

  /* R roulé — le gros du travail (« surtout le R ») */
  R: [
    // rr intervocalique (toujours roulé)
    { es:'perro', fr:'le chien', k:'rr' },
    { es:'carro', fr:'la voiture / le chariot', k:'rr' },
    { es:'correr', fr:'courir', k:'rr' },
    { es:'tierra', fr:'la terre', k:'rr' },
    { es:'guerra', fr:'la guerre', k:'rr' },
    { es:'cerro', fr:'la colline', k:'rr' },
    { es:'barro', fr:"la boue / l'argile", k:'rr' },
    { es:'torre', fr:'la tour', k:'rr' },
    { es:'arriba', fr:'en haut', k:'rr' },
    { es:'aburrido', fr:'ennuyeux / ennuyé', k:'rr' },
    { es:'cachorro', fr:'le chiot', k:'rr' },
    { es:'zorro', fr:'le renard', k:'rr' },
    { es:'burro', fr:"l'âne", k:'rr' },
    { es:'jarra', fr:'la carafe', k:'rr' },
    { es:'gorra', fr:'la casquette', k:'rr' },
    { es:'arroz', fr:'le riz', k:'rr' },
    { es:'marrón', fr:'marron', k:'rr' },
    { es:'horrible', fr:'horrible', k:'rr' },
    { es:'ferrocarril', fr:'le chemin de fer', k:'rr' },
    { es:'desarrollo', fr:'le développement', k:'rr' },
    { es:'interrumpir', fr:'interrompre', k:'rr' },
    { es:'agarrar', fr:'attraper / saisir', k:'rr' },
    { es:'párrafo', fr:'le paragraphe', k:'rr' },
    { es:'corriente', fr:'le courant', k:'rr' },
    // r initial (roulé)
    { es:'rojo', fr:'rouge', k:'ini' },
    { es:'rápido', fr:'rapide', k:'ini' },
    { es:'ratón', fr:'la souris', k:'ini' },
    { es:'rey', fr:'le roi', k:'ini' },
    { es:'río', fr:'la rivière / le fleuve', k:'ini' },
    { es:'rosa', fr:'rose / la rose', k:'ini' },
    { es:'rueda', fr:'la roue', k:'ini' },
    { es:'ropa', fr:'les vêtements', k:'ini' },
    { es:'risa', fr:'le rire', k:'ini' },
    { es:'rincón', fr:'le coin (recoin)', k:'ini' },
    { es:'reloj', fr:"la montre / l'horloge", k:'ini' },
    { es:'rodilla', fr:'le genou', k:'ini' },
    { es:'raíz', fr:'la racine', k:'ini' },
    { es:'respuesta', fr:'la réponse', k:'ini' },
    { es:'recuerdo', fr:'le souvenir', k:'ini' },
    { es:'rumbo', fr:'le cap / la direction', k:'ini' },
    // r après n / l / s (roulé)
    { es:'alrededor', fr:'autour', k:'clus' },
    { es:'Enrique', fr:'Enrique (prénom)', k:'clus' },
    { es:'honra', fr:"l'honneur", k:'clus' },
    { es:'sonrisa', fr:'le sourire', k:'clus' },
    { es:'Israel', fr:'Israël', k:'clus' },
    { es:'enredo', fr:"l'imbroglio / l'embrouille", k:'clus' },
    { es:'sonreír', fr:'sourire', k:'clus' },
  ],

  /* Paires minimales : r battu vs rr roulé — le contraste qui change le sens */
  pairs: [
    { r:'pero', fr:'mais', rr:'perro', frr:'le chien' },
    { r:'caro', fr:'cher', rr:'carro', frr:'la voiture' },
    { r:'coro', fr:'le chœur', rr:'corro', frr:'je cours' },
    { r:'cero', fr:'zéro', rr:'cerro', frr:'la colline' },
    { r:'pera', fr:'la poire', rr:'perra', frr:'la chienne' },
    { r:'para', fr:'pour', rr:'parra', frr:'la treille' },
    { r:'ahora', fr:'maintenant', rr:'ahorra', frr:'il/elle économise' },
    { r:'moro', fr:'maure', rr:'morro', frr:'le museau' },
    { r:'foro', fr:'le forum', rr:'forro', frr:'la doublure' },
    { r:'coral', fr:'le corail', rr:'corral', frr:"l'enclos" },
    { r:'careta', fr:'le masque', rr:'carreta', frr:'la charrette' },
    { r:'encerar', fr:'cirer', rr:'encerrar', frr:'enfermer' },
  ],

  /* ñ */
  ene: [
    { es:'niño', fr:"l'enfant / le garçon" },
    { es:'año', fr:"l'année / l'an" },
    { es:'España', fr:"l'Espagne" },
    { es:'señor', fr:'monsieur' },
    { es:'mañana', fr:'demain / le matin' },
    { es:'montaña', fr:'la montagne' },
    { es:'pequeño', fr:'petit' },
    { es:'español', fr:'espagnol' },
    { es:'sueño', fr:'le rêve / le sommeil' },
    { es:'otoño', fr:"l'automne" },
    { es:'cariño', fr:'la tendresse / chéri(e)' },
    { es:'baño', fr:'le bain / la salle de bain' },
    { es:'puño', fr:'le poing' },
    { es:'araña', fr:"l'araignée" },
    { es:'piña', fr:"l'ananas" },
    { es:'señal', fr:'le signal' },
    { es:'compañero', fr:'le camarade / compagnon' },
    { es:'enseñar', fr:'enseigner / montrer' },
    { es:'soñar', fr:'rêver' },
    { es:'pañuelo', fr:'le mouchoir' },
  ],

  /* Trabalenguas (surtout R) — le boss de fin de session */
  twisters: [
    { es:'Erre con erre, guitarra; erre con erre, barril. Rápido ruedan los carros cargados de azúcar del ferrocarril.',
      fr:'Le grand classique du R roulé.', note:'Vas-y lentement d\'abord, puis accélère sans perdre la vibration.' },
    { es:'El perro de San Roque no tiene rabo porque Ramón Ramírez se lo ha robado.',
      fr:'Le chien de San Roque n\'a pas de queue car Ramón Ramírez la lui a volée.', note:'Alterne r battu (rabo, robado) et r roulé (perro, Roque, Ramón).' },
    { es:'Tres tristes tigres tragaban trigo en un trigal.',
      fr:'Trois tigres tristes avalaient du blé dans un champ de blé.', note:'Groupes « tr » : t suivi d\'un r battu, bien enchaînés.' },
    { es:'R con R cigarro, r con r barril; rápido corren los carros por los rieles del ferrocarril.',
      fr:'Variante du classique.', note:'Cible pure du rr : cigarro, barril, carros, ferrocarril.' },
    { es:'Rosa Rizo reza en ruso, en ruso reza Rosa Rizo.',
      fr:'Rosa Rizo prie en russe, en russe prie Rosa Rizo.', note:'R initial roulé en rafale.' },
    { es:'El niño le enseña al pequeño español en la montaña.',
      fr:"L'enfant apprend l'espagnol au petit sur la montagne.", note:'Spécial ñ : niño, enseña, pequeño, español, montaña.' },
  ],
};
