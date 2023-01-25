import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "react-fullscreen-loading";
import { useSelector } from "react-redux";
import LinearLoader from "../../Components/LinearLoader/LinearLoader.comonent";

const Dashboard = () => {
  const { data, loading } = useSelector((state) => state.loginReducer);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(data);
  }, [data]);
  console.log(data);
  return (
    <Box>
      {loading === true ? <LinearLoader /> : ""}
      <Loading loading={loading === null || loading === false ? false : true} />
      <Typography sx={{ display: "flex" }} variant="h3">
        Hello,{" "}
        <Typography variant="h3" color={"blueviolet"}>
          {data.firstName} {data?.lastName}
        </Typography>
      </Typography>
    </Box>
  );
};

export default Dashboard;
