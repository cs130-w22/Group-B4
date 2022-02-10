import React, {useState} from "react";
import {Button, FormControl, InputLabel,Input, Select, MenuItem, TextField} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ChipFilter from '../components/ChipFilter'
import { useCookies } from 'react-cookie';

function SignUp(){
    const [schoolYear,setSchoolYear] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [pronouns,setPronouns] = useState("");
    const [signupError,setSignupError] = useState(false);
    const [childClassList,setClassList] = useState([]);
    const [childAffiliationList,setAffiliationList] = useState([]);
    const [childInterestList,setInterestList] = useState([]);
    const [cookies, setCookie] = useCookies(['jwt']);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const schoolYear = event.target[2].value;
        const major = event.target.elements.major.value;
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const confirmPassword = event.target.elements.confirmPassword.value;
        const hometown = event.target.elements.hometown.value;
        const pronouns = event.target[14].value;
        const bio = event.target.bio.value;
        const insta = event.target.insta.value;
        const facebook = event.target.facebook.value;
        const twitter = event.target.twitter.value;
        const classes = [];

        childClassList.forEach((currentItem) => {
            classes.push(currentItem.item.label)
        })

        const data = {
            "username": email.toLowerCase(),
            "password": password,
            "year": schoolYear, 
            major, 
            hometown, 
            pronouns, 
            bio, 
            insta, 
            facebook, 
            twitter,
            "interests": classes,
            name
        }
        // INSERT API CALLS HERE FOR LOGIN
        let success = true;
        if (!success){
            setSignupError(!signupError);
        }

        let requestObj = {
            method: 'Post',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data),
        }

        const response = await fetch('http://localhost:3000/login/register', requestObj);
        if(response.status === 201) { //successful login
            let responseObj = await response.json();
            setCookie('jwt', responseObj.jwt, { path: '/' });
        } else if (response.status === 400) {
        }
    }
    
    return(
        <div style = {{backgroundColor: "#F5F5DC", width: "100vw", minHeight: "100vh",display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
            <div>
                <h1 style={{textAlign:"center"}}>Create an Account</h1>
            </div>
            <div style = {{ display: "flex", flexDirection:"row", justifyContent:"space-around"}}>
                <div style = {{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                    <div></div>
                    <form onSubmit = {handleFormSubmit} style = {{display:"flex",flexDirection:"row",backgroundColor:"white",borderRadius:"5%"}}>
                        <div style = {{padding:"2px",display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
                            <TextField required label = "Full Name"
                                id="name"
                                style = {{padding:"5px"}}
                            />
                            <FormControl style={{padding:"5px"}}>
                                <InputLabel>School Year</InputLabel>
                                <Select required value = {schoolYear} onChange = {(e,item) => {setSchoolYear(item.props.value)}} > 
                                    <MenuItem value={"Freshman"}>Freshman</MenuItem>
                                    <MenuItem value={"Sophmore"}>Sophmore</MenuItem>
                                    <MenuItem value={"Junior"}>Junior</MenuItem>
                                    <MenuItem value={"Senior"}>Senior</MenuItem>
                                    <MenuItem value={"Senior+"}>Senior+</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField required label = "Major"  id = "major"
                                style = {{padding:"5px"}} 
                            />
                            <TextField required label = "Email"  id = "email"
                                style = {{padding:"5px"}}
                            />
                            <TextField required label = "Password" value = {password} id = "password"
                                type = "password"
                            style = {{padding:"5px"}}
                                onChange = {(e) => {
                                    setPassword(e.target.value);
                                }}
                                error = {signupError && (password === "" || password !== confirmPassword) }
                            />
                            {
                                password !== confirmPassword && (
                                    <p style = {{color:"red"}}>Make sure passwords match</p>
                                )
                            }
                            <TextField required label = "Confirm Password" value = {confirmPassword} id ="confirmPassword"
                            type = "password"
                            style = {{padding:"5px"}}
                                onChange = {(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                error = {signupError && (confirmPassword === "" || password !== confirmPassword) }  
                            />
                        </div>
                        <div style = {{padding:"2px",display:"flex",flexDirection:"column"}}>
                            <TextField label = "Hometown" style = {{padding:"10px"}} id = "hometown"
                            />                 
                            <FormControl style={{padding:"10px"}}>
                                <InputLabel>Pronouns</InputLabel>
                                <Select value = {pronouns} onChange ={(e,item) => setPronouns(item.props.value)} label="Pronouns">
                                    <MenuItem value={"he"}>He/Him/His</MenuItem>
                                    <MenuItem value={"she"}>She/Her/Hers</MenuItem>
                                    <MenuItem value={"they"}>They/Them/Theirs</MenuItem>
                                </Select>
                            </FormControl>                    
                            <TextField
                                id = "bio"
                                style = {{padding:"10px"}}
                                placeholder="Tell us a little about yourself!"
                                multiline
                                rows={5}
                                maxRows={5}
                            />
                            <div style={{display:"flex",flexDirection:"column", padding:"10px"}}>
                                <div>
                                    <p>Social Media Urls</p>
                                </div>
                                <div style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <InstagramIcon></InstagramIcon>
                                    <Input style = {{padding:"10px"}} 
                                        id = "insta"
                                    />
                                </div>
                                <div style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <FacebookIcon></FacebookIcon>
                                    <Input style = {{padding:"10px"}} 
                                        id = "facebook"
                                    />
                                </div>
                                <div style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <TwitterIcon></TwitterIcon>
                                    <Input style = {{padding:"10px"}} 
                                        id = "twitter"
                                    />
                                </div>
                                <div style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <LinkedInIcon></LinkedInIcon>
                                    <Input style = {{padding:"10px"}} 
                                        id = "LinkedIn"
                                    />
                                </div>
                            </div>
                            <div style={{padding:"10px"}}>
                                <Button fullWidth variant = "contained" color = "success" type="submit" >Register</Button>
                                {
                                    signupError && (<p style = {{color:"red"}}>Please fill out the highlighted fields</p>)
                                }
                            </div>
                        </div>
                        <div>
                            <ChipFilter changeClasses = {setClassList} changeAffiliations = {setAffiliationList} changeInterests = {setInterestList}/>
                        </div>
                    </form>
                    <div></div>
                </div>
            </div>
        </div>
    )
};

export default SignUp;

                