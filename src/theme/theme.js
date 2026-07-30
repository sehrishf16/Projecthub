// src/theme/theme.js

import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const getTheme = (mode = "light") => {
  const palette = colors[mode];

  return createTheme({
    palette: {
      mode,

      primary: {
        main: palette.primary,
        light: palette.primaryLight,
        dark: "#E76F22",
        contrastText: "#FFFFFF",
      },

      secondary: {
        main: palette.secondary,
        contrastText: "#FFFFFF",
      },

      background: {
        default: palette.background,
        paper: palette.paper,
      },

      text: {
        primary: palette.textPrimary,
        secondary: palette.textSecondary,
      },

      divider: palette.border,

      success: {
        main: palette.success,
      },

      warning: {
        main: palette.warning,
      },

      error: {
        main: palette.error,
      },

      info: {
        main: palette.info,
      },
    },

    typography: {
      fontFamily: [
        "Poppins",
        "Inter",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),

      h1: {
        fontSize: "3rem",
        fontWeight: 700,
      },

      h2: {
        fontSize: "2.5rem",
        fontWeight: 700,
      },

      h3: {
        fontSize: "2rem",
        fontWeight: 700,
      },

      h4: {
        fontSize: "1.75rem",
        fontWeight: 700,
      },

      h5: {
        fontSize: "1.5rem",
        fontWeight: 600,
      },

      h6: {
        fontSize: "1.25rem",
        fontWeight: 600,
      },

      subtitle1: {
        fontSize: "1rem",
        fontWeight: 500,
      },

      subtitle2: {
        fontSize: "0.95rem",
        fontWeight: 500,
      },

      body1: {
        fontSize: "1rem",
      },

      body2: {
        fontSize: "0.9rem",
      },

      button: {
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.95rem",
      },
    },

    shape: {
      borderRadius: 14,
    },

    shadows: [
      "none",
      "0px 2px 8px rgba(27,27,29,0.05)",
      "0px 4px 12px rgba(27,27,29,0.08)",
      "0px 6px 16px rgba(27,27,29,0.10)",
      "0px 8px 20px rgba(27,27,29,0.12)",
      ...Array(20).fill("0px 10px 24px rgba(27,27,29,0.12)"),
    ],

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: palette.background,
            color: palette.textPrimary,
            fontFamily: "Poppins, sans-serif",
          },

          "*": {
            boxSizing: "border-box",
          },

          a: {
            textDecoration: "none",
            color: "inherit",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "10px 20px",
            fontWeight: 600,
            boxShadow: "none",

            "&:hover": {
              boxShadow: "0px 8px 20px rgba(255,138,61,0.25)",
            },
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            backgroundColor: palette.paper,
            border: `1px solid ${palette.border}`,
            boxShadow: "0px 4px 14px rgba(27,27,29,0.06)",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: palette.paper,
            borderRadius: 18,
            boxShadow: "0px 4px 14px rgba(27,27,29,0.06)",
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: "outlined",
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: palette.primary,
              borderWidth: 2,
            },
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.paper,
            color: palette.textPrimary,
            boxShadow: "0px 2px 10px rgba(27,27,29,0.06)",
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.sidebar,
            color: "#FFFFFF",
            borderRight: "none",
          },
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: {
            margin: "6px 10px",
            borderRadius: 10,

            "&:hover": {
              backgroundColor: "rgba(255,138,61,0.12)",
            },

            "&.Mui-selected": {
              backgroundColor: palette.primary,
              color: "#FFFFFF",

              "&:hover": {
                backgroundColor: "#E76F22",
              },
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },

      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.primary,
          },
        },
      },
    },
  });
};

export default getTheme;
  