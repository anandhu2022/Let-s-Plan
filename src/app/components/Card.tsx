"use client";
import Link from "next/link";
import {CircularProgress} from "@mui/material";

const Card = ({addNewTask, viewTasks}: { addNewTask?: () => void, viewTasks?: () => void }) => {
    return (
        <div className="flex w-1/2 h-full items-center px-8 gap-6 flex-wrap py-15">

            <div
                className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-red-500 flex flex-col items-center
                text-center w-2/5">
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
                 text-center w-2/5">
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
                text-center w-2/5">
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

            <div
                className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-red-500 flex flex-col items-center
                text-center w-2/5">
                <h3 className="text-xl font-semibold text-gray-900">Coming Soon . . .</h3>
                <p className="text-gray-600 mt-2 text-sm">Lorem ipsum dolor sit amet</p>
                <button
                    className="mt-4 px-4 py-1 font-medium text-white bg-red-500 hover:bg-gray-900 rounded-lg
                        transition cursor-pointer flex">
                    <CircularProgress size={30} color="inherit"/>
                </button>
            </div>

            <div
                className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-indigo-600 flex flex-col items-center
                text-center w-2/5">
                <h3 className="text-xl font-semibold text-gray-900">Coming Soon . . .</h3>
                <p className="text-gray-600 mt-2 text-sm">Lorem ipsum dolor sit amet</p>
                <button
                    className="mt-4 px-4 py-1 font-medium text-white bg-indigo-600 hover:bg-gray-900 rounded-lg
                        transition cursor-pointer flex">
                    <CircularProgress size={30} color="inherit"/>
                </button>
            </div>

            <div
                className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-black flex flex-col items-center
                text-center w-2/5">
                <h3 className="text-xl font-semibold text-gray-900">Coming Soon . . .</h3>
                <p className="text-gray-600 mt-2 text-sm">Lorem ipsum dolor sit amet</p>
                <button
                    className="mt-4 px-4 py-1 font-medium text-white bg-black hover:bg-gray-900 rounded-lg
                        transition cursor-pointer flex">
                    <CircularProgress size={30} color="inherit"/>
                </button>
            </div>

        </div>
    );
};

export default Card;
