"use client";

import useAuth from "@/app/context/Auth/useAuth";
import {useEffect, useState} from "react";
import {TaskProps} from "@/app/libs/types";
import Clock from "@/app/components/Clock";
import useTheme from "@/app/context/Theme/useTheme";
import TotalWorkedHours from "@/app/components/TotalWorkedHours";

const Dashboard = () => {
    const {user} = useAuth();
    const {darkMode} = useTheme();
    const [tasksCounts, setTasksCounts] = useState<{
        pending: number,
        onProgress: number,
        completed: number,
        blocked: number,
        total: number,
        task: TaskProps[]
    }>({
        pending: 0,
        onProgress: 0,
        completed: 0,
        blocked: 0,
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
                        blocked: number;
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
                        } else if (task.taskStatus === "Blocked") {
                            acc.blocked += 1;
                        }
                        acc.total += 1;
                        acc.task = tasks;
                        return acc;
                    }, {pending: 0, onProgress: 0, completed: 0, blocked: 0, total: 0});
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


        <div className="h-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {user?.username && `Welcome ${user.username}`}
                </h1>
                <Clock/>
            </div>
            <div className="flex gap-6 max-w-full flex-row flex-wrap">

                <div className="block sm:hidden w-full">
                    <div className={`p-2 sm:p-6 ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-sm shadow-lg 
                rounded-xl border-t-4 border-black-500 flex flex-col flex-1 items-center min-w-25`}>
                        <TotalWorkedHours/>
                    </div>
                </div>

                <div className={`p-2 sm:p-6 ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-sm shadow-lg 
                rounded-xl border-t-4 border-yellow-500 flex flex-col flex-1 items-center min-w-25`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>Total
                        Tasks</h2>
                    <p className={`text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                        {tasksCounts.total}</p>
                </div>

                <div
                    className={`p-2 sm:p-6 ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-sm shadow-lg 
                    rounded-xl border-t-4 border-green-600 flex flex-col flex-1 items-center min-w-25`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                        Completed
                    </h2>
                    <p className={`text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                        {tasksCounts.completed}</p>
                </div>

                <div className={`p-2 sm:p-6 ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-sm shadow-lg 
                rounded-xl border-t-4 border-gray-400 flex flex-col flex-1 items-center min-w-25`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>In
                        Progress</h2>
                    <p className={`text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                        {tasksCounts.onProgress}</p>
                </div>

                <div className={`p-2 sm:p-6 ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-sm shadow-lg 
                rounded-xl border-t-4 border-red-600 flex flex-col flex-1 items-center min-w-25`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>Pending</h2>
                    <p className={`text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                        {tasksCounts.pending}</p>
                </div>

                <div className={`p-2 sm:p-6 ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-sm shadow-lg
                rounded-xl border-t-4 border-black flex flex-col flex-1 items-center min-w-25`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>Blocked</h2>
                    <p className={`text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                        {tasksCounts.blocked}</p>
                </div>

                <div className={`p-2 sm:p-6 ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-sm shadow-lg 
                rounded-xl border-t-4 border-black flex flex-col flex-1 items-center min-w-25`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>Recent&nbsp;Tasks</h2>
                    <p className={`text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                        ??</p>
                </div>
            </div>

            <div className={`${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-sm p-6 shadow-lg 
            rounded-xl lg:overflow-hidden w-full`}>
                <h2 className={`text-2xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    Recent Tasks
                </h2>
                <div className="flex gap-4 flex-col overflow-y-auto max-h-[90%] w-full p-2">
                    {tasks?.map((task) => (
                        <div key={task.id}
                             className={`p-4 ${darkMode ? "bg-black/80" : "bg-white/80"} backdrop-blur-sm rounded-lg 
                             flex justify-between items-center w-full`}>
                            <div className="min-w-0">
                                <div className="flex justify-between items-center">
                                    <h3 className={`text-lg font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                                        {task.title}
                                    </h3>
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full min-w-30 text-center block sm:hidden
                                        ${task.taskStatus === "Completed" ? "bg-green-600 text-white"
                                        : task.taskStatus === "In Progress" ? "bg-gray-500 text-white"
                                            : task.taskStatus === "Blocked" ? "bg-black text-white" : "bg-red-500 text-white"}`}>
                                        {task.taskStatus}
                                    </span>
                                </div>
                                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm pt-3 text-justify`}>
                                    {task.description}
                                </p>
                            </div>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full min-w-30 text-center hidden sm:block
                                        ${task.taskStatus === "Completed" ? "bg-green-600 text-white"
                                : task.taskStatus === "In Progress" ? "bg-gray-500 text-white"
                                    : task.taskStatus === "Blocked" ? "bg-black text-white" : "bg-red-500 text-white"}`}>
                                        {task.taskStatus}
                                    </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
