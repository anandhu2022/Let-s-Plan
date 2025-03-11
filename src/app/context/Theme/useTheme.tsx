import {createContext, useContext} from "react";
import {ThemeContextType} from "../../libraries/utils/types.ts";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export default useTheme;