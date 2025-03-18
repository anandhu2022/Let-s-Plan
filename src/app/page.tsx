"use client";

import useAuth from "@/app/context/Auth/useAuth";
import {useEffect, useState} from "react";
import {TaskProps} from "@/app/libs/types";
import Clock from "@/app/components/Clock";

const Dashboard = () => {
    const {user} = useAuth();
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


        <div className="h-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{user?.username && `Welcome ${user.username}`}</h1>
                <Clock/>
            </div>
            <div className="flex gap-6 max-w-full">
                <div className="p-6 bg-white/40 backdrop-blur-sm shadow-lg rounded-xl border-t-4 border-red-500 w-full">
                    <h2 className="text-xl font-semibold text-gray-900">Total Tasks</h2>
                    <p className="text-3xl font-bold text-gray-800">{tasksCounts.total}</p>
                </div>

                <div className="p-6 bg-white/40 backdrop-blur-sm shadow-lg rounded-xl border-t-4 border-indigo-600 w-full">
                    <h2 className="text-xl font-semibold text-gray-900">Completed</h2>
                    <p className="text-3xl font-bold text-gray-800">{tasksCounts.completed}</p>
                </div>

                <div className="p-6 bg-white/40 backdrop-blur-sm shadow-lg rounded-xl border-t-4 border-red-500 w-full">
                    <h2 className="text-xl font-semibold text-gray-900">In Progress</h2>
                    <p className="text-3xl font-bold text-gray-800">{tasksCounts.onProgress}</p>
                </div>

                <div className="p-6 bg-white/40 backdrop-blur-sm shadow-lg rounded-xl border-t-4 border-black w-full">
                    <h2 className="text-xl font-semibold text-gray-900">Pending</h2>
                    <p className="text-3xl font-bold text-gray-800">{tasksCounts.pending}</p>
                </div>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-6 shadow-lg rounded-xl overflow-hidden w-full h-full">
                <h2 className="text-2xl font-semibold text-gray-900">Recent Tasks</h2>
                <div className="flex gap-4 flex-col overflow-y-auto max-h-[90%] w-full p-2">
                    {tasks?.map((task) => (
                        <div key={task.id}
                             className="p-4 bg-white/80 backdrop-blur-sm rounded-lg flex justify-between items-center w-full">
                            <div className="min-w-0">
                                <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                                <p className="text-gray-600 text-sm truncate">{task.description}</p>
                            </div>
                            <span className={`px-3 py-1 text-sm font-medium text-white rounded-full 
                    ${task.taskStatus === "Completed" ? "bg-green-600"
                                : task.taskStatus === "In Progress" ? "bg-gray-500"
                                    : "bg-red-500"}`}>
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
