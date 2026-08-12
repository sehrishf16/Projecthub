import { useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const existingUser = localStorage.getItem("projecthub_user");

    if (existingUser) {
      try {
        const user = JSON.parse(existingUser);

        if (user.email?.toLowerCase() === form.email.trim().toLowerCase()) {
          setErrors({
            email: "An account with this email already exists.",
          });

          return;
        }
      } catch {
        localStorage.removeItem("projecthub_user");
      }
    }

    const user = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      role: "Team Member",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("projecthub_user", JSON.stringify(user));

    setSuccess(true);

    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      navigate("/signin", {
        replace: true,
      });
    }, 1200);
  };

  return (
    <AuthLayout>
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 5,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 24px 70px rgba(80, 50, 30, 0.10)",
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
          <IconButton
            onClick={() => navigate("/signin")}
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

          <Stack alignItems="center" spacing={2} mb={4}>
            <Avatar
              sx={{
                width: 70,
                height: 70,
                bgcolor: "primary.main",
                fontSize: 30,
                boxShadow: "0 8px 25px rgba(255,127,51,0.25)",
              }}
            >
              <PersonAddIcon fontSize="large" />
            </Avatar>

            <Box textAlign="center">
              <Typography variant="h4" fontWeight={800}>
                Create Account
              </Typography>

              <Typography color="text.secondary" mt={1}>
                Create your ProjectHub account and start managing projects.
              </Typography>
            </Box>
          </Stack>

          {errors.submit && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
              }}
            >
              {errors.submit}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                required
                label="Full Name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                placeholder="Enter your full name"
              />

              <TextField
                fullWidth
                required
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                placeholder="you@example.com"
              />

              <TextField
                fullWidth
                required
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password || "Minimum 6 characters"}
                placeholder="Create a password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
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

              <TextField
                fullWidth
                required
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                placeholder="Confirm your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        edge="end"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<PersonAddIcon />}
                sx={{
                  py: 1.5,
                  mt: 1,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  boxShadow: "0 8px 20px rgba(255,127,51,0.25)",
                }}
              >
                Create Account
              </Button>
            </Stack>
          </Box>

          <Typography textAlign="center" color="text.secondary" mt={4}>
            Already have an account?{" "}
            <Box
              component="span"
              onClick={() => navigate("/signin")}
              sx={{
                color: "primary.main",
                fontWeight: 700,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign In
            </Box>
          </Typography>
        </CardContent>
      </Card>

      <Snackbar
        open={success}
        autoHideDuration={1200}
        onClose={() => setSuccess(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert severity="success" variant="filled">
          Account created successfully! Redirecting to Sign In...
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
};

export default SignUp;
