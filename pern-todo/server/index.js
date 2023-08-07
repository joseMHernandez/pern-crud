const express = require('express')

const PORT = 3001
const app = express()
const cors = require('cors')

const pool = require('./db')
//midleware 
app.use(cors())
app.use(express.json())

//routes

// CREATE TODO

app.post('/todos', async (req, res)=>{
    try {
    const {description} = req.body
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description])
        res.json(newTodo.rows[0])
    } catch (error) {
        res.status(500).json(error.message)
    }
})

// GET ALL TODOS

app.get('/todos', async (req, res)=>{
    try {
        const allTodos = await pool.query('SELECT * FROM todo')
        res.status(200).json(allTodos.rows)
    } catch (error) {
    res.status(404).json({error: error.messages})
    }
})

//GET A TODO

app.get('/todos/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const getTodo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
        res.status(200).json(getTodo.rows)
    } catch (error) {
        res.status(404).json({error: error.messages}) 
    }
})


//UPDATE TODO

app.put('/todos/:id', async (req, res)=>{
    try {
        const id = req.params.id
        const {description} = req.body
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id])
        res.status(200).json(updateTodo)
       
    } catch (error) {
        res.status(404).json({error: error.messages}) 

    }
})


//delete a todo


app.delete('/todos/:id', async (req, res)=>{
    try {
        const { id } = req.params
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id])
        res.status(200).json(deleteTodo)
    } catch (error) {
        res.status(404).json({error: error.messages}) 
 
    }
})






app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
})

