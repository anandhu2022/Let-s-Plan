"use client";

import {useState} from "react";
import {ThemeContext} from "./useTheme";
import {ContextProviderProps} from "@/app/libs/types";


const ThemeProvider = ({children}: ContextProviderProps) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    }
    return (
        <ThemeContext.Provider value={{toggleTheme, darkMode}}>
            {children}
        </ThemeContext.Provider>
    );
}
export default ThemeProvider;