import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const EmailVerified = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    localStorage.clear( );
  }, []);
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
            Success{" "}
            <Typography component={"span"} variant="h2" sx={{ color: "green" }}>
              ;D
            </Typography>
          </Typography>
          <Typography component="h1" variant="h3">
            Email id verification is successfull.
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
            Continue
          </Button>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default EmailVerified;
