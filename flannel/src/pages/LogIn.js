import React, {useState} from "react";
import {Link} from "react-router-dom";
import {IconButton,Button, Typography, FormControl, InputLabel,Input} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import "../App.css"

function LogIn(){
    const [isExpanded,setIsExpanded] = useState(false);
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
                        <FormControl style ={{padding:"20px"}}>
                            <InputLabel>Username</InputLabel>
                            <Input />
                        </FormControl>  
                        <FormControl style ={{padding:"20px"}}>
                            <InputLabel>Password</InputLabel>
                            <Input />
                        </FormControl>  
                        <Button variant="outlined" type = "submit" style={{padding:"10px"}}>Sign In!</Button>
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
        // <div>
        // <Button>Hello</Button>
        // <section className = 'hero is-fullheight is-primary'>
        //     <div className = "tile is-ancestor hero-body">
        //         <div className = "tile is-parent"></div>
        //         <div className = "tile is-parent">
        //             <div className = "tile is-child">
        //             <h1 className="title has-text-danger is-size-1 has-text-centered">FLANNEL</h1>
        //             <form action="" className="box">
        //                 <h1 className="title has-text-black has-text-centered">Welcome!</h1>
        //                 <div className = "field" >
        //                     <label htmlFor="" className="label">Email</label>
        //                     <div className="control">
        //                         <input className="input" type="email" placeholder="e.g. bobsmith@gmail.com" required />
        //                     </div>
        //                 </div>
        //                 <div className = "field">
        //                     <label htmlFor="" className="label">Password</label>
        //                     <div className="control">
        //                         <input type="password" placeholder="*************" className="input" required />
        //                     </div>
        //                 </div>
        //                 <div className="field">
        //                     <button className="button is-danger">
        //                         Login
        //                     </button>
        //                 </div>
        //                 <div>
        //                     <Link to="/SignUp">Click to Sign Up!</Link>
        //                 </div>
        //             </form>
        //             </div>
        //         </div>
        //         <div className = "tile is-parent"></div>
        //     </div>
        // </section>
        // </div>
    )
}

export default LogIn;