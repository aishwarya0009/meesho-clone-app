import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { AuthContext, THEME_COLOR } from "../App";
import styled from "@emotion/styled";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../services/firebase/auth";
import { setUserCredentials, setUserDetail } from "../services/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: THEME_COLOR,
  ":hover": {
    backgroundColor: "green",
  },
}));

export default function Login() {
  const [error, setError] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  //const {user, setUser} = useContext(AuthContext)
  const user = useSelector((state) => state.user.userCredentials);
  const dispatch = useDispatch();

  //console.log("Login Component");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //console.log(emailRef.current.value, passwordRef.current.value)
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let errors = [];
    if (!emailRef.current.value) {
      errors.push("Email cannot be empty");
    } else if (!emailRegex.test(emailRef.current.value)) {
      errors.push("Invalid Email");
    }
    if (!emailRef.current.value) {
      errors.push("Password cannot be empty");
    } else if (passwordRef.current.value.length < 8) {
      errors.push("Password length should be at least 8 letters");
    }
    if (errors.length > 0) {
      setError([...errors]);
      setLoading(false);
      return;
    }
    try {
      const response = await signIn(
        emailRef.current.value,
        passwordRef.current.value
      );

      dispatch(setUserCredentials(JSON.stringify(response.user)));
      navigate("/");
    } catch (err) {
      console.log("Error while loggin in");
      console.log(err);
      setError(["Wrong Credentials"]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      padding={2}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        rowGap: "10px",
      }}
    >
      <Typography
        variant="h4"
        color={THEME_COLOR}
        sx={{ display: "grid", placeItems: "center" }}
      >
        LOGIN
      </Typography>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          rowGap: "10px",
        }}
      >
        {error.length !== 0 &&
          error.map((e) => (
            <Alert key={e} severity="error">
              {e}
            </Alert>
          ))}
        <TextField
          fullWidth
          label="Email"
          id="email"
          name="email"
          inputRef={emailRef}
          onChange={() => setError([])}
        />
        <TextField
          fullWidth
          label="Password"
          id="password"
          type={"password"}
          name="password"
          inputRef={passwordRef}
          onChange={() => setError([])}
        />
        <LoginButton variant="contained" type="submit">
          Login
        </LoginButton>
      </Form>
      <Typography variant="body1">
        Create an Account <Link to={"/signup"}>Sign Up</Link>
      </Typography>
      {isLoading && <div className="loader"></div>}
    </Box>
  );
}
