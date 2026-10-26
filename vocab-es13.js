/* ============================================================
   CUMBRE — Vocabulaire lot 13 : LE QUOTIDIEN QUI MANQUAIT (+ phrases)
   [ES, FR, exemple ES, thème, note]
   2026-10-11. Les lots 9 à 12 avaient poussé vers le C1 (presse, droit,
   domaines). Le revers : des mots de tous les jours absents — la poêle
   était là, mais pas « hacer cola », « el maletero » ou « estar
   constipado ». 189 entrées, toutes contrôlées contre le deck existant
   (les doublons ont été écartés avant écriture). Nouveauté : un thème
   « Frases útiles » de phrases entières à apprendre en bloc.
   Chargé APRÈS vocab-es12.js → indices SRS stables (append en fin).
   ============================================================ */
window.VOCAB = window.VOCAB.concat([

/* ---------- Cuisiner (les gestes et les ustensiles qui manquaient) ---------- */
["asar","rôtir, griller","Asamos el pollo al horno.","Cocina","el asado = le rôti (et en Argentine, le barbecue)."],
["pelar","éplucher","Pela las patatas y córtalas en dados.","Cocina"],
["rallar","râper","Ralla un poco de queso por encima.","Cocina","⚠️ rallar (râper) ≠ rayar (rayer), même prononciation."],
["batir","battre (œufs, crème)","Bate los huevos con una pizca de sal.","Cocina"],
["el cazo","la casserole","Calienta la leche en un cazo.","Cocina"],
["a fuego lento","à feu doux","Déjalo cocer a fuego lento veinte minutos.","Cocina"],
["una pizca de","une pincée de","Añade una pizca de sal.","Cocina"],
["descongelar","décongeler","Saca la carne para descongelarla.","Cocina","el congelador = le congélateur."],
["aliñar","assaisonner (une salade)","Aliña la ensalada con aceite y vinagre.","Cocina","el aliño = la vinaigrette, l'assaisonnement."],
["las sobras","les restes (d'un repas)","Cenamos las sobras de ayer.","Cocina","sobrar = rester, être en trop."],

/* ---------- Faire les courses, les boutiques ---------- */
["el probador","la cabine d'essayage","¿Dónde están los probadores?","Compras"],
["las rebajas","les soldes","Lo compré en las rebajas de enero.","Compras"],
["estar de oferta","être en promotion","Las fresas están de oferta esta semana.","Compras"],
["hacer cola","faire la queue","Hicimos cola durante una hora.","Compras","la cola = la file d'attente."],
["el tique","le ticket de caisse","Guarde el tique por si quiere devolverlo.","Compras","Aussi écrit « ticket »."],
["devolver","rendre, rapporter (un achat)","Quiero devolver estos zapatos.","Compras","la devolución = le remboursement, le retour."],
["el escaparate","la vitrine","Vi un abrigo precioso en el escaparate.","Compras"],
["el carrito","le chariot, le caddie","Coge un carrito, vamos a comprar mucho.","Compras"],
["en efectivo","en espèces","¿Paga con tarjeta o en efectivo?","Compras"],
["la vuelta","la monnaie (rendue)","Quédese con la vuelta.","Compras","Aussi el cambio. Et « dar una vuelta » = faire un tour."],
["quedar bien / mal","aller bien / mal (vêtement)","Esa chaqueta te queda genial.","Compras","El vestido me queda grande = la robe est trop grande pour moi."],
["la ganga","la bonne affaire","Este piso es una ganga.","Compras"],

/* ---------- La santé du quotidien (pharmacie, rhume, petits bobos) ---------- */
["estar constipado","être enrhumé","Estoy constipado, no paro de estornudar.","Salud","⚠️ FAUX AMI : constipado = enrhumé. « Constipé » se dit estreñido."],
["la gripe","la grippe","Está en la cama con gripe.","Salud"],
["la tos","la toux","Tengo una tos que no se me quita.","Salud","toser = tousser."],
["estornudar","éternuer","Estornudó tres veces seguidas.","Salud","¡Jesús! / ¡Salud! = à tes souhaits."],
["marearse","avoir la tête qui tourne ; avoir le mal des transports","Me mareo en el barco.","Salud","estar mareado = avoir des vertiges, avoir la nausée."],
["la tirita","le pansement adhésif","Ponte una tirita en el dedo.","Salud"],
["el jarabe","le sirop","Toma una cucharada de jarabe para la tos.","Salud"],
["la pastilla","le comprimé, le cachet","Tómate una pastilla cada ocho horas.","Salud"],
["el centro de salud","le centre médical (de quartier)","Pide cita en el centro de salud.","Salud"],
["torcerse el tobillo","se tordre la cheville","Me torcí el tobillo bajando la escalera.","Salud","el esguince = l'entorse."],
["la herida","la blessure, la plaie","La herida tardó en cicatrizar.","Salud","herido = blessé."],
["sangrar","saigner","Le sangraba la nariz.","Salud"],
["estar de baja","être en arrêt maladie","Está de baja desde el lunes.","Salud","la baja médica = l'arrêt de travail."],
["la farmacia de guardia","la pharmacie de garde","A estas horas solo abre la farmacia de guardia.","Salud"],

/* ---------- La voiture et la route ---------- */
["la gasolinera","la station-service","Paramos en la próxima gasolinera.","Coche","repostar = faire le plein."],
["el maletero","le coffre","Mete las maletas en el maletero.","Coche"],
["pinchar","crever (un pneu)","Pinchamos una rueda en plena autopista.","Coche","el pinchazo = la crevaison. Aussi : pinchar = cliquer (familier), piquer."],
["adelantar","doubler, dépasser ; avancer","Prohibido adelantar en esta curva.","Coche","Aussi : adelantar una reunión = avancer une réunion."],
["frenar","freiner","Frenó de golpe.","Coche"],
["el taller","le garage (réparation) ; l'atelier","Llevé el coche al taller.","Coche","⚠️ « garaje » = le garage où l'on range la voiture."],

/* ---------- Téléphone et internet ---------- */
["quedarse sin batería","ne plus avoir de batterie","Me quedé sin batería en mitad de la llamada.","Digital"],
["cargar","charger","Pon el móvil a cargar.","Digital","el cargador = le chargeur."],
["reiniciar","redémarrer","Prueba a reiniciar el ordenador.","Digital","el ordenador (Espagne) = la computadora (Amérique)."],
["iniciar sesión","se connecter","Inicia sesión con tu correo.","Digital","cerrar sesión = se déconnecter."],
["el teclado","le clavier","El teclado español tiene la ñ.","Digital"],
["el buzón de voz","la messagerie vocale","Me saltó el buzón de voz.","Digital"],
["borrar","effacer, supprimer","Borra ese mensaje.","Digital"],
["la captura de pantalla","la capture d'écran","Hazle una captura de pantalla.","Digital"],

/* ---------- Caractère et émotions (registre courant) ---------- */
["borde","désagréable, sec","El camarero fue muy borde con nosotros.","Carácter","Familier, invariable : un chico borde, una chica borde."],
["cotilla","commère, curieux","Mi vecina es una cotilla.","Carácter","cotillear = commérer."],
["despistado","distrait, tête en l'air","Soy muy despistado, siempre pierdo las llaves.","Carácter"],
["tacaño","radin","No seas tacaño, invita tú.","Carácter"],
["mimado","gâté (enfant)","Es un niño mimado.","Carácter"],
["aliviado","soulagé","Me quedé aliviado al saber la noticia.","Carácter"],
["dar pena","faire de la peine ; faire pitié","Me da pena que te vayas.","Carácter"],
["dar asco","dégoûter","Me da asco la leche caliente.","Carácter","¡Qué asco! = beurk !"],
["dar corte","gêner, intimider","Me da corte hablar en público.","Carácter","Familier. Synonyme : dar vergüenza."],
["estar de buen humor","être de bonne humeur","Hoy está de buen humor.","Carácter"],
["tranquilizarse","se calmer","Tranquilízate, no pasa nada.","Carácter"],

/* ---------- PHRASES toutes faites : à apprendre en bloc, telles quelles ---------- */
["¿Qué tal te va?","Comment ça va (pour toi) ?","—¿Qué tal te va en el nuevo trabajo? —Muy bien.","Frases útiles"],
["¿Te importa si…?","Ça te dérange si… ?","¿Te importa si abro la ventana?","Frases útiles","Avec le présent de l'indicatif après « si »."],
["No pasa nada","Ce n'est pas grave","—Perdona. —No pasa nada.","Frases útiles"],
["¿Me lo puedes repetir?","Tu peux me le répéter ?","Perdona, ¿me lo puedes repetir más despacio?","Frases útiles"],
["¿Cómo se dice … en español?","Comment dit-on … en espagnol ?","¿Cómo se dice « dépanneuse » en español?","Frases útiles"],
["Me suena","Ça me dit quelque chose","Ese nombre me suena.","Frases útiles","No me suena = ça ne me dit rien."],
["Tengo prisa","Je suis pressé","Lo siento, tengo prisa.","Frases útiles","Jamais « estoy apresurado » dans ce sens."],
["¡Que aproveche!","Bon appétit !","—¡Que aproveche! —Gracias, igualmente.","Frases útiles"],
["¡Que te mejores!","Bon rétablissement !","Me han dicho que estás mala. ¡Que te mejores!","Frases útiles","que + subjonctif = souhait."],
["¡Que lo pases bien!","Amuse-toi bien !","¡Que lo pases bien en la fiesta!","Frases útiles"],
["¡Enhorabuena!","Félicitations !","¡Enhorabuena por el nuevo trabajo!","Frases útiles","Pour un anniversaire : ¡Felicidades!"],
["¡Qué más da!","Qu'est-ce que ça peut faire !","¡Qué más da quién tenga razón!","Frases útiles"],
["Ni idea","Aucune idée","—¿Dónde está Juan? —Ni idea.","Frases útiles"],
["Me apetece","J'ai envie de","Me apetece un helado.","Frases útiles","Se construit comme gustar : ¿Te apetece ir al cine?"],
["¿Quedamos?","On se voit ?","¿Quedamos el sábado para tomar algo?","Frases útiles","quedar = se donner rendez-vous."],
["tomar algo","prendre un verre","¿Vamos a tomar algo?","Frases útiles"],
["¡Cuídate!","Prends soin de toi !","Hasta pronto, ¡cuídate!","Frases útiles"],
["¿Qué te pasa?","Qu'est-ce qui t'arrive ?","Te veo triste, ¿qué te pasa?","Frases útiles"],
["Llevo un rato esperando","J'attends depuis un moment","Llevo un rato esperando el autobús.","Frases útiles","llevar + durée + gérondif = faire quelque chose depuis."],
["¿En serio?","Sérieux ? / Vraiment ?","—Me ha tocado la lotería. —¿En serio?","Frases útiles"],
["Me alegro","Je suis content (pour toi)","—He aprobado. —¡Me alegro mucho!","Frases útiles","Me alegro de que + subjonctif."],
["¡Qué fuerte!","C'est dingue !","¡Qué fuerte lo que le pasó a Marta!","Frases útiles","Très familier, Espagne."],
["Ya está","C'est fait / Voilà","Ya está, ya he terminado.","Frases útiles"],
["¿Me dejas pasar?","Tu me laisses passer ?","Perdone, ¿me deja pasar?","Frases útiles"],
["¿Me cobras?","L'addition, s'il te plaît","¿Nos cobras, por favor?","Frases útiles","Au bar, plus courant que « la cuenta »."],
["Estoy a punto de","Je suis sur le point de","Estoy a punto de salir, te llamo luego.","Frases útiles"],
["Lo que tú digas","Comme tu veux","Vale, lo que tú digas.","Frases útiles"],
["No tiene nada que ver","Ça n'a rien à voir","Eso no tiene nada que ver con lo que te digo.","Frases útiles"],
["Da lo mismo","C'est pareil","Da lo mismo, hazlo como quieras.","Frases útiles"],
["¿Te viene bien…?","Ça t'arrange… ?","¿Te viene bien el martes a las cinco?","Frases útiles"],

/* ---------- Le travail, côté contrat et fiche de paie ---------- */
["la jornada completa","le temps plein","Trabajo a jornada completa.","Trabajo B1","media jornada = mi-temps."],
["el contrato indefinido","le CDI","Por fin tengo un contrato indefinido.","Trabajo B1","contrato temporal = CDD."],
["las horas extra","les heures supplémentaires","Hoy hago horas extra.","Trabajo B1"],
["estar en paro","être au chômage","Lleva un año en paro.","Trabajo B1","el paro = le chômage."],
["el puesto","le poste","Solicité un puesto de responsable.","Trabajo B1"],
["fichar","pointer ; recruter","Hay que fichar al entrar y al salir.","Trabajo B1","En sport : fichar a un jugador = recruter un joueur."],
["entregar","remettre, rendre","Entrega el informe antes del lunes.","Trabajo B1"],
["el compañero de trabajo","le collègue","Mis compañeros de trabajo son muy majos.","Trabajo B1","Familier : el compi."],
["pedir un aumento","demander une augmentation","Voy a pedir un aumento.","Trabajo B1"],

/* ---------- Verbes très fréquents absents du deck ---------- */
["aguantar","supporter, tenir le coup","No aguanto más este calor.","Verbos útiles"],
["averiguar","découvrir, chercher à savoir","Tengo que averiguar qué pasó.","Verbos útiles"],
["comprobar","vérifier","Comprueba que la puerta esté cerrada.","Verbos útiles"],
["sobrar","rester, être en trop","Sobra comida para mañana.","Verbos útiles","Se construit comme gustar : me sobran dos entradas."],
["faltar","manquer","Me faltan dos euros.","Verbos útiles","Comme gustar : faltar a alguien."],
["bastar","suffire","Basta con llamar.","Verbos útiles","¡Basta ya! = ça suffit !"],
["agradecer","remercier de, être reconnaissant de","Te agradezco la ayuda.","Verbos útiles","Sans « por » : agradecer algo a alguien."],
["aplazar","reporter, ajourner","Han aplazado la reunión.","Verbos útiles"],
["estropear","abîmer, gâcher","La lluvia estropeó la fiesta.","Verbos útiles","estropearse = tomber en panne."],
["empeorar","empirer, s'aggraver","El tiempo empeoró por la tarde.","Verbos útiles"],
["acertar","deviner juste, viser juste","¡Has acertado!","Verbos útiles","e → ie : acierto."],
["equivocarse","se tromper","Me equivoqué de número.","Verbos útiles","equivocarse de + nom = se tromper de."],
["regañar","gronder","Mi madre me regañó.","Verbos útiles"],
["recoger","ramasser, ranger, aller chercher","Voy a recoger a los niños al colegio.","Verbos útiles"],
["ahorrar","économiser","Estoy ahorrando para un viaje.","Verbos útiles"],
["mudarse","déménager","Nos mudamos el mes que viene.","Verbos útiles","la mudanza = le déménagement."],

/* ---------- Locutions C1 ---------- */
["a sabiendas de","en sachant pertinemment","Lo hizo a sabiendas de que estaba mal.","Locuciones C1+"],
["a lo sumo","tout au plus","Tardaremos, a lo sumo, una hora.","Locuciones C1+"],
["cuando menos","pour le moins","La decisión es, cuando menos, discutible.","Locuciones C1+"],
["acto seguido","aussitôt après","Firmó y, acto seguido, salió.","Locuciones C1+"],
["en vilo","sur des charbons ardents","Nos tuvo en vilo toda la noche.","Locuciones C1+"],
["a destiempo","à contretemps","Llegó a destiempo.","Locuciones C1+"],
["en balde","en vain","No ha sido en balde.","Locuciones C1+","= en vano."],

/* ---------- La maison qui tombe en panne, la location ---------- */
["la caldera","la chaudière","La caldera no enciende.","Casa"],
["el fontanero","le plombier","Llama al fontanero, hay una fuga.","Casa"],
["la fuga","la fuite","Hay una fuga de agua en el baño.","Casa","Aussi : la fuga de cerebros = la fuite des cerveaux."],
["gotear","goutter, fuir","El grifo gotea toda la noche.","Casa"],
["atascarse","se boucher, se coincer","Se ha atascado el fregadero.","Casa","Aussi : me atasqué en el ejercicio = j'ai bloqué."],
["la persiana","le volet roulant","Baja la persiana, que entra mucho sol.","Casa"],
["el portero automático","l'interphone","Llama al portero automático.","Casa","Aussi : el telefonillo."],
["el vecino de arriba","le voisin du dessus","El vecino de arriba hace mucho ruido.","Casa"],
["amueblado","meublé","Busco un piso amueblado.","Casa"],
["la mancha","la tache","No sale la mancha de vino.","Casa"],
["el polvo","la poussière","Hay polvo en todos los muebles.","Casa","quitar el polvo = faire la poussière."],

/* ---------- Voyager (aéroport, gare, hôtel) ---------- */
["el equipaje de mano","le bagage à main","Solo llevo equipaje de mano.","Viajes+"],
["perder el tren","rater le train","Perdimos el tren por cinco minutos.","Viajes+"],
["la ida y vuelta","l'aller-retour","Un billete de ida y vuelta a Toledo.","Viajes+","Solo ida = aller simple."],
["la habitación doble","la chambre double","Una habitación doble con vistas al mar.","Viajes+"],
["la media pensión","la demi-pension","Reservamos con media pensión.","Viajes+"],
["hacer turismo","faire du tourisme, visiter","Pasamos el día haciendo turismo.","Viajes+"],
["el recuerdo","le souvenir (objet, mémoire)","Compré un recuerdo para mi madre.","Viajes+","Saludos / recuerdos a tu familia = mes amitiés à ta famille."],

/* ---------- La ville ---------- */
["el estanco","le bureau de tabac","Compra sellos en el estanco.","Ciudad+","On y achète aussi des timbres."],
["el bono","l'abonnement (transport), le carnet","Me he sacado el bono mensual.","Ciudad+"],
["el contenedor","la benne, la poubelle (de rue)","Tira el vidrio al contenedor verde.","Ciudad+"],

/* ---------- Loisirs et sorties ---------- */
["salir de copas","sortir boire un verre","Los viernes salimos de copas.","Tiempo libre"],
["la entrada","le billet (spectacle) ; l'entrée","He comprado dos entradas para el concierto.","Tiempo libre","Pour le train/avion : el billete."],
["hacer senderismo","faire de la randonnée","Los domingos hacemos senderismo.","Tiempo libre"],
["la cartelera","le programme (ciné, théâtre)","¿Qué hay en la cartelera?","Tiempo libre"],
["apuntarse a","s'inscrire à","Me he apuntado a clases de baile.","Tiempo libre","¡Me apunto! = je suis partant !"],
["el aficionado","l'amateur, le fan","Es muy aficionado al fútbol.","Tiempo libre"],
["el ajedrez","les échecs","¿Juegas al ajedrez?","Tiempo libre","jugar A + jeu."],

/* ---------- La météo ---------- */
["hace un frío que pela","il fait un froid de canard","Abrígate, hace un frío que pela.","Tiempo"],
["el chubasco","l'averse","Se esperan chubascos por la tarde.","Tiempo"],
["la helada","la gelée","Anoche cayó una helada.","Tiempo"],
["despejado","dégagé (ciel)","Hoy el cielo está despejado.","Tiempo"],
["nublado","nuageux","Está nublado.","Tiempo"],
["el bochorno","la chaleur étouffante","¡Qué bochorno hace hoy!","Tiempo","Aussi : la honte, l'embarras."],
["la granizada","la grêle (averse)","Una granizada destrozó la cosecha.","Tiempo","el granizo = la grêle."],
["empaparse","se tremper","Me empapé volviendo a casa.","Tiempo","empapado = trempé."],

/* ---------- Le corps et les gestes ---------- */
["encogerse de hombros","hausser les épaules","Se encogió de hombros sin decir nada.","Cuerpo y gestos"],
["guiñar un ojo","faire un clin d'œil","Me guiñó un ojo.","Cuerpo y gestos"],
["fruncir el ceño","froncer les sourcils","Frunció el ceño al leer la carta.","Cuerpo y gestos"],
["asentir","acquiescer, hocher la tête","Asintió con la cabeza.","Cuerpo y gestos"],
["bostezar","bâiller","No paras de bostezar.","Cuerpo y gestos"],
["la nuca","la nuque","Me duele la nuca.","Cuerpo y gestos"],
["las pestañas","les cils","Tiene unas pestañas larguísimas.","Cuerpo y gestos"],

/* ---------- L’espagnol familier d’Espagne ---------- */
["molar","plaire, être cool","Me mola tu chaqueta.","Coloquial","Familier, Espagne. Construit comme gustar."],
["estar liado","être débordé","Esta semana estoy muy liado.","Coloquial"],
["la movida","l'histoire, l'embrouille","Hubo una movida en la fiesta.","Coloquial"],
["el chollo","la bonne affaire, le bon plan","Este trabajo es un chollo.","Coloquial"],
["rajarse","se dégonfler","Al final se rajó y no vino.","Coloquial"],
["estar forrado","être plein aux as","Su familia está forrada.","Coloquial"],
["vaya tela","quelle histoire !","Vaya tela con tu jefe.","Coloquial"],
["ser un pelota","être lèche-bottes","No seas pelota con el profe.","Coloquial"],
["tener morro","avoir du culot","¡Qué morro tienes!","Coloquial","Synonyme : tener cara."],

/* ---------- Verbes + préposition ---------- */
["enamorarse de","tomber amoureux de","Se enamoró de una chica de Cádiz.","Verbos+prep"],
["olvidarse de","oublier","Me olvidé de llamarte.","Verbos+prep","olvidar algo / olvidarse de algo, les deux existent."],
["interesarse por","s'intéresser à","Se interesa por la política.","Verbos+prep"],

/* ---------- Faux amis ---------- */
["la salida","la sortie ; le départ","La salida está al fondo.","Falsos amigos+","⚠️ « le succès » = el éxito."],
["la oficina","le bureau (lieu)","Trabajo en una oficina.","Falsos amigos+","Le meuble = el escritorio."],
["el bufete","le cabinet d'avocats","Trabaja en un bufete de abogados.","Falsos amigos+","⚠️ « buffet » (repas) = el bufé."],

/* ---------- Petits mots qui piègent ---------- */
["el rincón","le coin (intérieur)","Pon la planta en el rincón.","Matices léxicos","≠ la esquina (coin de rue, extérieur)."],
["las vacaciones","les vacances","Me voy de vacaciones.","Matices léxicos","Toujours au pluriel."],
["el tiempo / la vez","le temps / la fois","Tres veces al día. No tengo tiempo.","Matices léxicos","« vez » = fois (occurrence), « tiempo » = durée ou météo."],
["todavía no","pas encore","Todavía no he terminado.","Matices léxicos","= aún no."],
["ya no","ne… plus","Ya no vivo allí.","Matices léxicos"],
["casi","presque","Casi me caigo.","Matices léxicos","Avec le présent pour un fait passé : « casi me caigo » = j'ai failli tomber."],
["por fin","enfin (soulagement)","¡Por fin has llegado!","Matices léxicos","≠ finalmente / al final (pour conclure)."],
["hace poco","il y a peu","Lo vi hace poco.","Matices léxicos"]

]);
