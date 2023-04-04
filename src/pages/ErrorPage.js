import { useRouteError } from "react-router-dom";
import React from "react";
import { THEME_COLOR } from "../App";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: THEME_COLOR,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/') }>Back Home</Button>
    </Box>
  );
}