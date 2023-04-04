import { createSlice } from "@reduxjs/toolkit";

let initialStateData = {
    allProducts:[],
    filteredProducts:[],
    checkoutProducts:[]
}

export const productSlice = createSlice({
    name:'products',
    initialState:initialStateData,
    reducers:{
        setProducts: (state,action) => {
            state.allProducts = action.payload;
            state.filteredProducts = action.payload;
        },
        setFilteredProducts : (state,action) => {
            state.filteredProducts = action.payload;
        },
        checkoutProducts : (state,action) => {
            state.checkoutProducts = [...state.checkoutProducts, action.payload]
        },
        removeFromCheckoutProducts : (state,action) => {
            //state.checkoutProducts = [...state.checkoutProducts].filter((product) => product.id !== action.payload.id )
            const arr = [...state.checkoutProducts]
            arr.splice(state.checkoutProducts.findIndex((p)=>p.id === action.id),1);
            console.log("arr is "+arr);
            state.checkoutProducts = arr;
        },
        clearCheckoutProducts : (state) => {
            state.checkoutProducts = []
        }
    }
})

export const {setProducts, setFilteredProducts, checkoutProducts, removeFromCheckoutProducts, clearCheckoutProducts} = productSlice.actions

export default productSlice.reducer