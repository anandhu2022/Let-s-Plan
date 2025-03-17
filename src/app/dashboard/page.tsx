"use client";

import useAuth from "@/app/context/Auth/useAuth";

const Dashboard = () => {
    const {logout} = useAuth();
    return (
        <div className="flex h-screen bg-gray-100 pt-20 w-full">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-red-500">Task Manager</h2>
                <nav className="mt-6 space-y-4">
                    <a href="#"
                       className="block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                       hover:text-white transition">
                        Dashboard
                    </a>
                    <a href="#"
                       className="block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                       hover:text-white transition">
                        Tasks
                    </a>
                    <a href="#"
                       className="block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                       hover:text-white transition">
                        Reports
                    </a>
                    <a href="#"
                       className="block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                       hover:text-white transition">
                        Settings
                    </a>
                    <button
                        onClick={logout}
                        className="w-full block py-2 px-4 rounded-lg text-gray-900 font-medium hover:bg-red-500
                        hover:text-white transition text-left">
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-6 mt-6">
                    <div className="p-6 bg-white shadow-lg rounded-xl border-t-4 border-red-500">
                        <h2 className="text-xl font-semibold text-gray-900">Total Tasks</h2>
                        <p className="text-3xl font-bold text-gray-800 mt-2">24</p>
                    </div>

                    <div className="p-6 bg-white shadow-lg rounded-xl border-t-4 border-indigo-600">
                        <h2 className="text-xl font-semibold text-gray-900">Completed</h2>
                        <p className="text-3xl font-bold text-gray-800 mt-2">15</p>
                    </div>

                    <div className="p-6 bg-white shadow-lg rounded-xl border-t-4 border-black">
                        <h2 className="text-xl font-semibold text-gray-900">Pending</h2>
                        <p className="text-3xl font-bold text-gray-800 mt-2">9</p>
                    </div>
                </div>

                {/* Task List */}
                <div className="mt-8 bg-white p-6 shadow-lg rounded-xl">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Tasks</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">Fix UI Bugs</h3>
                                <p className="text-gray-600 text-sm">Update layout issues on mobile screens.</p>
                            </div>
                            <span className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full">
                                In Progress
                            </span>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">Deploy Backend</h3>
                                <p className="text-gray-600 text-sm">Finalize API endpoints and security.</p>
                            </div>
                            <span className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
                                Completed
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
