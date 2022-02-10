const express = require('express');
const path = require('path');
let client = require('./db');
const socketio = require('socket.io');
const http = require('http')
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var cors = require('cors')

dotenv.config();

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

const indexRouter = require('./routes/index');
let loginRouter = require('./routes/api/login');
const userRouter = require('./routes/api/match/users');
const labelRouter = require('./routes/api/match/labels');
const { isObject } = require('util');

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use((req, res, next)=>{  
  res.setHeader("Access-Control-Allow-Origin", "*");  
  res.setHeader(  
    "Access-Control-Allow-Headers",  
    "Origin, X-Requested-With, Content-Type, Accept, Cookie, Authorization");  
    res.setHeader("Access-Control-Allow-Methods",  
    "GET, POST, PATCH, DELETE, OPTIONS");  
  next();  
});  

app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/label', labelRouter);
app.use(express.static(path.join(__dirname, 'public')));



server.listen(port, () => {
    console.log("server is running!");
})


client.connect(`mongodb+srv://flannel:${process.env.DATABASE_PWD}@cluster0.elmnm.mongodb.net/flannel?retryWrites=true&w=majority`, (err) => {
  if(err)
  {
    console.log("error connecting to db");
    process.exit(1);
  }
  else 
  {
    console.log("connected to database");
  }
})

//on client connection 
io.on('connection', socket => {
  let messages = client.db('flannel').collection('messages');

  socket.on('leaveRoom', ({room}) => {
    if (room !== "") {
      console.log("leave room: ", room);
      socket.leave(room);
    }
  })

  socket.on('joinRoom', ({username, room}) => {
    if(room === "")
      return;
    console.log("join room: ", room);
    socket.join(room); //when we join the room, send the user the entire chat history to render 
    messages.find({"roomName": room}).toArray(function (err, document) {
      let messageHistory = document; //can change this later 
      messageHistory.forEach((item) => {delete item._id; delete item.roomName;})
      messageHistory.sort(function(l, r) {
        return l.timeStamp > r.timeStamp
      })
      io.to(room).emit('messageHistory', messageHistory);
    })
  });

  socket.on('chat', msg => {
    const msgObj = JSON.parse(msg);
    let currentRoom = msgObj.room; //need to get whatever room the user is in
    let sender = msgObj.sender;
    let sender_name = msgObj.sender_name;
    let currentMsg = msgObj.data; //will change this later
    let currentTime = Date.now();
    console.log("Emit: ", currentMsg)
    //save the message to our database 
    messages.insertOne(
      {
        "roomName": currentRoom, 
        "sender": sender, 
        "sender_name": sender_name,
        "timeStamp": currentTime,
        "msg": currentMsg
      }, 
      function(err, res) {
        if(err) {
          console.log(err)
        }
        io.to(currentRoom).emit('message', {"msg": currentMsg, "timeStamp": currentTime, "sender": sender, "sender_name": sender_name}); //send the message to the room 
    })
  })

})
