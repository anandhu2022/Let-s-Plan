import {Metadata} from "next";
import {ReactNode} from "react";
import Header from "@/app/components/Header";
import './globals.css';
import AuthProvider from "@/app/context/Auth/AuthContext";
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
        <body className="bg-cover">
        <AuthProvider>
            <ThemeProvider>
                <TaskProvider>
                        {children}
                </TaskProvider>
            </ThemeProvider>
        </AuthProvider>
        </body>
        </html>

    );
};

export default layout;
