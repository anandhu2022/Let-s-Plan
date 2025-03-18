"use client";

import {createContext, useContext} from "react";
import {ThemeContextProps} from "@/app/libs/types";

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export default useTheme;