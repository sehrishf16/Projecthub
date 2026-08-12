import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  MenuItem,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import PaletteIcon from "@mui/icons-material/Palette";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const defaultSettings = {
  darkMode: false,
  compactMode: false,
  fixedNavbar: true,
  collapseSidebar: false,
  primaryColor: "#1976d2",
};

const AppearanceSettings = () => {
  const [settings, setSettings] =
    useState(defaultSettings);

  const [snackbar, setSnackbar] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem("appearance");

    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSwitch =
    (name) => (event) => {
      setSettings((prev) => ({
        ...prev,
        [name]: event.target.checked,
      }));
    };

  const handleColor = (event) => {
    setSettings((prev) => ({
      ...prev,
      primaryColor: event.target.value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      "appearance",
      JSON.stringify(settings)
    );

    setSnackbar(true);
  };

  const handleReset = () => {
    localStorage.removeItem(
      "appearance"
    );

    setSettings(defaultSettings);
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
          <PaletteIcon
            color="primary"
            fontSize="large"
          />

          <Typography
            variant="h5"
            fontWeight={700}
          >
            Appearance Settings
          </Typography>
        </Box>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Customize the look and feel of
          ProjectHub.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Stack spacing={3}>

          <FormControlLabel
            control={
              <Switch
                checked={
                  settings.darkMode
                }
                onChange={handleSwitch(
                  "darkMode"
                )}
              />
            }
            label="Enable Dark Mode"
          />

          <FormControlLabel
            control={
              <Switch
                checked={
                  settings.compactMode
                }
                onChange={handleSwitch(
                  "compactMode"
                )}
              />
            }
            label="Compact Layout"
          />

          <FormControlLabel
            control={
              <Switch
                checked={
                  settings.fixedNavbar
                }
                onChange={handleSwitch(
                  "fixedNavbar"
                )}
              />
            }
            label="Fixed Navbar"
          />

          <FormControlLabel
            control={
              <Switch
                checked={
                  settings.collapseSidebar
                }
                onChange={handleSwitch(
                  "collapseSidebar"
                )}
              />
            }
            label="Collapse Sidebar"
          />

          <TextField
            select
            fullWidth
            label="Primary Theme Color"
            value={
              settings.primaryColor
            }
            onChange={handleColor}
          >
            <MenuItem value="#1976d2">
              Blue
            </MenuItem>

            <MenuItem value="#2e7d32">
              Green
            </MenuItem>

            <MenuItem value="#ed6c02">
              Orange
            </MenuItem>

            <MenuItem value="#7b1fa2">
              Purple
            </MenuItem>

            <MenuItem value="#d32f2f">
              Red
            </MenuItem>
          </TextField>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography fontWeight={600}>
              Selected Color
            </Typography>

            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor:
                  settings.primaryColor,
                border: "2px solid",
                borderColor: "divider",
              }}
            />
          </Box>
                    <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4,
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

        </Stack>

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
            Appearance settings saved successfully!
          </Alert>
        </Snackbar>

      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;