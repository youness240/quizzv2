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

# Fonction d'analyse logique du quiz (sans IA)
def analyze_quiz_logic(answers):
    """Analyse les réponses du quiz et génère un profil olfactif basé sur la logique"""
    
    # Compteurs pour les différents traits
    personality_scores = {}
    mood_scores = {}
    category_preferences = {}
    
    # Questions et leurs options avec leurs associations
    quiz_mapping = {
        "1": {  # Moment de la journée
            "dawn": {"personality": ["frais", "optimiste", "énergique"], "families": ["frais"], "intensity": "leger"},
            "morning": {"personality": ["énergique", "confiant", "moderne"], "families": ["frais", "agrumes"], "intensity": "modere"},
            "afternoon": {"personality": ["chaleureux", "lumineux", "joyeux"], "families": ["floral", "fruité"], "intensity": "modere"},
            "evening": {"personality": ["sophistiqué", "mystérieux", "élégant"], "families": ["oriental", "boisé"], "intensity": "intense"},
            "night": {"personality": ["mystique", "sensuel", "profond"], "families": ["oriental", "amber"], "intensity": "intense"}
        },
        "2": {  # Saveur
            "sweet": {"personality": ["gourmand", "doux", "réconfortant"], "families": ["gourmand"], "sillage": "intime"},
            "spicy": {"personality": ["épicé", "audacieux", "chaleureux"], "families": ["épicé", "oriental"], "sillage": "puissant"},
            "fresh": {"personality": ["frais", "énergique", "moderne"], "families": ["frais", "aquatique"], "sillage": "modere"},
            "floral": {"personality": ["floral", "romantique", "délicat"], "families": ["floral"], "sillage": "modere"},
            "woody": {"personality": ["boisé", "sophistiqué", "ancré"], "families": ["boisé"], "sillage": "puissant"}
        },
        "3": {  # Destination
            "tropical": {"personality": ["tropical", "libre", "exotique"], "families": ["aquatique", "frais"]},
            "oriental": {"personality": ["oriental", "mystique", "luxueux"], "families": ["oriental", "épicé"]},
            "parisian": {"personality": ["parisien", "romantique", "élégant"], "families": ["floral", "chypre"]},
            "nature": {"personality": ["naturel", "paisible", "boisé"], "families": ["boisé", "fougère"]},
            "modern": {"personality": ["moderne", "énergique", "urbain"], "families": ["frais", "musk"]}
        },
        "4": {  # Musique
            "classical": {"personality": ["raffiné", "sophistiqué", "élégant"], "families": ["floral", "chypre"]},
            "jazz": {"personality": ["sophistiqué", "mystérieux", "sensuel"], "families": ["oriental", "amber"]},
            "pop": {"personality": ["joyeux", "moderne", "énergique"], "families": ["frais", "fruité"]},
            "world": {"personality": ["exotique", "aventurier", "oriental"], "families": ["oriental", "épicé"]},
            "electronic": {"personality": ["moderne", "mystique", "audacieux"], "families": ["musk", "aquatique"]}
        },
        "5": {  # Texture
            "velvet": {"personality": ["luxueux", "sensuel", "doux"], "families": ["oriental", "gourmand"]},
            "silk": {"personality": ["élégant", "sophistiqué", "précieux"], "families": ["floral", "musk"]},
            "cashmere": {"personality": ["doux", "réconfortant", "chaleureux"], "families": ["gourmand", "boisé"]},
            "leather": {"personality": ["audacieux", "fort", "mystérieux"], "families": ["boisé", "chypre"]},
            "cotton": {"personality": ["naturel", "simple", "frais"], "families": ["frais", "fougère"]}
        },
        "6": {  # Parfum gourmand
            "vanilla": {"personality": ["gourmand", "doux", "réconfortant"], "families": ["gourmand"]},
            "chocolate": {"personality": ["gourmand", "mystérieux", "sensuel"], "families": ["gourmand", "oriental"]},
            "caramel": {"personality": ["gourmand", "chaleureux", "séduisant"], "families": ["gourmand"]},
            "coffee": {"personality": ["énergique", "moderne", "audacieux"], "families": ["boisé", "épicé"]},
            "honey": {"personality": ["gourmand", "naturel", "chaleureux"], "families": ["gourmand", "floral"]}
        },
        "7": {  # Ambiance
            "romantic": {"personality": ["romantique", "sensuel", "élégant"], "families": ["floral", "oriental"]},
            "adventurous": {"personality": ["aventurier", "libre", "audacieux"], "families": ["frais", "aquatique"]},
            "sophisticated": {"personality": ["sophistiqué", "raffiné", "élégant"], "families": ["chypre", "boisé"]},
            "peaceful": {"personality": ["paisible", "naturel", "harmonieux"], "families": ["fougère", "boisé"]},
            "energetic": {"personality": ["énergique", "joyeux", "social"], "families": ["frais", "agrumes"]}
        },
        "8": {  # Élément naturel
            "fire": {"personality": ["passionné", "énergique", "audacieux"], "families": ["épicé", "oriental"]},
            "water": {"personality": ["fluide", "paisible", "mystérieux"], "families": ["aquatique", "frais"]},
            "earth": {"personality": ["authentique", "stable", "naturel"], "families": ["boisé", "fougère"]},
            "air": {"personality": ["libre", "léger", "frais"], "families": ["frais", "musk"]},
            "wood": {"personality": ["sage", "profond", "boisé"], "families": ["boisé", "chypre"]}
        }
    }
    
    # Analyser chaque réponse
    family_counts = {}
    intensities = []
    sillages = []
    
    for answer in answers:
        question_id = str(answer.questionId)
        value = answer.value
        
        if question_id in quiz_mapping and value in quiz_mapping[question_id]:
            mapping = quiz_mapping[question_id][value]
            
            # Compter les traits de personnalité
            for trait in mapping.get("personality", []):
                personality_scores[trait] = personality_scores.get(trait, 0) + 1
            
            # Compter les familles olfactives
            for family in mapping.get("families", []):
                family_counts[family] = family_counts.get(family, 0) + 1
            
            # Collecter intensité et sillage
            if "intensity" in mapping:
                intensities.append(mapping["intensity"])
            if "sillage" in mapping:
                sillages.append(mapping["sillage"])
    
    # Déterminer les familles olfactives principales (top 3)
    top_families = sorted(family_counts.items(), key=lambda x: x[1], reverse=True)[:3]
    olfactory_families = [family for family, count in top_families] if top_families else ["floral", "frais"]
    
    # Déterminer l'intensité (majorité)
    intensity = max(set(intensities), key=intensities.count) if intensities else "modere"
    
    # Déterminer le sillage (majorité)
    sillage = max(set(sillages), key=sillages.count) if sillages else "modere"
    
    # Traits de personnalité (top 3)
    top_personality = sorted(personality_scores.items(), key=lambda x: x[1], reverse=True)[:3]
    personality_traits = [trait for trait, count in top_personality] if top_personality else ["sophistiqué", "moderne"]
    
    # Ton émotionnel basé sur les réponses dominantes
    emotional_mapping = {
        "énergique": ["dynamique", "vivant"],
        "sophistiqué": ["raffiné", "élégant"],
        "mystérieux": ["envoûtant", "intriguant"],
        "romantique": ["tendre", "passionné"],
        "naturel": ["authentique", "paisible"],
        "audacieux": ["confiant", "moderne"]
    }
    
    emotional_tone = []
    for trait in personality_traits:
        if trait in emotional_mapping:
            emotional_tone.extend(emotional_mapping[trait])
    
    # Limiter à 3 tons émotionnels uniques
    emotional_tone = list(set(emotional_tone))[:3]
    if not emotional_tone:
        emotional_tone = ["harmonieux", "équilibré", "authentique"]
    
    # Créer un portrait personnalisé basé sur les traits dominants
    portrait_templates = {
        ("sophistiqué", "élégant"): "Votre essence révèle une personnalité raffinée qui apprécie l'art de vivre et les compositions d'exception.",
        ("énergique", "moderne"): "Votre personnalité dynamique s'exprime à travers des fragrances vivantes qui reflètent votre énergie créative.",
        ("mystérieux", "sensuel"): "Votre nature profonde et magnétique trouve son expression dans des parfums envoûtants aux facettes complexes.",
        ("romantique", "floral"): "Votre âme romantique vibre au rythme des compositions florales qui célèbrent la beauté et la tendresse.",
        ("audacieux", "libre"): "Votre esprit libre et aventurier se révèle dans des fragrances audacieuses qui défient les conventions.",
        ("naturel", "paisible"): "Votre connexion profonde avec la nature transparaît dans votre attirance pour les compositions authentiques et apaisantes."
    }
    
    # Trouver le template le plus adapté
    portrait_text = "Votre profil olfactif unique révèle une personnalité complexe et raffinée, en harmonie avec des fragrances d'exception."
    for traits, template in portrait_templates.items():
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
