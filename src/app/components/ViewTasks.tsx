import {FaEdit, FaTrash} from "react-icons/fa";
import {useState} from "react";

const ViewTasks = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: "UI Fixes",
            description: "Improve UI responsiveness on mobile.",
            date: "2025-03-15",
            time: "3 hrs",
            status: "In Progress"
        },
        {
            id: 2,
            name: "API Security",
            description: "Implement JWT authentication.",
            date: "2025-03-18",
            time: "5 hrs",
            status: "Completed"
        },
        {
            id: 3,
            name: "Dashboard Update",
            description: "Enhance the analytics dashboard.",
            date: "2025-03-20",
            time: "4 hrs",
            status: "Pending"
        },{
            id: 4,
            name: "Dashboard Update",
            description: "Enhance the analytics dashboard.",
            date: "2025-03-20",
            time: "4 hrs",
            status: "Pending"
        },{
            id: 5,
            name: "Dashboard Update",
            description: "Enhance the analytics dashboard.",
            date: "2025-03-20",
            time: "4 hrs",
            status: "Pending"
        },{
            id: 6,
            name: "Dashboard Update",
            description: "Enhance the analytics dashboard.",
            date: "2025-03-20",
            time: "4 hrs",
            status: "Pending"
        },{
            id: 7,
            name: "Dashboard Update",
            description: "Enhance the analytics dashboard.",
            date: "2025-03-20",
            time: "4 hrs",
            status: "Pending"
        },{
            id: 8,
            name: "Dashboard Update",
            description: "Enhance the analytics dashboard.",
            date: "2025-03-20",
            time: "4 hrs",
            status: "Pending"
        },{
            id: 9,
            name: "Dashboard Update",
            description: "Enhance the analytics dashboard.",
            date: "2025-03-20",
            time: "4 hrs",
            status: "Pending"
        },{
            id: 10,
            name: "Dashboard Update",
            description: "Enhance the analytics dashboard.",
            date: "2025-03-20",
            time: "4 hrs",
            status: "Pending"
        },
    ]);
    const handleDelete = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
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
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id} className="border-t hover:bg-gray-100">
                            <td className="py-3 px-4">{task.name}</td>
                            <td className="py-3 px-4">{task.description}</td>
                            <td className="py-3 px-4">{task.date}</td>
                            <td className="py-3 px-4">{task.time}</td>
                            <td className="py-3 px-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full 
                                        ${task.status === "Completed" ? "bg-green-600 text-white"
                                        : task.status === "In Progress" ? "bg-indigo-600 text-white"
                                            : "bg-gray-500 text-white"}`}>
                                        {task.status}
                                    </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                                <button className="text-blue-600 hover:text-blue-800 mr-3">
                                    <FaEdit size={18}/>
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
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
