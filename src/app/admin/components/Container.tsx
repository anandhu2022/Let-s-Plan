"use client";


import {ReactNode} from "react";
import useTheme from "@/app/context/Theme/useTheme";

const Container = ({children}:{children: ReactNode}) => {
    const {darkMode} = useTheme();
    return (
        <div className={`${darkMode? "bg-[#1e293b] text-[#64747a]" : "bg-white text-[#4e5c59] shadow-2xl"}
        rounded-md px-6 py-4 font-semibold transition duration-200 ease-out`}>
            {children}
        </div>
    );
};

export default Container;
