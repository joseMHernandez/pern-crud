import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditTodo from './EditTodo'

const ListTodo = () => {
    
const [todos, settodos] = useState([])


const deleteTodo = async  (id) => {

    try {
        await axios.delete(`http://localhost:3001/todos/${id}`)
        const filter = todos.filter(todo => todo.todo_id !== id)
       settodos(filter)
    } catch (error) {
        console.log(error.message)
    }

}
   
    const getTodo = async () =>{
        try {
            const response = await axios.get('http://localhost:3001/todos')
            settodos(response.data)


        } catch (error) {
            console.log(error.message)
        }
    }


useEffect(() => {
 
getTodo()

}, [])


  return (
    <>

  <table className="table mt-5 text-center" >
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
{/*       <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}

      {todos.map(todo=>{
        return (
            <>
            <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td><EditTodo todo={todo}/></td>
            <td><button onClick={()=> deleteTodo(todo.todo_id)} className='btn btn-danger'>Delete</button></td>

            </tr>
            </>
        )
      })}
  
    </tbody>
  </table>

    </>
  )
}

export default ListTodo