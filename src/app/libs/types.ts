"use client"

import {ReactNode} from "react";

export interface UserProps {
    id?: number;
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
    login: ({email, password}: UserProps) => Promise<{
        success: boolean
        message: string,
    }>
    logout: () => void;
    user: UserProps | null;
}
export interface TaskContextProps {
    reloadViewTaskForm: boolean
    reloadTaskForm: () => void;
}


export interface ContextProviderProps {
    children: ReactNode;
}

export interface TaskProps {
    id?: number | null;
    title: string;
    description: string;
    taskStatus: string;
    userId: number | null;
    date: string;
    time: number;

}