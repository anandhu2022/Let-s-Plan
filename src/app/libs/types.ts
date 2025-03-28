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
    className?: string;
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


export interface ProjectProps extends ProjectInputProps {
    id: number;
    status: string;
    priority: string;
}

export interface StatusPriorityProps {
    id: number;
    name: string;
}


export interface UserSignupProps {
    username: string;
    first_name: string;
    last_name?: string;
    email: string;
    mobile?: string;
    password: string;
    confirmPassword: string;
}

export interface ModalProps {
    isOpen: boolean;
    message: string;
    success?: boolean;
    onClose: () => void;
}

export interface PendingApprovalProps {
    id: number;
    email: string;
    username: string;
    registeredAt: string;
    mobile: string;
}


export interface PermissionProps {
    [key: string]: string[];
}

export interface RolesAndPermissionsProps {
    name: string,
    id: number,
    Permission: {
        name: string
    }[]
}

export interface UserByRoleProps {
    id: number;
    email:string;
    username: string;
    accountStatus: string;
    roleId: number | null;
}