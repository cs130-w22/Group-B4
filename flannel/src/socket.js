import socketio from "socket.io-client"
import React from 'react'

// const port = process.env.PORT || 3000;
const host = "http://localhost:3000"
if (process.env.PROD === '1') {
  host = location.origin;
}
export const socket = socketio(host, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "socket"
    }
});
export const SocketContext = React.createContext();