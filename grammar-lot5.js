/* ============================================================
   CUMBRE — Grammaire lot 5 : les trous du parcours (8 leçons)
   2026-10-11. Le parcours montait jusqu'au C2, mais des points de base
   n'avaient JAMAIS de leçon : la « a » personnelle, les comparatifs, les
   indéfinis (cualquier, otro…), le plus-que-parfait, « cuando + subjonctif »,
   les prépositions a/en/de, infinitif vs gérondif, et la condition sans « si ».
   Chaque leçon est insérée À SON NIVEAU (après la leçon indiquée), pas en
   fin de liste. Le déblocage (app.js) laisse ouverte une leçon insérée dès
   qu'une leçon plus loin est déjà validée : rien ne se re-verrouille.
   + 4 exemples « A fondo » par leçon (LESSON_EXTRA).
   Charger APRÈS data.js et après le fichier qui définit LESSON_EXTRA.
   ============================================================ */
(function () {
  const LESSONS = window.LESSONS;
  if (!LESSONS) return;
  const NEW = [
  { after: "gustar", id: "apersonal", title: "La « a » personnelle", tag: "A2 · Fondations",
    note: "Quand le complément d'objet direct est une <b>personne précise</b>, l'espagnol met <b>a</b> devant : <i>Veo <b>a</b> María</i> · <i>Busco <b>a</b> mi hermano</i>. Pour une chose : pas de « a » → <i>Veo la casa</i>.<br>• Personne <b>indéterminée</b> (n'importe laquelle) → pas de « a » : <i>Busco un médico</i> (un, peu importe lequel) ≠ <i>Busco <b>al</b> médico</i> (le mien).<br>• Après <b>tener</b> → pas de « a » : <i>Tengo dos hermanos</i>.<br>• <b>alguien, nadie, quien</b> prennent toujours « a » : <i>No conozco <b>a</b> nadie</i>.<br>• Animaux auxquels on tient, aussi : <i>Quiero mucho <b>a</b> mi perro</i>.<br>• a + el = <b>al</b> : <i>Llama al médico</i>.<br>Réflexe : « est-ce une personne précise qui subit l'action ? » → <b>a</b>.",
    q: [
      ["Ayer vi ______ tu hermano en el supermercado.", ["al","de","a","∅ (rien)"], 2, "Personne précise (ton frère) en COD → a personnelle : vi a tu hermano."],
      ["Este verano visitamos ______ museo del Prado.", ["el","a","al","a el"], 0, "Un musée est une chose → pas de « a » : visitamos el museo."],
      ["Tengo ______ tres primos en Valencia.", ["de","∅ (rien)","al","a"], 1, "Après « tener », pas de « a » personnelle : tengo tres primos."],
      ["¿Conoces ______ alguien que hable alemán?", ["de","∅ (rien)","al","a"], 3, "« alguien / nadie » prennent toujours la « a » : ¿conoces a alguien?"],
      ["Buscamos ______ un camarero con experiencia (n'importe lequel, on recrute).", ["a","al","∅ (rien)","de"], 2, "Personne indéterminée, pas encore identifiée → pas de « a » : buscamos un camarero."],
      ["Llama ______ médico, que no me encuentro bien.", ["al","a","el","a el"], 0, "Personne précise (le médecin) → a + el = al. « a el » ne s'écrit jamais."],
      ["No veo ______ nadie en la calle.", ["a","de","al","∅ (rien)"], 0, "« nadie » en COD → a nadie."],
      ["Quiero mucho ______ mi perro.", ["a","al","∅ (rien)","por"], 0, "Animal auquel on est attaché, traité comme une personne → a mi perro."],
      ["Echo de menos ______ mis amigos de Lyon.", ["a","por","de","∅ (rien)"], 0, "« echar de menos a alguien » = manquer à quelqu'un. Le « de » est déjà dans la locution ; la personne prend « a ». Piège du calque « de »."],
      ["Necesitamos ______ un fontanero urgentemente.", ["al","de","a","∅ (rien)"], 3, "N'importe quel plombier, on ne le connaît pas → pas de « a »."]
    ] },
  { after: "apersonal", id: "comparativos", title: "Comparatifs & superlatifs", tag: "A2-B1 · Comparer",
    note: "• Supériorité / infériorité : <b>más / menos</b> + adjectif + <b>que</b> → <i>Es más alto que yo</i>.<br>• Égalité avec adjectif ou adverbe : <b>tan … como</b> → <i>tan grande como</i>.<br>• Égalité avec un nom : <b>tanto/tanta/tantos/tantas</b> + nom + <b>como</b> (accord !) → <i>tanta paciencia como tú</i>.<br>• Égalité avec un verbe : verbe + <b>tanto como</b> → <i>Trabaja tanto como su jefe</i>.<br>• Irréguliers : bueno → <b>mejor</b>, malo → <b>peor</b>, (âge) <b>mayor / menor</b>. Jamais « más bueno » pour la qualité, jamais « más mejor ».<br>• Avec un nombre : <b>más de</b> + nombre (<i>más de cincuenta</i>) ; devant une proposition : <b>más … de lo que</b> (<i>más difícil de lo que pensaba</i>).<br>• Superlatif : <b>el/la más</b> + adj + <b>de</b> → <i>la ciudad más bonita de España</i> (jamais « en »).<br>• Identité : <b>el mismo … que</b> → <i>el mismo coche que tú</i>.",
    q: [
      ["Mi hermano es ______ alto que yo.", ["muy","tan","más","tanto"], 2, "Supériorité : más + adjectif + que."],
      ["Madrid no es tan grande ______ Tokio.", ["que","de","como","cuanto"], 2, "Égalité : tan … como (jamais « tan … que », qui exprime la conséquence)."],
      ["Este restaurante es ______ que el otro; la comida es excelente.", ["más bueno","más mejor","bueno","mejor"], 3, "Comparatif irrégulier : bueno → mejor. « más mejor » est une faute."],
      ["Es la ciudad más bonita ______ España.", ["por","que","de","en"], 2, "Superlatif : el/la más … de + groupe de référence."],
      ["Hay ______ cincuenta personas en la sala.", ["más como","tan","más que","más de"], 3, "Devant un nombre, « plus de » = más de."],
      ["No tengo ______ paciencia como tú.", ["tan","tanta","tantas","tanto"], 1, "Égalité avec un nom : tanto s'accorde → paciencia (fém. sing.) → tanta."],
      ["Juan trabaja ______ como su jefe.", ["tanto","tan","tanta","tantos"], 0, "Égalité avec un verbe : verbe + tanto como (invariable)."],
      ["El examen fue ______ difícil de lo que pensaba.", ["muy","tanto","tan","más"], 3, "Comparaison avec une proposition : más + adj + de lo que + verbe."],
      ["Tengo el mismo coche ______ tú.", ["como","de","que","a"], 2, "Identité : el mismo … que, comme en français. Jamais « como »."]
    ] },
  { after: "pronombres", id: "indefinidos", title: "Indéfinis : algún, cualquier, otro, cada…", tag: "B1 · Quantifier",
    note: "• <b>alguno/a/os/as</b> = quelque(s), un(e) certain(e) ; <b>algún</b> devant nom masc. sing. (<i>algún día</i>). Contraire : ningún (voir Dudas).<br>• <b>alguien / nadie</b> = quelqu'un / personne · <b>algo / nada</b> = quelque chose / rien.<br>• <b>cualquier</b> + nom (n'importe quel) · <b>cualquiera</b> seul ou après le nom (<i>Eso lo hace cualquiera</i> · <i>una persona cualquiera</i>).<br>• <b>otro</b> s'emploie SANS article indéfini : <i>otro café</i>, jamais « un otro ».<br>• <b>cada</b> est invariable, + singulier : <i>cada alumno</i>, <i>cada día</i>.<br>• <b>todo el / toda la</b> + nom = tout le ; <b>todos los</b> = tous les.<br>• <b>unos/unas</b> + nombre = environ : <i>unas veinte personas</i>.<br>• <b>demasiado, bastante, mucho, poco</b> s'accordent devant un nom : <i>demasiada gente</i>.",
    q: [
      ["¿Tienes ______ pregunta?", ["algún","alguien","algo","alguna"], 3, "pregunta est féminin → alguna. « algún » seulement devant masc. sing."],
      ["Puedes llamarme a ______ hora, siempre estoy despierto.", ["cualquier","cada","cualquiera","ninguna"], 0, "Devant un nom → cualquier (apocopé, même au féminin)."],
      ["¿Me pones ______ café, por favor?", ["un otro","uno otro","el otro","otro"], 3, "« otro » ne prend jamais « un » devant : otro café = un autre café."],
      ["Eso lo sabe hacer ______.", ["cualquiera","alguno","cualquier","algún"], 0, "Pronom seul (n'importe qui) → cualquiera, forme pleine."],
      ["______ alumno tiene que traer su libro.", ["Cada","Cada uno","Todos","Cualquiera"], 0, "Cada + nom singulier, invariable."],
      ["Hay ______ gente en el metro a esta hora.", ["demasiada","demasiadas","demasiados","demasiado"], 0, "gente est un nom féminin singulier → demasiada gente."],
      ["¿Hay ______ en casa? — No, no hay nadie.", ["algún","alguno","alguien","nadie"], 2, "Une personne indéterminée → alguien (≠ algo, une chose)."],
      ["Llegaron ______ veinte personas, más o menos.", ["cada","algunas","unas","otras"], 2, "unos/unas + nombre = environ."],
      ["Me he leído ______ el libro en un día.", ["toda","todo","cada","todos"], 1, "Tout le livre = todo el libro (singulier, masc.)."]
    ] },
  { after: "pasados", id: "pluscuam", title: "Plus-que-parfait & participes irréguliers", tag: "B1 · Le passé",
    note: "<b>Formation</b> : imparfait de <b>haber</b> (había, habías, había, habíamos, habíais, habían) + participe (-ado / -ido).<br><b>Emploi</b> : une action <b>antérieure</b> à une autre action passée : <i>Cuando llegué, la película ya había empezado.</i><br>• Auxiliaire <b>toujours haber</b>, jamais « ser » (≠ français « elle était partie » → <i>había salido</i>).<br>• Le participe est <b>invariable</b> avec haber : <i>las cartas que había escrito</i> (≠ « écrites »).<br>• Rien ne s'intercale entre haber et le participe : <i>ya lo había hecho</i>, <i>nunca había visto</i>. Les pronoms se placent devant haber.<br>• Participes irréguliers : hacer → <b>hecho</b>, decir → <b>dicho</b>, ver → <b>visto</b>, poner → <b>puesto</b>, escribir → <b>escrito</b>, volver → <b>vuelto</b>, abrir → <b>abierto</b>, romper → <b>roto</b>, morir → <b>muerto</b>, resolver → <b>resuelto</b>, cubrir → <b>cubierto</b>.",
    q: [
      ["Cuando llegamos al cine, la película ya ______.", ["había empezado","empezaba","empezó","ha empezado"], 0, "Action antérieure à « llegamos » → plus-que-parfait : había empezado."],
      ["Nunca ______ el mar antes de ese viaje.", ["había vido","habría visto","había veído","había visto"], 3, "ver → participe irrégulier visto."],
      ["Me dijo que ya ______ los deberes.", ["hizo hecho","había hacido","habías hacido","había hecho"], 3, "hacer → hecho."],
      ["Las cartas que me ______ mi abuela estaban en un cajón.", ["había escrito","había escritas","habían escrito","había escribido"], 0, "Sujet « mi abuela » (sing.) et participe invariable avec haber : había escrito."],
      ["Cuando volví, alguien ______ la ventana.", ["había roto","ha roto","había rompido","rompía"], 0, "romper → roto."],
      ["Cuando llegaste, ella ya ______ salido.", ["estaba","fue","había","era"], 2, "En espagnol, l'auxiliaire est TOUJOURS haber, même là où le français dit « elle était sortie »."],
      ["Ya ______ el problema cuando llegó el técnico.", ["habíamos resolvido","resolvemos","hemos resuelto","habíamos resuelto"], 3, "resolver → resuelto."],
      ["No sabía que ______ casado. ¡Enhorabuena!", ["te eras","te habías","habías te","te has"], 1, "Pronom devant l'auxiliaire, auxiliaire haber : te habías casado."],
      ["Cuando llamé, Ana ya ______ a casa.", ["había vuelta","volvía","había vuelto","había volvido"], 2, "volver → vuelto, invariable."]
    ] },
  { after: "subjtrig", id: "temporales", title: "Cuando + subjonctif : le futur caché", tag: "B1-B2 · Subjonctif",
    note: "Après <b>cuando, en cuanto, tan pronto como, hasta que, mientras, después de que, una vez que, cada vez que</b> :<br>• action <b>future</b> → <b>subjonctif présent</b>, JAMAIS le futur : <i>Cuando <b>llegues</b>, llámame</i> (fr. « quand tu arriveras »).<br>• action <b>habituelle ou passée</b> → <b>indicatif</b> : <i>Cuando llego, ceno</i> · <i>Cuando era pequeño…</i><br>• <b>antes de que</b> → toujours subjonctif.<br>• même sujet → <b>préposition + infinitif</b> : <i>después de cenar</i>, <i>antes de salir</i>.<br>• futur vu du passé → <b>subjonctif imparfait</b> : <i>Dijo que me llamaría cuando <b>llegara</b></i>.<br>• la question <b>¿cuándo?</b> n'est pas concernée : <i>¿Cuándo vendrás?</i><br>Réflexe : là où le français met un futur après « quand », l'espagnol met un subjonctif.",
    q: [
      ["Cuando ______ a Madrid, te llamaré.", ["llegaría","llegue","llegaré","llego"], 1, "Action future après cuando → subjonctif présent : llegue."],
      ["Cuando ______ pequeño, vivía en Burdeos.", ["seré","fuera","sea","era"], 3, "Passé, habituel → indicatif : era."],
      ["Avísame en cuanto ______ noticias.", ["tendrás","tuvieras","tienes","tengas"], 3, "Futur après en cuanto → subjonctif : tengas."],
      ["Cada vez que ______ a mi abuela, me prepara galletas.", ["visite","visitaré","visitara","visito"], 3, "Habitude → indicatif : visito."],
      ["Tenemos que salir antes de que ______ a llover.", ["empezaría","empezará","empieza","empiece"], 3, "antes de que → toujours subjonctif."],
      ["¿Cuándo ______ los resultados del examen?", ["saliesen","salieran","saldrán","salgan"], 2, "Question directe ¿cuándo? → indicatif, ici le futur."],
      ["No me iré hasta que me ______ la verdad.", ["dices","dirás","digas","dijeras"], 2, "Futur après hasta que → subjonctif : digas."],
      ["Me prometió que me escribiría cuando ______ a Lima.", ["llegaría","llegue","llegara","llegará"], 2, "Futur dans le passé → subjonctif imparfait : llegara."],
      ["Después de ______, salimos a pasear.", ["cenaremos","que cenemos","cenamos","cenar"], 3, "Même sujet → después de + infinitif."]
    ] },
  { after: "porpara", id: "preposiciones", title: "a, en, de, con… les prépositions de base", tag: "B1 · Prépositions",
    note: "• <b>a</b> = mouvement / destination : <i>voy a Italia</i>, <i>llegar a Madrid</i> (jamais « llegar en »).<br>• <b>en</b> = lieu sans mouvement : <i>vivo en Sevilla</i> ; et moyen de transport : <i>en tren, en coche</i> — mais <b>a pie</b>, <b>a caballo</b>.<br>• Heure → <b>a las</b> nueve · jours → <b>el</b> lunes (sans préposition) · mois, saisons, années → <b>en</b> marzo, en 2020.<br>• <b>de … a</b> / <b>desde … hasta</b> : on ne mélange pas les paires (<i>de lunes a viernes</i>).<br>• <b>de</b> = matière, contenu, parfum, appartenance : <i>mesa de madera, helado de chocolate, la casa de mi tío</i> (≠ français « à la »).<br>• <b>con</b> + mí / ti → <b>conmigo, contigo</b>.<br>• Locutions avec <b>de</b> : estar de vacaciones, de pie, de viaje, de acuerdo.",
    q: [
      ["Este verano vamos ______ Italia.", ["por","en","de","a"], 3, "Destination (mouvement) → a."],
      ["Mis padres viven ______ Sevilla.", ["a","de","por","en"], 3, "Lieu sans mouvement → en."],
      ["Siempre voy al trabajo ______ pie.", ["en","por","a","de"], 2, "Exception : a pie (et a caballo). Les véhicules prennent « en »."],
      ["La clase empieza ______ las nueve.", ["a","en","de","por"], 0, "Heure précise → a las…"],
      ["Nos vemos ______ lunes.", ["al","en","el","a"], 2, "Jour de la semaine → article, sans préposition : el lunes."],
      ["Mi cumpleaños es ______ marzo.", ["el","a","de","en"], 3, "Mois → en."],
      ["¿Quieres venir al cine ______?", ["a mí","con yo","conmigo","con mí"], 2, "con + mí → conmigo (forme soudée)."],
      ["Trabajo de lunes ______ viernes.", ["a","en","al","hasta"], 0, "Paire de … a. (desde va avec hasta.)"],
      ["Un helado ______ chocolate, por favor.", ["a","con","de","al"], 2, "Parfum, contenu → de (≠ français « au chocolat »)."],
      ["Este verano estamos ______ vacaciones en la costa.", ["de","en","a","por"], 0, "Locution figée : estar de vacaciones."]
    ] },
  { after: "perifrasis", id: "infger", title: "Infinitif, gérondif & « al + infinitif »", tag: "B2 · Formes du verbe",
    note: "• <b>Après une préposition → infinitif</b> (jamais le gérondif) : <i>antes de salir, sin decir nada, gracias por venir</i>.<br>• L'infinitif sert de <b>nom</b> : <i>Hacer deporte es sano</i> · <i>Me gusta leer</i> (pas « leyendo »).<br>• <b>al + infinitif</b> = au moment où / en (faisant) : <i>Al llegar, vi que…</i><br>• <b>Gérondif</b> (-ando / -iendo) = manière, moyen, simultanéité — le « en + participe présent » français : <i>Aprendí viendo series</i>. Irréguliers : diciendo, pidiendo, durmiendo, muriendo, leyendo, oyendo, yendo, pudiendo, viniendo.<br>• Le gérondif <b>n'est jamais un adjectif</b> : <i>una caja <b>que contiene</b> libros</i> (pas « conteniendo »).<br>• Avec <b>seguir / continuar / llevar</b> → gérondif : <i>Sigue lloviendo</i>.<br>• Verbes de perception → infinitif (ou gérondif pour l'action en cours) : <i>Lo vi salir</i>.",
    q: [
      ["______ llegar a casa, me di cuenta de que no tenía las llaves.", ["A","Cuando","Al","En"], 2, "al + infinitif = au moment où."],
      ["Se fue sin ______ adiós.", ["dice","dicho","diciendo","decir"], 3, "Après une préposition (sin) → infinitif."],
      ["Aprendí a cocinar ______ vídeos en internet.", ["ver","viendo","en viendo","al ver"], 1, "Moyen → gérondif seul. « en viendo » est un calque du français."],
      ["______ ejercicio es bueno para la salud.", ["Hecho","El haciendo","Haciendo","Hacer"], 3, "L'infinitif est le nom verbal → Hacer ejercicio es bueno."],
      ["Me gusta ______ en la playa.", ["pasear","de pasear","paseando","a pasear"], 0, "gustar + infinitif."],
      ["Recibimos una caja ______ documentos confidenciales.", ["conteniendo","que contenía","contenida","en conteniendo"], 1, "Le gérondif ne qualifie pas un nom → relative : que contenía."],
      ["Estaba ______ el periódico cuando sonó el teléfono.", ["leiendo","leído","leyendo","leer"], 2, "leer → leyendo (i entre voyelles → y)."],
      ["Antes de ______, apaga las luces.", ["salir","que sales","saliendo","sales"], 0, "Préposition → infinitif."],
      ["Siguió ______ aunque le dolía la pierna.", ["de correr","a correr","corriendo","correr"], 2, "seguir + gérondif = continuer à."]
    ] },
  { after: "concesivas", id: "condiciones", title: "La condition sans « si »", tag: "C1 · Conditions",
    note: "Au-delà de « si », toutes ces conjonctions exigent le <b>subjonctif</b> :<br>• <b>a menos que / a no ser que</b> = à moins que · <b>salvo que / excepto que</b> = sauf si.<br>• <b>con tal de que / siempre que / siempre y cuando</b> = pourvu que, à condition que.<br>• <b>en caso de que</b> = au cas où (<b>en caso de</b> + infinitif si même sujet).<br>• <b>como</b> + subjonctif EN TÊTE = condition-menace : <i>Como no vengas, me enfado</i>.<br>• <b>de</b> + infinitif = si (registre soutenu) : <i>De saberlo, te habría avisado</i>.<br>Temps : principale au présent/futur → subj. présent ; au conditionnel → subj. imparfait ; au conditionnel passé → subj. plus-que-parfait.<br>⚠️ <b>siempre que + indicatif</b> = chaque fois que (habitude), pas une condition.",
    q: [
      ["Iremos a la playa a menos que ______.", ["lloverá","llueve","llovería","llueva"], 3, "a menos que → subjonctif."],
      ["Te presto el coche con tal de que me lo ______ mañana.", ["devolvías","devuelves","devolverás","devuelvas"], 3, "con tal de que → subjonctif."],
      ["En caso de que ______ problemas, llama a este número.", ["tengas","tienes","tendrás","tuvieras"], 0, "en caso de que → subjonctif."],
      ["______ no me llames esta noche, me enfado.", ["Cuando","Como","Aunque","Si"], 1, "Avec le subjonctif présent, « si » est impossible. « Como » en tête + subjonctif = menace."],
      ["Puedes salir siempre y cuando ______ antes de las doce.", ["volverás","vuelvas","vuelves","volvías"], 1, "siempre y cuando (condition) → subjonctif."],
      ["Siempre que ______ a Madrid, me alojo en el mismo hotel.", ["iré","fuera","voy","vaya"], 2, "Ici « chaque fois que » (habitude) → indicatif."],
      ["No lo habría hecho a no ser que me lo ______ tú.", ["has pedido","pidas","hubieras pedido","pides"], 2, "Principale au conditionnel passé → subj. plus-que-parfait."],
      ["Aceptaría el trabajo siempre que me ______ teletrabajar.", ["dejan","dejen","dejaran","dejarán"], 2, "Principale au conditionnel → subj. imparfait."],
      ["______ saberlo, te habría avisado.", ["En","De","Por","Al"], 1, "de + infinitif = si (hypothèse)."]
    ] }
  ];
  NEW.forEach(function (l) {
    if (LESSONS.some(function (x) { return x.id === l.id; })) return;
    const at = LESSONS.findIndex(function (x) { return x.id === l.after; });
    const lesson = { id: l.id, title: l.title, tag: l.tag, note: l.note, q: l.q, inserted: true };
    LESSONS.splice(at >= 0 ? at + 1 : LESSONS.length, 0, lesson);
  });

  window.LESSON_EXTRA = window.LESSON_EXTRA || {};
  const EXTRA = {
  apersonal: [
    ["Espero ______ mi novia en la estación.", ["a","∅ (rien)"], 0, "Personne précise → esperar a alguien."],
    ["Vamos a ver ______ una película.", ["∅ (rien)","a"], 0, "Une chose → ver una película, sans « a »."],
    ["El perro mordió ______ cartero.", ["al","el"], 0, "Le facteur (personne précise) → a + el = al."],
    ["Ayudé ______ mi vecina con las bolsas.", ["a","∅ (rien)"], 0, "Personne précise → ayudar a alguien."]
  ],
  comparativos: [
    ["Corre ______ rápido como un atleta.", ["tan","tanto"], 0, "Adverbe → tan … como."],
    ["Tiene ______ libros como una biblioteca.", ["tan","tantos"], 1, "Nom masc. pluriel → tantos … como."],
    ["Ella canta ______ que su hermana.", ["más bien","mejor"], 1, "bien → mejor (comparatif irrégulier de l'adverbe aussi)."],
    ["Es el chico más simpático ______ la clase.", ["en","de"], 1, "Superlatif → de."]
  ],
  indefinidos: [
    ["¿Tienes ______ idea?", ["algún","alguna"], 1, "idea est féminin → alguna."],
    ["Dame ______ cosa, me da igual.", ["cualquiera","cualquier"], 1, "Devant le nom → cualquier."],
    ["No es una persona ______: es la directora.", ["cualquiera","cualquier"], 0, "Après le nom → cualquiera."],
    ["Quiero ______ cerveza.", ["una otra","otra"], 1, "Jamais « una otra »."]
  ],
  pluscuam: [
    ["Los niños ya se ______ dormido cuando llegamos.", ["habían","eran"], 0, "Verbe pronominal : toujours haber."],
    ["Habíamos ______ la puerta antes de salir.", ["cerrado","cerrada"], 0, "Participe invariable avec haber."],
    ["Me di cuenta de que había ______ las llaves en casa.", ["dejado","dejadas"], 0, "Invariable : había dejado."],
    ["Ya lo había ______ todo.", ["decido","dicho"], 1, "decir → dicho."]
  ],
  temporales: [
    ["Cuando ______ mayor, quiero ser piloto.", ["sea","seré"], 0, "LE classique : cuando sea mayor."],
    ["Cuando ______ tiempo, leo.", ["tenga","tengo"], 1, "Habitude → indicatif."],
    ["Te lo diré cuando lo ______.", ["sabré","sepa"], 1, "Futur → subjonctif : sepa."],
    ["Mientras ______ en mi casa, no fumes.", ["estás","estés"], 1, "Consigne pour l'avenir → subjonctif."]
  ],
  preposiciones: [
    ["Llegamos ______ Barcelona a medianoche.", ["en","a"], 1, "llegar a (destination). « llegar en » = arriver EN (moyen) : llegar en tren."],
    ["Fuimos a Granada ______ tren.", ["a","en"], 1, "Moyen de transport → en."],
    ["Una mesa ______ madera.", ["de","en"], 0, "Matière → de."],
    ["Ahora no puedo, estoy ______ viaje.", ["de","en"], 0, "Locution : estar de viaje."]
  ],
  infger: [
    ["Gracias por ______.", ["venir","viniendo"], 0, "Préposition → infinitif."],
    ["Al ______ el sol, salimos a la terraza.", ["salir","saliendo"], 0, "al + infinitif."],
    ["El bebé está ______ la siesta.", ["dormiendo","durmiendo"], 1, "dormir → durmiendo (o → u)."],
    ["Lo oí ______ la puerta.", ["cerrar","a cerrar"], 0, "Perception + infinitif direct."]
  ],
  condiciones: [
    ["Salvo que ______ algo urgente, no me molestes.", ["es","sea"], 1, "salvo que → subjonctif."],
    ["Como ______ tarde otra vez, te quedas sin postre.", ["llegas","llegues"], 1, "« como » conditionnel → subjonctif."],
    ["En caso de ______ dudas, consulte al farmacéutico.", ["tenga","tener"], 1, "Sans sujet distinct → en caso de + infinitif."],
    ["Te ayudo con tal de que me ______ a cenar.", ["invitas","invites"], 1, "con tal de que → subjonctif."]
  ]
  };
  Object.keys(EXTRA).forEach(function (k) { window.LESSON_EXTRA[k] = (window.LESSON_EXTRA[k] || []).concat(EXTRA[k]); });
})();
