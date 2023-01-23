import React from "react";
import Alert from "@mui/material/Alert";

const AlertSuccess = ({ display, message }) => {
  return (
    <div>
      <Alert sx={{ display: { display } }} variant="filled" severity="success">
        {message}
      </Alert>
    </div>
  );
};

export default AlertSuccess;
