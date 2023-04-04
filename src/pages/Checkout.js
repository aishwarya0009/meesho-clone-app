import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Form, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext, THEME_COLOR } from '../App';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import { checkoutProducts, clearCheckoutProducts, removeFromCheckoutProducts } from '../services/redux/productSlice';

const steps = [
  'Address',
  'Payment',
  'Summary'
];

const Address = ({activeStep, setActiveStep, formData, setFormData}) => {

  const confirmAddress = () => {
    if(!formData.address){
      alert("Please enter the address");
      return;
    }
    setActiveStep(activeStep+1)
  }

  const addressChangeHandler = (e) => {
  
    setFormData({...formData, address:e.target.value});
  }
  return (
    <Box padding={1} display="flex" flexDirection={'column'} rowGap="20px">
      <Typography variant='h4'>{steps[activeStep]} </Typography>
      <TextField placeholder='Enter Addresss' value={formData.address} onChange={addressChangeHandler}  required />
      <Button  variant='contained' onClick={confirmAddress} sx={{backgroundColor:THEME_COLOR}}>Deliver to this Address</Button>
    </Box>
  )
}

const Payment = ({activeStep, setActiveStep, formData, setFormData}) => {

  const confirmPayment = (e) => {
    if(!formData.payment){
      alert("Please select payment option");
      return;
    }
    setActiveStep(activeStep+1)
  }

  return (
    <Box padding={1} display="flex" flexDirection={'column'} rowGap="20px">
      <Typography variant='h4'>{steps[activeStep]}</Typography>
      <FormControl>
        <InputLabel id="paymentLabel">Select Payment</InputLabel>
        <Select
          labelId="paymentLabel"
          value={formData.payment}
          label="Select Payment"
          onChange={(e)=>setFormData({...formData, payment:e.target.value})}
          required
        >
          <MenuItem value='Cash on Delivery'>Cash On Delivery</MenuItem>
        </Select>
      </FormControl>
      
      <Button variant='contained' onClick={confirmPayment} sx={{backgroundColor:THEME_COLOR}}>Continue</Button>
    </Box>
  )
}

const Summary = ({activeStep, formData, product}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkoutProducts = useSelector((state) => state.products.checkoutProducts);

  const placeOrderHandle = () => {
      dispatch(clearCheckoutProducts())
      alert("Order Placed");
      navigate('/')
  }
  return (
    <Box padding={1} display="flex" flexDirection={'column'} rowGap="20px" alignItems={'center'}>
      <Typography variant='h4'>{steps[activeStep]}</Typography>
      <ul style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
        {
          checkoutProducts.map((prods) => (
            <li key={prods.title}>
              <Typography variant='h5'>{prods.title}</Typography>
              <img src={prods.image} alt="" style={{objectFit:'fill', height:'200px', width:'200px'}}/>
              <Box sx={{margin:'20px'}}>
                <Typography variant='h6'>Category:</Typography>
                <Typography variant='p'>{prods.category}</Typography>
              </Box>
            </li>
            
          ))
        }
      </ul>
      <Box sx={{margin:'20px'}}>
        <Typography variant='h6'>Address:</Typography>
        <Typography variant='p'>{formData.address}</Typography>
      </Box>
      <Box sx={{margin:'20px'}}>
        <Typography variant='h6'>Payment Type:</Typography>
        <Typography variant='p'>{formData.payment}</Typography>
      </Box>
      <Box sx={{margin:'20px'}}>
        <Typography variant='h6'>Total Amount:</Typography>
        <Typography variant='p'>{'₹ '+checkoutProducts.reduce((total,curr)=> total+curr.price , 0)}</Typography>
      </Box>

      <Button variant='contained' sx={{backgroundColor:THEME_COLOR}} onClick={placeOrderHandle}>Place Order</Button>
    </Box>
  )
}

const CheckOutProductsComponent = () => {
    const checkoutProducts = useSelector(state => state.products.checkoutProducts);
    const dispatch = useDispatch();
    const deleteHandle = (product) => {
      dispatch(removeFromCheckoutProducts(product))
    }
    return (
        <Box padding={2} sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <Typography variant='h5'>Checkout Products</Typography>
          {
            checkoutProducts.map((product,index) => (
              <Box key={index} padding="10px" display='flex' justifyContent='space-between'>
                  <Typography variant='body2'>{product.title} <DeleteForeverIcon color='error' onClick={()=>deleteHandle(product)} sx={{':hover':{cursor:'pointer'}}}/></Typography>
                  <Typography variant='body2'>{'₹'+product.price}</Typography>
              </Box>
            ))
          }
          <Typography variant='h5'>Total Price: {checkoutProducts.reduce((total,curr)=> total+curr.price , 0)}</Typography>
        </Box>
    )
}

const Checkout = () => {
    //const {user} = useContext(AuthContext)
    const user = useSelector((state) => state.user.userCredentials)
    const checkoutProducts = useSelector(state => state.products.checkoutProducts);
    const location = useLocation();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({address:'', payment:''});
    

    const changeStepHandler = (index) => {
        setActiveStep(index)
    }

  return (
    <Box padding={2} display="flex" flexDirection={'column'} rowGap={"50px"}>
        <CheckOutProductsComponent />
        {
          checkoutProducts.length === 0 ?
            <Typography variant='h4'>No Products to Buy</Typography> :
            <>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label} onClick={() => changeStepHandler(index)}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Form>
              {
                activeStep === 0 ? 
                  <Address activeStep={activeStep} setActiveStep={setActiveStep} formData={formData} setFormData={setFormData}/> :
                  activeStep === 1 ?
                    <Payment activeStep={activeStep} setActiveStep={setActiveStep} formData={formData} setFormData={setFormData}/> :
                    <Summary activeStep={activeStep} formData={formData} product={location.state}/>
              }
            </Form>

            </>
        }
        
        
    </Box>
  )
}

export default Checkout