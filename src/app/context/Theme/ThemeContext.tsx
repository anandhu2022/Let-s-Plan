"use client";

import {useState, useEffect} from "react";
import {ThemeContext} from "./useTheme";
import {ContextProviderProps} from "@/app/libs/types";

const ThemeProvider = ({children}: ContextProviderProps) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setDarkMode(storedTheme === "dark");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{toggleTheme, darkMode}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
