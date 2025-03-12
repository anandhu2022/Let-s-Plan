"use client"

import {ReactNode} from "react";

export interface UserProps {
    id: number;
    email: string;
    password?: string;
    username?: string;
}

export interface UserInput {
    id?: number;
    email: string;
    password: string;
    username?: string;
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

export interface TaskProps {
    id?: string;
    title: string;
    description: string;
    userId: number | null;
    date: string;
    time: number | null;

}