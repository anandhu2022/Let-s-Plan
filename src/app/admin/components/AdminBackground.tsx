"use client";

import useTheme from "@/app/context/Theme/useTheme";
import {ReactNode, useEffect} from "react";

const AdminBackground = ({children}: { children: ReactNode }) => {
    const {darkMode} = useTheme();
    useEffect(() => {
        document.body.style.backgroundColor = darkMode ? "#0f172a" : "#f0f4f8";
    }, [darkMode]);
    return (
        <div className={`w-full h-full`}>
            {children}
        </div>
    );
};

export default AdminBackground;
