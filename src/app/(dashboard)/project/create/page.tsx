"use client";

import Container from "@/app/components/Container";
import Input from "@/app/components/form/Input";
import useTheme from "@/app/context/Theme/useTheme";
import Button from "@/app/components/form/Button";
import Members from "@/app/(dashboard)/project/create/components/Members";
import Client from "@/app/(dashboard)/project/create/components/Client";
import {useForm} from "react-hook-form";
import {ProjectInputProps} from "@/app/libs/types";
import useAuth from "@/app/context/Auth/useAuth";
import {useState} from "react";
import Modal from "@/app/components/Modal";

const Page = () => {
    const {darkMode} = useTheme();
    const {user} = useAuth();
    const {register, handleSubmit, formState} = useForm<ProjectInputProps>();
    const {isSubmitting, errors} = formState;
    const [response, setResponse] = useState<{ success?: boolean, message?: string }>({success: false, message: ""});
    const closeModal = () => {
        setResponse({success: !response.success});
    }
    const onSubmit = async ({
                                title,
                                projectDescription,
                                actualStartDate,
                                plannedStartDate,
                                plannedEndDate,
                                actualEndDate,
                                statusId,
                                priorityId
                            }: ProjectInputProps) => {
        const userId = user?.id;
        if (!userId) {
            throw new Error("User not authenticated");
        }
        const response = await fetch(`/api/projects/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                projectDescription,
                actualStartDate,
                plannedStartDate,
                plannedEndDate,
                actualEndDate,
                statusId: Number(statusId),
                priorityId: Number(priorityId),
                userId
            }),
        });
        const {message, success} = await response.json();
        setResponse({success, message});
    }
    return (
        <div className={`flex flex-col p-4 w-full`}>
            <span className={`text-[#64747a] pb-4 text-2xl font-semibold`}>Create new project</span>
            <div className={`flex flex-row gap-3`}>
                <form className={`flex flex-col gap-3 w-2/3`} onSubmit={handleSubmit(onSubmit)}>
                    <Container classNames={`rounded-md flex flex-col gap-3 w-full`}>
                        <div className={`flex flex-col gap-1.5`}>
                            <span>Name:</span>
                            <Input
                                id={"title"}
                                type={"text"}
                                placeholder={"Enter Project Title"}
                                {...register("title", {required: true})}
                            />
                            {errors.title && <span className={`text-[#ff0000]`}>This field is required</span>}
                        </div>
                        <div className={`flex flex-col gap-1.5`}>
                            <span>Description:</span>
                            <textarea
                                className={`p-1.5 px-3 rounded-md placeholder:font-normal outline-none focus:ring-4
                                    transition duration-300 ease-out ${darkMode ? "placeholder:text-[#64747a] " +
                                    "bg-[#0f172a] focus:ring-indigo-900" : "placeholder:text-[#4e5c59] " +
                                    "bg-white border-1 border-gray-300 focus:ring-violet-200"}`}
                                id={"projectDescription"}
                                rows={3}
                                placeholder={"Enter Project Description"}
                                {...register("projectDescription", {required: true})}
                            />
                            {errors.projectDescription &&
                                <span className={`text-[#ff0000]`}>This field is required</span>}
                        </div>
                        <div className={`flex w-full gap-3`}>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Planned start date</span>
                                <Input
                                    id={'plannedStartDate'}
                                    type={'date'}
                                    placeholder={"fb"}
                                    {...register("plannedStartDate")}
                                />
                                {errors.plannedStartDate &&
                                    <span className={`text-[#ff0000]`}>This field is required</span>}
                            </div>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Planned end date</span>
                                <Input
                                    id={'plannedEndDate'}
                                    type={'date'}
                                    placeholder={"fb"}
                                    {...register("plannedEndDate")}
                                />
                                {errors.plannedEndDate &&
                                    <span className={`text-[#ff0000]`}>This field is required</span>}
                            </div>
                        </div>
                        <div className={`flex w-full gap-3`}>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Actual start date</span>
                                <Input
                                    id={'actualStartDate'}
                                    type={'date'}
                                    placeholder={"fb"}
                                    {...register("actualStartDate")}
                                />
                                {errors.actualStartDate &&
                                    <span className={`text-[#ff0000]`}>This field is required</span>}
                            </div>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Actual end date</span>
                                <Input
                                    id={'actualEndDate'}
                                    type={'date'}
                                    placeholder={"fb"}
                                    {...register("actualEndDate")}
                                />
                                {errors.actualEndDate &&
                                    <span className={`text-[#ff0000]`}>This field is required</span>}
                            </div>
                        </div>
                        <div className={`flex w-full gap-3`}>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Priority</span>
                                <select
                                    id={'priorityId'}
                                    className={`p-1.5 px-3 rounded-md placeholder:font-normal outline-none 
                                        focus:ring-4 w-full transition duration-300 ease-out  ${darkMode ?
                                        "placeholder:text-[#64747a] bg-[#0f172a] focus:ring-indigo-900" :
                                        "placeholder:text-[#4e5c59] bg-white border-1 border-gray-300 " +
                                        "focus:ring-violet-200"}`}
                                    {...register("priorityId", {required: true})}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="3">High</option>
                                    <option value="2">Medium</option>
                                    <option value="1">Low</option>
                                </select>
                                {errors.priorityId && <span className={`text-[#ff0000]`}>This field is required</span>}
                            </div>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Status</span>
                                <select
                                    id={'statusId'}
                                    className={`p-1.5 px-3 rounded-md placeholder:font-normal outline-none 
                                        focus:ring-4 w-full transition duration-300 ease-out ${darkMode ?
                                        "placeholder:text-[#64747a] bg-[#0f172a] focus:ring-indigo-900" :
                                        "placeholder:text-[#4e5c59] bg-white border-1 border-gray-300 " +
                                        "focus:ring-violet-200"}`}
                                    {...register("statusId", {required: true})}
                                >
                                    <option value="">Select status</option>
                                    <option value="5">Pending</option>
                                    <option value="4">Progress</option>
                                    <option value="3">Completed</option>
                                    <option value="2">Blocked</option>
                                    <option value="1">On Hold</option>
                                </select>
                                {errors.statusId && <span className={`text-[#ff0000]`}>This field is required</span>}
                            </div>
                        </div>
                        <Button label={isSubmitting ? "Creating new project . . ." : "Create"}/>
                    </Container>
                    <Container classNames={'rounded-md'}>
                        <span className={`text-xl`}>Attach files . . . Todo</span>
                    </Container>
                </form>
                <div className={`flex flex-col gap-3 w-1/3`}>
                    <Members/>
                    <Client/>
                </div>
            </div>
            <Modal closeModal={closeModal} openModal={response.success}/>
        </div>
    );
};

export default Page;