import React, { useState } from 'react'
import { IconButton, Box, Card, CardMedia, Typography, Chip } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import EmailIcon from '@mui/icons-material/Email'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PropTypes from 'prop-types'
import '../../styles/fonts.css'

const profilePicture = require('../../assets/ProfilePicture.jpeg')

const style = {
    cardStyle: {
        borderRadius: '35px',
        fontFamily: 'Work Sans',
        padding: 2,
        filter: 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.2))',
        border: '1px solid #C4C4C4',
        borderLeftWidth: '15px',
        borderLeftColor: '#99C5C4',
        width: '90%',
        marginBottom: 2,
    },
    centeredRowContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    uncenteredRowContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    centeredColumnContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    spaceBetweenContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    tagCategoryContainer: {
        maxWidth: '32%',
        marginLeft: 2,
    },
    classChip: {
        margin: 0.25,
        borderRadius: 3.5,
        backgroundColor: '#BEDDEC',
        fontFamily: 'Work Sans',
        color: '#373737',
        fontWeight: 500,
    },
    interestChip: {
        margin: 0.25,
        borderRadius: 3.5,
        backgroundColor: '#FAC898',
        fontFamily: 'Work Sans',
        color: '#373737',
    },
    affiliationChip: {
        margin: 0.25,
        borderRadius: 3.5,
        backgroundColor: '#C1E1C1',
        fontFamily: 'Work Sans',
        color: '#373737',
    },
    bioBlurb: {
        fontFamily: 'Work Sans',
        fontSize: 10,
        marginTop: 1,
        maxWidth: '60%',
    },
    iconColor: {
        color: '#99C5C4',
    },
    profilePictureCircle: {
        width: 120,
        height: 120,
        objectFit: 'cover',
        borderRadius: '50%',
        marginRight: 3,
    },
    profileTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,
    },
    smallText: {
        fontFamily: 'Work Sans',
        color: '#373737',
        fontSize: 9,
    },
    midText: {
        fontFamily: 'Work Sans',
        fontSize: 12,
        color: '#373737',
    },
    bigText: {
        fontFamily: 'Work Sans',
        color: '#373737',
        fontSize: 16,
        fontWeight: 'bold',
    },
}

export default function UserCard(props) {
    const [isExpanded, setIsExpanded] = useState(false)
    /* TODO: add props for redirecting to social media */
    const { displayName, pronouns, year, major, classTags, interestTags, affiliationTags, bio } =
        props
    return (
        <Card sx={style.cardStyle}>
            <Box sx={style.centeredRowContainer}>
                <Box sx={style.centeredColumnContainer}>
                    <CardMedia
                        component="img"
                        sx={style.profilePictureCircle}
                        image={profilePicture}
                        alt="Profile Picture"
                    />
                    <Box sx={style.profileTextContainer}>
                        <Typography sx={style.bigText}>{displayName}</Typography>
                        <Typography sx={style.smallText}>&nbsp;&nbsp;{pronouns}</Typography>
                    </Box>
                    <Box sx={style.centeredRowContainer}>
                        <Typography sx={style.midText}>{year}&nbsp;Year</Typography>
                        <Typography sx={style.midText}>&nbsp;{major}</Typography>
                    </Box>
                </Box>
                <Box sx={style.uncenteredRowContainer}>
                    {/* All these tags in the classTags, interestTags, and affilationTags
                    array must be unique or we run into an error 
                    TODO: Use some set object instead of an array */}
                    <Box sx={style.tagCategoryContainer}>
                        {classTags.map((tag) => (
                            <Chip sx={style.classChip} label={tag} key={tag} />
                        ))}
                    </Box>
                    <Box sx={style.tagCategoryContainer}>
                        {interestTags.map((tag) => (
                            <Chip sx={style.interestChip} label={tag} key={tag} />
                        ))}
                    </Box>
                    <Box sx={style.tagCategoryContainer}>
                        {affiliationTags.map((tag) => (
                            <Chip sx={style.affiliationChip} label={tag} key={tag} />
                        ))}
                    </Box>
                </Box>
                <IconButton
                    sx={style.iconColor}
                    size="medium"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {!isExpanded && <ExpandMoreIcon />}
                    {isExpanded && <ExpandLessIcon />}
                </IconButton>
            </Box>
            {!isExpanded && (
                <Box sx={style.spaceBetweenContainer}>
                    <Typography sx={style.bioBlurb}>{bio}</Typography>
                    <Box sx={{ display: 'flex', alignSelf: 'flex-end' }}>
                        <IconButton sx={style.iconColor} size="medium">
                            <EmailIcon />
                        </IconButton>
                        <IconButton sx={style.iconColor} size="medium">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton sx={style.iconColor} size="medium">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton sx={style.iconColor} size="medium">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton sx={style.iconColor} size="medium">
                            <LinkedInIcon />
                        </IconButton>
                    </Box>
                </Box>
            )}
        </Card>
    )
}

UserCard.propTypes = {
    classTags: PropTypes.arrayOf({
        label: PropTypes.string.isRequired,
    }).isRequired,
    interestTags: PropTypes.arrayOf({
        label: PropTypes.string.isRequired,
    }).isRequired,
    affiliationTags: PropTypes.arrayOf({
        label: PropTypes.string.isRequired,
    }).isRequired,
    displayName: PropTypes.string.isRequired,
    pronouns: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
}
