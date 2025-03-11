"use client"

import {ReactNode} from "react";

export interface UserProps {
    id: string;
    email: string;
    password?: string;
}

export interface UserInput {
    email: string;
    password: string;
}

export interface AuthContextProps {
    login: () => Promise<{
        success: boolean
        message: string,
    }>
    logout: () => void;
    user: UserProps | null;
}

export interface AuthProviderProps {
    children: ReactNode;
}