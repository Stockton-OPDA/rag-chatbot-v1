'use client'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { CssBaseline, GlobalStyles } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0057B7",
    },
    secondary: {
      main: "#C9C9C9",
    },
    text: {
      primary: "#1E1E1E",
      secondary: "#474747",
    }
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "html, body": {
              overflow: "hidden",
              height: "100vh",
            },
          }}
        />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}