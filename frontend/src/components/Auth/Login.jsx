import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';
import { googleSignIn } from '../../services/auth';

import '../../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid , setValid] = useState(false)
  const { loginUser, googleLoginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate('/');
    } catch (error) {
      setValid(true)
      console.error('Login failed:', error);
    }
  };
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
      await googleSignIn(resultsFromGoogle.user);  // Pass the user object from resultsFromGoogle
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="login-form">
      {valid && <div className='wrng'> 
        <p>
        Wrong Email or Password
        </p> </div>}
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        
        <div className="googlebtn">
          <p>New here? <Link to={'/register'}>Register</Link></p>
        <button type='button' onClick={handleGoogleClick}>SignIn with Google</button>
        </div>

      </div>
    </div>
  );
};

export default Login;
