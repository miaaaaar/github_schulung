import { useState, useEffect } from 'react'
import { db } from './db';
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    db.read();
    return db.data.todos;
  });
  const [input, setInput] = useState('');
  const[catFact, setCatFact] = useState();

  useEffect(()=>{

   async function getDogFact(){
    const response = await fetch("https://catfact.ninja/fact");
    const responseJson = await response.json()
    const catFact = responseJson.fact;
    setCatFact(catFact)
  }

  //Url für 3. Aufgabe

  
  getDogFact()
  },[])


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
    db.data.todos.splice(index, 1); 
    db.write();
    setTodos(newTodos);
  };
  return (
    <>
      <div>
      <h1>ToDo App</h1>
      <div>
        {catFact}
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
            <div className='container'>
            {todo} {/*Syntax in React um Variablen anzuzeigen, könnte interessant für Aufgabe 2 sein....*/}
            <button className="button" onClick={() => deleteTodo(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </>
  )
}

export default App
