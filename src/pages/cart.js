
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { Grid,  Skeleton } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { THEME_COLOR } from '../App';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";


import { checkoutProducts, clearCheckoutProducts, removeFromCheckoutProducts } from '../services/redux/productSlice';

const Hr = styled('div')(({ linetheme }) => ({
  width: '85%',
  height: '1px',
  background: 'black'
}));
 const Header=styled('div')(({headertheme})=>({
    color:'rgb(244,51,151)',
    textAlign:'center'
 }

 ))
const CheckOutProductsComponent = () => {
    const checkoutProducts = useSelector(state => state.products.checkoutProducts);
    const dispatch = useDispatch();
    
    const deleteHandle = (product) => {
      dispatch(removeFromCheckoutProducts(product))
    }
   
   
    return (
        
<Card sx={{ maxWidth: 800, margin: '0 auto',border:'1px solid black' }}>
  <CardContent>
    <Typography variant="h5" component="div" gutterBottom>
      Checkout Products
    </Typography>
    {checkoutProducts.map((product, index) => (
      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={product.image} alt={product.title} style={{ width: 50, marginRight: 10 }} />
          <Typography variant="body2">{product.title}</Typography>
        </div>
        <Typography variant="body2">{'₹' + product.price}</Typography>
        <DeleteForeverIcon color='error' onClick={() => deleteHandle(product)} sx={{':hover':{cursor:'pointer'}}}/>
       
      </div>
    ))}
    
    <Typography variant='h5'>Total Price: {checkoutProducts.reduce((total,curr)=> total+curr.price , 0)}</Typography>
    
  </CardContent>
</Card>
 
    )}
const Cart= () =>{
  const navigate = useNavigate();
  function handleClick() {
    navigate("/checkout");
  }
    return(
        <><div>
           
          <Header>
            <h1>Your Cart</h1>
          </Header>
        </div>
        <CheckOutProductsComponent />
        
        <div style={{ display: "flex", justifyContent: "center",padding:"20px" }}>
        <Button variant="contained" onClick={handleClick} sx={{backgroundColor:`${THEME_COLOR}` ,textAlign:'center', ":hover":{backgroundColor:`${THEME_COLOR}`, opacity:'.8'}}}>
                        <KeyboardDoubleArrowRightOutlinedIcon></KeyboardDoubleArrowRightOutlinedIcon>
                        Buy Now
                    </Button>
                    </div>
        </>
    );
}

export default Cart;
