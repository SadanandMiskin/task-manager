import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (firstName, lastName,email, password) => {
  const response = await api.post('/auth/register', { firstName, lastName,email, password });
  return response.data;
};

export const googleLogin = () => {
  window.location.href = `${api.defaults.baseURL}/auth/google/login`;
};

export const googleRegister = () => {
  window.location.href = `${api.defaults.baseURL}/auth/google/login`;
};

export const googleSignIn = async (user) => {
  const { displayName, email } = user;
  const response = await api.post('/auth/google-signin', { displayName, email });
  const { token } = response.data;
  localStorage.setItem('token', token);
  window.location.href = "/"
};