import logo from './logo.svg';
import './App.css';
import './Chat.css';
import React, { useState, useEffect, useContext} from 'react';
import socketClient  from "socket.io-client";
import {SocketContext, socket} from './socket'

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const from = queryParams.get('from')
  const to = queryParams.get('to')
  const room = (to + "#" + from).split('#').sort().join("#");
  const [msg, setMsg] = useState(0);
  const [messages, setMessages] = useState([{"timeStamp": 0, msg: "", sender: ""}]);


  useEffect(() => {
    socket.emit('joinRoom', { username: from, room: room });

    socket.on('messageHistory', (messageHistory) => {
      let temp = [];
      setMessages(() => [])

      messageHistory.forEach((item) => temp.push({"timeStamp": item.timeStamp, "msg": item.msg, "sender": item.sender}))
      temp.forEach((item) => {
        setMessages((old) => [...old, item])
      })
    })

    socket.on('message', (message) => {
      setMessages((old) => [...old, message]);
      console.log(messages)
    })
  }, [socket])

  function sendMsg(e) {
    e.preventDefault();
    let msgObj = {
      room: room, 
      sender: from, 
      data: msg, 
    }
    
    let msgString = JSON.stringify(msgObj);
    socket.emit('chat', msgString)
  }
  function handleMsgChange(e) {
    setMsg(e.target.value)
  }

  return (
    <div className="Message">
      <form id="msgform">
          <input type = "text" name="message" onChange={handleMsgChange}></input>
          <button type = "button"  onClick={sendMsg}> Send Msg </button>
      </form>
      <div>
        {messages.map((message, index) => (
          <div key={index} id = "message_container">
            <div id = "message">
              <div id = "sender-text">
                  <p>{message.sender}: </p>
              </div>
              <div id = "message-text">
                {message.msg}
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;
