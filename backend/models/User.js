import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName:{
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
});

export default mongoose.model('User', UserSchema);