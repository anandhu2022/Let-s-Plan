"use client";

import useAuth from "@/app/context/Auth/useAuth";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {TaskProps} from "@/app/libs/types";

const Dashboard = () => {
    const router = useRouter();
    const {logout, user} = useAuth();
    const [tasksCounts, setTasksCounts] = useState<{
        pending: number,
        onProgress: number,
        completed: number,
        total: number,
        task: TaskProps[]
    }>({
        pending: 0,
        onProgress: 0,
        completed: 0,
        total: 0,
        task: [] as TaskProps[]
    })
    const [tasks, setTasks] = useState<TaskProps[] | null>(null);
    useEffect(() => {
        if (user?.id) {
            fetch(`/api/task/get-tasks?userId=${user?.id}`)
                .then(response => response.json())
                .then(({tasks}) => {
                    const counts = tasks.reduce((acc: {
                        completed: number;
                        pending: number;
                        onProgress: number;
                        total: number;
                        task: TaskProps[] | null
                    }, task: TaskProps) => {
                        if (task.taskStatus === "Completed") {
                            acc.completed += 1;
                        } else if (task.taskStatus === "Pending") {
                            acc.pending += 1;
                        } else if (task.taskStatus === "In Progress") {
                            acc.onProgress += 1;
                        }
                        acc.total += 1;
                        acc.task = tasks;
                        return acc;
                    }, {pending: 0, onProgress: 0, completed: 0, total: 0});
                    const sortedTasks: TaskProps[] = (tasks.sort((a: { id: number; }, b: {
                        id: number;
                    }) => b.id - a.id)).slice(0, 5);
                    setTasks(sortedTasks);
                    setTasksCounts(counts);
                })
                .catch(error => console.error("Error fetching tasks:", error));
        }
    }, [user?.id]);

    return (
        <div className="flex h-screen bg-gray-100 pt-20 w-full">
            {/* Sidebar */}
            <aside className="min-w-1/6 bg-white shadow-md p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-red-500">Dashboard</h2>
                <nav className="mt-6 space-y-4">
                    <a href="#"
                       className="block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                       hover:text-white transition">
                        Dashboard
                    </a>
                    <a href="#"
                       className="block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                       hover:text-white transition">
                        Tasks
                    </a>
                    <a href="#"
                       className="block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                       hover:text-white transition">
                        Reports
                    </a>
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

            <main className="flex-1 p-8 w-full">
                <h1 className="text-3xl font-bold text-gray-900">{user?.username && `Welcome ${user.username}`}</h1>
                <div className="flex gap-6 mt-6 max-w-full">
                    <div className="p-6 bg-white shadow-lg rounded-xl border-t-4 border-red-500 w-full">
                        <h2 className="text-xl font-semibold text-gray-900">Total Tasks</h2>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{tasksCounts.total}</p>
                    </div>

                    <div className="p-6 bg-white shadow-lg rounded-xl border-t-4 border-indigo-600 w-full">
                        <h2 className="text-xl font-semibold text-gray-900">Completed</h2>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{tasksCounts.completed}</p>
                    </div>

                    <div className="p-6 bg-white shadow-lg rounded-xl border-t-4 border-red-500 w-full">
                        <h2 className="text-xl font-semibold text-gray-900">In Progress</h2>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{tasksCounts.onProgress}</p>
                    </div>

                    <div className="p-6 bg-white shadow-lg rounded-xl border-t-4 border-black w-full">
                        <h2 className="text-xl font-semibold text-gray-900">Pending</h2>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{tasksCounts.pending}</p>
                    </div>
                </div>

                <div className="mt-8 bg-white p-6 shadow-lg rounded-xl">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Tasks</h2>
                    <div className="space-y-4">
                        {tasks?.map((task) => (
                            <div key={task.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                                    <p className="text-gray-600 text-sm">{task.description}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-medium text-white rounded-full 
                                ${task.taskStatus === "Completed" ? "bg-green-600 text-white"
                                    : task.taskStatus === "In Progress" ? "bg-gray-500 text-white"
                                        : "bg-red-500 text-white"}`}>
                                {task.taskStatus}
                            </span>
                            </div>
                        ))}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
