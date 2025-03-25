"use client"

import {InputHTMLAttributes, ReactNode} from "react";

export interface UserLoginProps {
    email: string;
    password: string;
}

export interface UserProps {
    id: number;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
}

export interface AuthContextProps {
    login: ({email, password}: UserLoginProps) => Promise<{
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

export interface ThemeContextProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    type: string;
    placeholder: string;
    autocomplete?: string
    className?: string;
}

export interface ButtonProps {
    label: string;
    classNames?: string;
}

export interface ProjectInputProps {
    title: string;
    projectDescription: string;
    plannedStartDate?: string;
    plannedEndDate?: string;
    actualStartDate?: string;
    actualEndDate?: string;
    priorityId: number;
    statusId: number;
    userId?: number;
}

export interface ModalProps {
    openModal: boolean;
    closeModal: () => void;
}