"use client";

import Container from "@/app/admin/components/Container";
import useTheme from "@/app/context/Theme/useTheme";

const Sidebar = () => {
    const {darkMode} = useTheme();
    return (
        <div className={`flex h-full`}>
            <Container>
                <div className="flex flex-row items-center gap-1">
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="55" height="55">
                            <circle cx="25" cy="25" r="20" fill={darkMode ? "#ffffff" : "#624bff"}/>
                            <rect x="15" y="20" width="20" height="15" fill={darkMode ? "#624bff" : "#ffffff"}
                                  rx="2"/>
                            <rect x="18" y="17" width="4" height="4" fill={darkMode ? "#624bff" : "#ffffff"}/>
                            <rect x="28" y="17" width="4" height="4" fill={darkMode ? "#624bff" : "#ffffff"}/>
                        </svg>
                    </div>
                    <h1 className={`text-xl font-semibold ${darkMode? "text-gray-200": "text-gray-700"}`}>Admin&nbsp;Login</h1>
                </div>
            </Container>
        </div>
    );
};

export default Sidebar;
