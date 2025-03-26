"use client";

import React, {useEffect, useState} from 'react';
import Container from "@/app/components/Container";
import useTheme from "@/app/context/Theme/useTheme";
import {ProjectProps} from "@/app/libs/types";

const Page = () => {
    const {darkMode} = useTheme();
    const [projectList, setProjectList] = useState<ProjectProps[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchProjects = async () => {
            const startTime = Date.now();
            try {
                const response = await fetch('/api/projects/getProjects');
                const {success, message, projects}: {
                    success: boolean,
                    message: string,
                    projects: ProjectProps[]
                } = await response.json();
                if (success) {
                    setProjectList(projects);
                } else {
                    console.error(message);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(1000 - elapsedTime, 0);

                setTimeout(() => {
                    setLoading(false);
                }, remainingTime);
            }
        }
        fetchProjects()
            .then();
    }, []);
    console.log(projectList);
    return (
        <div className={`flex flex-col gap-3 h-full`}>
            <span className={`text-[#64747a] pb-4 text-2xl font-bold`}>Project List</span>
            <Container className={`rounded-md h-full`}>
                <table className="w-full border-collapse rounded-lg overflow-hidden">
                    <thead className={darkMode ? "text-[#64747a] bg-[#0f172a]" : "text-[#4e5c59] bg-[#f0f4f8]"}>
                    <tr className={`text-left`}>
                        <th className="p-3">Project Name</th>
                        <th className="p-3">Tickets</th>
                        <th className="p-3">Teams</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Priority</th>
                        <th className="p-3">Due Date</th>
                    </tr>
                    </thead>
                    <tbody className={darkMode ? "text-[#64747a]" : "text-[#4e5c59]"}>
                    {loading ? (
                        Array.from({length: 10}).map((_, index) => (
                            <tr key={index} className="h-full">
                                <td className={`skeleton h-11 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></td>
                                <td className={`skeleton h-11 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></td>
                                <td className={`skeleton h-11 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></td>
                                <td className={`skeleton h-11 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></td>
                                <td className={`skeleton h-11 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></td>
                                <td className={`skeleton h-11 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></td>
                            </tr>
                        ))
                    ) : (
                        projectList.length === 0 ? (
                            <tr>
                                <td colSpan={6} className={`text-center text-[#64747a] py-6`}>No projects found.</td>
                            </tr>
                        ) : (
                            projectList.map((project) => (
                                <tr key={project.id}>
                                    <td className="p-3">{project.title}</td>
                                    <td className="p-3">Todo</td>
                                    <td className="p-3">Todo</td>
                                    <td className="p-3">{project.status}</td>
                                    <td className="p-3">{project.priority}</td>
                                    <td className="p-3">{project.actualEndDate}</td>
                                </tr>
                            ))
                        )
                    )}
                    </tbody>
                </table>
            </Container>
        </div>
    );
};

export default Page;