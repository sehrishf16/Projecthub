import { useEffect, useRef, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Snackbar,
  Alert,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const defaultProfile = {
  firstName: "Sehrish",
  lastName: "Fatema",
  email: "sehrish@example.com",
  phone: "",
  role: "Frontend Developer",
  department: "Engineering",
  location: "Hyderabad, India",
  bio: "",
  avatar: "",
};

const ProfileSettings = () => {
  const fileInputRef = useRef(null);

  const [profile, setProfile] =
    useState(defaultProfile);

  const [errors, setErrors] =
    useState({});

  const [snackbar, setSnackbar] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem("profile");

    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const validate = () => {
    const temp = {};

    if (!profile.firstName.trim()) {
      temp.firstName =
        "First name is required";
    }

    if (!profile.lastName.trim()) {
      temp.lastName =
        "Last name is required";
    }

    if (!profile.email.trim()) {
      temp.email =
        "Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(profile.email)
    ) {
      temp.email =
        "Invalid email";
    }

    if (
      profile.phone &&
      !/^[0-9]{10}$/.test(profile.phone)
    ) {
      temp.phone =
        "Enter a valid phone number";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleChange = (event) => {
    setProfile((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.value,
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatar = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = () => {
      setProfile((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!validate()) return;

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    setSnackbar(true);
  };

  const handleReset = () => {
    localStorage.removeItem(
      "profile"
    );

    setProfile(defaultProfile);

    setErrors({});
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>

        <Typography
          variant="h5"
          fontWeight={700}
        >
          Profile Settings
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Update your profile information.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Stack
          spacing={2}
          alignItems="center"
          mb={5}
        >
          <Avatar
            src={profile.avatar}
            sx={{
              width: 120,
              height: 120,
              bgcolor: "primary.main",
              fontSize: 42,
            }}
          >
            {!profile.avatar &&
              profile.firstName[0]}
          </Avatar>

          <input
            hidden
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatar}
          />

          <Button
            variant="outlined"
            startIcon={
              <CameraAltIcon />
            }
            onClick={
              handleAvatarClick
            }
          >
            Upload Photo
          </Button>
        </Stack>

        <Grid
          container
          spacing={3}
        >
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={
                profile.firstName
              }
              onChange={
                handleChange
              }
              error={
                !!errors.firstName
              }
              helperText={
                errors.firstName
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={
                profile.lastName
              }
              onChange={
                handleChange
              }
              error={
                !!errors.lastName
              }
              helperText={
                errors.lastName
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={
                profile.email
              }
              onChange={
                handleChange
              }
              error={
                !!errors.email
              }
              helperText={
                errors.email
              }
            />
          </Grid>
                    <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={profile.role}
              onChange={handleChange}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={profile.department}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={profile.location}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="error"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
          >
            Reset
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{
              px: 4,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Save Changes
          </Button>
        </Box>

        <Snackbar
          open={snackbar}
          autoHideDuration={3000}
          onClose={() => setSnackbar(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={() => setSnackbar(false)}
          >
            Profile updated successfully!
          </Alert>
        </Snackbar>

      </CardContent>
    </Card>
  );
};

export default ProfileSettings;