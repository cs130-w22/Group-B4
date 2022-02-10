import React from 'react';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore';
import {Route,Routes} from 'react-router-dom';
import './App.css'

import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <Routes>
        <Route exact path = "/" element = {<LogIn/>} />
        <Route exact path = "/SignUp" element = {<SignUp/>} />
        <Route exact path = "/Explore" element = {<Explore/>} />
      </Routes>
  );
}

export default App;