"use client";

import useAuth from "@/app/context/Auth/useAuth";
import {useRouter} from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
    const {logout, user} = useAuth();
    const router = useRouter();
    if (!user?.id) return;
    return (
        <aside className="min-w-1/6 bg-white/40 backdrop-blur-md  shadow-md p-6 flex flex-col rounded-2xl">
            <h2 className="text-2xl font-bold text-red-500">Dashboard</h2>
            <nav className="mt-6 space-y-4">
                <Link href={'/'}
                      className="block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                       hover:text-white transition">
                    Dashboard
                </Link>
                <Link href={'/tasks'}
                   className="block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                       hover:text-white transition">
                    View Tasks
                </Link>
                <Link href="/add-task"
                   className="block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                       hover:text-white transition">
                    Add a Task
                </Link>
                <a href="#"
                   className="block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                       hover:text-white transition">
                    Settings
                </a>
                <button
                    onClick={() => {
                        logout();
                        router.push('/sign-in');
                    }}
                    className="w-full block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                        hover:text-white transition text-left">
                    Logout
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
