import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import projecthubAvatar from "../../assets/projecthub-avatar.png";

const features = [
  {
    icon: <FolderOutlinedIcon />,
    title: "Manage",
    subtitle: "Projects",
  },
  {
    icon: <ChecklistOutlinedIcon />,
    title: "Track",
    subtitle: "Tasks",
  },
  {
    icon: <GroupsOutlinedIcon />,
    title: "Work",
    subtitle: "Together",
  },
  {
    icon: <CalendarMonthOutlinedIcon />,
    title: "Stay",
    subtitle: "Organized",
  },
];

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout fullScreen>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
          bgcolor: "#FFF6EC",
          color: "#1B1B1D",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: {
              xs: 220,
              sm: 270,
              md: 310,
            },

            bgcolor: "#FF8A3D",

            borderBottomLeftRadius: "50% 48%",

            borderBottomRightRadius: "50% 48%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            overflow: "visible",

            /*
             * Decorative large circle
             */
            "&::before": {
              content: '""',
              position: "absolute",

              width: {
                xs: 430,
                sm: 620,
                md: 780,
              },

              height: {
                xs: 430,
                sm: 620,
                md: 780,
              },

              borderRadius: "50%",

              bgcolor: "rgba(255,255,255,0.10)",

              top: {
                xs: -350,
                sm: -500,
                md: -610,
              },

              left: "50%",

              transform: "translateX(-50%)",

              pointerEvents: "none",
            },

            /*
             * Right decorative circle
             */
            "&::after": {
              content: '""',
              position: "absolute",

              width: {
                xs: 150,
                sm: 220,
                md: 280,
              },

              height: {
                xs: 150,
                sm: 220,
                md: 280,
              },

              borderRadius: "50%",

              border: "1px solid rgba(255,255,255,0.18)",

              top: -80,
              right: {
                xs: -60,
                sm: -70,
                md: -100,
              },

              pointerEvents: "none",
            },
          }}
        >
          {/* =================================================
              AVATAR
          ================================================== */}

          <Box
            sx={{
              position: "relative",
              zIndex: 5,

              width: {
                xs: 150,
                sm: 190,
                md: 225,
              },

              height: {
                xs: 150,
                sm: 190,
                md: 225,
              },

              borderRadius: "50%",

              bgcolor: "#FFFFFF",

              p: {
                xs: 0.8,
                sm: 1,
                md: 1.2,
              },

              boxShadow: "0 18px 45px rgba(27,27,29,0.20)",
            }}
          >
            <Avatar
              src={projecthubAvatar}
              alt="ProjectHub"
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "transparent",

                "& img": {
                  objectFit: "cover",
                },
              }}
            />
          </Box>
        </Box>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <Box
          sx={{
            width: "100%",
            maxWidth: 900,
            mx: "auto",

            px: {
              xs: 2.5,
              sm: 4,
              md: 5,
            },

            textAlign: "center",

            /*
             * Pull content slightly closer to avatar
             */
            mt: {
              xs: 1,
              sm: 2,
              md: 3,
            },
          }}
        >
          {/* Heading */}

          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.7rem",
                md: "3.3rem",
              },

              lineHeight: 1.1,

              fontWeight: 800,

              color: "#1B1B1D",

              letterSpacing: "-0.03em",

              mb: 1.5,
            }}
          >
            Welcome to{" "}
            <Box
              component="span"
              sx={{
                color: "#FF8A3D",
              }}
            >
              ProjectHub
            </Box>
          </Typography>

          {/* Description */}

          <Typography
            sx={{
              maxWidth: 620,
              mx: "auto",

              color: "#3D332F",

              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.05rem",
              },

              lineHeight: 1.7,

              mb: 3.5,
            }}
          >
            Organize your projects, manage tasks, and collaborate effortlessly
            with your team — all in one place.
          </Typography>

          {/* =================================================
              GET STARTED
          ================================================== */}

          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/signin")}
            sx={{
              minWidth: 190,

              px: 4,
              py: 1.4,

              borderRadius: 3,

              bgcolor: "#FF8A3D",
              color: "#FFFFFF",

              textTransform: "none",

              fontWeight: 700,

              fontSize: "1rem",

              boxShadow: "0 10px 28px rgba(255,138,61,0.28)",

              "&:hover": {
                bgcolor: "#E76F22",

                transform: "translateY(-2px)",

                boxShadow: "0 14px 32px rgba(255,138,61,0.35)",
              },

              transition: "all 0.2s ease",
            }}
          >
            Get Started
          </Button>

          {/* =================================================
              FEATURES
          ================================================== */}

          <Box
            sx={{
              mt: {
                xs: 5,
                sm: 6,
              },

              mb: 3,

              display: "flex",

              justifyContent: "center",

              alignItems: "stretch",

              flexWrap: {
                xs: "wrap",
                sm: "nowrap",
              },

              width: "100%",

              maxWidth: 800,

              mx: "auto",

              borderRadius: 4,

              bgcolor: "rgba(255,255,255,0.72)",

              border: "1px solid #F0E3D4",

              boxShadow: "0 8px 25px rgba(27,27,29,0.05)",

              overflow: "hidden",
            }}
          >
            {features.map((feature, index) => (
              <Box
                key={feature.title}
                sx={{
                  flex: 1,

                  minWidth: {
                    xs: "50%",
                    sm: 0,
                  },

                  py: {
                    xs: 1.8,
                    sm: 2,
                  },

                  px: {
                    xs: 1,
                    sm: 1.5,
                  },

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  gap: {
                    xs: 1,
                    sm: 1.2,
                  },

                  borderRight:
                    index !== features.length - 1
                      ? {
                          xs: index === 1 ? "none" : "1px solid #F0E3D4",
                          sm: "1px solid #F0E3D4",
                        }
                      : "none",

                  borderBottom:
                    index < 2
                      ? {
                          xs: "1px solid #F0E3D4",
                          sm: "none",
                        }
                      : "none",
                }}
              >
                {/* Icon */}

                <Box
                  sx={{
                    width: 42,
                    height: 42,

                    borderRadius: "50%",

                    bgcolor:
                      index === 0
                        ? "#FFF0E5"
                        : index === 1
                          ? "#F4EEFF"
                          : index === 2
                            ? "#EAF8EF"
                            : "#EDF4FF",

                    color:
                      index === 0
                        ? "#FF8A3D"
                        : index === 1
                          ? "#7B61FF"
                          : index === 2
                            ? "#22A060"
                            : "#3976D2",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    flexShrink: 0,

                    "& svg": {
                      fontSize: 21,
                    },
                  }}
                >
                  {feature.icon}
                </Box>

                {/* Text */}

                <Box
                  sx={{
                    textAlign: "left",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: 12,
                        sm: 13,
                      },

                      lineHeight: 1.2,

                      color: "#1B1B1D",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: 11,
                        sm: 12,
                      },

                      color: "#7A6A62",

                      mt: 0.2,
                    }}
                  >
                    {feature.subtitle}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* =================================================
              FOOTER TAGLINE
          ================================================== */}

          <Typography
            sx={{
              color: "#A08F86",

              fontSize: {
                xs: 9,
                sm: 10,
              },

              letterSpacing: {
                xs: "0.18em",
                sm: "0.3em",
              },

              fontWeight: 600,

              pb: 3,
            }}
          >
            PLAN&nbsp;&nbsp;•&nbsp;&nbsp; COLLABORATE&nbsp;&nbsp;•&nbsp;&nbsp;
            ACHIEVE
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Welcome;
