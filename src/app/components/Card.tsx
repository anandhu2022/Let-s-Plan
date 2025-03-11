const Card = () => {
    return (
        <div className={"flex justify-center w-full h-full pl-8 gap-6 flex-col"}>
            <div className="max-w-sm bg-white shadow-lg rounded-lg p-6 border-l-4 border-indigo-600 gap-2 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900">Add New Task</h3>
                <input type="text" placeholder="Task" className={"p-1 pl-2 border-2 w-full rounded-xl border-indigo-500 outline-none"}/>
                <textarea placeholder="Description" className={"p-1 pl-2 border-2 w-full rounded-xl border-indigo-500 outline-none"}/>
                <div className="flex items-center justify-between mt-4">
                    <input type="number" placeholder={"Time in Hours"} className="border-2 rounded-xl border-indigo-500 outline-none p-1 pl-2"/>
                    <button className="px-3 py-2 font-medium text-white bg-indigo-600 rounded-xl cursor-pointer">
                            Add
                    </button>
                </div>
            </div>

            <div className="max-w-sm bg-white shadow-lg rounded-lg p-6 border-l-4 border-indigo-600">
                <h3 className="text-xl font-semibold text-gray-900">Added Tasks</h3>
                <p className="text-gray-600 mt-2">Finalize the dashboard and improve responsiveness.</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">Due: March 15, 2025</span>
                    <span className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded-full">
                        In Progress
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
