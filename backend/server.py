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
    """Analyse du quiz utilisateur avec IA"""
    try:
        # Créer une session de chat avec OpenAI
        session_id = str(uuid.uuid4())
        chat = LlmChat(
            api_key=os.environ.get('OPENAI_API_KEY'),
            session_id=session_id,
            system_message="""Tu es un expert parfumeur français spécialisé dans l'analyse olfactive. 
            Tu dois analyser les réponses d'un quiz lifestyle et créer un profil olfactif personnalisé.
            
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
        answers_text = []
        for answer in request.answers:
            answers_text.append(f"Question {answer.questionId}: {answer.value}")
        
        quiz_summary = "\n".join(answers_text)
        user_message = UserMessage(
            text=f"Analyse ces réponses de quiz lifestyle et crée un profil olfactif personnalisé :\n{quiz_summary}"
        )
        
        # Envoyer la requête à l'IA
        response = await chat.send_message(user_message)
        
        # Parser la réponse JSON
        import json
        ai_analysis = json.loads(response)
        
        # Créer le profil olfactif
        profile = OlfactoryProfile(
            user_session=session_id,
            profile_type="quiz",
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

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
