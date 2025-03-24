"use client";

import useTheme from "@/app/context/Theme/useTheme";
import {ReactNode} from "react";

const HtmlWrapper = ({children}: { children: ReactNode }) => {
    const {darkMode} = useTheme();
    return (
        <html lang="en">
        <body className={`bg-cover ${darkMode ? "#0f172a" : "#f0f4f8"}`}>
        {children}
        </body>
        </html>
    );
};

export default HtmlWrapper;
