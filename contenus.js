/* ==========================================================================
   Textes du site — modifiables librement.
   Numérologie pythagoricienne : nombres 1 à 9 et nombres maîtres 11, 22, 33.
   ========================================================================== */

window.NUMEROLOGIE = {

  /* Chemin de vie : somme de tous les chiffres de la date de naissance */
  cheminDeVie: {
    1: {
      titre: "L'Élan",
      mots: ["Initiative", "Indépendance", "Courage"],
      texte: "Votre route est celle de l'élan premier. Vous êtes là pour ouvrir des voies, décider, oser ce que d'autres n'osent pas encore. La vie vous pousse régulièrement à vous affirmer et à compter sur vos propres forces. Votre défi : ne pas confondre indépendance et solitude, et apprendre à écouter sans perdre votre cap."
    },
    2: {
      titre: "L'Accord",
      mots: ["Coopération", "Sensibilité", "Diplomatie"],
      texte: "Votre chemin passe par les autres. Vous percevez les nuances, les non-dits, les équilibres fragiles, et vous savez réunir là où d'autres divisent. Le couple, les associations, le travail d'équipe sont vos terrains d'épanouissement. Votre défi : oser exprimer vos propres besoins plutôt que de vous effacer pour préserver l'harmonie."
    },
    3: {
      titre: "La Parole",
      mots: ["Créativité", "Communication", "Joie de vivre"],
      texte: "Votre chemin vous appelle à vous exprimer : par les mots, l'art, l'image, le contact. Votre route est lumineuse et sociable, portée par l'enthousiasme et l'imagination, et l'on vient vers vous pour votre légèreté et votre sens du lien. Votre défi : rassembler vos talents au lieu de les disperser, et aller au bout de ce que vous commencez."
    },
    4: {
      titre: "La Pierre",
      mots: ["Stabilité", "Travail", "Loyauté"],
      texte: "Votre route se construit pierre après pierre. Vous avez le sens de l'effort, de la méthode et de la parole donnée, et ce que vous bâtissez est fait pour durer. La sécurité, matérielle comme affective, compte beaucoup pour vous. Votre défi : accueillir l'imprévu avec plus de souplesse — tout ne se planifie pas, et c'est parfois une chance."
    },
    5: {
      titre: "Le Vent",
      mots: ["Liberté", "Mouvement", "Curiosité"],
      texte: "Votre chemin est fait de virages, de voyages et de rencontres. Vous avez besoin d'air, de nouveauté, d'expériences qui vous font vibrer. Votre curiosité et votre capacité d'adaptation vous font rebondir là où d'autres s'enlisent. Votre défi : trouver la liberté sans fuir l'engagement, et approfondir plutôt que papillonner."
    },
    6: {
      titre: "Le Foyer",
      mots: ["Amour", "Responsabilité", "Harmonie"],
      texte: "Votre chemin est tourné vers le cœur et la famille, au sens large : ceux que vous aimez, ceux dont vous prenez soin. Vous avez un sens profond des responsabilités, de la beauté et de la justice. On compte sur vous, et vous ne décevez pas. Votre défi : ne pas porter le monde sur vos épaules, et accepter de recevoir à votre tour."
    },
    7: {
      titre: "La Quête",
      mots: ["Introspection", "Connaissance", "Spiritualité"],
      texte: "Votre route est d'abord intérieure. Vous avez besoin de comprendre, d'analyser, d'aller sous la surface des choses. L'étude, la réflexion, la recherche de sens — parfois spirituelle — jalonnent votre vie. Votre défi : ne pas vous retirer du monde, et faire confiance à votre intuition autant qu'à votre raison."
    },
    8: {
      titre: "La Puissance",
      mots: ["Ambition", "Réalisation", "Maîtrise"],
      texte: "Votre chemin est celui de la réalisation concrète. Vous avez de l'énergie, du flair, le goût des défis et de la réussite. L'argent, les responsabilités et l'autorité sont des thèmes récurrents de votre vie, avec des hauts et des bas marqués. Votre défi : mettre votre force au service de quelque chose de plus grand que vous."
    },
    9: {
      titre: "L'Horizon",
      mots: ["Générosité", "Idéal", "Ouverture"],
      texte: "Votre route est large comme le monde. Les grandes causes, les autres cultures, la souffrance d'autrui vous touchent profondément, et vous avez besoin d'un idéal pour avancer. Votre vie est souvent riche en expériences et en rencontres marquantes. Votre défi : apprendre à clore les cycles, à lâcher prise, et à ne pas vous oublier en donnant."
    },
    11: {
      titre: "L'Inspiration",
      mots: ["Intuition", "Vision", "Rayonnement"],
      texte: "Nombre maître, le 11 porte une vibration intense. Vous captez ce que d'autres ne voient pas, et vous avez le pouvoir d'inspirer, d'éclairer, de guider. Cette sensibilité est une force, mais aussi une source de tension nerveuse. Votre défi : ancrer vos intuitions dans le concret. Par moments, le 11 se vit aussi comme un 2 (1 + 1)."
    },
    22: {
      titre: "L'Œuvre",
      mots: ["Vision", "Construction", "Envergure"],
      texte: "Nombre maître, le 22 associe le rêve et la capacité de le bâtir. Vous avez la possibilité de mener des projets d'envergure, utiles au plus grand nombre. La pression peut être forte, car vous visez haut. Votre défi : avancer pas à pas sans vous laisser écraser par l'ampleur de votre vision. Le 22 se vit aussi comme un 4 (2 + 2)."
    },
    33: {
      titre: "Le Cœur",
      mots: ["Compassion", "Transmission", "Dévouement"],
      texte: "Nombre maître plus rare, le 33 est celui du cœur qui enseigne. Le soin, la transmission, l'accompagnement des autres vous appellent naturellement, et votre présence apaise. Votre défi : poser des limites saines et ne pas vous sacrifier. Le 33 se vit aussi comme un 6 (3 + 3)."
    }
  },

  /* Nombre d'expression : toutes les lettres des prénoms et du nom */
  expression: {
    1: "Vous vous exprimez avec franchise et détermination. Vous préférez agir plutôt que commenter, et vous prenez volontiers la tête d'un projet.",
    2: "Vous vous exprimez avec tact et douceur. L'écoute, le conseil et le travail à deux vous réussissent.",
    3: "Vous vous exprimez avec aisance et fantaisie. Les mots, l'image ou la scène sont vos meilleurs outils.",
    4: "Vous vous exprimez avec précision et fiabilité. On apprécie votre sérieux, votre méthode et votre constance.",
    5: "Vous vous exprimez avec vivacité et curiosité. Vous convainquez par votre énergie et votre capacité à rebondir.",
    6: "Vous vous exprimez avec chaleur et sens des responsabilités. Vous savez conseiller, apaiser, rassembler.",
    7: "Vous vous exprimez avec réflexion et profondeur. Vous préférez peu de mots, mais justes.",
    8: "Vous vous exprimez avec autorité et efficacité. Décider, organiser et tenir le cap vous vient naturellement.",
    9: "Vous vous exprimez avec générosité et ouverture. Votre empathie et votre idéal touchent les autres.",
    11: "Vous vous exprimez avec inspiration. Vos idées peuvent éveiller et entraîner les autres — à condition d'oser les partager.",
    22: "Vous avez le talent rare de transformer une grande idée en réalisation concrète, et de fédérer autour d'elle.",
    33: "Vous vous exprimez avec bienveillance et pédagogie. Transmettre et accompagner vous vient naturellement."
  },

  /* Nombre intime : les voyelles */
  intime: {
    1: "Au fond de vous : le besoin d'être libre de vos choix et de vous accomplir par vous-même.",
    2: "Au fond de vous : le besoin d'une relation profonde, d'aimer et de partager en harmonie.",
    3: "Au fond de vous : le besoin de créer, de partager, et de goûter pleinement la joie de vivre.",
    4: "Au fond de vous : le besoin de stabilité, de repères solides et d'un foyer sûr.",
    5: "Au fond de vous : le besoin d'évasion, de découvertes et de sensations nouvelles.",
    6: "Au fond de vous : le besoin d'harmonie, de beauté et d'une vie de famille épanouie.",
    7: "Au fond de vous : le besoin de calme, de sens et de vérité intérieure.",
    8: "Au fond de vous : le besoin de réussir, de bâtir et de voir vos accomplissements reconnus.",
    9: "Au fond de vous : le besoin de vous rendre utile et de contribuer à un monde meilleur.",
    11: "Au fond de vous : le besoin de vivre selon un idéal élevé et de suivre votre inspiration.",
    22: "Au fond de vous : le besoin de laisser une trace durable, une œuvre qui vous dépasse.",
    33: "Au fond de vous : le besoin d'aimer sans condition et d'apporter du réconfort."
  },

  /* Nombre de personnalité : les consonnes */
  personnalite: {
    1: "On vous perçoit comme quelqu'un de déterminé et d'indépendant, qui avance à sa façon.",
    2: "On vous perçoit comme quelqu'un de doux, d'accessible et d'attentionné.",
    3: "On vous perçoit comme quelqu'un de souriant, de communicatif et de créatif.",
    4: "On vous perçoit comme quelqu'un de solide, de sérieux et de digne de confiance.",
    5: "On vous perçoit comme quelqu'un de dynamique, de séduisant et d'imprévisible.",
    6: "On vous perçoit comme quelqu'un de chaleureux, de protecteur et d'élégant.",
    7: "On vous perçoit comme quelqu'un de réservé, de mystérieux et de très fin.",
    8: "On vous perçoit comme quelqu'un d'ambitieux, d'assuré et de charismatique.",
    9: "On vous perçoit comme quelqu'un d'ouvert, de bienveillant et d'inspirant.",
    11: "On vous perçoit comme quelqu'un d'à part, de magnétique et d'intuitif.",
    22: "On vous perçoit comme quelqu'un d'impressionnant, capable de grandes choses.",
    33: "On vous perçoit comme quelqu'un de rassurant, presque comme un guide."
  },

  /* Année personnelle : jour + mois de naissance + année en cours (1 à 9) */
  anneePerso: {
    1: "Année de commencements. Le moment de lancer des projets, de prendre des initiatives, de semer : ce qui naît maintenant donne le ton des neuf années à venir.",
    2: "Année de patience et d'alliances. Les choses mûrissent lentement ; les relations et la coopération passent au premier plan.",
    3: "Année d'expression et d'ouverture. Créativité, vie sociale, projets personnels : c'est le moment de vous faire entendre.",
    4: "Année de construction. On consolide, on organise, on travaille : les efforts d'aujourd'hui sont les fondations de demain.",
    5: "Année de changements. Mouvements, voyages, opportunités inattendues : gardez l'esprit mobile et ouvert à l'imprévu.",
    6: "Année du cœur et des responsabilités. Famille, couple, foyer, engagements : l'harmonie demande votre attention.",
    7: "Année d'introspection. Moins d'action, plus de réflexion : apprendre, vous ressourcer, faire le point.",
    8: "Année de récolte et de concrétisation. Finances, carrière, décisions importantes : agissez avec ambition.",
    9: "Année de fin de cycle. On trie, on termine, on laisse partir ce qui n'a plus sa place pour préparer le renouveau."
  }
};

/* ==========================================================================
   Oracle Belline : les sept familles planétaires
   ========================================================================== */

window.PLANETES = {
  soleil: {
    a: "au Soleil", nom: "Le Soleil", de: "du Soleil", jour: "dimanche", cartes: "4 à 10",
    mots: ["Réussite", "Rayonnement", "Reconnaissance"],
    texte: "La famille solaire parle d'élan vital et d'accomplissement : naissances, succès, honneurs, amitiés lumineuses. Ses lames réchauffent un tirage et annoncent ce qui grandit."
  },
  lune: {
    a: "à la Lune", nom: "La Lune", de: "de la Lune", jour: "lundi", cartes: "11 à 17",
    mots: ["Émotions", "Foyer", "Voyages"],
    texte: "La famille lunaire règne sur la sensibilité, la maison et les déplacements, mais aussi sur ce qui fluctue : humeurs changeantes, doutes, fragilités. Elle invite à écouter ce que l'on ressent."
  },
  mercure: {
    a: "à Mercure", nom: "Mercure", de: "de Mercure", jour: "mercredi", cartes: "18 à 24",
    mots: ["Échanges", "Argent", "Nouvelles"],
    texte: "La famille de Mercure est celle du mouvement : commerce, argent, démarches, messages, intelligence vive. Ses lames annoncent que les choses circulent — parfois très vite."
  },
  venus: {
    a: "à Vénus", nom: "Vénus", de: "de Vénus", jour: "vendredi", cartes: "25 à 31",
    mots: ["Amour", "Union", "Plaisirs"],
    texte: "La famille de Vénus est celle du cœur : amour, couple, famille, paix retrouvée, joies partagées autour d'une table. Elle adoucit tout ce qu'elle touche."
  },
  mars: {
    a: "à Mars", nom: "Mars", de: "de Mars", jour: "mardi", cartes: "32 à 38",
    mots: ["Action", "Conflits", "Énergie"],
    texte: "La famille martienne parle de combats : rivalités, litiges, autorité pesante, discussions serrées, mais aussi de l'énergie qu'il faut pour les traverser. Elle signale où rester vigilant."
  },
  jupiter: {
    a: "à Jupiter", nom: "Jupiter", de: "de Jupiter", jour: "jeudi", cartes: "39 à 45",
    mots: ["Protection", "Chance", "Sagesse"],
    texte: "La famille de Jupiter est la plus bienveillante du jeu : appuis, héritages, renommée, coups de chance et bonheur durable. Ses lames ouvrent des portes."
  },
  saturne: {
    a: "à Saturne", nom: "Saturne", de: "de Saturne", jour: "samedi", cartes: "46 à 52",
    mots: ["Temps", "Épreuves", "Maturité"],
    texte: "La famille saturnienne est celle du temps long : retards, revers, fins de cycle, retraite intérieure. Exigeante, elle apprend la patience et prépare souvent un renouveau."
  }
};

/* Chemin de vie → planète.
   Correspondance inspirée de la numérologie chaldéenne (elle ne figure pas dans le livret du jeu) :
   4 (Uranus) est rattaché au Soleil, 7 (Neptune) à la Lune, les nombres maîtres à leur réduction. */
window.PLANETE_DU_NOMBRE = {
  1: "soleil", 2: "lune", 3: "jupiter", 4: "soleil", 5: "mercure",
  6: "venus", 7: "lune", 8: "saturne", 9: "mars", 11: "lune", 22: "soleil", 33: "venus"
};

/* Les 53 lames de l'Oracle Belline, pour « Tirez votre lame du jour ».
   Noms et numéros vérifiés ; noms donnés sous leur forme usuelle.
   planete : soleil, lune, mercure, venus, mars, jupiter, saturne,
             maitresse (cartes 1 à 3, sans planète) ou bleue (carte hors série, sans numéro).
   Les messages sont des textes originaux, écrits pour ce site. */
window.CARTES = [
  { num: 1, nom: "La Destinée", planete: "maitresse", message: "Un choix important se présente aujourd'hui : pesez-le avec soin, car il peut orienter durablement la suite de votre chemin." },
  { num: 2, nom: "L'Étoile de l'homme", planete: "maitresse", message: "La présence d'un homme compte aujourd'hui : son soutien ou son regard peut vous aider à avancer avec plus d'assurance." },
  { num: 3, nom: "L'Étoile de la femme", planete: "maitresse", message: "Une femme de votre entourage peut vous éclairer aujourd'hui : accueillez son conseil et fiez-vous aussi à votre propre intuition." },
  { num: 4, nom: "La Nativité", planete: "soleil", message: "Quelque chose de neuf voit le jour : le moment est idéal pour lancer un projet ou prendre un nouveau départ." },
  { num: 5, nom: "Réussite", planete: "soleil", message: "Vos efforts portent enfin leurs fruits : ce que vous avez entrepris avec constance approche d'un aboutissement réjouissant." },
  { num: 6, nom: "Élévation", planete: "soleil", message: "Vous gagnez du terrain pas à pas : chaque marche franchie aujourd'hui consolide une progression durable." },
  { num: 7, nom: "Honneurs", planete: "soleil", message: "Vos qualités ne passent pas inaperçues : une marque de reconnaissance pourrait saluer aujourd'hui la valeur de votre travail." },
  { num: 8, nom: "Pensée-Amitié", planete: "soleil", message: "Une amitié sincère vous accompagne : un message, une pensée ou un geste attentionné pourrait vous réchauffer le cœur aujourd'hui." },
  { num: 9, nom: "Campagne-Santé", planete: "soleil", message: "Accordez-vous une pause au calme, idéalement au grand air : le repos d'aujourd'hui renforcera votre énergie et votre équilibre." },
  { num: 10, nom: "Présents", planete: "soleil", message: "Une belle surprise se prépare : ouvrez les yeux sur les cadeaux et les occasions que la journée vous réserve." },
  { num: 11, nom: "Trahison", planete: "lune", message: "Prudence dans vos confidences aujourd'hui : gardez pour vous ce qui compte vraiment et fiez-vous aux actes plutôt qu'aux promesses." },
  { num: 12, nom: "Départ", planete: "lune", message: "Un départ ou un déplacement se profile : laissez derrière vous ce qui vous pèse et accueillez le changement d'air." },
  { num: 13, nom: "Inconstance", planete: "lune", message: "Les envies changent vite aujourd'hui : évitez les engagements précipités et attendez que vos idées se stabilisent avant de trancher." },
  { num: 14, nom: "Découverte", planete: "lune", message: "Une réponse longtemps cherchée pourrait apparaître : votre curiosité vous mène aujourd'hui vers une découverte précieuse ou une vérité utile." },
  { num: 15, nom: "L'Eau", planete: "lune", message: "Vos émotions sont à fleur de peau : accueillez-les sans vous laisser submerger, comme l'eau qui suit paisiblement son cours." },
  { num: 16, nom: "Les Pénates", planete: "lune", message: "Votre foyer est aujourd'hui une source de force : prenez soin de votre intérieur et savourez la douceur de chez vous." },
  { num: 17, nom: "Maladie", planete: "lune", message: "Prenez soin de vous aujourd'hui : ralentissez le rythme et accordez-vous un vrai moment de repos." },
  { num: 18, nom: "Changement", planete: "mercure", message: "Les choses bougent autour de vous : accueillez le changement avec souplesse, il ouvre la voie à une évolution bienvenue." },
  { num: 19, nom: "Argent", planete: "mercure", message: "Vos finances pourraient s'éclaircir : une rentrée d'argent ou une bonne affaire est possible ; si elle se présente, gérez-la avec sagesse." },
  { num: 20, nom: "L'Intelligence", planete: "mercure", message: "Votre esprit est vif aujourd'hui : profitez-en pour étudier, écrire ou résoudre un problème qui demandait de la réflexion." },
  { num: 21, nom: "Vol-Perte", planete: "mercure", message: "Gardez un œil sur vos affaires et votre argent aujourd'hui : un peu de vigilance suffit à éviter une perte inutile." },
  { num: 22, nom: "Entreprises", planete: "mercure", message: "Le moment est propice à l'action : lancez vos démarches, car vos initiatives trouvent aujourd'hui un terrain favorable." },
  { num: 23, nom: "Trafic", planete: "mercure", message: "Les échanges sont favorisés : négociez, vendez, achetez ou circulez, en gardant l'œil ouvert sur les termes de chaque accord." },
  { num: 24, nom: "Nouvelle", planete: "mercure", message: "Une nouvelle est en route : un message, un appel ou une visite pourrait apporter aujourd'hui l'information que vous attendiez." },
  { num: 25, nom: "Plaisirs", planete: "venus", message: "Faites une place à la légèreté : un loisir, une sortie ou un moment créatif vous apportera aujourd'hui une joie bienvenue." },
  { num: 26, nom: "La Paix", planete: "venus", message: "Les tensions retombent : c'est une journée idéale pour se réconcilier, apaiser les esprits et retrouver une vraie sérénité." },
  { num: 27, nom: "Union", planete: "venus", message: "Les liens se resserrent : une alliance, en amour comme en affaires, peut se concrétiser sur des bases sincères et solides." },
  { num: 28, nom: "Famille", planete: "venus", message: "Vos proches sont une ressource précieuse aujourd'hui : un moment partagé en famille renforcera les liens et vous fera du bien." },
  { num: 29, nom: "Amor", planete: "venus", message: "Le cœur est à l'honneur : laissez parler vos sentiments, la tendresse partagée illumine votre journée et vos relations." },
  { num: 30, nom: "La Table", planete: "venus", message: "Un repas ou une réunion conviviale s'annonce : partagez la table et les rires avec ceux qui comptent pour vous." },
  { num: 31, nom: "Passions", planete: "venus", message: "Une forte intensité habite vos élans aujourd'hui : vivez pleinement vos passions, sans laisser l'excès ou la jalousie prendre le dessus." },
  { num: 32, nom: "Méchanceté", planete: "mars", message: "Les échanges risquent d'être piquants aujourd'hui : faites preuve de discrétion et ne répondez pas aux provocations." },
  { num: 33, nom: "Procès", planete: "mars", message: "Un désaccord pourrait se durcir : défendez vos droits avec calme, gardez une trace écrite de tout et privilégiez la conciliation." },
  { num: 34, nom: "Despotisme", planete: "mars", message: "Une autorité pesante pourrait chercher à vous imposer sa loi : préservez votre liberté intérieure et posez calmement vos limites." },
  { num: 35, nom: "Ennemis", planete: "mars", message: "Une rivalité peut se manifester : avancez avec tact, évitez la confrontation directe et misez sur vos alliés de confiance." },
  { num: 36, nom: "Pourparlers", planete: "mars", message: "Le dialogue est votre meilleur atout aujourd'hui : prenez le temps de discuter, d'écouter et de négocier avant toute décision définitive." },
  { num: 37, nom: "Feu", planete: "mars", message: "Une belle énergie vous anime : canalisez cette ardeur dans l'action et gardez votre sang-froid face aux mouvements d'humeur." },
  { num: 38, nom: "Accident", planete: "mars", message: "Un imprévu pourrait bousculer vos plans : ralentissez, redoublez de prudence dans vos gestes et vos déplacements." },
  { num: 39, nom: "Appui", planete: "jupiter", message: "Un soutien précieux se présente : une personne influente peut vous ouvrir des portes, osez lui demander son appui." },
  { num: 40, nom: "Beauté", planete: "jupiter", message: "Une belle harmonie émane de vous aujourd'hui : prenez soin de vous et laissez rayonner ce qui vous rend unique." },
  { num: 41, nom: "Héritage", planete: "jupiter", message: "Ce que vous avez reçu en biens, en savoirs ou en valeurs devient une force : appuyez-vous dessus pour bâtir l'avenir." },
  { num: 42, nom: "Sagesse", planete: "jupiter", message: "La réflexion l'emporte sur la précipitation : prenez du recul, écoutez les bons conseils et décidez avec mesure." },
  { num: 43, nom: "La Renommée", planete: "jupiter", message: "Votre réputation grandit et vos actions attirent les regards : c'est le moment de faire valoir vos talents." },
  { num: 44, nom: "Le Hasard", planete: "jupiter", message: "La chance surgit là où on ne l'attend pas : laissez une place à l'imprévu, il pourrait bien vous sourire." },
  { num: 45, nom: "Bonheur", planete: "jupiter", message: "Une joie simple et profonde colore votre journée : savourez ces instants de bonheur et partagez-les avec vos proches." },
  { num: 46, nom: "Infortune", planete: "saturne", message: "Quelques contretemps sont possibles : évitez les risques inutiles et gardez confiance, car les revers ne durent qu'un temps." },
  { num: 47, nom: "Stérilité", planete: "saturne", message: "Certains efforts tournent à vide : au lieu d'insister, réorientez votre énergie vers ce qui peut réellement aboutir." },
  { num: 48, nom: "Fatalité", planete: "saturne", message: "Un cycle arrive à son terme : acceptez ce qui ne dépend pas de vous, cette fin prépare un renouveau." },
  { num: 49, nom: "La Grâce", planete: "saturne", message: "Une protection bienveillante veille sur vous : même face à une difficulté, un secours inattendu peut se présenter." },
  { num: 50, nom: "Ruine", planete: "saturne", message: "Ménagez vos ressources aujourd'hui : consolidez ce qui est fragile et évitez les dépenses ou les risques inconsidérés." },
  { num: 51, nom: "Retard", planete: "saturne", message: "Les choses avancent plus lentement que prévu : armez-vous de patience, ce délai vous laisse le temps de mieux vous préparer." },
  { num: 52, nom: "Cloître", planete: "saturne", message: "Un besoin de retrait se fait sentir : accordez-vous un temps de calme intérieur, sans vous couper des autres." },
  { num: 0, nom: "La Carte bleue", planete: "bleue", message: "Un ciel dégagé s'ouvre devant vous : saisissez sans attendre la chance qui passe, elle apaise les inquiétudes du moment." },
];
