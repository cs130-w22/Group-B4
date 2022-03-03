import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { Typography, Box, ButtonBase, TextField, CircularProgress } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import UserCard from './UserCard'
import ChipFilter from '../ChipFilter'
import logo from '../../assets/bearLogo.png'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import '../../styles/fonts.css'
import { useLabels } from '../../utils/useLabelsHook'
import { fetchMatchingUsers } from '../../utils/fetchMatchingUsers'

//These are styles that will be used for the explore page
const useStyles = makeStyles({
    inputText: {
        fontFamily: 'Work Sans',
        fontSize: '15.5px',
        color: '#373737',
        '&::placeholder': {
            fontFamily: 'Work Sans',
            fontSize: '15.5px',
        },
    },
})

//These are styles that will be used for the formatting of the user cards and the page as a whole
const style = {
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
    logoContainer: {
        padding: 2,
        display: 'flex',
        flexDirection: 'row',
        width: 300,
    },
    exploreBox: {
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
    },
    filterSidebar: {
        boxShadow: '0 0px 4px rgba(0, 0, 0, 0.3)',
        borderRadius: 4,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        paddingRight: 2,
        fontFamily: 'Work Sans',
        fontSize: 40,
        marginBottom: 3,
        fontWeight: 'bold',
    },
    filterTitle: {
        fontFamily: 'Work Sans',
        fontSize: 20,
        color: '#373737',
        fontWeight: 400,
        paddingBottom: 2.5,
    },
    searchBarContainer: {
        width: '80%',
        paddingRight: 3.5,
        paddingTop: 2.5,
    },
    logo: {
        width: 50,
        height: 50,
        paddingRight: 10,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-around',
        alignItems: 'baseline',
    },
    headerFill: {
        width: '70%',
    },
    headerNav: {
        display: 'flex',
        alignItems: 'baseline',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}
/**
 *
 * @component
 *      ExplorePage
 *          This component shows the users that have matching tags with the current user. If a user has a matching class,
 *          interest, or affiliation tag as the current user, then their user card will show up. With this, the user can
 *          choose who they want to chat and interact with
 */
export default function ExplorePage() {
    const styles = useStyles()
    //selected tags
    const [selectedClassTags, setSelectedClassTags] = useState([])
    const [selectedAffiliationTags, setSelectedAffiliationTags] = useState([])
    const [selectedInterestTags, setSelectedInterestTags] = useState([])

    //available tag options
    const [classesTagOptions, setClassesTagOptions] = useState([])
    const [interestsTagOptions, setInterestsTagOptions] = useState([])
    const [affiliationsTagOptions, setAffiliationsTagOptions] = useState([])

    const [userList, setUserList] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)

    const { classes, interests, affiliations } = useLabels()
    const navigate = useNavigate()

    // effect to handle getting data from backend at start of application
    useEffect(() => {
        // filter out selected class tags from the options in the drop down
        const classOptions = classes.filter((x) => !selectedClassTags.includes(x))
        const interestOptions = interests.filter((x) => !selectedInterestTags.includes(x))
        const affiliationOptions = affiliations.filter((x) => !selectedAffiliationTags.includes(x))
        // set drop down options
        setClassesTagOptions(classOptions)
        setInterestsTagOptions(interestOptions)
        setAffiliationsTagOptions(affiliationOptions)
        // set page as loaded
        setDataLoaded(true)
    }, [classes, interests, affiliations])

    // handle fetching matching users based on selected criteria
    useEffect(() => {
        async function matchingUsersFunc() {
            let classesLabels, interestsLabels, affiliationsLabels

            if (!dataLoaded) {
                // if we are just starting up, fetch matching users based on user's saved interests
                classesLabels = [...user.classes]
                interestsLabels = [...user.interests]
                affiliationsLabels = [...user.affiliations]
            } else {
                // otherwise fetch based on selected tags
                classesLabels = selectedClassTags
                interestsLabels = selectedInterestTags
                affiliationsLabels = selectedAffiliationTags
            }
            // only make a request if we have selected tags
            if (classesLabels.length || interestsLabels.length || affiliationsLabels.length) {
                const matchingUsers = await fetchMatchingUsers({
                    classesLabels,
                    interestsLabels,
                    affiliationsLabels,
                })

                // if status is 0, there was some error fetching users, assume bad jwt and navigate to login
                if (matchingUsers.status === 0) {
                    navigate('/')
                    return
                }
                // else update user list with matches
                const users = matchingUsers.matchingUsers
                setUserList(() => users)
            } else {
                setUserList(() => [])
            }
        }
        matchingUsersFunc()
    }, [selectedClassTags, selectedInterestTags, selectedAffiliationTags, dataLoaded])
    const user = JSON.parse(localStorage.getItem('user'))
    //if the user desires, they can navigate to their profile page to change data
    const NavigateProfile = () => {
        navigate('/Profile')
    }
    //if the user desires, they can chat with another user that they are matched with
    const NavigateChat = () => {
        navigate('/Chat')
    }
    //if the user has matches, they are shown
    if (dataLoaded) {
        return (
            <Box sx={style.root}>
                <Box sx={style.rowContainer}>
                    <Box sx={style.logoContainer}>
                        <img src={logo} alt="Logo" style={style.logo} />
                        <Typography sx={style.title}>FLANNEL</Typography>
                    </Box>
                    <Box sx={style.header}>
                        <Box sx={style.headerFill} />
                        <Box sx={style.headerNav}>
                            <IconButton onClick={NavigateProfile}>
                                <AccountCircleOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={NavigateChat}>
                                <ChatIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Box sx={style.rowContainer}>
                    <Box sx={style.filterSidebar}>
                        <Typography sx={style.filterTitle}>Filters</Typography>
                        <ChipFilter
                            setTagOptions={setClassesTagOptions}
                            type="Classes"
                            tagOptions={classesTagOptions}
                            defaultShownTags={user.classes}
                            setSelectedTags={setSelectedClassTags}
                            selectedTags={selectedClassTags}
                        />
                        <ChipFilter
                            setTagOptions={setInterestsTagOptions}
                            type="Interests"
                            tagOptions={interestsTagOptions}
                            defaultShownTags={user.interests}
                            setSelectedTags={setSelectedInterestTags}
                            selectedTags={selectedInterestTags}
                        />
                        <ChipFilter
                            setTagOptions={setAffiliationsTagOptions}
                            type="Affiliations"
                            tagOptions={affiliationsTagOptions}
                            defaultShownTags={user.affiliations}
                            setSelectedTags={setSelectedAffiliationTags}
                            selectedTags={selectedAffiliationTags}
                        />
                    </Box>
                    <Box sx={style.exploreBox}>
                        {userList ? (
                            userList.map((currentUser, index) => (
                                <UserCard
                                    key={index}
                                    displayName={currentUser.username}
                                    year={currentUser.year}
                                    major={currentUser.major}
                                    pronouns={currentUser.pronouns}
                                    classTags={currentUser.classes}
                                    interestTags={currentUser.interests}
                                    affiliationTags={currentUser.affiliations}
                                    bio={currentUser.bio}
                                    id={currentUser._id}
                                />
                            ))
                        ) : (
                            <></>
                        )}
                    </Box>
                </Box>
            </Box>
        )
    } else {
        //if the user has no matches or the data is loading, return an empty box
        return (
            <Box sx={style.root}>
                <Box sx={style.rowContainer} style={{ height: '45vh' }}></Box>
                <CircularProgress color="primary" />
            </Box>
        )
    }
}
