"use client"

import {AuthProviderProps, UserProps} from "../../libs/types";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {AuthContext} from "./useAuth";


const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const router = useRouter();

    const logout = async () => {
        router.push('/');
    };
    const login = async ({email, password}: UserProps) => {
        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email.toLowerCase(), password})
        });
        const result = await response.json();
        if (result.success) {
            setUser(result.user);
            router.push('/')
        }
        return {
            success: result.success,
            message: result.message,
        }
    }
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;

