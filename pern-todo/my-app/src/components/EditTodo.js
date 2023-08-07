import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditTodo = ({todo}) => {
  const [description, setdescription] = useState(todo.description)


// edit description function

const updateDescription = async (e) =>{
  e.preventDefault();
  try {
     await axios.put(`http://localhost:3001/todos/${todo.todo_id}`, {
      description
    })
  
  window.location = '/'  
    
  } catch (error) {
    console.log(error.message)
  }
}



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>

<Button variant="primary" onClick={handleShow}>
      Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text' onChange={e => setdescription(e.target.value)} value={description} className='form-control'/>

         </Modal.Body>
        <Modal.Footer>


<Button onClick={ e => updateDescription(e) } variant="warning">
      Edit
      </Button>
       
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditTodo