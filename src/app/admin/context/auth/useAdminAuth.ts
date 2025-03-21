"use client";

import {createContext, useContext} from "react";
import {AdminAuthContextProps} from "@/app/admin/lib/types";

export const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error("useAdminAuth must be used within an AdminAuthProvider");
    }
    return context;
}