import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetchProduct from "../hooks/useFetchProduct";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./../services/redux/productSlice";
import AllProduct from "../components/AllProduct";
import Filter from "../components/Filter";
import { Banner } from "../components/Banner";
import Footer from "./../components/Footer";
import axios from "axios";

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await axios.get(
          "https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products"
        );
        dispatch(setProducts(JSON.parse(JSON.stringify(products.data))));
      } catch (err) {
        console.log("error while fetching alll products " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Banner/>
      <Grid container>
        <Grid item sm={3} md={3}>
          <Filter />
        </Grid>
        
        <Grid item xs={12} sm={9} md={9}>
          <AllProduct />
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
};

export default Home;