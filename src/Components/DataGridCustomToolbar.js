import React, {useState} from 'react'
import {Search} from '@mui/icons-material'
import {IconButton, TextField, InputAdornment, Box} from '@mui/material'
import { GridToolbarDensitySelector, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid'
import FlexBox from './FlexBetween'

const DataGridCustomToolbar = ({setSearch, searchInput, setSearchInput}) => {
   
  return (
    
    <GridToolbarContainer>
        <FlexBox flexGrow={1}>
            <FlexBox>
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </FlexBox>
                <TextField 
                    label="Search..."
                    sx={{mb: '0.5rem', width: '15rem'}}
                    onChange={(e)=> setSearchInput(e.target.value)}
                    value={searchInput}
                    variant='standard'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={()=>{
                                        setSearch(searchInput)
                                        setSearchInput("")
                                    }}
                                >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
        </FlexBox>
    </GridToolbarContainer>
   
  )
}

export default DataGridCustomToolbar