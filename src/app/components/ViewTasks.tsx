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
        date: string,
        time: number
    }>({
        id: null,
        status: false,
        title: "",
        description: "",
        date: "",
        time: 0
    });
    useEffect(() => {
        if (user?.id) {
            fetch(`/api/task/get-tasks?userId=${user?.id}`)
                .then(response => response.json())
                .then(data => {
                    setTasks(data.tasks);
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

    const handleEdit = ({id = null, title, description, date, time}: TaskProps) => {
        const formattedDate = date.split('-').reverse().join('-');
        setEditModal({
            status: true,
            id,
            title,
            description,
            date: formattedDate,
            time
        });

        reset({id, title, description, date: formattedDate, time});
    };

    const onSubmit = async (
        {id, title, description, date, time}: TaskProps) => {
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
                date : formattedDate,
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
            date: "",
            time: 0,
        });
        reset();
    }

    return (
        <div className={"flex justify-center items-center flex-col h-screen"}>

            <div className="shadow-lg rounded-lg overflow-x-auto max-h-[60%] max-w-[50%] bg-white">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="py-3 px-4 text-left">Task Name</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Date</th>
                        <th className="py-3 px-4 text-left">Time</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="overflow-x-auto h-[60%]">
                    {user ?
                        (
                            (tasks.length > 0 ? (tasks?.map((task: TaskProps) => (
                                <tr key={task.id} className="border-t hover:bg-gray-100">
                                    <td className="py-3 px-4">{task.title}</td>
                                    <td className="py-3 px-4">{task.description}</td>
                                    <td className="py-3 px-4">{task.date}</td>
                                    <td className="py-3 px-4">{task.time}</td>
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
                                    <td colSpan={5} className="py-3 px-4 text-center">
                                        No tasks found
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-3 px-4 text-center">
                                    You have to login for viewing tasks
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {editModal?.status && (
                <div className={"fixed top-0 left-0 h-screen w-screen backdrop-blur z-50 flex " +
                    "justify-center items-center"}>
                    <div className={"min-h-1/2 min-w-1/4 bg-white flex p-4 rounded-2xl flex-col"}>
                        <div className={"flex justify-between"}>

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
                                        date: '',
                                        time: 0
                                    })
                                }}
                            />
                        </div>
                        <form className={"flex flex-col space-y-4 gap-2 p-3"}
                              onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className={"flex gap-2 flex-col"}>
                                <label className={"font-medium text-gray-700"} htmlFor="title">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    className={"p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block " +
                                        "w-full sm:text-sm border-gray-300 rounded-md"}
                                    {...register("title", {
                                        required: "title is required",
                                    })}
                                />
                                {errors.title && (<p className={"text-red-500"}>{errors.title.message}</p>)}
                            </div>
                            <div className={"flex gap-2 flex-col"}>
                                <label className={"font-medium text-gray-700"} htmlFor="title">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    className={"p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block " +
                                        "w-full sm:text-sm border-gray-300 rounded-md"}
                                    {...register("description", {
                                        required: "description is required",
                                    })}
                                />
                                {errors.description && (<p className={"text-red-500"}>{errors.description.message}</p>)}
                            </div>
                            <div className={"flex gap-2 flex-col"}>
                                <label className={"font-medium text-gray-700"} htmlFor="title">
                                    Date and Time
                                </label>
                                <div className={"flex flex-row gap-1"}>
                                    <div className={"flex flex-col"}>
                                        <input
                                            id="date"
                                            type="date"
                                            className={"p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block " +
                                                "w-full sm:text-sm border-gray-300 rounded-md"}
                                            {...register("date", {
                                                required: "date is required",
                                            })}
                                        />
                                        {errors.date && (<p className={"text-red-500"}>{errors.date.message}</p>)}
                                    </div>
                                    <div className={"flex flex-col"}>
                                        <input
                                            id="time"
                                            type="number"
                                            step="0.1"
                                            placeholder="Time in hours"
                                            className={"p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block " +
                                                "w-full sm:text-sm border-gray-300 rounded-md"}
                                            {...register("time", {
                                                required: "Time is required",
                                            })}
                                        />
                                        {errors.time && (<p className={"text-red-500"}>{errors.time.message}</p>)}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium
                                transition"
                            >
                                {isSubmitting ? "Updating Task..." : "Update Task"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewTasks;
