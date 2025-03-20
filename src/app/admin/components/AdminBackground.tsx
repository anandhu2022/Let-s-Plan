"use client";

import useTheme from "@/app/context/Theme/useTheme";
import {ReactNode, useEffect} from "react";

const AdminBackground = ({children}: { children: ReactNode }) => {
    const {darkMode} = useTheme();
    useEffect(() => {
        // document.body.style.backgroundColor = ${darkMode ? "" : "/banner.png"};
    }, [darkMode]);
    return (
        <div className={`w-full sm:h-[85%] lg:h-[90%]`}>
            {children}
        </div>
    );
};

export default AdminBackground;
