"use client";

import Card from "@/app/components/Card";
import AddTask from "@/app/components/AddTask";
import ViewTasks from "@/app/components/ViewTasks";
import TaskProvider from "@/app/context/Task/TaskContext";
import Clock from "@/app/components/Clock";

const Page = () => {
    const addNewTask = () => {
        document.getElementById("add-new-section")?.scrollIntoView({behavior: "smooth"});
    };
    const viewTasks = () => {
        document.getElementById("view-task-section")?.scrollIntoView({behavior: "smooth"});
    }
    return (
        <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
            <TaskProvider>
                <div
                    id="home-section"
                    className="bg-cover bg-center h-screen w-full bg-[url('/banner.png')] snap-start relative">
                    <Card addNewTask={addNewTask} viewTasks={viewTasks}/>
                </div>

                <div id="add-new-section"
                     className="bg-cover bg-center h-screen w-full bg-[url('/banner3.png')] snap-start flex
                     items-center justify-center relative">
                    <AddTask/>
                </div>

                <div id="view-task-section"
                     className="bg-cover bg-center h-screen w-full bg-[url('/ListingBanner.png')] snap-start">
                    <ViewTasks/>
                </div>
            </TaskProvider>
            <Clock/>
        </div>

    );
};

export default Page;
