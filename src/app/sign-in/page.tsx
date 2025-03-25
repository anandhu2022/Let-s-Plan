"use client"

import Container from "@/app/components/Container";
import {DarkMode, LightMode, Visibility} from "@mui/icons-material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useTheme from "@/app/context/Theme/useTheme";
import Input from "@/app/components/form/Input";
import Button from "@/app/components/form/Button";
import {useForm} from "react-hook-form";
import {useState} from "react";
import useAuth from "@/app/context/Auth/useAuth";
import {UserLoginProps} from "@/app/libs/types";

const Login = () => {
    const {darkMode, toggleTheme} = useTheme();
    const {login} = useAuth()
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginStatus, setLoginStatus] = useState<{ success: boolean, message: string } | null>(null);
    const {register, handleSubmit, formState} = useForm<UserLoginProps>({
        defaultValues: {
            email: '',
            password: ''
        },
    });
    const {errors, isSubmitting} = formState;
    const emailValidation = {
        required: "This field is required",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
        },
    };

    const passwordValidation = {
        required: "Password is required",
        minLength: {
            value: 5,
            message: "Password must be at least 5 characters",
        },
    };

    const onSubmit = async ({email, password}: UserLoginProps) => {
        const response: { success: boolean, message: string } = await login({email, password});
        console.log(response);
        setLoginStatus(response);
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">

            <div className={`fixed right-7 top-7 p-2.5 rounded-full flex transition duration-300 
            ease-out cursor-pointer ${darkMode ? "text-gray-600 hover:text-gray-400 hover:bg-gray-700" :
                "text-gray-400 hover:text-gray-700 hover:bg-gray-300"}`}
                 onClick={toggleTheme}>
                {darkMode ? <DarkMode fontSize={"small"}/> : <LightMode fontSize={"small"}/>}
            </div>

            <Container classNames={"rounded-md"}>
                <div className="flex flex-col gap-4 sm:w-80 md:w-100 lg:w-130 my-3">
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
                        <h1 className="text-xl font-semibold">Login </h1>
                    </div>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <Input
                                id={"email"}
                                type={"text"}
                                placeholder={"Email"}
                                autocomplete={"email"}
                                {...register("email", emailValidation)}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <div className="flex flex-col relative">
                                <Input
                                    id={"password"}
                                    type={showPassword ? "test" : "password"}
                                    placeholder={"Password"}
                                    autocomplete={"current-password"}
                                    {...register("password", passwordValidation)}
                                />
                                <div className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                                     onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffIcon/> : <Visibility/>}
                                </div>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <div className="pt-4">
                            <Button label={isSubmitting ? "Signing in . . ." : "Sign in"}/>
                        </div>
                        {!loginStatus?.success && (
                            <div className="text-red-500 text-center">{loginStatus?.message}</div>
                        )}
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Login;
