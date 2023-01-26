import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import AlertInfo from "../../Components/AlertInfo/AlertInfo.component";
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordActions } from "../../redux";
import AlertSuccess from "../../Components/AlertSuccess/AlertSuccess.component";
import AlertDanger from "../../Components/AlertDanger/AlertDanger.component";
import Loading from "react-fullscreen-loading";
import Copyright from "../../Components/Copyright/Copyright.component";
import LinearLoader from "../../Components/LinearLoader/LinearLoader.comonent";
import { LockResetOutlined } from "@mui/icons-material";
import jwt from "jwt-decode";

const theme = createTheme();

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [userData, setUserData] = React.useState(null);
  const [password, setPassword] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [alertDanger, setAlertDanger] = React.useState({
    display: "none",
    error: null,
  });
  const [alertInfo, setAlertInfo] = React.useState({
    display: "none",
    message: null,
  });
  const [alertSuccess, setAlertSuccess] = React.useState({
    display: "none",
    message: null,
  });
  React.useEffect(() => {
    setUserData(jwt(params.resetToken));
  }, []);
  const { message, loading, error } = useSelector(
    (state) => state.forgetPasswordReducer
  );
  React.useEffect(() => {
    if (loading === false && error === null && message !== null) {
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
        navigate("/login");
      }, 2000);
    } else if (loading === false && error !== null && message === null) {
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
  }, [loading, error]);
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
              Reset Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                autoComplete="given-email"
                name="email"
                disabled
                fullWidth
                id="email"
                label="Email"
                value={userData?.email}
              />
              <TextField
                margin="normal"
                autoComplete="given-password"
                name="password"
                required
                fullWidth
                id="password"
                label="Password"
                type={"password"}
                autoFocus
                value={password.password}
                onChange={(e) => {
                  setPassword({
                    ...password,
                    password: e.target.value,
                  });
                }}
              />
              <TextField
                margin="normal"
                autoComplete="given-confirm-password"
                name="confirm-password"
                required
                fullWidth
                id="confirm-password"
                label="Confirm Password"
                type={"password"}
                value={password.confirmPassword}
                onChange={(e) => {
                  setPassword({
                    ...password,
                    confirmPassword: e.target.value,
                  });
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
                      if (!password.password || !password.confirmPassword) {
                        if (!password.password && !password.confirmPassword) {
                          setAlertInfo({
                            ...alertInfo,
                            display: "flex",
                            message:
                              "Password and Confirm Password are required fields.",
                          });
                          setTimeout(() => {
                            setAlertInfo({
                              ...alertInfo,
                              display: "none",
                              message: null,
                            });
                          }, 2000);
                        } else if (!password.confirmPassword) {
                          setAlertInfo({
                            ...alertInfo,
                            display: "flex",
                            message: "Confirm Password is a required field.",
                          });
                          setTimeout(() => {
                            setAlertInfo({
                              ...alertInfo,
                              display: "none",
                              message: null,
                            });
                          }, 2000);
                        } else {
                          setAlertInfo({
                            ...alertInfo,
                            display: "flex",
                            message: "Password is a required field.",
                          });
                          setTimeout(() => {
                            setAlertInfo({
                              ...alertInfo,
                              display: "none",
                              message: null,
                            });
                          }, 2000);
                        }
                      } else {
                        if (password.password !== password.confirmPassword) {
                          setAlertInfo({
                            ...alertInfo,
                            display: "flex",
                            message:
                              "Password and Confirm Password should match.",
                          });
                          setTimeout(() => {
                            setAlertInfo({
                              ...alertInfo,
                              display: "none",
                              message: null,
                            });
                          }, 2000);
                        } else {
                          dispatch(
                            forgetPasswordActions.resetPasswordApiCall(
                              password.password,
                              params.resetToken
                            )
                          );
                        }
                      }
                    }}
                  >
                    Reset Password
                  </Button>
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
