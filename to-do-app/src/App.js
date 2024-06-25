import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
   
  const [todo,setTodo] = useState("");
  const [todos,setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])
  

  const saveToLS  = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(),todo, isCompleted:false}])
    setTodo("")
    saveToLS();
  }
  const handleEdit = (e,id) =>{
    let t = todos.filter(i=>i.id === id)
   setTodo(t[0].todo)
   let newTodos = todos.filter(item=>{
    return item.id!==id;
   });
   setTodos(newTodos);
   saveToLS();
  }

  const handleDelete = (e,id) =>{
    todos.findIndex(item=>{
      return item.id === id;
     })
     let newTodos = todos.filter(item=>{
      return item.id!==id;
     });
     setTodos(newTodos)
     saveToLS();
   }

  const handleChange =(e) =>{
    setTodo(e.target.value)
    
  }

 const handleCheckbox = (e) =>{
   let id = e.target.name;
   let index = todos.findIndex(item=>{
    return item.id === id;
   })
   let newTodos = [...todos];
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos)
   saveToLS()
 }
  
  return (
    <>
      <div className=' container bg-violet-100 mx-auto my-5 min-h-[80vh] w-3/5 rounded-lg md:w-1/2 md:container md:mx-auto '>
       <Navbar/>
       <div className='m-8'>
        <div className='addTodo my-3 flex flex-col '>
          <h2 className='text-lg font-bold m-2'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type='text' className='w-full px-3  rounded-lg '/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-900 p-3 py-2 ml-5 text-white rounded-md disabled:bg-violet-600'>Save</button>
          </div>
        </div>
        <h1 className='font-bold'>Your Todos</h1>
        <div className='todos'>
          {todos.length === 0 && <div className='m-5 bg-green-600'>No Todo to display</div>}
          {todos.map(item=>{
          
          return <div key={item.id} className="todo flex flex-row  justify-between my-3">
            <div className='flex gap-5'>
            <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className='buttons flex h-full'>
            <button onClick={(e)=>{handleEdit(e,item.id)}} className=' hover:bg-violet-700 hover:text-white p-1 py-1 text-violet-700 rounded-md mx-3'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className=' hover:bg-violet-700  hover:text-white p-1 py-1 text-violet-700 rounded-md'><MdDelete /></button>
          </div>
          </div>
          })}
        </div>
        </div>
      </div>
   
  </>
  );
}

export default App;
