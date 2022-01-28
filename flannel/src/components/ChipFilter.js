import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Chip, Portal } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
//import CustomChip from '../components/CustomChip'


export default function ChipFilter(props){
    const [itemList,setList] = useState([]);
    const handleDelete = (label) => () =>{
        const newList = itemList.filter((item) =>  item.item.label !== label);
        setList(newList);
    }
    return(
    <div style={{padding:"20px"}}>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={props.listType}
            sx={{ width: 300 }}
            onChange = {(_event,item) => {
                const newList = itemList.concat({item});
                setList(newList);
            }}
            renderInput={(params) => <TextField {...params} label={props.type} />}
        />
        <Box sx = {{display:"flex",flexWrap:"wrap", maxWidth: 300}}> 
            {itemList.map((item) =>(
                <div>
                    <Chip sx = {{borderRadius:3.5, backgroundColor: '#A4C3D2',color:"grey"}} label={item.item.label} key={item.item.label} deleteIcon = {<DeleteIcon/>} onDelete = {handleDelete(item.item.label)}/>
                </div>
            ))}
        </Box>
      </div>
    )
}