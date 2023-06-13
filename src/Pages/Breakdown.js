import React from 'react'
import {Box, useTheme} from '@mui/material'
import Header from '../Components/Header'
import BreakdownChart from '../Components/BreakdownChart'


const Breakdown = () => {
    const theme = useTheme()

    return (
        <Box m="1.5rem 2.5rem">
         <Header title="BREAKDOWN" subtitle="Breakdown of sales by category" />
         <Box mt="40px" height="75vh"> 
         <BreakdownChart />

         </Box>
         </Box>
  )
}

export default Breakdown