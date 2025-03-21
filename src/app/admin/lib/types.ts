"use client";

import {InputHTMLAttributes} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    type: string;
    placeholder: string;
    autocomplete: string
}

export interface ButtonProps {
    label: string;
}

export interface AdminLoginProps {
    email: string;
    password: string;
}

export interface AdminAuthContextProps {
    login: ({email, password}: AdminLoginProps) => Promise<{
        success: boolean
        message: string,
    }>
    logout: () => void;
    user: AdminUserProps | null;
}

export interface AdminUserProps {
    id: number;
    email: string;
    username?: string;
}