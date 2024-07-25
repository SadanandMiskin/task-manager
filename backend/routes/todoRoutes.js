import express from 'express';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  searchTodos,
} from '../controllers/todoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTodo);
router.get('/', authMiddleware, getTodos);
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);
router.get('/search', authMiddleware, searchTodos);

export default router;