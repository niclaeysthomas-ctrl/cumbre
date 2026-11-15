/* ============================================================
   CUMBRE — EL TALLER · banque d'entraînement en PRODUCTION
   2026-11-15. Écrite à partir du diagnostic du 2026-11-15.
   ------------------------------------------------------------
   POURQUOI CETTE BANQUE EXISTE, ET POURQUOI ELLE EST TOUTE EN
   RÉPONSE TAPÉE.
   Le diagnostic a donné 85 % en QCM de grammaire et 71 % sur les
   MÊMES compétences aux MÊMES niveaux dès qu'il faut taper, et 42 %
   en thème. Ajouter des QCM reviendrait donc à entraîner la seule
   chose qui marche déjà. Ici, zéro option : la forme sort, ou elle
   ne sort pas.
   ------------------------------------------------------------
   UN TIERS DES ITEMS APPELLE L'INDICATIF.
   C'est délibéré et c'est la règle la plus importante du fichier.
   Un entraînement où la bonne réponse est toujours le subjonctif
   n'apprend pas le subjonctif : il apprend « quand on me demande
   quelque chose, je mets du subjonctif ». Le vrai geste est un
   CHOIX, donc il faut que l'indicatif gagne assez souvent pour que
   le choix reste un choix. Les items marqués « piège » sont ceux où
   la structure ressemble à un déclencheur mais n'en est pas un.
   ------------------------------------------------------------
   FORMAT : [énoncé avec ______, [formes acceptées], explication, niveau]
   niveau : 3 = B1 · 4 = B2 · 5 = C1
   La comparaison est celle du diagnostic (diagCheckLibre) : tolérante
   à la casse et à la ponctuation, et l'accent manquant est signalé
   sans être compté faux.
   ============================================================ */

/* ---------- GATILLO — déclencher (ou non) le subjonctif ----------
   Le trou le plus cher du diagnostic : 6/12 en production au niveau B2
   sur `modo`, contre 3/3 en B1. Les fautes observées étaient toutes du
   même type : « Aunque es difícil », « En cuanto contesta », « me
   extraña que no llame ». La structure est connue, le réflexe ne part
   pas. On le fait partir ici, cent fois. */
window.TALLER_GATILLO = [
  /* — Concession — */
  ["Aunque ______ difícil, lo voy a intentar. (ser)", ["sea"], "aunque + SUBJONCTIF quand on concède une hypothèse : « même si c'était difficile ». C'est ta faute exacte au diagnostic.", 4],
  ["Aunque ______ difícil, lo conseguí. (ser)", ["fue","era"], "PIÈGE. Ici le fait est constaté, pas supposé : aunque + INDICATIF. « Bien que ce fût difficile, j'y suis arrivé. »", 4],
  ["Aunque no te lo ______, te he echado de menos. (creer, tú)", ["creas"], "Hypothèse concédée sur le présent → subjonctif présent.", 4],
  ["Aunque ______ razón, no tenías por qué gritar. (tener, tú)", ["tenías","tuvieras"], "Les deux marchent et ne disent pas la même chose : « tenías » admet que tu l'avais, « tuvieras » laisse la question ouverte.", 5],
  ["Por mucho que ______, no lo vas a convencer. (insistir, tú)", ["insistas"], "por mucho que + subjonctif : l'effort est envisagé, pas constaté.", 4],
  ["Por más que lo ______, no lo entiendo. (leer, yo)", ["lea","leo"], "« lea » = quoi que je fasse ; « leo » = constat répété. Les deux circulent, le subjonctif est plus soutenu.", 5],
  ["Aun ______ querido, no habría podido ayudarte. (haber, yo)", ["habiendo"], "aun + gérondif composé = même en ayant voulu. Tournure concessive C1.", 5],
  ["Pese a que ______ tarde, salimos igual. (ser)", ["era"], "PIÈGE. pese a que + indicatif quand le fait est avéré.", 4],

  /* — Temps futur — */
  ["En cuanto ______ algo, te aviso. (saber, yo)", ["sepa"], "Conjonction temporelle tournée vers le futur → subjonctif. JAMAIS de futur après en cuanto.", 4],
  ["En cuanto ______ la respuesta, me fui. (recibir, yo)", ["recibí"], "PIÈGE. Même conjonction, fait passé et réel → indicatif.", 4],
  ["Cuando ______ a casa, te llamo. (llegar, yo)", ["llegue"], "cuando + futur = subjonctif.", 3],
  ["Cuando ______ a casa, estaba todo apagado. (llegar, yo)", ["llegué"], "PIÈGE. Fait passé → indicatif.", 3],
  ["Cuando ______ niño, vivía en Lyon. (ser, yo)", ["era"], "PIÈGE. Habitude passée → imparfait de l'indicatif.", 3],
  ["Te lo diré cuando ______ el momento. (llegar)", ["llegue"], "Le moment n'est pas encore là → subjonctif.", 4],
  ["Hasta que no ______ la carta, no me quedo tranquilo. (llegar)", ["llegue"], "hasta que + futur → subjonctif. Le « no » explétif est normal en espagnol.", 4],
  ["Espérame hasta que ______ de trabajar. (salir, yo)", ["salga"], "Ordre + échéance future → subjonctif.", 3],
  ["Antes de que ______ , cierra la ventana. (irse, tú)", ["te vayas"], "antes de que + subjonctif, toujours, sans exception.", 3],
  ["Después de que ______ , hablamos. (terminar, tú)", ["termines","terminaras","terminases"], "después de que + subjonctif quand c'est à venir. (Pour un fait passé, l'indicatif est aussi admis.)", 4],
  ["Mientras ______ aquí, no te preocupes por nada. (estar, tú)", ["estés"], "mientras + subjonctif = tant que, tourné vers l'avenir.", 4],
  ["Mientras yo ______ , él leía el periódico. (cocinar)", ["cocinaba"], "PIÈGE. mientras + indicatif pour deux actions passées simultanées.", 3],
  ["Tan pronto como ______ noticias, te escribo. (tener, yo)", ["tenga"], "Même mécanique que en cuanto.", 4],
  ["Siempre que ______ , avísame. (poder, tú)", ["puedas"], "siempre que = chaque fois que / à condition que → subjonctif.", 4],
  ["Siempre que ______ a Madrid, comíamos en ese bar. (ir, nosotros)", ["íbamos","ibamos"], "PIÈGE. Habitude passée réelle → indicatif.", 4],

  /* — Volonté, sentiment, jugement — */
  ["Me extraña que todavía no ______ . (llamar, él)", ["haya llamado"], "Le fait est passé mais vu depuis le présent → subjonctif PASSÉ COMPOSÉ. « Llame » dirait qu'il n'appelle pas en ce moment.", 4],
  ["Me alegro de que ______ venido. (haber, tú)", ["hayas"], "alegrarse DE que + subjonctif passé.", 4],
  ["Me molesta que la gente ______ sin escuchar. (opinar)", ["opine"], "Sentiment + que + sujet différent → subjonctif.", 3],
  ["Siento mucho que ______ que irte. (tener, tú)", ["tengas"], "sentir (= regretter) + que → subjonctif.", 3],
  ["Siento que ______ a llover. (empezar)", ["empieza","está empezando"], "PIÈGE. Ici sentir = percevoir, pas regretter → indicatif.", 5],
  ["Es una pena que no ______ venir. (poder, tú)", ["puedas","pudieras"], "Jugement de valeur + que → subjonctif.", 3],
  ["Es evidente que ______ razón. (tener, tú)", ["tienes"], "PIÈGE. Les verbes de CERTITUDE à la forme affirmative gardent l'indicatif.", 4],
  ["No es evidente que ______ razón. (tener, tú)", ["tengas"], "Nié, le même verbe passe au subjonctif. Le contraste est tout le mécanisme.", 4],
  ["Es posible que ______ mañana. (venir, él)", ["venga"], "Possibilité → subjonctif.", 3],
  ["Es probable que ya ______ . (salir, ellos)", ["hayan salido"], "Probabilité sur un fait passé → subjonctif passé composé.", 4],
  ["Es imprescindible que todos ______ a la hora. (llegar)", ["lleguen"], "Nécessité → subjonctif.", 3],
  ["Está claro que no ______ nada. (saber, él)", ["sabe"], "PIÈGE. estar claro que, affirmatif → indicatif.", 4],
  ["No creo que ______ razón en esto. (tener, él)", ["tenga"], "Opinion niée → subjonctif.", 3],
  ["Creo que ______ razón. (tener, él)", ["tiene"], "PIÈGE. creer affirmatif → indicatif.", 3],
  ["No digo que ______ mentira, digo que es incompleto. (ser)", ["sea"], "decir nié = on écarte une interprétation → subjonctif.", 5],
  ["Dice que ______ cansado. (estar, él)", ["está"], "PIÈGE. decir = rapporter un fait → indicatif.", 3],
  ["No es que no me ______ , es que no lo necesito. (gustar)", ["guste"], "no es que + subjonctif : on écarte une explication avant d'en donner une autre.", 5],
  ["Dudo mucho que ______ a tiempo. (terminar, nosotros)", ["terminemos"], "dudar + subjonctif.", 3],
  ["No dudo de que ______ capaz. (ser, tú)", ["eres"], "PIÈGE. no dudar = certitude → indicatif.", 5],

  /* — But, condition, manière — */
  ["Lo hizo para que no ______ sus padres. (enterarse)", ["se enteraran","se enterasen"], "para que + subjonctif, concordance au passé. Attention au pronom : SE enteraran, pas « le ».", 4],
  ["Te lo explico para que ______ decidir. (poder, tú)", ["puedas"], "para que + subjonctif présent.", 3],
  ["Se fue sin que nadie se ______ cuenta. (dar)", ["diera","diese"], "sin que + subjonctif. Et c'est « nadie », pas « ninguno ».", 4],
  ["Lo haré con tal de que me ______ en paz. (dejar, tú)", ["dejes"], "con tal de que + subjonctif : condition suffisante.", 4],
  ["No iré a menos que me lo ______ ellos. (pedir)", ["pidan"], "a menos que + subjonctif.", 4],
  ["Iré, salvo que ______ algo urgente. (surgir)", ["surja"], "salvo que + subjonctif.", 5],
  ["Como no ______ pronto, nos vamos sin él. (llegar)", ["llegue"], "como + subjonctif = condition menaçante (« si jamais il n'arrive pas »).", 5],
  ["Como no ______ dinero, nos quedamos en casa. (tener, nosotros)", ["teníamos","teniamos"], "PIÈGE. como + indicatif = cause (« comme nous n'avions pas d'argent »).", 4],
  ["Hazlo como ______ . (querer, tú)", ["quieras"], "Manière non déterminée → subjonctif.", 4],
  ["Lo hice como me ______ . (decir, tú)", ["dijiste"], "PIÈGE. Manière connue et passée → indicatif.", 4],
  ["Me habló como si no me ______ . (conocer, él)", ["conociera","conociese"], "como si + subjonctif imparfait, sans exception.", 5],
  ["De ahí que no ______ nadie. (venir)", ["viniera","haya venido","venga","viniese"], "de ahí que + subjonctif : la conséquence est présentée comme un fait à interpréter.", 5],
  ["Lejos de que el problema se ______ , ha empeorado. (resolver)", ["haya resuelto"], "lejos de que nie le fait → subjonctif. Erreur commise au diagnostic.", 5],

  /* — Relatives et indéfinis — */
  ["No conozco a nadie que ______ chino. (saber)", ["sepa"], "Antécédent nié → relative au subjonctif.", 4],
  ["Conozco a alguien que ______ chino. (saber)", ["sabe"], "PIÈGE. Antécédent réel et identifié → indicatif.", 4],
  ["Busco un piso que ______ terraza. (tener)", ["tenga"], "Le logement n'existe pas encore pour moi → subjonctif.", 4],
  ["Vivo en un piso que ______ terraza. (tener)", ["tiene"], "PIÈGE. Il existe → indicatif.", 3],
  ["Haré lo que ______ necesario. (ser)", ["sea"], "Ce qui sera nécessaire n'est pas encore défini → subjonctif.", 4],
  ["Hice lo que ______ necesario. (ser)", ["era","fue"], "PIÈGE. C'était défini → indicatif.", 4],
  ["Sea lo que ______ , hay que decidir. (ser)", ["sea"], "Structure redoublée : concession totale.", 5],
  ["Diga lo que ______ , no le creo. (decir)", ["diga"], "Même mécanique : « quoi qu'il dise ».", 5],
  ["Quienquiera que ______ , que espere. (ser)", ["sea"], "Indéfini en -quiera → subjonctif obligatoire.", 5],
  ["Ojalá no ______ tanto mañana. (llover)", ["llueva"], "ojalá + subjonctif présent : souhait réalisable.", 3],
  ["Ojalá ______ hecho caso. (haber, yo)", ["hubiera","hubiese"], "ojalá + subjonctif plus-que-parfait : regret sur le passé.", 5],
  ["Quizá ______ mejor esperar. (ser)", ["sea","es"], "quizá admet les deux : subjonctif = plus incertain, indicatif = plus affirmé.", 4],
  ["El hecho de que lo ______ no lo justifica. (hacer, él)", ["hiciera","haya hecho","hiciese"], "el hecho de que + subjonctif : le fait est posé pour être commenté, pas asserté.", 5]
];

/* ---------- SUBJMORFO — fabriquer la forme ----------
   L'autre moitié du trou, et elle est purement mécanique : « trayéramos »
   pour trajéramos, « dicieras » pour dijeras. La règle tient en une ligne
   et ne souffre AUCUNE exception : le subjonctif imparfait se construit
   sur la 3ᵉ personne du PLURIEL du prétérit, moins -ron, plus -ra.
     trajeron → traje- → trajera        dijeron → dije- → dijera
     tuvieron → tuvie- → tuviera        fueron  → fue-  → fuera
   Donc celui qui rate le prétérit ratera le subjonctif imparfait : les
   deux se travaillent ensemble, ici, dans le même exercice. */
window.TALLER_SUBJMORFO = [
  ["Nos pidieron que ______ el informe. (traer, nosotros)", ["trajéramos","trajésemos"], "trajeron → traje- → trajéramos. Jamais « trayéramos » : le radical vient du prétérit, pas de l'infinitif.", 4],
  ["Habría preferido que no ______ nada. (decir, tú)", ["hubieras dicho","hubieses dicho","dijeras","dijeses"], "dijeron → dije- → dijeras. « Dicieras » n'existe pas.", 5],
  ["Me pidió que ______ más despacio. (hablar, yo)", ["hablara","hablase"], "hablaron → habla- → hablara. Régulier.", 3],
  ["Quería que ______ con nosotros. (venir, tú)", ["vinieras","vinieses"], "vinieron → vinie- → vinieras.", 4],
  ["No había nadie que lo ______ . (saber)", ["supiera","supiese"], "supieron → supie- → supiera.", 4],
  ["Si ______ más tiempo, viajaría más. (tener, yo)", ["tuviera","tuviese"], "tuvieron → tuvie- → tuviera.", 4],
  ["Le dije que ______ cuidado. (tener, él)", ["tuviera","tuviese"], "Même radical, autre personne.", 3],
  ["Ojalá ______ aquí ahora. (estar, tú)", ["estuvieras","estuvieses"], "estuvieron → estuvie- → estuvieras.", 4],
  ["Nos rogó que ______ pacientes. (ser, nosotros)", ["fuéramos","fuésemos"], "fueron → fue- → fuéramos. Vaut pour ser ET pour ir.", 4],
  ["Como si ______ a la luna. (ir, él)", ["fuera","fuese"], "Même forme que ser : le contexte tranche.", 4],
  ["Esperaba que lo ______ antes. (hacer, ellos)", ["hicieran","hiciesen"], "hicieron → hicie- → hicieran.", 4],
  ["Dudaba que ______ capaz. (ser, ella)", ["fuera","fuese"], "Radical fue-.", 3],
  ["Nos mandaron que ______ el documento. (leer, nosotros)", ["leyéramos","leyésemos"], "leyeron → leye- → leyéramos. Le y du prétérit reste.", 5],
  ["Temía que ______ demasiado tarde. (ser)", ["fuera","fuese"], "Radical fue-.", 3],
  ["No creí que ______ tanto. (costar)", ["costara","costase"], "costaron → costa- → costara.", 3],
  ["Quería que me ______ la verdad. (decir, ellos)", ["dijeran","dijesen"], "dijeron → dije- → dijeran.", 4],
  ["Si ______ sabido antes, no habría ido. (haber, yo)", ["hubiera","hubiese"], "hubieron → hubie- → hubiera. C'est l'auxiliaire de tout l'irréel du passé.", 4],
  ["Me extrañó que no ______ nada. (traer, ellos)", ["trajeran","trajesen"], "Même radical que trajéramos.", 4],
  ["Le molestaba que le ______ así. (hablar, nosotros)", ["habláramos","hablásemos"], "Attention à l'accent : habláramos.", 4],
  ["Buscaban a alguien que ______ alemán. (hablar)", ["hablara","hablase"], "Antécédent indéfini au passé.", 3],
  ["Nos aconsejó que ______ pronto. (salir, nosotros)", ["saliéramos","saliésemos"], "salieron → salie- → saliéramos.", 3],
  ["Como si no ______ bastante. (tener, él)", ["tuviera","tuviese"], "Radical tuvie-.", 4],
  ["Ojalá ______ dicho algo. (haber, ellos)", ["hubieran","hubiesen"], "Auxiliaire au subjonctif imparfait + participe.", 5],
  ["Habría sido mejor que ______ callado. (haber, tú)", ["hubieras","hubieses"], "Même structure, formulation C1.", 5],
  ["Me sorprendió que ______ tan pronto. (irse, ellos)", ["se fueran","se fuesen"], "Radical fue- + pronom devant.", 4],
  ["No pensaba que ______ tanto frío. (hacer)", ["hiciera","hiciese"], "Radical hicie-.", 3],
  ["Insistió en que ______ con él. (ir, nosotros)", ["fuéramos","fuésemos"], "insistir en que + subjonctif, radical fue-.", 4],
  ["Prefería que lo ______ tú. (conducir)", ["condujeras","condujeses"], "condujeron → conduje- → condujeras. Tous les verbes en -ducir suivent ce moule.", 5],
  ["Nos pidió que ______ silencio. (hacer, nosotros)", ["hiciéramos","hiciésemos"], "Radical hicie-.", 3],
  ["Dudo que ______ eso ayer. (decir, él)", ["dijera","haya dicho","dijese"], "Fait passé + doute : les deux subjonctifs passés sont corrects.", 4]
];

/* ---------- PASADO — le système des temps du passé ----------
   Deuxième chantier. Au diagnostic : 5/9 en B1 et 1/4 en B2 sur `tiempos`,
   et surtout deux phrases fautives NON REPÉRÉES — « Ayer he visto a tu
   hermano » et « Cuando era joven he vivido en Madrid ». Les deux sont le
   même calque : le français dit « j'ai vu hier », l'espagnol d'Espagne ne
   le peut pas. Tant que l'oreille ne tique pas là-dessus, le reste du
   système ne peut pas se mettre en place.
   LA RÈGLE, en un bloc : la période est-elle close ?
     ayer, el lunes, en 2019, hace dos años  → PRÉTÉRIT (vi)
     hoy, esta semana, este año, ya, todavía → PASSÉ COMPOSÉ (he visto)
     décor, habitude, âge, description       → IMPARFAIT (vivía)
     antérieur à un autre passé              → PLUS-QUE-PARFAIT (había ido) */
window.TALLER_PASADO = [
  ["Ayer ______ a tu hermano en el metro. (ver, yo)", ["vi"], "ayer ferme la période → prétérit. « He visto » est impossible avec ayer en espagnol d'Espagne.", 3],
  ["Esta semana ______ tres libros. (leer, yo)", ["he leído","he leido"], "esta semana n'est pas close → passé composé.", 3],
  ["Cuando era joven, ______ en Madrid dos años. (vivir, yo)", ["viví","vivi"], "Durée délimitée et close → prétérit, malgré le « cuando era joven ».", 4],
  ["Cuando era joven, ______ mucho los domingos. (salir, yo)", ["salía","salia"], "Habitude non délimitée → imparfait. Le contraste avec l'item précédent est la clé.", 4],
  ["Para cuando llegamos, ya ______ todos. (irse)", ["se habían ido","se habian ido"], "Antériorité par rapport à un autre fait passé → plus-que-parfait. Le pronom va devant l'auxiliaire.", 4],
  ["No sabía que ______ . (irse, él)", ["se había ido","se habia ido"], "Son départ précède mon ignorance → plus-que-parfait. « Se fue » casserait la chronologie.", 4],
  ["Me dijo que no ______ ayudarme ese día. (poder, él)", ["podía","podia"], "Discours rapporté : le présent « no puedo » devient imparfait. « Podría » traduirait un conditionnel qu'il n'a pas dit.", 3],
  ["Me prometió que lo ______ antes del lunes. (terminar, él)", ["terminaría","terminaria"], "Le futur du discours direct devient conditionnel au rapporté.", 4],
  ["Dijo que ya lo ______ . (hacer, él)", ["había hecho","habia hecho"], "Le passé composé du direct devient plus-que-parfait au rapporté.", 4],
  ["______ tres años que no lo veo. (hacer)", ["hace"], "hace + durée + que + PRÉSENT. L'espagnol reste au présent là où le français passe au passé composé.", 3],
  ["______ tres años sin verlo. (llevar, yo)", ["llevo"], "llevar + durée + sin + infinitif. Au présent, jamais au prétérit : « llevé » dirait que c'est fini.", 4],
  ["No lo veo ______ marzo.", ["desde"], "desde + point de départ daté. desde hace + durée.", 3],
  ["Estudio español ______ tres años.", ["desde hace"], "Durée → desde hace. « Desde tres años » mélange les deux.", 4],
  ["Mientras ______ la cena, llamaron a la puerta. (preparar, yo)", ["preparaba"], "Décor en cours (imparfait) interrompu par un fait ponctuel (prétérit).", 3],
  ["Mientras ______ la cena, escuchaba la radio. (preparar, yo)", ["preparaba"], "Deux décors simultanés → deux imparfaits.", 3],
  ["______ las tres cuando por fin apareció. (ser)", ["eran"], "L'heure dans un récit est toujours à l'imparfait.", 3],
  ["El año pasado ______ a Sevilla dos veces. (ir, nosotros)", ["fuimos"], "Période close → prétérit.", 3],
  ["Este año ______ a Sevilla dos veces. (ir, nosotros)", ["hemos ido"], "Période ouverte → passé composé. Le seul mot qui change est le déictique.", 3],
  ["Todavía no ______ la respuesta. (recibir, yo)", ["he recibido"], "todavía no appelle le passé composé : le présent est encore concerné.", 3],
  ["______ a llover justo cuando salíamos. (empezar)", ["empezó"], "Fait ponctuel dans un décor → prétérit.", 3],
  ["Nunca ______ nada parecido. (ver, yo)", ["he visto"], "Bilan de vie ouvert → passé composé.", 3],
  ["De pequeño ______ muy tímido. (ser, yo)", ["era"], "Description d'un état durable → imparfait.", 3],
  ["La semana pasada ______ muy cansado toda la semana. (estar, yo)", ["estuve"], "État borné par une période close → prétérit, même pour un état.", 4],
  ["Cuando llegué, la reunión ya ______ . (empezar)", ["había empezado"], "Antériorité → plus-que-parfait.", 4],
  ["Para cuando llegues, ya lo ______ todo. (terminar, yo)", ["habré terminado"], "Antériorité dans le FUTUR → futur antérieur. Temps presque jamais produit spontanément par un francophone.", 5],
  ["No contesta: ______ durmiendo. (estar, él)", ["estará"], "Futur de PROBABILITÉ : « il doit être en train de dormir ». Erreur commise au diagnostic.", 4],
  ["¿Qué hora es? ______ las dos. (ser)", ["serán"], "Même mécanique : le futur exprime la conjecture sur le présent.", 4],
  ["Ya ______ llegado, porque su coche está abajo. (haber, él)", ["habrá"], "Futur antérieur de probabilité sur un fait passé.", 5],
  ["Lo ______ ayer, pero no estoy seguro. (hacer, él)", ["haría"], "Le conditionnel fait la conjecture sur le PASSÉ, comme le futur la fait sur le présent.", 5],
  ["Llevaba dos horas ______ cuando llegamos. (esperar)", ["esperando"], "llevar + gérondif à l'imparfait = durée antérieure à un autre passé.", 4],
  ["Acababa de ______ cuando sonó el teléfono. (salir, yo)", ["salir"], "acabar de + infinitif, à l'imparfait pour le passé immédiat dans le récit.", 4],
  ["En 2019 ______ en una empresa de auditoría. (trabajar, yo)", ["trabajé","trabajaba"], "Les deux sont bons et ne disent pas la même chose : « trabajé » borne la mission, « trabajaba » décrit la situation de l'époque.", 4],
  ["Anoche no ______ nada: estaba demasiado nervioso. (dormir, yo)", ["dormí"], "anoche ferme la période → prétérit.", 3],
  ["Hoy ______ fatal. (dormir, yo)", ["he dormido"], "hoy est ouvert → passé composé.", 3],
  ["Me enteré de que ______ el puesto. (conseguir, ella)", ["había conseguido"], "Le fait précède la prise de connaissance → plus-que-parfait.", 4],
  ["Hace dos años que ______ aquí. (vivir, yo)", ["vivo"], "hace… que + présent pour une situation en cours.", 3],
  ["Si hubiera salido antes, no ______ el tren. (perder, yo)", ["habría perdido","hubiera perdido","hubiese perdido"], "Irréel du passé : conditionnel composé (ou hubiera perdido, admis).", 4],
  ["De ______ sabido antes, no habría venido. (haber, lo)", ["haberlo"], "de + infinitif composé = « si je l'avais su ». Registre soutenu, très économique.", 5]
];

/* ---------- RELAT — les relatives ----------
   Petit chantier mais très visible : « es el libro cual te hablé » au
   diagnostic. Le français « dont » cache la préposition, et l'espagnol
   l'exige. Règle : on conjugue d'abord le verbe avec SA préposition
   (hablar DE algo), puis on la met devant le relatif. */
window.TALLER_RELAT = [
  ["Es el libro ______ te hablé.", ["del que","del cual","de que"], "hablar DE algo → del que. Le « dont » français cache la préposition.", 4],
  ["Ese es el motivo ______ renunció.", ["por el que","por el cual"], "Le relatif reprend une cause → por el que.", 4],
  ["La chica ______ te hablé se llama Lucía.", ["de la que","de la cual"], "Accord en genre avec l'antécédent.", 4],
  ["El problema ______ nos enfrentamos es grave.", ["al que","al cual"], "enfrentarse A algo → al que.", 5],
  ["La empresa ______ trabajo está en Madrid.", ["en la que","en la cual","donde"], "trabajar EN → en la que.", 4],
  ["Un autor ______ obra desconocía por completo.", ["cuya"], "cuyo s'accorde avec le nom qui SUIT, pas avec le possesseur.", 5],
  ["Un problema ______ causas ignoramos.", ["cuyas"], "causas, féminin pluriel → cuyas.", 5],
  ["______ avisa no es traidor.", ["quien","el que"], "Relatif sans antécédent exprimé → quien. « El cual » exige un antécédent.", 4],
  ["Fue entonces ______ me di cuenta.", ["cuando"], "Mise en relief d'un temps → cuando. « Fue entonces que » est un calque du français.", 5],
  ["Fue allí ______ nos conocimos.", ["donde"], "Mise en relief d'un lieu → donde.", 5],
  ["Fue por eso ______ no vine.", ["por lo que"], "Mise en relief d'une cause → por lo que.", 5],
  ["No me gustó, ______ no quiere decir que sea malo.", ["lo que","lo cual"], "lo que / lo cual reprend TOUTE la proposition précédente, pas un nom.", 5],
  ["Llegó tarde, ______ nos obligó a empezar sin él.", ["lo que","lo cual"], "Même mécanique.", 5],
  ["El libro ______ compré ayer está malísimo.", ["que"], "PIÈGE. Pas de préposition, antécédent chose → que, tout simplement.", 3],
  ["Las personas ______ hablé eran profesores.", ["con las que","con quienes","con las cuales"], "hablar CON alguien → con las que.", 4],
  ["El día ______ nos conocimos llovía.", ["en que","en el que","cuando"], "Antécédent temporel → en que.", 4],
  ["Hay quien ______ que es imposible. (decir)", ["dice"], "hay quien + indicatif quand on constate une opinion existante.", 5],
  ["No hay quien lo ______ . (entender)", ["entienda"], "no hay quien + subjonctif : l'antécédent est nié.", 5]
];

/* ---------- C1LEX — locutions, connecteurs, précision ----------
   Troisième chantier. Au diagnostic : 3/7 sur les locutions figées au
   niveau C1, 2/5 en précision lexicale, 2/3 sur les connecteurs C1. Ce
   n'est plus de la grammaire : à ce stade, ce qui sépare un B2 d'un C1
   est le verbe qui va avec le nom, la locution qui existe telle quelle,
   et le connecteur qui dit exactement le rapport logique voulu.
   Ces items se tapent aussi : reconnaître « hacer caso omiso » dans une
   liste ne sert à rien si le mot ne vient pas au moment d'écrire. */
window.TALLER_C1LEX = [
  ["Hicieron ______ omiso de todas las advertencias.", ["caso"], "hacer caso omiso de = ignorer délibérément. Locution figée du registre soutenu.", 5],
  ["No da su ______ a torcer jamás.", ["brazo"], "no dar su brazo a torcer = ne pas céder d'un pouce. Le possessif est obligatoire.", 5],
  ["Su argumento no se ______ en pie.", ["tiene"], "no tenerse en pie, en parlant d'un raisonnement.", 5],
  ["Aprobó el examen ______ los pelos.", ["por"], "por los pelos = de justesse.", 4],
  ["Se quedó ______ piedra al oír la noticia.", ["de"], "quedarse de piedra = rester sidéré.", 4],
  ["Lo contó con toda la ______ del mundo.", ["naturalidad"], "naturalidad = le naturel, l'aisance. naturaleza = la nature. Paire que les francophones confondent.", 5],
  ["Los dos ministros firmaron ______ documentos.", ["sendos"], "sendos = un chacun. Ni ambos (les deux), ni varios (plusieurs).", 5],
  ["Le ______ una multa por aparcar mal. (ellos)", ["pusieron"], "poner una multa. « Dar » ou « echar » ne se disent pas.", 4],
  ["Tengo que ______ una decisión antes del viernes.", ["tomar"], "tomar una decisión. « Hacer una decisión » est un calque de l'anglais.", 3],
  ["La medida ______ en vigor el lunes. (entrar)", ["entrará","entra"], "entrar en vigor. Collocation administrative fixe.", 5],
  ["Me ______ la atención que no dijera nada. (llamar)", ["llamó"], "llamar la atención = frapper, intriguer.", 4],
  ["No me saludó; ni ______ me miró.", ["siquiera"], "ni siquiera = pas même. « Ni tampoco » ne gradue pas.", 5],
  ["No contestó. ______ , su silencio ya era una respuesta.", ["con todo"], "con todo = malgré tout. Concède puis reprend. « En efecto » confirmerait au lieu d'opposer.", 5],
  ["Es caro; ______ , la calidad lo justifica.", ["no obstante","con todo","sin embargo"], "Trois concessifs soutenus et interchangeables ici.", 4],
  ["Trabajó mucho; ______ , no aprobó.", ["sin embargo","no obstante","con todo"], "Opposition simple.", 3],
  ["Llovía. ______ , decidimos salir igual.", ["aun así","con todo","aun asi"], "aun así = malgré cela.", 4],
  ["No vino. ______ , nadie preguntó por él.", ["por cierto","es más","de hecho"], "Plusieurs enchaînements possibles ; « de hecho » renforce le constat.", 5],
  ["No es rico; ______ , vive mejor que muchos.", ["ahora bien","con todo","sin embargo"], "ahora bien introduit une restriction argumentative.", 5],
  ["______ , conviene distinguir dos cosas.", ["ante todo","en primer lugar"], "Ouverture d'une argumentation soutenue.", 4],
  ["No lo hizo por dinero, ______ por principio.", ["sino"], "sino corrige une négation. « Pero » opposerait deux faits.", 3],
  ["No lo hizo por dinero, ______ lo necesitaba.", ["pero"], "PIÈGE. Ici il n'y a pas de correction d'une négation : pero.", 4],
  ["No solo llegó tarde, ______ encima se quejó.", ["sino que"], "no solo… sino que (+ verbe conjugué).", 4],
  ["¡______ fueras tú el que manda aquí!", ["ni que"], "ni que + subjonctif imparfait = « on dirait que », ironique.", 5],
  ["A ______ por su cara, no le gustó.", ["juzgar"], "a juzgar por = à en juger par.", 5],
  ["Dio ______ hecho que vendríamos.", ["por"], "dar por hecho / dar por sentado = tenir pour acquis.", 5],
  ["Se puso ______ una furia cuando se lo dije.", ["hecho"], "ponerse hecho una furia.", 5],
  ["Trabaja ______ cuenta propia desde hace dos años.", ["por"], "por cuenta propia = à son compte.", 4],
  ["Eso no tiene nada que ______ con lo que digo.", ["ver"], "no tener nada que ver con.", 3],
  ["______ mucho de menos a mi familia. (echar, yo)", ["echo"], "echar de menos = manquer à quelqu'un. Sans équivalent littéral en français.", 3],
  ["Un informe ______ : dos páginas, ni una cifra de más.", ["escueto"], "escueto = concis, dépouillé. escaso = insuffisant : ce n'est pas un compliment.", 5],
  ["Es un argumento ______ : no se sostiene.", ["endeble","flojo"], "endeble = fragile, qui ne tient pas. Registre soutenu.", 5],
  ["Lo dijo de ______ , sin pensarlo.", ["pasada"], "de pasada = en passant.", 5],
  ["Lo resolvió sobre la ______ .", ["marcha"], "sobre la marcha = au fur et à mesure, à l'improviste.", 5],
  ["Está ______ de trabajo hasta arriba.", ["hasta"], "estar hasta arriba de trabajo = être débordé. (Réponse : le mot manquant est bien « hasta ».)", 4],
  ["No tiene ______ nada que ver, es otro asunto.", ["ni"], "ni nada que ver, renforcement de la négation.", 4],
  ["A ______ de que insistió, no lo consiguió.", ["pesar"], "a pesar de que = bien que.", 3],
  ["______ cuenta de su error demasiado tarde. (darse, él)", ["se dio"], "darse cuenta DE. Le verbe est pronominal.", 3],
  ["Me ______ de que te hayas acordado. (alegrar)", ["alegro"], "alegrarse DE que + subjonctif.", 3],
  ["Se ______ a firmar el contrato. (negar, él)", ["negó"], "negarse A. Le français « refuser de » pousse vers « de » : c'est le piège.", 4],
  ["Se ______ en hacerlo todo solo. (empeñar, él)", ["empeñó"], "empeñarse EN.", 4]
];

/* ---------- TRAD — thème FR→ES court ----------
   Le plancher absolu du diagnostic : 5/12. C'est le seul exercice où
   RIEN n'est donné — ni options, ni amorce, ni verbe entre parenthèses.
   Chaque phrase est bâtie sur une structure travaillée plus haut : le
   thème n'est pas un exercice de plus, c'est l'épreuve de sortie des
   quatre chantiers.
   La correction vérifie la présence des éléments décisifs (must) : elle
   peut refuser une bonne traduction tournée autrement. En cas de doute,
   la bonne réponse est affichée et c'est à toi de trancher. */
window.TALLER_TRAD = [
  ["Ça fait trois ans que je ne l'ai pas vu.", ["Hace tres años que no lo veo.","No lo veo desde hace tres años."], ["(hace tres anos que|desde hace tres anos|llevo tres anos)","(no lo veo|sin verlo|no lo he visto)"], "hace + durée + que + PRÉSENT. Ta réponse au diagnostic, « llevé 3 años sin verte », changeait le temps ET la personne.", 3],
  ["Je ne savais pas qu'il était parti.", ["No sabía que se había ido."], ["no sabia","(se habia ido|se habia marchado)"], "Antériorité → plus-que-parfait. « Se fue » casse la chronologie.", 4],
  ["Dès qu'il aura répondu, je te préviens.", ["En cuanto conteste, te aviso."], ["(en cuanto|tan pronto como|cuando)","(conteste|responda|haya contestado|haya respondido)"], "Pas d'indicatif ni de futur après en cuanto : subjonctif.", 4],
  ["Il faudrait qu'on parte avant la nuit.", ["Habría que irnos antes de que anochezca."], ["(habria que|tendriamos que|habriamos de)","antes de que","(anochezca|se haga de noche)"], "Deux pièges : le conditionnel impersonnel, et « antes DE que » (la préposition n'est pas optionnelle).", 4],
  ["Il est parti sans que personne s'en aperçoive.", ["Se fue sin que nadie se diera cuenta."], ["sin que nadie","(se diera cuenta|se diese cuenta|se percatara|se enterara)"], "nadie, pas « ninguno ». Et concordance au passé.", 5],
  ["C'est le livre dont je t'avais parlé.", ["Es el libro del que te había hablado."], ["(del que|del cual)","(te habia hablado|te hable)"], "« dont » cache la préposition : hablar DE → del que.", 5],
  ["Il aurait mieux valu ne rien dire.", ["Habría sido mejor no decir nada.","Más habría valido callarse."], ["(habria sido mejor|hubiera sido mejor|mas habria valido|mejor habria sido)","(no decir nada|no haber dicho nada|callarse)"], "Impersonnel au conditionnel passé.", 5],
  ["Bien que ce soit difficile, je vais essayer.", ["Aunque sea difícil, lo voy a intentar."], ["aunque sea","(intentar|intentarlo|probar)"], "aunque + subjonctif : hypothèse concédée.", 4],
  ["Quand tu arriveras, appelle-moi.", ["Cuando llegues, llámame."], ["cuando llegues","(llamame|me llamas|llamame)"], "cuando + futur → subjonctif.", 3],
  ["Ça m'étonne qu'il n'ait pas encore appelé.", ["Me extraña que todavía no haya llamado."], ["me extrana que","(no haya llamado|aun no haya llamado)"], "Fait passé vu du présent → subjonctif passé composé.", 4],
  ["Ils nous ont demandé d'apporter le rapport.", ["Nos pidieron que trajéramos el informe."], ["(nos pidieron que|pidieron que)","(trajeramos|trajesemos|llevaramos)"], "pedir que + subjonctif. Jamais « pedir de + infinitif ».", 4],
  ["Il m'a parlé comme s'il ne me connaissait pas.", ["Me habló como si no me conociera."], ["como si","(conociera|conociese)"], "como si + subjonctif imparfait, sans exception.", 5],
  ["Hier j'ai vu ton frère dans le métro.", ["Ayer vi a tu hermano en el metro."], ["ayer vi","a tu hermano"], "ayer ferme la période → prétérit. Jamais « he visto ».", 3],
  ["Cette semaine j'ai lu trois livres.", ["Esta semana he leído tres libros."], ["esta semana","he leido"], "Période ouverte → passé composé. Le contraste avec la phrase précédente est tout le système.", 3],
  ["Quand nous sommes arrivés, ils étaient déjà partis.", ["Cuando llegamos, ya se habían ido."], ["cuando llegamos","(se habian ido|se habian marchado|ya se habian)"], "Antériorité dans le passé → plus-que-parfait.", 4],
  ["Il ne répond pas : il doit dormir.", ["No contesta: estará durmiendo."], ["(no contesta|no responde)","(estara durmiendo|estara dormido|debe de estar durmiendo)"], "Futur de probabilité, ou deber DE. Pas « debe dormir », qui serait une obligation.", 4],
  ["Je l'ai fait pour qu'ils ne le sachent pas.", ["Lo hice para que no lo supieran."], ["para que no","(supieran|supiesen|se enteraran)"], "para que + subjonctif, concordance au passé.", 4],
  ["Je ne connais personne qui parle arabe.", ["No conozco a nadie que hable árabe."], ["no conozco a nadie que","(hable arabe|sepa arabe)"], "Antécédent nié → relative au subjonctif. Et le « a » personnel.", 4],
  ["Quoi qu'il arrive, préviens-moi.", ["Pase lo que pase, avísame."], ["(pase lo que pase|ocurra lo que ocurra|sea lo que sea)","(avisame|me avisas)"], "Structure redoublée.", 5],
  ["Plus j'y pense, moins je comprends.", ["Cuanto más lo pienso, menos lo entiendo."], ["cuanto mas lo pienso","menos lo entiendo"], "cuanto más… menos…", 4],
  ["On m'a volé mon portefeuille dans le métro.", ["Me robaron la cartera en el metro."], ["me robaron","(la cartera|la billetera|el monedero)"], "« On » → 3ᵉ du pluriel, et le possessif français devient un article : me robaron LA cartera.", 4],
  ["Il s'est mis à pleuvoir au moment où nous sortions.", ["Empezó a llover justo cuando salíamos."], ["(empezo a llover|se puso a llover)","(cuando saliamos|al salir)"], "Ponctuel sur décor : prétérit + imparfait.", 4],
  ["Si tu me l'avais dit, je serais venu.", ["Si me lo hubieras dicho, habría venido."], ["(hubieras dicho|hubieses dicho)","(habria venido|hubiera venido)"], "Irréel du passé.", 4],
  ["Je n'ai pas le temps.", ["No tengo tiempo."], ["no tengo tiempo"], "Pas d'article devant un nom massif indéterminé. « No tengo el tiempo » est un calque du français.", 3],
  ["C'est la première fois que je vais en Espagne.", ["Es la primera vez que voy a España."], ["(es la primera vez|primera vez)","voy a espana"], "Déplacement → a. « Voy en España » est un calque.", 3],
  ["Ça dépend de ce que tu veux.", ["Depende de lo que quieras."], ["depende de","(lo que quieras|lo que quieres)"], "depender DE, y compris devant « lo que » ou « si ».", 4],
  ["Je me souviens de son visage.", ["Me acuerdo de su cara.","Recuerdo su cara."], ["(me acuerdo de|recuerdo)","(su cara|su rostro)"], "Deux verbes, deux constructions : recordar algo, ou acordarse DE algo. « Me recuerdo de » mélange les deux.", 4],
  ["Il a ignoré tous les avertissements.", ["Hizo caso omiso de todas las advertencias."], ["(hizo caso omiso|ignoro|no hizo caso)","(advertencias|avisos)"], "hacer caso omiso de.", 5],
  ["Ce n'est pas que ça ne me plaise pas, c'est que je n'en ai pas besoin.", ["No es que no me guste, es que no lo necesito."], ["no es que no me guste","(no lo necesito|no me hace falta)"], "no es que + subjonctif, puis es que + indicatif. Les deux moitiés n'ont pas le même mode.", 5],
  ["C'est alors que j'ai compris.", ["Fue entonces cuando lo entendí."], ["fue entonces cuando","(lo entendi|me di cuenta|comprendi)"], "Mise en relief d'un temps → cuando. « Fue entonces que » est un calque.", 5],
  ["Il travaille à son compte depuis deux ans.", ["Trabaja por cuenta propia desde hace dos años."], ["por cuenta propia","desde hace dos anos"], "Deux collocations dans la même phrase.", 4],
  ["Je préférerais que tu ne dises rien.", ["Preferiría que no dijeras nada."], ["(preferiria|prefiero)","(no dijeras nada|no dijeses nada|no digas nada)"], "Conditionnel de politesse → subjonctif imparfait.", 5],
  ["Avant de partir, ferme la fenêtre.", ["Antes de irte, cierra la ventana."], ["antes de (irte|salir|que te vayas)","(cierra|cierre)"], "Même sujet → antes de + infinitif. Sujets différents → antes de que + subjonctif.", 3],
  ["Il paraît qu'ils vont fermer l'usine.", ["Parece que van a cerrar la fábrica."], ["(parece que|al parecer|dicen que)","(cerrar la fabrica|van a cerrar)"], "parecer que + indicatif à la forme affirmative.", 4],
  ["Il ne semble pas que ce soit une bonne idée.", ["No parece que sea buena idea."], ["no parece que","(sea|fuera)"], "Nié, parecer passe au subjonctif. Contraste direct avec la phrase précédente.", 4],
  ["Dis-le-lui quand tu le verras.", ["Díselo cuando lo veas."], ["(diselo|se lo dices)","cuando lo veas"], "le + lo devient se lo, et cuando + futur → subjonctif. Deux mécanismes dans quatre mots.", 4],
  ["Ils ont fini par accepter.", ["Acabaron aceptando.","Terminaron por aceptar."], ["(acabaron|terminaron)","(aceptando|por aceptar)"], "acabar + gérondif ou acabar POR + infinitif. Les deux existent.", 4],
  ["Cela n'a rien à voir avec ce que je disais.", ["Eso no tiene nada que ver con lo que decía."], ["no tiene nada que ver","(lo que decia|lo que dije)"], "Locution complète, avec « con ».", 4],
  ["Elle est partie sans rien dire.", ["Se fue sin decir nada."], ["se (fue|marcho)","sin decir nada"], "Même sujet → sin + infinitif, et « nada » après le verbe.", 3],
  ["Je viens de finir.", ["Acabo de terminar."], ["acabo de (terminar|acabar|finalizar)"], "acabar de + infinitif, au PRÉSENT. « Acabé de terminar » dirait autre chose.", 3]
];
