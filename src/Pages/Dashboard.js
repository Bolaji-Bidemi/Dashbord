import React from 'react'
import FlexBox from '../Components/FlexBetween'
import Header from '../Components/Header'
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic
} from '@mui/icons-material'
import {Box, useTheme, Button, Typography, useMediaQuery} from '@mui/material'
import { useGetUserDashboardQuery } from '../state/api'
import {DataGrid} from "@mui/x-data-grid"
import Breakdownchart from '../Components/BreakdownChart'
import OverviewChart from '../Components/OverviewChart'
import StatBox from '../Components/StatBox'

const Dashboard = () => {
  const theme = useTheme()
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)")
  const {data, isLoading} = useGetUserDashboardQuery()

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
      <FlexBox>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
        <Box>
          <Button sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "12px",
            fontWeight:"bold",
            padding:"5px 10px"
          }}>
            <DownloadOutlined sx={{mr: "5px"}} />
            Download Reports</Button>
        </Box>
      </FlexBox>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          '& > div': {gridColumn: isNonMediumScreen ? undefined : "span 12"},
        }}
      >
        {/* Row 1 */}
        <StatBox 
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon = {<Email
            sx={{
              color: theme.palette.secondary[300], 
              fontSize: "26px"
            }}
            />
          }

        />

        <StatBox 
          title="Sales Today"
          value={data && data.thisMonthStat.totalSales}
          increase="+43%"
          description="since morning"
          icon={
            <PointOfSale
              sx={{
                color: theme.palette.secondary[300],
                fontSize: "26px"
              }}
            />
          }
        />    

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >

          <OverviewChart
          view="sales"
          isDashboard={true}
          />


        </Box>

        <StatBox 
          title="Monthly sales"
          value={data && data.thisMonthStat.totalSales}
          increase="+5 %"
          description="since last month"
          icon={
            <PersonAdd
              sx={{
                color: theme.palette.secondary[300],
                fontSize: "26px"
              }}
            />
          }
        />

        <StatBox 
          title="Yearly Sales"
          value={data && data.thisMonthStat.totalSales}
          increase="+43%"
          description="since last year"
          icon={
            <Traffic
              sx={{
                color: theme.palette.secondary[300],
                fontSize: "26px"
              }}
            />
          }
        />   

        {/* Row 2 */}
        <Box
        
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            '& .MuiDataGrid-root': {
                border: 'none',
                borderRadius: "5rem"
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
                    backgroundColor: theme.palette.background.alt,
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
            getRowId={(row) => row._id} 
           />


        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          color={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography 
            variant="h6"
            sx={{
              color: theme.palette.secondary[100]
            }}
         >
          Sales By Category

         </Typography>
         <Breakdownchart isDashboard={true} />
         <Typography p="0 0.6rem" fontSize="0.8rem" sx={{color: theme.palette.secondary[200]}}>
          Breakdown of real states and information via category for revenue made for this year and total sales.
         </Typography>

        </Box>

      </Box>

    </Box>
  )
}

export default Dashboard