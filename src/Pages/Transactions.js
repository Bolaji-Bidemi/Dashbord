import React, {useState} from 'react'
import Header from '../Components/Header'
import {Box} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'
import { useGetTransactionQuery } from '../state/api'
import { useTheme } from '@emotion/react'
import DataGridCustomToolbar from '../Components/DataGridCustomToolbar'

const Transactions = () => {
    const theme = useTheme()
    const [pageSize, setPageSize] = useState(20)
    const [page, setPage] = useState(0)
    const [sort, setSort] = useState({})
    const [search, setSearch] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const { data, isLoading } = useGetTransactionQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search
    })
    console.log("data",data)
   
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
          renderCell: (params) => params.value.length
      },
      {
          field: 'cost',
          headerName: 'Cost',
          flex: 0.5,
          renderCell: (params) => `$${Number(params.value).toFixed(2)}`
      },
  ]

  return (
    <Box m="1.5rem 2.5rem">
    <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
    <Box
        mt="20px"
        height="80vh"
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
            loading={isLoading || !data}
            rows={(data && data.transaction) || []}
            columns={columns}
            pageSize={pageSize}
            getRowId={(row) => row._id}
            rowCount={(data && data.total)}
            paginationMode="server"
            pagination
            page={page}
            rowsPerPageOptions={[20, 50, 100]}
            onPageChange={(newPage) => setPage(newPage)}
            sortingMode="server"
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            components={{Toolbar: DataGridCustomToolbar}}
            componentsProps={{toolbar: {searchInput, setSearchInput, setSearch}}}

           /> 
        </Box>

    </Box>
  )
}

export default Transactions