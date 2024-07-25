import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['TODO', 'IN PROGRESS', 'DONE'],
    default: 'TODO',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Todo', TodoSchema);