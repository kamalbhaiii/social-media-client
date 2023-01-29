import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailActions } from "../../redux";
import LinearLoader from "../../Components/LinearLoader/LinearLoader.comonent";
import Loading from "react-fullscreen-loading";

const theme = createTheme();

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayMessage, setDisplayMessage] = React.useState({
    head: null,
    desc: null,
  });
  const { loading, message, error } = useSelector(
    (state) => state.verifyEmailReducer
  );
  React.useEffect(() => {
    dispatch(
      verifyEmailActions.verifyEmailApiCall(
        location?.search?.replace("?token=", "")
      )
    );
  }, [location]);

  React.useEffect(() => {
    if (error === null && loading === false) {
      setDisplayMessage({
        ...displayMessage,
        head: "Success",
        desc: message,
      });
    } else if (error !== null && loading === false) {
      setDisplayMessage({
        ...displayMessage,
        head: "Fail",
        desc: error,
      });
    }
  }, [error, loading]);

  return (
    <ThemeProvider theme={theme}>
      {loading === true ? <LinearLoader /> : ""}
      <Loading
        loaderColor="#1976D2"
        loading={loading === null || loading === false ? false : true}
      />
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
            {displayMessage.head}{" "}
            <Typography
              component={"span"}
              variant="h2"
              sx={{ color: message ? "green" : "red" }}
            >
              {message ? ";D" : ":("}
            </Typography>
          </Typography>
          <Typography component="h1" variant="h3">
            {displayMessage.desc}
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

export default VerifyEmail;
