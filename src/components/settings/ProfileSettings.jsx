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
  Chip,
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SaveIcon from "@mui/icons-material/Save";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CloseIcon from "@mui/icons-material/Close";

const defaultProfile = {
  firstName: "Sehrish",
  lastName: "Fatema",
  email: "sehrish@example.com",
  phone: "",
  role: "Frontend Developer",
  department: "Engineering",
  location: "N/A",
  bio: "",
  avatar: "",
};

const ProfileSettings = () => {
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(defaultProfile);

  const [editMode, setEditMode] = useState(false);

  const [errors, setErrors] = useState({});

  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch {
        setProfile(defaultProfile);
      }
    }
  }, []);

  const validate = () => {
    const temp = {};

    if (!profile.firstName.trim()) {
      temp.firstName = "First name is required";
    }

    if (!profile.lastName.trim()) {
      temp.lastName = "Last name is required";
    }

    if (!profile.email.trim()) {
      temp.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      temp.email = "Enter a valid email";
    }

    if (profile.phone && !/^[0-9]{10}$/.test(profile.phone)) {
      temp.phone = "Enter a valid 10 digit phone number";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatar = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2MB.");

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProfile((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    localStorage.setItem("profile", JSON.stringify(profile));

    setEditMode(false);
    setSnackbar(true);
  };

  const handleCancel = () => {
    const savedProfile = localStorage.getItem("profile");

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch {
        setProfile(defaultProfile);
      }
    } else {
      setProfile(defaultProfile);
    }

    setErrors({});
    setEditMode(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar(false);
  };

  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: {
              xs: 2.5,
              md: 4,
            },
            py: 3,

            display: "flex",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },

            justifyContent: "space-between",

            flexDirection: {
              xs: "column",
              sm: "row",
            },

            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Profile Settings
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              Manage your personal and professional information.
            </Typography>
          </Box>

          {!editMode && (
            <Button
              variant="contained"
              startIcon={<EditOutlinedIcon />}
              onClick={() => setEditMode(true)}
              sx={{
                borderRadius: 2,
                px: 2.5,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Divider />

        {!editMode ? (
          <CardContent
            sx={{
              p: {
                xs: 2.5,
                md: 4,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: {
                  xs: "center",
                  sm: "flex-start",
                },

                flexDirection: {
                  xs: "column",
                  sm: "row",
                },

                gap: 3,

                mb: 4,
              }}
            >
              <Avatar
                src={profile.avatar}
                alt={fullName}
                sx={{
                  width: {
                    xs: 100,
                    sm: 120,
                  },

                  height: {
                    xs: 100,
                    sm: 120,
                  },

                  bgcolor: "primary.main",

                  fontSize: 38,

                  fontWeight: 700,

                  border: "4px solid",

                  borderColor: "background.paper",

                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                }}
              >
                {!profile.avatar && profile.firstName?.[0]}
              </Avatar>

              <Box
                sx={{
                  textAlign: {
                    xs: "center",
                    sm: "left",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    fontSize: {
                      xs: "1.6rem",
                      sm: "2rem",
                    },
                  }}
                >
                  {fullName || "Your Name"}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                  }}
                >
                  {profile.role || "Add your role"}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent={{
                    xs: "center",
                    sm: "flex-start",
                  }}
                  sx={{
                    mt: 1.5,
                  }}
                >
                  {profile.department && (
                    <Chip
                      label={profile.department}
                      size="small"
                      icon={<BusinessCenterOutlinedIcon />}
                      sx={{
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Stack>
              </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={3}>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <ProfileInfo
                  icon={<EmailOutlinedIcon />}
                  label="Email"
                  value={profile.email || "Not provided"}
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <ProfileInfo
                  icon={<PhoneOutlinedIcon />}
                  label="Phone Number"
                  value={profile.phone || "Not provided"}
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <ProfileInfo
                  icon={<BusinessCenterOutlinedIcon />}
                  label="Role"
                  value={profile.role || "Not provided"}
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <ProfileInfo
                  icon={<BusinessCenterOutlinedIcon />}
                  label="Department"
                  value={profile.department || "Not provided"}
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <ProfileInfo
                  icon={<LocationOnOutlinedIcon />}
                  label="Location"
                  value={profile.location || "Not provided"}
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <Box
                  sx={{
                    p: 2.5,

                    borderRadius: 2,

                    bgcolor: "action.hover",

                    border: "1px solid",

                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={600}
                    mb={1}
                  >
                    About
                  </Typography>

                  <Typography
                    color={profile.bio ? "text.primary" : "text.secondary"}
                    sx={{
                      lineHeight: 1.7,
                    }}
                  >
                    {profile.bio || "No bio added yet."}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        ) : (
          <CardContent
            sx={{
              p: {
                xs: 2.5,
                md: 4,
              },
            }}
          >
            <Box
              sx={{
                mb: 4,
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Edit Profile
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                }}
              >
                Update your information and save your changes.
              </Typography>
            </Box>

            <Stack spacing={2} alignItems="center" mb={5}>
              <Avatar
                src={profile.avatar}
                sx={{
                  width: 110,
                  height: 110,

                  bgcolor: "primary.main",

                  fontSize: 40,

                  fontWeight: 700,
                }}
              >
                {!profile.avatar && profile.firstName?.[0]}
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
                size="small"
                startIcon={
                  <CameraAltIcon
                    sx={{
                      fontSize: 16,
                    }}
                  />
                }
                onClick={handleAvatarClick}
                sx={{
                  textTransform: "none",
                  width: 120,
                  minWidth: 0,
                  px: 1,
                  py: 0.6,
                  fontSize: "0.8rem",
                  borderRadius: 2,
                }}
              >
                Upload Photo
              </Button>
            </Stack>

            <Grid container spacing={3}>
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
                  value={profile.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
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
                  value={profile.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
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
                  value={profile.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
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

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                />
              </Grid>

              {/* BIO */}

              <Grid
                size={{
                  xs: 12,
                }}
              >
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

                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={handleCancel}
                sx={{
                  textTransform: "none",

                  borderRadius: 2,

                  px: 2.5,
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{
                  px: 3,

                  borderRadius: 2,

                  textTransform: "none",

                  fontWeight: 600,
                }}
              >
                Save Changes
              </Button>
            </Box>
          </CardContent>
        )}
      </Card>

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleSnackbarClose}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

const ProfileInfo = ({ icon, label, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",

        gap: 2,

        p: 2,

        borderRadius: 2,

        border: "1px solid",

        borderColor: "divider",

        minHeight: 78,

        transition: "0.2s",

        "&:hover": {
          borderColor: "primary.main",

          bgcolor: "rgba(255,138,61,0.04)",
        },
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,

          borderRadius: 2,

          bgcolor: "rgba(255,138,61,0.12)",

          color: "primary.main",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box
        sx={{
          minWidth: 0,
        }}
      >
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {label}
        </Typography>

        <Typography
          fontWeight={600}
          sx={{
            mt: 0.3,

            overflow: "hidden",

            textOverflow: "ellipsis",

            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
