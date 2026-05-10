import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import type { AuthState, AuthUser } from "./types/types";

interface JwtPayload {
  name: string;
  subject: string;
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

      localStorage.setItem("token",token);

      const decoded =
        jwtDecode<JwtPayload>(token);

      state.token = token;

      state.user = {
        name: decoded.name,
        email: decoded.subject,
        role: decoded.role,
        officialRole: decoded.officialRole,
      };
    },

    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;