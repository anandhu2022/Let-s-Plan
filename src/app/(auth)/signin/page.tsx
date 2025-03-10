"use client"

import {useForm} from "react-hook-form";
import {UserInput} from "@/app/libs/types";
import Link from "next/link";

const Login = () => {
    const {register, handleSubmit, formState} = useForm<UserInput>({
        defaultValues: {
            email: '',
            password: ''
        },
    });
    const {errors} = formState;
    const onSubmit = (data: UserInput) => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col gap-5 items-center">

            <div className="text-2xl text-w">Sign in</div>

            <div className="w-full">
                <input
                    id="email"
                    type="text"
                    className="p-2 w-full rounded-xl bg-white outline-none focus:ring-2 focus:ring-indigo-400 transition duration-500 ease-out"
                    placeholder="Username"
                    autoComplete="email"
                    {...register('email', {
                        required: "Username is required"
                    })}
                />

                {errors.email?.message &&
                    <div className="text-red-500">{errors.email.message}</div>}
            </div>

            <div className="w-full">
                <input
                    id="password"
                    type="password"
                    className="p-2 w-full rounded-xl bg-white outline-none focus:ring-2 focus:ring-indigo-400 transition duration-500 ease-out"
                    placeholder="Password"
                    autoComplete="current-password"
                    {...register('password', {
                        required: "Password is required",
                    })}
                />

                {errors.password?.message &&
                    <div className="text-red-500">{errors.password.message}</div>}
            </div>

            <button className="p-2 w-full rounded-xl bg-white hover:bg-indigo-100 transform duration-500 ease-out
            cursor-pointer">
                Sign In
            </button>
            <div>
                Don't have an account, <Link href={'/signup'} className="text-purple-950 hover:underline">Sign Up</Link>
            </div>
        </form>
    );
};

export default Login;
