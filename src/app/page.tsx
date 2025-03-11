"use client";

import Card from "@/app/components/Card";

const Page = () => {
    const scrollToView = () => {
        document.getElementById("second-section")?.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
            {/* First Section */}
            <div className="bg-cover bg-center h-screen w-full bg-[url('/banner.png')] snap-start">
                <Card scrollToView={scrollToView}/>
            </div>

            {/* Second Section */}
            <div id="second-section"
                 className="bg-cover bg-center h-screen w-full bg-[url('/banner2.png')] snap-start flex items-center justify-center relative">
                {/* Transparent Form */}
                <div className="flex items-center justify-center w-1/3">
                    <div
                        className="backdrop-blur-md bg-white/10 border border-white/30 shadow-2xl rounded-xl p-8 w-[90%] max-w-md text-white">
                        <h2 className="text-2xl font-semibold mb-4 text-white/90">Add New Task</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-white/80">Task Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 mt-1 bg-transparent border border-white/40 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white"
                                    placeholder="Enter task name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-white/80">Description</label>
                                <textarea
                                    className="w-full p-2 mt-1 bg-transparent border border-white/40 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white"
                                    placeholder="Enter task details"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition"
                            >
                                Add Task
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Page;
