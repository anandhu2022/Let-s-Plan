"use client";

import Link from "next/link";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import {useRouter} from "next/navigation";
import useAuth from "@/app/context/Auth/useAuth";
import TotalWorkedHours from "@/app/components/TotalWorkedHours";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {LightMode} from "@mui/icons-material";
import useTheme from "@/app/context/Theme/useTheme";
import {useEffect} from "react";

const Header = () => {
    const {user, logout} = useAuth();
    const {darkMode, toggleTheme} = useTheme();
    const router = useRouter();
    useEffect(() => {
        document.body.style.backgroundImage = `url(${darkMode ? "./DarkThemeBanner.png" : "./banner.png"})`;
    }, [darkMode]);
    return (
        <div className="flex w-full justify-between items-center">
            <Link href="/" className={`cursor-pointer ${darkMode && "bg-white/30 rounded-2xl p-1"} `}>
                <Image src="/LetsPlanLogo.svg" alt="logo" width={200} height={50}/>
            </Link>
            <TotalWorkedHours/>
            <div className="flex justify-center items-center gap-4">
                <div
                    onClick={toggleTheme}>
                    {darkMode ? <DarkModeIcon className="text-blue-500"/> : <LightMode className="text-yellow-500"/>}
                </div>
                <button
                    onClick={() => {
                        if (user) logout();
                        router.push("/sign-in");
                    }}
                    className={`bg-indigo-500/20 p-1.5 rounded-xl ${darkMode ? "text-white" : "text-black"} transform
                        duration-500 ease-out backdrop-blur-md border border-white/30 shadow-lg
                        hover:scale-110 hover:bg-white/30 cursor-pointer flex justify-center items-center`}
                >
                    <PersonIcon className="mr-2"/>
                    {user ? "Logout" : "Login"}
                </button>
            </div>
        </div>
    );
};

export default Header;
