from backend.orchestration import RADHAOrchestrator


def test_general_request_keeps_single_intelligence():
    result = RADHAOrchestrator().route("Help me think through this decision.")
    assert result["capability"] == "saarthi"
    assert result["capabilities"] == ["saarthi"]
    assert result["plan"]["stages"][0]["stage"] == "understand"


def test_multi_capability_request_builds_pipeline():
    result = RADHAOrchestrator().route(
        "Research the latest options, analyze the data and create a recommendation."
    )
    assert "research" in result["capabilities"]
    assert "analyze" in result["capabilities"]
    assert "create" in result["capabilities"]
    stages = [stage["stage"] for stage in result["plan"]["stages"]]
    assert stages[0] == "understand"
    assert "research" in stages
    assert "analyze" in stages
    assert "create" in stages
    assert stages[-2:] == ["verify", "deliver"]


def test_industry_context_is_detected_without_changing_user_facing_identity():
    result = RADHAOrchestrator().route(
        "Analyze warehouse delivery delays and create an operations plan."
    )
    assert result["industry"]["key"] == "logistics"
    assert result["industry"]["name"] == "Logistics & Supply Chain"
    assert result["capability"] in {"analyze", "create", "plan"}
