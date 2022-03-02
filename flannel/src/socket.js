import socketio from "socket.io-client"
import React from 'react'


export const socket = socketio({
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "socket"
    }
});
export const SocketContext = React.createContext();