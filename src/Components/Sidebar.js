import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBox from './FlexBetween'
import profilepic from '../assests/profilepic.png'
import { AdminPanelSettingsOutlined, CalendarMonthOutlined, ChevronLeft, ChevronRightOutlined, Groups2Outlined, HomeOutlined, PieChartOutlined, PointOfSaleOutlined, PublicOutlined, ReceiptLongRounded, Settings, ShoppingCartOutlined, TodayOutlined, TrendingUpOutlined } from '@mui/icons-material'

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client Facing",
        icon: null
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />
    },
    {
        text: "Customers",
        icon: <Groups2Outlined/>
    },
    {
        text: "Transaction",
        icon: <ReceiptLongRounded />
    },
    {
        text: "Geography",
        icon: <PublicOutlined />
    },
    {
        text: "Sales",
        icon: null
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />
    },
    {
        text: "Daily",
        icon: <TodayOutlined />
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />
    },
    {
        text: "Management",
        icon: null
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />
    }
]

const Sidebar = ({
    user,
    drawerWidth,
    isNonMobile,
    isSidebarOpen,
    setIsSidebarOpen
}) => {

    const { pathname } = useLocation()
    const [active, setActive] = useState("")
    const navigate = useNavigate()
    const theme = useTheme()

    useEffect(()=>{
        setActive(pathname.substring(1))
    },[pathname])
  return (
    <Box component="nav">
        {
            isSidebarOpen && (
                <Drawer 
                open={isSidebarOpen}
                onClose={()=> setIsSidebarOpen(!isSidebarOpen)}
                variant='persistent'
                anchor="left"
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper':{
                        color: theme.palette.secondary[200],
                        backgroundColor: theme.palette.background.alt,
                        boxSizing: 'border-box',
                        borderWidth: isNonMobile ? 0 : '2px',
                        width: drawerWidth
                    }
                }}
                 >

                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBox color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant='h4'fontWeight="bold">
                                        ECOMVISION 
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={()=> setIsSidebarOpen(!isSidebarOpen) }>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBox>
                        </Box>
                        
                            <List>{navItems.map(({text, icon}) =>{
                                if(!icon){
                                return (
                                    <Typography key={text} sx={{m:"2.5rem 0 1rem 3rem "}}>
                                         {text}
                                    </Typography>
                                 )
                                }
                                const lcText = text.toLowerCase()

                                return(
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton 
                                        onClick={()=>{
                                            navigate(`/${lcText}`)
                                            setActive(lcText )
                                        }}   
                                        sx={{
                                            backgroundColor: active === lcText ? theme.palette.secondary[300] : 'transparent ',
                                            color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100]
                                        }}         
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml:"2rem",
                                                    color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200]
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text}/>
                                            {
                                                active === lcText && (
                                                    <ChevronRightOutlined sx={{ml:'auto'}} />
                                                )
                                            }

                                        </ListItemButton>
                                    </ListItem>
                                )
                            }) }
                            
                            </List>
                        
                    </Box>
                    <Box position="absolute" bottom="2rem" width="100%">
                        <Divider width="100%" />
                        
                            <FlexBox textTransform="none" gap="1rem"  m="1.5rem 2rem 0 3rem">
                                <Box
                                    component="img"
                                    alt='profile'
                                    src={profilepic}
                                    height="40px"
                                    width="40px"
                                    borderRadius="50%"
                                    sx={{
                                        objectFit: 'cover'
                                    }}
                               />
                                   
                                    <Box textAlign="left">
                                        <Typography fontWeight="bold" fontSize="0.9rem" sx={{color: theme.palette.secondary[100]}}>
                                            {user.name}
                                        </Typography>
                                        <Typography fontSize="0.8rem" sx={{color: theme.palette.secondary[200]}}>
                                            {user.occupation}
                                        </Typography>
                                    </Box>
                                    <Settings sx={{color: theme.palette.secondary[300], fontSize:"25px"}} />
                                
                            </FlexBox>
                       
                    </Box>
                 </Drawer>

            )
        }
        
    </Box>
  )
}

export default Sidebar