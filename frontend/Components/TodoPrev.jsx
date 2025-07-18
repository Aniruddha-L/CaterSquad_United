  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import '../Assets/css/todoprev.css'

  const API_URL = "http://localhost:5555/todo";

  function TodoPrev() {
    const [todos, setTodos] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
      async function retrieveData() {
        try {
          const res = await axios.get(`${API_URL}/pending`);
          if (res && res.data) {
            setTodos(res.data);
          }
        } catch (error) {
          setMsg("Error fetching data: " + error.message);
        }
      }
      retrieveData();
    }, []);

    return (
      <div className='container-todoprev'>
        <h2 style={{ color: 'white' }}>Pending Todos</h2>
        {msg && <p style={{ color: 'red' }}>{msg}</p>}
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                <strong>Task:</strong> {todo.Detail}<br />
                <strong>Status:</strong> {todo.Status}
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending todos found.</p>
        )}
      </div>
    );
  }

  export default TodoPrev;
