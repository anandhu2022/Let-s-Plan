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

const AddTask = () => {
    const {reloadTaskForm} = useTask();
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
        <div className="flex items-center justify-center w-1/3">
            <div
                className="backdrop-blur-md bg-black/50 border border-white/30 shadow-2xl rounded-xl p-8
                        w-[90%] max-w-md text-white">
                <h2 className="text-2xl font-semibold mb-4 text-white/90">Add New Task</h2>
                {user ?
                    (<form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white/80">Task Name</label>
                            <input
                                id="title"
                                type="text"
                                className="w-full p-2 mt-1 bg-transparent border border-white/40 rounded-lg
                                    text-white placeholder-white/50 focus:outline-none focus:border-white"
                                placeholder="Enter task name"
                                {...register("title", {
                                    required: "Task name is required",
                                })}
                            />
                            <div className="text-red-500 mt-2">{errors.title?.message}</div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white/80">Description</label>
                            <textarea
                                id="description"
                                className="w-full p-2 mt-1 bg-transparent border border-white/40 rounded-lg
                                    text-white placeholder-white/50 focus:outline-none focus:border-white"
                                placeholder="Enter task details"
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                maxLength={255}
                            />
                            <div className="text-red-500 mt-2">{errors.description?.message}</div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white/80">Status</label>
                            <select
                                id="taskStatus"
                                className="w-full p-2 mt-1 bg-transparent border border-white/40 rounded-lg
                                    text-white placeholder-white/50 focus:outline-none focus:border-white"
                                {...register("taskStatus")}
                            >
                                <option className="bg-black text-white" value="Pending">Pending</option>
                                <option className="bg-black text-white" value="In Progress">In Progress</option>
                                <option className="bg-black text-white" value="Completed">Completed</option>
                            </select>
                            <div className="text-red-500 mt-2">{errors.taskStatus?.message}</div>
                        </div>
                        <div className="mb-4 flex flex-col">
                            <label className="block text-sm font-medium text-white/80">Date and Time</label>
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
                                                color: "white",
                                                backgroundColor: "transparent",
                                                border: "1px solid rgba(255, 255, 255, 0.4)",
                                                "&:hover": {
                                                    borderColor: "white",
                                                },
                                                "&.Mui-focused": {
                                                    borderColor: "white",
                                                },
                                            },
                                            "& .MuiInputBase-input": {
                                                color: "white",
                                            },
                                            "& .MuiSvgIcon-root": {
                                                color: "white",
                                            },
                                        }}
                                        slotProps={{
                                            field: {clearable: true},
                                        }}
                                    />
                                </LocalizationProvider>

                                <input
                                    id="time"
                                    type="number"
                                    className="w-[40%] p-2 mt-1 border border-white/40 rounded-lg
                                    text-white focus:outline-none focus:border-white"
                                    placeholder="Time in Hrs"
                                    {...register("time")}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium
                                transition"
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
                        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center
                        rounded-xl">
                            <div className="w-[70%] max-w-md p-4 bg-white rounded-xl shadow-2xl flex gap-4 flex-col">
                                <div className={`border-2 border-red-600 p-4 rounded-xl`}>
                                    <div className={"text-center"}>
                                        {modal.success ? <CheckIcon fontSize={"large"} className="text-green-600"/> :
                                            <NewReleasesIcon fontSize={"large"} className="text-red-600"/>}
                                    </div>
                                    <h2 className={`text-center text-2xl font-semibold mb-4 
                                ${modal.success ? "text-green-600" : "text-red-600"}`}>
                                        {modal.message}
                                    </h2>
                                    <button
                                        onClick={() => setModal({enabled: false})}
                                        className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium
                                            transition"
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
