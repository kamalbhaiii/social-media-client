import React from "react";
import Alert from "@mui/material/Alert";

const AlertDanger = ({ display, error }) => {
  return (
    <div>
      <Alert sx={{ display: { display } }} variant="filled" severity="error">
        {error}
      </Alert>
    </div>
  );
};

export default AlertDanger;
