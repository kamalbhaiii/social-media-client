import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { data } = useSelector((state) => state.loginReducer);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(data);
  }, [data]);
  console.log(data);
  return (
    <Box>
      <Typography sx={{ display: "flex" }} variant="h2">
        Hello,{" "}
        <Typography variant="h2" color={"blueviolet"}>
          {data.firstName} {data?.lastName}
        </Typography>
      </Typography>
    </Box>
  );
};

export default Dashboard;
