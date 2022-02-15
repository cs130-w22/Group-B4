import React from 'react'
import { callbackify } from 'util';
import './Match.css';

function App ({username, userId, callBack}) {
    function chatWithUser(e) {
        e.preventDefault();
        callBack(username, userId);
    }
    return (
            <div id = "current_match" onClick={chatWithUser}>
                <div id = "user_name">{username}</div> 
            </div>
    );
}

export default App;