import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Button, Typography, TextField, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import logo from '../assets/bearLogo.png'

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
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
    logoContainer: {
        padding: 2,
        display: 'flex',
        flexDirection: 'row',
        width: 300,
    },
    formContainer: {
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0px 4px rgba(0, 0, 0, 0.3)',
        borderRadius: 4,
    },
}
/**
 * @component
 * LogIn Component
 *      This Log In component is what you will see upon initial render. It takes in a username and password in which 
 *      the /api/login route is called that verifies that these are valid and existing credentials. If the user does
 *      not have an account, there is a link that when clicked on, will redirect the user to the sign up page. 
 * 
 */
export default function LogIn() {
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false)
    const [loginError, setLoginError] = useState(false)
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['jwt'])
    const handleSubmit = async (event) => {
        event.preventDefault()
        const username = event.target.elements.username.value
        const password = event.target.elements.password.value
        const data = {
            username,
            password
        }

        let requestObj = {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors',
        }

        const response = await fetch('/api/login', requestObj)
        if (response.status === 200) {
            const responseObj = await response.json()
            setCookie('jwt', responseObj.jwt, { path: '/' })
            // store user object in user's browser
            localStorage.setItem('user', JSON.stringify(responseObj.user))
            const cookies = document.cookie
            // navigate to explore if successful
            navigate('/Explore')
        } else {
            //have to try again -> bad login
            setLoginError(true);
        }
    }
    return (
        //all the styles are defined above as a constant variable
        <Box sx={styles.root}>
            <Box sx={styles.rowContainer}>
                <Box sx={styles.logoContainer}>
                    <img src={logo} alt="Logo" style={styles.logo} />
                    <Typography sx={styles.title}>FLANNEL</Typography>
                </Box>
            </Box>
            <Box sx={styles.formContainer}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
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
                    {/* see handleSubmit() function at line 58, button press triggers an event */}
                    <Button variant="outlined" type="submit" style={{ padding: '10px' }}>
                        Sign In!
                    </Button>
                    <Typography>
                        <Link to="/SignUp">Create an Account</Link>
                    </Typography>
                </form>
            </Box>
        </Box>
    )
}