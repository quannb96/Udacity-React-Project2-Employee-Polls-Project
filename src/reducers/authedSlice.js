import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../apis/_DATA";

// Thunk action creator
export const handleLogin = createAsyncThunk(
  "auth/fetchLogin",
  async ({ username, password }) => {
    const fetchLogin = (username, password) => {
      return new Promise((resolve, reject) => {
        _getUsers()
          .then((users) => {
            if (!users) {
              reject("User does not exist.");
            } else if (Object.keys(users).includes(username)) {
              const user = users[username];

              if (user.password !== password) {
                reject("Incorrect password.");
              }

              resolve({ data: user });
            } else {
              reject("User not found.");
            }
          })
          .catch((error) => reject(error));
      });
    };

    const response = await fetchLogin(username, password);
    return response.data;
  }
);

// Initial state
const initialState = {
  isAuthenticated: false,
  userId: undefined,
  status: "ready",
};

// Slice
export const authedSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.id;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userId = undefined;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.status = "ready";
        state.isAuthenticated = true;
        state.userId = action.payload.id;
      })
      .addCase(handleLogin.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Export actions and selectors
export const { logout, login } = authedSlice.actions;
export const selectAuthState = (state) => state.auth;
export const authUserState = (state) =>
  state.auth.userId ? state.user.users.byId[state.auth.userId] : null;

// Export reducer
export default authedSlice.reducer;
