import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import LoginPage from "scenes/loginPage";
import Dashboard from "scenes/dashboard";
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
            <Route element={<Layout />}>
              <Route
                path="/dashboard"
                element={
                  isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
