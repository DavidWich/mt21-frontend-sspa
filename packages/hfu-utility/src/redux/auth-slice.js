import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: "",
  email: "",
  courses: [],
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.courses = action.payload.courses;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.email = "";
      state.courses = [];
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
