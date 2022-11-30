import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {BASE_URL} from "../util/constants";
import {useState, useEffect} from "react"

export default function BasicSelect(){
  const [data, setTeacher] = useState([]);


  useEffect(() => {
    fetch(`${BASE_URL}/api/courses`)
      .then((response) => response.json())
      .then((res) => {
        setTeacher(res)
      })
      .catch((error) => {
        console.error(`Could not get products: ${error}`);
      });
  }, [])

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
        <Select 
          defaultValue="" 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}>
          
          {data.map((c) => {
              return <MenuItem value={c.teacher} key={c.teacher}>{c.teacher}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
