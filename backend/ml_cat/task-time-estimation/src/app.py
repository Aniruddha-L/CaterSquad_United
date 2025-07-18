from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
model = joblib.load("task_time_model.joblib")
CORS(app)

# Example feature order
feature_cols = [
    "Machine ID", "Operator ID", "Engine Hours", "Fuel Used (L)", "Load Cycles",
    "Idling Time (min)", "Seatbelt Status", "Safety Alert Triggered"
]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    print(data)
    # Data should be a dict with keys matching feature_cols
    df = pd.DataFrame([data])
    # Encode categorical features as in training
    for col in ["Machine ID", "Operator ID", "Seatbelt Status", "Safety Alert Triggered"]:
        df[col] = pd.factorize(df[col])[0]
    pred = model.predict(df)[0]
    return jsonify({"estimated_task_time_min": round(pred, 2)})

@app.route("/sample", methods=["GET"])
def sample():
    return jsonify({
        "message": "Task Time Estimation API",
        "usage": "POST to /predict with JSON: {\"Machine ID\": ..., \"Operator ID\": ..., ...}"
    })
if __name__ == "__main__":
    app.run(debug=True)