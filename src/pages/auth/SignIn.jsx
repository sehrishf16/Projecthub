import { useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate, useLocation } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";

import { loginUser } from "../../utils/session";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] =
    useState(false);

  const [remember, setRemember] =
    useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const email = form.email.trim();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!form.password) {
      setError("Please enter your password.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    /*
     * Check whether a user has previously
     * created an account through Sign Up.
     */

    const savedUser =
      localStorage.getItem("projecthub_user");

    let user;

    if (savedUser) {
      try {
        user = JSON.parse(savedUser);
      } catch {
        localStorage.removeItem(
          "projecthub_user"
        );

        setError(
          "Unable to read account information. Please sign up again."
        );

        return;
      }

      if (
        user.email !== email ||
        user.password !== form.password
      ) {
        setError(
          "Invalid email or password."
        );

        return;
      }
    } else {
      /*
       * Demo fallback.
       * This allows the project to be tested
       * even before creating an account.
       */
      user = {
        name: "ProjectHub User",
        email,
        role: "Team Member",
      };
    }

    loginUser({
      name: user.name,
      email: user.email,
      role: user.role || "Team Member",
    });

    setSuccess(true);

    /*
     * If ProtectedRoute redirected the user
     * from another page, return them there.
     * Otherwise go to Dashboard.
     */

    const redirectPath =
      location.state?.from?.pathname ||
      "/dashboard";

    setTimeout(() => {
      navigate(redirectPath, {
        replace: true,
      });
    }, 700);
  };

  return (
    <AuthLayout>
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 470,
          borderRadius: 5,
          border: "1px solid",
          borderColor: "divider",
          boxShadow:
            "0 24px 70px rgba(80, 50, 30, 0.10)",
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 3,
              sm: 4,
              md: 5,
            },
          }}
        >
          {/* Back Button */}

          <IconButton
            onClick={() => navigate("/")}
            sx={{
              mb: 2,
              bgcolor: "action.hover",
              "&:hover": {
                bgcolor: "action.selected",
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* Header */}

          <Stack
            alignItems="center"
            spacing={2}
            mb={4}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                bgcolor: "primary.main",
                fontSize: 30,
                fontWeight: 800,
                boxShadow:
                  "0 8px 25px rgba(255,127,51,0.25)",
              }}
            >
              P
            </Avatar>

            <Box textAlign="center">
              <Typography
                variant="h4"
                fontWeight={800}
              >
                Welcome Back!
              </Typography>

              <Typography
                color="text.secondary"
                mt={1}
              >
                Sign in to continue to ProjectHub
              </Typography>
            </Box>
          </Stack>

          {/* Error */}

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
              }}
            >
              {error}
            </Alert>
          )}

          {/* Form */}

          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                required
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />

              <TextField
                fullWidth
                required
                label="Password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        edge="end"
                        onClick={() =>
                          setShowPassword(
                            (prev) => !prev
                          )
                        }
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Remember + Forgot */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={(event) =>
                        setRemember(
                          event.target.checked
                        )
                      }
                    />
                  }
                  label="Remember me"
                />

                <Button
                  type="button"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                  onClick={() => {
                    setError(
                      "Password recovery will be connected to the backend later."
                    );
                  }}
                >
                  Forgot Password?
                </Button>
              </Box>

              {/* Sign In */}

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<LoginIcon />}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  boxShadow:
                    "0 8px 20px rgba(255,127,51,0.25)",
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Box>

          {/* Sign Up */}

          <Typography
            textAlign="center"
            color="text.secondary"
            mt={4}
          >
            Don't have an account?{" "}
            <Box
              component="span"
              onClick={() =>
                navigate("/signup")
              }
              sx={{
                color: "primary.main",
                fontWeight: 700,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign Up
            </Box>
          </Typography>
        </CardContent>
      </Card>

      {/* Success */}

      <Snackbar
        open={success}
        autoHideDuration={1000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
        >
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
};

export default SignIn;