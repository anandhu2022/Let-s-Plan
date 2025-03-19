"use client";

import useAuth from "@/app/context/Auth/useAuth";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import useTheme from "@/app/context/Theme/useTheme";

const Sidebar = () => {
    const {logout} = useAuth();
    const {darkMode} = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/signup');
    return (
        <div className="min-w-1/6 hidden lg:block">
            {!isAuthPage && (
                <aside
                    className={` ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-md shadow-md p-6 flex flex-col 
                rounded-2xl h-full`}>
                    <h2 className="text-2xl font-bold text-red-500">Dashboard</h2>
                    <nav className="mt-6 space-y-4">
                        <Link href={'/'}
                              className={`block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                          hover:text-white transition ${darkMode ? "text-white" : "text-black"}`}>
                            Dashboard
                        </Link>
                        <Link href={'/tasks'}
                              className={`block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                          hover:text-white transition ${darkMode ? "text-white" : "text-black"}`}>
                            View Tasks
                        </Link>
                        <Link href="/add-task"
                              className={`block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                          hover:text-white transition ${darkMode ? "text-white" : "text-black"}`}>
                            Add a Task
                        </Link>
                        <Link href="/summary"
                              className={`block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                          hover:text-white transition ${darkMode ? "text-white" : "text-black"}`}>
                            Summary
                        </Link>
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
                </aside>
            )}
        </div>
    );
};

export default Sidebar;
