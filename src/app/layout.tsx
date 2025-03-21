import {Metadata} from "next";
import {ReactNode} from "react";
import './globals.css';
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
        <html lang="en">
        <body className="bg-cover">
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </body>
        </html>

    );
};

export default layout;
