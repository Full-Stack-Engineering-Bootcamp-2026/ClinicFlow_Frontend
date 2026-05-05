import type { ReactNode } from "react";

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  pageTitle: string; 
  children: ReactNode;
  backTo?: string;        
  backLabel?: string; 
}

export interface LoginFormData {
  email: string;
  password: string;
}