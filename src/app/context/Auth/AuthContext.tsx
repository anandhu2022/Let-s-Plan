"use client"

import {ContextProviderProps, UserProps} from "../../libs/types";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {AuthContext} from "./useAuth";


const AuthProvider = ({children}: ContextProviderProps) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const router = useRouter();

    const logout = async () => {
        await fetch('/api/auth/sign-out', {
            method: 'GET'
        });
        setUser(null);
    };

    const login = async ({email, password}: UserProps) => {
        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email.toLowerCase(), password})
        });

        const result: { success: boolean, message: string, user: UserProps } = await response.json();

        if (result.success) {
            setUser(result.user);
            router.push('/')
        }

        return {
            success: result.success,
            message: result.message,
        }
    }
    useEffect(() => {
        fetch('/api/auth/verify-user', {
            method: 'POST',
        })
            .then((response) => response.json())
            .then(({user}) => {
                if (user) setUser(user);
            })
    }, []);
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;

