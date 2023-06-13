import React, {useState} from 'react'
import {Box, FormControl, MenuItem, InputLabel, Select} from '@mui/material'
import Header from '../Components/Header'
import {useGetOverviewQuery} from '../state/api'
import OverviewChart from '../Components/OverviewChart'

const OverView = () => {
    const [view, setView] = useState('units')
    const {data, isLoading} = useGetOverviewQuery()
    console.log("data",data)
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="OVERVIEW" subtitle="Overview of general revenue and profit." />
    <Box height="75vh"> 
    <FormControl sx={{mt: "1rem"}}>
        <InputLabel >View</InputLabel>
        <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
          <MenuItem value="sales">Sales</MenuItem>
          <MenuItem value="units">Units</MenuItem>
            
        </Select>
    </FormControl>
    <OverviewChart view={view} />
    
    </Box>

    </Box>
  )
}

export default OverView