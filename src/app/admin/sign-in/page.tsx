"use client"

import Container from "@/app/admin/components/Container";
import {DarkMode, LightMode} from "@mui/icons-material";
import useTheme from "@/app/context/Theme/useTheme";
import Input from "@/app/admin/components/form/Input";
import Button from "@/app/admin/components/form/Button";

const Login = () => {
    const {darkMode, toggleTheme} = useTheme();
    return (
        <div className="w-screen h-screen flex justify-center items-center">

            <div className={`fixed right-7 top-7 p-2.5 rounded-full flex transition duration-300 
            ease-out cursor-pointer ${darkMode ? "text-gray-600 hover:text-gray-400 hover:bg-gray-700" :
                "text-gray-400 hover:text-gray-700 hover:bg-gray-300"}`}
                 onClick={toggleTheme}>
                {darkMode ? <DarkMode fontSize={"small"}/> : <LightMode fontSize={"small"}/>}
            </div>

            <Container>
                <div className="flex flex-col gap-4 sm:w-80 md:w-100 lg:w-130">
                    <div className="flex flex-row items-center gap-1">
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="55" height="55">
                                <circle cx="25" cy="25" r="20" fill={darkMode ? "#ffffff" : "#624bff"}/>
                                <rect x="15" y="20" width="20" height="15" fill={darkMode ? "#624bff" : "#ffffff"}
                                      rx="2"/>
                                <rect x="18" y="17" width="4" height="4" fill={darkMode ? "#624bff" : "#ffffff"}/>
                                <rect x="28" y="17" width="4" height="4" fill={darkMode ? "#624bff" : "#ffffff"}/>
                            </svg>
                        </div>
                        <h1 className="text-xl font-semibold">Admin Login</h1>
                    </div>
                    <form className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <Input type={"text"} placeholder={"Email"}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <Input type={"password"} placeholder={"Password"}/>
                        </div>
                        <div className="pt-4">
                            <Button label={"Sign in"}/>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Login;
