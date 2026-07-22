/* ============================================================
   CUMBRE — Palier C1-C2 : grammaire fine, celle qui trahit
   un francophone même très avancé.
   ============================================================ */
window.LESSONS.push(
  {
    id: "seinvol", title: "« Se me olvidó » : le se d'involontarité", tag: "C1 · L'accident",
    note: "LA structure qui sépare un francophone d'un hispanophone. En espagnol, quand une chose arrive <b>sans qu'on l'ait voulu</b>, on ne se rend pas coupable : la chose devient sujet. Formule : <b>se + me/te/le/nos/os/les + verbe accordé avec la CHOSE</b>. « J'ai oublié les clés » → <b>Se me olvidaron las llaves</b> (littéralement : les clés se sont oubliées à moi). Verbes typiques : olvidar, caer, romper, perder, quemar, acabar, ocurrir. Dire « olvidé las llaves » n'est pas faux, mais sonne accusateur ; « se me olvidaron » est ce que dit un natif.",
    q: [
      ["J'ai oublié ton anniversaire (sans le vouloir) : ______ tu cumpleaños.", ["olvidé", "se me olvidó", "me olvidé", "se me olvidaron"], 1, "Une seule chose oubliée (el cumpleaños) → se me olvidó, au singulier."],
      ["Se me ______ las llaves en casa.", ["olvidó", "olvidaron", "olvidé", "olvidaba"], 1, "Le verbe s'accorde avec « las llaves » (pluriel) → olvidaron."],
      ["Il a cassé le verre sans faire exprès : ______ el vaso.", ["rompió", "se le rompió", "se rompió", "le rompió"], 1, "se + le (à lui) + rompió (le vaso, singulier)."],
      ["A Marta ______ el móvil al suelo.", ["se le cayó", "se la cayó", "cayó", "se cayó"], 0, "Le pronom d'objet indirect est « le » (a Marta), jamais « la » ici."],
      ["Nous avons perdu les billets : ______ las entradas.", ["se nos perdieron", "se nos perdió", "perdimos nos", "nos perdimos"], 0, "Accord avec « las entradas » → perdieron."],
      ["Se me ______ una idea buenísima.", ["ocurrió", "ocurrí", "ocurre a mí", "he ocurrido"], 0, "« ocurrírsele algo a alguien » = avoir une idée : se me ocurrió."],
      ["Quelle nuance apporte « se me rompió » face à « rompí » ?", ["Aucune, c'est identique", "Ça déresponsabilise : l'objet s'est cassé tout seul", "C'est du passé lointain", "C'est plus formel"], 1, "Le « se » d'involontarité retire l'intention — c'est un déni de responsabilité grammaticalisé."],
      ["Se nos ______ el tiempo, hay que irse.", ["acabó", "acabamos", "acabaron", "acaba"], 0, "« el tiempo » singulier → se nos acabó."]
    ]
  },
  {
    id: "concesivas", title: "Aunque & la concession", tag: "C1 · Concéder",
    note: "<b>Aunque + indicatif</b> = tu présentes le fait comme <b>réel et connu</b> (« Aunque es caro, lo compro » = bien que ce soit cher — et ça l'est). <b>Aunque + subjonctif</b> = tu présentes le fait comme <b>hypothétique, ou connu mais que tu minimises</b> (« Aunque sea caro, lo compro » = même si c'est cher). C'est un choix de <b>posture</b>, pas de règle mécanique. Autres concessives : <b>a pesar de que</b>, <b>por mucho/más que</b> (+ subj. pour l'hypothèse), <b>si bien</b> (+ ind., soutenu), <b>por + adj + que + subj</b> (« por difícil que sea »).",
    q: [
      ["Aunque ______ mucho dinero, no sería feliz. (hypothèse)", ["tengo", "tuviera", "tendría", "tenga"], 1, "Hypothèse irréelle → imparfait du subjonctif : tuviera."],
      ["Aunque ______ caro, lo voy a comprar. (je sais qu'il est cher)", ["es", "sea", "fuera", "será"], 0, "Fait réel et assumé → indicatif : es."],
      ["Por mucho que ______, no lo conseguirás.", ["insistes", "insistas", "insistirás", "insististe"], 1, "« por mucho que » + subjonctif : insistas."],
      ["Por difícil que ______, hay que intentarlo.", ["es", "sea", "será", "fuera"], 1, "« por + adj + que » + subjonctif : sea."],
      ["______ llovía, salimos a pasear.", ["Aunque", "Aunque no", "Por más", "Sin que"], 0, "Fait réel au passé → aunque + indicatif."],
      ["« Si bien » se construit avec…", ["le subjonctif", "l'indicatif, registre soutenu", "l'infinitif", "le conditionnel"], 1, "« Si bien es cierto que… » : indicatif, registre écrit/soutenu."],
      ["A pesar de ______ tarde, llegamos a tiempo.", ["que salimos", "que saliéramos", "salir", "de salir"], 0, "« a pesar de que » + indicatif pour un fait réel accompli."],
      ["Aunque me lo ______ mil veces, no lo haré.", ["pides", "pidas", "pedirás", "pedías"], 1, "Projection dans l'avenir → subjonctif : pidas."]
    ]
  },
  {
    id: "relativo", title: "Relatives & subjonctif", tag: "C1 · Relatives",
    note: "Le pivot C1 : <b>indicatif = l'antécédent existe et tu le connais</b> ; <b>subjonctif = il est cherché, souhaité ou inexistant</b>. « Busco un piso que <b>tiene</b> terraza » (je l'ai vu, il existe) vs « Busco un piso que <b>tenga</b> terraza » (n'importe lequel, pourvu qu'il en ait une). Après une négation, subjonctif obligatoire : « No hay nadie que <b>sepa</b> ». Pronoms : <b>que</b> (passe-partout), <b>quien(es)</b> (personnes, après préposition), <b>el/la/los/las que</b> et <b>el cual</b> (soutenu, après préposition longue), <b>cuyo/a/os/as</b> (dont + accord avec le POSSÉDÉ, jamais avec le possesseur), <b>donde/cuando/como</b>.",
    q: [
      ["Busco un piso que ______ terraza (n'importe lequel).", ["tiene", "tenga", "tendrá", "tuviera"], 1, "Antécédent indéfini, encore à trouver → subjonctif : tenga."],
      ["Conozco a un chico que ______ cinco idiomas.", ["hable", "habla", "hablara", "hablaría"], 1, "Il existe et je le connais → indicatif : habla."],
      ["No hay nadie que ______ hacerlo mejor.", ["puede", "pueda", "podrá", "podía"], 1, "Antécédent négatif → subjonctif obligatoire : pueda."],
      ["El autor ______ novela ganó el premio es catalán.", ["cuya", "cuyo", "que su", "del que"], 0, "« cuyo » s'accorde avec le possédé : « la novela » → cuya."],
      ["La persona ______ hablé ayer no ha contestado.", ["que", "con quien", "cual", "cuyo"], 1, "Après préposition, pour une personne → « con quien »."],
      ["Ésa es la razón por ______ me fui.", ["la que", "que", "cual", "quien"], 0, "Après préposition → « por la que » (ou « por la cual », plus soutenu)."],
      ["Haré lo que ______ necesario. (encore indéterminé)", ["es", "sea", "será", "era"], 1, "Ce qui sera nécessaire, indéterminé → subjonctif : sea."],
      ["« Cuyo » s'accorde avec…", ["le possesseur", "la chose possédée", "le verbe", "rien, il est invariable"], 1, "cuyo/a/os/as s'accorde avec ce qui est possédé."]
    ]
  },
  {
    id: "loneutro", title: "« Lo » : le neutre espagnol", tag: "C1 · Le neutre",
    note: "Le français n'a pas d'équivalent, d'où les calques maladroits. <b>lo + adjectif</b> = l'idée abstraite : « <b>lo difícil</b> es empezar » (le difficile / ce qui est difficile). <b>lo que</b> = ce qui / ce que : « no entiendo <b>lo que</b> dices ». <b>lo cual</b> = ce qui, reprenant toute une phrase (soutenu) : « Llegó tarde, <b>lo cual</b> me molestó ». <b>lo de</b> = l'affaire de / l'histoire de : « <b>lo de</b> ayer », « <b>lo de</b> Juan ». Et l'intensif <b>lo + adj/adv + que</b> : « no sabes <b>lo cansado que</b> estoy » (tu ne sais pas à quel point je suis fatigué). Ce dernier est un marqueur C1 immédiat.",
    q: [
      ["______ importante es participar.", ["El", "Lo", "La", "Los"], 1, "lo + adjectif = l'idée abstraite : lo importante."],
      ["No entiendo ______ dices.", ["lo que", "el que", "que", "lo cual"], 0, "« ce que » → lo que."],
      ["Llegó tarde, ______ me molestó bastante.", ["lo que/lo cual", "el cual", "que", "lo de"], 0, "Reprend toute la phrase précédente → lo que / lo cual."],
      ["No sabes ______ estoy.", ["lo cansado que", "el cansado que", "cuánto cansado", "qué cansado"], 0, "Intensif : lo + adjectif + que → lo cansado que estoy."],
      ["______ ayer fue un malentendido.", ["Lo de", "El de", "Lo que de", "La de"], 0, "« lo de » = l'affaire / l'histoire de : lo de ayer."],
      ["« Lo bueno » signifie…", ["le bon (homme)", "ce qui est bien, le bon côté", "la bonne", "les bons"], 1, "lo + adj = notion abstraite, jamais une personne."],
      ["Haz ______ te dé la gana.", ["lo que", "el que", "lo cual", "que"], 0, "« lo que » + subjonctif (indéterminé) : ce que tu voudras."],
      ["« Lo cual » se distingue de « lo que » parce qu'il…", ["est familier", "ne s'emploie qu'après préposition ou en reprise, registre soutenu", "est toujours sujet", "s'accorde"], 1, "lo cual reprend une phrase entière, registre écrit/soutenu."]
    ]
  },
  {
    id: "causafin", title: "Causales, finales, consécutives", tag: "C1 · Articuler",
    note: "Articuler un raisonnement, c'est le cœur du C1 écrit. <b>Cause</b> : porque (neutre), <b>como</b> (toujours en tête : « Como llovía, no salimos »), <b>ya que / puesto que / dado que</b> (soutenu), <b>por</b> + infinitif (« lo multaron por conducir rápido »). <b>But</b> : <b>para que / a fin de que + subjonctif</b> (sujets différents) mais <b>para + infinitif</b> si le sujet est le même. <b>Conséquence</b> : así que, por lo que, de modo que, por (lo) tanto, en consecuencia. Et le piège d'or : <b>de ahí que + SUBJONCTIF</b> (« d'où le fait que »), qui surprend tout le monde.",
    q: [
      ["______ llovía, decidimos quedarnos en casa.", ["Como", "Porque", "Ya", "Pues"], 0, "« Como » ouvre la phrase pour la cause ; « porque » ne peut pas être en tête ici."],
      ["Te lo explico para que lo ______.", ["entiendes", "entiendas", "entenderás", "entendías"], 1, "« para que » + subjonctif (sujets différents) : entiendas."],
      ["Estudio mucho para ______ el examen.", ["que apruebe", "aprobar", "aprobando", "que apruebo"], 1, "Même sujet → para + infinitif : aprobar."],
      ["No vino, de ahí que ______ preocupados.", ["estamos", "estemos", "estaremos", "estábamos"], 1, "« de ahí que » exige le subjonctif : estemos."],
      ["Llegamos tarde, ______ perdimos el tren.", ["así que", "para que", "aunque", "como"], 0, "Conséquence → así que."],
      ["______ que ya lo sabes, no te lo repito.", ["Dado", "Como", "Para", "Aunque"], 0, "« dado que » = puisque, registre soutenu."],
      ["Lo multaron por ______ demasiado rápido.", ["conducir", "conduciendo", "que condujo", "conduce"], 0, "« por » + infinitif exprime la cause : por conducir."],
      ["« Por lo tanto » exprime…", ["la cause", "la conséquence", "la concession", "le but"], 1, "por (lo) tanto = donc, par conséquent."]
    ]
  },
  {
    id: "correlacion", title: "Concordance des temps au subjonctif", tag: "C2 · Concordance",
    note: "Le dernier verrou. Le temps du subjonctif dépend du <b>verbe principal</b>. Principale au <b>présent/futur</b> → subjonctif <b>présent</b> (« Quiero que <b>vengas</b> ») ou <b>passé</b> si l'action est antérieure (« Me alegro de que <b>hayas venido</b> »). Principale au <b>passé/conditionnel</b> → subjonctif <b>imparfait</b> (« Quería que <b>vinieras</b> ») ou <b>plus-que-parfait</b> si antérieure (« Me alegré de que <b>hubieras venido</b> »). Formes composées : <b>haya + participe</b> (passé du subj.), <b>hubiera/hubiese + participe</b> (plus-que-parfait du subj.).",
    q: [
      ["Me alegro de que ______ (tu es venu hier).", ["vengas", "hayas venido", "vinieras", "vienes"], 1, "Principale au présent + action antérieure → passé du subjonctif : hayas venido."],
      ["Quería que ______ conmigo.", ["vengas", "vinieras", "hayas venido", "vienes"], 1, "Principale au passé → imparfait du subjonctif : vinieras."],
      ["No creo que ______ el examen la semana pasada.", ["apruebe", "haya aprobado", "aprobara", "aprueba"], 1, "Présent + fait passé récent → haya aprobado."],
      ["Me sorprendió que no me lo ______ antes.", ["digas", "hubieras dicho", "hayas dicho", "dices"], 1, "Principale au passé + antériorité → plus-que-parfait du subj. : hubieras dicho."],
      ["Es posible que ya ______ la noticia.", ["sepa", "haya sabido", "supiera", "sabe"], 1, "Antériorité par rapport au présent → haya sabido."],
      ["Le pedí que me ______ la verdad.", ["diga", "dijera", "haya dicho", "dice"], 1, "Verbe principal au passé simple → dijera."],
      ["Le passé du subjonctif se forme avec…", ["haber au présent du subj. + participe", "haber à l'imparfait + participe", "ser + participe", "estar + gérondif"], 0, "haya/hayas/haya… + participe."],
      ["Ojalá ______ estudiado más cuando era joven.", ["haya", "hubiera", "habría", "había"], 1, "Regret sur le passé → hubiera estudiado."]
    ]
  }
);

/* --- traductions liées au palier C1-C2 --- */
window.TRANSLATIONS.push(
  { fr:"J'ai oublié les clés à la maison.", en:"Se me olvidaron las llaves en casa.", alt:["Se me han olvidado las llaves en casa."], cat:"Nuances C2", point:"se d'involontarité", note:"La chose devient sujet : « las llaves » est pluriel → olvidaron. Dire « olvidé las llaves » est compris, mais sonne accusateur.", level:"C1" },
  { fr:"Il a cassé le verre sans faire exprès.", en:"Se le rompió el vaso.", alt:["Se le ha roto el vaso."], cat:"Nuances C2", point:"se + pronom", note:"se + le + verbe accordé avec « el vaso ». C'est la formule qui déresponsabilise.", level:"C1" },
  { fr:"Même si c'est cher, je vais l'acheter.", en:"Aunque sea caro, lo voy a comprar.", alt:["Aunque sea caro, voy a comprarlo."], cat:"Nuances C2", point:"aunque + subjonctif", note:"Subjonctif = tu minimises l'objection. Avec l'indicatif (« aunque es caro »), tu affirmes le fait comme établi.", level:"C1" },
  { fr:"Je cherche un appartement qui ait une terrasse.", en:"Busco un piso que tenga terraza.", alt:["Estoy buscando un piso que tenga terraza."], cat:"Nuances C2", point:"relative + subjonctif", note:"Antécédent indéfini (n'importe lequel, pourvu qu'il…) → subjonctif : tenga.", level:"C1" },
  { fr:"Il n'y a personne qui puisse le faire mieux.", en:"No hay nadie que pueda hacerlo mejor.", alt:[], cat:"Nuances C2", point:"antécédent négatif", note:"Après « no hay nadie que », subjonctif obligatoire.", level:"C1" },
  { fr:"Le plus difficile, c'est de commencer.", en:"Lo más difícil es empezar.", alt:["Lo difícil es empezar."], cat:"Nuances C2", point:"lo + adjectif", note:"« lo » neutre pour l'idée abstraite. Jamais « el más difícil » ici.", level:"C1" },
  { fr:"Tu ne sais pas à quel point je suis fatigué.", en:"No sabes lo cansado que estoy.", alt:[], cat:"Nuances C2", point:"lo + adj + que", note:"Structure intensive typiquement C1 : lo + adjectif accordé + que.", level:"C1" },
  { fr:"Il est arrivé en retard, ce qui m'a agacé.", en:"Llegó tarde, lo cual me molestó.", alt:["Llegó tarde, lo que me molestó."], cat:"Nuances C2", point:"lo cual", note:"Reprend toute la proposition précédente ; « lo cual » est le registre soutenu.", level:"C1" },
  { fr:"Comme il pleuvait, nous ne sommes pas sortis.", en:"Como llovía, no salimos.", alt:[], cat:"Nuances C2", point:"como (cause, en tête)", note:"La cause en tête de phrase se dit « como », jamais « porque ».", level:"B2" },
  { fr:"Je te l'explique pour que tu comprennes.", en:"Te lo explico para que lo entiendas.", alt:[], cat:"Nuances C2", point:"para que + subjonctif", note:"Sujets différents → para que + subjonctif. Même sujet → para + infinitif.", level:"B2" },
  { fr:"Il n'est pas venu, d'où notre inquiétude.", en:"No vino, de ahí que estemos preocupados.", alt:[], cat:"Nuances C2", point:"de ahí que + subjonctif", note:"« de ahí que » exige le subjonctif — piège classique même à C1.", level:"C1" },
  { fr:"Je suis content que tu sois venu hier.", en:"Me alegro de que hayas venido ayer.", alt:[], cat:"Nuances C2", point:"concordance : haya + participe", note:"Principale au présent + action antérieure → passé du subjonctif.", level:"C1" },
  { fr:"Je voulais que tu viennes avec moi.", en:"Quería que vinieras conmigo.", alt:["Quería que vinieses conmigo."], cat:"Nuances C2", point:"concordance : imparfait du subj.", note:"Principale au passé → imparfait du subjonctif.", level:"C1" },
  { fr:"Ça m'a surpris qu'il ne me l'ait pas dit avant.", en:"Me sorprendió que no me lo hubiera dicho antes.", alt:["Me sorprendió que no me lo hubiese dicho antes."], cat:"Nuances C2", point:"plus-que-parfait du subj.", note:"Principale au passé + antériorité → hubiera + participe.", level:"C2" },
  { fr:"Fais ce que tu veux.", en:"Haz lo que te dé la gana.", alt:["Haz lo que quieras."], cat:"Nuances C2", point:"lo que + subjonctif", note:"Indéterminé → subjonctif. « darle la gana » = avoir envie, registre familier.", level:"C1" }
);
