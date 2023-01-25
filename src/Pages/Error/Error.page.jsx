import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Error = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Grid container component={"main"} sx={{ height: "100vh" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h2">
            Error{" "}
            <Typography component={"span"} variant="h2" sx={{ color: "red" }}>
              404
            </Typography>
          </Typography>
          <Typography component="h1" variant="h3">
            Page Not Found or It's under Development
          </Typography>
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Go Back to Home
          </Button>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default Error;
