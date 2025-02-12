const TodoModel = require('../models/todoModel');

const TodoController = {
  getTodos: async (req, res) => {
    try {
      const [todos] = await TodoModel.getAll();  // ใช้ async/await
      res.json(todos);
    } catch (err) {
      return res.status(500).json({ message: "Error retrieving todos", error: err });
    }
  },

  getTodoById: async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await TodoModel.getById(id);
      if (results.length === 0) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(results[0]);
    } catch (err) {
      return res.status(500).json({ message: "Error retrieving todo", error: err });
    }
  },

  createTodo: async (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    try {
      const [result] = await TodoModel.create(text);  // ใช้ async/await
      res.status(201).json({ id: result.insertId, text, completed: false });
    } catch (err) {
      return res.status(500).json({ message: "Error creating todo", error: err });
    }
  },

  updateTodo: async (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;

    try {
      const [results] = await TodoModel.getById(id);
      if (results.length === 0) {
        return res.status(404).json({ message: "Todo not found" });
      }

      await TodoModel.update(id, text, completed);  // ใช้ async/await
      res.json({ id, text, completed });
    } catch (err) {
      return res.status(500).json({ message: "Error updating todo", error: err });
    }
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;
    
    try {
      const [results] = await TodoModel.getById(id);
      if (results.length === 0) {
        return res.status(404).json({ message: "Todo not found" });
      }

      await TodoModel.delete(id);  // ใช้ async/await
      res.json({ message: "Todo deleted successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Error deleting todo", error: err });
    }
  },
};

module.exports = TodoController;
