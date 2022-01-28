import React from "react";
import {Button, FormControl, InputLabel,Input, Select, MenuItem, TextField} from '@mui/material'
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
        alert("hello")
    }
    return(
        <div style = {{backgroundColor: "#F5F5DC", width: "100vw", minHeight: "100vh",display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
            <div>
                <h1 style={{textAlign:"center"}}>Create an Account</h1>
            </div>
            <div style = {{ display: "flex", flexDirection:"row", justifyContent:"space-around"}}>
                <div style = {{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                    <div></div>
                    <form style = {{display:"flex",flexDirection:"row",backgroundColor:"white",borderRadius:"5%"}}>
                        <div style = {{padding:"2px",display:"flex",flexDirection:"column"}}>
                            <FormControl style={{padding:"10px"}}>
                                <InputLabel>Name</InputLabel>
                                <Input></Input>
                            </FormControl>
                            <FormControl style={{padding:"10px"}}>
                                <InputLabel>School Year</InputLabel>
                                <Select label="schoolYear">
                                    <MenuItem value={"freshman"}>Freshman</MenuItem>
                                    <MenuItem value={"Sophmore"}>Sophmore</MenuItem>
                                    <MenuItem value={"Junior"}>Junior</MenuItem>
                                    <MenuItem value={"Senior"}>Senior</MenuItem>
                                    <MenuItem value={"Senior+"}>Senior+</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{padding:"10px"}}>
                                <InputLabel>Major</InputLabel>
                                <Input></Input>
                            </FormControl>
                            <FormControl style={{padding:"10px"}}>
                                <InputLabel>Email</InputLabel>
                                <Input></Input>
                            </FormControl>
                            <FormControl style={{padding:"10px"}}>
                                <InputLabel>Password</InputLabel>
                                <Input></Input>
                            </FormControl>
                            <FormControl style={{padding:"10px"}}>
                                <InputLabel>Confirm Password</InputLabel>
                                <Input></Input>
                            </FormControl>
                        </div>
                        <div style = {{padding:"2px",display:"flex",flexDirection:"column"}}>
                            <FormControl style={{padding:"10px"}}>
                                <InputLabel>Profile Picture</InputLabel>
                                <Input style = {{padding:"5px"}} type = "file"/>
                            </FormControl>
                            <FormControl style={{padding:"10px"}}>
                                <InputLabel>Hometown</InputLabel>
                                <Input />
                            </FormControl>                    
                            <FormControl style={{padding:"10px"}}>
                                <InputLabel>Pronouns</InputLabel>
                                <Select label="schoolYear">
                                    <MenuItem value={"he"}>He/Him/His</MenuItem>
                                    <MenuItem value={"she"}>She/Her/Hers</MenuItem>
                                    <MenuItem value={"they"}>They/Them/Theirs</MenuItem>
                                </Select>
                            </FormControl>                    
                            <FormControl style={{padding:"10px"}}>
                                <TextField
                                    placeholder="Tell us a little about yourself!"
                                    multiline
                                    rows={5}
                                    maxRows={5}
                                />
                            </FormControl>                    
                            <FormControl style={{display:"flex",flexDirection:"column", padding:"10px"}}>
                                <div>
                                    <p>Social Media Urls</p>
                                </div>
                                <div style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <InstagramIcon></InstagramIcon>
                                    <Input />
                                </div>
                                <div style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <FacebookIcon></FacebookIcon>
                                    <Input />
                                </div>
                                <div style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <TwitterIcon></TwitterIcon>
                                    <Input />
                                </div>
                                <div style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                    <LinkedInIcon></LinkedInIcon>
                                    <Input />
                                </div>
                            </FormControl>
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
        // <section className = 'hero is-fullheight is-primary'>
        //     {/* <div className = "tile is-ancestor hero-body"> */}
        //     <div className="columns is-multiline is-vcentered">
        //         <div className="column is-12">
        //             <h1 className="has-text-centered title is-1">Create an Account</h1>
        //         </div>
        //         <div className="column is-11">
        //             <form action = "" className = "">
        //                 <div className = "column is-12">
        //                     <h2 className="title is-2">Tell us a little about you!</h2>
        //                 </div>
        //                 <div class="field is-horizontal">
        //                     <div class="field-label is-normal">
        //                         <label class="label">Full Name</label>
        //                     </div>
        //                     <div class="field-body">
        //                         <div className="field">
        //                             <div className="control">
        //                                 <input className="input" type="text" placeholder="Firstname Lastname" required />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="field is-horizontal">
        //                     <div class="field-label is-normal">
        //                         <label class="label">School Year</label>
        //                     </div>
        //                     <div class="field-body">
        //                         <div class="field">
        //                             <div className="control">
        //                                 <div className = "select">
        //                                     <select>
        //                                         <option>Freshman</option>
        //                                         <option>Sophmore</option>
        //                                         <option>Junior</option>
        //                                         <option>Senior</option>
        //                                         <option>Senior+</option>
        //                                         <option>Graduated</option>
        //                                     </select>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="field is-horizontal">
        //                     <div class="field-label is-normal">
        //                         <label class="label">Major</label>
        //                     </div>
        //                     <div class="field-body">
        //                         <div class="field">
        //                             <div className = "control">
        //                                 <input className = "input" type="text" placeholder = "Computer Science" required/>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="field is-horizontal">
        //                     <div class="field-label is-normal">
        //                         <label class="label">Email</label>
        //                     </div>
        //                     <div class="field-body">
        //                         <div class="field">
        //                             <div className = "control">
        //                                 <input className = "input" type="Email" placeholder = "asdf@gmail.com" required/>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="field is-horizontal">
        //                     <div class="field-label is-normal">
        //                         <label class="label">Password</label>
        //                     </div>
        //                     <div class="field-body">
        //                         <div class="field">
        //                             <div className = "control">
        //                                 <input className = "input" type="password" placeholder = "password" required/>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="field is-horizontal">
        //                     <div class="field-label is-normal">
        //                         <label class="label">Confirm Password</label>
        //                     </div>
        //                     <div class="field-body">
        //                         <div class="field">
        //                             <div className = "control">
        //                                 <input className = "input" type="password" placeholder = "password" required/>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="column is-12">
        //                     <h2 className=" title is-2">Tell us about what you're interested in!</h2>
        //                 </div>
        //                 <div class="field is-horizontal">
        //                     <div class="field-label is-normal">
        //                         <label class="label">Classes</label>
        //                     </div>
        //                     <div class="field-body">
        //                         <div className="field">
        //                             <div className="control">
        //                                 <div className = "select">
        //                                     <select>
        //                                         <option>CS130</option>
        //                                     </select>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="field is-horizontal">
        //                     <div class="field-label is-normal">
        //                         <label class="label">Interests</label>
        //                     </div>
        //                     <div class="field-body">
        //                         <div className="field">
        //                             <div className="control">
        //                                 <div className = "select">
        //                                     <select>
        //                                         <option>Rocket League</option>
        //                                     </select>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="field is-horizontal">
        //                     <div class="field-label is-normal">
        //                         <label class="label">Affiliations</label>
        //                     </div>
        //                     <div class="field-body">
        //                         <div className="field">
        //                             <div className="control">
        //                                 <div className = "select">
        //                                     <select>
        //                                         <option>ACM</option>
        //                                     </select>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="column">
        //                     <button className="button is-danger">
        //                         Create Account
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </section>
    )
};

export default SignUp;

                