import {ReactNode} from "react";
import Sidebar from "@/app/components/Sidebar";
import BackgroundImage from "@/app/components/backgroundImage";
import Header from "@/app/components/Header";
import AuthProvider from "@/app/context/Auth/AuthContext";
import TaskProvider from "@/app/context/Task/TaskContext";

const layout = ({children}: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <TaskProvider>
                <div className="flex flex-col h-screen w-screen relative">
                    <BackgroundImage/>
                    <div className="flex items-center min-h-[10%] px-3 sm:px-6 w-full backdrop-blur-md shadow-lg z-10">
                        <Header/>
                    </div>
                    <div className="flex flex-row p-3 min-h-[90%]">
                        <Sidebar/>
                        <main className="flex sm:px-8 w-full">
                            <div className="w-full h-full rounded-2xl">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </TaskProvider>
        </AuthProvider>
    );
};

export default layout;
