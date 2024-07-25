import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

const OAuthCallback = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      console.log('token', token);
      if (token) {
        localStorage.setItem('token', token);
        const response = await api.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        navigate('/');
      } else {
        console.error('Token not found');
      }
    };

    fetchUser();
  }, [location, navigate, setUser]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
