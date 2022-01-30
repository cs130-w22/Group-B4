import React, {useState} from "react";
import {Link} from "react-router-dom";
import {IconButton,Button, Typography, TextField, FormControl, InputLabel,Input} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import "../App.css"

function LogIn(){
    const [isExpanded,setIsExpanded] = useState(false);
    const [loginError,setLoginError] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        setLoginError(!loginError);
        //prolly just input api verification call right here
    }
    const recoveryEmailMethod = (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        alert("Password recovery instructions have been sent to your email");
    }
    return(
        <div style = {{ backgroundColor: "#F5F5DC", width: "100vw", minHeight: "100vh",display: "flex", flexDirection:"row", justifyContent:"space-between"}}>  
            <div></div>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                <div>
                    <Typography style = {{fontFamily:"-apple-system", fontSize:60,fontWeight:"bold",textAlign:"center"}}>Flannel</Typography>
                </div>
                <div style = {{display:"flex",flexDirection:"column",backgroundColor:"white",borderRadius:"5%",padding:"70px"}}>
                    <form onSubmit = {handleSubmit} style = {{display:"flex",flexDirection:"column"}}>
                        <h1 style ={{textAlign:"center",fontFamily:"Work Sans",fontSize:40,fontWeight:"bold"}}>Sign In</h1>
                        <TextField
                            required
                            id="username"
                            label = "Username"
                            style = {{padding:"5px"}}
                            error = {loginError}
                            />
                        <TextField
                            required
                            id = "password"
                            style = {{padding:"5px"}}
                            type = "password"
                            error = {loginError}
                            label = "Password" 
                        />
                        {loginError && 
                            (<p style ={{color:"red"}}>
                                Username or Password is incorrect
                            </p>)
                        }
                        <Button variant="outlined" type="submit" style={{padding:"10px"}}>Sign In!</Button>
                        <Typography>
                            <Link to ="/SignUp">Create an Account</Link>
                        </Typography>
                        <Typography>
                            Forgot Your Password?
                            <IconButton
                                size="medium"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {!isExpanded && <ExpandMoreIcon />}
                                {isExpanded && <ExpandLessIcon />}
                            </IconButton>
                        </Typography>
                    </form>
                    {isExpanded && (
                        <form onSubmit = {recoveryEmailMethod} style = {{display:"flex",flexDirection:"column"}}>
                                <TextField 
                                    type = "text" 
                                    id = "email"
                                    label = "Email"
                                /> 
                                <Button variant="outlined" type = "submit">Recover</Button>
                        </form>
                        )}
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div></div>
        </div>
    )
}
export default LogIn;