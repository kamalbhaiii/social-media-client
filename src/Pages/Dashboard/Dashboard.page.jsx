import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "react-fullscreen-loading";
import { useSelector } from "react-redux";
import LinearLoader from "../../Components/LinearLoader/LinearLoader.comonent";
import "./Dashboard.page.css";

const theme = createTheme();

const Dashboard = () => {
  const { data, loading } = useSelector((state) => state.loginReducer);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(data);
  }, [data]);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh" }}>
        {loading === true ? <LinearLoader /> : ""}
        <Loading
          loaderColor="#1976D2"
          loading={loading === null || loading === false ? false : true}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography sx={{ display: "flex" }} variant="h3">
            Hello,{" "}
            <Typography variant="h3" className="color-change-text">
              {data.firstName} {data?.lastName}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
