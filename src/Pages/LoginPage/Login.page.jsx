import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import AlertDanger from "../../Components/AlertDanger/AlertDanger.component";
import Loading from "react-fullscreen-loading";
import AlertSuccess from "../../Components/AlertSuccess/AlertSuccess.component";
import AlertInfo from "../../Components/AlertInfo/AlertInfo.component";
import Copyright from "../../Components/Copyright/Copyright.component";

const theme = createTheme();

export default function Login() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => {
    return state.loginReducer;
  });
  const navigate = useNavigate();
  const [alertDanger, setAlertDanger] = React.useState({
    display: "none",
    error: null,
  });
  const [alertSuccess, setAlertSuccess] = React.useState({
    display: "none",
    message: null,
  });
  const [alertInfo, setAlertInfo] = React.useState({
    display: "none",
    message: null,
  });
  React.useEffect(() => {
    if (loading === false && error === null) {
      setAlertSuccess({
        ...alertSuccess,
        display: "flex",
        message: "Login Approved",
      });
      setTimeout(() => {
        setAlertSuccess({
          ...alertSuccess,
          display: "none",
          message: null,
        });
        navigate("/dashboard");
      }, 2000);
    } else if (loading === false && error !== null) {
      setAlertDanger({
        ...alertDanger,
        display: "flex",
        error: "Invalid Credentials",
      });
      setTimeout(() => {
        setAlertDanger({
          ...alertDanger,
          display: "none",
          error: null,
        });
      }, 2000);
      dispatch(loginActions.resetLoginData());
    }
  }, [loading, error]);
  return (
    <ThemeProvider theme={theme}>
      <Loading loading={loading === null || loading === false ? false : true} />
      <AlertDanger display={alertDanger.display} error={alertDanger.error} />
      <AlertSuccess
        display={alertSuccess.display}
        message={alertSuccess.message}
      />
      <AlertInfo display={alertInfo.display} message={alertInfo.message} />
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setData({
                    ...data,
                    email: e.target.value,
                  });
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  e.preventDefault();
                  if (data.email && data.password) {
                    dispatch(loginActions.loginApiCall(data));
                  } else {
                    if (!data.email && !data.password) {
                      setAlertInfo({
                        ...alertInfo,
                        display: "flex",
                        message: "Email and Password are required fields.",
                      });
                    } else if (!data.password) {
                      setAlertInfo({
                        ...alertInfo,
                        display: "flex",
                        message: "Password is a required field.",
                      });
                    } else {
                      setAlertInfo({
                        ...alertInfo,
                        display: "flex",
                        message: "Email is a required field.",
                      });
                    }

                    setTimeout(() => {
                      setAlertInfo({
                        ...alertInfo,
                        display: "none",
                      });
                    }, 2000);
                  }
                }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/forgetPassword");
                    }}
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                    }}
                  >
                    {"Don't have an account? Sign Up"}
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
