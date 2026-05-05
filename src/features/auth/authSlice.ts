import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import type { AuthState, AuthUser } from "./types";

interface JwtPayload {
  name: string;
  email: string;
  role: "NURSE" | "DOCTOR" | "ADMIN";
  officialRole?: string;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      const token = action.payload;

      const decoded = jwtDecode<JwtPayload>(token);

      state.token = token;
      state.user = {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        officialRole: decoded.officialRole,
      };
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;