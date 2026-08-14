import { useState } from "react";

import {
  Box,
  Toolbar,
} from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const drawerWidth = 260;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* SIDEBAR */}

      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={
          handleDrawerToggle
        }
      />

      {/* MAIN AREA */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,

          width: {
            xs: "100%",
            md: `calc(100% - ${drawerWidth}px)`,
          },

          minHeight: "100vh",

          bgcolor:
            "background.default",
        }}
      >
        {/* NAVBAR */}

        <Navbar
          handleDrawerToggle={
            handleDrawerToggle
          }
        />

        {/* Navbar spacing */}

        <Toolbar />

        {/* PAGE CONTENT */}

        <Box
          sx={{
            p: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;