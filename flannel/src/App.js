import React from 'react';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import ExplorePage from './components/Explore/ExplorePage'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import './App.css'

function App() {
  return (
      <Routes>
        <Route exact path = "/" element = {<LogIn/>} />
        <Route exact path = "/SignUp" element = {<SignUp/>} />
        <Route exact path = "/Explore" element = {<ExplorePage/>} />
        <Route exact path = "/Chat" element = {<Chat/>} />
        <Route exact path = "/Profile" element = {<Profile />} />
      </Routes>
  );
}

export default App
