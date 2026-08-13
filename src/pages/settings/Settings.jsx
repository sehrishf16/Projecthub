import { useState } from "react";

import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";

import ProfileSettings from "../../components/settings/ProfileSettings";
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
        return <AboutSettings />;

      default:
        return <ProfileSettings />;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            fontSize: {
              xs: "1.8rem",
              sm: "2.2rem",
              md: "2.4rem",
            },
          }}
        >
          Settings
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 0.5,
          }}
        >
          Manage your account and application preferences.
        </Typography>
      </Box>

      <Card
        elevation={0}
        sx={{
          width: "100%",

          borderRadius: 2,

          border: "1px solid",
          borderColor: "divider",

          overflow: "hidden",

          bgcolor: "background.paper",
        }}
      >
        <CardContent
          sx={{
            p: 0,
          }}
        >
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: {
                xs: 1,
                sm: 2,
              },

              pt: 1.5,

              minHeight: 58,

              borderBottom: "1px solid",
              borderColor: "divider",

              "& .MuiTab-root": {
                minHeight: 58,

                px: {
                  xs: 1.5,
                  sm: 2.5,
                },

                textTransform: "none",

                fontWeight: 600,

                fontSize: {
                  xs: "0.85rem",
                  sm: "0.95rem",
                },

                color: "text.secondary",
              },

              "& .Mui-selected": {
                color: "primary.main",
              },

              "& .MuiTabs-indicator": {
                height: 3,

                borderRadius: "3px 3px 0 0",

                backgroundColor: "primary.main",
              },
            }}
          >
            <Tab icon={<PersonIcon />} iconPosition="start" label="Profile" />

            <Tab icon={<InfoIcon />} iconPosition="start" label="About" />
          </Tabs>

          <Box
            sx={{
              p: {
                xs: 1.5,
                sm: 2.5,
                md: 3,
              },
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
