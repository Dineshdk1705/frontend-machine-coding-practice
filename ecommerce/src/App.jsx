import "./App.css";
import AppRoutes from "./routes";
import "@fontsource/roboto";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Ensure fallback fonts
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
