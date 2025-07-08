from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from emergentintegrations.llm.chat import LlmChat, UserMessage

# Configure logging first
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Fragrance Models
class PerfumeInput(BaseModel):
    perfume_name: str

class PerfumeAnalysisRequest(BaseModel):
    perfumes: List[str]

class OlfactoryProfile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_session: str
    profile_type: str  # "quiz" or "perfume_input"
    olfactory_families: List[str]
    intensity: str  # "leger", "modere", "intense"
    sillage: str  # "intime", "modere", "puissant"  
    emotional_tone: List[str]
    personality_traits: List[str]
    portrait_text: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class QuizAnswer(BaseModel):
    questionId: str
    value: str

class QuizRequest(BaseModel):
    answers: List[QuizAnswer]

# Fonction d'analyse logique du quiz (sans IA) - VERSION AMÉLIORÉE
def analyze_quiz_logic(answers):
    """Analyse les réponses du quiz et génère un profil olfactif basé sur la logique AMÉLIORÉE"""
    
    # Compteurs pour les différents traits
    personality_scores = {}
    mood_scores = {}
    category_preferences = {}
    
    # Variables pour l'intensité et le sillage
    intensity_votes = []
    sillage_votes = []
    social_impact_preference = "balanced"
    
    # Questions et leurs options avec leurs associations - ENRICHIES
    quiz_mapping = {
        "1": {  # Moment de la journée
            "dawn": {"personality": ["frais", "optimiste", "énergique"], "families": ["frais", "agrumes"], "intensity": "leger", "sillage": "intime"},
            "morning": {"personality": ["énergique", "confiant", "moderne"], "families": ["frais", "agrumes"], "intensity": "modere", "sillage": "modere"},
            "afternoon": {"personality": ["chaleureux", "lumineux", "joyeux"], "families": ["floral", "fruité"], "intensity": "modere", "sillage": "modere"},
            "evening": {"personality": ["sophistiqué", "mystérieux", "élégant"], "families": ["oriental", "boisé"], "intensity": "intense", "sillage": "puissant"},
            "night": {"personality": ["mystique", "sensuel", "profond"], "families": ["oriental", "amber"], "intensity": "intense", "sillage": "puissant"}
        },
        "2": {  # Saveur
            "sweet": {"personality": ["gourmand", "doux", "réconfortant"], "families": ["gourmand"], "sillage": "intime", "intensity": "modere"},
            "spicy": {"personality": ["épicé", "audacieux", "chaleureux"], "families": ["épicé", "oriental"], "sillage": "puissant", "intensity": "intense"},
            "fresh": {"personality": ["frais", "énergique", "moderne"], "families": ["frais", "aquatique"], "sillage": "modere", "intensity": "leger"},
            "floral": {"personality": ["floral", "romantique", "délicat"], "families": ["floral"], "sillage": "modere", "intensity": "modere"},
            "woody": {"personality": ["boisé", "sophistiqué", "ancré"], "families": ["boisé"], "sillage": "puissant", "intensity": "intense"}
        },
        "3": {  # Destination
            "tropical": {"personality": ["tropical", "libre", "exotique"], "families": ["aquatique", "frais"], "intensity": "modere"},
            "oriental": {"personality": ["oriental", "mystique", "luxueux"], "families": ["oriental", "épicé"], "intensity": "intense"},
            "parisian": {"personality": ["parisien", "romantique", "élégant"], "families": ["floral", "chypre"], "intensity": "modere"},
            "nature": {"personality": ["naturel", "paisible", "boisé"], "families": ["boisé", "fougère"], "intensity": "modere"},
            "modern": {"personality": ["moderne", "énergique", "urbain"], "families": ["frais", "musk"], "intensity": "leger"}
        },
        "4": {  # Musique
            "classical": {"personality": ["raffiné", "sophistiqué", "élégant"], "families": ["floral", "chypre"], "intensity": "modere"},
            "jazz": {"personality": ["sophistiqué", "mystérieux", "sensuel"], "families": ["oriental", "amber"], "intensity": "intense"},
            "pop": {"personality": ["joyeux", "moderne", "énergique"], "families": ["frais", "fruité"], "intensity": "leger"},
            "world": {"personality": ["exotique", "aventurier", "oriental"], "families": ["oriental", "épicé"], "intensity": "intense"},
            "electronic": {"personality": ["moderne", "mystique", "audacieux"], "families": ["musk", "aquatique"], "intensity": "modere"}
        },
        "5": {  # Texture
            "velvet": {"personality": ["luxueux", "sensuel", "doux"], "families": ["oriental", "gourmand"], "intensity": "intense"},
            "silk": {"personality": ["élégant", "sophistiqué", "précieux"], "families": ["floral", "musk"], "intensity": "modere"},
            "cashmere": {"personality": ["doux", "réconfortant", "chaleureux"], "families": ["gourmand", "boisé"], "intensity": "modere"},
            "leather": {"personality": ["audacieux", "fort", "mystérieux"], "families": ["boisé", "chypre"], "intensity": "intense"},
            "cotton": {"personality": ["naturel", "simple", "frais"], "families": ["frais", "fougère"], "intensity": "leger"}
        },
        "6": {  # Parfum gourmand
            "vanilla": {"personality": ["gourmand", "doux", "réconfortant"], "families": ["gourmand"], "intensity": "modere"},
            "chocolate": {"personality": ["gourmand", "mystérieux", "sensuel"], "families": ["gourmand", "oriental"], "intensity": "intense"},
            "caramel": {"personality": ["gourmand", "chaleureux", "séduisant"], "families": ["gourmand"], "intensity": "modere"},
            "coffee": {"personality": ["énergique", "moderne", "audacieux"], "families": ["boisé", "épicé"], "intensity": "intense"},
            "honey": {"personality": ["gourmand", "naturel", "chaleureux"], "families": ["gourmand", "floral"], "intensity": "modere"}
        },
        "7": {  # Ambiance
            "romantic": {"personality": ["romantique", "sensuel", "élégant"], "families": ["floral", "oriental"], "intensity": "modere"},
            "adventurous": {"personality": ["aventurier", "libre", "audacieux"], "families": ["frais", "aquatique"], "intensity": "intense"},
            "sophisticated": {"personality": ["sophistiqué", "raffiné", "élégant"], "families": ["chypre", "boisé"], "intensity": "intense"},
            "peaceful": {"personality": ["paisible", "naturel", "harmonieux"], "families": ["fougère", "boisé"], "intensity": "leger"},
            "energetic": {"personality": ["énergique", "joyeux", "social"], "families": ["frais", "agrumes"], "intensity": "modere"}
        },
        "8": {  # Élément naturel
            "fire": {"personality": ["passionné", "énergique", "audacieux"], "families": ["épicé", "oriental"], "intensity": "intense"},
            "water": {"personality": ["fluide", "paisible", "mystérieux"], "families": ["aquatique", "frais"], "intensity": "leger"},
            "earth": {"personality": ["authentique", "stable", "naturel"], "families": ["boisé", "fougère"], "intensity": "modere"},
            "air": {"personality": ["libre", "léger", "frais"], "families": ["frais", "musk"], "intensity": "leger"},
            "wood": {"personality": ["sage", "profond", "boisé"], "families": ["boisé", "chypre"], "intensity": "intense"}
        },
        "9": {  # Perception sociale - NOUVELLE QUESTION
            "discreet_elegant": {"personality": ["discret", "élégant", "raffiné"], "families": ["musk", "floral"], "intensity": "leger", "sillage": "intime", "social_impact": "subtle"},
            "subtle_memorable": {"personality": ["subtil", "mémorable", "mystérieux"], "families": ["chypre", "oriental"], "intensity": "modere", "sillage": "modere", "social_impact": "memorable"},
            "confident_noticeable": {"personality": ["confiant", "audacieux", "charismatique"], "families": ["oriental", "boisé"], "intensity": "intense", "sillage": "puissant", "social_impact": "confident"},
            "magnetic_captivating": {"personality": ["magnétique", "captivant", "séduisant"], "families": ["oriental", "gourmand"], "intensity": "intense", "sillage": "puissant", "social_impact": "captivating"},
            "adaptable_versatile": {"personality": ["adaptable", "versatile", "intelligent"], "families": ["frais", "musk"], "intensity": "modere", "sillage": "modere", "social_impact": "balanced"}
        },
        "10": {  # Présence dans une pièce - NOUVELLE QUESTION
            "invisible_refined": {"personality": ["raffiné", "mystérieux", "sophistiqué"], "families": ["musk", "chypre"], "intensity": "leger", "sillage": "intime", "social_impact": "subtle"},
            "approachable_warm": {"personality": ["chaleureux", "accessible", "bienveillant"], "families": ["gourmand", "floral"], "intensity": "modere", "sillage": "modere", "social_impact": "welcoming"},
            "intriguing_mysterious": {"personality": ["mystérieux", "intriguant", "fascinant"], "families": ["oriental", "amber"], "intensity": "intense", "sillage": "modere", "social_impact": "mysterious"},
            "commanding_impressive": {"personality": ["imposant", "puissant", "leader"], "families": ["boisé", "épicé"], "intensity": "intense", "sillage": "puissant", "social_impact": "dominant"},
            "effortless_natural": {"personality": ["naturel", "authentique", "sincère"], "families": ["fougère", "frais"], "intensity": "modere", "sillage": "modere", "social_impact": "authentic"}
        }
    }
    
    # Analyser chaque réponse avec pondération améliorée
    family_counts = {}
    
    for answer in answers:
        question_id = str(answer.questionId)
        value = answer.value
        
        if question_id in quiz_mapping and value in quiz_mapping[question_id]:
            mapping = quiz_mapping[question_id][value]
            
            # Pondération spéciale pour les questions sociales (9 et 10)
            social_weight = 2.0 if question_id in ["9", "10"] else 1.0
            taste_weight = 1.5 if question_id in ["2", "6"] else 1.0
            
            # Compter les traits de personnalité avec pondération
            for trait in mapping.get("personality", []):
                weight = social_weight * taste_weight
                personality_scores[trait] = personality_scores.get(trait, 0) + weight
            
            # Compter les familles olfactives avec pondération
            for family in mapping.get("families", []):
                weight = social_weight * taste_weight
                family_counts[family] = family_counts.get(family, 0) + weight
            
            # Collecter intensité et sillage avec pondération sociale
            if "intensity" in mapping:
                weight = 2 if question_id in ["9", "10"] else 1
                intensity_votes.extend([mapping["intensity"]] * weight)
            if "sillage" in mapping:
                weight = 2 if question_id in ["9", "10"] else 1
                sillage_votes.extend([mapping["sillage"]] * weight)
            
            # Capture de l'impact social
            if "social_impact" in mapping:
                social_impact_preference = mapping["social_impact"]
    
    # Déterminer les familles olfactives principales (top 3-4)
    top_families = sorted(family_counts.items(), key=lambda x: x[1], reverse=True)[:4]
    olfactory_families = [family for family, count in top_families] if top_families else ["floral", "frais"]
    
    # Déterminer l'intensité (majorité pondérée)
    intensity = max(set(intensity_votes), key=intensity_votes.count) if intensity_votes else "modere"
    
    # Déterminer le sillage (majorité pondérée)
    sillage = max(set(sillage_votes), key=sillage_votes.count) if sillage_votes else "modere"
    
    # Traits de personnalité (top 4 pour plus de richesse)
    top_personality = sorted(personality_scores.items(), key=lambda x: x[1], reverse=True)[:4]
    personality_traits = [trait for trait, count in top_personality] if top_personality else ["sophistiqué", "moderne"]
    
    # Ton émotionnel basé sur les réponses dominantes - ENRICHI
    emotional_mapping = {
        "énergique": ["dynamique", "vivant", "pétillant"],
        "sophistiqué": ["raffiné", "élégant", "cultivé"],
        "mystérieux": ["envoûtant", "intriguant", "fascinant"],
        "romantique": ["tendre", "passionné", "charmant"],
        "naturel": ["authentique", "paisible", "harmonieux"],
        "audacieux": ["confiant", "moderne", "charismatique"],
        "discret": ["subtil", "raffiné", "distingué"],
        "chaleureux": ["réconfortant", "bienveillant", "accueillant"],
        "élégant": ["sophistiqué", "gracieux", "distingué"],
        "confiant": ["assuré", "charismatique", "séduisant"],
        "captivant": ["magnétique", "séduisant", "fascinant"],
        "imposant": ["puissant", "impressionnant", "dominant"],
        "raffiné": ["distingué", "précieux", "sublime"]
    }
    
    emotional_tone = []
    for trait in personality_traits:
        if trait in emotional_mapping:
            emotional_tone.extend(emotional_mapping[trait][:2])  # Max 2 par trait
    
    # Limiter à 3-4 tons émotionnels uniques
    emotional_tone = list(set(emotional_tone))[:4]
    if not emotional_tone:
        emotional_tone = ["harmonieux", "équilibré", "authentique"]
    
    # Créer un portrait personnalisé basé sur les traits dominants et l'impact social
    social_portraits = {
        "subtle": "Votre essence révèle une élégance discrète qui charme par sa sophistication naturelle. Vous privilégiez la finesse à l'ostentation.",
        "memorable": "Votre personnalité laisse une empreinte durable, subtile mais inoubliable. Vous maîtrisez l'art de la présence mémorable.",
        "confident": "Votre aura rayonne d'une confiance naturelle qui inspire et attire. Vous assumez votre présence avec assurance.",
        "captivating": "Votre magnétisme naturel exerce une fascination authentique sur votre entourage. Vous êtes irrésistiblement attirant.",
        "welcoming": "Votre chaleur humaine crée une atmosphère accueillante et réconfortante. Vous êtes un havre de paix pour les autres.",
        "mysterious": "Votre mystère intrigue et fascine, créant une aura d'élégance énigmatique qui captive l'attention.",
        "dominant": "Votre présence commande naturellement le respect et l'admiration. Vous êtes un leader né avec une aura imposante.",
        "authentic": "Votre authenticité transparaît dans chaque geste, créant une connexion sincère et profonde avec votre entourage.",
        "balanced": "Votre équilibre parfait entre subtilité et présence révèle une personnalité harmonieuse et adaptable."
    }
    
    # Portraits combinés pour plus de richesse
    combined_portraits = {
        ("sophistiqué", "élégant"): "Votre raffinement naturel s'exprime à travers une élégance intemporelle qui transcende les modes et les époques.",
        ("mystérieux", "captivant"): "Votre aura mystérieuse exerce une fascination profonde, mêlant intrigue et magnétisme dans une harmonie parfaite.",
        ("confiant", "charismatique"): "Votre charisme naturel rayonne d'une confiance authentique qui inspire et attire naturellement les autres.",
        ("discret", "raffiné"): "Votre distinction se révèle dans la subtilité de votre présence, alliant discrétion et raffinement suprême.",
        ("chaleureux", "bienveillant"): "Votre générosité d'âme crée une atmosphère chaleureuse et accueillante qui réconforte et rassure.",
        ("audacieux", "moderne"): "Votre esprit avant-gardiste s'exprime par une audace assumée qui bouscule les conventions avec élégance.",
        ("naturel", "authentique"): "Votre sincérité transparaît dans chaque interaction, créant des liens profonds et authentiques avec votre entourage."
    }
    
    # Choisir le portrait le plus adapté
    portrait_text = social_portraits.get(social_impact_preference, "Votre profil olfactif révèle une personnalité complexe et raffinée.")
    
    # Enrichir avec un portrait combiné si possible
    for traits, template in combined_portraits.items():
        if any(trait in personality_traits for trait in traits):
            portrait_text = template
            break
    
    return {
        "olfactory_families": olfactory_families,
        "intensity": intensity,
        "sillage": sillage,
        "emotional_tone": emotional_tone,
        "personality_traits": personality_traits,
        "portrait_text": portrait_text
    }

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Fragrance AI Endpoints
@api_router.post("/analyze-perfumes", response_model=OlfactoryProfile)
async def analyze_perfumes(request: PerfumeAnalysisRequest):
    """Analyse des parfums saisis par l'utilisateur avec IA"""
    try:
        # Créer une session de chat avec OpenAI
        session_id = str(uuid.uuid4())
        chat = LlmChat(
            api_key=os.environ.get('OPENAI_API_KEY'),
            session_id=session_id,
            system_message="""Tu es un expert parfumeur français spécialisé dans l'analyse olfactive. 
            Tu dois analyser des parfums mentionnés par l'utilisateur et créer un profil olfactif personnalisé.
            
            Réponds UNIQUEMENT en format JSON avec cette structure exacte :
            {
                "olfactory_families": ["famille1", "famille2", "famille3"],
                "intensity": "leger/modere/intense",
                "sillage": "intime/modere/puissant",
                "emotional_tone": ["ton1", "ton2", "ton3"],
                "personality_traits": ["trait1", "trait2", "trait3"],
                "portrait_text": "Description poétique du profil olfactif en 2-3 phrases élégantes"
            }
            
            Familles olfactives possibles : floral, boisé, oriental, frais, gourmand, musk, épicé, amber, aquatique, chypre, fougère
            Intensité : leger, modere, intense
            Sillage : intime, modere, puissant
            """
        ).with_model("openai", "gpt-4o")
        
        # Préparer le message pour l'IA
        perfume_list = ", ".join(request.perfumes)
        user_message = UserMessage(
            text=f"Analyse ces parfums et crée un profil olfactif personnalisé : {perfume_list}"
        )
        
        # Envoyer la requête à l'IA
        response = await chat.send_message(user_message)
        
        # Parser la réponse JSON
        import json
        ai_analysis = json.loads(response)
        
        # Créer le profil olfactif
        profile = OlfactoryProfile(
            user_session=session_id,
            profile_type="perfume_input",
            olfactory_families=ai_analysis["olfactory_families"],
            intensity=ai_analysis["intensity"],
            sillage=ai_analysis["sillage"],
            emotional_tone=ai_analysis["emotional_tone"],
            personality_traits=ai_analysis["personality_traits"],
            portrait_text=ai_analysis["portrait_text"]
        )
        
        # Sauvegarder dans la base de données
        await db.olfactory_profiles.insert_one(profile.dict())
        
        return profile
        
    except Exception as e:
        logger.error(f"Erreur lors de l'analyse des parfums : {str(e)}")
        # Retourner un profil par défaut en cas d'erreur
        return OlfactoryProfile(
            user_session=str(uuid.uuid4()),
            profile_type="perfume_input",
            olfactory_families=["floral", "boisé"],
            intensity="modere",
            sillage="modere",
            emotional_tone=["élégant", "raffiné"],
            personality_traits=["sophistiqué", "discret"],
            portrait_text="Votre essence révèle une personnalité raffinée qui apprécie les harmonies subtiles et les compositions équilibrées."
        )

@api_router.post("/analyze-quiz", response_model=OlfactoryProfile)
async def analyze_quiz(request: QuizRequest):
    """Analyse du quiz utilisateur SANS IA - utilise la logique de correspondance"""
    try:
        # Convertir les réponses du quiz en format approprié
        quiz_analysis = analyze_quiz_logic(request.answers)
        
        # Créer le profil olfactif basé sur l'analyse logique
        profile = OlfactoryProfile(
            user_session=str(uuid.uuid4()),
            profile_type="quiz",
            olfactory_families=quiz_analysis["olfactory_families"],
            intensity=quiz_analysis["intensity"],
            sillage=quiz_analysis["sillage"],
            emotional_tone=quiz_analysis["emotional_tone"],
            personality_traits=quiz_analysis["personality_traits"],
            portrait_text=quiz_analysis["portrait_text"]
        )
        
        # Sauvegarder dans la base de données
        await db.olfactory_profiles.insert_one(profile.dict())
        
        return profile
        
    except Exception as e:
        logger.error(f"Erreur lors de l'analyse du quiz : {str(e)}")
        # Retourner un profil par défaut en cas d'erreur
        return OlfactoryProfile(
            user_session=str(uuid.uuid4()),
            profile_type="quiz",
            olfactory_families=["floral", "frais"],
            intensity="modere",
            sillage="modere",
            emotional_tone=["dynamique", "moderne"],
            personality_traits=["créatif", "optimiste"],
            portrait_text="Votre personnalité rayonne d'une énergie positive qui se reflète dans vos préférences olfactives équilibrées."
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
