import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Typography, Box, ButtonBase, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import UserCard from './UserCard'
import ChipFilter from '../ChipFilter'
import logo from '../../assets/bearLogo.png'
import '../../styles/fonts.css'

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
}

export default function ExplorePage() {
    const classes = useStyles()
    //selected tags
    const [selectedClassTags,setSelectedClassTags] = useState([]);
    const [selectedAffiliationTags,setSelectedAffiliationTags] = useState([]);
    const [selectedInterestTags,setSelectedInterestTags] = useState([]);

    //available tag options
    const [classesTagOptions, setClassesTagOptions] = useState([])
    const [interestsTagOptions, setInterestsTagOptions] = useState([])
    const [affiliationsTagOptions, setAffiliationsTagOptions] = useState([])


    useEffect(() => {
        setClassesTagOptions(['CS 31', 'MATH 32A', 'PHYSICS 1A', 'BIO 1'])
        setInterestsTagOptions(['Biking', 'Skating', 'Dancing'])
        setAffiliationsTagOptions(['Theta Chi', 'DevX', 'GlobeMed', 'Climbing Club'])
    }, [])
    return (
        <Box sx={style.root}>
            <Box sx={style.rowContainer}>
                <Box sx={style.logoContainer}>
                    <img src={logo} alt="Logo" style={style.logo} />
                    <Typography sx={style.title}>FLANNEL</Typography>
                </Box>
                <TextField
                    sx={style.searchBarContainer}
                    placeholder="Search for Users"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        //disableUnderline: true,
                        classes: {
                            input: classes.inputText,
                        },
                        endAdornment: (
                            <ButtonBase type="submit">
                                <SearchIcon />
                            </ButtonBase>
                        ),
                    }}
                    size="small"
                />
            </Box>
            <Box sx={style.rowContainer}>
                <Box sx={style.filterSidebar}>
                    <Typography sx={style.filterTitle}>Filters</Typography>
                    <ChipFilter
                        setTagOptions={setClassesTagOptions}
                        type="Classes"
                        tagOptions={classesTagOptions}
                        defaultShownTags={['CS 130', 'CS 118', 'CS 151B']}
                        setSelectedTags = {setSelectedClassTags}
                        selectedTags = {selectedClassTags}
                    />
                    <ChipFilter
                        setTagOptions={setInterestsTagOptions}
                        type="Interests"
                        tagOptions={interestsTagOptions}
                        defaultShownTags={['Bouldering', 'Netflix', 'Gym', 'Reading']}
                        setSelectedTags = {setSelectedInterestTags}
                        selectedTags = {selectedInterestTags}
                    />
                    <ChipFilter
                        setTagOptions={setAffiliationsTagOptions}
                        type="Affiliations"
                        tagOptions={affiliationsTagOptions}
                        defaultShownTags={['Blueprint', 'UPE', 'NSU']}
                        setSelectedTags = {setSelectedAffiliationTags}
                        selectedTags = {selectedAffiliationTags}
                    />
                </Box>
                <Box sx={style.exploreBox}>
                    <UserCard
                        displayName="Ryan Tran"
                        year="4th"
                        major="Com Sci"
                        pronouns="he/him"
                        classTags={['COMSCI 31', 'COMSCI 118', 'MATH 32A', 'LA 192', 'ENGR 97']}
                        interestTags={[
                            'Biking',
                            'Skating',
                            'Netflix',
                            'Sports',
                            'Exploring',
                            'Thrifting',
                            'Tunneling',
                        ]}
                        affiliationTags={[
                            'DevX',
                            'Intermural Soccor',
                            'Blueprint',
                            'MentorSEAS',
                            'GlobeMed',
                        ]}
                        bio="The trail to the left had a Danger! Do Not Pass sign telling people to take the trail to the right. This wasn't the way Zeke approached his hiking. Rather than a warning, Zeke read the sign as an invitation to explore an area that would be adventurous and exciting. As the others in the group all shited to the right, Zeke slipped past the danger sign to begin an adventure he would later regret."
                    />
                    <UserCard
                        displayName="Ishaan Shah"
                        year="3rd"
                        major="Anthro"
                        pronouns="he/him"
                        classTags={['DIGHUM 1', 'COGSCI 20', 'CHEM 28']}
                        affiliationTags={['Unicamp', 'CEC', 'SAA', 'LA Hacks']}
                        interestTags={['Concerts', 'Surfing', 'Reading', 'Community Service']}
                        bio="Cake or pie? I can tell a lot about you by which one you pick. It may seem silly, but cake people and pie people are really different. I know which one I hope you are, but that's not for me to decide. So, what is it? Cake or pie?"
                    />
                    <UserCard
                        displayName="Brandon Chi"
                        year="4th"
                        major="Math"
                        pronouns="he/him"
                        classTags={['Math 111', 'Math 31B', 'COMSCI M148']}
                        interestTags={['Food', 'Gymming', 'Climbing', 'Swimming', 'Reading']}
                        affiliationTags={['Intermural Basketball', 'UPE', 'ACM', 'TeachLA']}
                        bio="However, the gardener's life is turned upside down when she goes to an engagement party in Sleepford where there are peculiar giants that like to fire each other."
                    />
                </Box>
            </Box>
        </Box>
    )
}
