"use client";

import Link from "next/link";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import {usePathname, useRouter} from "next/navigation";
import useAuth from "@/app/context/Auth/useAuth";
import TotalWorkedHours from "@/app/components/TotalWorkedHours";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {Close, LightMode, Menu} from "@mui/icons-material";
import useTheme from "@/app/context/Theme/useTheme";
import {useEffect, useState} from "react";

const Header = () => {
    const {user, logout} = useAuth();
    const {darkMode, toggleTheme} = useTheme();
    const router = useRouter();
    const [modal, setModal] = useState<boolean>(false);
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/signup');
    useEffect(() => {
        document.body.style.backgroundImage = `url(${darkMode ? "./DarkThemeBanner.png" : "./banner.png"})`;
    }, [darkMode]);
    return (
        <div className="flex w-full justify-between items-center h-full">
            <div className="flex flex-row items-center gap-1">
                <div className="block lg:hidden"
                     onClick={() => {
                         setModal(true)
                     }}>
                    <Menu className={darkMode ? "text-white" : "text-black"}/>
                </div>
                <Link href="/" className={`cursor-pointer ${darkMode && "bg-white/30 rounded-2xl"} `}>
                    <Image src="/LetsPlanLogo.svg" alt="logo" width={150} height={40}/>
                </Link>
            </div>
            {!isAuthPage && (
                <div className="hidden sm:block">
                    <div className={`${darkMode ? "bg-black/50" : "bg-white/50"} backdrop-blur-md shadow-lg rounded-xl 
                    p-1.5 border-t-4 border-red-500 text-center flex flex-row items-center min-w-58`}>
                        <TotalWorkedHours/>
                    </div>
                </div>
            )}
            <div className="flex items-center gap-4">
                <div
                    onClick={toggleTheme}
                    className="cursor-pointer">
                    {darkMode ? <DarkModeIcon className="text-blue-500"/> :
                        <LightMode className="text-yellow-500"/>}
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
            {modal && (
                <div className={`fixed top-0 left-0 w-2/3 sm:w-1/3 h-screen p-4
                ${darkMode ? "bg-black/95" : "bg-white/95"} `}>
                    <h2 className="text-2xl font-bold text-red-500 flex justify-between items-center">
                        <div>Dashboard</div>
                        <div>
                            <Close fontSize={"large"} onClick={() => setModal(false)}/>
                        </div>
                    </h2>
                    <nav className="mt-6 space-y-4">
                        <div
                            className={`block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                          hover:text-white transition ${darkMode ? "text-white" : "text-black"}`}
                            onClick={() => {
                                router.push('/');
                                setModal(false)
                            }}
                        >
                            Dashboard
                        </div>
                        <div
                            className={`block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                          hover:text-white transition ${darkMode ? "text-white" : "text-black"}`}
                            onClick={() => {
                                router.push('/tasks');
                                setModal(false)
                            }}
                        >
                            View Tasks
                        </div>
                        <div
                            className={`block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                          hover:text-white transition ${darkMode ? "text-white" : "text-black"}`}
                            onClick={() => {
                                router.push('/add-task');
                                setModal(false)
                            }}
                        >
                            Add a Task
                        </div>
                        <div
                            className={`block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                          hover:text-white transition ${darkMode ? "text-white" : "text-black"}`}
                            onClick={() => {
                                router.push('/summary');
                                setModal(false)
                            }}
                        >
                            Summary
                        </div>
                        <button
                            onClick={() => {
                                logout();
                                router.push('/sign-in');
                            }}
                            className={`w-full block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                        hover:text-white transition text-left ${darkMode ? "text-white" : "text-black"}`}>
                            Logout
                        </button>
                    </nav>
                </div>
            )
            }
        </div>
    );
};

export default Header;
