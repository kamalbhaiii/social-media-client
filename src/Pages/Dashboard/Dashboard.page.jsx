import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { data } = useSelector((state) => state.loginReducer);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(data);
  }, [data]);
  console.log(data);
  return <div>Dashboard</div>;
};

export default Dashboard;
