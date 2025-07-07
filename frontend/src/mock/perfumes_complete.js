// Collection complète Collection Azynti basée sur vos données réelles
export const perfumes = [
  // Premiers parfums déjà ajoutés (1-30)
  {
    id: 1,
    name: "A LA ROSE",
    category: "Floral",
    description: "L'essence noble de la rose dans sa splendeur absolue, rehaussée par la profondeur de l'oud et la fraîcheur pétillante du pamplemousse.",
    notes: ["Rose", "Oud", "Pamplemousse", "Ambre", "Bois", "Sauge"],
    personality: ["élégant", "sophistiqué", "romantique", "noble"],
    mood: ["romantique", "confiant", "raffiné"]
  },
  {
    id: 2,
    name: "ACCORD",
    category: "Oriental",
    description: "Une symphonie parfaite où la vanille crémeuse danse avec l'encens mystique, portée par la lavande et le jasmin.",
    notes: ["Vanille", "Encens", "Lavande", "Jasmin", "Caramel"],
    personality: ["harmonieux", "mystérieux", "chaleureux", "équilibré"],
    mood: ["paisible", "mystérieux", "confortable"]
  },

  // Nouveaux parfums de votre liste (31+)
  {
    id: 31,
    name: "MALEÏKA",
    category: "Oriental",
    description: "Un hommage aux anges dans cette composition céleste où la pamplemousse rencontre la lavande et le tabac.",
    notes: ["Pamplemousse", "Lavande", "Tabac", "Safran", "Cuir", "Notes Boisées Sombres"],
    personality: ["céleste", "oriental", "mystique", "raffiné"],
    mood: ["mystérieux", "spirituel", "sophistiqué"]
  },
  {
    id: 32,
    name: "MALIKA",
    category: "Royal",
    description: "La royauté féminine incarnée dans ce mélange majestueux aux accents orientaux et floraux.",
    notes: ["Notes Royales", "Jasmin", "Rose", "Oud", "Ambre"],
    personality: ["royal", "majestueux", "féminin", "puissant"],
    mood: ["confiant", "royal", "puissant"]
  },
  {
    id: 33,
    name: "OCEAN WIND",
    category: "Aquatique",
    description: "La brise marine capturée dans cette fraîcheur océanique où l'iode danse avec les notes vertes.",
    notes: ["Pivoine", "Ambrette", "Vétiver", "Musc Blanc"],
    personality: ["aquatique", "frais", "libre", "naturel"],
    mood: ["libre", "rafraîchissant", "paisible"]
  },
  {
    id: 34,
    name: "OUD CHERRY",
    category: "Oud",
    description: "La rencontre sensuelle entre l'oud précieux et la cerise acidulée dans une danse olfactive envoûtante.",
    notes: ["Cerise", "Rose", "Oud", "Cuir"],
    personality: ["sensuel", "précieux", "fruité", "luxueux"],
    mood: ["séduisant", "luxueux", "mystérieux"]
  },
  {
    id: 35,
    name: "OUD FOR GLORY",
    category: "Oud",
    description: "L'oud de gloire dans sa plus noble expression, paré de saffran et d'ambre pour une signature royale.",
    notes: ["Oud", "Saffran", "Ambre", "Rose", "Bois Précieux"],
    personality: ["glorieux", "noble", "précieux", "royal"],
    mood: ["triomphant", "confiant", "puissant"]
  },
  {
    id: 36,
    name: "OUD ORANGE",
    category: "Oud",
    description: "L'exotisme méditerranéen rencontre la tradition orientale dans ce mariage parfait d'oud et d'orange.",
    notes: ["Notes Fruitées", "Noix de Coco", "Vanille Bourbon", "Fleur de Cactus", "Musc"],
    personality: ["exotique", "ensoleillé", "oriental", "gourmand"],
    mood: ["joyeux", "exotique", "ensoleillé"]
  },
  {
    id: 37,
    name: "OUD ROSE",
    category: "Oud",
    description: "La romance orientale sublimée dans cette union précieuse entre l'oud mystique et la rose éternelle.",
    notes: ["Oud", "Rose", "Vanille", "Ambre"],
    personality: ["romantique", "précieux", "mystique", "élégant"],
    mood: ["romantique", "mystérieux", "raffiné"]
  },
  {
    id: 38,
    name: "PEÜCE",
    category: "Boisé",
    description: "L'essence des forêts de pins dans cette composition résineuse où l'héliotrope rencontre les bois ambrés.",
    notes: ["Héliotrope", "Cumin", "Ambre Ambré", "Lavande", "Vanille"],
    personality: ["résineux", "boisé", "naturel", "enraciné"],
    mood: ["contemplatif", "naturel", "ancré"]
  },
  {
    id: 39,
    name: "ROSE SUCRE",
    category: "Gourmand",
    description: "La douceur de la rose cristallisée dans cette gourmandise florale aux accents poudrés et sucrés.",
    notes: ["Rose", "Sucre", "Vanille", "Poudre", "Musc"],
    personality: ["gourmand", "doux", "sucré", "romantique"],
    mood: ["tendre", "gourmand", "romantique"]
  },
  {
    id: 40,
    name: "RED SHOLING",
    category: "Rouge",
    description: "L'intensité du rouge passion dans cette composition audacieuse aux notes épicées et fruitées.",
    notes: ["Cerise", "Vanille", "Ambroxan", "Pur"],
    personality: ["passionné", "rouge", "intense", "audacieux"],
    mood: ["passionné", "intense", "séduisant"]
  },
  {
    id: 41,
    name: "REPLICA",
    category: "Moderne",
    description: "La réplique parfaite d'un souvenir olfactif, cristallisée dans cette composition contemporaine.",
    notes: ["Fleur de Cerisier", "Caramel", "Bois de Santal", "Oud", "Vanille", "Patchouli"],
    personality: ["moderne", "nostalgique", "authentique", "contemporain"],
    mood: ["nostalgique", "moderne", "authentique"]
  },
  {
    id: 42,
    name: "ROSE VANILLA",
    category: "Floral Gourmand",
    description: "L'alliance parfaite entre la rose délicate et la vanille crémeuse dans une harmonie gourmande.",
    notes: ["Citron d'Italie", "Rose de Turquie", "Vanille", "Musc Blanc", "Cèdre"],
    personality: ["harmonieux", "gourmand", "délicat", "crémeux"],
    mood: ["doux", "harmonieux", "réconfortant"]
  },
  {
    id: 43,
    name: "ROSENDO CINCO",
    category: "Floral",
    description: "La cinquième essence de rose dans cette composition florale raffinée aux multiples facettes.",
    notes: ["Jasmin", "Muguet", "Coriandre", "Ambre", "Cuir", "Musc"],
    personality: ["floral", "complexe", "raffiné", "multifacette"],
    mood: ["sophistiqué", "floral", "complexe"]
  },
  {
    id: 44,
    name: "SENT LOVE",
    category: "Romantique",
    description: "L'amour envoyé dans les airs à travers cette composition tendre aux notes de fleurs d'amour.",
    notes: ["Notes d'Amour", "Cèdre", "Ambre Rose", "Fleur de Coton"],
    personality: ["romantique", "tendre", "aimant", "doux"],
    mood: ["amoureux", "tendre", "romantique"]
  },
  {
    id: 45,
    name: "SO VELORUM",
    category: "Mystique",
    description: "Le voile mystique de la nuit étoilée dans cette composition éthérée aux reflets argentés.",
    notes: ["Clou de Girofle", "Rose de Damas", "Bois de Cèdre"],
    personality: ["mystique", "éthéré", "nocturne", "argenté"],
    mood: ["mystérieux", "éthéré", "contemplatif"]
  },
  {
    id: 46,
    name: "STAMATINE",
    category: "Classique",
    description: "L'endurance olfactive dans cette composition persistante aux notes de bergamote et patchouli.",
    notes: ["Bergamote", "Ambroxan", "Patchouli", "Fleur d'Oranger", "Jasmin", "Vanille"],
    personality: ["persistant", "classique", "endurant", "solide"],
    mood: ["confiant", "durable", "classique"]
  },
  {
    id: 47,
    name: "SUNSHINE",
    category: "Solaire",
    description: "Les rayons du soleil capturés dans cette composition lumineuse aux éclats dorés et chaleureux.",
    notes: ["Bergamote", "Bergamot", "Patchouli", "Fleur d'Oranger", "Jasmin", "Vanille"],
    personality: ["solaire", "lumineux", "chaleureux", "doré"],
    mood: ["ensoleillé", "joyeux", "lumineux"]
  },
  {
    id: 48,
    name: "THE CASHMERE",
    category: "Luxe",
    description: "La douceur du cachemire dans cette composition luxueuse aux notes poudrées et réconfortantes.",
    notes: ["Pamplemousse", "Lavande", "Tabac", "Safran", "Cuir", "Notes Boisées Sombres"],
    personality: ["luxueux", "doux", "cachemire", "réconfortant"],
    mood: ["luxueux", "confortable", "sophistiqué"]
  },
  {
    id: 49,
    name: "THE POWDER",
    category: "Poudré",
    description: "La poudre précieuse dans sa plus pure expression, douce comme un nuage de soie.",
    notes: ["Coconut", "Vanille", "Musc Blanc", "Noix de Coco"],
    personality: ["poudré", "doux", "précieux", "soyeux"],
    mood: ["doux", "poudreux", "délicat"]
  },
  {
    id: 50,
    name: "TYTY SUGAR",
    category: "Gourmand",
    description: "Le sucre cristallisé dans cette gourmandise olfactive aux notes de banane et fraise.",
    notes: ["Banane", "Fraise", "Vanille", "Caramel", "Vanille"],
    personality: ["gourmand", "sucré", "fruité", "joyeux"],
    mood: ["gourmand", "joyeux", "festif"]
  },
  {
    id: 51,
    name: "VALENTINE",
    category: "Romantique",
    description: "L'amour de la Saint-Valentin dans cette déclaration olfactive aux notes de framboise et caramel.",
    notes: ["Framboise", "Fraise", "Vanille", "Caramel", "Vanille"],
    personality: ["romantique", "amoureux", "festif", "sucré"],
    mood: ["amoureux", "romantique", "festif"]
  },
  {
    id: 52,
    name: "THEE ALGAS",
    category: "Aquatique",
    description: "Les algues précieuses dans cette composition marine aux reflets iodés et verts.",
    notes: ["Framboise", "Fraise", "Vanille", "Caramel", "Vanille"],
    personality: ["aquatique", "marin", "vert", "iodé"],
    mood: ["frais", "marin", "naturel"]
  },
  {
    id: 53,
    name: "WHITE MUSIC",
    category: "Blanc",
    description: "La musique blanche dans cette symphonie olfactive aux notes de muscade et bois de santal.",
    notes: ["Noix de Muscade", "Baie Rose", "Jasmin", "Cèdre", "Patchouli", "Santal"],
    personality: ["musical", "blanc", "harmonieux", "pur"],
    mood: ["harmonieux", "pur", "musical"]
  },
  {
    id: 54,
    name: "BELLE BÊTE",
    category: "Sauvage",
    description: "La belle et la bête réunies dans cette composition sauvage aux contrastes saisissants.",
    notes: ["Lait", "Ambrette", "Framboise", "Oud"],
    personality: ["sauvage", "contrasté", "beau", "bestial"],
    mood: ["sauvage", "contrasté", "intense"]
  },
  {
    id: 55,
    name: "OUD NOIR",
    category: "Oud",
    description: "L'oud noir dans sa plus sombre expression, mystérieux et profondément envoûtant.",
    notes: ["Mandarine", "Framboise", "Rose", "Caramel", "Vanille"],
    personality: ["noir", "mystérieux", "sombre", "envoûtant"],
    mood: ["mystérieux", "sombre", "profond"]
  },
  {
    id: 56,
    name: "PARIS",
    category: "Parisien",
    description: "L'âme de Paris capturée dans cette composition élégante aux accents de rose et jasmin.",
    notes: ["Rose", "Jasmin", "Musc"],
    personality: ["parisien", "élégant", "sophistiqué", "urbain"],
    mood: ["sophistiqué", "urbain", "élégant"]
  },
  {
    id: 57,
    name: "THE POWDER",
    category: "Poudré",
    description: "La poudre ultime dans cette composition veloutée comme de la soie précieuse.",
    notes: ["Coconut", "Vanille", "Musc Blanc", "Noix de Coco"],
    personality: ["poudré", "velouté", "précieux", "soyeux"],
    mood: ["doux", "velouté", "précieux"]
  },
  {
    id: 58,
    name: "DAOUI",
    category: "Oriental",
    description: "L'héritage oriental dans cette composition aux senteurs de cardamome et safran.",
    notes: ["Fleur de la passion", "Cardamome", "Safran", "Cèdre", "Gingembre", "Mandarine", "Patchouli"],
    personality: ["oriental", "héritage", "épicé", "traditionnel"],
    mood: ["traditionnel", "épicé", "mystérieux"]
  },
  {
    id: 59,
    name: "PARIS LA NUIT",
    category: "Nocturne",
    description: "Paris by night dans cette évocation nocturne de la ville lumière aux mille parfums.",
    notes: ["Cerise", "Rose", "Oud", "Cuir"],
    personality: ["nocturne", "parisien", "urbain", "lumineux"],
    mood: ["nocturne", "urbain", "mystérieux"]
  },
  {
    id: 60,
    name: "OUD CHERRY",
    category: "Oud",
    description: "L'union parfaite entre la cerise juteuse et l'oud précieux dans une harmonie fruitée orientale.",
    notes: ["Cerise", "Rose", "Oud", "Cuir"],
    personality: ["fruité", "oriental", "précieux", "juteux"],
    mood: ["fruité", "mystérieux", "précieux"]
  },
  {
    id: 61,
    name: "GIRL OR BOY",
    category: "Unisexe",
    description: "Au-delà des genres dans cette composition unisexe aux notes d'osmanthus et cuir.",
    notes: ["Osmanthus", "Cuir"],
    personality: ["unisexe", "libre", "moderne", "sans-genre"],
    mood: ["libre", "moderne", "unisexe"]
  }
];

// Questions du quiz (restent identiques)
export const quizQuestions = [
  {
    id: 1,
    question: "Si votre humeur avait une couleur aujourd'hui, laquelle serait-ce ?",
    type: "color",
    options: [
      { value: "golden", label: "Ambre Doré", personality: ["chaleureux", "confiant"], mood: ["énergique", "optimiste"] },
      { value: "deep-purple", label: "Pourpre Profond", personality: ["mystérieux", "sophistiqué"], mood: ["mystérieux", "passionné"] },
      { value: "soft-pink", label: "Rose Tendre", personality: ["doux", "romantique"], mood: ["romantique", "paisible"] },
      { value: "forest-green", label: "Vert Forêt", personality: ["enraciné", "naturel"], mood: ["paisible", "aventurier"] },
      { value: "midnight-blue", label: "Bleu Minuit", personality: ["rêveur", "éthéré"], mood: ["rêveur", "mystérieux"] }
    ]
  },
  {
    id: 2,
    question: "Choisissez un lieu pour votre évasion parfaite :",
    type: "setting",
    options: [
      { value: "jazz-bar", label: "Un bar de jazz enfumé", personality: ["sophistiqué", "audacieux"], mood: ["mystérieux", "confiant"] },
      { value: "rose-garden", label: "Un jardin de roses à l'aube", personality: ["romantique", "doux"], mood: ["paisible", "romantique"] },
      { value: "spice-market", label: "Un marché d'épices marocain", personality: ["aventurier", "exotique"], mood: ["aventurier", "énergique"] },
      { value: "library", label: "Une bibliothèque ancestrale", personality: ["intellectuel", "raffiné"], mood: ["concentré", "paisible"] },
      { value: "beach", label: "Une plage secrète", personality: ["libre", "naturel"], mood: ["paisible", "optimiste"] }
    ]
  },
  {
    id: 3,
    question: "Quelle texture vous ressemble le plus ?",
    type: "texture",
    options: [
      { value: "velvet", label: "Velours", personality: ["luxueux", "sensuel"], mood: ["romantique", "confiant"] },
      { value: "leather", label: "Cuir", personality: ["fort", "audacieux"], mood: ["confiant", "puissant"] },
      { value: "silk", label: "Soie", personality: ["élégant", "gracieux"], mood: ["paisible", "raffiné"] },
      { value: "wood", label: "Bois", personality: ["enraciné", "naturel"], mood: ["paisible", "concentré"] },
      { value: "cashmere", label: "Cachemire", personality: ["chaleureux", "doux"], mood: ["confortable", "romantique"] }
    ]
  },
  {
    id: 4,
    question: "Quel moment de la journée parle à votre âme ?",
    type: "time",
    options: [
      { value: "dawn", label: "L'aube - Premières lueurs", personality: ["frais", "optimiste"], mood: ["énergique", "paisible"] },
      { value: "golden-hour", label: "Heure dorée - Coucher de soleil", personality: ["chaleureux", "romantique"], mood: ["romantique", "optimiste"] },
      { value: "midnight", label: "Minuit - Nuit profonde", personality: ["mystérieux", "intense"], mood: ["mystérieux", "passionné"] },
      { value: "afternoon", label: "Après-midi - Soleil brillant", personality: ["énergique", "confiant"], mood: ["énergique", "confiant"] },
      { value: "twilight", label: "Crépuscule - Douceur violette", personality: ["rêveur", "sophistiqué"], mood: ["rêveur", "mystérieux"] }
    ]
  },
  {
    id: 5,
    question: "Si vous étiez une saison, laquelle seriez-vous ?",
    type: "season",
    options: [
      { value: "spring", label: "Printemps - Floraisons fraîches", personality: ["frais", "optimiste"], mood: ["joyeux", "énergique"] },
      { value: "summer", label: "Été - Chaleur dorée", personality: ["chaleureux", "confiant"], mood: ["énergique", "confiant"] },
      { value: "autumn", label: "Automne - Élégance riche", personality: ["sophistiqué", "chaleureux"], mood: ["nostalgique", "confortable"] },
      { value: "winter", label: "Hiver - Mystère cristallin", personality: ["mystérieux", "raffiné"], mood: ["paisible", "mystérieux"] }
    ]
  },
  {
    id: 6,
    question: "Quel type de musique émeut votre esprit ?",
    type: "music",
    options: [
      { value: "classical", label: "Symphonie classique", personality: ["raffiné", "sophistiqué"], mood: ["paisible", "concentré"] },
      { value: "jazz", label: "Jazz enfumé", personality: ["sophistiqué", "mystérieux"], mood: ["mystérieux", "confiant"] },
      { value: "acoustic", label: "Folk acoustique", personality: ["naturel", "doux"], mood: ["paisible", "nostalgique"] },
      { value: "electronic", label: "Électronique ambient", personality: ["moderne", "rêveur"], mood: ["rêveur", "énergique"] },
      { value: "world", label: "Musique du monde", personality: ["exotique", "aventurier"], mood: ["aventurier", "mystérieux"] }
    ]
  },
  {
    id: 7,
    question: "Votre soirée idéale serait :",
    type: "evening",
    options: [
      { value: "candlelit-dinner", label: "Dîner aux chandelles en tête-à-tête", personality: ["romantique", "intime"], mood: ["romantique", "paisible"] },
      { value: "art-gallery", label: "Explorer une galerie d'art", personality: ["intellectuel", "sophistiqué"], mood: ["concentré", "inspiré"] },
      { value: "stargazing", label: "Contempler les étoiles dans la nature", personality: ["rêveur", "naturel"], mood: ["paisible", "mystérieux"] },
      { value: "live-music", label: "Concert de musique live", personality: ["énergique", "social"], mood: ["énergique", "confiant"] },
      { value: "cozy-reading", label: "Lecture dans un coin douillet", personality: ["doux", "intellectuel"], mood: ["confortable", "paisible"] }
    ]
  }
];

export const calculatePerfumeMatch = (answers) => {
  const personalityScores = {};
  const moodScores = {};
  
  // Calculer les scores de personnalité et d'humeur basés sur les réponses
  answers.forEach(answer => {
    const question = quizQuestions.find(q => q.id === answer.questionId);
    const selectedOption = question.options.find(opt => opt.value === answer.value);
    
    selectedOption.personality.forEach(trait => {
      personalityScores[trait] = (personalityScores[trait] || 0) + 1;
    });
    
    selectedOption.mood.forEach(moodTrait => {
      moodScores[moodTrait] = (moodScores[moodTrait] || 0) + 1;
    });
  });
  
  // Évaluer chaque parfum basé sur les correspondances de personnalité et d'humeur
  const scoredPerfumes = perfumes.map(perfume => {
    let score = 0;
    
    perfume.personality.forEach(trait => {
      score += personalityScores[trait] || 0;
    });
    
    perfume.mood.forEach(moodTrait => {
      score += moodScores[moodTrait] || 0;
    });
    
    return { ...perfume, score };
  });
  
  // Trier par score et retourner les 3 meilleurs
  return scoredPerfumes
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};