import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authroutes.js';
import todoRoutes from './routes/todoRoutes.js';
// import passport from './config/passport.js';
import session from 'express-session'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use((req, res, next) => {
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(express.json());
// app.use(passport.initialize());

// import authRoutes from './routes/authroutes.js';
// import todoRoutes from './routes/todoRoutes.js';
app.get('/' , (req,res)=>{
  res.json({status: 'ON'})
})
app.use('/api/auth', authRoutes);
app.use('/api/todos',  todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));