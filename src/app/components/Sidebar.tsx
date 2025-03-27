"use client";

import React, {useState} from "react";
import TaskIcon from "@mui/icons-material/Task";
import ListIcon from "@mui/icons-material/List";
import Container from "@/app/components/Container";
import PeopleIcon from "@mui/icons-material/People";
import useTheme from "@/app/context/Theme/useTheme";
import {usePathname, useRouter} from "next/navigation";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Sidebar = () => {
    const {darkMode} = useTheme();
    const [openMenu, setOpenMenu] = useState<string>("");
    const pathname = usePathname();
    const router = useRouter();

    const handleMenuClick = (menu: string) => {
        setOpenMenu((prev) => (prev === menu ? "" : menu));
    };

    return (
        <div
            className={`fixed flex h-full w-1/5 transition-all ${darkMode ? "bg-gray-900 text-white" :
                "bg-white text-gray-800"} shadow-md`}>
            <Container className="w-full p-4">

                {/*Logo*/}
                <div className="flex flex-row items-center gap-2 w-full">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="45" height="45">
                            <circle cx="25" cy="25" r="20" fill={darkMode ? "#ffffff" : "#624bff"}/>
                            <rect x="15" y="20" width="20" height="15" fill={darkMode ? "#624bff" : "#ffffff"} rx="2"/>
                            <rect x="18" y="17" width="4" height="4" fill={darkMode ? "#624bff" : "#ffffff"}/>
                            <rect x="28" y="17" width="4" height="4" fill={darkMode ? "#624bff" : "#ffffff"}/>
                        </svg>
                    </div>
                    <h1 className="text-xl font-semibold">Let&#39;s Plan</h1>
                </div>

                <ul className="flex flex-col pt-6 gap-2">

                    {/*Dashboard*/}
                    <li
                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-md transition 
                            ${pathname.startsWith("/dashboard") ? "bg-[#624bff] text-white" :
                            darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200 "}`}
                        onClick={() => router.push("/dashboard")}>
                        <DashboardIcon fontSize="small"/>
                        Dashboard
                    </li>

                    {/*Projects*/}
                    <li>
                        <button
                            onClick={() => handleMenuClick("project")}
                            className={`flex items-center justify-between w-full text-left p-2 rounded-md transition  
                            ${pathname.startsWith("/project") ? "bg-[#624bff] text-white" :
                                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200 "} cursor-pointer`}>
                            <span className="flex items-center gap-3">
                                <AssignmentIcon fontSize="small"/>
                                Projects
                            </span>
                            {openMenu === "project" ? <ExpandLessIcon fontSize="small"/> :
                                <ExpandMoreIcon fontSize="small"/>}
                        </button>

                        <ul className={`transition-all overflow-hidden ${openMenu === "project" ?
                            "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                            <li
                                className={`pl-10 p-2 cursor-pointer
                                    ${pathname.startsWith("/project/create") ? "text-[#624bff] " :
                                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200 "}`}
                                onClick={() => router.push("/project/create")}>
                                Create Project
                            </li>

                            <li
                                className={`pl-10 p-2 cursor-pointer  
                                    ${pathname.startsWith("/project/list") ? "text-[#624bff] " :
                                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200 "}`}
                                onClick={() => router.push("/project/list")}>
                                Project List
                            </li>
                        </ul>
                    </li>


                    {/*Teams*/}
                    <li>
                        <button
                            onClick={() => handleMenuClick("teams")}
                            className={`flex items-center justify-between w-full text-left p-2 rounded-md transition 
                            ${
                                pathname.startsWith("/teams") ? "bg-[#624bff] text-white" : darkMode ?
                                    "hover:bg-gray-800" : "hover:bg-gray-200 "} cursor-pointer`}>
                          <span className="flex items-center gap-3">
                              <PeopleIcon fontSize="small"/>
                              Teams
                          </span>

                            {openMenu === "teams" ? <ExpandLessIcon fontSize="small"/> :
                                <ExpandMoreIcon fontSize="small"/>}
                        </button>

                        <ul className={`transition-all overflow-hidden ${openMenu === "teams" ? "max-h-40 opacity-100" :
                            "max-h-0 opacity-0"}`}>
                            <li
                                className={`pl-10 p-2 cursor-pointer  ${
                                    pathname.startsWith("/teams/create") ? "text-[#624bff] " : darkMode ?
                                        "hover:bg-gray-800" : "hover:bg-gray-200 "}`}
                                onClick={() => router.push("/teams/create")}
                            >
                                Create Team
                            </li>
                            <li
                                className={`pl-10 p-2 cursor-pointer  ${
                                    pathname.startsWith("/teams/list") ? "text-[#624bff] " : darkMode ?
                                        "hover:bg-gray-800" : "hover:bg-gray-200 "}`}
                                onClick={() => router.push("/teams/list")}
                            >
                                Team List
                            </li>
                        </ul>
                    </li>

                    {/*Tasks*/}
                    <li
                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-md transition ${
                            pathname.startsWith("/tasks") ? "bg-[#624bff] text-white" : darkMode ?
                                "hover:bg-gray-800" : "hover:bg-gray-200"
                        }`}
                        onClick={() => router.push("/tasks")}
                    >
                        <TaskIcon fontSize="small"/>
                        Tasks
                    </li>

                    <li>
                        <button
                            onClick={() => handleMenuClick("users")}
                            className={`flex items-center justify-between w-full text-left p-2 rounded-md transition 
                            ${pathname.startsWith("/users") ? "bg-[#624bff] text-white" : darkMode ?
                                "hover:bg-gray-800" : "hover:bg-gray-200 "} cursor-pointer`}>
                            <span className="flex items-center gap-3">
                                <AccountCircleIcon fontSize="small"/>
                                User Management
                            </span>
                            {openMenu === "users" ? <ExpandLessIcon fontSize="small"/> :
                                <ExpandMoreIcon fontSize="small"/>}
                        </button>

                        <ul className={`transition-all overflow-hidden ${openMenu === "users" ? "max-h-60 opacity-100"
                            : "max-h-0 opacity-0"}`}>

                            <li className={`pl-10 p-2 cursor-pointer  
                            ${pathname.startsWith("/users/list") ? "text-[#624bff]" : darkMode ?
                                "hover:bg-gray-800" : "hover:bg-gray-200"
                            } flex items-center gap-3 rounded-md`}
                                onClick={() => router.push("/users/list")}>
                                <ListIcon fontSize="small"/>
                                User List
                            </li>

                            <li className={`pl-10 p-2 cursor-pointer  
                            ${pathname.startsWith("/users/roles-management") ? "text-[#624bff]" : darkMode ?
                                "hover:bg-gray-800" : "hover:bg-gray-200"
                            } flex items-center gap-3 rounded-md`}
                                onClick={() => router.push("/users/roles-management")}>
                                <SettingsIcon fontSize="small"/>
                                Roles Management
                            </li>

                            <li className={`pl-10 p-2 cursor-pointer  
                            ${pathname.startsWith("/users/approve") ? "text-[#624bff]" : darkMode ?
                                "hover:bg-gray-800" : "hover:bg-gray-200"
                            } flex items-center gap-3 rounded-md`}
                                onClick={() => router.push("/users/approve")}>
                                <PersonAddIcon fontSize="small"/>
                                Approve Accounts
                            </li>

                        </ul>
                    </li>
                </ul>
            </Container>
        </div>
    );
};

export default Sidebar;
