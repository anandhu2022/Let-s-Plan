"use client";

import {FaEdit, FaTrash} from "react-icons/fa";
import useAuth from "@/app/context/Auth/useAuth";
import {useEffect, useState} from "react";
import {TaskProps} from "@/app/libs/types";
import useTask from "@/app/context/Task/useTask";
import {Close} from "@mui/icons-material";
import {useForm} from "react-hook-form";

const ViewTasks = () => {
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
        const result = await fetch("http://localhost:3000/api/task/edit-task", {
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
        <div className={"flex flex-col w-full h-full"}>
            <div className="shadow-lg rounded-2xl overflow-x-auto">
                <table className="w-full border-collapse shadow-md ">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="py-3 px-4 text-left">Task Name</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Date</th>
                        <th className="py-3 px-4 text-left normal-case">Time (Hrs)</th>
                        <th className="py-3 px-4 text-left min-w-30">Status</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user ?
                        (
                            (tasks.length > 0 ? (tasks?.map((task: TaskProps) => (
                                <tr key={task.id} className="border-t hover:bg-gray-100">
                                    <td className="py-3 px-4">{task.title}</td>
                                    <td className="py-3 px-4">{task.description}</td>
                                    <td className="py-3 px-4">{task.date}</td>
                                    <td className="py-3 px-4">{task.time}</td>
                                    <td className="py-3 px-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full min-w-30
                                        ${task.taskStatus === "Completed" ? "bg-green-600 text-white"
                                        : task.taskStatus === "In Progress" ? "bg-gray-500 text-white"
                                            : "bg-red-500 text-white"}`}>
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
                <div
                    className="absolute bg-white/95 backdrop-blur flex justify-center h-full w-full rounded-2xl">
                    <div className="flex p-8 flex-col text-black w-full gap-5">
                        <div className={"flex justify-between p-4"}>
                            <h2 className={"text-xl"}>Edit task</h2>
                            <Close
                                className={"cursor-pointer"}
                                onClick={() => {
                                    reset();
                                    setEditModal({
                                        id: null,
                                        status: false,
                                        title: '',
                                        description: '',
                                        taskStatus: '',
                                        date: '',
                                        time: 0
                                    })
                                }}
                            />
                        </div>
                        <form className={"flex flex-col space-y-4 gap-2 p-4"}
                              onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black/80">Task Name</label>
                                <input
                                    id="title"
                                    type="text"
                                    className="w-full p-2 mt-1 bg-transparent border border-black/40 rounded-lg
                                    text-black placeholder-black/50 focus:outline-none focus:border-black"
                                    placeholder="Enter task name"
                                    {...register("title", {
                                        required: "Task name is required",
                                    })}
                                />
                                <div className="text-red-500 mt-2">{errors.title?.message}</div>
                            </div>
                            <div className={"flex gap-2 flex-col"}>
                                <label className={"font-medium"} htmlFor="title">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    className="w-full p-2 mt-1 bg-transparent border border-black/40 rounded-lg
                                    text-black placeholder-black/50 focus:outline-none focus:border-black"
                                    {...register("description", {
                                        required: "description is required",
                                    })}
                                />
                                {errors.description && (<p className={"text-red-500"}>
                                    {errors.description.message}
                                </p>)}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black/80">Status</label>
                                <select
                                    id="taskStatus"
                                    className="w-full p-2 mt-1 bg-transparent border border-black/40 rounded-lg
                                    text-black placeholder-black/50 focus:outline-none focus:border-black"
                                    {...register("taskStatus")}
                                >
                                    <option className="bg-white text-black" value="Pending">Pending</option>
                                    <option className="bg-white text-black" value="In Progress">In Progress</option>
                                    <option className="bg-white text-black" value="Completed">Completed</option>
                                </select>
                                <div className="text-red-500 mt-2">{errors.taskStatus?.message}</div>
                            </div>

                            <div className={"flex gap-2 flex-col"}>
                                <label className={"font-medium"} htmlFor="title">
                                    Date and Time
                                </label>
                                <div className={"flex flex-row gap-1 w-full"}>
                                    <div className={"flex flex-col w-[70%]"}>
                                        <input
                                            id="date"
                                            type="date"
                                            className="p-2 mt-1 bg-transparent border border-black/40 rounded-lg
                                    text-black placeholder-black/50 focus:outline-none focus:border-black"
                                            {...register("date", {
                                                required: "date is required",
                                            })}
                                        />
                                        {errors.date && (<p className={"text-red-500"}>{errors.date.message}</p>)}
                                    </div>
                                    <div className={"flex flex-col w-[30%]"}>
                                        <input
                                            id="time"
                                            type="number"
                                            step="0.05"
                                            placeholder="Time in hours"
                                            className="p-2 mt-1 bg-transparent border border-black/40 rounded-lg
                                    text-black placeholder-black/50 focus:outline-none focus:border-black"
                                            {...register("time", {
                                                required: "Time is required",
                                            })}
                                        />
                                        {errors.time && (<p className={"text-red-500"}>{errors.time.message}</p>)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium
                                transition"
                                    onClick={() => {
                                        reset();
                                        setEditModal({
                                            id: null,
                                            status: false,
                                            title: '',
                                            description: '',
                                            taskStatus: '',
                                            date: '',
                                            time: 0
                                        })
                                    }}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium
                                transition"
                                >
                                    {isSubmitting ? "Updating Task..." : "Update Task"}
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
