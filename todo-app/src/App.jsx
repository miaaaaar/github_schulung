import { useState, useEffect } from "react";
import { db } from "./db";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    db.read();
    return db.data.todos;
  });
  const [input, setInput] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [catFact, setCatFact] = useState(); //Hinweis: für Aufgabe 3 auch extra nochmal benötigt

  useEffect(() => {

    async function getCatFact() {
      const response = await fetch("https://catfact.ninja/fact");
      const responseJson = await response.json();
      const catFactJson = responseJson.fact;
      setCatFact(catFactJson);
    }

    async function getDogFact(){
      //Aufgabe 3
      //https://dogapi.dog/api/v2/facts
      // JSON Struktur: response.data[0].attributes.body
    }
    
    getCatFact();
    getDogFact();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, input]);
      db.update(({ todos }) => todos.push(input));
      setInput("");
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
      <div className="appWrapper">
        <div>
          <h1>ToDo App</h1>
          <div className="inputContainer">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Add a new ToDo..."
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                <div className="tableContainer">
                  {todo}{" "}
                  {/*Syntax in React um Variablen anzuzeigen, könnte interessant für Aufgabe 2 sein....*/}
                  <button onClick={() => deleteTodo(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      {/*<div className="catFactContainer">
        Aufgabe 2
        </div>*/}
      </div>
    </>
  );
}

export default App;
