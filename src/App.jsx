import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import todoIcon from './images/todo.png'


function Todo() {
  const [inputValue, SetInputValue] = useState('');
  const [todos, SetTodo] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });



  function handleChange(e) {
    e.preventDefault()
    // console.log(inputValue);
    SetInputValue(e.target.value)

  }

  function handleSubmit(e) {
    e.preventDefault()
    // console.log(inputValue)
    // console.log(todos)
    SetTodo([...todos, inputValue])
    SetInputValue('')

  }
  // console.log(todos);
  function handleDelete(index) {
    console.log(index);
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    SetTodo(newTodos)
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])
  // const retrievedTodos = JSON.parse(localStorage.getItem('todos'))
  // console.log(retrievedTodos);

  return (
    <>
    <div className="start-flex">
      <img src={todoIcon} alt="" width={'120px'}/>
      <h1 className="mainHeading">To Do List</h1>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button className="button">Add Todo</button>
      </form>


      <ul>
        {todos.map((todo, index) => (
          <li className="list" key={index}>
            <span className="todoContent">{todo}</span>
            <button className="buttonDelete" onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>


    </>
  )
}

export default Todo