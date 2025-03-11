"use client"

import {useForm} from "react-hook-form";
import {UserInput} from "@/app/libs/types";
import Link from "next/link";
import {useState} from "react";

const SignUp = () => {
    const [successModal, setSuccessModal] = useState<boolean>(false);
    const {register, handleSubmit, formState} = useForm<UserInput>({
        defaultValues: {
            email: '',
            password: ''
        },
    });
    const {errors, isSubmitting} = formState;
    const onSubmit = async ({email, password}: UserInput) => {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        setSuccessModal(true);

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col gap-5 items-center">

            <div className="text-2xl text-w">Sign up</div>

            <div className="w-full">
                <input
                    id="email"
                    type="text"
                    className="p-2 w-full rounded-xl bg-white"
                    placeholder="Email"
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
                {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
            <div>
                Already have an account? <Link href={'/signin'} className="text-purple-950 hover:underline">Sign
                in </Link>
            </div>
            {successModal &&
                <div
                    className="absolute top-0 left-0 w-screen h-screen bg-gray-500 overflow-hidden opacity-85 flex justify-center items-center">
                    <div className="bg-white h-1/3 w-1/3 opacity-100 rounded-2xl flex items-center justify-center p-4">
                        User Creation Successful,&nbsp;<Link href={"/signin"}
                                                             className="text-indigo-600 cursor-pointer">Click here to
                        login</Link>
                    </div>
                </div>
            }
        </form>
    );
};

export default SignUp;
