import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
           ml: { md: "260px" }, // Desktop par sidebar ki width
      mt: "72px",          // Navbar ki height
      p: 3,
          bgcolor: "background.default",
        }}
      >
        <Navbar />

        <Box
          sx={{
            mt: "72px",
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;