import {ReactNode} from "react";
import ThemeProvider from "@/app/context/Theme/ThemeContext";
import {Metadata} from "next";
import "./globals.css";
import AuthProvider from "@/app/context/Auth/AuthContext";
import HtmlWrapper from "./components/HtmlWrapper";

export const metadata: Metadata = {
    title: "Let's Plan",
    description: "A simple lets-plan application with user login support",
    icons: {
        icon: "/LetsPlanIcon.svg"
    }
}
const Layout = ({children}: { children: ReactNode }) => {
    return (
        <ThemeProvider>
            <HtmlWrapper>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </HtmlWrapper>
        </ThemeProvider>

    );
};

export default Layout;
