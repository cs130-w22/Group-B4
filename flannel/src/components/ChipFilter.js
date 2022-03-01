/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { Box, Chip, Autocomplete, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'

const style = {
    root: {
        paddingBottom: 4,
        padding: '20px',
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
    filterTextField: {
        fontSize: 50,
        fontFamily: 'Work Sans',
        color: '#373737',
    },
    chipsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: 300,
    },
}

export default function ChipFilter(props) {
    const { defaultShownTags, setTagOptions, tagOptions, type, setSelectedTags, selectedTags } =
        props
    let chipStyle
    switch (type) {
        case 'Classes':
            chipStyle = style.classChip
            break
        case 'Interests':
            chipStyle = style.interestChip
            break
        case 'Affiliations':
            chipStyle = style.affiliationChip
            break
        default:
            break
    }
    const handleDelete = (selectedTag) => () => {
        if (selectedTag !== '') {
            setSelectedTags(selectedTags.filter((tagString) => tagString !== selectedTag))
            const newTagOptions = tagOptions.concat(selectedTag).sort()
            setTagOptions(newTagOptions)
        }
    }
    useEffect(() => {
        setSelectedTags(defaultShownTags)
    }, [])
    return (
        <Box sx={style.root}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={tagOptions}
                renderInput={(params) => (
                    <TextField style={{ width: 250 }} {...params} label={type} />
                )}
                onChange={(_event, selectedItem) => {
                    if (selectedItem !== null && selectedItem !== '') {
                        const newShownTags = selectedTags.concat(selectedItem)
                        setSelectedTags(newShownTags)
                        setTagOptions(tagOptions.filter((tagString) => tagString !== selectedItem))
                    }
                }}
            />
            <Box sx={style.chipsContainer}>
                {selectedTags.map((item) => (
                    <Chip
                        sx={chipStyle}
                        label={item}
                        key={item}
                        deleteIcon={<CloseIcon />}
                        onDelete={handleDelete(item)}
                    />
                ))}
            </Box>
        </Box>
    )
}
// defaultShownTags: PropTypes.arrayOf({
//     label: PropTypes.string.isRequired,
// }).isRequired,

ChipFilter.propTypes = {
    setTagOptions: PropTypes.func.isRequired,
    tagOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    defaultShownTags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    type: PropTypes.string.isRequired,
    setSelectedTags: PropTypes.func.isRequired,
    selectedTags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}
