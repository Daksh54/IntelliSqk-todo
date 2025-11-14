import os
from fastapi import FastAPI
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

# Validate API key
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY is missing in .env")

client = Groq(api_key=api_key)
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # or put your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request models
class SuggestRequest(BaseModel):
    text: str

class CategorizeRequest(BaseModel):
    todo: str

@app.post("/ai/suggest")
def suggest_task(req: SuggestRequest):
    prompt = (
        "Convert the following message into a clean todo title. "
        "Only return the todo text. No explanation.\n\n"
        f"Message: \"{req.text}\""
    )

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    result = response.choices[0].message.content.strip()
    return {"suggested": result}

@app.post("/ai/categorize")
def categorize_task(req: CategorizeRequest):
    prompt = (
        "Categorize this todo into one of: "
        "Work, Personal, Health, Finance, Errands, Urgent.\n\n"
        f"Todo: \"{req.todo}\"\n\n"
        "Return JSON in this exact format:\n"
        '{"category": "<category>", "priority": "<High|Medium|Low>"}'
    )

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    result = response.choices[0].message.content.strip()
    return {"analysis": result}
