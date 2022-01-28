import socketio from "socket.io-client"
import React from 'react'

export const socket = socketio("http://localhost:3000", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "socket"
    }
});
export const SocketContext = React.createContext();