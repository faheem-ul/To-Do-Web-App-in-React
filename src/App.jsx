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
  const[editId , setEditId] = useState(0)



  function handleChange(e) {
    e.preventDefault()
    // console.log(inputValue);
    SetInputValue(e.target.value)

  }

  function handleEdit(index){
    const editTask = todos[index]
    SetInputValue(editTask)
    setEditId(index)
  }

  function handleSubmit(e) {
    e.preventDefault()
    // console.log(inputValue)
    // console.log(todos)
    if (editId !== null) {
    const updatedTodos = [...todos];
    console.log(editId);
    updatedTodos[editId] = inputValue;
    SetTodo(updatedTodos);
    setEditId(null);
  } else {
    // If editId is not present, add a new todo
    SetTodo([...todos, inputValue]);
  }
  // Reset input value
  SetInputValue('');
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
            <button className="editbutton" onClick={()=>handleEdit(index)}> Edit</button>
          </li>
        ))}
      </ul>


    </>
  )
}

export default Todo