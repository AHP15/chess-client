import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import './App.css';
import Dashboard from './components/routes/Dashboard';
import SignIn from './components/routes/Signin'
import SignUp from './components/routes/Signup';
import Profile from './components/routes/Profile';
import Game from './components/routes/Game';
import { useStore } from './context/store';
import { getCallback, getUser } from './context/storeSetters';
import useSocket from './hooks/useSocket';

function App() {
  useSocket();
  const {correctToken, set} = useStore('correctToken');

  useEffect(() => {
    // getCallback(set);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      getUser(token, set);
    }
  }, [correctToken.callback]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/game" element={<Game />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
