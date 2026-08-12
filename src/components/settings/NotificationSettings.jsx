import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SaveIcon from "@mui/icons-material/Save";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskNotifications: true,
    calendarReminders: true,
    teamUpdates: true,
    weeklySummary: false,
    notificationSound: "Default",
  });

  const handleSwitch = (name) => (event) => {
    setSettings((prev) => ({
      ...prev,
      [name]: event.target.checked,
    }));
  };

  const handleSelect = (event) => {
    setSettings((prev) => ({
      ...prev,
      notificationSound: event.target.value,
    }));
  };

  const handleSave = () => {
    console.log(settings);

    // Redux Dispatch

    // API Call

    // LocalStorage
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
          <NotificationsActiveIcon
            color="primary"
            fontSize="large"
          />

          <Typography
            variant="h5"
            fontWeight={700}
          >
            Notification Settings
          </Typography>
        </Box>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Choose how you'd like to receive
          notifications.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Stack spacing={3}>

          <FormControlLabel
            control={
              <Switch
                checked={settings.emailNotifications}
                onChange={handleSwitch(
                  "emailNotifications"
                )}
              />
            }
            label="Email Notifications"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.pushNotifications}
                onChange={handleSwitch(
                  "pushNotifications"
                )}
              />
            }
            label="Push Notifications"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.taskNotifications}
                onChange={handleSwitch(
                  "taskNotifications"
                )}
              />
            }
            label="Task Notifications"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.calendarReminders}
                onChange={handleSwitch(
                  "calendarReminders"
                )}
              />
            }
            label="Calendar Reminders"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.teamUpdates}
                onChange={handleSwitch(
                  "teamUpdates"
                )}
              />
            }
            label="Team Updates"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.weeklySummary}
                onChange={handleSwitch(
                  "weeklySummary"
                )}
              />
            }
            label="Weekly Summary Email"
          />

          <TextField
            select
            fullWidth
            label="Notification Sound"
            value={settings.notificationSound}
            onChange={handleSelect}
          >
            <MenuItem value="Default">
              Default
            </MenuItem>

            <MenuItem value="Chime">
              Chime
            </MenuItem>

            <MenuItem value="Bell">
              Bell
            </MenuItem>

            <MenuItem value="Pop">
              Pop
            </MenuItem>

            <MenuItem value="Silent">
              Silent
            </MenuItem>
          </TextField>

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

export default NotificationSettings;