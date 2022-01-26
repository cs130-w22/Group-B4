import React from 'react'
import '../../styles/fonts.css'
import { Typography, Box } from '@mui/material'

import UserCard from './UserCard'

const style = {
    root: {
        position: 'relative',
        minHeight: '100vh',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        marginTop: 2,
    },
    title: {
        fontFamily: 'Work Sans',
        fontSize: 35,
        fontWeight: 'bold',
    },
}

export default function ExploreScreen() {
    return (
        <Box sx={style.root}>
            {/* TODO: Complete rest of Explore Page */}
            <Typography sx={style.title}>Explore Page</Typography>
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
    )
}
