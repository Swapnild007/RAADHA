from __future__ import annotations

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .engine import RADHAEngine

app = FastAPI(title="RADHA Intelligence Gateway", version="0.2.0")

origins = [
    value.strip()
    for value in os.getenv("RADHA_ALLOWED_ORIGINS", "*").split(",")
    if value.strip()
]
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
    return {
        "ok": True,
        "service": "radha-intelligence",
        "version": "0.2.0",
        "gateway_configured": engine.configured,
        "orchestration": "objective-first",
    }


@app.get("/api/capabilities")
def capabilities():
    return {
        "ok": True,
        "capabilities": [
            "reason",
            "research",
            "create",
            "analyze",
            "build",
            "act",
        ],
        "internal_registry": "enabled",
        "routing": "objective-first",
        "execution_flow": [
            "understand",
            "route",
            "plan",
            "execute",
            "verify",
            "deliver",
        ],
    }


@app.post("/api/plan")
def plan(request: ChatRequest):
    orchestration = engine.orchestrator.route(request.message, request.context)
    return {
        "ok": True,
        "route": orchestration["capability"],
        "capabilities": orchestration["capabilities"],
        "confidence": orchestration["confidence"],
        "industry": orchestration["industry"],
        "plan": orchestration["plan"],
    }


@app.post("/api/chat")
def chat(request: ChatRequest):
    return engine.run(request.message, request.context)
