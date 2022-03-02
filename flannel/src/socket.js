import socketio from "socket.io-client"
import React from 'react'

// const port = process.env.PORT || 3000;
const PROD = 1;
let host = "http://localhost:3000/"
if (PROD === 1) {
  host = "https://flannel-ucla.herokuapp.com/";
}
console.log('host is: ', host);

export const socket = socketio(host, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "socket"
    }
});
export const SocketContext = React.createContext();