import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import PaletteIcon from "@mui/icons-material/Palette";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import InfoIcon from "@mui/icons-material/Info";

import ProfileSettings from "../../components/settings/ProfileSettings";
import AppearanceSettings from "../../components/settings/AppearanceSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import AboutSettings from "../../components/settings/AboutSettings";

const Settings = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const renderContent = () => {
    switch (tab) {
      case 0:
        return <ProfileSettings />;

      case 1:
        return <AppearanceSettings />;

      case 2:
        return <NotificationSettings />;

      case 3:
        return <SecuritySettings />;

      case 4:
        return <AboutSettings />;

      default:
        return <ProfileSettings />;
    }
  };

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={1}
      >
        Settings
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Manage your account and application preferences.
      </Typography>

      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: 0 }}>

          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: 2,
              pt: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Tab
              icon={<PersonIcon />}
              iconPosition="start"
              label="Profile"
            />

            <Tab
              icon={<PaletteIcon />}
              iconPosition="start"
              label="Appearance"
            />

            <Tab
              icon={<NotificationsIcon />}
              iconPosition="start"
              label="Notifications"
            />

            <Tab
              icon={<SecurityIcon />}
              iconPosition="start"
              label="Security"
            />

            <Tab
              icon={<InfoIcon />}
              iconPosition="start"
              label="About"
            />
          </Tabs>

          <Box
            sx={{
              p: 3,
            }}
          >
            {renderContent()}
          </Box>

        </CardContent>
      </Card>

    </Box>
  );
};

export default Settings;