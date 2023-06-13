import React, {useState} from 'react'
import {Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from '@mui/material'
import { useGetProductQuery } from '../state/api'
import Header from '../Components/Header'

const Product = ({
    _id,
    name,
    price,
    category,
    supply,
    description,
    stat,
    rating
}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const theme = useTheme()
    return (
        <Card
            sx={{
                backgroundColor: theme.palette.background.alt,
                backgroundImage: 'none',
                borderRadius:"0.55rem"
 
            }}
        >
            <CardContent>
                <Typography sx={{
                    fontSize: "14px",
                   
                }}
                color= {theme.palette.secondary[700]}
                gutterBottom
                >
                    {category}
                </Typography>
                <Typography
                    variant="h5" component="div"
                >
                    {name}
                </Typography>
                <Typography
                    sx={{mb: '1.5rem'}} color={theme.palette.secondary[400]}
                >
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />
                <Typography variant="body2">{description}</Typography>
            </CardContent>

            <CardActions>
                <Button variant="promary" size="small" onClick={()=> setIsExpanded(!isExpanded)}>
                     See More
                </Button>
            </CardActions>

            <Collapse 
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                    color: theme.palette.neutral[300]
                }}>
                    <CardContent>
                        <Typography> id: {_id} </Typography>
                        <Typography> Supply Left: {supply} </Typography>
                        <Typography> Yearly Sales Sold This Year: {stat.yearlyTotalSales} </Typography>
                        <Typography> Yearly Units Sold This Month: {stat.yearlyTotalSoldUnits} </Typography>
                    </CardContent>
                </Collapse>

        </Card>
    )
}

const Products = () => {
    const {data, isLoading} = useGetProductQuery()
    const isNonMobile = useMediaQuery("(min-width: 1000px)")
   // console.log("🚀 ~ file: Product.js:8 ~ Product ~ data,:", data,)
    
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="PODUCTS" subtitle="See your lists of products." />
    {data || !isLoading ? 
    <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        rowGap="20px"
        justifyContent="space-between"
        columnGap="1.33%"
        sx={{
            '& > div': {gridColumn: isNonMobile ? undefined : "span 4"}
        }}
    >
        {data.map(({
            _id,
            name,
            price,
            category,
            supply,
            description,
            stat,
            rating
        })=> (
           
            <Product 
            key={_id}
            _id = {_id}
            name={name}
            price={price}
            category={category}
            supply={supply}
            description={description}
            stat={stat}
            rating = {rating}
            />
        ))}

    </Box> : <h2>Loading...</h2>}
    </Box>
  )
}

export default Products