import React from "react";
import Alert from "@mui/material/Alert";

const AlertInfo = ({ display, message }) => {
  return (
    <div>
      <Alert sx={{ display: { display } }} variant="filled" severity="info">
        {message}
      </Alert>
    </div>
  );
};

export default AlertInfo;
