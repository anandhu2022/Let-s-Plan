"use client";

import {FaEdit, FaTrash} from "react-icons/fa";
import useAuth from "@/app/context/Auth/useAuth";
import {useEffect, useState} from "react";
import {TaskProps} from "@/app/libs/types";
import useTask from "@/app/context/Task/useTask";
import {Close} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import useTheme from "@/app/context/Theme/useTheme";

const ViewTasks = () => {
    const {darkMode} = useTheme();
    const {reloadViewTaskForm, reloadTaskForm} = useTask();
    const {user} = useAuth();
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [editModal, setEditModal] = useState<{
        id: number | null,
        status: boolean,
        title: string,
        description: string,
        taskStatus: string,
        date: string,
        time: number
    }>({
        id: null,
        status: false,
        title: "",
        description: "",
        taskStatus: "",
        date: "",
        time: 0
    });
    useEffect(() => {
        if (user?.id) {
            fetch(`/api/task/get-tasks?userId=${user?.id}`)
                .then(response => response.json())
                .then(data => {
                    const sortedTasks = data.tasks.sort((a: { id: number; }, b: { id: number; }) => (b.id - a.id))
                    setTasks(sortedTasks);
                });
        }
    }, [reloadViewTaskForm, user?.id]);

    const handleDelete = (id: number) => {
        fetch(`/api/task/delete-task?taskId=${id}`, {method: 'DELETE'})
            .then(response => response.json());
        reloadTaskForm();
    };

    const {register, handleSubmit, formState, reset} = useForm<TaskProps>({
        defaultValues: {
            title: editModal.title,
            description: editModal.description,
            time: editModal.time,
            date: editModal.date,
        },
    });
    const {errors, isSubmitting} = formState;

    const handleEdit = (
        {
            id = null,
            title,
            description,
            taskStatus,
            date,
            time
        }: TaskProps) => {
        const formattedDate = date.split('-').reverse().join('-');
        setEditModal({
            status: true,
            id,
            title,
            description,
            taskStatus,
            date: formattedDate,
            time
        });

        reset({id, title, description, taskStatus, date: formattedDate, time});
    };

    const onSubmit = async (
        {id, title, description, taskStatus, date, time}: TaskProps) => {
        const formattedDate = date.split('-').reverse().join('-');
        const result = await fetch("/api/task/edit-task", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                title,
                description,
                taskStatus,
                date: formattedDate,
                time: Number(time),
            }),
        });
        if (!result.ok) {
            console.log(result);
            throw new Error('Failed to save task');
        }
        reloadTaskForm();
        setEditModal({
            id: null,
            status: false,
            title: "",
            description: "",
            taskStatus: "",
            date: "",
            time: 0,
        });
        reset();
    }

    return (
        <div className={"flex flex-col w-full h-full relative"}>
            <div className="shadow-lg rounded-2xl overflow-x-auto">
                <table className="w-full border-collapse shadow-md ">
                    <thead className={`${darkMode ? "text-gray-100 bg-black/40" : "text-gray-700 bg-white/40"} 
                    backdrop-blur-sm uppercase text-sm`}>
                    <tr>
                        <th className="py-3 px-4 text-left">Task Name</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Date</th>
                        <th className="py-3 px-4 text-left normal-case">Time (Hrs)</th>
                        <th className="py-3 px-4 text-left w-30">Status</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className={`${darkMode ? "text-gray-100 bg-black/80" : "text-gray-700 bg-white/40"} 
                    backdrop-blur-sm`}>
                    {user ?
                        (
                            (tasks.length > 0 ? (tasks?.map((task: TaskProps) => (
                                <tr key={task.id} className={`border-t transition duration-500 ease-out
                                ${darkMode? "hover:bg-black": "hover:bg-white"}`}>
                                    <td className="py-3 px-4">{task.title}</td>
                                    <td className="py-3 px-4">{task.description}</td>
                                    <td className="py-3 px-4">{task.date}</td>
                                    <td className="py-3 px-4">{task.time}</td>
                                    <td className="py-3 px-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full min-w-[100%] 
                                    inline-block text-center
                                        ${task.taskStatus === "Completed" ? "bg-green-600 text-white"
                                        : task.taskStatus === "In Progress" ? "bg-gray-500 text-white"
                                            : task.taskStatus === "Blocked" ? "bg-black text-white" : "bg-red-500 " +
                                                "text-white"}`}>
                                        {task.taskStatus}
                                    </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => {
                                                if (task) handleEdit(task);
                                            }}
                                            className="text-blue-600 hover:text-blue-800 mr-3">
                                            <FaEdit size={18}/>
                                        </button>
                                        <button
                                            onClick={() => task.id && handleDelete(task.id)}
                                            className="text-red-600 hover:text-red-800">
                                            <FaTrash size={18}/>
                                        </button>
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
            {editModal?.status && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className={`w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 relative`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold dark:text-gray-100">Edit Task</h2>
                            <Close
                                className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-800"
                                onClick={() => {
                                    reset();
                                    setEditModal({
                                        id: null, status: false, title: '', description: '', taskStatus: '', date: '', time: 0
                                    });
                                }}
                            />
                        </div>

                        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Task Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 mt-1 border rounded-lg dark:bg-gray-800 dark:text-white"
                                    {...register("title", { required: "Task name is required" })}
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea
                                    className="w-full p-2 mt-1 border rounded-lg dark:bg-gray-800 dark:text-white"
                                    {...register("description", { required: "Description is required" })}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                <select
                                    className="w-full p-2 mt-1 border rounded-lg dark:bg-gray-800 dark:text-white"
                                    {...register("taskStatus")}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Blocked">Blocked</option>
                                </select>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-3/5">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 mt-1 border rounded-lg dark:bg-gray-800 dark:text-white"
                                        {...register("date", { required: "Date is required" })}
                                    />
                                    {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                                </div>

                                <div className="w-2/5">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time (hrs)</label>
                                    <input
                                        type="number"
                                        step="0.05"
                                        className="w-full p-2 mt-1 border rounded-lg dark:bg-gray-800 dark:text-white"
                                        {...register("time", { required: "Time is required" })}
                                    />
                                    {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                                </div>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
                                    onClick={() => {
                                        reset();
                                        setEditModal({ id: null, status: false, title: '', description: '', taskStatus: '', date: '', time: 0 });
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                >
                                    {isSubmitting ? "Updating..." : "Update Task"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ViewTasks;
