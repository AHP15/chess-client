import { BrowserRouter, redirect, Route, Routes } from 'react-router-dom';

import './App.css';
import Dashboard from './components/routes/Dashboard';
import SignIn from './components/routes/Signin'
import SignUp from './components/routes/Signup';
import Profile from './components/routes/Profile';
import Game from './components/routes/Game';

function App() {

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

export default App
