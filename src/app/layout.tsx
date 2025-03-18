import {Metadata} from "next";
import {ReactNode} from "react";
import Header from "@/app/components/Header";
import './globals.css';
import AuthProvider from "@/app/context/Auth/AuthContext";
import Sidebar from "@/app/components/Sidebar";
import TaskProvider from "@/app/context/Task/TaskContext";
import ThemeProvider from "@/app/context/Theme/ThemeContext";

export const metadata: Metadata = {
    title: "Let's Plan",
    description: "A simple lets-plan application with user login support",
    icons: {
        icon: "/LetsPlanIcon.svg"
    }
}

const layout = ({children}: { children: ReactNode }) => {
    return (
        <html>
        <body className="flex flex-col h-screen w-screen bg-cover">
        <AuthProvider>
            <ThemeProvider>
                <TaskProvider>
                    <div className="flex items-center px-3 sm:px-6 w-full backdrop-blur-md shadow-lg sm:min-h-[15%]
                    lg:min-h-[10%] z-10">
                        <Header/>
                    </div>
                    <div className="flex bg-cover p-3 h-[90%] flex-row">
                        <Sidebar/>
                        <main className="sm:px-8 w-full">
                            {children}
                        </main>
                    </div>
                </TaskProvider>
            </ThemeProvider>
        </AuthProvider>
        </body>
        </html>

    );
};

export default layout;
