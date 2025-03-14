import {FaEdit, FaTrash} from "react-icons/fa";
import useAuth from "@/app/context/Auth/useAuth";
import {useEffect, useState} from "react";
import {TaskProps} from "@/app/libs/types";

const ViewTasks = ({flag}: { flag: boolean }) => {
    const {user} = useAuth();
    const [tasks, setTasks] = useState<TaskProps[]>([]);


    useEffect(() => {
        fetch(`/api/task/get-tasks?userId=${user?.id}`)
            .then(response => response.json())
            .then(data => {
                setTasks(data.tasks);
                console.log(data);
            })
    }, [flag, user?.id]);

    const handleDelete = (id: number) => {
        console.log(id);
    };
    return (
        <div className={"flex justify-center items-center flex-col h-screen"}>

            <div className="overflow-x-auto shadow-lg rounded-lg">
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
                    <tbody>
                    {tasks?.map((task: TaskProps) => (
                        <tr key={task.id} className="border-t hover:bg-gray-100">
                            <td className="py-3 px-4">{task.title}</td>
                            <td className="py-3 px-4">{task.description}</td>
                            <td className="py-3 px-4">{task.date}</td>
                            <td className="py-3 px-4">{task.time}</td>
                            <td className="py-3 px-4 text-center">
                                <button className="text-blue-600 hover:text-blue-800 mr-3">
                                    <FaEdit size={18}/>
                                </button>
                                <button
                                    onClick={() => task.id && handleDelete(task.id)}
                                    className="text-red-600 hover:text-red-800">
                                    <FaTrash size={18}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewTasks;
