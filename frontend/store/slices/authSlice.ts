import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    email: string | null;
    fullName: string;
  };
}

interface User {
  email: string;
  fullName: string;
}

const initialState: AuthState = {
  user: { email: "", fullName: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      state.user.email = action.payload.email;
      state.user.fullName = action.payload.fullName;
    },

    removeUser: (state) => {
      state.user.email = null;
      state.user.fullName = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { registerUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
