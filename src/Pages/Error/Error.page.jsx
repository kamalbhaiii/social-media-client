import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Error = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component={"main"} sx={{ height: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h2">
            Error 404
          </Typography>
          <Typography component="h1" variant="h3">
            Page Not Found
          </Typography>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default Error;
