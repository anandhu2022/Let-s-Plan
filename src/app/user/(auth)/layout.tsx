"use client";

import {ReactNode} from "react";
import useTheme from "@/app/context/Theme/useTheme";

const AuthLayout = ({children}: { children: ReactNode }) => {
    const {darkMode} = useTheme();
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className={`${darkMode? "bg-black/40":"bg-white/40"} backdrop-blur-sm min-h-1/3 min-w-1/3 
            transition duration-500 ease-out rounded-2xl p-6`}>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;


