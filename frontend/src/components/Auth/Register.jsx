import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { app } from '../../firebase';
import { googleSignIn } from '../../services/auth';
import '../../App.css';

const Register = () => {
  const [firstName , setFirstName] = useState('')
  const [lastName , setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass , setConfirmPass] = useState('')

  const [valid ,setValid] = useState(false)
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(firstName, lastName,email, password);
      navigate('/');
    } catch (error) {
      setValid(true)
      console.error('Registration failed:', error);
    }
  };
  

  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
      await googleSignIn(resultsFromGoogle.user); // Pass the user object from resultsFromGoogle
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="register-form">
       {valid && <div className='wrng'> 
        <p>
        User Already exists with this Email
        </p> </div>}
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
         {password == confirmPass ? 
         <button type="submit">Register</button> : 
         <div className="in">
          <p className='inc'>Password does not match.</p>
         </div> }
          {/* <button type="submit">Register</button> */}
        </form>
        <div className="googlebtn">
          <p>Already Have an Account? <Link to={'/login'}>Login</Link></p>
        <button type='button' onClick={handleGoogleClick}>SignUp with Google</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
