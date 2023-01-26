import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AlertInfo from "../../Components/AlertInfo/AlertInfo.component";
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordActions } from "../../redux";
import AlertSuccess from "../../Components/AlertSuccess/AlertSuccess.component";
import AlertDanger from "../../Components/AlertDanger/AlertDanger.component";
import Loading from "react-fullscreen-loading";
import Copyright from "../../Components/Copyright/Copyright.component";
import LinearLoader from "../../Components/LinearLoader/LinearLoader.comonent";
import { LockResetOutlined } from "@mui/icons-material";

const theme = createTheme();

export default function ForgetPassword() {
  const [alertInfo, setAlertInfo] = React.useState({
    message: null,
    display: "none",
  });
  const [alertSuccess, setAlertSuccess] = React.useState({
    message: null,
    display: "none",
  });
  const [alertDanger, setAlertDanger] = React.useState({
    error: null,
    display: "none",
  });
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const { message, error, loading } = useSelector(
    (state) => state.forgetPasswordReducer
  );
  React.useEffect(() => {
    if (loading === false && error === null) {
      setAlertSuccess({
        ...alertSuccess,
        display: "flex",
        message: message,
      });
      setTimeout(() => {
        setAlertSuccess({
          ...alertSuccess,
          display: "none",
          message: null,
        });
      }, 2000);
      setEmail("");
      dispatch(forgetPasswordActions.forgetPasswordRemoveData());
    } else if (loading === false && error !== null) {
      setAlertDanger({
        ...alertDanger,
        display: "flex",
        error: error,
      });
      setTimeout(() => {
        setAlertDanger({
          ...alertDanger,
          display: "none",
          error: null,
        });
      }, 2000);
    }
  }, [error, loading]);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      {loading === true ? <LinearLoader /> : ""}
      <Loading loading={loading === null || loading === false ? false : true} />
      <AlertInfo message={alertInfo.message} display={alertInfo.display} />
      <AlertSuccess
        message={alertSuccess.message}
        display={alertSuccess.display}
      />
      <AlertDanger display={alertDanger.display} error={alertDanger.error} />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockResetOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forget Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                autoComplete="given-email"
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!email) {
                        setAlertInfo({
                          ...alertInfo,
                          message: "Email is a required field.",
                          display: "flex",
                        });
                        setTimeout(() => {
                          setAlertInfo({
                            ...alertInfo,
                            message: null,
                            display: "none",
                          });
                        }, 2000);
                      } else {
                        dispatch(
                          forgetPasswordActions.forgetPasswordApiCall(email)
                        );
                      }
                    }}
                  >
                    Send Reset Password Link
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                  >
                    {"Having Some Idea? Login"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
