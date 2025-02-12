const express = require('express');
const TodoController = require('../controllers/todoController');

const router = express.Router();

router.get('/todos', TodoController.getTodos);
router.get('/todos/:id', TodoController.getTodoById);
router.post('/todos', TodoController.createTodo);
router.put('/todos/:id', TodoController.updateTodo);
router.delete('/todos/:id', TodoController.deleteTodo);

module.exports = router;
