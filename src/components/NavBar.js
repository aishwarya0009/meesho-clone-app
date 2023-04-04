import React, { useContext, useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  InputBase
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { Badge } from  '@mui/material'

import { Link } from "react-router-dom";
import { auth, signOut, signOutLogin } from "../services/firebase/auth"
import { AuthContext, THEME_COLOR } from "../App";
import { onAuthStateChanged } from "firebase/auth";
import productsArr from "./productArray";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProducts, setProducts } from "../services/redux/productSlice";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




const NavBar = () => {
  
  //const {user} = useContext(AuthContext)
  const user = useSelector(state=> state.user.userCredentials)
  const navigate = useNavigate();
  const location = useLocation();
  const allProducts = useSelector((state) => state.products.allProducts);
  const checkoutProducts = useSelector((state) => state.products.checkoutProducts);
  const dispatch = useDispatch();

  const loginHandle = () => {
    navigate("/login");
  }
  const logoutHandle = async () => {
    await signOutLogin(auth)
  }

  const searchHandle = (e) => {
    //console.log(e.target.value)
    let dataValues = [...allProducts];
    if(e.target.value){
      dataValues = dataValues.filter((product) => product.title.toLowerCase().includes(e.target.value))
    }
    //console.log(dataValues);
    if(dataValues.length === 0){
      alert("No result Found");
      dispatch(setFilteredProducts(allProducts))
    }
    else{
      dispatch(setFilteredProducts(dataValues))
    }
    
    
  }

  const show = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/checkout'
  //console.log(user)
  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{display:'flex', justifyContent:'space-between'}}>
          <Box display={'flex'}>
            <Link to="/" style={{ textDecoration: "none", color: THEME_COLOR, }} >
              <Typography variant="h6" noWrap sx={{ display: { md: "flex" }, fontFamily: "monospace", fontWeight: 700, color: "inherit",textDecoration: "none",}}>
                MEESHO
              </Typography>
            </Link>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={searchHandle}
              />
            </Search>
          </Box>
          
          
          <Box >
          <Badge badgeContent={checkoutProducts.length} color="secondary" sx={{':hover':{cursor:'pointer'}, marginRight:'25px'}} >
            <ShoppingCartCheckoutOutlinedIcon color="secondary" />
          </Badge>
            {
               user.uid ?
               !show && <Button variant="outlined" color="error" onClick={logoutHandle}>SignOut</Button> :
               !show && <Button variant="outlined" onClick={loginHandle}>Login</Button>
              
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;