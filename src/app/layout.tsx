import {Metadata} from "next";
import {ReactNode} from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import './globals.css';

export const metadata: Metadata = {
    title: "Let's Plan",
    description: "A simple lets-plan application with user login support"
}

const layout = ({children}: { children: ReactNode }) => {
    return (
        <html>
        <body className="flex flex-col h-screen item">
        <div className="min-h-[7%] bg-indigo-300 flex items-center px-6">
            <Header/>
        </div>
        <div className="flex flex-1 p-7 bg-indigo-100">
            {children}
        </div>
        <div className="min-h-[7%] bg-indigo-300 flex items-center px-6">
            <Footer/>
        </div>
        </body>
        </html>
    );
};

export default layout;
