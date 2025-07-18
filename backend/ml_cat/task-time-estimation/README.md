### Project Structure

```
task_time_estimation/
│
├── app.py                  # Flask application
├── model.py                # Model training and prediction logic
├── requirements.txt        # Python dependencies
├── data/
│   ├── task_data.csv       # Sample data for training
│
├── templates/
│   └── index.html          # HTML template for the web interface
│
└── static/
    └── style.css           # CSS for styling the web interface
```

### Step 1: Create the Environment

1. **Create a new directory for your project:**
   ```bash
   mkdir task_time_estimation
   cd task_time_estimation
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Create a `requirements.txt` file:**
   ```plaintext
   Flask
   pandas
   scikit-learn
   numpy
   ```

4. **Install the dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Step 2: Prepare the Data

Create a sample CSV file `data/task_data.csv` with the following structure:

```csv
task_name,time_taken,environment_condition
Task A,30,1
Task B,45,2
Task C,20,1
Task D,60,3
Task E,25,2
```

### Step 3: Create the Model

Create a file named `model.py` for the model training and prediction logic.

```python
# model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

class TaskTimeEstimator:
    def __init__(self):
        self.model = LinearRegression()

    def train(self, data_path):
        # Load data
        data = pd.read_csv(data_path)
        X = data[['environment_condition']]
        y = data['time_taken']
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Train the model
        self.model.fit(X_train, y_train)
        
        # Save the model
        joblib.dump(self.model, 'task_time_model.pkl')

    def predict(self, environment_condition):
        return self.model.predict([[environment_condition]])[0]

# Train the model (uncomment to train)
# estimator = TaskTimeEstimator()
# estimator.train('data/task_data.csv')
```

### Step 4: Create the Flask Application

Create a file named `app.py` for the Flask application.

```python
# app.py
from flask import Flask, request, jsonify, render_template
from model import TaskTimeEstimator

app = Flask(__name__)
estimator = TaskTimeEstimator()

# Load the trained model
estimator.model = joblib.load('task_time_model.pkl')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    environment_condition = data.get('environment_condition')
    prediction = estimator.predict(environment_condition)
    return jsonify({'predicted_time': prediction})

if __name__ == '__main__':
    app.run(debug=True)
```

### Step 5: Create the HTML Template

Create a file named `templates/index.html`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
    <title>Task Time Estimation</title>
</head>
<body>
    <h1>Task Time Estimation</h1>
    <form id="prediction-form">
        <label for="environment_condition">Environment Condition:</label>
        <input type="number" id="environment_condition" name="environment_condition" required>
        <button type="submit">Estimate Time</button>
    </form>
    <div id="result"></div>

    <script>
        document.getElementById('prediction-form').onsubmit = async function(event) {
            event.preventDefault();
            const environmentCondition = document.getElementById('environment_condition').value;
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ environment_condition: environmentCondition })
            });
            const data = await response.json();
            document.getElementById('result').innerText = 'Estimated Time: ' + data.predicted_time + ' minutes';
        };
    </script>
</body>
</html>
```

### Step 6: Create a CSS File for Styling

Create a file named `static/style.css`.

```css
body {
    font-family: Arial, sans-serif;
    margin: 20px;
}

h1 {
    color: #333;
}

form {
    margin-bottom: 20px;
}

#result {
    font-weight: bold;
}
```

### Step 7: Run the Application

1. **Train the model (uncomment the training code in `model.py` and run it once):**
   ```bash
   python model.py
   ```

2. **Run the Flask application:**
   ```bash
   python app.py
   ```

3. **Access the application:**
   Open your web browser and go to `http://127.0.0.1:5000/`.

### Conclusion

You now have a basic Python project that includes a task time estimation model and a Flask web application with GET and POST endpoints for integration. You can expand this project by adding more features, improving the model, or enhancing the user interface.