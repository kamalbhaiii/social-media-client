import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearLoader() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress sx={{ zIndex: 1000 }} />
    </Box>
  );
}
