import axios from 'axios';  

const useFetchProduct = () => {
    const products = axios.get('https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products');
    return products;
}

export default useFetchProduct