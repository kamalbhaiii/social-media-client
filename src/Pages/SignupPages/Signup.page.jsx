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
import { useLocation, useNavigate } from "react-router-dom";
import AlertInfo from "../../Components/AlertInfo/AlertInfo.component";
import Copyright from "../../Components/Copyright/Copyright.component";
import { HowToRegOutlined } from "@mui/icons-material";

const theme = createTheme();

export default function Signup() {
  const location = useLocation();
  const [alertInfo, setAlertInfo] = React.useState({
    display: "none",
    message: null,
  });
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    tAndC: false,
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.state) {
      setData({
        ...data,
        firstName: location.state.firstName,
        lastName: location.state.lastName,
        email: location.state.email,
        password: location.state.password,
        username: location.state.username,
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
              <HowToRegOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={data.firstName}
                onChange={(e) => {
                  setData({
                    ...data,
                    firstName: e.target.value,
                  });
                }}
              />

              <TextField
                margin="normal"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={data.lastName}
                onChange={(e) => {
                  setData({
                    ...data,
                    lastName: e.target.value,
                  });
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={data.email}
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
                value={data.password}
                autoComplete="current-password"
                onChange={(e) => {
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  e.preventDefault();
                  if (!data.email || !data.firstName || !data.password) {
                    setAlertInfo({
                      ...alertInfo,
                      display: "flex",
                      message: "Please fill all the required fields.",
                    });
                    setTimeout(() => {
                      setAlertInfo({
                        ...alertInfo,
                        display: "none",
                        message: null,
                      });
                    }, 2000);
                  } else {
                    navigate(`/signup/${data.email}`, { state: data });
                  }
                }}
              >
                Next
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="#"
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
