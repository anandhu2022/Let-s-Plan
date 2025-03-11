import {Theme, ThemeProviderProps} from "../../libraries/utils/types.ts";
import {useState} from "react";
import {ThemeContext} from "./useTheme.tsx";


const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>("light");
    const toggleMode = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    const isLightMode = theme === "light";
    return (
        <ThemeContext.Provider value={{toggleMode, isLightMode}}>
            {children}
        </ThemeContext.Provider>
    );
}
export default ThemeProvider;