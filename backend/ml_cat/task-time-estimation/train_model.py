import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

# Load data
df = pd.read_csv("../task_time_dataset.csv")

# Encode categorical features
for col in ["Machine ID", "Operator ID", "Seatbelt Status", "Safety Alert Triggered"]:
    df[col] = LabelEncoder().fit_transform(df[col])

# Features and target
X = df.drop(["Timestamp", "Task Time (min)"], axis=1)
y = df["Task Time (min)"]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
model = RandomForestRegressor(n_estimators=100, max_depth=8, random_state=42)
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
print("MAE:", mean_absolute_error(y_test, y_pred))
print("R2:", r2_score(y_test, y_pred))

# Save model
joblib.dump(model, "task_time_model.joblib")