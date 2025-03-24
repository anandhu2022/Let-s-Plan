import useTheme from "@/app/context/Theme/useTheme";
import {ReactNode} from "react";

const TextContainer = (children: ReactNode) => {
    const {darkMode} = useTheme();
    return (
        <div className={darkMode ? "bg-gray-600" : "bg-gray-300"}>
            {children}
        </div>
    );
};

export default TextContainer;