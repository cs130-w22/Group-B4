import './Chat.css'
import './Match.css'
import Match from './Match.js'
import React, { useState, useEffect, useRef } from 'react'
import { socket } from '../socket'
import { Button, Typography, TextField, Box } from '@mui/material'
import logo from '../assets/bearLogo.png'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'


/** 
 * @component
    CHAT COMPONENT: 
        responsible for managing the chat page layout / functionality
 */
function Chat() {
    // eslint-disable-next-line
    const queryParams = new URLSearchParams(window.location.search)
    const from = JSON.parse(localStorage.getItem('user'))._id
    const userName = JSON.parse(localStorage.getItem('user')).username
    const [room, setRoom] = useState('') //(to + "#" + from).split('#').sort().join("#")
    const [users, setUsers] = useState([
        { username: 'Henry', id: '62058ecec54374bc9112fc2d' },
        { username: 'ishaan', id: '6205904f308e7d7d8d84075f' },
        { username: 'chi', id: '6204b3f975b3b558c0c773a0' },
    ])
    const [messages, setMessages] = useState([]) //{"timeStamp": 0, msg: "", sender: ""}
    const messagesEndRef = useRef(null)
    const [dummyInputMessage, setDummyMessage] = useState('')
    useEffect(() => {
        scrollToBottom()
    }, [messages])
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    
    useEffect(async () => {
        const cookies = document.cookie
        let requestObj = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: cookies,
            },
        }

        /*
            when the page loads we fetch a list of all the matches for the given user
            if we get some sort of error, we set our matches list to empty, 
            otherwise we set it to the response from the database 
        */
        const response = await fetch(`/api/user/getMatchesList?username=${userName}`, requestObj)

        if (response.status === 401) {
            setUsers(() => [])
        } else {
            const matchList = await response.json()
            setUsers(() => matchList.matches)
        }

        /*
            when the page loads, we send a message to node.js via socket.io to create a 
            private chat room with the current selected user
        */
        socket.emit('joinRoom', { username: from, room: room })

        /*
            once a user sends a joinRoom message to the server, the server will create the room 
            for the two users, will grab all the past chats between the two users from the database,
            and will then send all of the previous chats to the client

            the client will then update its local chat instance with the chat history returned 
        */
        socket.on('messageHistory', (messageHistory) => {
            let temp = []
            setMessages(() => [])
            messageHistory.forEach((item) =>
                temp.push({
                    timeStamp: item.timeStamp,
                    msg: item.msg,
                    sender: item.sender,
                    sender_name: item.sender_name,
                })
            )
            temp.forEach((item) => {
                setMessages((old) => [...old, item])
            })
        })

        socket.on('message', (message) => {
            setMessages((old) => [...old, message])
        })
    }, [socket])

    
    /*
        this is called when a user hits enter or send message
        it takes the current form message, and sends it to the node 
        server via socket.emit along the 'chat' channel 

        the server will then recieve the new chat, will forward it to the 
        sender specified in the message body, and will save it in the database
    */
    const sendMsg = async (event) => {
        event.preventDefault()
        let msgObj = {
            room: room,
            sender: from,
            data: event.target.elements.name.value,
            sender_name: userName,
        }

        let msgString = JSON.stringify(msgObj)
        socket.emit('chat', msgString)
        setDummyMessage('')
    }

    /*
        this is called whenever a client wants to change who they chat with 
        it sends a leave room message to node server so that current room is closed 
        it then sends a joinRoom message to the node server which creates the new room between 
        the two users, and also emits back the corresponding chat history
    */
    function updateChat(username, userId) {
        socket.emit('leaveRoom', { room: room })
        let tmp_room = (from + '#' + userId).split('#').sort().join('#')
        setRoom(tmp_room)
        socket.emit('joinRoom', { username: from, room: tmp_room })
    }
    const styles = {
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
        },
        chatPage: {
            display: 'flex',
            flexDirection: 'row',
            padding: 5,
            boxShadow: '0 0px 4px rgba(0, 0, 0, 0.3)',
            borderRadius: 4,
            width: '90%',
            justifyContent: 'space-between',
        },
        currentChats: {
            display: 'flex',
            flexDirection: 'column',
            width: '30%',
        },
        messageWindow: {
            display: 'flex',
            flexDirection: 'column',
            width: '70%',
            alignItems: 'center',
        },
        messageList: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',
            height: '600px',
            width: '100%',
            padding: 2,
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        rowContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: '95%',
        },
        title: {
            paddingRight: 2,
            fontFamily: 'Work Sans',
            fontSize: 40,
            marginBottom: 3,
            fontWeight: 'bold',
        },
        senderName: {
            fontFamily: 'Work Sans',
            fontSize: 25,
            fontWeight: 'bold',
        },
        message: {
            boxShadow: '0 0px 4px rgba(0, 0, 0, 0.3)',
            borderRadius: 4,
            width: '70%',
            padding: 3,
        },
        messageContent: {
            fontFamily: 'Work Sans',
            fontSize: 20,
        },
    }

    /*
    gets called when user hits enter, takes the current 
    chat message and creates a chat object that is emitted to the 
    server via socket.io
    */
    const handleKeyDown = (event) => {
        if (event.which === 13) {
            //<------use enter key to submit form
            event.preventDefault()
            let msgObj = {
                room: room,
                sender: from,
                data: event.target.value,
                sender_name: userName,
            }
            let msgString = JSON.stringify(msgObj)
            socket.emit('chat', msgString)
            setDummyMessage('')
        }
    }

    return (
        <Box sx={styles.root}>
            <Box sx={styles.rowContainer}>
                <Box sx={styles.logoContainer}>
                    <img src={logo} alt="Logo" style={styles.logo} />
                    <Typography sx={styles.title}>Chat</Typography>
                </Box>
            </Box>
            <Box sx={styles.chatPage} id="chat_page">
                <Box sx={styles.currentChats} id="current_chats">
                    <Typography sx={styles.title}>People Available to Chat</Typography>
                    {users.map((item, index) => (
                        <Match
                            username={item.username}
                            userId={item.id}
                            key={index}
                            callBack={updateChat}
                        ></Match>
                    ))}
                </Box>
                <Box sx={styles.messageWindow} id="window">
                    <Box sx={styles.messageList}>
                        {messages.map((message, index) => (
                            <Box key={index} sx={styles.message} id="chats">
                                <Typography sx={styles.senderName}>
                                    {message.sender_name + ':'}
                                </Typography>
                                <Typography sx={styles.messageContent}>{message.msg}</Typography>
                                <div ref={messagesEndRef} />
                            </Box>
                        ))}
                    </Box>
                    <form onSubmit={sendMsg} style={{ width: '100%' }} id="chatform">
                        <Box sx={styles.form}>
                            <TextField
                                label="Insert Message"
                                id="name"
                                multiline
                                rows={3}
                                maxRows={3}
                                style={{ padding: '5px' }}
                                onKeyDown={handleKeyDown}
                                InputProps={{
                                    endAdornment: <SendOutlinedIcon />,
                                }}
                                value={dummyInputMessage}
                                onChange={(e) => setDummyMessage(e.target.value)}
                            />
                            <Button type="submit" className="sendmsg">
                                {' '}
                                Send Msg{' '}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default Chat
