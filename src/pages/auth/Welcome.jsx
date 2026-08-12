import {
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LoginIcon from "@mui/icons-material/Login";
import GroupsIcon from "@mui/icons-material/Groups";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";

import projecthubAvatar from "../../assets/projecthub-avatar.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1180,
          minHeight: {
            xs: "auto",
            md: 680,
          },
          bgcolor: "background.paper",
          borderRadius: {
            xs: 4,
            md: 6,
          },
          overflow: "hidden",
          boxShadow:
            "0 24px 70px rgba(80, 50, 30, 0.12)",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        {/* =====================================================
            LEFT - ILLUSTRATION
        ====================================================== */}

        <Box
          sx={{
            width: {
              xs: "100%",
              md: "48%",
            },
            minHeight: {
              xs: 420,
              md: 680,
            },
            bgcolor: "#FFF0E9",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: {
              xs: 3,
              md: 5,
            },
          }}
        >
          {/* Decorative Circle */}

          <Box
            sx={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              bgcolor: "#FFD9CC",
              top: -140,
              left: -100,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              bgcolor: "#FFE5B8",
              bottom: -100,
              right: -80,
            }}
          />

          {/* Illustration Container */}

          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: 440,
              textAlign: "center",
            }}
          >
            <Chip
              label="PROJECT MANAGEMENT"
              sx={{
                mb: 2,
                px: 1,
                bgcolor: "rgba(255,255,255,0.9)",
                color: "#333",
                fontWeight: 800,
                letterSpacing: 1,
                borderRadius: 2,
              }}
            />

            <Typography
              variant="h5"
              fontWeight={800}
              sx={{
                mb: 3,
                color: "#292929",
              }}
            >
              Plan. Collaborate. Achieve.
            </Typography>

            <Box
              sx={{
                width: "100%",
                maxWidth: 390,
                height: {
                  xs: 330,
                  md: 440,
                },
                mx: "auto",
                borderRadius: 5,
                overflow: "hidden",
                bgcolor: "#F8C5B5",
                boxShadow:
                  "0 18px 45px rgba(120,70,50,0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                src={projecthubAvatar}
                alt="ProjectHub illustration"
                variant="rounded"
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: "transparent",
                  borderRadius: 0,

                  "& img": {
                    objectFit: "cover",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* =====================================================
            RIGHT - CONTENT
        ====================================================== */}

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            p: {
              xs: 4,
              sm: 5,
              md: 7,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 560,
              mx: "auto",
            }}
          >
            {/* Logo */}

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              mb={4}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 25,
                  fontWeight: 800,
                  boxShadow:
                    "0 8px 20px rgba(255,127,51,0.25)",
                }}
              >
                P
              </Box>

              <Box>
                <Typography
                  fontWeight={800}
                  fontSize={22}
                  lineHeight={1}
                >
                  ProjectHub
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Project Management
                </Typography>
              </Box>
            </Stack>

            {/* Heading */}

            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                fontSize: {
                  xs: "2.4rem",
                  sm: "3rem",
                  md: "3.7rem",
                },
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              Everything your
              <Box
                component="span"
                sx={{
                  display: "block",
                  color: "primary.main",
                }}
              >
                team needs.
              </Box>
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: 16,
                  md: 18,
                },
                lineHeight: 1.7,
                maxWidth: 500,
                mb: 4,
              }}
            >
              Organize projects, manage tasks,
              collaborate with your team and
              stay on top of deadlines—all from
              one simple workspace.
            </Typography>

            {/* Features */}

            <Stack spacing={2.2} mb={5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    flexShrink: 0,
                    borderRadius: 2.5,
                    bgcolor: "primary.light",
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TaskAltIcon />
                </Box>

                <Box>
                  <Typography fontWeight={700}>
                    Smart Task Management
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Create, track and complete
                    tasks with ease.
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    flexShrink: 0,
                    borderRadius: 2.5,
                    bgcolor: "#E8F5E9",
                    color: "success.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GroupsIcon />
                </Box>

                <Box>
                  <Typography fontWeight={700}>
                    Team Collaboration
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Keep everyone aligned and
                    productive.
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    flexShrink: 0,
                    borderRadius: 2.5,
                    bgcolor: "#FFF3E0",
                    color: "warning.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CalendarMonthIcon />
                </Box>

                <Box>
                  <Typography fontWeight={700}>
                    Stay on Schedule
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Manage deadlines and upcoming
                    events.
                  </Typography>
                </Box>
              </Box>
            </Stack>

            {/* Buttons */}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/signin")}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  boxShadow:
                    "0 8px 20px rgba(255,127,51,0.25)",
                }}
              >
                Get Started
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<LoginIcon />}
                onClick={() => navigate("/signin")}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                Sign In
              </Button>
            </Stack>

            {/* Signup */}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 3 }}
            >
              New to ProjectHub?{" "}
              <Box
                component="span"
                onClick={() => navigate("/signup")}
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Create an account
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Welcome;