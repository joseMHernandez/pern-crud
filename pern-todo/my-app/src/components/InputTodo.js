import React, { useState } from 'react'
import axios from 'axios'
const InputTodo = () => {

const [description, setdescription] = useState('')


const onSubmitForm = async (e) =>{
    e.preventDefault()
try {
  
  const response = await axios.post('http://localhost:3001/todos', {
    description
  })
window.location = '/'
  console.log(response.data)
    
} catch (error) {
    console.log(error.message)
}
}


  return (
    <>
    
    <h1 className='text-center mt-5'>Pern Todo List</h1>

    <form className='d-flex mt-5' onSubmit={onSubmitForm} >
        <input type="text"  value={description} onChange={e => setdescription(e.target.value)} className='form-control'/>
        <button className='btn btn-success'>Add</button>
    </form>
    </>
  )
}

export default InputTodo