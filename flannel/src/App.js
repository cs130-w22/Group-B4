import React from 'react';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import ExplorePage from './components/Explore/ExplorePage'
import {Route,Routes} from 'react-router-dom';
import './App.css'

function App() {
  return (
      <Routes>
        <Route exact path = "/" element = {<LogIn/>} />
        <Route exact path = "/SignUp" element = {<SignUp/>} />
        <Route exact path = "/Explore" element = {<ExplorePage/>} />
        <Route exact path = "/Chat" element = {<Chat/>} />
      </Routes>
  );
}

export default App;
