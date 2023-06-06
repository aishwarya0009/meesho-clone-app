import React, { useState } from 'react';
import { Button,TextField, Typography } from '@mui/material';
import { Box, Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { THEME_COLOR } from '../App';
import styled from '@emotion/styled';
import { Form, Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserCredentials } from '../services/redux/userSlice';

const SignUpButton = styled(Button)(({ theme }) => ({
  backgroundColor: THEME_COLOR,
  ':hover':{
    backgroundColor:'green'
  }
}));


const SignUp = () => {
  
    const [userInput,setUserInput] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
   // const user = useSelector(state=>state.user.userCredentials)
    const dispatch = useDispatch();
    
    const [open, setOpen] = React.useState(false);
    const [STATUS, setSTATUS] = useState("error");
  
    const handleClick = (isError) => {
      setOpen(true);
      setSTATUS(isError?"error":"success")
      
    };

  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let errors = [];
        if(!userInput.email){
          errors.push('Email cannot be empty');
        }else if(!emailRegex.test(userInput.email)){
          errors.push('Invalid Email')
        }
        if(!userInput.password){
          errors.push('Password cannot be Empty')
        }else if(userInput.password.length < 8){
          errors.push('Password length should be at least 8 letters')
        }
        if(errors.length>0){
          setError([...errors])
          setLoading(false);
          return;
        }
        const response = await signUp(userInput).then((res)=>{
          dispatch(setUserCredentials(JSON.stringify(res)));
          return res;
        }).catch((error) => {
          console.log(error)
        }).finally(()=>setLoading(false))
        //console.log(response)
        if(response.user){
          navigate('/')
        }else{
          alert("ERROR");
        }
    }
    
  return (
    <Box padding={2} sx={{ display: 'flex', flexWrap: 'wrap', flexDirection:'column', rowGap:'10px' }}>
      <Typography variant='h4' color={THEME_COLOR} sx={{display:'grid', placeItems:'center'}}>SIGN UP</Typography>
      <Form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', flexDirection:'column', rowGap:'10px' }}>
            { error.length !== 0 && 
                error.map(e => <Alert key={e} severity="error">{e}</Alert>)
            }
          <TextField fullWidth label="First Name" type={'text'} onChange={(e)=>setUserInput({...userInput, fname:e.target.value})} sx={{ width: '50%',margin:"auto" }} />
          <TextField fullWidth label="Last Name" type={'text'} onChange={(e)=>setUserInput({...userInput, lname:e.target.value})} sx={{ width: '50%',margin:"auto" }}  />
          <TextField fullWidth label="Email" onChange={(e)=>{setUserInput({...userInput, email:e.target.value}); setError([]) }} sx={{ width: '50%',margin:"auto" }}  />
          <TextField fullWidth label="Password" type={'password'}  onChange={(e)=>{setUserInput({...userInput, password:e.target.value}); setError([])}} sx={{ width: '50%',margin:"auto" }}  />
          <SignUpButton variant='contained' type='submit' sx={{ width: '30%',margin:"auto" }} >SIGN UP</SignUpButton>
        
      </Form>
      <Typography variant='body1'sx={{ width: '50%',margin:"auto",textAlign:"center" }} >All ready have an Account <Link to={'/login'}>Sign In</Link></Typography>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={STATUS} sx={{ width: '100%' }}>
          Login {STATUS=="success"?"success":"failed"}
        </Alert>
      </Snackbar>
      { isLoading && <div className='loader'></div>}
    </Box>
  )
}

export default SignUp