const express = require('express')
const router = express.Router()


const controller = require('../controller/controller')

router.get('/', controller.getAll)
router.get('/edit/:id', controller.getById)
router.get('/delete/:id', controller.delete)
router.post('/addTodo', controller.addTodo)
router.post('/update/:id', controller.updateTodo)
router.post('/filter', controller.filter)


module.exports = router
