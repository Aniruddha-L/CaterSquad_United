// src/components/TodoApp.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Assets/css/todo.css";

const API_URL = "http://localhost:5555/todo";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/test`);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!detail || !date || !status || !username) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post(`${API_URL}/new`, {
        detail,
        date,
        status,
        Username: username,
      });
      setDetail("");
      setDate("");
      setStatus("Not Started");
      setUsername("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const updateStatus = async (id, opt) => {
    try {
      await axios.put(`${API_URL}/updateStatus/${id}/${opt}`);
      fetchTodos();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">Todo App</h2>

      <h3 className="todo-subtitle">Todos List</h3>
      {todos.length === 0 ? (
        <p className="todo-empty">No todos found</p>
      ) : (
        <table className="todo-table">
          <thead className="todo-thead">
            <tr>
              <th>Detail</th>
              <th>Status</th>
              <th>Date</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="todo-tbody">
            {todos.map((todo) => (
              <tr key={todo._id}>
                <td>{todo.Detail}</td>
                <td>{todo.Status}</td>
                <td>{todo.Date}</td>
                <td>{todo.Username}</td>
                <td>
                  <div className="buttons">
                    <button
                      className="todo-button"
                      onClick={() => updateStatus(todo._id, 1)}
                    >
                      Next Status
                    </button>
                    <button
                      className="todo-button"
                      onClick={() => updateStatus(todo._id, 0)}
                    >
                      Complete
                    </button>
                    <button
                      className="todo-button"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr className="todo-divider" />

      <h3 className="todo-subtitle">Add New Todo</h3>
      <form className="todo-form" onSubmit={addTodo}>
        <input
          className="todo-input"
          type="text"
          placeholder="Detail"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <input
          className="todo-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="todo-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Not Started">Not Started</option>
          <option value="Started">Started</option>
          <option value="pending">Pending</option>
        </select>
        <input
          className="todo-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="todo-button" type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoApp;
