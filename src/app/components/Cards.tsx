"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import useTask from "@/app/context/Task/useTask";
import useAuth from "@/app/context/Auth/useAuth";

const Cards = ({addNewTask, viewTasks}: { addNewTask?: () => void, viewTasks?: () => void }) => {
    const {reloadViewTaskForm} = useTask();
    const {user} = useAuth();
    const [time, setTime] = useState<number | null>(null);
    useEffect(() => {
        if (user?.id) {
            fetch(`api/task/get-time?userId=${user?.id}`)
                .then(response => response.json())
                .then(data => {
                    setTime(data.totalTime);
                })
        }
    }, [reloadViewTaskForm]);

    return (
        <div className="flex min-w-1/2 h-full px-8 flex-wrap pt-25 flex-row gap-6">

            <div className="flex flex-col max-w-2/5 gap-6">
                <div
                    className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-red-500 flex flex-col items-center
                text-center w-full">
                    <h3 className="text-xl font-semibold text-gray-900">Add New Task</h3>
                    <p className="text-gray-600 mt-2 text-sm">Quickly create and manage new tasks.</p>
                    <button
                        onClick={addNewTask}
                        className="mt-4 px-4 py-2 font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition
                    cursor-pointer">
                        + Add Task
                    </button>
                </div>

                <div
                    className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-indigo-600 flex flex-col items-center
                 text-center w-full">
                    <h3 className="text-xl font-semibold text-gray-900">View Tasks</h3>
                    <p className="text-gray-600 mt-2 text-sm">Check pending and completed tasks.</p>
                    <button
                        onClick={viewTasks}
                        className="mt-4 px-4 py-2 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg
                    transition cursor-pointer">
                        View List
                    </button>
                </div>

                <div
                    className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-black flex flex-col items-center
                text-center w-full">
                    <h3 className="text-xl font-semibold text-gray-900">Dashboard</h3>
                    <p className="text-gray-600 mt-2 text-sm">Track task progress with insights.</p>
                    <Link href={'/dashboard'}>
                        <button
                            className="mt-4 px-4 py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg
                        transition cursor-pointer">
                            Open Dashboard
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col max-w-2/5 gap-6">

                <div className="flex flex-row gap-2">
                    <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-red-500 flex flex-col items-center
                text-center h-fit">
                        <h3 className="text-xl font-semibold text-gray-900">Total Hrs logged today</h3>
                        <p className="text-gray-600 mt-2 text-2xl">{user?.id ? time ? time + " hours" : "loading" : "Please Login"}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-indigo-600 flex flex-col items-center
                text-center h-fit">
                        <h3 className="text-xl font-semibold text-gray-900">Pending tasks</h3>
                        <p className="text-gray-600 mt-2 text-2xl">Test Data</p>
                    </div>
                </div>

                <div
                    className="bg-white shadow-lg rounded-xl p-4 border-t-4 border-indigo-600 flex flex-col
                    text-center h-100 mb-23">
                    <h3 className="text-xl font-semibold text-gray-900">Summary</h3>
                    <div className="flex justify-start flex-col overflow-y-auto max-h-90">
                        <div className="text-left">Functionality for editing the task</div>
                        <div className="text-left">UI fixes</div>
                        <div className="text-left">Functionality for editing the task</div>
                        <div className="text-left">UI fixes</div>
                        <div className="text-left">Functionality for editing the task</div>
                        <div className="text-left">UI fixes</div>
                        <div className="text-left">Functionality for editing the task</div>
                        <div className="text-left">UI fixes</div>
                        <div className="text-left">Functionality for editing the task</div>
                        <div className="text-left">UI fixes</div>
                        <div className="text-left">Functionality for editing the task</div>
                        <div className="text-left">UI fixes</div>
                        <div className="text-left">Functionality for editing the task</div>
                        <div className="text-left">UI fixes</div>
                        <div className="text-left">Functionality for editing the task</div>
                        <div className="text-left">UI fixes</div>
                        <div className="text-left">Functionality for editing the task</div>
                        <div className="text-left">UI fixes</div>
                        <div className="text-left">Functionality for editing the task</div>
                        <div className="text-left">UI fixes</div>

                    </div>
                </div>


            </div>


        </div>
    );
};

export default Cards;
