import "./App.css";
import AppRoutes from "./routes";
import "@fontsource/roboto";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1300,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <CssBaseline />
      <div className="App">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
