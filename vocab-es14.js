/* ============================================================
   CUMBRE — Vocabulaire lot 14 : MI LIBRO (mots relevés en lisant)
   [ES, FR, exemple ES, thème, note]
   2026-10-13. Mots notés pendant la lecture d'un roman. Contrôlés contre
   le deck : « sospechar de » et « tropezar con » existaient déjà — les
   entrées ci-dessous visent l'AUTRE emploi (sospechar que…, tropezar
   au sens propre), la note le rappelle.
   Chargé APRÈS vocab-es13.js → append en fin (les mots perso suivent via
   remapUserCards). VOCAB_PRIO : ces mots passent en tête des nouvelles cartes.
   ============================================================ */
(function () {
  const start = window.VOCAB.length;
  window.VOCAB = window.VOCAB.concat([

["al despertar","au réveil, en se réveillant","Al despertar, no reconoció su propia habitación.","Mi libro","al + infinitif = « au moment où / quand » : al llegar, al salir, al abrir la puerta. Très fréquent à l'écrit."],
["inaudito, inaudita","inouï, sans précédent","Es inaudito que nadie se haya dado cuenta.","Mi libro","Sens fort : « jamais vu, scandaleux ». Es inaudito que + subjonctif."],
["angustioso, angustiosa","angoissant(e)","Pasó una noche angustiosa esperando noticias.","Mi libro","la angustia = l'angoisse ; angustiado = angoissé (la personne). angustioso = ce qui angoisse."],
["el verdugo","le bourreau","El verdugo esperaba junto al cadalso.","Mi libro","Aussi au figuré : un patron, un tyran domestique… « Es un verdugo con sus empleados. »"],
["¿dónde diablos…?","où diable… ? (mais où donc… ?)","¿Dónde diablos habré dejado las llaves?","Mi libro","diablos renforce la question, comme « diable » ou « bon sang » : ¿qué diablos…?, ¿quién diablos…? Familier mais pas grossier."],
["no cabía duda","il n'y avait plus de doute possible","Al ver las huellas, no cabía duda: alguien había entrado.","Mi libro","caber = tenir dans (un espace) → no cabe duda = « il n'y a pas de place pour le doute ». Irrégulier : quepo, cupe, cabré. No cabía dudar ya = il n'était plus permis de douter."],
["la farsa","la farce, la mascarade","Todo aquel juicio fue una farsa cruel.","Mi libro","Au figuré : une comédie, un simulacre. ⚠️ « une farce » (blague) = una broma ; « farce » (cuisine) = el relleno."],
["el alma","l'âme","Lo sentí en el alma.","Mi libro","Féminin malgré « el » (a tonique) : el alma, las almas, el alma buena. Expressions : con toda el alma (de tout cœur), no había ni un alma (pas un chat)."],
["el espanto","l'épouvante, l'effroi","Miró con espanto la puerta que se abría sola.","Mi libro","espantar = effrayer / chasser (des mouches) ; espantoso = épouvantable. ¡Qué espanto! = quelle horreur !"],
["sospechar que","se douter que, soupçonner que","Sospecho que no nos ha dicho toda la verdad.","Mi libro","Déjà dans tes cartes : sospechar de (alguien) = soupçonner quelqu'un. Ici : sospechar que + indicatif = se douter que. la sospecha = le soupçon."],
["tropezar","trébucher","Tropezó con el borde de la alfombra y casi se cae.","Mi libro","Sens propre (trébucher). Déjà dans tes cartes : tropezar con = tomber sur (quelqu'un, un problème). Irrégulier : tropiezo, tropecé. el tropiezo = le faux pas."],
["recorrer","parcourir","Recorrió el pasillo de un extremo a otro.","Mi libro","Aussi : recorrer con la mirada (parcourir du regard). el recorrido = le parcours, l'itinéraire."],
["afilado, afilada","aiguisé(e), tranchant(e), effilé(e)","Tenía unos dientes pequeños y afilados.","Mi libro","afilar = aiguiser. Au figuré : una lengua afilada = une langue acérée."],
["el tacto","le toucher ; le tact","Al tacto, la tela era áspera. · Le dio la noticia con mucho tacto.","Mi libro","Deux sens comme en français : le sens du toucher ET la délicatesse."],
["dar fe de","témoigner de, attester","Yo estaba allí y puedo dar fe de lo que pasó.","Mi libro","Littéralement « donner foi ». Registre soutenu/juridique (un notaire « da fe »). Dans un récit : « daba fe de » = prouvait, attestait."]

  ]);
  window.VOCAB_PRIO = (window.VOCAB_PRIO || []).concat(
    [...Array(window.VOCAB.length - start).keys()].map(k => start + k));
})();
