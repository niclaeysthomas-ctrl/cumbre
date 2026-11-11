/* ============================================================
   CUMBRE — Vocabulaire lot 15 : EL DÍA A DÍA (les mots qu'on montre du doigt)
   [ES, FR, exemple ES, thème, note]
   2026-11-11. Diagnostic du jour : le deck est bâti sur un corpus de presse
   et d'examen. Résultat mesuré sur les 1,2 Mo de données — « matiz » 28 fois,
   « índole » 5, « esgrimir » 3 ; en face « auriculares » 0, « percha » 0,
   « cremallera » 0, « martillo » 0, « tabú » 0. Un plafond C1 à l'écrit
   abstrait, un plancher A2 sur le concret domestique : la signature de
   l'autodidacte qui apprend par le texte. Un article ne nomme jamais un
   casque audio ni une fermeture éclair — aucune source écrite ne pouvait
   les apporter.
   Ce lot les apporte, pièce par pièce : l'électronique, la salle de bains,
   la cuisine, le linge, l'atelier, la rue et la voiture, le corps au
   quotidien — plus le registre oral qui va avec, et les abstraits cultivés
   (tabú, pudor, azar, apego) que les domaines du deck n'avaient pas croisés.
   Les 171 candidats ont été contrôlés un à un contre les 2135 entrées
   existantes : 70 y étaient déjà (enchufe, toalla, escoba, semáforo, cargador,
   índole, estar hecho polvo…) et ont été écartés. Restent 100 cartes, qui
   manquaient vraiment.
   Thèmes : les cartes rejoignent des familles qui existaient déjà — « Día a
   día » (87), « Oral » (9), « Abstracto C1 » (4) — plutôt que d'ouvrir des
   chips de plus dans une liste qui en compte déjà 104.
   Chargé APRÈS vocab-es14.js → append en fin. VOCAB_PRIO : ces mots passent
   en tête des nouvelles cartes.
   ============================================================ */
(function () {
  const start = window.VOCAB.length;
  window.VOCAB = window.VOCAB.concat([

/* ---------- ELECTRÓNICA Y TRASTOS ---------- */
["los auriculares","le casque audio, les écouteurs","Se puso los auriculares para no oír a nadie.","Día a día","Toujours au pluriel, comme « les écouteurs ». En Espagne on dit aussi los cascos (familier) ; en Amérique, los audífonos. ⚠️ el casco tout seul = le casque de moto ou de chantier."],
["el altavoz","le haut-parleur, l'enceinte","Ponlo en altavoz, que te oigamos todos.","Día a día","Pluriel : los altavoces. « Mettre le haut-parleur » (téléphone) = poner en altavoz. En Amérique : el parlante, el altoparlante."],
["el interruptor","l'interrupteur","El interruptor está detrás de la puerta.","Día a día","De interrumpir. Allumer/éteindre = dar / apagar la luz. « Appuyer sur l'interrupteur » = darle al interruptor."],
["la linterna","la lampe torche","Se fue la luz y buscamos una linterna.","Día a día","Aussi la lampe de poche du téléphone : la linterna del móvil. ⚠️ une lanterne (décorative) = un farolillo."],
["la funda","la housse, l'étui, la coque","Se me cayó el móvil pero llevaba funda.","Día a día","Très productif : funda del móvil (coque), funda de almohada (taie), funda nórdica (housse de couette), funda de gafas (étui)."],
["el pegamento","la colle","Pegó el asa rota con pegamento.","Día a día","pegar = coller (et aussi frapper !). La colle en bâton = la barra de pegamento ; la super glue = el pegamento instantáneo."],
["la cinta adhesiva","le ruban adhésif, le scotch","Cierra la caja con cinta adhesiva.","Día a día","En Espagne on dit couramment el celo (de la marque Cello), comme « du scotch » en français. Le gros ruban d'emballage = la cinta de embalar."],

/* ---------- EL BAÑO ---------- */
["el peine","le peigne","Ni peine ni espejo: salió con el pelo revuelto.","Día a día","peinar(se) = (se) coiffer ; el peinado = la coiffure. La brosse à cheveux = el cepillo del pelo."],
["el secador","le sèche-cheveux","No encuentro el secador en la maleta.","Día a día","De secar (sécher). Le sèche-linge = la secadora (féminin — ne pas confondre)."],
["la maquinilla de afeitar","le rasoir","Se cortó con la maquinilla de afeitar.","Día a día","afeitarse = se raser ; la barba (barbe), la espuma de afeitar (mousse). Le rasoir électrique = la maquinilla eléctrica."],
["el desagüe","la bonde, l'évacuation, le siphon","Se ha atascado el desagüe de la ducha.","Día a día","De agua. atascarse = se boucher. Le trou d'évier ou de lavabo, et le tuyau qui descend : tout ça est el desagüe."],
["el papel higiénico","le papier toilette","Se acabó el papel higiénico otra vez.","Día a día","Familier : el papel del váter. Un rouleau = un rollo (et un rollo, familier, = une galère ou une histoire d'amour sans lendemain)."],
["la esponja","l'éponge","Limpia la encimera con una esponja húmeda.","Día a día","Au figuré : es una esponja = il absorbe tout (il apprend vite, ou il boit beaucoup). beber como una esponja = boire comme un trou."],
["el champú","le shampoing","Compra champú, que queda poco.","Día a día","Pluriel : los champús. L'après-shampoing = el acondicionador ou la crema suavizante."],

/* ---------- LA COCINA ---------- */
["el cucharón","la louche","Sirve la sopa con el cucharón.","Día a día","Augmentatif de cuchara (cuillère). La cuillère en bois = la cuchara de madera ; la spatule = la espátula."],
["el colador","la passoire, le chinois","Escurre la pasta en el colador.","Día a día","colar = filtrer, passer. escurrir = égoutter. Au figuré : colarse = resquiller, se faufiler dans une file."],
["la tabla de cortar","la planche à découper","Corta la cebolla en la tabla de cortar.","Día a día","la tabla = la planche (et le tableau de chiffres). La planche de surf = la tabla de surf."],
["el abrelatas","l'ouvre-boîte","No encuentro el abrelatas en ningún cajón.","Día a día","Invariable : el abrelatas, los abrelatas. Même famille : el sacacorchos, el abrebotellas, el cascanueces — verbe + nom, toujours pluriel soudé."],
["el sacacorchos","le tire-bouchon","Trajo el vino pero olvidó el sacacorchos.","Día a día","sacar + corchos (bouchons de liège). Invariable au pluriel, comme abrelatas. Le bouchon de liège = el corcho ; celui de plastique = el tapón."],
["la bandeja","le plateau","Llevó los cafés en una bandeja.","Día a día","Aussi le plat du four (la bandeja del horno) et la boîte de réception (la bandeja de entrada). servir en bandeja = servir sur un plateau (offrir trop facilement)."],
["la batidora","le mixeur, le batteur","Tritura la sopa con la batidora.","Día a día","batir = battre (les œufs, un record). triturar = mixer. Le robot = el robot de cocina ; le blender = la batidora de vaso."],
["la cafetera","la cafetière","Pon la cafetera, que me duermo.","Día a día","La cafetière italienne = la cafetera italiana. Familier : estar como una cafetera = être complètement cinglé, ou tousser bruyamment."],
["el estropajo","l'éponge à récurer, le tampon à vider","Esa sartén solo sale con estropajo.","Día a día","Pour frotter (grattant) ; la bayeta sert à essuyer. Au figuré : el pelo como un estropajo = des cheveux comme de la paille."],
["la bayeta","la serpillière de table, la lavette","Pasa la bayeta por la mesa.","Día a día","Le chiffon qui essuie les surfaces. el trapo = chiffon en général ; la fregona = la serpillière à manche."],
["el trapo","le chiffon, le torchon","Seca los vasos con un trapo limpio.","Día a día","Expressions courantes : sacar los trapos sucios = laver son linge sale en public ; a todo trapo = à fond ; soltar el trapo = éclater (de rire ou en larmes)."],
["el congelador","le congélateur","Saca el pan del congelador.","Día a día","congelar = congeler ; descongelar = décongeler. Les surgelés = los congelados."],
["el cubo de basura","la poubelle","Baja el cubo de basura antes de las diez.","Día a día","el cubo = le seau (et le cube, et la puissance 3). La poubelle de rue = el contenedor ; sortir les poubelles = sacar la basura."],
["la pajita","la paille (pour boire)","¿Me pones una pajita, por favor?","Día a día","Diminutif de paja (paille, et sens vulgaire au masculin pluriel — d'où le diminutif qui s'est imposé). En Amérique : el popote (MX), la bombilla, el sorbete, la pitillo."],

/* ---------- EL DORMITORIO Y LA ROPA ---------- */
["la sábana","le drap","Hay que cambiar las sábanas.","Día a día","⚠️ Accent sur la 1re syllabe : SÁ-ba-na. La sabana (sans accent) = la savane. La taie = la funda de almohada ; la couette = el edredón."],
["el edredón","la couette","En invierno saco el edredón nórdico.","Día a día","Pluriel : los edredones. La housse de couette = la funda nórdica. La couverture = la manta."],
["el colchón","le matelas","El colchón está hundido por el medio.","Día a día","Pluriel : los colchones. Au figuré, très courant en finance et dans la presse : un colchón de ahorro = un matelas d'épargne, une réserve."],
["la percha","le cintre","Cuelga la chaqueta en una percha.","Día a día","Aussi le perchoir de l'oiseau. Familier : tener buena percha = avoir de l'allure, bien porter les vêtements."],
["la cremallera","la fermeture éclair","Se me ha roto la cremallera de la mochila.","Día a día","subir / bajar la cremallera = remonter / descendre la fermeture. Au figuré : ¡cierra la cremallera! = ferme-la !"],
["el cordón","le lacet, le cordon","Átate los cordones antes de caerte.","Día a día","atar / desatar los cordones = lacer / délacer. Aussi le cordon de police : el cordón policial, et le cordon ombilical."],
["la suela","la semelle","Estos zapatos tienen la suela gastada.","Día a día","La semelle intérieure = la plantilla. ⚠️ el suelo = le sol — mots voisins, sens différents."],
["el gorro","le bonnet","Ponte el gorro, que hace un frío horrible.","Día a día","La casquette = la gorra (féminin). Familier : estar hasta el gorro (de algo) = en avoir par-dessus la tête."],
["la sudadera","le sweat(-shirt)","Iba en sudadera y zapatillas.","Día a día","De sudar (transpirer). Avec capuche = con capucha. Le pull = el jersey ; le gilet = la chaqueta de punto."],
["la bata","la robe de chambre, la blouse","Abrió la puerta en bata.","Día a día","Vêtement d'intérieur, et aussi la blouse du médecin ou du laborantin (la bata blanca)."],
["la arruga","le pli, le faux pli ; la ride","La camisa está llena de arrugas.","Día a día","Le même mot pour le tissu et la peau. arrugar(se) = froisser, se friper ; au figuré arrugarse = se dégonfler, flancher."],
["la plancha","le fer à repasser","Dejé la plancha encendida, qué susto.","Día a día","planchar = repasser. Aussi : la plaque de cuisson (a la plancha = à la plancha) et, familier, la gaffe : meter la plancha / hacer una plancha = se planter en public."],
["el tendedero","l'étendoir, le fil à linge","No cabe más ropa en el tendedero.","Día a día","tender la ropa = étendre le linge. Les pinces à linge = las pinzas de la ropa."],
["el detergente","la lessive, le détergent","Echa el detergente en el cajetín.","Día a día","⚠️ Faux ami partiel : en français « détergent » fait produit industriel ; en espagnol c'est simplement la lessive du quotidien. L'adoucissant = el suavizante ; la javel = la lejía."],

/* ---------- EL TALLER Y EL JARDÍN ---------- */
["el martillo","le marteau","Dale con el martillo, pero flojito.","Día a día","martillear = marteler. En économie et dans la presse : a martillazos = à coups de marteau, brutalement."],
["el clavo","le clou","Se dobló el clavo al segundo golpe.","Día a día","clavar = clouer, planter. Expressions très courantes : dar en el clavo = taper dans le mille ; un clavo saca otro clavo = un de perdu, dix de retrouvés."],
["el tornillo","la vis","Falta un tornillo en la pata de la silla.","Día a día","atornillar / desatornillar = visser / dévisser. Familier : le falta un tornillo = il lui manque une case."],
["el destornillador","le tournevis","Necesito un destornillador de estrella.","Día a día","de estrella = cruciforme ; plano = plat. En Amérique : el desarmador (MX). Aussi le cocktail vodka-orange."],
["el taladro","la perceuse","El vecino lleva con el taladro desde las ocho.","Día a día","taladrar = percer. Le trou = el agujero ; la cheville = el taco."],
["la llave inglesa","la clé à molette","Aprieta la tuerca con la llave inglesa.","Día a día","la tuerca = l'écrou ; apretar = serrer, aflojar = desserrer. La clé plate = la llave fija ; la clé Allen = la llave Allen."],
["los alicates","la pince (outil)","Córtalo con los alicates.","Día a día","Au pluriel, comme las tijeras. ⚠️ La pince à linge ou à épiler = la pinza ; la pince du crabe = la pinza aussi."],
["la cinta métrica","le mètre ruban","Pásame la cinta métrica, a ver si cabe.","Día a día","medir = mesurer (mido, midió, midiera). Le mètre pliant = el metro plegable ; el metro tout court = le mètre et le métro."],
["la brocha","le gros pinceau, la brosse","Da la primera capa con brocha ancha.","Día a día","la brocha = large (peinture murale) ; el pincel = fin (tableau). la capa = la couche. Au figuré : brocha gorda = travail grossier, sans finesse."],
["la lija","le papier de verre","Pasa la lija antes de pintar.","Día a día","lijar = poncer. También el papel de lija. Ne pas confondre avec lijar / fijar (fixer)."],
["la manguera","le tuyau d'arrosage","Riega el huerto con la manguera.","Día a día","regar = arroser (riego, riega — e→ie). Le tuyau des pompiers aussi : la manguera de bomberos."],
["la regadera","l'arrosoir","Llena la regadera en el grifo de fuera.","Día a día","⚠️ En Amérique (MX surtout), la regadera = la douche. Espagne : estar como una regadera = être complètement fou."],
["la maceta","le pot de fleurs","Se me han secado todas las macetas.","Día a día","la planta = la plante ; el tiesto = autre mot pour le pot. Le terreau = la tierra para macetas."],
["el recogedor","la pelle à poussière","Barre y recoge con el recogedor.","Día a día","recoger = ramasser, récupérer. barrer = balayer (avec la escoba, déjà dans tes cartes)."],
["la fregona","la serpillière (à manche), le balai-éponge","Pasa la fregona en la cocina.","Día a día","fregar = laver (le sol, la vaisselle) : fregar los platos = faire la vaisselle. Invention espagnole, d'où le mot propre à l'Espagne ; ailleurs : el trapeador, el lampazo."],
["la aspiradora","l'aspirateur","Pasa la aspiradora antes de que vengan.","Día a día","Aussi el aspirador en Espagne. « Passer l'aspirateur » = pasar la aspiradora — le verbe est pasar, pas hacer."],

/* ---------- LA CALLE Y EL COCHE ---------- */
["el volante","le volant","Lleva veinte años al volante.","Día a día","al volante = au volant. Aussi : el volante médico (la feuille d'orientation) et le volant de badminton."],
["el capó","le capot","Levantó el capó y salió humo.","Día a día","Du français. Le coffre = el maletero ; le pare-chocs = el parachoques ; la portière = la puerta."],
["el limpiaparabrisas","l'essuie-glace","Con esta lluvia no dan abasto los limpiaparabrisas.","Día a día","Invariable au pluriel. el parabrisas = le pare-brise ; même famille : el salpicadero (tableau de bord). no dar abasto = ne pas y suffire."],
["el retrovisor","le rétroviseur","Mira por el retrovisor antes de adelantar.","Día a día","El retrovisor interior / lateral. adelantar = doubler (et avancer une date). El angle mort = el ángulo muerto."],
["el neumático","le pneu","Hay que cambiar los neumáticos de delante.","Día a día","Familier et très fréquent : la rueda (la roue, et le pneu dans la langue parlée). La crevaison = el pinchazo."],
["el pinchazo","la crevaison ; la piqûre","Un pinchazo en plena autovía.","Día a día","pinchar = crever, piquer. Aussi au figuré : un pinchazo = un échec cuisant (un film, une soirée). Et pinchar música = passer de la musique (DJ)."],
["el depósito","le réservoir ; le dépôt","Llena el depósito antes de salir.","Día a día","Le réservoir d'essence, et le dépôt bancaire ou la caution d'un loyer — c'est le même mot (déjà utile pour ton vocabulaire financier)."],
["el bordillo","la bordure du trottoir","Subió el coche al bordillo.","Día a día","la acera = le trottoir (déjà dans tes cartes), el bordillo = le rebord. Le caniveau = la cuneta."],
["la farola","le réverbère, le lampadaire de rue","Se fundió la farola de la esquina.","Día a día","fundirse = griller (une ampoule). La lampe de salon = la lámpara. Au figuré, en Espagne : tieso como una farola = raide comme un piquet."],
["la barandilla","la rampe, la balustrade","Agárrate a la barandilla al bajar.","Día a día","La rampe d'escalier et le garde-corps du balcon. agarrarse a = s'accrocher à."],
["el buzón","la boîte aux lettres","No miro el buzón desde hace días.","Día a día","Pluriel : los buzones. Aussi la boîte vocale : el buzón de voz. El portal = le hall d'immeuble (déjà dans tes cartes)."],
["el timbre","la sonnette","Llama al timbre, que no funciona el portero.","Día a día","llamar al timbre / tocar el timbre = sonner. Aussi le timbre de la voix, et le timbre fiscal."],
["el callejón","la ruelle","Se metió por un callejón sin salida.","Día a día","Augmentatif de calle. un callejón sin salida = une impasse — au propre et au figuré (des négociations dans l'impasse)."],
["la cuesta","la côte, la montée","Vivo al final de la cuesta.","Día a día","cuesta arriba / abajo = en montant / en descendant. Au figuré : se me hace cuesta arriba = ça me coûte, c'est pénible. Et la cuesta de enero = le mois de janvier difficile, après les dépenses des fêtes."],

/* ---------- EL CUERPO, EL DÍA A DÍA ---------- */
["la cadera","la hanche","Se rompió la cadera en la escalera.","Día a día","⚠️ Ne pas confondre avec la cadena (la chaîne). Le bassin = la pelvis ; la taille = la cintura."],
["la barbilla","le menton","Apoyó la barbilla en la mano.","Día a día","Aussi el mentón (plus anatomique). la barba = la barbe ; la mandíbula = la mâchoire."],
["la pestaña","le cil","Se le metió una pestaña en el ojo.","Día a día","Aussi l'onglet d'un navigateur : abrir en una pestaña nueva. la ceja = le sourcil (déjà dans tes cartes)."],
["la ampolla","l'ampoule (au pied)","Me salió una ampolla andando.","Día a día","⚠️ L'ampoule électrique = la bombilla. Aussi l'ampoule de verre (médicament). salirle a uno una ampolla = se faire une ampoule."],
["el moratón","le bleu, l'hématome","Tiene un moratón enorme en el brazo.","Día a día","Aussi el moretón (Amérique) et el cardenal (Espagne, soutenu — et le cardinal !). De morado = violet."],
["la picadura","la piqûre (insecte)","Una picadura de mosquito que no para de picar.","Día a día","picar = piquer, et démanger. ⚠️ La piqûre du médecin = la inyección ou el pinchazo ; la picadura, c'est l'insecte."],
["el estornudo","l'éternuement","Un estornudo en medio de la reunión.","Día a día","estornudar = éternuer. On répond ¡Jesús! ou ¡Salud! (pas « santé » après un éternuement : salud sert aux deux, mais Jesús est le réflexe en Espagne)."],
["el hipo","le hoquet","Me ha entrado hipo otra vez.","Día a día","tener hipo / entrarle a uno el hipo = avoir le hoquet. ⚠️ Rien à voir avec hipo- (préfixe) ni avec el hipopótamo."],
["el bostezo","le bâillement","Disimuló el bostezo como pudo.","Día a día","bostezar = bâiller. Au figuré : es un bostezo = c'est soporifique."],
["el escalofrío","le frisson","Me dio un escalofrío al oírlo.","Día a día","De escala + frío. dar escalofríos = donner des frissons — de froid, de peur ou d'émotion. escalofriante = glaçant."],
["el calambre","la crampe ; la décharge électrique","Me dio un calambre en la pantorrilla.","Día a día","la pantorrilla = le mollet. Aussi : me dio calambre al tocar el cable = j'ai pris une châtaigne."],
["las agujetas","les courbatures","Tengo agujetas de ayer.","Día a día","Toujours au pluriel, en Espagne. De aguja (aiguille) — « les petites aiguilles ». En Amérique : el dolor muscular ; les lacets se disent aussi agujetas au Mexique, attention."],
["el ronquido","le ronflement","Sus ronquidos se oyen desde el pasillo.","Día a día","roncar = ronfler. L'apnée du sommeil = la apnea del sueño."],
["la caspa","les pellicules","Champú anticaspa, por favor.","Día a día","Singulier en espagnol, pluriel en français. Au figuré, en Espagne : caspa = ringardise (un humor con mucha caspa = un humour daté)."],

/* ---------- LOS ABSTRACTOS QUE FALTABAN ---------- */
["el tabú","le tabou","El dinero sigue siendo un tabú en muchas familias.","Abstracto C1","Pluriel : los tabúes (soutenu) ou los tabús. Adjectif invariable : un tema tabú, temas tabú. romper un tabú = briser un tabou."],
["el pudor","la pudeur, la gêne","Le da pudor hablar de lo que gana.","Abstracto C1","dar pudor = gêner, intimider. pudoroso = pudique ; sin pudor = sans vergogne. Voisin utile : la vergüenza (la honte)."],
["el azar","le hasard","No fue casualidad, fue puro azar.","Abstracto C1","al azar = au hasard ; juegos de azar = jeux de hasard. ⚠️ Nuance : la casualidad = la coïncidence qui tombe bien ; el azar = le hasard comme principe. Et la suerte = la chance."],
["el apego","l'attachement","Le tiene mucho apego a esa casa.","Abstracto C1","tener apego a = être attaché à ; desapego = détachement, indifférence. Registre courant et psychologique (la teoría del apego)."],

/* ---------- EL ORAL DE TODOS LOS DÍAS ---------- */
["la chapuza","le travail bâclé, le bricolage mal fait","La reforma es una chapuza de arriba abajo.","Oral","Aussi le petit boulot au noir : hacer chapuzas. chapucero = bâcleur, qui travaille salement. Très fréquent dans la presse espagnole pour critiquer une loi mal ficelée."],
["el cacharro","le truc, le machin (objet, appareil)","Este cacharro no funciona desde ayer.","Oral","Pour tout appareil, surtout quand il énerve : la voiture, la machine à laver, l'ordinateur. Au pluriel, les casseroles : fregar los cacharros = faire la vaisselle."],
["el trasto","le vieux truc encombrant","El garaje está lleno de trastos.","Día a día","Ce qui ne sert plus et prend de la place. Pour une personne : es un trasto = c'est un bon à rien, ou un enfant turbulent. el trastero = le débarras, la cave."],
["el follón","le bazar, le bordel, l'embrouille","Se montó un follón tremendo en la reunión.","Oral","montarse / armarse un follón = ça part en vrille. Très espagnol, familier mais pas grossier. Synonymes : el lío, el jaleo, el marrón (la galère qu'on se prend)."],
["el jaleo","le vacarme, le remue-ménage","¿Qué jaleo es ese de la calle?","Oral","Le bruit et l'agitation. armar jaleo = faire du raffut. Moins négatif que follón : un jaleo peut être joyeux."],
["un mogollón (de)","un paquet, plein (de)","Había un mogollón de gente.","Oral","Très familier, Espagne. Aussi adverbe : me gusta mogollón = j'adore. Registre à éviter à l'écrit ou en entretien — mais omniprésent à l'oral."],
["el curro","le boulot","Salgo del curro a las siete.","Oral","currar = bosser ; el currante = le bosseur. Espagne uniquement (en Amérique : la chamba, el laburo). À l'écrit, el trabajo."],
["tener buena pinta","avoir l'air bon, avoir bonne allure","Ese plato tiene buena pinta.","Oral","la pinta = l'allure, l'apparence. tener mala pinta = ne rien présager de bon. Pour une personne : va hecho una pinta = il est accoutré n'importe comment."],
["apetecer","avoir envie de, dire (quelque chose à quelqu'un)","¿Te apetece un café?","Oral","⚠️ Se construit comme gustar : me apetece, te apetece — le sujet est la chose. « J'ai envie d'un café » = me apetece un café, jamais « yo apetezco »."],
["hacer caso (a)","écouter, tenir compte de, faire attention à","No le hagas caso, lo dice por molestar.","Oral","hacer caso a alguien = l'écouter, suivre son conseil ; ni caso = ignore complètement. Aussi hacer caso omiso de = ne tenir aucun compte de (soutenu)."]

  ]);
  window.VOCAB_PRIO = (window.VOCAB_PRIO || []).concat(
    [...Array(window.VOCAB.length - start).keys()].map(k => start + k));
})();
