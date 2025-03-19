"use client";

interface TaskProps {
    title: string,
    description: string,
    taskStatus: string,
    time: number,
    date: string
}

import useAuth from "@/app/context/Auth/useAuth";
import {useEffect, useState} from "react";
import useTheme from "@/app/context/Theme/useTheme";

const Summary = () => {
    const {darkMode} = useTheme();
    const {user} = useAuth();
    const [previousDayLogTime, setPreviousDayLogTime] = useState<number>(0);
    const [taskSummary, setTaskSummary] = useState<{
        taskToday: TaskProps[],
        taskYesterday: TaskProps[]
    }>({taskToday: [], taskYesterday: []});
    useEffect(() => {
        if (user?.id) {
            fetch(`/api/task/get-summary?userId=${user?.id}`)
                .then(response => response.json())
                .then(data => {
                    const {taskToday, taskYesterday} = data;
                    setTaskSummary({taskToday, taskYesterday});
                })
        }
    }, [user?.id]);

    useEffect(() => {
        const totalTime = taskSummary.taskYesterday.reduce((total, task) => total + Number(task.time || 0), 0);
        setPreviousDayLogTime(totalTime);
    }, [taskSummary.taskYesterday]);

    return (
        <div className="flex flex-col w-full h-full p-3 gap-3">
            <div className="w-full h-[50%] bg-white/60 rounded-2xl p-5 flex flex-col gap-4">
                <h2 className="text-xl">
                    Today
                </h2>
                <div className="w-full rounded-2xl shadow-md overflow-y-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="py-3 px-4 text-left">Task Name</th>
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-left normal-case">Time (Hrs)</th>
                            <th className="py-3 px-4 text-left min-w-30">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {user ?
                            (
                                (taskSummary?.taskToday?.length > 0 ?
                                    (taskSummary?.taskToday?.map((task: TaskProps, index: number) => (
                                        <tr key={index} className="border-t hover:bg-gray-100">
                                            <td className="py-3 px-4">{task.title}</td>
                                            <td className="py-3 px-4">{task.description}</td>
                                            <td className="py-3 px-4">{task.time}</td>
                                            <td className="py-3 px-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full min-w-30 
                                        ${task.taskStatus === "Completed" ? "bg-green-600 text-white"
                                        : task.taskStatus === "In Progress" ? "bg-gray-500 text-white"
                                            : "bg-red-500 text-white"}`}>
                                        {task.taskStatus}
                                    </span>
                                            </td>
                                        </tr>
                                    ))) : (
                                        <tr>
                                            <td colSpan={6} className="py-3 px-4 text-center">
                                                No tasks found
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-3 px-4 text-center">
                                        You have to login for viewing tasks
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full h-[50%] bg-white/60 rounded-2xl p-5 flex flex-col gap-4">
                <h2 className="text-xl flex flex-row justify-between items-center w-full">
                    <span>Yesterday</span>
                    <div className={`p-2 sm:p-1 ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-sm shadow-lg 
                rounded-xl border-t-4 border-red-500 flex flex-row items-center w-fit`}>
                        <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl font-semibold sm:text-sm text-gray-900`}>
                            Total Hrs logged yesterday: &nbsp;</h3>
                        <p className={`${darkMode ? "text-white" : "text-black"} text-2xl sm:text-sm font-bold sm:font-normal`}>
                            {user?.id ? previousDayLogTime != null ? previousDayLogTime + " hour(s)" : "loading" : "Please Login"}
                        </p>
                    </div>
                </h2>
                <div className="w-full rounded-2xl shadow-md overflow-y-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="py-3 px-4 text-left">Task Name</th>
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-left normal-case">Time (Hrs)</th>
                            <th className="py-3 px-4 text-left min-w-30">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {user ?
                            (
                                (taskSummary?.taskYesterday?.length > 0 ?
                                    (taskSummary?.taskYesterday?.map((task: TaskProps, index: number) => (
                                        <tr key={index} className="border-t hover:bg-gray-100">
                                            <td className="py-3 px-4">{task.title}</td>
                                            <td className="py-3 px-4">{task.description}</td>
                                            <td className="py-3 px-4">{task.time}</td>
                                            <td className="py-3 px-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full min-w-30 
                                        ${task.taskStatus === "Completed" ? "bg-green-600 text-white"
                                        : task.taskStatus === "In Progress" ? "bg-gray-500 text-white"
                                            : "bg-red-500 text-white"}`}>
                                        {task.taskStatus}
                                    </span>
                                            </td>
                                        </tr>
                                    ))) : (
                                        <tr>
                                            <td colSpan={6} className="py-3 px-4 text-center">
                                                No tasks found
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-3 px-4 text-center">
                                        You have to login for viewing tasks
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Summary;
