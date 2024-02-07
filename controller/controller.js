const pool = require('../connect')
const path = require('path');

module.exports = {
    // Get All Todos
    getAll: async(req, res) => {
        const data = await pool.query(`SELECT * FROM todo ORDER BY date`);
        res.render('index', {data: data.rows});
    },

    // Filter Todo by Id 
    getById: async (req ,res) =>{
        const id = req.params.id;
        const data = await pool.query('SELECT * FROM todo WHERE id = $1', [id])
        res.render('edit', {data: data.rows})
    },
    // Add Todo Endpoint
    addTodo: async(req, res) => {
        const {todo, date} = req.body;
    
        try {
            const result = await pool.query(`INSERT INTO todo (todo, date) VALUES($1, $2)
            RETURNING *`, [todo, date])
            console.log(result)
            res.redirect('/')
        } catch (error) {
            console.log('Error in adding todo');
            res.status(500).json({error: 'Internal Server Error'})
        }
    },
    // Update Todo
    updateTodo: async(req, res)=> {
        const id = req.params.id;
        const {todo, date} = req.body
    
        try {
            await pool.query(`UPDATE todo SET todo = $1, date = $2 WHERE id = $3`, [todo, date, id])
            res.redirect('/')
        } catch(error) {
            console.error('Error while updating todo: ', error)
            res.status(500).json({error: 'Internal Servor Error'})
        }
    },
    filter: async(req, res) => {
        const searchDate = req.body.date
        const data = await pool.query(`SELECT * FROM todo WHERE date = '${searchDate}'`);
        res.render('filter', {data: data.rows});
    },
    delete: async (req, res)=>{
        const id = req.params.id;
        await pool.query('DELETE FROM todo WHERE id = $1', [id])
        res.redirect('/')
    }    
}