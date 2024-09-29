import React, { useState } from "react";
import './App.css'; // Assuming you'll create this CSS file

const App = () => {
  const [todos, setTodos] = useState([]); // Start with an empty todo list
  const [input, setInput] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editInput, setEditInput] = useState("");

  // Add a new todo
  const addTodo = () => {
    if (input.trim() === "") return; // Prevent empty todos
    const newTodo = { id: Math.random(), text: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput(""); // Clear the input field
  };

  // Start editing a todo
  const editTodo = (id, text) => {
    setEditTodoId(id);
    setEditInput(text);
  };

  // Save the edited todo
  const saveTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editInput } : todo
    );
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditInput("");
  };

  // Toggle todo completion
  const toggleTodoCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button className="add-button" onClick={addTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  className="todo-input"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button className="save-button" onClick={() => saveTodo(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleTodoCompletion(todo.id)} className="todo-text">
                  {todo.text}
                </span>
                <button className="edit-button" onClick={() => editTodo(todo.id, todo.text)}>Edit</button>
                <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
