import React from 'react';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path = "/" element = {<LogIn/>} />
        <Route exact path = "/SignUp" element = {<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
