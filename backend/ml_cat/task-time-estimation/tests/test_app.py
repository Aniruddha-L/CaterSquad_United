import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))
from app import app
import pytest

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_sample_endpoint(client):
    response = client.get("/sample")
    assert response.status_code == 200
    assert "Task Time Estimation API" in response.get_json()["message"]

def test_predict_endpoint(client):
    payload = {
        "Machine ID": "EXC001",
        "Operator ID": "OP1001",
        "Engine Hours": 1500,
        "Fuel Used (L)": 5.0,
        "Load Cycles": 8,
        "Idling Time (min)": 30,
        "Seatbelt Status": "Fastened",
        "Safety Alert Triggered": "No"
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    assert "estimated_task_time_min" in response.get_json()