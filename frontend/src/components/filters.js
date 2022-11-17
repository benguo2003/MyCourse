import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {BASE_URL} from "../util/constants";
import {useState, useEffect} from "react"

export default function BasicSelect() {
  const [data, setTeacher] = React.useState([]);

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
    setTeacher(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data}
          label="Teacher"
          onChange={handleChange}>
          
          {data.map((c) => {
              return <MenuItem Value={10}>{c.teacher}</MenuItem>
          })}
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>{props.test[0]}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
