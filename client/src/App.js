import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import LoginPage from "scenes/loginPage";
import Dashboard from "scenes/dashboard";
import Banks from "scenes/banks";
import Donors from "scenes/donor";
import Layout from "scenes/layout";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const isLoggedIn = useSelector((state) => state.global.token !== null);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              element={isLoggedIn ? <Layout /> : <Navigate to="/" replace />}
            >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/banks" element={<Banks />} />
              <Route path="/donors" element={<Donors />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
