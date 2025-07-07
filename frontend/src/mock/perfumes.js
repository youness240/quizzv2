export const perfumes = [
  {
    id: 1,
    name: "Tonka",
    category: "Gourmand",
    description: "Une étreinte chaleureuse de vanille et d'amande amère, comme la dernière heure dorée d'automne enveloppée dans du cachemire.",
    notes: ["Vanille", "Fève Tonka", "Amande Amère", "Santal"],
    personality: ["chaleureux", "sensuel", "cosy", "élégant"],
    mood: ["romantique", "confiant", "détendu"]
  },
  {
    id: 2,
    name: "Ce Soir",
    category: "Oriental",
    description: "Le mystère du crépuscule capturé dans un flacon - encens fumé dansant avec des pétales de rose sous un ciel de velours.",
    notes: ["Rose", "Encens", "Oud", "Ambre"],
    personality: ["mystérieux", "sophistiqué", "audacieux", "dramatique"],
    mood: ["séduisant", "puissant", "mystérieux"]
  },
  {
    id: 3,
    name: "La Nota",
    category: "Floral",
    description: "Une symphonie de fleurs blanches qui murmure les secrets des jardins méditerranéens embrassés par la rosée matinale.",
    notes: ["Jasmin", "Tubéreuse", "Thé Blanc", "Bergamote"],
    personality: ["frais", "féminin", "gracieux", "pur"],
    mood: ["joyeux", "paisible", "optimiste"]
  },
  {
    id: 4,
    name: "So Mula",
    category: "Boisé",
    description: "L'essence des forêts ancestrales et des livres reliés de cuir, où la sagesse rencontre la sophistication sauvage.",
    notes: ["Cèdre", "Vétiver", "Cuir", "Poivre Noir"],
    personality: ["fort", "intellectuel", "enraciné", "confiant"],
    mood: ["concentré", "déterminé", "aventurier"]
  },
  {
    id: 5,
    name: "Red Chroniq",
    category: "Épicé",
    description: "Le temps s'arrête dans ce mélange enivrant d'épices cramoisies et de passion chocolat noir.",
    notes: ["Cannelle", "Chocolat Noir", "Vin Rouge", "Clou de Girofle"],
    personality: ["passionné", "intense", "audacieux", "magnétique"],
    mood: ["passionné", "énergique", "confiant"]
  },
  {
    id: 6,
    name: "Mozak Latte",
    category: "Gourmand",
    description: "Les rituels matinaux transformés en poésie liquide - rêves d'espresso avec des notes de noisette et de crème.",
    notes: ["Café", "Noisette", "Crème Vanille", "Caramel"],
    personality: ["énergique", "créatif", "chaleureux", "accessible"],
    mood: ["énergique", "créatif", "confortable"]
  },
  {
    id: 7,
    name: "Oud Orange",
    category: "Oud",
    description: "Là où les traditions ancestrales du Moyen-Orient rencontrent le soleil méditerranéen en parfaite harmonie.",
    notes: ["Oud", "Fleur d'Oranger", "Safran", "Rose"],
    personality: ["exotique", "luxueux", "sophistiqué", "unique"],
    mood: ["mystérieux", "confiant", "exotique"]
  },
  {
    id: 8,
    name: "Powder",
    category: "Poudré",
    description: "Doux comme une promesse murmurée, ce nuage délicat d'iris et de musc évoque des souvenirs chéris.",
    notes: ["Iris", "Musc Blanc", "Violette", "Bois de Cachemire"],
    personality: ["doux", "élégant", "nostalgique", "raffiné"],
    mood: ["paisible", "romantique", "nostalgique"]
  },
  {
    id: 9,
    name: "So Velorum",
    category: "Floral",
    description: "Fleurs de minuit sous la lumière des étoiles - un jardin céleste où le jasmin rencontre les rayons de lune.",
    notes: ["Jasmin Nocturne", "Fleur de Lune", "Musc Argenté", "Santal"],
    personality: ["rêveur", "éthéré", "mystérieux", "féminin"],
    mood: ["rêveur", "paisible", "mystérieux"]
  },
  {
    id: 10,
    name: "Kirke",
    category: "Boisé",
    description: "Le secret de l'enchanteresse - herbes sauvages et bois fumés qui envoûtent les sens.",
    notes: ["Herbes Sauvages", "Bois Fumés", "Ambre Gris", "Feuilles Vertes"],
    personality: ["sauvage", "magnétique", "naturel", "puissant"],
    mood: ["aventurier", "mystérieux", "puissant"]
  }
];

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