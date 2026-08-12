import { Box } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: {
          xs: 2,
          md: 4,
        },
        bgcolor: "#FFF5ED",
      }}
    >
      {children}
    </Box>
  );
};

export default AuthLayout;