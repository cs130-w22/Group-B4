
import './Chat.css';
import './Match.css';
import Match from './Match.js'
import React, { useState, useEffect, useContext} from 'react';
import socketClient  from "socket.io-client";
import {SocketContext, socket} from '../socket'

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const from = JSON.parse(localStorage.getItem('user'))._id;
  const userName = JSON.parse(localStorage.getItem('user')).username;
  const [room, setRoom] = useState(""); //(to + "#" + from).split('#').sort().join("#")
  const [msg, setMsg] = useState(0);
  const [users, setUsers] = useState([{"username": "Henry", "id": "62058ecec54374bc9112fc2d"}, {"username": "ishaan", "id": "6205904f308e7d7d8d84075f"}, {"username": "chi", "id": "6204b3f975b3b558c0c773a0"}])
  const [messages, setMessages] = useState([]);//{"timeStamp": 0, msg: "", sender: ""}


  useEffect(async () => {

    const cookies = document.cookie;
    let requestObj = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: cookies,
      },
  };
    //const response = await fetch(`/apihttp://localhost:3000/user?username=aadsfas`, requestObj);
    const response = await fetch(`/api/user/getMatchesList?username=${userName}`, requestObj);

    if(response.status === 401) {
      //render unauth page
    } else {
      const matchList = await response.json();
      setUsers(() => matchList.matches)
    }
    //make an API here to call the list of matched users
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
      setMessages((old) => [...old, message]);
    })
  }, [socket])


  function sendMsg(e) {
    e.preventDefault();
    let msgObj = {
      room: room, 
      sender: from, 
      data: msg, 
      sender_name: userName
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
