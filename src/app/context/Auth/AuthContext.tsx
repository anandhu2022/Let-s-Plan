"use client"

import {ContextProviderProps, UserLoginProps, UserProps} from "../../libs/types";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {AuthContext} from "./useAuth";


const AuthProvider = ({children}: ContextProviderProps) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const router = useRouter();
    const pathname: string = usePathname();
    const logout = async () => {
        await fetch('/api/auth/sign-out', {
            method: 'GET'
        });
        setUser(null);
        router.push('/sign-in');
    };

    const login = async ({email, password}: UserLoginProps) => {
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
            router.push('/dashboard');
        }

        return {
            success: result.success,
            message: result.message,
        }
    }

    const fetchUser = async () => {
        const response = await fetch('/api/auth/me', {
            method: 'POST'
        });
        if (response.ok) {
            const result: { success: boolean, message: string, user: UserProps | null } = await response.json();
            setUser(result.user);
        } else {
            setUser(null);
            router.push('/sign-in');
        }
    }
    
    useEffect(() => {
        if (!pathname.startsWith('/sign-in')) {
            fetchUser();
        }
    }, [pathname]);
    
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;

