"use client";

import {InputProps} from "@/app/admin/lib/types";
import useTheme from "@/app/context/Theme/useTheme";

const Input = ({type, placeholder}: InputProps) => {
    const {darkMode} = useTheme();
    return (
        <input
            type={type}
            className={`p-1.5 px-3 rounded-md placeholder:font-normal outline-none focus:ring-4
            transition duration-300 ease-out
            ${darkMode? "placeholder:text-[#64747a] bg-[#0f172a] focus:ring-indigo-900":
                "placeholder:text-[#4e5c59] bg-white border-1 border-gray-300 focus:ring-violet-200"}`}
            placeholder={placeholder}
        />
    );
};

export default Input;