import socketio from "socket.io-client"
import React from 'react'

const port = process.env.PORT || 3000;
export const socket = socketio("http://localhost:" + port, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "socket"
    }
});
export const SocketContext = React.createContext();