"""
FastAPI Backend for Personal Portfolio
======================================
Handles contact form submissions and can be extended
for any future API needs.

Run with:  python backend/main.py
Or:        uvicorn backend.main:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from datetime import datetime
import json
import os

app = FastAPI(
    title="Surya Pratap Portfolio API",
    description="FastAPI backend for portfolio contact form and more",
    version="1.0.0",
)

# Allow frontend dev server to talk to the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Data Models ──

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactResponse(BaseModel):
    status: str
    message: str
    timestamp: str

# ── Storage (JSON file for simplicity — swap with DB in production) ──

MESSAGES_FILE = os.path.join(os.path.dirname(__file__), "messages.json")

def load_messages():
    if os.path.exists(MESSAGES_FILE):
        with open(MESSAGES_FILE, "r") as f:
            return json.load(f)
    return []

def save_message(msg: dict):
    messages = load_messages()
    messages.append(msg)
    with open(MESSAGES_FILE, "w") as f:
        json.dump(messages, f, indent=2)

# ── Routes ──

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "Surya Pratap Portfolio API",
        "version": "1.0.0",
        "endpoints": {
            "contact": "/api/contact",
            "messages": "/api/messages",
            "health": "/api/health",
            "docs": "/docs",
        }
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "uptime": "running",
    }

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(data: ContactMessage):
    """
    Receive a contact form submission.
    Validates input via Pydantic, saves to local JSON file.
    """
    if not data.name.strip():
        raise HTTPException(status_code=400, detail="Name is required")
    if not data.email.strip():
        raise HTTPException(status_code=400, detail="Email is required")
    if not data.message.strip():
        raise HTTPException(status_code=400, detail="Message is required")

    timestamp = datetime.now().isoformat()

    msg_record = {
        "name": data.name.strip(),
        "email": data.email.strip(),
        "subject": data.subject.strip(),
        "message": data.message.strip(),
        "timestamp": timestamp,
    }

    save_message(msg_record)
    
    print(f"\n{'='*50}")
    print(f"📬 New Contact Message Received!")
    print(f"   From:    {data.name} <{data.email}>")
    print(f"   Subject: {data.subject}")
    print(f"   Message: {data.message[:100]}...")
    print(f"   Time:    {timestamp}")
    print(f"{'='*50}\n")

    return ContactResponse(
        status="success",
        message=f"Thank you, {data.name}! Your message has been received.",
        timestamp=timestamp,
    )

@app.get("/api/messages")
async def get_messages():
    """
    Retrieve all stored contact messages.
    (For admin / development use only)
    """
    messages = load_messages()
    return {
        "total": len(messages),
        "messages": messages,
    }

# ── Run ──

if __name__ == "__main__":
    import uvicorn
    print("\n🚀 Starting FastAPI backend on http://localhost:8000")
    print("📖 API docs at http://localhost:8000/docs\n")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
