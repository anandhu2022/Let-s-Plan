"use client";

import Container from "@/app/components/Container";
import Input from "@/app/components/form/Input";
import useTheme from "@/app/context/Theme/useTheme";
import Button from "@/app/components/form/Button";
import Members from "@/app/(dashboard)/project/create/components/Members";
import Client from "@/app/(dashboard)/project/create/components/Client";

const Page = () => {
    const {darkMode} = useTheme();

    return (
        <div className={`flex flex-col p-4 w-full`}>
            <span className={`text-[#64747a] pb-4 text-2xl font-semibold`}>Create new project</span>
            <div className={`flex flex-row gap-3`}>
                <div className={`flex flex-col gap-3 w-2/3`}>
                    <Container classNames={`rounded-md flex flex-col gap-3 w-full`}>
                        <div className={`flex flex-col gap-1.5`}>
                            <span>Name:</span>
                            <Input
                                id={"project-name"}
                                type={"text"}
                                placeholder={"Enter Project Title"}
                                autocomplete={""}
                            />
                        </div>
                        <div className={`flex flex-col gap-1.5`}>
                            <span>Description:</span>
                            <textarea
                                className={`p-1.5 px-3 rounded-md placeholder:font-normal outline-none focus:ring-4
            transition duration-300 ease-out ${darkMode ? "placeholder:text-[#64747a] bg-[#0f172a] " +
                                    "focus:ring-indigo-900" : "placeholder:text-[#4e5c59] bg-white border-1 " +
                                    "border-gray-300 focus:ring-violet-200"}`}
                                id={"project-description"}
                                rows={3}
                                placeholder={"Enter Project Description"}
                            />
                        </div>
                        <div className={`flex flex-col gap-1.5`}>
                            <span>Name:</span>
                            <Input
                                id={"project-name"}
                                type={"text"}
                                placeholder={"Enter Project Title"}
                                autocomplete={""}
                            />
                        </div>
                        <div className={`flex w-full gap-3`}>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Planned start date</span>
                                <Input
                                    id={'planned-start-date'}
                                    type={'date'}
                                    placeholder={"fb"}
                                    autocomplete={""}
                                />
                            </div>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Planned end date</span>
                                <Input
                                    id={'planned-start-date'}
                                    type={'date'}
                                    placeholder={"fb"}
                                    autocomplete={""}
                                />
                            </div>
                        </div>
                        <div className={`flex w-full gap-3`}>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Actual start date</span>
                                <Input
                                    id={'planned-start-date'}
                                    type={'date'}
                                    placeholder={"fb"}
                                    autocomplete={""}
                                />
                            </div>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Actual end date</span>
                                <Input
                                    id={'planned-start-date'}
                                    type={'date'}
                                    placeholder={"fb"}
                                    autocomplete={""}
                                />
                            </div>
                        </div>
                        <div className={`flex w-full gap-3`}>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Priority</span>
                                <select
                                    className={`p-1.5 px-3 rounded-md placeholder:font-normal outline-none focus:ring-4 w-full
            transition duration-300 ease-out
            ${darkMode ? "placeholder:text-[#64747a] bg-[#0f172a] focus:ring-indigo-900" :
                                        "placeholder:text-[#4e5c59] bg-white border-1 border-gray-300 focus:ring-violet-200"}`}>
                                    <option value="">Select Priority</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                            <div className={`w-full flex flex-col gap-1.5`}>
                                <span>Status</span>
                                <select
                                    className={`p-1.5 px-3 rounded-md placeholder:font-normal outline-none focus:ring-4 w-full
            transition duration-300 ease-out
            ${darkMode ? "placeholder:text-[#64747a] bg-[#0f172a] focus:ring-indigo-900" :
                                        "placeholder:text-[#4e5c59] bg-white border-1 border-gray-300 focus:ring-violet-200"}`}>
                                    <option value="">Select status</option>
                                    <option value="high">Pending</option>
                                    <option value="medium">Progress</option>
                                    <option value="low">Completed</option>
                                    <option value="low">Blocked</option>
                                    <option value="low">On Hold</option>
                                    <option value="low">On Hold</option>
                                </select>
                            </div>
                        </div>
                        <Button label={"Create"}/>
                    </Container>
                    <Container classNames={'rounded-md'}>
                        <span className={`text-xl`}>Attach files . . . Todo</span>
                    </Container>
                </div>
                <div className={`flex flex-col gap-3 w-1/3`}>
                    <Members/>
                    <Client/>
                </div>
            </div>
        </div>
    );
};

export default Page;