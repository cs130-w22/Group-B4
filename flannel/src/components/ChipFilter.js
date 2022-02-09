/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, {useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Chip} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
//import CustomChip from '../components/CustomChip'


export default function ChipFilter(props){
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
    ];
    const [classSetList,setClassSetList] = useState([]);
    const [affiliationSetList,setAffiliationSetList] =useState([]);
    const [interestSetList,setInterestSetList] =useState([]);
    const [itemList,setList] = useState([]);
    const classDelete = (label) => () => {
        const newList = classSetList.filter((item) =>  item.item.label !== label);
        setClassSetList(newList);
    }
    const affiliationDelete = (label) => () => {
        const newList = affiliationSetList.filter((item) =>  item.item.label !== label);
        setAffiliationSetList(newList);
    }
    const interestDelete = (label) => () => {
        const newList = interestSetList.filter((item) =>  item.item.label !== label);
        setInterestSetList(newList);
    }
    useEffect(() =>{
        props.changeClasses(classSetList);
        props.changeAffiliations(affiliationSetList);
        props.changeInterests(interestSetList);
    })
    return(
    <div style = {{display:"flex",flexDirection:"column"}}>
        <div style={{padding:"20px"}}>
            <h1>Classes</h1>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={classList}
                sx={{ width: 300 }}
                onChange = {(_event,item) => {
                    let found = false;
                    classSetList.map((e) => {
                        if (e.item.label === item.label){
                            found = true;
                        }
                    })
                    if (!found){
                        const newList = classSetList.concat({item});
                        setClassSetList(newList);
                    }
                }}
                renderInput={(params) => <TextField {...params} label={props.type} />}
            />
            <Box sx = {{display:"flex",flexWrap:"wrap", maxWidth: 300}}> 
                {classSetList.map((item) =>(
                    <div>
                        <Chip sx = {{borderRadius:3.5, backgroundColor: '#A4C3D2',color:"grey"}} label={item.item.label} key={item.item.label} deleteIcon = {<DeleteIcon/>} onDelete = {classDelete(item.item.label)}/>
                    </div>
                ))}
            </Box>
        </div>
        <div style={{padding:"20px"}}>
            <h1>Affiliations</h1>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={affiliationsList}
                sx={{ width: 300 }}
                onChange = {(_event,item) => {
                    let found = false;
                    affiliationSetList.map((e) => {
                        if (e.item.label === item.label){
                            found = true;
                        }
                    })
                    if (!found){
                        const newList = affiliationSetList.concat({item});
                        setAffiliationSetList(newList);
                    }
                }}
                renderInput={(params) => <TextField {...params} label={props.type} />}
            />
            <Box sx = {{display:"flex",flexWrap:"wrap", maxWidth: 300}}> 
                {affiliationSetList.map((item) =>(
                    <div>
                        <Chip sx = {{borderRadius:3.5, backgroundColor: '#A4C3D2',color:"grey"}} label={item.item.label} key={item.item.label} deleteIcon = {<DeleteIcon/>} onDelete = {affiliationDelete(item.item.label)}/>
                    </div>
                ))}
            </Box>
        </div>
        <div style={{padding:"20px"}}>
            <h1>Interests</h1>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={interestList}
                sx={{ width: 300 }}
                onChange = {(_event,item) => {
                    let found = false;
                    interestSetList.map((e) => {
                        if (e.item.label === item.label){
                            found = true;
                        }
                    })
                    if (!found){
                        const newList = interestSetList.concat({item});
                        setInterestSetList(newList);
                    }
                }}
                renderInput={(params) => <TextField {...params} label={props.type} />}
            />
            <Box sx = {{display:"flex",flexWrap:"wrap", maxWidth: 300}}> 
                {interestSetList.map((item) =>(
                    <div>
                        <Chip sx = {{borderRadius:3.5, backgroundColor: '#A4C3D2',color:"grey"}} label={item.item.label} key={item.item.label} deleteIcon = {<DeleteIcon/>} onDelete = {interestDelete(item.item.label)}/>
                    </div>
                ))}
            </Box>
        </div>
      </div>
    )
}