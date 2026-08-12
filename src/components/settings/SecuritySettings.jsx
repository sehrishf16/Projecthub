import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SecuritySettings = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
  });

  const handleChange = (e) => {
    setSecurity((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSwitch = (event) => {
    setSecurity((prev) => ({
      ...prev,
      twoFactor: event.target.checked,
    }));
  };

  const handleSave = () => {
    if (
      security.newPassword !==
      security.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    console.log(security);

    // TODO:
    // Redux Dispatch
    // API Call
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <SecurityIcon
            color="primary"
            fontSize="large"
          />

          <Typography
            variant="h5"
            fontWeight={700}
          >
            Security Settings
          </Typography>
        </Box>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Update your password and security
          preferences.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Stack spacing={3}>
          <TextField
            fullWidth
            type={
              showPassword
                ? "text"
                : "password"
            }
            label="Current Password"
            name="currentPassword"
            value={security.currentPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            type={
              showPassword
                ? "text"
                : "password"
            }
            label="New Password"
            name="newPassword"
            value={security.newPassword}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            type={
              showPassword
                ? "text"
                : "password"
            }
            label="Confirm Password"
            name="confirmPassword"
            value={security.confirmPassword}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Switch
                checked={security.twoFactor}
                onChange={handleSwitch}
              />
            }
            label="Enable Two-Factor Authentication (2FA)"
          />

          <Alert severity="info">
            Two-Factor Authentication adds
            extra security to your account.
          </Alert>

          <Divider />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Active Session
          </Typography>

          <Typography color="text.secondary">
            Windows • Chrome • Hyderabad,
            India
          </Typography>

          <Button
            color="error"
            variant="outlined"
            startIcon={<LogoutIcon />}
          >
            Logout From All Devices
          </Button>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 5,
          }}
        >
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{
              borderRadius: 3,
              px: 4,
              textTransform: "none",
            }}
          >
            Save Changes
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;