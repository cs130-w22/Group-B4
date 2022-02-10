import logo from './logo.svg';
import './App.css';
import './Chat.css';
import './Match.css';
import Match from './Match.js'
import React, { useState, useEffect, useContext} from 'react';
import socketClient  from "socket.io-client";
import {SocketContext, socket} from './socket'

function App({sender, reciever}) {
  const queryParams = new URLSearchParams(window.location.search);
  const from = queryParams.get('from')
  const to = queryParams.get('to')
  const [room, setRoom] = useState(""); //(to + "#" + from).split('#').sort().join("#")
  const [msg, setMsg] = useState(0);
  const [users, setUsers] = useState([{"username": "Henry", "id": "6202ccd95532a766e2477e41"}, {"username": "Brandon", "id": "620306331112997f1a5faffb"}, {"username": "chi", "id": "6204b3f975b3b558c0c773a0"}])
  const [messages, setMessages] = useState([]);//{"timeStamp": 0, msg: "", sender: ""}


  useEffect(() => {
    socket.emit('joinRoom', { username: from, room: room });

    socket.on('messageHistory', (messageHistory) => {
      let temp = [];
      setMessages(() => [])
      messageHistory.forEach((item) => temp.push({"timeStamp": item.timeStamp, "msg": item.msg, "sender": item.sender, "sender_name": item.sender_name}))
      temp.forEach((item) => {
        setMessages((old) => [...old, item])
      })
    })


    socket.on('message', (message) => {
      console.log(message)
      setMessages((old) => [...old, message]);
    })
  }, [socket])


  function sendMsg(e) {
    e.preventDefault();
    let msgObj = {
      room: room, 
      sender: from, 
      data: msg, 
      sender_name: from
    }
    
    let msgString = JSON.stringify(msgObj);
    socket.emit('chat', msgString)
  }
  function handleMsgChange(e) {
    setMsg(e.target.value)
  }

  function updateChat(username, userId) {
    //gives us the username and userId of the selected user we want to chat with 
    socket.emit('leaveRoom', {room: room});
    let tmp_room = (from + "#" + userId).split('#').sort().join("#");
    setRoom(tmp_room)
    socket.emit('joinRoom', { username: from, room: tmp_room});
  }

  return (
    <div id = "chat_page">
      <div id = "current_chats">
        {
          users.map((item, index) => (
            <Match username={item.username} userId={item.id} key={index} callBack={updateChat}></Match>
          ))}
      </div>
      <div className="Message" id = "message_window">
      <div id="message_list">
        {messages.map((message, index) => (
          <div key={index} id = "message_container">
            <div id = "message">
              <div id = "sender-text">
                  <p>{message.sender_name}: </p>
              </div>
              <div id = "message-text">
                {message.msg}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id = "form_container">
        <form id="msgform">
            <input type = "text" name="message" onChange={handleMsgChange} id="txtbox"></input>
            <button type = "button"  onClick={sendMsg} className = "sendmsg"> Send Msg </button>
        </form>
      </div>  
    </div>
  </div>
    
  );
}

export default App;
