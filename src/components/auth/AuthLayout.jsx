import { Box } from "@mui/material";

const AuthLayout = ({
  children,
  fullScreen = false,
}) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: fullScreen
          ? "#FFF6EC"
          : "#FFF5ED",

        display: fullScreen
          ? "block"
          : "flex",

        alignItems: fullScreen
          ? "unset"
          : "center",

        justifyContent: fullScreen
          ? "unset"
          : "center",

        p: fullScreen
          ? 0
          : {
              xs: 2,
              md: 4,
            },

        overflowX: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

export default AuthLayout;