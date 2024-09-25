import { useState } from 'react'
import { db } from './db';
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    db.read();
    return db.data.todos;
  });
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, input]);
      db.update(({ todos }) => todos.push(input))
      setInput('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    db.data.todos.splice(index, 1); // ToDo entfernen basierend auf dem Index
    db.write();
    setTodos(newTodos);
  };
  return (
    <>
      <div>
      <h1>ToDo App</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
      {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button className="button" onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </>
  )
}

export default App
