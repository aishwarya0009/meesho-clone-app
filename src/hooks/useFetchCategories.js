import axios from 'axios';  
const useFetchCategories = () => {
    //const res = axios.get('https://fakestoreapi.com/products/categories')
    const res = [
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing"
        ]
    return res;
}

export default useFetchCategories