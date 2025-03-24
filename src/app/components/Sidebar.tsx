"use client";

import Container from "@/app/components/Container";
import useTheme from "@/app/context/Theme/useTheme";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";

const Sidebar = () => {
    const {darkMode} = useTheme();
    const [openMenu, setOpenMenu] = useState<string>("");
    const pathname = usePathname();
    const router = useRouter();
    const handleMenuClick = (menu: string) => {
        setOpenMenu((prev) => (prev === menu ? "" : menu));
    };

    return (
        <div className="fixed flex h-full w-1/6">
            <Container classNames="w-full">
                <div className="flex flex-row items-center gap-1 w-full">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="55" height="55">
                            <circle cx="25" cy="25" r="20" fill={darkMode ? "#ffffff" : "#624bff"}/>
                            <rect x="15" y="20" width="20" height="15" fill={darkMode ? "#624bff" : "#ffffff"} rx="2"/>
                            <rect x="18" y="17" width="4" height="4" fill={darkMode ? "#624bff" : "#ffffff"}/>
                            <rect x="28" y="17" width="4" height="4" fill={darkMode ? "#624bff" : "#ffffff"}/>
                        </svg>
                    </div>
                    <h1 className={`text-xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                        Let&#39;s&nbsp;Plan
                    </h1>
                </div>

                <ul className="flex flex-col p-1 pt-6 gap-3">

                    <li className={`cursor-pointer hover:bg-gray-900 p-1.5 rounded-md transition duration-300 ease-out
                    ${pathname.startsWith('/dashboard') && "text-[#624bff]"}`}
                    onClick={() => router.push('/dashboard')}>
                        Dashboard
                    </li>

                    <li>
                        <button
                            onClick={() => handleMenuClick("project")}
                            className={`w-full text-left cursor-pointer hover:bg-gray-900 p-1.5 rounded-md transition
                                duration-300 ease-out ${pathname.startsWith('/project') && "text-[#624bff]"}`}
                        >
                            Projects
                        </button>
                        <ul
                            className={`overflow-hidden transition-all duration-500 ${
                                openMenu === "project" ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/create') && "text-[#624bff]"}`}
                            onClick={() => router.push('/project/create')}>
                                Create Project
                            </li>
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/list') && "text-[#624bff]"}`}
                                onClick={() => router.push('/project/list')}>
                                Project List</li>
                        </ul>
                    </li>

                    <li>
                        <button
                            onClick={() => handleMenuClick("teams")}
                            className={`w-full text-left cursor-pointer hover:bg-gray-900 p-1.5 rounded-md transition
                                duration-300 ease-out ${pathname.startsWith('/teams') && "text-[#624bff]"}`}
                        >
                            Teams
                        </button>
                        <ul
                            className={`overflow-hidden transition-all duration-500 ${
                                openMenu === "teams" ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/create') && "text-[#624bff]"}`}>
                                Create Team</li>
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/list') && "text-[#624bff]"}`}>
                                Team List</li>
                        </ul>
                    </li>

                    <li>
                        <button
                            onClick={() => handleMenuClick("tasks")}
                            className={`w-full text-left cursor-pointer hover:bg-gray-900 p-1.5 rounded-md transition
                                duration-300 ease-out ${pathname.startsWith('/tasks') && "text-[#624bff]"}`}
                        >
                            Tasks
                        </button>
                        <ul
                            className={`overflow-hidden transition-all duration-500 ${
                                openMenu === "tasks" ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/create') && "text-[#624bff]"}`}>
                                Create Task
                            </li>
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/list') && "text-[#624bff]"}`}>
                                Task List
                            </li>
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/board') && "text-[#624bff]"}`}>
                                Task Board
                            </li>
                        </ul>
                    </li>

                    <li>
                        <button
                            onClick={() => handleMenuClick("userManagement")}
                            className={`w-full text-left cursor-pointer hover:bg-gray-900 p-1.5 rounded-md transition
                                duration-300 ease-out ${pathname.startsWith('/users') && "text-[#624bff]"}`}
                        >
                            User Management
                        </button>
                        <ul
                            className={`overflow-hidden transition-all duration-500 ${
                                openMenu === "userManagement" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/create') && "text-[#624bff]"}`}>
                                Create&nbsp;User</li>
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/list') && "text-[#624bff]"}`}>
                                User&nbsp;List</li>
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/roles') && "text-[#624bff]"}`}>
                                User&nbsp;Roles</li>
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/permissions') && "text-[#624bff]"}`}>
                                User&nbsp;Permissions
                            </li>
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/notifications') && "text-[#624bff]"}`}>
                                User&nbsp;Notifications
                            </li>
                            <li className={`pl-6 py-1 my-2 cursor-pointer hover:bg-gray-900 rounded-md
                             ${pathname.startsWith('/project/activity') && "text-[#624bff]"}`}>
                                User&nbsp;Activity
                            </li>
                        </ul>
                    </li>
                </ul>
            </Container>
        </div>
    );
};

export default Sidebar;
