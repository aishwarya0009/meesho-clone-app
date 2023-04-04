import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const user = useSelector((state) => state.user.userCredentials);
    const navigate = useNavigate();
    //console.log(user.uid===true);

    useEffect(()=>{
        //console.log(user);
        if(!user.uid){
           return navigate('/login')
        }
    },[])
    

    return children;
};

export default ProtectedRoute;