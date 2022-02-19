import React, {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {Button, FormControl, InputLabel,Input, Select, MenuItem, TextField,Box,Typography} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ChipFilter from '../components/ChipFilter'
import { useCookies } from 'react-cookie';
import logo from '../assets/bearLogo.png'
import { useLabels } from '../utils/useLabelsHook'

const styles = {
    root: {
        display:"flex",
        flexDirection: "column",
        alignItems:"center",
        padding: 3
    },
    rowContainer:{
        display:"flex",
        flexDirection:"row",
        width:"95%"
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
    formContainer:{
        padding:5,
        display:"flex",
        flexDirection:"row",
        boxShadow: '0 0px 4px rgba(0, 0, 0, 0.3)',
        borderRadius: 4,
    },
    formColumn:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around"
    },
}

function SignUp(){
    const [schoolYear,setSchoolYear] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [pronouns,setPronouns] = useState("");
    const [signupError,setSignupError] = useState(false);

    //selected tags
    const [selectedClassTags,setSelectedClassTags] = useState([]);
    const [selectedAffiliationTags,setSelectedAffiliationTags] = useState([]);
    const [selectedInterestTags,setSelectedInterestTags] = useState([]);

    //available tag options
    const [classesTagOptions, setClassesTagOptions] = useState([])
    const [interestsTagOptions, setInterestsTagOptions] = useState([])
    const [affiliationsTagOptions, setAffiliationsTagOptions] = useState([])

    // get labels from useLabels hook
    const { classes: classesLabels, interests: interestsLabels, affiliations: affiliationLabels } = useLabels();

    const navigate = useNavigate();
    useEffect(() => {
        setClassesTagOptions(classesLabels);
        setInterestsTagOptions(interestsLabels);
        setAffiliationsTagOptions(affiliationLabels);
    }, [classesLabels, interestsLabels, affiliationLabels])

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

        if (password !== confirmPassword){
            setSignupError(true);
        }
        else{
            setSignupError(false);
            const data = {
                "name":name,
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
                "classes": selectedClassTags,
                "interests":selectedInterestTags,
                "affiliations":selectedAffiliationTags
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
                localStorage.setItem('user', JSON.stringify(responseObj.user));
                const cookies = document.cookie;
                navigate('/Explore');
            } else if (response.status === 400) {
                console.log('bad response');
            }
        }
    }
    
    return(
        <Box sx = {styles.root}>
            <Box sx = {styles.rowContainer}>
                <Box sx = {styles.logoContainer}>
                    <img src={logo} alt="Logo" style={styles.logo} />
                    <Typography sx={styles.title}>FLANNEL Sign Up</Typography>
                </Box>
            </Box>
            <form onSubmit = {handleFormSubmit}>
                <Box sx = {styles.formContainer}>
                    <Box sx= {styles.formColumn}>
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
                        <TextField required label = "Password" id = "password"
                            type = "password"
                            style = {{padding:"5px"}}
                        />
                        {
                            signupError && (
                                <p style = {{color:"red"}}>Make sure passwords match</p>
                            )
                        }
                        <TextField required label = "Confirm Password" id ="confirmPassword"
                            type = "password"
                            style = {{padding:"5px"}}
                        />
                    </Box>
                    <Box sx = {styles.formColumn}>
                        <TextField label = "Hometown" style = {{padding:"10px"}} id = "hometown"/>                 
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
                    </Box>
                    <Box sx = {styles.formColumn}>
                        <ChipFilter
                            setTagOptions={setClassesTagOptions}
                            type="Classes"
                            tagOptions={classesTagOptions}
                            defaultShownTags={[]}
                            setSelectedTags = {setSelectedClassTags}
                            selectedTags = {selectedClassTags}
                        />
                        <ChipFilter
                            setTagOptions={setInterestsTagOptions}
                            type="Interests"
                            tagOptions={interestsTagOptions}
                            defaultShownTags={[]}
                            setSelectedTags = {setSelectedInterestTags}
                            selectedTags = {selectedInterestTags}
                        />
                        <ChipFilter
                            setTagOptions={setAffiliationsTagOptions}
                            type="Affiliations"
                            tagOptions={affiliationsTagOptions}
                            defaultShownTags={[]}
                            setSelectedTags = {setSelectedAffiliationTags}
                            selectedTags = {selectedAffiliationTags}
                        />
                    </Box>
                </Box>
            <Button fullWidth variant = "contained" color = "success" type="submit" >Register</Button>
            </form>
        </Box>
    )
}

export default SignUp;

                