import { Button, Typography, Rating, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { THEME_COLOR } from '../App';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import OptimizedImage from '../components/OptimizedImage';
import { useDispatch } from 'react-redux';
import { addToBag, checkoutProducts } from '../services/redux/productSlice';


export default function Product() {
    
    const [product,setProduct] = useState({});
    const [isLoading, setLoading] = useState(false);
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        setLoading(true)
        //console.log("Product component");
        fetch('https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/'+params.id).then(
            response => response.json()
        ).then((data) => {
            //console.log(data);
            setProduct(JSON.parse(JSON.stringify(data)));
            
        }).catch(error => console.log(error))
        .finally(()=>{
            //console.log(product);
            setLoading(false)
        })
    },[])

    const buyNowHandle = () => {
        dispatch(checkoutProducts(product));
        navigate('/checkout', {
            state:product
        })
    }

    const addProductToBag = () => {
        dispatch(checkoutProducts(product));
    }
    
  return (
    <React.Fragment>
        <Box sx={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(550px, 1fr))'}}>
        
            <Box sx={{ display: 'flex', justifyContent:'center', padding:'50px', height:'500px', position:'relative', flexWrap:'wrap'}} id="hashDiv">
                {/* <Card variant="outlined" sx={{ maxWidth: 345 }}><img src={product.image} height="500" style={{objectFit:"fill"}}/></Card> */}
                
                {isLoading ? 
                    <Skeleton variant="rectangular" width={210} height={118} /> : 
                    <img sx={{objectFit:'fill'}} src={product.image} alt="" width={500} height={500}/>    
                }
                
            </Box>
            <Box sx={{ display: 'flex', flexDirection:'column', rowGap:'20px', margin:'20px'}}>
                <Typography variant='h5'>{product.title}</Typography>
                <Typography variant='h4'>{'₹'+product.price}</Typography>
                <Box sx={{ display:'flex', justifyContent:'space-evenly'}}>
                    <Button variant="outlined" onClick={addProductToBag}><ShoppingCartIcon></ShoppingCartIcon> Add to Bag</Button>
                    <Button variant="contained" onClick={buyNowHandle} sx={{backgroundColor:`${THEME_COLOR}` , ":hover":{backgroundColor:`${THEME_COLOR}`, opacity:'.8'}}}>
                        <KeyboardDoubleArrowRightOutlinedIcon></KeyboardDoubleArrowRightOutlinedIcon>
                        Buy Now
                    </Button>
                </Box>
                <Box sx={{margin:'20px'}}>
                    <Typography variant='h6'>Category:</Typography>
                    <Typography variant='p'>{product.category}</Typography>
                </Box>
                <Box sx={{margin:'20px'}}>
                    <Typography variant='h6'>Description:</Typography>
                    <Typography variant='p'>{product.description}</Typography>
                </Box>
                <Box sx={{margin:'20px'}}>
                    <Typography variant='h6'>Rating:</Typography>
                    <Rating name="read-only" value={Number(product.rating?.rate)} readOnly />
                </Box>
                
            </Box>
            
        </Box>
    </React.Fragment>
  )
}