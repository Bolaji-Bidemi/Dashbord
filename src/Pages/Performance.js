import React from 'react'
import {Box, useTheme}from '@mui/material'
import Header from '../Components/Header'
import { useGetUserPerformanceQuery } from '../state/api'
import {DataGrid} from '@mui/x-data-grid'
import { useSelector } from 'react-redux'

const Performance = () => {
    const userId = useSelector(state=> state.global.userId)
    const theme = useTheme()
    const {data, isLoading} = useGetUserPerformanceQuery(userId)
    console.log("datea", data)

    const columns = [
      {
          field: '_id',
          headerName: 'ID',
          flex: 1,

      },
      {
          field: 'userId',
          headerName: 'User ID',
          flex: 1,
      },
      {
          field: 'createdAt',
          headerName: 'CreatedAt',
          flex: 1,
      },
      {
          field: 'products',
          headerName: '# of Products',
          flex: 0.5,
          sortable: false,
          renderCell: (params)=> params.value.length
      },
      {
          field: 'cost',
          headerName: 'Cost',
          flex: 1,
          renderCell: (params)=> `$${Number(params.value).toFixed(2)}`
      },
      
  ]
   
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="PERFORMANCE" subtitle="Track your Affiliate Sales Performance Here." />

    <Box
        mt="20px"
        height="75vh"
        
        sx={{
            '& .MuiDataGrid-root': {
                border: 'none',
            },
                '& .MuiDataGrid-cell': {
                    borderBottom: 'none'
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: 'none'
                },
                '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: theme.palette.primary.light,
                },
                '& .MuiDataGrid-footerContainer': {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: 'none'
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                    color: `${theme.palette.secondary[300]} !important`
                }
        }}
    >
        <DataGrid
            rows={(data && data.sales)|| []}
            columns={columns}
            loading={isLoading || !data}
            getRowId={(row)=> row._id}
            
           
        />
    </Box>
      
    </Box>
  )
}

export default Performance