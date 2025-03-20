"use client"

import {useForm} from "react-hook-form";
import {UserInput} from "@/app/libs/types";
import Link from "next/link";
import {useState} from "react";
import {Button, TextField} from "@mui/material";

const SignUp = () => {
    const [successModal, setSuccessModal] = useState<boolean>(false);
    const {register, handleSubmit, formState} = useForm<UserInput>({
        defaultValues: {
            email: '',
            password: ''
        },
    });
    const {errors, isSubmitting} = formState;
    const onSubmit = async ({email, password, username}: UserInput) => {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, username})
        });
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        setSuccessModal(true);

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center">

            <div className="text-2xl text-w">Sign up</div>

            <div className="w-full">

                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    className="p-2 w-full rounded-xl"
                    error={!!errors.email}
                    helperText={errors.email?.message || ""}
                    {...register('email', {
                        required: "Email is required"
                    })}
                />

            </div>

            <div className="w-full">
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    autoComplete="username"
                    className="p-2 w-full rounded-xl"
                    error={!!errors.username}
                    helperText={errors.username?.message || ""}
                    {...register('username', {
                        required: "Username is required"
                    })}
                />
            </div>

            <div className="w-full">
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    className="p-2 w-full rounded-xl"
                    type="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password?.message || ""}
                    {...register('password', {
                        required: "Password is required",
                    })}
                />
            </div>

            <div className="w-full">
                <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    variant="outlined"
                    className="p-2 w-full rounded-xl"
                    type="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password?.message || ""}
                    {...register('password', {
                        required: "Password is required",
                    })}
                />
            </div>

            <Button
                type="submit"
                className="p-2 w-full rounded-xl min-h-13"
                variant={"outlined"}
                color={"info"}
            >
                {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
            <div>
                Already have an account? <Link href={'/sign-in'} className="text-purple-950 hover:underline">Sign
                in </Link>
            </div>
            {successModal &&
                <div
                    className="absolute top-0 left-0 w-screen h-screen bg-gray-500 overflow-hidden flex justify-center items-center z-2">
                    <div className="bg-white h-1/3 w-1/3 rounded-2xl flex items-center justify-center p-4">
                        User Creation Successful,&nbsp;<Link href={"/sign-in"}
                                                             className="text-indigo-600 cursor-pointer">Click here to
                        login</Link>
                    </div>
                </div>
            }
        </form>
    );
};

export default SignUp;
