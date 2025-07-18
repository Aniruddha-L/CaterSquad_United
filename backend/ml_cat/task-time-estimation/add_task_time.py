import pandas as pd
import numpy as np

df = pd.read_csv("../generated_safety_alert_dataset.csv")  # <-- updated path

# Simulate task time (in minutes) based on some features
np.random.seed(42)
df['Task Time (min)'] = (
    df['Load Cycles'] * np.random.uniform(3, 7, len(df)) +
    df['Idling Time (min)'] * np.random.uniform(0.1, 0.3, len(df)) +
    np.random.normal(10, 5, len(df))
).round(1)

df.to_csv("../task_time_dataset.csv", index=False)  # <-- updated path