import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box, OutlinedInput } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredProducts } from '../services/redux/productSlice';
import useFetchCategories from '../hooks/useFetchCategories';
import productArr from './../components/productArray'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const Filter = () => {

    const allProducts = useSelector((state) => state.products.allProducts);
    const [sortBy, setSortBy] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        // useFetchCategories()
        //     .then(res => setCategories(res.data))
        //     .catch(err => console.log(err));
        
        const res = ["electronics","jewelery","men's clothing","women's clothing"]
        setCategories(res)
        //console.log(productArr)

    },[])

    const sortByHandle = (e) => {
        setSelectedCategories([])
        setSortBy(e.target.value)
        const data = [...allProducts]
        switch(e.target.value){
            case '0': data.sort((a,b) => Number(a.price)>Number(b.price)?1:-1);break;
            case '1' : data.sort((a,b) => Number(a.price)<Number(b.price)?1:-1);break;
            case '2': data.sort((a,b) => Number(a.rating.rate)<Number(b.rating.rate)?1:-1);break;
        }
        dispatch(setFilteredProducts(data));
    }

    const categoriesHandle = (e) => {
        setSortBy('')
        setSelectedCategories([...e.target.value])
        const length = [...e.target.value].length
        let data = [...allProducts]
        if(length>0){
            data = data.filter((product) => [...e.target.value].includes(product.category))
        }
        dispatch(setFilteredProducts(data));
    }
  return (
    <Box padding={2} width="100%" rowGap={5}>
        <Typography variant='h4'>Filters</Typography>
        <Box sx={{display:'flex', flexDirection:'column', rowGap:'5px'}}>
            <Typography variant='h6'>Sort By:</Typography>
            <FormControl fullWidth>
                <InputLabel id="sortBy">Select Sort By</InputLabel>
                <Select
                labelId="sortBy"
                value={sortBy}
                label="Select Sort By"
                onChange={sortByHandle}
                >
                    <MenuItem value='0'>Price Low to High</MenuItem>
                    <MenuItem value='1'>Price High to Low</MenuItem>
                    <MenuItem value='2'>Rating</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', rowGap:'5px'}}>
            <Typography variant='h6'>Category:</Typography>
            <FormControl fullWidth>
                <InputLabel id="categoriesLabel">Categories</InputLabel>
                <Select
                    labelId="categoriesLabel"
                    multiple
                    value={selectedCategories}
                    onChange={categoriesHandle}
                    label="Categories"
                    renderValue={(selectedCategories) => selectedCategories.join(', ')}
                    MenuProps={MenuProps}
                    >
                    {categories.map((name) => (
                        <MenuItem
                        key={name}
                        value={name}
                        >
                        {name}
                        </MenuItem>
                    ))}
                    </Select>
            </FormControl>
        </Box>
    </Box>
  )
}

export default Filter