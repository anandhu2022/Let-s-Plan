"use client";

import {DarkMode, LightMode, Visibility} from "@mui/icons-material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useTheme from "@/app/context/Theme/useTheme";
import Container from "@/app/components/Container";
import Button from "@/app/components/form/Button";
import {UserSignupProps} from "@/app/libs/types";
import Input from "@/app/components/form/Input";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {useState} from "react";
import Modal from "@/app/components/Modal";

const Signup = () => {
    const {darkMode, toggleTheme} = useTheme();
    const router = useRouter();
    const [modal, setModal] = useState<{ status: boolean; message: string; success?: boolean }>({
        status: false,
        message: "",
        success: false,
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const {register, handleSubmit, formState, watch, reset} = useForm<UserSignupProps>();


    const {errors, isSubmitting} = formState;


    const emailValidation = {
        required: "Email is required",
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

    const onSubmit = async (data: UserSignupProps) => {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const {success, message}: { success: boolean, message: string } = await response.json();
        if (success) {
            reset();
        }
        setModal({status: true, message: message, success: success});
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div
                className={`fixed right-7 top-7 p-2.5 rounded-full flex transition duration-300 
        ease-out cursor-pointer ${darkMode ? "text-gray-600 hover:text-gray-400 hover:bg-gray-700" :
                    "text-gray-400 hover:text-gray-700 hover:bg-gray-300"}`}
                onClick={toggleTheme}
            >
                {darkMode ? <DarkMode fontSize={"small"}/> : <LightMode fontSize={"small"}/>}
            </div>

            <Container className="rounded-md h-[80%] overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col gap-4 sm:w-80 md:w-100 lg:w-130 my-3">
                    <div className="flex flex-row items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="55" height="55">
                            <circle cx="25" cy="25" r="20" fill={darkMode ? "#ffffff" : "#624bff"}/>
                            <rect x="15" y="20" width="20" height="15" fill={darkMode ? "#624bff" : "#ffffff"} rx="2"/>
                            <rect x="18" y="17" width="4" height="4" fill={darkMode ? "#624bff" : "#ffffff"}/>
                            <rect x="28" y="17" width="4" height="4" fill={darkMode ? "#624bff" : "#ffffff"}/>
                        </svg>
                        <h1 className="text-xl font-semibold">Sign Up</h1>
                    </div>

                    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="first_name">First Name</label>
                            <Input
                                id="first_name"
                                type="text"
                                placeholder="First Name"
                                autoComplete="name"
                                {...register("first_name", {
                                    required: "First Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name must be at least 3 characters",
                                    },
                                })}
                            />
                            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="last_name">Last Name</label>
                            <Input
                                id="last_name"
                                type="text"
                                placeholder="Last Name"
                                autoComplete="name"
                                {...register("last_name")}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="username">Username</label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Username"
                                autoComplete="username"
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 3,
                                        message: "Username must be at least 3 characters",
                                    },
                                })}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="Email"
                                autoComplete="email"
                                {...register("email", emailValidation)}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="mobile">Mobile Number</label>
                            <Input
                                id="mobile"
                                type="text"
                                placeholder="Mobile Number"
                                defaultValue="+91"
                                {...register("mobile", {
                                    required: "Mobile number is required",
                                    pattern: {
                                        value: /^\+\d{1,3}\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                                        message: "Invalid mobile number format",
                                    }
                                })}
                            />
                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <div className="flex flex-col relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    autoComplete="new-password"
                                    {...register("password", passwordValidation)}
                                />
                                <div
                                    className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <VisibilityOffIcon/> : <Visibility/>}
                                </div>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="flex flex-col relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    autoComplete="new-password"
                                    {...register("confirmPassword", {
                                        required: "Confirm password is required",
                                        validate: (value: string) =>
                                            value === watch("password") || "Passwords do not match",
                                    })}
                                />
                                <div
                                    className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <VisibilityOffIcon/> : <Visibility/>}
                                </div>
                            </div>
                            {errors.confirmPassword &&
                                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                        </div>


                        <div className="pt-4">
                            <Button label={isSubmitting ? "Signing up . . ." : "Sign up"}/>
                        </div>

                        {/*<div className={`${signupStatus?.success ? "text-green-500" : "text-red-500"} text-center`}>*/}
                        {/*    {signupStatus?.message}*/}
                        {/*</div>*/}
                    </form>

                    {/* Login Link */}
                    <div className="text-center text-sm mt-4">
                        <span
                            className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Already have an account? &nbsp;
                        </span>
                        <button
                            className="text-[#624bff] hover:underline cursor-pointer"
                            onClick={() => router.push("/sign-in")}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </Container>
            <Modal
                isOpen={modal.status}
                message={modal.message}
                success={modal.success}
                onClose={() => {
                    setModal({...modal, status: false})
                    if (modal.success) router.push("/sign-in");
                }}
            />
        </div>
    );
};

export default Signup;
