/* ============================================================
   CUMBRE — Vocabulaire lot 10 : LES SYSTÈMES
   [ES, FR, exemple ES, thème, (note affichée au reveal)]
   Le 2026-09-24 : « j'ai vu tous les mots ». Sondage du deck avant
   d'écrire — il est déjà solide en lexique C1 isolé (matizar,
   esgrimir, sesgo, escueto, dar por sentado y figuraient déjà).
   Ce qui manquait, ce ne sont pas des mots : ce sont des SYSTÈMES.
     · les pronominaux qui changent de sens (24 des 30 sondés absents)
     · les périphrases verbales (15/18 absentes)
     · les marqueurs de l'oral (15/16 absents)
   Chargé APRÈS vocab-es9.js → indices SRS stables (append en fin).
   ============================================================ */
window.VOCAB = window.VOCAB.concat([

/* ---------- LE PRONOM QUI CHANGE TOUT ----------
   La difficulté n°1 du francophone : le même verbe, avec « se »,
   ne veut plus dire la même chose. La note donne toujours le COUPLE. */
["quedarse","rester (quelque part) ; garder","Me quedé en casa todo el fin de semana.","Pronominales","quedar = il reste (queda pan) ou se donner rendez-vous (quedamos a las ocho). quedarSE = rester soi-même quelque part, ou garder : quédate el cambio."],
["irse","s'en aller, partir","Me voy, que es tardísimo.","Pronominales","ir = aller (voy al cine). irSE = partir, quitter les lieux. « Je m'en vais » ne se dit jamais « me voy a » + lieu sans intention de départ."],
["llevarse","emporter ; s'entendre","Me llevo el paraguas por si acaso. · Me llevo bien con ella.","Pronominales","llevar = porter, emmener. llevarSE = emporter avec soi. Et llevarse bien/mal con alguien = bien/mal s'entendre — rien à voir."],
["volverse","devenir (subitement) ; se retourner","Se ha vuelto insoportable.","Pronominales","volver = revenir. volverSE = devenir, avec l'idée d'un changement involontaire et souvent négatif. Pour un changement voulu et construit : hacerse."],
["ocurrírsele a uno","venir à l'esprit de quelqu'un","Se me ocurre una idea mejor.","Pronominales","ocurrir = arriver, se produire (¿qué ocurre?). Mais « se me ocurre » = il me vient à l'esprit. Le sujet est L'IDÉE, pas la personne : se me ocurren dos soluciones."],
["negarse a","refuser de","Se negó a firmar el contrato.","Pronominales","negar = nier (negó los hechos). negarSE A = refuser de. Le piège : « il a refusé » ≠ « negó »."],
["meterse en","se mêler de, se fourrer dans","No te metas en lo que no te importa.","Pronominales","meter = mettre dedans. meterSE EN = se mêler de, s'engager dans. meterse con alguien = s'en prendre à quelqu'un."],
["pasarse","exagérer ; se gâter ; oublier","Te has pasado con la sal.","Pronominales","pasar = passer. pasarSE = dépasser les bornes (te pasaste), s'abîmer (se pasó la leche), ou rater : se me pasó la fecha."],
["encontrarse","se sentir ; tomber sur","Hoy me encuentro mucho mejor.","Pronominales","encontrar = trouver. encontrarSE = se sentir (¿cómo te encuentras?) ou rencontrer par hasard : me encontré con Juan."],
["despedirse de","dire au revoir à","Se despidió de todos y se fue.","Pronominales","despedir = licencier (la empresa despidió a cien personas). despedirSE DE = prendre congé. Le contresens est fréquent et lourd."],
["hacerse","devenir (par construction)","Se hizo médico a los treinta.","Pronominales","Le trio du « devenir » : hacerse = par effort ou conversion · volverse = subitement, subi · ponerse = état passager (se puso rojo) · llegar a ser = aboutissement après un parcours."],
["echarse a","se mettre à (brusquement)","Se echó a llorar sin avisar.","Pronominales","echar = jeter. echarSE A + infinitif = se mettre brutalement à. Cousin de romper a, plus violent encore."],
["ganarse la vida","gagner sa vie","Se gana la vida traduciendo.","Pronominales","ganar = gagner (un match, de l'argent). ganarSE = obtenir par son mérite : ganarse la vida, ganarse a alguien (se le concilier), ganarse el respeto."],
["jugarse","risquer, mettre en jeu","Se juega el puesto con esa decisión.","Pronominales","jugar = jouer. jugarSE = risquer. Et jugársela a alguien = jouer un mauvais tour."],
["creerse","gober ; se croire","No me creo ni una palabra.","Pronominales","creer = croire (creo que sí). creerSE = avaler quelque chose d'invraisemblable, ou se prendre pour : se cree muy listo."],
["saltarse","sauter (une étape), griller","Se saltó un semáforo en rojo.","Pronominales","saltar = sauter. saltarSE = omettre volontairement : saltarse una norma, saltarse la cola, saltarse el desayuno."],
["marcharse","s'en aller","Se marchó sin decir nada.","Pronominales","marchar = fonctionner, avancer (el negocio marcha bien). marcharSE = partir. Synonyme d'irse, un ton au-dessus."],
["perderse","se perdre ; rater","Me perdí el principio de la película.","Pronominales","perder = perdre. perderSE = s'égarer, ou manquer quelque chose : no te lo pierdas = ne rate pas ça."],
["acabarse","s'épuiser, être fini","Se nos acabó el tiempo.","Pronominales","acabar = terminer. acabarSE = s'épuiser tout seul. Et « se acabó » = point final, on n'en parle plus."],
["verse obligado a","se voir contraint de","Se vio obligado a dimitir.","Pronominales","ver = voir. verSE = se sentir, avoir l'air (te veo cansado), ou se retrouver dans une situation subie."],
["referirse a","faire référence à","¿A qué te refieres exactamente?","Pronominales","Toujours pronominal dans ce sens, et toujours avec A. « Que veux-tu dire ? » = ¿a qué te refieres?"],
["decidirse a","se décider à","Por fin se decidió a hablar.","Pronominales","decidir = décider (decidí quedarme). decidirSE A = franchir le pas après hésitation. La nuance est tout l'intérêt."],
["morirse de","mourir de (figuré)","Me muero de ganas de verlo.","Pronominales","morir = mourir. morirSE DE = au figuré : de hambre, de frío, de risa, de ganas, de vergüenza. Très courant à l'oral."],
["darse por vencido","s'avouer vaincu","No se da por vencido nunca.","Pronominales","darse por + participe = se considérer comme : darse por aludido (se sentir visé), darse por enterado, darse por satisfecho."],
["olvidársele a uno","oublier (sans faute de sa part)","Se me olvidó por completo.","Pronominales","Trois niveaux : olvidé (j'ai oublié, j'assume) · me olvidé de (plus familier) · se me olvidó = ça m'est sorti de la tête, ce n'est pas ma faute. Très hispanique."],

/* ---------- PÉRIPHRASES VERBALES ----------
   Ce que le français rend par un adverbe, l'espagnol le met dans le verbe. */
["romper a","éclater en, se mettre brusquement à","Rompió a llorar en mitad de la reunión.","Perífrasis","romper a + infinitif : un début SOUDAIN et incontrôlé. Surtout llorar, reír, hablar, llover. Plus fort que empezar a."],
["liarse a","se mettre à (sans réfléchir)","Se lió a dar explicaciones que nadie pedía.","Perífrasis","Registre familier. Idée de s'embarquer dans quelque chose de désordonné. Cousin : ponerse a (neutre), echarse a (brusque)."],
["acabar por","finir par","Acabó por reconocer que se había equivocado.","Perífrasis","acabar por + infinitif = finir par, après résistance. Ne pas confondre avec acabar de + infinitif = venir de."],
["terminar por","finir par","Terminaron por aceptar la propuesta.","Perífrasis","Équivalent d'acabar por. Et terminar + gérondif dit la même chose : terminó aceptando."],
["llevar + gerundio","ça fait … que","Llevo dos años estudiando español.","Perífrasis","LA structure que le francophone rate systématiquement. « Ça fait deux ans que j'étudie » ne se dit pas « hace dos años que… » en priorité : llevo dos años estudiando."],
["venir + gerundio","ne cesser de, depuis un moment","Viene diciendo lo mismo desde enero.","Perífrasis","Une action répétée qui dure et continue jusqu'à maintenant. Très fréquent dans la presse : viene aumentando, viene advirtiendo."],
["andar + gerundio","être (toujours) en train de","Anda buscando piso desde hace meses.","Perífrasis","Nuance de dispersion ou de légère désapprobation, absente de estar + gérondif. Anda diciendo por ahí que… = il raconte partout que…"],
["ir + gerundio","petit à petit","Voy entendiendo poco a poco.","Perífrasis","Progression graduelle. Ve haciendo la maleta = commence à faire ta valise (et continue)."],
["estar por","être tenté de ; rester à faire","Estoy por decírselo todo. · La cama está por hacer.","Perífrasis","Deux sens à ne pas confondre. Avec une personne : être tenté de. Avec une chose : ça reste à faire. Et estar para = être sur le point de, ou être d'humeur à : no estoy para bromas."],
["dar por + participio","considérer comme","Doy por hecho que vendrá.","Perífrasis","dar por hecho / por sentado / por perdido / por concluido / por zanjado. Tenir pour acquis sans vérifier — et c'est souvent l'erreur."],
["deber de + infinitivo","devoir (probabilité)","Deben de ser las siete.","Perífrasis","⚠️ LE piège. deber + infinitif = obligation (debo irme, je dois partir). deber DE + infinitif = supposition (debe de estar enfermo, il doit être malade). Le « de » change tout."],
["llegar a + infinitivo","aller jusqu'à","Llegó a decir que era culpa mía.","Perífrasis","Marque un degré extrême atteint. Ni siquiera llegó a intentarlo = il n'a même pas essayé."],
["pasar a + infinitivo","passer à","Pasemos a analizar los datos.","Perífrasis","Articulation d'un exposé ou d'une réunion. Registre soutenu, très utile à l'oral du DELE."],
["ir a por","aller chercher","Voy a por el pan.","Perífrasis","Espagne uniquement (en Amérique : ir por). Le « por » marque le but qu'on va récupérer. Ir a por todas = tout donner."],
["tener + participio","avoir déjà (résultat acquis)","Te tengo dicho que no llegues tarde.","Perífrasis","Insiste sur l'accumulation et le résultat. Tengo entendido que… = j'ai cru comprendre que… — à connaître pour le registre soutenu."],
["quedar en + infinitivo","convenir de","Quedamos en vernos el jueves.","Perífrasis","quedar en = se mettre d'accord pour. ¿En qué quedamos? = alors, on fait quoi ?"],
["seguir sin + infinitivo","ne toujours pas","Sigo sin entender nada.","Perífrasis","Structure très économique, sans équivalent direct en français. Sigue sin llamar = il n'a toujours pas appelé."],
["acabar + gerundio","finir par (résultat)","Acabó aceptando el trato.","Perífrasis","Variante d'acabar por + infinitif. Les deux sont justes ; le gérondif est un cran plus courant à l'oral."],

/* ---------- LES VERBES DU DÉBAT ---------- */
["puntualizar","apporter une précision","Quisiera puntualizar un detalle.","Debate C1+","Plus fin que aclarar : on corrige un point précis sans contredire le fond. Très utile à l'oral du DELE."],
["sostener","soutenir (une thèse)","Sostiene que el modelo es insostenible.","Debate C1+","sostener una tesis, una postura, una afirmación. Le verbe neutre pour rapporter une position sans l'endosser."],
["alegar","invoquer, faire valoir","Alegó motivos personales.","Debate C1+","On allègue une raison, souvent pour se justifier. Nuance légèrement défensive, voire suspecte."],
["refutar","réfuter","Refutó el argumento con datos.","Debate C1+","Démonter un argument avec des preuves. Plus fort que rebatir, qui est simplement répondre à."],
["objetar","objecter","No tengo nada que objetar.","Debate C1+","Poser une objection. La formule « nada que objetar » est figée et très employée."],
["replicar","répliquer","Replicó que no era su competencia.","Debate C1+","Réponse vive à une attaque. Plus sec que responder, moins agressif que rebatir."],
["insinuar","insinuer","¿Qué estás insinuando?","Debate C1+","Suggérer sans dire. La question ¿qué insinúas? est une mise en garde, pas une demande."],
["aludir a","faire allusion à","Aludió a los problemas del sector.","Debate C1+","Et darse por aludido = se sentir visé. Le couple est à retenir ensemble."],
["apuntar","souligner, signaler","El informe apunta a un cambio de tendencia.","Debate C1+","apuntar a = tout indique que. Verbe passe-partout de la presse, plus prudent que afirmar."],
["conceder","concéder","Concedo que el punto es discutible.","Debate C1+","Admettre un point adverse pour mieux tenir le reste. Le geste rhétorique le plus rentable d'un débat."],
["matizar una postura","nuancer une position","Matizó su postura ante las críticas.","Debate C1+","La collocation complète, au-delà du verbe seul. Aussi : matizar unas declaraciones."],
["poner en entredicho","remettre en cause","Sus palabras ponen en entredicho el acuerdo.","Debate C1+","Jeter le doute sur la validité de quelque chose. Cousin de poner en tela de juicio."],

/* ---------- COLLOCATIONS DE HAUT NIVEAU ---------- */
["hacer caso omiso de","ne tenir aucun compte de","Hizo caso omiso de las advertencias.","Colocaciones C1+","Registre soutenu. À l'oral courant : pasar de algo, ou no hacer caso."],
["hacer las veces de","faire office de","El salón hace las veces de despacho.","Colocaciones C1+","Remplacer temporairement dans une fonction. Ni servir de, ni sustituir : la nuance est « en attendant »."],
["tomar partido","prendre parti","Se negó a tomar partido en el conflicto.","Colocaciones C1+","tomar partido POR alguien. Ne pas confondre avec sacar partido de = tirer parti de."],
["tomar cartas en el asunto","prendre les choses en main","La dirección tuvo que tomar cartas en el asunto.","Colocaciones C1+","Intervenir dans une affaire qui dérape. Expression figée, très employée dans la presse."],
["dar la cara","assumer, faire face","Nadie dio la cara cuando falló el proyecto.","Colocaciones C1+","Assumer publiquement. L'opposé : escurrir el bulto = se défiler."],
["dar de sí","donner (s'étirer) ; rendre","El jersey ha dado de sí. · El presupuesto no da más de sí.","Colocaciones C1+","Sens propre : un tissu qui s'étend. Sens figuré, très courant : ne plus pouvoir produire davantage."],
["dar el visto bueno","donner son feu vert","La comisión dio el visto bueno al proyecto.","Colocaciones C1+","el visto bueno = l'approbation officielle. Aussi comme nom : necesita el visto bueno del jefe."],
["poner al corriente","mettre au courant","Ponme al corriente de lo que ha pasado.","Colocaciones C1+","Aussi : estar al corriente (être au courant) et estar al corriente de pago (être à jour de ses paiements)."],
["echar en cara","reprocher","Me echó en cara mi falta de apoyo.","Colocaciones C1+","Reproche frontal et personnel. Plus dur que reprochar, qui reste neutre."],
["echar a perder","gâcher, faire rater","Un comentario echó a perder la velada.","Colocaciones C1+","Ruiner quelque chose qui allait bien. Aussi pour la nourriture : la fruta se echó a perder."],
["llevar la contraria","contredire systématiquement","Le encanta llevar la contraria.","Colocaciones C1+","Contredire par principe, pas par conviction. Nuance de caractère, pas d'argumentation."],
["traer consigo","entraîner, impliquer","La reforma trae consigo recortes.","Colocaciones C1+","Conséquence inévitable. Registre soutenu, très fréquent à l'écrit : conllevar en est le synonyme en un mot."],
["pasar por alto","passer sous silence, négliger","No podemos pasar por alto ese detalle.","Colocaciones C1+","Omettre volontairement ou par négligence. Plus fort que olvidar : il y a une décision derrière."],
["sentar las bases de","poser les bases de","El acuerdo sienta las bases de la cooperación.","Colocaciones C1+","sentar precedente = créer un précédent. La famille « sentar » est très productive à l'écrit formel."],
["dejar constancia de","prendre acte de, consigner","Quiero dejar constancia de mi desacuerdo.","Colocaciones C1+","Registre administratif et juridique. Utile dans une lettre formelle du DELE."],
["estar en juego","être en jeu","Hay mucho más en juego de lo que parece.","Colocaciones C1+","L'enjeu. Et poner en juego = mettre en jeu, risquer."],

/* ---------- ADJECTIFS QUI NOTENT ---------- */
["peliagudo","épineux, délicat","Es un asunto peliagudo.","Adjetivos C1+","Littéralement « au poil aigu ». Registre courant mais expressif : un problème qui se prend mal."],
["espinoso","épineux","Abordó un tema espinoso con tacto.","Adjetivos C1+","Plus formel que peliagudo. Un tema espinoso est délicat socialement, pas techniquement."],
["ingente","immense, colossal","Dedicó un esfuerzo ingente al proyecto.","Adjetivos C1+","Registre soutenu, toujours pour une quantité ou un effort. Une cantidad ingente de datos."],
["nimio","insignifiant","Discutieron por un detalle nimio.","Adjetivos C1+","⚠️ Faux ami de sa propre étymologie : nimio vient de « excessif » en latin, et veut dire aujourd'hui l'inverse."],
["baladí","futile, sans importance","La cuestión no es baladí.","Adjetivos C1+","Presque toujours employé à la forme négative : no es baladí = ce n'est pas rien. Invariable en genre."],
["halagüeño","prometteur, encourageant","Las cifras no son muy halagüeñas.","Adjetivos C1+","Surtout pour des perspectives ou des chiffres. Un panorama poco halagüeño = une perspective sombre."],
["sombrío","sombre, morose","Pintó un panorama sombrío.","Adjetivos C1+","Au sens figuré pour une perspective, un climat, une humeur. L'opposé exact de halagüeño."],
["alentador","encourageant","Los primeros resultados son alentadores.","Adjetivos C1+","De alentar = encourager. Son contraire desalentador est tout aussi fréquent."],
["desalentador","décourageant","El balance es desalentador.","Adjetivos C1+","Registre de presse et de rapport. Plus formel que deprimente."],
["arraigado","enraciné, ancré","Es una costumbre muy arraigada.","Adjetivos C1+","De raíz. Pour une habitude, une croyance, un préjugé. El arraigo = l'enracinement."],
["incipiente","naissant, balbutiant","Se observa una recuperación incipiente.","Adjetivos C1+","Un phénomène qui commence à peine. Très employé en économie."],
["pujante","florissant, dynamique","Un sector pujante que crea empleo.","Adjetivos C1+","Une croissance vigoureuse. La pujanza = la vigueur, l'essor."],
["boyante","prospère","La empresa atraviesa un momento boyante.","Adjetivos C1+","Plus rare et plus soutenu que pujante. Vient de la flottaison d'un navire."],
["perentorio","urgent, impératif","Un plazo perentorio que no admite prórroga.","Adjetivos C1+","Registre juridique et administratif. Un délai qu'on ne peut pas repousser."],
["insoslayable","incontournable","Es una cuestión insoslayable.","Adjetivos C1+","De soslayar = esquiver. Ce qu'on ne peut pas contourner. Synonyme soutenu d'ineludible."],
["ineludible","inéluctable, inévitable","Asumió una responsabilidad ineludible.","Adjetivos C1+","De eludir. Registre formel, très fréquent à l'écrit argumentatif."],
["farragoso","confus, indigeste","Un texto farragoso y mal estructurado.","Adjetivos C1+","Pour un style lourd et embrouillé. Le reproche typique fait à une copie mal construite."],
["tedioso","fastidieux, ennuyeux","Una tarea tediosa pero necesaria.","Adjetivos C1+","Plus soutenu que aburrido. El tedio = l'ennui profond."],
["atinado","judicieux, bien vu","Hizo una observación muy atinada.","Adjetivos C1+","De atinar = tomber juste. Compliment précis sur une remarque. Contraire : desacertado."],
["desacertado","malvenu, peu judicieux","Fue un comentario desacertado.","Adjetivos C1+","Registre poli pour dire « mal choisi ». Plus diplomatique que equivocado."],
["exhaustivo","exhaustif","Realizó un estudio exhaustivo.","Adjetivos C1+","Qui n'a rien laissé de côté. De forma exhaustiva."],
["escurridizo","fuyant, insaisissable","Dio una respuesta escurridiza.","Adjetivos C1+","De escurrir = glisser. Pour une personne qui esquive ou une notion qui échappe."],
["encomiable","louable","Un esfuerzo encomiable.","Adjetivos C1+","Digne d'éloges. Registre soutenu, fréquent dans les discours."],

/* ---------- LANGUE DE LA PRESSE ---------- */
["el escaño","le siège (parlementaire)","El partido perdió doce escaños.","Prensa C1+","Le siège au parlement. Ne jamais traduire par « asiento », qui est le siège physique."],
["la bancada","le groupe parlementaire","La bancada socialista votó en contra.","Prensa C1+","L'ensemble des députés d'un même parti. Le banc au sens physique et politique à la fois."],
["la enmienda","l'amendement","Presentaron una enmienda a la totalidad.","Prensa C1+","enmienda a la totalidad = motion de rejet du texte entier. Vocabulaire parlementaire de base."],
["el decreto","le décret","El Gobierno aprobó el decreto por la vía de urgencia.","Prensa C1+","Real Decreto en Espagne. Aussi : decreto ley = décret-loi."],
["tergiversar","déformer, travestir","Tergiversó mis palabras.","Prensa C1+","Déformer volontairement un propos. Plus grave que malinterpretar, qui peut être involontaire."],
["filtrar","divulguer (une fuite)","Alguien filtró el informe a la prensa.","Prensa C1+","Attention, deux sens : filtrer (un liquide) et faire fuiter. Una filtración = une fuite."],
["el corresponsal","le correspondant","Nuestra corresponsal en Bruselas informa.","Prensa C1+","Le journaliste posté à l'étranger. Enviado especial = envoyé spécial, temporaire."],
["la rueda de prensa","la conférence de presse","Convocó una rueda de prensa de urgencia.","Prensa C1+","Jamais « conferencia de prensa » en Espagne. Comparecencia = prise de parole officielle."],
["el comunicado","le communiqué","La empresa emitió un comunicado.","Prensa C1+","emitir / difundir un comunicado. Un comunicado conjunto = un communiqué commun."],
["el desplome","l'effondrement","El desplome de las ventas sorprendió a todos.","Prensa C1+","Chute brutale et verticale. Le verbe : desplomarse. L'opposé : el repunte."],
["el recorte","la coupe budgétaire","Anunciaron recortes en sanidad.","Prensa C1+","recortar = réduire, rogner. Los recortes = les coupes, terme très politique."],
["el varapalo","le camouflet, le revers","La sentencia es un varapalo para el Gobierno.","Prensa C1+","Un coup dur infligé publiquement. Mot de presse, très imagé, très fréquent."],
["la moción de censura","la motion de censure","Presentaron una moción de censura.","Prensa C1+","Vocabulaire institutionnel espagnol incontournable. Cousine : la cuestión de confianza."],
["la investidura","l'investiture","El debate de investidura duró dos días.","Prensa C1+","La séance qui confirme un chef de gouvernement. Institution très commentée en Espagne."],
["el portavoz","le porte-parole","La portavoz no quiso hacer declaraciones.","Prensa C1+","Féminin : la portavoz (le mot ne change pas). Attention à l'accord de l'article seul."],

/* ---------- L'ORAL RÉEL ---------- */
["resulta que","il se trouve que","Resulta que ya lo sabía todo.","Oral","Ouvre un récit avec un rebondissement. L'un des connecteurs les plus fréquents de la conversation, et absent des manuels."],
["total que","bref, bref alors","Total que al final no fuimos.","Oral","Clôt une histoire en sautant les détails. Registre familier, très naturel."],
["la verdad es que","à vrai dire","La verdad es que no me apetece.","Oral","Introduit une opinion franche, souvent un refus poli. Aussi : la verdad, sec, en incise."],
["a ver","voyons, on va voir","A ver qué dice el jefe.","Oral","Sert à réfléchir, à temporiser ou à introduire une réserve. ¡A ver! seul peut aussi être un rappel à l'ordre."],
["fíjate","tu te rends compte","Fíjate, ni siquiera llamó.","Oral","Marque l'étonnement partagé. Fíjate tú, ou fíjate si… = imagine un peu à quel point…"],
["ni de coña","pas question, jamais de la vie","¿Ir el domingo? Ni de coña.","Oral","⚠️ Très familier, Espagne uniquement, à éviter en contexte formel. Équivalent poli : ni hablar."],
["anda ya","mais non, arrête","¡Anda ya, no me lo creo!","Oral","Incrédulité amicale. Ne se traduit pas mot à mot. Cousin : ¡venga ya!"],
["menos mal","heureusement","Menos mal que llegaste a tiempo.","Oral","Soulagement. Toujours suivi de QUE + indicatif. Menos mal que… est bien plus fréquent que afortunadamente."],
["encima","en plus, par-dessus le marché","Llegó tarde y encima sin avisar.","Oral","Ajoute un grief supplémentaire. Ton d'exaspération, très courant."],
["ya ves","tu vois, voilà","Ya ves, así están las cosas.","Oral","Résignation ou constat partagé. Ya ves tú = et encore, ce n'est rien."],
["en fin","enfin bref","En fin, no hay nada que hacer.","Oral","Clôt une séquence avec résignation. Ne pas confondre avec por fin = enfin ! (soulagement)."],
["venga","allez ; d'accord","Venga, nos vemos mañana.","Oral","Espagne. Sert à encourager, à conclure un appel, ou à accepter. Extrêmement fréquent."],
["hombre","eh bien, enfin","Hombre, tampoco es para tanto.","Oral","Interjection, sans rapport avec « homme », et s'adresse aussi à une femme. Marque la nuance ou la protestation douce."],
["oye","dis donc, écoute","Oye, ¿te puedo preguntar algo?","Oral","Ouvre une demande ou attire l'attention. Plus direct que perdona. Oiga au vouvoiement."],
["mira","écoute, regarde","Mira, te lo explico otra vez.","Oral","Introduit une explication ou une mise au point, parfois avec agacement."],
["pues nada","bon, eh bien voilà","Pues nada, ya nos contarás.","Oral","Formule de clôture d'un échange, quand il n'y a plus rien à ajouter. Très hispanique."],
["ya te digo","je te le dis, carrément","—Está carísimo. —Ya te digo.","Oral","Approbation appuyée de ce que l'autre vient de dire. Équivaut à « à qui le dis-tu »."],
["vaya","eh bien ; quel…","¡Vaya lío! · Vaya, no lo sabía.","Oral","Surprise, contrariété, ou emphase devant un nom : vaya día, vaya suerte."],

/* ---------- NOMS ABSTRAITS ---------- */
["el ahínco","l'ardeur, l'acharnement","Trabaja con ahínco desde hace meses.","Abstracto C1+","Toujours dans « con ahínco ». Effort soutenu et volontaire."],
["el desdén","le dédain","Lo trató con desdén.","Abstracto C1+","desdeñar = dédaigner. Plus froid que desprecio, qui est plus violent."],
["el hartazgo","le ras-le-bol","Hay un hartazgo general con la clase política.","Abstracto C1+","De harto = rassasié, excédé. Estar harto de = en avoir assez de."],
["la desidia","la négligence, l'incurie","El edificio se cayó por pura desidia.","Abstracto C1+","Négligence par manque total de soin. Plus grave que descuido, qui est ponctuel."],
["el empeño","l'acharnement, la détermination","Puso mucho empeño en terminarlo.","Abstracto C1+","empeñarse en = s'obstiner à. Poner empeño = mettre du cœur à l'ouvrage."],
["el revés","le revers, le coup dur","Sufrió un revés inesperado.","Abstracto C1+","Aussi au sens propre : l'envers (al revés = à l'envers, dans l'autre sens)."],
["el ocaso","le déclin, le crépuscule","El ocaso de una era.","Abstracto C1+","Sens propre : le coucher du soleil. Sens figuré : la fin d'une période. Opposé : el auge."],
["el quid","le nœud, l'essentiel","Ahí está el quid de la cuestión.","Abstracto C1+","Presque toujours dans « el quid de la cuestión ». Le point qui décide de tout."],
["el cauce","le canal, la voie","Hay que resolverlo por los cauces legales.","Abstracto C1+","Sens propre : le lit d'une rivière. Sens figuré : la voie officielle à suivre."],
["el rasgo","le trait","Es un rasgo característico de su estilo.","Abstracto C1+","Un trait de caractère, de style, de visage. A grandes rasgos = dans les grandes lignes."],
["el sosiego","le calme, la quiétude","Necesito un poco de sosiego.","Abstracto C1+","Calme intérieur, plus profond que tranquilidad. sosegado = posé, serein."],
["la premura","l'urgence, la hâte","Actuaron con premura.","Abstracto C1+","Registre soutenu. La premura del tiempo = le manque de temps."],
["el afán de","la soif de, le désir de","Su afán de perfección lo paraliza.","Abstracto C1+","La construction complète : afán DE + nom ou infinitif. Afán de lucro = appât du gain."],

/* ---------- SER OU ESTAR : LE SENS BASCULE ---------- */
["ser violento / estar violento","être violent / être mal à l'aise","Es una persona violenta. · Me sentí violento en la cena.","Ser o estar+","estar violento = se sentir gêné, mal à l'aise. Rien à voir avec la violence. Piège redoutable."],
["ser delicado / estar delicado","être délicat / être souffrant","Es un tema delicado. · Su padre está delicado de salud.","Ser o estar+","estar delicado (de salud) = être de santé fragile. Euphémisme très employé."],
["ser interesado / estar interesado","être intéressé (vénal) / être intéressé (par)","Es muy interesado. · Estoy interesado en el puesto.","Ser o estar+","⚠️ ser interesado est une insulte : quelqu'un qui n'agit que par intérêt. estar interesado EN = s'intéresser à."],
["ser parado / estar parado","être timide / être au chômage","Es un chico muy parado. · Lleva dos años parado.","Ser o estar+","estar parado = être sans emploi (el paro = le chômage). ser parado = être peu dégourdi."],
["ser orgulloso / estar orgulloso","être orgueilleux / être fier","Es muy orgulloso y no pide ayuda. · Estoy orgulloso de ti.","Ser o estar+","Le même adjectif passe du défaut à la qualité selon le verbe. estar orgulloso DE."],
["ser católico / no estar muy católico","être catholique / ne pas être dans son assiette","No estoy muy católico hoy.","Ser o estar+","Expression figée et familière : se sentir patraque. Toujours à la forme négative."],
["ser callado / estar callado","être taciturne / se taire","Es muy callado. · ¡Estate callado!","Ser o estar+","ser callado = trait de caractère permanent. estar callado = ne pas parler en ce moment."],
["ser molesto / estar molesto","être gênant / être contrarié","Es un ruido muy molesto. · Está molesto conmigo.","Ser o estar+","estar molesto CON alguien = être fâché contre quelqu'un. Registre poli pour dire « vexé »."]
,
/* ---------- REMPLACEMENTS : verbes et noms vérifiés absents du deck ---------- */
["apremiar","presser, être urgent","El tiempo apremia.","Debate C1+","« El tiempo apremia » est la formule figée. apremiante = pressant."],
["redundar en","se traduire par, aboutir à","La medida redunda en beneficio de todos.","Debate C1+","redundar en beneficio / en perjuicio de. Registre formel, très utile à l'écrit argumentatif."],
["abogar por","plaider pour","Abogó por una solución negociada.","Debate C1+","De abogado. Défendre publiquement une position. Plus engagé que defender."],
["enarbolar","brandir (un argument, un drapeau)","Enarbola la bandera de la transparencia.","Debate C1+","Sens propre : hisser. Sens figuré : se réclamer bruyamment de quelque chose, souvent avec ironie."],
["blandir","brandir (une menace)","Blandió la amenaza de dimitir.","Debate C1+","Plus menaçant qu'enarbolar : on brandit une arme, une menace, un rapport accablant."],
["tildar de","qualifier de (péjoratif)","Lo tildaron de oportunista.","Debate C1+","⚠️ Toujours négatif. tildar / tachar DE + adjectif. Pour un jugement neutre : calificar de."],
["tachar de","taxer de, traiter de","Lo tacharon de ingenuo.","Debate C1+","Synonyme de tildar de, même construction, même charge négative."],
["atisbar","entrevoir, deviner","Se atisba una salida a la crisis.","Abstracto C1+","Percevoir à peine. El atisbo = la lueur, le début de quelque chose."],
["mermar","réduire, amoindrir","La inflación merma el poder adquisitivo.","Prensa C1+","Diminuer progressivement une quantité. La merma = la perte, la diminution."],
["irrumpir","faire irruption","Un nuevo actor irrumpió en el mercado.","Prensa C1+","Entrée brutale et non annoncée. La irrupción de = l'arrivée fracassante de."],
["recrudecerse","s'aggraver, reprendre de plus belle","El conflicto se ha recrudecido.","Prensa C1+","Reprise plus violente d'un phénomène qui semblait s'apaiser. El recrudecimiento."],
["enquistarse","s'enkyster, s'enliser","El problema se ha enquistado.","Prensa C1+","Un conflit devenu chronique et insoluble. Image médicale, très employée en politique."],
["desbaratar","faire échouer, démanteler","La policía desbarató la red.","Prensa C1+","Détruire un plan ou une organisation. desbaratar los planes de alguien."],
["avalar","cautionner, garantir","Los datos avalan su tesis.","Debate C1+","Apporter une garantie ou une caution. El aval = la caution. Très utile pour dire « les chiffres confirment »."],
["capear el temporal","essuyer la tempête","Consiguió capear el temporal.","Colocaciones C1+","Tenir bon dans une période difficile. Image maritime, très courante en politique et en entreprise."],
["el atolladero","l'impasse, le bourbier","Salir de este atolladero no será fácil.","Abstracto C1+","Situation bloquée dont on ne sort pas facilement. Plus imagé que callejón sin salida."],
["la tesitura","la situation délicate, la position","Me puso en una tesitura muy incómoda.","Abstracto C1+","Sens propre en musique : la tessiture. Sens courant : une situation qui force à choisir."],
["el hastío","la lassitude, le dégoût","Un hastío generalizado hacia la política.","Abstracto C1+","Lassitude profonde et durable. Plus littéraire que hartazgo, qui est plus vif."],
["la zozobra","l'inquiétude, l'angoisse","Vivieron semanas de zozobra.","Abstracto C1+","Sens propre : le naufrage. Sens figuré : l'angoisse de l'incertitude. Registre littéraire."],
["el sinsabor","la déconvenue, l'amertume","Los sinsabores del primer año.","Abstracto C1+","Les désagréments et déceptions d'un parcours. Presque toujours au pluriel."],
["deparar","réserver (l'avenir)","Nadie sabe qué nos deparará el futuro.","Abstracto C1+","Presque exclusivement avec el futuro, el destino, la vida. Formule très idiomatique."],
["aupar","hisser, porter au pouvoir","Los sondeos lo auparon a la presidencia.","Prensa C1+","Porter quelqu'un vers le haut. Familier au sens propre (aupar a un niño), politique au figuré."],
["allanar el camino","aplanir le terrain","El acuerdo allana el camino a la reforma.","Colocaciones C1+","Lever les obstacles pour la suite. allanar une maison = perquisitionner — attention au contexte."]
]);

/* ---------- ENRICHISSEMENT ----------
   Ces vingt-cinq mots étaient DÉJÀ dans le deck, mais sans note. On ne crée
   pas de doublon (ça casserait le SRS et ferait réviser deux fois la même
   chose) : on pose la note qui manquait sur la carte existante. */
(function(){
  const NOTAS = {
    "soslayar": "Éviter un sujet sans le nier. D'où insoslayable = qu'on ne peut pas contourner.",
    "vislumbrar": "Cousin d'atisbar, un cran plus optimiste. Souvent au pronominal : se vislumbra.",
    "paliar": "Atténuer sans résoudre. Cuidados paliativos = soins palliatifs. Nuance de pis-aller.",
    "subsanar": "Réparer une erreur, un défaut, une omission. Registre administratif et juridique.",
    "acatar": "Se soumettre à une décision d'autorité, même en désaccord. Plus fort qu'obedecer.",
    "ceñirse a": "Se limiter strictement à. Ceñirse al tema, al presupuesto, al guion.",
    "aunar": "« Aunar esfuerzos » est la collocation reine. Réunir des forces dispersées vers un but.",
    "propiciar": "Rendre possible sans provoquer directement. Registre de presse et d'analyse.",
    "acarrear": "Toujours pour des conséquences négatives. Cousin : conllevar, plus neutre.",
    "entrañar": "Contenir en soi un élément caché, souvent un risque. Registre soutenu.",
    "encauzar": "De cauce, le lit d'une rivière. Remettre quelque chose dans la bonne voie.",
    "acordarse de": "acordar = convenir de, décider ensemble (acordaron subir los precios). acordarSE DE = se souvenir. Deux verbes différents sous la même forme.",
    "salirse con la suya": "salir = sortir. salirSE = sortir de son cadre (el coche se salió de la carretera). Et l'expression figée : obtenir ce qu'on voulait malgré l'opposition.",
    "zanjar": "Mettre fin définitivement à un débat. zanjar el asunto, zanjar la polémica.",
    "esbozar": "Donner les grandes lignes sans détailler. esbozar una sonrisa = esquisser un sourire.",
    "recabar": "recabar información, apoyo, fondos. Registre journalistique et administratif.",
    "desglosar": "Décomposer un ensemble en ses éléments. Le mot exact pour un budget ou des chiffres.",
    "sopesar": "Évaluer en comparant. Plus concret que considerar, plus réfléchi que pensar.",
    "dar pie a": "Provoquer involontairement. Nuance de responsabilité passive, absente de provocar.",
    "hacer hincapié en": "LA collocation de l'exposé formel. On n'insiste pas « mucho sobre » : se hace hincapié EN.",
    "sacar adelante": "Réussir malgré les obstacles. Aussi : sacar adelante a una familia = subvenir aux besoins des siens.",
    "salir a relucir": "Un sujet qu'on avait évité et qui refait surface. Nuance d'embarras.",
    "dar la talla": "Ne pas confondre avec estar a la altura, plus neutre. Dar la talla est un jugement de compétence.",
    "somero": "Un examen rapide, sans profondeur. À opposer à exhaustivo.",
    "tajante": "Une réponse qui coupe court. Una respuesta tajante, un no tajante.",
    "acuciante": "Un besoin urgent qui presse. Registre de presse et de rapport.",
    "el respaldo": "respaldar = soutenir. Plus institutionnel que apoyo, qui est plus général.",
    "el revuelo": "L'agitation médiatique soulevée par quelque chose. causar / levantar revuelo.",
    "la cúpula": "Le cercle dirigeant. Sens propre : la coupole. Image très courante dans la presse.",
    "el sondeo": "Aussi : la encuesta. Empate técnico = égalité dans la marge d'erreur.",
    "la brecha": "brecha salarial, brecha digital, brecha de género. Mot-clé de tout texte de société.",
    "qué va": "Négation légère et amicale. Plus doux qu'un « no » sec.",
    "a lo mejor": "⚠️ Suivi de l'INDICATIF, contrairement à quizá / tal vez qui admettent le subjonctif. Piège classique.",
    "la injerencia": "injerirse en = s'ingérer dans. Vocabulaire diplomatique et politique.",
    "el desfase": "Écart entre deux choses censées coïncider. Desfase horario = décalage horaire.",
    "la índole": "Registre soutenu. De índole política, de índole personal. Synonyme élégant de tipo.",
  };
  const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/^(el |la |los |las |un |una )/,"").replace(/[^a-z0-9 ]/g,"").trim();
  const map = {};
  window.VOCAB.forEach((v,i)=>{ const k=norm(v[0]); if(map[k]===undefined) map[k]=i; });
  Object.keys(NOTAS).forEach(w=>{
    const i = map[norm(w)];
    if(i!==undefined && window.VOCAB[i] && !window.VOCAB[i][4]) window.VOCAB[i][4]=NOTAS[w];
  });
})();
