import { Box, Typography } from "@mui/material";

const Logo = ({ collapsed = false }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 2,
        px: 2,
      }}
    >
      {/* Logo Circle */}
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: "12px",
          bgcolor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.2rem",
          flexShrink: 0,
        }}
      >
        P
      </Box>

      {!collapsed && (
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#fff",
            }}
          >
            ProjectHub
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Project Management
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Logo;