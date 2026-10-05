from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any

from .agent_capabilities import AGENT_CAPABILITIES, INDUSTRY_PACKS


INTENT_RULES: dict[str, tuple[str, ...]] = {
    "research": (
        "research", "investigate", "sources", "source", "latest", "evidence",
        "compare", "find out", "look up", "verify", "what is known",
    ),
    "coding": (
        "code", "coding", "program", "debug", "bug", "repository", "github",
        "javascript", "typescript", "python", "api", "deploy", "build an app",
        "fix the app", "implementation",
    ),
    "create": (
        "create", "write", "draft", "design", "generate", "image", "video",
        "presentation", "document", "copy", "concept",
    ),
    "data_analyst": (
        "data", "dataset", "csv", "excel", "spreadsheet", "statistics", "chart",
        "graph", "forecast", "kpi", "metrics", "calculate", "trend",
    ),
    "analyze": (
        "analyze", "analyse", "analysis", "review", "audit", "root cause",
        "risk", "trade-off", "tradeoff", "explain this", "why did",
    ),
    "plan": (
        "plan", "planning", "roadmap", "steps", "strategy", "schedule",
        "organize", "prioritize", "next steps",
    ),
}


@dataclass(frozen=True)
class Route:
    capability: str
    confidence: float
    reason: str
    matched_terms: tuple[str, ...]


class RADHAOrchestrator:
    """Objective-first orchestration layer.

    The UI sees one RADHA intelligence. This layer decides which bounded
    capabilities are required, preserves the user objective, and produces an
    execution plan before a provider is called.
    """

    def classify(self, message: str) -> dict[str, Any]:
        text = message.lower().strip()
        scores: dict[str, int] = {}
        matches: dict[str, list[str]] = {}

        for capability, terms in INTENT_RULES.items():
            found = [term for term in terms if term in text]
            matches[capability] = found
            scores[capability] = len(found)

        ranked = sorted(scores.items(), key=lambda item: item[1], reverse=True)
        if not ranked or ranked[0][1] == 0:
            return {
                "capability": "saarthi",
                "capabilities": ["saarthi"],
                "confidence": 0.78,
                "reason": "general objective",
                "matches": [],
            }

        active = [item for item in ranked if item[1] > 0]
        top_score = ranked[0][1]
        selected = [name for name, score in active if score >= max(1, top_score - 1)]
        if len(selected) > 3:
            selected = selected[:3]

        second_score = ranked[1][1] if len(ranked) > 1 else 0
        confidence = min(0.97, 0.70 + top_score * 0.06)
        if second_score and top_score == second_score:
            confidence = 0.86

        primary = selected[0]
        return {
            "capability": primary,
            "capabilities": selected,
            "confidence": confidence,
            "reason": "objective-based capability selection",
            "matches": [
                {"capability": name, "terms": matches[name]}
                for name in selected
            ],
        }

    def detect_industry(self, message: str) -> dict[str, Any]:
        text = message.lower()
        signals = {
            "travel": ("flight", "hotel", "trip", "travel", "itinerary", "visa"),
            "financial_services": ("bank", "investment", "portfolio", "cash flow", "finance", "loan"),
            "healthcare": ("patient", "clinic", "doctor", "medical", "healthcare", "diagnosis"),
            "retail": ("customer", "product", "inventory", "order", "ecommerce", "retail"),
            "logistics": ("shipment", "warehouse", "delivery", "carrier", "supply chain", "route"),
            "manufacturing": ("production", "factory", "machine", "downtime", "yield", "manufacturing"),
        }
        scored = {
            key: [term for term in terms if term in text]
            for key, terms in signals.items()
        }
        winner = max(scored, key=lambda key: len(scored[key]))
        if not scored[winner]:
            return {"key": None, "name": "General", "signals": []}
        return {
            "key": winner,
            "name": INDUSTRY_PACKS[winner]["name"],
            "signals": scored[winner],
        }

    def build_plan(self, route: dict[str, Any], industry: dict[str, Any], context: dict[str, Any]) -> dict[str, Any]:
        capabilities = route["capabilities"]
        stages: list[dict[str, Any]] = []

        stages.append({"stage": "understand", "status": "ready"})
        if "research" in capabilities:
            stages.append({"stage": "research", "status": "required"})
        if "data_analyst" in capabilities:
            stages.append({"stage": "analyze_data", "status": "required"})
        if "analyze" in capabilities:
            stages.append({"stage": "analyze", "status": "required"})
        if "coding" in capabilities:
            stages.append({"stage": "build", "status": "required"})
        if "create" in capabilities:
            stages.append({"stage": "create", "status": "required"})
        if "plan" in capabilities:
            stages.append({"stage": "plan", "status": "required"})
        stages.extend([
            {"stage": "verify", "status": "required"},
            {"stage": "deliver", "status": "required"},
        ])

        return {
            "orchestrator": "radha",
            "capabilities": capabilities,
            "industry": industry,
            "context_keys": sorted(context.keys()),
            "stages": stages,
        }

    def route(self, message: str, context: dict[str, Any] | None = None) -> dict[str, Any]:
        context = context or {}
        classification = self.classify(message)
        industry = self.detect_industry(message)
        plan = self.build_plan(classification, industry, context)
        return {
            "capability": classification["capability"],
            "capabilities": classification["capabilities"],
            "confidence": classification["confidence"],
            "reason": classification["reason"],
            "matches": classification["matches"],
            "industry": industry,
            "plan": plan,
            "registry_available": all(
                name in AGENT_CAPABILITIES
                for name in classification["capabilities"]
                if name != "saarthi"
            ),
        }
