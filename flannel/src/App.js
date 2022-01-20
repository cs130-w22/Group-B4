import * as React from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
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