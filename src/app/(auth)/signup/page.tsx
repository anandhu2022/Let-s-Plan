"use client"

import {useForm} from "react-hook-form";
import {UserInput} from "@/app/libs/types";
import Link from "next/link";
import {useState} from "react";

const Login = () => {
    const [message, setMessage] = useState<string>("");
    const {register, handleSubmit, formState} = useForm<UserInput>({
        defaultValues: {
            email: '',
            password: ''
        },
    });
    const {errors} = formState;
    const onSubmit = async ({email, password}: UserInput) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        setMessage("User created successfully!");
        
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col gap-5 items-center">

            <div className="text-2xl text-w">Sign up</div>

            <div className="w-full">
                <input
                    id="email"
                    type="text"
                    className="p-2 w-full rounded-xl bg-white"
                    placeholder="Username"
                    autoComplete="email"
                    {...register('email', {
                        required: "Username is required"
                    })}
                />

                {errors.email?.message &&
                    <div className="text-purple-950">{errors.email.message}</div>}
            </div>

            <div className="w-full">
                <input
                    id="password"
                    type="password"
                    className="p-2 w-full rounded-xl bg-white"
                    placeholder="Password"
                    autoComplete="current-password"
                    {...register('password', {
                        required: "Password is required",
                    })}
                />

                {errors.password?.message &&
                    <div className="text-purple-950">{errors.password.message}</div>}
            </div>

            <button className="p-2 w-full rounded-xl bg-white hover:bg-indigo-100 transform duration-500 ease-out
            cursor-pointer">
                Sign up
            </button>
            <div>
                Already have an account? <Link href={'/signin'} className="text-purple-950 hover:underline">Sign in
                here</Link>
            </div>
            {message}
        </form>
    );
};

export default Login;
