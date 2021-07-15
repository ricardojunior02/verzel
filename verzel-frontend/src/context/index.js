import { createContext, useState, useEffect } from 'react';
import api from '../api';

const Context = createContext();

const Authenticate = ({ children }) => {
  const [authenticate, setAuthenticate] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE);
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticate(true);
    }
  }, []);
  
  async function handleLogin({ email, password }) {
    const { data: { token } } = await api.post('/session', {
      email,
      password
    });

    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE, JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticate(true);
  }

  function handleLogout() {
    setAuthenticate(false);
    localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE);
    api.defaults.headers.Authorization = undefined;
  }

  return (
    <Context.Provider value={{ authenticate, handleLogin, handleLogout }} >
      {children}
    </Context.Provider>
  )
}

export {
  Context,
  Authenticate
}