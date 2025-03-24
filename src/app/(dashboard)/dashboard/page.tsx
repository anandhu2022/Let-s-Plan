"use client";

import useTheme from "@/app/context/Theme/useTheme";
import WelcomeBanner from "@/app/components/WelcomeBanner";

const Page = () => {
    const {darkMode} = useTheme();


    return (
        <div className={`flex flex-col w-full ${darkMode ? "text-gray-300" : "text-[#4e5c59]"}`}>
            <WelcomeBanner/>
        </div>
    );
};

export default Page;
