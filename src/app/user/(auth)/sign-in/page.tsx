"use client"

import {useForm} from "react-hook-form";
import {UserInput} from "@/app/libs/types";
import useAuth from "@/app/context/Auth/useAuth";
import {useState} from "react";
import useTheme from "@/app/context/Theme/useTheme";
import EyeIcon from "next/dist/client/components/react-dev-overlay/ui/icons/eye-icon";

const Login = () => {
    const {login} = useAuth();
    const {darkMode} = useTheme();
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loginStatus, setLoginStatus] = useState<{ success: boolean, message: string } | null>(null);
    const {register, handleSubmit, formState} = useForm<UserInput>({
        defaultValues: {
            email: '',
            password: ''
        },
    });
    const {errors, isSubmitting} = formState;
    const onSubmit = async ({email, password}: UserInput) => {

        const response = await login({email, password});
        setLoginStatus(response);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-5 items-center
        ${darkMode ? "text-white" : "text-black"}`}>
            <div className="text-2xl text-w">Sign in</div>

            <div className="w-full">
                <input
                    id="email"
                    type="text"
                    className={`w-full p-3 bg-transparent border ${darkMode ? "border-white/40 " +
                        "focus:border-white placeholder-white/40" : "border-black/40 focus:border-black " +
                        "placeholder-black/40"} rounded-sm focus:outline-none`}
                    placeholder="Email"
                    autoComplete="email"
                    {...register('email', {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })}
                />

                {errors.email?.message &&
                    <div className="text-red-500">{errors.email.message}</div>}
            </div>

            <div className="w-full">
                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={`w-full p-3 pr-9 bg-transparent border ${darkMode ? "border-white/40 " +
                            "focus:border-white placeholder-white/40" : "border-black/40 focus:border-black " +
                            "placeholder-black/40"} rounded-sm focus:outline-none`}
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register('password', {
                            required: "Password is required",
                        })}
                    />
                    <span
                        className={`absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer ${darkMode ?
                            "hover:bg-white/30" : "hover:bg-black/30"} p-2 rounded-xl transition duration-500 ease-out`}
                        onClick={() => setShowPassword(!showPassword)}>
                        <EyeIcon/>
                    </span>
                </div>
                {errors.password?.message &&
                    <div className="text-red-500">{errors.password.message}</div>}
            </div>

            <button className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition
                            hover:text-white transition duration-500 ease-out">
                {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
            {!loginStatus?.success && (
                <div className="text-red-600">{loginStatus?.message}</div>
            )}
        </form>
    );
};

export default Login;
