import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const DashboardLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      
      <Sidebar />

    
      <Navbar />

     
      <Box
        component="main"
        sx={{
          flexGrow: 1,

          width: {
            xs: "100%",
            md: "calc(100% - 260px)",
          },

          ml: {
            xs: 0,
            md: "260px",
          },

          minHeight: "100vh",

          bgcolor: "background.default",
          pt: {
            xs: "80px",
            md: "88px",
          },

          px: {
            xs: 2,
            sm: 3,
            md: 3,
          },

          pb: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;