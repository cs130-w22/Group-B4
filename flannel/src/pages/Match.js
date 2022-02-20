import React from 'react'
import { callbackify } from 'util';
import './Match.css';
import {Button} from '@mui/material'

function App ({username, userId, callBack}) {
    function chatWithUser(e) {
        e.preventDefault();
        callBack(username, userId);
    }
    return (
        <Button onClick = {chatWithUser} sx= {{padding:1}}>
            {username}
        </Button>
            // <div id = "current_match" onClick={chatWithUser}>
            //     <div id = "user_name">{username}</div> 
            // </div>
    );
}

export default App;