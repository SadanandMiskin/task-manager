import Todo from '../models/Todo.js';
import User from '../models/User.js';

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  console.log(req.user)
  try {
    const newTodo = new Todo({
      user: req.user.id,
      title,
      description
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    // console.log()
    const user = await User.findOne({_id: req.user.id})
    res.json({todos , user});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateTodo = async (req, res) => {
  const { title, status , description } = req.body;

  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    todo.title = title || todo.title;
    todo.status = status || todo.status;
    todo.description = description || todo.description
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await todo.deleteOne();
    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const searchTodos = async (req, res) => {
  const { query, sort } = req.query;

  try {
    let todos = await Todo.find({
      user: req.user.id,
      title: { $regex: query, $options: 'i' },
    });

    if (sort === 'recent') {
      todos.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sort === 'old') {
      todos.sort((a, b) => a.createdAt - b.createdAt);
    }

    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};