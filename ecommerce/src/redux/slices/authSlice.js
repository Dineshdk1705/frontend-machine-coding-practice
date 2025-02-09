import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, googleProvider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

// Async Thunks
export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      const userData = {
        email: user?.email,
        userId: user?.uid,
        token: user?.stsTokenManager?.accessToken,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerWithEmail = createAsyncThunk(
  "auth/registerWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      const userData = {
        email: user?.email,
        userId: user?.uid,
        token: user?.stsTokenManager?.accessToken,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const { user } = userCredential;
      const userData = {
        email: user?.email,
        displayName: user?.displayName,
        userId: user?.uid,
        token: user?.accessToken,
        photoURL: user?.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(registerWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
