import { CssBaseline, ThemeProivder } from "@mui/material";
import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProivder theme={theme}>
          <CssBaseline />
        </ThemeProivder>
      </BrowserRouter>
    </div>
  );
}

export default App;
