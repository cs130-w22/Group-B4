import React, {useState} from "react";
import {Button, FormControl, InputLabel,Input, Select, MenuItem, TextField, FormGroup} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ChipFilter from '../components/ChipFilter'

function SignUp(){
    const classList = [
        {label:"CS130"},
        {label:"CS118"},
        {label:"CS131"},
        {label:"CS111"}
    ];
    const affiliationsList = [
        {label: "DevX"},
        {label: "Bruin Racing"},
        {label: "ACM"},
        {label: "UPE"}
    ];
    const interestList = [
        {label: "Hiking"},
        {label: "Swimming"},
        {label: "Gymming"},
        {label: "Walking"}
    ]

    const handleFormSubmit = () =>{
        setSignupError(!signupError);
    }
    const [name,setName] = useState("");
    const [schoolYear,setSchoolYear] = useState("");
    const [major,setMajor] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [hometown,setHometown] = useState("");
    const [pronouns,setPronouns] = useState("");
    const [bio,setBio] = useState("");
    const [insta,setInsta] = useState("");
    const [facebook,setFacebook] = useState("");
    const [twitter,setTwitter] = useState("");
    const [linkedIn,setLinkedIn] = useState("");
    const [signupError,setSignupError] = useState(false);

    return(
        <div style = {{backgroundColor: "#F5F5DC", width: "100vw", minHeight: "100vh",display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
            <div>
                <h1 style={{textAlign:"center"}}>Create an Account</h1>
            </div>
            <div style = {{ display: "flex", flexDirection:"row", justifyContent:"space-around"}}>
                <div style = {{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                    <div></div>
                    <form style = {{display:"flex",flexDirection:"row",backgroundColor:"white",borderRadius:"5%"}}>
                        <div style = {{padding:"2px",display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
                            <TextField required label = "Full Name" value = {name}
                                style = {{padding:"5px"}}
                                onChange = {(e) =>{
                                    setName(e.target.value);
                                }}
                                error = {signupError && name === ""}
                            />
                            <FormControl style={{padding:"5px"}}>
                                <InputLabel>School Year</InputLabel>
                                <Select value = {schoolYear} onChange = {(e,item) => {setSchoolYear(item.props.value)}} error = {signupError && schoolYear === ""} label="schoolYear">
                                    <MenuItem value={"Freshman"}>Freshman</MenuItem>
                                    <MenuItem value={"Sophmore"}>Sophmore</MenuItem>
                                    <MenuItem value={"Junior"}>Junior</MenuItem>
                                    <MenuItem value={"Senior"}>Senior</MenuItem>
                                    <MenuItem value={"Senior+"}>Senior+</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField required label = "Major" value = {major}
                            style = {{padding:"5px"}}
                                onChange = {(e) => {
                                    setMajor(e.target.value);
                                }}
                                error = {signupError && major === ""}    
                            />
                            <TextField required label = "Email" value = {email}
                            style = {{padding:"5px"}}
                                onChange = {(e) => {
                                    setEmail(e.target.value);
                                }}
                                error = {signupError && email === ""}    
                            />
                            <TextField required label = "Password" value = {password}
                            style = {{padding:"5px"}}
                                onChange = {(e) => {
                                    setPassword(e.target.value);
                                }}
                                error = {signupError && (password === "" || password !== confirmPassword) }    
                            />
                            <TextField required label = "Confirm Password" value = {confirmPassword}
                            style = {{padding:"5px"}}
                                onChange = {(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                error = {signupError && (confirmPassword === "" || password !== confirmPassword) }  
                            />
                        </div>
                        <div style = {{padding:"2px",display:"flex",flexDirection:"column"}}>
                            <FormControl style={{padding:"10px"}}>
                                <InputLabel>Profile Picture</InputLabel>
                                <Input style = {{padding:"5px"}} type = "file"/>
                            </FormControl>
                            <TextField label = "Hometown" value ={hometown} style = {{padding:"10px"}}
                                onChange = {(e) => {
                                    setHometown(e.target.value);
                                }}
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
                                style = {{padding:"10px"}}
                                placeholder="Tell us a little about yourself!"
                                value = {bio}
                                onChange = {(e) => {setBio(e.target.value)}}
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
                                        value = {insta}
                                        onChange = {(e) => {setInsta(e.target.value)}}
                                    />
                                </div>
                                <div style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <FacebookIcon></FacebookIcon>
                                    <Input style = {{padding:"10px"}} 
                                        value = {facebook}
                                        onChange = {(e) => {setFacebook(e.target.value)}}
                                    />
                                </div>
                                <div style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <TwitterIcon></TwitterIcon>
                                    <Input style = {{padding:"10px"}} 
                                        value = {twitter}
                                        onChange = {(e) => {setTwitter(e.target.value)}}
                                    />
                                </div>
                                <div style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <LinkedInIcon></LinkedInIcon>
                                    <Input style = {{padding:"10px"}} 
                                        value = {linkedIn}
                                        onChange = {(e) => {setLinkedIn(e.target.value)}}
                                    />
                                </div>
                            </div>
                            <div style={{padding:"10px"}}>
                                <Button fullWidth variant = "contained" color = "success" onClick={handleFormSubmit}>Register</Button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1>Classes</h1>
                                <ChipFilter type ="Classes" listType = {classList} />
                            </div>
                            <h1>Interests</h1>
                                <ChipFilter type = "Interests" listType ={interestList}/>
                            <h1>Affliations</h1>
                                <ChipFilter type ="Affiliations" listType = {affiliationsList}/>
                        </div>
                    </form>
                    <div></div>
                </div>
            </div>
        </div>
    )
};

export default SignUp;

                