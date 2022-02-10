import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    IconButton,
    Button,
    Typography,
    TextField
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import '../App.css'

function LogIn() {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [cookies, setCookie] = useCookies(['jwt'])
    const handleSubmit = async (event) => {
        navigate('/Explore')
        event.preventDefault()
        const username = event.target.elements.username.value
        const password = event.target.elements.password.value
        setLoginError(!loginError)

        const data = {
            username,
            password,
        }

        let requestObj = {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        const response = await fetch('http://localhost:3000/login', requestObj)
        const responseObj = await response.json()
        setCookie('jwt', responseObj.jwt, { path: '/' })
        if (response.status === 200) {
            const cookies = document.cookie
            requestObj = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: cookies,
                },
            }
            // console.log('here');
            const labels = await fetch(`http://localhost:3000/label/getLabels?username=brandon@g.ucla.edu`, requestObj)
            console.log(labels);
            //let users = await userList.json()
        } else { //have to try again -> bad login 
            console.log("bad login")
        }
    }
    const recoveryEmailMethod = (event) => {
        event.preventDefault()
        const email = event.target.elements.email.value
        alert('Password recovery instructions have been sent to your email')
    }
    return (
        <div
            style={{
                backgroundColor: '#F5F5DC',
                width: '100vw',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <div />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <Typography
                        style={{
                            fontFamily: '-apple-system',
                            fontSize: 60,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        Flannel
                    </Typography>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderRadius: '5%',
                        padding: '70px',
                    }}
                >
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <h1
                            style={{
                                textAlign: 'center',
                                fontFamily: 'Work Sans',
                                fontSize: 40,
                                fontWeight: 'bold',
                            }}
                        >
                            Sign In
                        </h1>
                        <TextField
                            required
                            id="username"
                            label="Username"
                            style={{ padding: '5px' }}
                            error={loginError}
                        />
                        <TextField
                            required
                            id="password"
                            style={{ padding: '5px' }}
                            type="password"
                            error={loginError}
                            label="Password"
                        />
                        {loginError && (
                            <p style={{ color: 'red' }}>Username or Password is incorrect</p>
                        )}
                        <Button variant="outlined" type="submit" style={{ padding: '10px' }}>
                            Sign In!
                        </Button>
                        <Typography>
                            <Link to="/SignUp">Create an Account</Link>
                        </Typography>
                        <Typography>
                            Forgot Your Password?
                            <IconButton size="medium" onClick={() => setIsExpanded(!isExpanded)}>
                                {!isExpanded && <ExpandMoreIcon />}
                                {isExpanded && <ExpandLessIcon />}
                            </IconButton>
                        </Typography>
                    </form>
                    {isExpanded && (
                        <form
                            onSubmit={recoveryEmailMethod}
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <TextField type="text" id="email" label="Email" />
                            <Button variant="outlined" type="submit">
                                Recover
                            </Button>
                        </form>
                    )}
                </div>
                <div />
                <div />
                <div />
            </div>
            <div />
        </div>
    )
}
export default LogIn
