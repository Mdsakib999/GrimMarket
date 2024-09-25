import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  userName: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginIn: (state, action) => {
      const { userName, token, role } = action.payload;
      state.userName = userName;
      state.token = token;
      state.role = role;
    },
    logOut: (state) => {
      state.token = "";
      state.userName = "";
      state.role = "";
    },
  },
});
export const { logOut, loginIn } = authSlice.actions;

export default authSlice.reducer;
