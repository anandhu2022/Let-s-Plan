"use client";

import {AdminLoginProps, AdminUserProps} from "@/app/admin/lib/types";
import {ReactNode, useEffect, useState} from "react";
import {AdminAuthContext} from "./useAdminAuth";
import {useRouter} from "next/navigation";

const AdminAuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<AdminUserProps | null>(null);
    const router = useRouter();

    const logout = async () => {
        await fetch('/api/admin/auth/sign-out', {
            method: 'GET'
        });
        setUser(null);
        router.push('/admin/sign-in');
    }

    const login = async ({email, password}: AdminLoginProps) => {
        const response = await fetch('/api/admin/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email.toLowerCase(), password})
        });

        const result: { success: boolean, message: string, user: AdminUserProps } = await response.json();

        if (result.success) {
            console.log(result);
            setUser(result.user);
            router.push('/admin/dashboard');
        }

        return {
            success: result.success,
            message: result.message,
        }

    }
    useEffect(() => {
        fetch('/api/admin/auth/verify-user', {
            method: 'POST',
        })
            .then((response) => response.json())
            .then(({user}) => {
                if (user) setUser(user);
            })
    }, []);

    return (
        <AdminAuthContext.Provider value={{login, logout, user}}>
            {children}
        </AdminAuthContext.Provider>
    );

};

export default AdminAuthProvider;
