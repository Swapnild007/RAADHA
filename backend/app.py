from __future__ import annotations

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .engine import RADHAEngine

app = FastAPI(title="RADHA Intelligence Gateway", version="0.1.0")

origins = [x.strip() for x in os.getenv("RADHA_ALLOWED_ORIGINS", "*").split(",") if x.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

engine = RADHAEngine()

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=12000)
    context: dict = Field(default_factory=dict)

@app.get("/api/health")
def health():
    return {"ok": True, "service": "radha-intelligence", "gateway_configured": engine.configured}

@app.get("/api/capabilities")
def capabilities():
    return {
        "ok": True,
        "capabilities": ["reason", "research", "create", "analyze", "build", "act"],
        "internal_registry": "enabled",
    }

@app.post("/api/chat")
def chat(request: ChatRequest):
    return engine.run(request.message, request.context)
