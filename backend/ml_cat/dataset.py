import pandas as pd
import numpy as np
from faker import Faker

fake = Faker()

N = 1200  # choose your desired size
machine_ids = [f'EXC00{i}' for i in range(1, 6)]
operator_ids = [f'OP10{i:02d}' for i in range(1, 11)]

timestamps = pd.date_range('2025-05-01 06:00:00', '2025-05-30 18:00:00', freq='30min')
selected_timestamps = np.random.choice(timestamps, N)

rows = []

for i in range(N):
    ts = selected_timestamps[i]
    machine = np.random.choice(machine_ids)
    operator = np.random.choice(operator_ids)
    
    # Simulate engine hours incrementally per machine
    base_engine_hour = 1500 + machine_ids.index(machine) * 50
    engine_hours = base_engine_hour + np.random.uniform(0, 100)
    
    # Fuel usage tied to load cycles and random
    load_cycles = np.random.poisson(8)
    fuel_used = round(load_cycles * np.random.uniform(0.3, 0.8) + np.random.uniform(1, 4), 2)

    # Idling time
    idling_time = int(np.random.normal(25, 18))
    idling_time = max(0, min(90, idling_time))

    # Seatbelt status
    seatbelt = np.random.choice(['Fastened', 'Unfastened'], p=[0.8, 0.2])

    # Safety Alert logic: more likely if seatbelt unfastened & high idling
    if seatbelt == 'Unfastened' and idling_time > 40:
        safety_alert = np.random.choice(['Yes', 'No'], p=[0.85, 0.15])
    elif idling_time > 65 or np.random.rand() < 0.04:
        safety_alert = 'Yes'
    else:
        safety_alert = 'No'
    
    # Engine hours increase per event
    engine_hours = round(engine_hours, 1)
    
    rows.append([
        str(ts),
        machine,
        operator,
        engine_hours,
        fuel_used,
        load_cycles,
        idling_time,
        seatbelt,
        safety_alert
    ])

df = pd.DataFrame(rows, columns=[
    "Timestamp","Machine ID","Operator ID","Engine Hours","Fuel Used (L)","Load Cycles",
    "Idling Time (min)","Seatbelt Status","Safety Alert Triggered"
])
df = df.sort_values('Timestamp')

# Save to CSV
df.to_csv("generated_safety_alert_dataset.csv", index=False)

# Show sample
print(df.head())
print(df.tail())
