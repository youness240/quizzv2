export const perfumes = [
  {
    id: 1,
    name: "Tonka",
    category: "Gourmand",
    description: "A warm embrace of vanilla and bitter almond, like the last golden hour of autumn wrapped in cashmere.",
    notes: ["Vanilla", "Tonka Bean", "Bitter Almond", "Sandalwood"],
    personality: ["warm", "sensual", "cozy", "elegant"],
    mood: ["romantic", "confident", "relaxed"]
  },
  {
    id: 2,
    name: "Ce Soir",
    category: "Oriental",
    description: "The mystery of twilight captured in a bottle - smoky incense dancing with rose petals under a velvet sky.",
    notes: ["Rose", "Incense", "Oud", "Amber"],
    personality: ["mysterious", "sophisticated", "bold", "dramatic"],
    mood: ["seductive", "powerful", "mysterious"]
  },
  {
    id: 3,
    name: "La Nota",
    category: "Floral",
    description: "A symphony of white flowers that whispers secrets of Mediterranean gardens kissed by morning dew.",
    notes: ["Jasmine", "Tuberose", "White Tea", "Bergamot"],
    personality: ["fresh", "feminine", "graceful", "pure"],
    mood: ["joyful", "peaceful", "optimistic"]
  },
  {
    id: 4,
    name: "So Mula",
    category: "Woody",
    description: "The essence of ancient forests and leather-bound books, where wisdom meets wild sophistication.",
    notes: ["Cedar", "Vetiver", "Leather", "Black Pepper"],
    personality: ["strong", "intellectual", "grounded", "confident"],
    mood: ["focused", "determined", "adventurous"]
  },
  {
    id: 5,
    name: "Red Chroniq",
    category: "Spicy",
    description: "Time stands still in this intoxicating blend of crimson spices and dark chocolate passion.",
    notes: ["Cinnamon", "Dark Chocolate", "Red Wine", "Clove"],
    personality: ["passionate", "intense", "bold", "magnetic"],
    mood: ["passionate", "energetic", "confident"]
  },
  {
    id: 6,
    name: "Mozak Latte",
    category: "Gourmand",
    description: "Morning rituals transformed into liquid poetry - espresso dreams with hints of hazelnut and cream.",
    notes: ["Coffee", "Hazelnut", "Vanilla Cream", "Caramel"],
    personality: ["energetic", "creative", "warm", "approachable"],
    mood: ["energetic", "creative", "comfortable"]
  },
  {
    id: 7,
    name: "Oud Orange",
    category: "Oud",
    description: "Where ancient Middle Eastern traditions meet Mediterranean sunshine in perfect harmony.",
    notes: ["Oud", "Orange Blossom", "Saffron", "Rose"],
    personality: ["exotic", "luxurious", "sophisticated", "unique"],
    mood: ["mysterious", "confident", "exotic"]
  },
  {
    id: 8,
    name: "Powder",
    category: "Powdery",
    description: "Soft as a whispered promise, this delicate cloud of iris and musk evokes cherished memories.",
    notes: ["Iris", "White Musk", "Violet", "Cashmere Wood"],
    personality: ["gentle", "elegant", "nostalgic", "refined"],
    mood: ["peaceful", "romantic", "nostalgic"]
  },
  {
    id: 9,
    name: "So Velorum",
    category: "Floral",
    description: "Midnight blooms under starlight - a celestial garden where jasmine meets moonbeams.",
    notes: ["Night-blooming Jasmine", "Moonflower", "Silver Musk", "Sandalwood"],
    personality: ["dreamy", "ethereal", "mysterious", "feminine"],
    mood: ["dreamy", "peaceful", "mysterious"]
  },
  {
    id: 10,
    name: "Kirke",
    category: "Woody",
    description: "The enchantress's secret - wild herbs and smoky woods that bewitch the senses.",
    notes: ["Wild Herbs", "Smoky Woods", "Ambergris", "Green Leaves"],
    personality: ["wild", "magnetic", "natural", "powerful"],
    mood: ["adventurous", "mysterious", "powerful"]
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: "If your mood had a color today, what would it be?",
    type: "color",
    options: [
      { value: "golden", label: "Golden Amber", personality: ["warm", "confident"], mood: ["energetic", "optimistic"] },
      { value: "deep-purple", label: "Deep Purple", personality: ["mysterious", "sophisticated"], mood: ["mysterious", "passionate"] },
      { value: "soft-pink", label: "Soft Rose", personality: ["gentle", "romantic"], mood: ["romantic", "peaceful"] },
      { value: "forest-green", label: "Forest Green", personality: ["grounded", "natural"], mood: ["peaceful", "adventurous"] },
      { value: "midnight-blue", label: "Midnight Blue", personality: ["dreamy", "ethereal"], mood: ["dreamy", "mysterious"] }
    ]
  },
  {
    id: 2,
    question: "Choose a setting for your perfect escape:",
    type: "setting",
    options: [
      { value: "jazz-bar", label: "A smoky jazz bar", personality: ["sophisticated", "bold"], mood: ["mysterious", "confident"] },
      { value: "rose-garden", label: "A rose garden at dawn", personality: ["romantic", "gentle"], mood: ["peaceful", "romantic"] },
      { value: "spice-market", label: "A Moroccan spice market", personality: ["adventurous", "exotic"], mood: ["adventurous", "energetic"] },
      { value: "library", label: "An ancient library", personality: ["intellectual", "refined"], mood: ["focused", "peaceful"] },
      { value: "beach", label: "A secluded beach", personality: ["free", "natural"], mood: ["peaceful", "optimistic"] }
    ]
  },
  {
    id: 3,
    question: "What texture feels the most like you?",
    type: "texture",
    options: [
      { value: "velvet", label: "Velvet", personality: ["luxurious", "sensual"], mood: ["romantic", "confident"] },
      { value: "leather", label: "Leather", personality: ["strong", "bold"], mood: ["confident", "powerful"] },
      { value: "silk", label: "Silk", personality: ["elegant", "graceful"], mood: ["peaceful", "refined"] },
      { value: "wood", label: "Wood", personality: ["grounded", "natural"], mood: ["peaceful", "focused"] },
      { value: "cashmere", label: "Cashmere", personality: ["warm", "gentle"], mood: ["comfortable", "romantic"] }
    ]
  },
  {
    id: 4,
    question: "Which time of day speaks to your soul?",
    type: "time",
    options: [
      { value: "dawn", label: "Dawn - First light", personality: ["fresh", "optimistic"], mood: ["energetic", "peaceful"] },
      { value: "golden-hour", label: "Golden Hour - Warm sunset", personality: ["warm", "romantic"], mood: ["romantic", "optimistic"] },
      { value: "midnight", label: "Midnight - Deep night", personality: ["mysterious", "intense"], mood: ["mysterious", "passionate"] },
      { value: "afternoon", label: "Afternoon - Bright sun", personality: ["energetic", "confident"], mood: ["energetic", "confident"] },
      { value: "twilight", label: "Twilight - Purple dusk", personality: ["dreamy", "sophisticated"], mood: ["dreamy", "mysterious"] }
    ]
  },
  {
    id: 5,
    question: "If you were a season, which would you be?",
    type: "season",
    options: [
      { value: "spring", label: "Spring - Fresh blooms", personality: ["fresh", "optimistic"], mood: ["joyful", "energetic"] },
      { value: "summer", label: "Summer - Golden warmth", personality: ["warm", "confident"], mood: ["energetic", "confident"] },
      { value: "autumn", label: "Autumn - Rich elegance", personality: ["sophisticated", "warm"], mood: ["nostalgic", "comfortable"] },
      { value: "winter", label: "Winter - Crisp mystery", personality: ["mysterious", "refined"], mood: ["peaceful", "mysterious"] }
    ]
  },
  {
    id: 6,
    question: "What kind of music moves your spirit?",
    type: "music",
    options: [
      { value: "classical", label: "Classical Symphony", personality: ["refined", "sophisticated"], mood: ["peaceful", "focused"] },
      { value: "jazz", label: "Smoky Jazz", personality: ["sophisticated", "mysterious"], mood: ["mysterious", "confident"] },
      { value: "acoustic", label: "Acoustic Folk", personality: ["natural", "gentle"], mood: ["peaceful", "nostalgic"] },
      { value: "electronic", label: "Ambient Electronic", personality: ["modern", "dreamy"], mood: ["dreamy", "energetic"] },
      { value: "world", label: "World Music", personality: ["exotic", "adventurous"], mood: ["adventurous", "mysterious"] }
    ]
  },
  {
    id: 7,
    question: "Your ideal evening would be:",
    type: "evening",
    options: [
      { value: "candlelit-dinner", label: "Candlelit dinner for two", personality: ["romantic", "intimate"], mood: ["romantic", "peaceful"] },
      { value: "art-gallery", label: "Exploring an art gallery", personality: ["intellectual", "sophisticated"], mood: ["focused", "inspired"] },
      { value: "stargazing", label: "Stargazing in nature", personality: ["dreamy", "natural"], mood: ["peaceful", "mysterious"] },
      { value: "live-music", label: "Live music venue", personality: ["energetic", "social"], mood: ["energetic", "confident"] },
      { value: "cozy-reading", label: "Cozy reading nook", personality: ["gentle", "intellectual"], mood: ["comfortable", "peaceful"] }
    ]
  }
];

export const calculatePerfumeMatch = (answers) => {
  const personalityScores = {};
  const moodScores = {};
  
  // Calculate personality and mood scores based on answers
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
  
  // Score each perfume based on personality and mood matches
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
  
  // Sort by score and return top 3
  return scoredPerfumes
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};