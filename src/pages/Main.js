import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/auth";
import { setUserCredentials } from "../services/redux/userSlice";

const Main = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const handleAuthChange = (userr) => {
          if (userr) {
            //setUser(userr)
            dispatch(setUserCredentials(JSON.stringify(userr)))
            return;
          }
          //setUser(null);
          dispatch(setUserCredentials({}))
        };
    
        const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
    
        return () => unsubscribe();
      }, []);

    return (
      <>
        <NavBar />
        <Outlet />
      </>
    )
}

export default Main