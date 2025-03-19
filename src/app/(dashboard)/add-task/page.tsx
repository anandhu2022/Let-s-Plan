"use client";

import dayjs from "dayjs";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {TaskProps} from "@/app/libs/types";
import useTask from "@/app/context/Task/useTask";
import useAuth from "@/app/context/Auth/useAuth";
import CheckIcon from '@mui/icons-material/Check';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import useTheme from "@/app/context/Theme/useTheme";

const AddTask = () => {
    const {reloadTaskForm} = useTask();
    const {darkMode} = useTheme();
    const {user} = useAuth();
    const [modal, setModal] = useState<{ enabled: boolean, success?: boolean, message?: string; } | null>(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const {register, handleSubmit, formState, reset} = useForm<TaskProps>({
        defaultValues: {
            title: '',
            description: '',
            userId: null,
            date: "",
        },
    });
    const {errors, isSubmitting} = formState;
    const onSubmit = async ({title, description, time, taskStatus}: TaskProps) => {
        try {
            const formattedDate: string = selectedDate.format("DD-MM-YYYY");
            console.log(title, description, time, formattedDate);
            if (!title || !description || !time || !user?.id || !taskStatus) {
                setModal({
                    enabled: true,
                    success: false,
                    message: "Missing required fields"
                });
                return {
                    status: false,
                    message: "Missing required fields"
                };
            }
            const response: Response = await fetch('/api/task/add-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    taskStatus,
                    userId: user.id,
                    date: formattedDate,
                    time
                })
            });

            if (response.ok) {
                setModal({
                    enabled: true,
                    success: true,
                    message: "Task added successfully"
                });
                reset();
            }
            reloadTaskForm();
        } catch (error) {
            console.error("Error submitting task:", error);
            return {
                status: false,
                message: "Error submitting task:"
            };
        }

    }
    return (
        <div
            className={`flex items-center justify-center items-stretch min-w-full h-full rounded-2xl ${darkMode
                ? "bg-black/40 placeholder-white" : "bg-white/40"} backdrop-blur-sm placeholder-black`}>
            <div className="p-8 text-black w-full">
                <h2 className={`text-2xl font-semibold text-center w-full ${darkMode ? "text-white" : "text-black"}`}>
                    Add New Task
                </h2>
                {user ?
                    (<form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-6 w-full ${darkMode ?
                        "text-white" : "text-black"}`}>
                        <div className="">
                            <label className="block text-sm font-medium">Task Name</label>
                            <input
                                id="title"
                                type="text"
                                className={`w-full p-2 bg-transparent border ${darkMode ? "border-white/40 " +
                                    "focus:border-white" : "border-black/40 focus:border-black"} rounded-lg 
                                    focus:outline-none`}
                                placeholder="Enter task name"
                                {...register("title", {
                                    required: "Task name is required",
                                })}
                            />
                            <div className="text-red-500">{errors.title?.message}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                                id="description"
                                className={`w-full p-2  bg-transparent border ${darkMode ? "border-white/40 " +
                                    "focus:border-white" : "border-black/40 focus:border-black"} rounded-lg 
                                    focus:outline-none`}
                                placeholder="Enter task details"
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                maxLength={255}
                            />
                            <div className="text-red-500">{errors.description?.message}</div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium">Status</label>
                            <select
                                id="taskStatus"
                                className={`w-full p-2  bg-transparent border ${darkMode ? "border-white/40 " +
                                    "focus:border-white" : "border-black/40 focus:border-black"} rounded-lg 
                                    focus:outline-none`}
                                {...register("taskStatus")}
                            >
                                <option className="bg-white/30 text-black" value="Pending">Pending</option>
                                <option className="bg-white/30 text-black" value="In Progress">In Progress</option>
                                <option className="bg-white/30 text-black" value="Completed">Completed</option>
                                <option className="bg-white/30 text-black" value="Blocked">Blocked</option>
                            </select>
                            <div className="text-red-500">{errors.taskStatus?.message}</div>
                        </div>
                        <div className=" flex flex-col">
                            <label className="block text-sm font-medium">Date and Time</label>
                            <div className={"flex flex-row gap-3 w-full"}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        value={selectedDate}
                                        onChange={(newValue) => {
                                            if (newValue) setSelectedDate(dayjs(newValue));
                                        }}
                                        sx={{
                                            width: "60%",
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "8px",
                                                color: "black",
                                                backgroundColor: "transparent",
                                                border: "1px rgba(255, 255, 255, 0.4)",
                                                "&:hover": {
                                                    borderColor: "black",
                                                },
                                                "&.Mui-focused": {
                                                    borderColor: "black",
                                                },
                                            },
                                        }}
                                        slotProps={{
                                            field: {clearable: true},
                                        }}
                                    />
                                </LocalizationProvider>

                                <div className={"w-[40%]"}>
                                    <input
                                        id="time"
                                        type="number"
                                        step="0.05"
                                        className={` p-2  border ${darkMode ? "border-white/40 focus:border-white" :
                                            "border-black/40 focus:border-black"} rounded-lg h-full 
                                            focus:outline-none w-full`}
                                        placeholder="Time in Hrs"
                                        {...register("time", {
                                            required: "Time is required",
                                        })}
                                    />
                                    <div className="text-red-500">{errors.time?.message}</div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition
                            hover:text-white transition duration-500 ease-out"
                        >
                            {isSubmitting ? "Creating Task..." : "Add Task"}
                        </button>
                    </form>) : (
                        <div className="text-center  text-sm">
                            Please login to add tasks
                        </div>
                    )}
                {
                    modal?.enabled && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center rounded-xl
                        bg-black/30 backdrop-blur-md">
                            <div className="w-[70%] max-w-md p-4 bg-white rounded-xl shadow-2xl flex gap-4 flex-col">
                                <div className={`border-2 border-blue-600 p-4 rounded-xl flex flex-col gap-8`}>
                                    <div className={"text-center"}>
                                        {modal.success ? <CheckIcon fontSize={"large"} className="text-blue-600"/> :
                                            <NewReleasesIcon fontSize={"large"} className="text-red-600"/>}
                                    </div>
                                    <h2 className={`text-center text-2xl font-semibold  
                                ${modal.success ? "text-blue-600" : "text-red-600"}`}>
                                        {modal.message}
                                    </h2>
                                    <button
                                        onClick={() => setModal({enabled: false})}
                                        className="w-full px-4 py-2 bg-blue-300 hover:bg-blue-600 hover:text-white rounded-lg font-medium
                                            transition duration-500 ease-out"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AddTask;
