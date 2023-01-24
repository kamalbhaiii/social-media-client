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
import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import AlertInfo from "../../Components/AlertInfo/AlertInfo.component";
import { useDispatch, useSelector } from "react-redux";
import { signupActions } from "../../redux";
import AlertSuccess from "../../Components/AlertSuccess/AlertSuccess.component";
import AlertDanger from "../../Components/AlertDanger/AlertDanger.component";
import Loading from "react-fullscreen-loading";
import Copyright from "../../Components/Copyright/Copyright.component";
import LinearLoader from "../../Components/LinearLoader/LinearLoader.comonent";

const theme = createTheme();

export default function SignupUsername() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = React.useState(null);
  const { loading, error } = useSelector((state) => state.signupReducer);
  const [alertSuccess, setAlertSuccess] = React.useState({
    display: "none",
    message: null,
  });
  const [alertInfo, setAlertInfo] = React.useState({
    display: "none",
    message: null,
  });
  const [alertDanger, setAlertDanger] = React.useState({
    display: "none",
    error: null,
  });

  React.useEffect(() => {
    setData(location.state);
  }, []);

  React.useEffect(() => {
    if (loading === false && error === null) {
      setAlertSuccess({
        ...alertSuccess,
        display: "flex",
        message: "Account created successfully.",
      });
      setTimeout(() => {
        setAlertSuccess({
          ...alertSuccess,
          display: "none",
          message: null,
        });
        navigate("/login");
      }, 2000);
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                autoComplete="given-username"
                name="userName"
                required
                fullWidth
                id="userName"
                label="Username"
                autoFocus
                value={data?.username}
                onChange={(e) => {
                  setData({
                    ...data,
                    username: e.target.value,
                  });
                }}
              />
              <FormControlLabel
                control={<Checkbox value="t&c" color="primary" />}
                label="I have read and agree to the terms and conditions."
                onChange={(e) => {
                  setData({
                    ...data,
                    tAndC: !data.tAndC,
                  });
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 0 }}
                    md={{ mt: 3, mb: 2 }}
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup", { state: data });
                    }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 0, mb: 3 }}
                    md={{ mt: 3, mb: 2 }}
                    color="success"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        data.username &&
                        data.firstName &&
                        data.email &&
                        data.password
                      ) {
                        dispatch(signupActions.signupApiCall(data));
                      } else {
                        if (!data.username) {
                          setAlertInfo({
                            display: "flex",
                            message: "Username is a requied field.",
                          });
                          setTimeout(() => {
                            setAlertInfo({
                              display: "none",
                              message: null,
                            });
                          }, 2000);
                        }
                      }
                    }}
                  >
                    Signup
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
                    {"Already have an account? Login"}
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
