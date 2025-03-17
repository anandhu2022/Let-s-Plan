import {Metadata} from "next";
import {ReactNode} from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import './globals.css';
import AuthProvider from "@/app/context/Auth/AuthContext";

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
        <body className="flex flex-col h-screen">
        <AuthProvider>
            <div
                className="flex items-center px-6 w-full bg-white/10 backdrop-blur-md shadow-lg fixed top-0 z-50">
                <Header/>
            </div>
            <div className="flex flex-1 bg-indigo-100">{children}</div>
            {/*<div className="min-h-[7%] flex items-center px-6 absolute bottom-0 w-full bg-white/10 backdrop-blur-md shadow-lg fixed">*/}
            {/*    <Footer/>*/}
            {/*</div>*/}
        </AuthProvider>
        </body>
        </html>

    );
};

export default layout;
