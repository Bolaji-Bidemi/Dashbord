import React, {useState} from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { useGetUserQuery } from '../state/api'
import { useSelector } from 'react-redux'

const Layout = () => {

  const isNonMobile = useMediaQuery("(min-width: 600px)")
  const [isSidebarOpen,setIsSidebarOpen] = useState(true)

  const userId = useSelector(state => state.global.userId)
 
  const { data } = useGetUserQuery(userId)
  //console.log("🚀 ~ file: Layout.js:17 ~ Layout ~ data:", data)
  
  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
      <Sidebar 
        user={data || {}}
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        drawerWidth="250px"
      /> 
        <Box flexGrow={1}>
            <Navbar 
              user={data || {}}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet/>
        </Box>
    </Box>
  )
}

export default Layout