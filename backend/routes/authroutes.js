import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { googleSignIn } from '../controllers/authController.js';
import {register, login} from '../controllers/authController.js'
const router = express.Router();

// router.get('/google/login', passport.authenticate('google-login', { scope: ['profile', 'email'] }));

// router.get('/google/callback', passport.authenticate('google-login', { failureRedirect: '/login' }), (req, res) => {
//   const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.redirect(`http://localhost:3000/oauth/callback?token=${token}`);
// });

// router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.json(req.user);
//   });

  router.post('/google-signin', googleSignIn)
  router.post('/register' , register)
  router.post('/login' , login)
export default router;
