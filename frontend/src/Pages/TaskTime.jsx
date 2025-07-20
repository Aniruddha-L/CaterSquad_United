import React, { useState } from 'react';
import axios from 'axios';
import '../../Assets/css/task.css';

function TaskTime() {
  document.title = "C4U - Task Time Estimator";

  const [mid, setMid] = useState('');
  const [oid, setoid] = useState('');
  const [enghr, setenghr] = useState(0);
  const [fuel, setfuel] = useState(0.0);
  const [idle, setidle] = useState(0);
  const [cycle, setcycle] = useState(0);
  const [seatbelt, setseatbelt] = useState('Fastened');
  const [alert, setalert] = useState('No');
  const [predict, setPred] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      "Machine ID": mid,
      "Operator ID": oid,
      "Engine Hours": enghr,
      "Fuel Used (L)": fuel,
      "Load Cycles": cycle,
      "Idling Time (min)": idle,
      "Seatbelt Status": seatbelt,
      "Safety Alert Triggered": alert
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPred(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="task-container">
      <h2 className="task-title">Task Time Estimator</h2>
      <form className="task-form-modern" onSubmit={handleSubmit}>
        <div className="task-group">
          <label>Machine ID</label>
          <input type="text" value={mid} onChange={(e) => setMid(e.target.value)} />
        </div>

        <div className="task-group">
          <label>Operator ID</label>
          <input type="text" value={oid} onChange={(e) => setoid(e.target.value)} />
        </div>

        <div className="task-group">
          <label>Engine Hours</label>
          <input type="number" value={enghr} onChange={(e) => setenghr(e.target.value)} />
        </div>

        <div className="task-group">
          <label>Fuel Used (L)</label>
          <input type="number" value={fuel} onChange={(e) => setfuel(e.target.value)} />
        </div>

        <div className="task-group">
          <label>Idling Time (min)</label>
          <input type="number" value={idle} onChange={(e) => setidle(e.target.value)} />
        </div>

        <div className="task-group">
          <label>Load Cycles</label>
          <input type="number" value={cycle} onChange={(e) => setcycle(e.target.value)} />
        </div>

        <div className="task-group">
          <label>Seatbelt Status</label>
          <select value={seatbelt} onChange={(e) => setseatbelt(e.target.value)}>
            <option value="Fastened">Fastened</option>
            <option value="Unfastened">Unfastened</option>
          </select>
        </div>

        <div className="task-group radio-set">
          <label>Safety Alert Triggered?</label>
          <div className="radio-options">
            <label>
              <input type="radio" value="Yes" checked={alert === 'Yes'} onChange={(e) => setalert(e.target.value)} />
              Yes
            </label>
            <label>
              <input type="radio" value="No" checked={alert === 'No'} onChange={(e) => setalert(e.target.value)} />
              No
            </label>
          </div>
        </div>

        <button type="submit" className="task-submit-btn" style={{backgroundColor: "#FFF"}}>Estimate Time</button>
      </form>

      {predict !== null && (
        <div className="task-result">
          <p>Predicted Task Time: <strong>{predict.estimated_task_time_min}</strong> minutes</p>
        </div>
      )}
    </div>
  );
}

export default TaskTime;
