import React, {useState} from "react";
import {Link} from "react-router-dom";
import {IconButton,Button, Typography, TextField, FormControl, InputLabel,Input} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import "../App.css"

function LogIn(){
    const [isExpanded,setIsExpanded] = useState(false);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [loginError,setLoginError] = useState(false);
    function handleSubmit(){
        console.log(username);
        console.log(password);
        setLoginError(!loginError);
        //prolly just input api verification call right here
    }
    return(
        <div style = {{ backgroundColor: "#F5F5DC", width: "100vw", minHeight: "100vh",display: "flex", flexDirection:"row", justifyContent:"space-between"}}>  
            <div></div>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                <div>
                    <Typography style = {{fontFamily:"-apple-system", fontSize:60,fontWeight:"bold",textAlign:"center"}}>Flannel</Typography>
                </div>
                <div>
                    <form style = {{display:"flex",flexDirection:"column",padding:"70px",backgroundColor:"white",borderRadius:"5%"}}>
                        <h1 style ={{textAlign:"center",fontFamily:"Work Sans",fontSize:40,fontWeight:"bold"}}>Sign In</h1>
                        <TextField
                            required
                            label = "Username"
                            value = {username}
                            style = {{padding:"5px"}}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            error = {loginError}
                            />
                        <TextField
                            required
                            style = {{padding:"5px"}}
                            type = "password"
                            value = {password}
                            onChange = {(e) =>{
                                setPassword(e.target.value);
                                }
                            }
                            error = {loginError}
                            label = "Password" 
                        />
                        {loginError && 
                            (<p style ={{color:"red"}}>
                                Username or Password is incorrect
                            </p>)
                        }
                        <Button variant="outlined" onClick={handleSubmit} style={{padding:"10px"}}>Sign In!</Button>
                        <Typography style = {{padding:"5px"}}>
                            <Link to ="/SignUp">Create an Account</Link>
                        </Typography>
                        <Typography style = {{padding:"5px"}}>
                            Forgot Your Password?
                            <IconButton
                                size="medium"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {!isExpanded && <ExpandMoreIcon />}
                                {isExpanded && <ExpandLessIcon />}
                            </IconButton>
                        </Typography>
                        {isExpanded && (
                            <div>
                                <form style = {{display:"flex", flexDirection: "column"}}>
                                    <FormControl>
                                        <InputLabel>Email</InputLabel>
                                        <Input />
                                    </FormControl>
                                    <Button variant="outlined" onClick = {() => alert("Check this email for password recovery instructions")}>Recover</Button>
                                </form>
                            </div>
                        )}
                        
                    </form>
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