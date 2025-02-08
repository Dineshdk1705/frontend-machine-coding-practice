import React, { useState, useEffect } from "react";
import styles from "./OnBoarding.module.css";
import { Button, Stack, Typography, TextField, Paper } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
} from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    dispatch(loginWithEmail({ email, password }));
  };

  const handleSignUp = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    dispatch(registerWithEmail({ email, password }));
  };

  return (
    <div
      className={styles.container}
      style={{
        background: `url(/images/poster5.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <Paper elevation={3} className={styles.paper}>
        <Typography variant="h5" className={styles.title}>
          Welcome to Onboarding
        </Typography>
        <Stack spacing={3} className={styles.form}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          <Button
            variant="contained"
            color="inherit"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => dispatch(loginWithGoogle())}
            disabled={loading}
            className={styles.googleButton}
          >
            Login with Google
          </Button>
          {error && (
            <Typography variant="body2" color="error" className={styles.error}>
              {error}
            </Typography>
          )}
        </Stack>
      </Paper>
    </div>
  );
};

export default OnBoarding;
