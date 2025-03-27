"use client";

import React, {useEffect, useState} from "react";
import Container from "@/app/components/Container";
import useTheme from "@/app/context/Theme/useTheme";
import {getUsers} from "@/app/actions/account";

const UserListPage = () => {
        const {darkMode} = useTheme();
        const [userList, setUserList] = useState<{
            id: number,
            email: string,
            accountStatus: string,
            roleId: number | null,
            username: string
        }[]>([]);
        const [loading, setLoading] = useState<boolean>(true);

        useEffect(() => {
                const fetchUsers = async () => {
                    const startTime = Date.now();
                    try {
                        const users: {
                            id: number,
                            email: string,
                            accountStatus: string,
                            roleId: number | null,
                            username: string
                        }[] = await getUsers();
                        setUserList(users);
                    } catch
                        (error) {
                        console.error("Error:", error);
                    } finally {
                        const elapsedTime = Date.now() - startTime;
                        const remainingTime = Math.max(1000 - elapsedTime, 0);
                        setTimeout(() => setLoading(false), remainingTime);
                    }
                };

                fetchUsers();
            }, []
        )
        ;

        return (
            <div className="flex flex-col gap-3 h-full">
                <span className="text-[#64747a] pb-4 text-2xl font-bold">User List</span>

                <Container className="rounded-md h-full">
                    <table className="w-full border-collapse rounded-lg overflow-hidden">
                        <thead className={darkMode ? "text-[#64747a] bg-[#0f172a]" : "text-[#4e5c59] bg-[#f0f4f8]"}>
                        <tr className="text-left">
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Actions</th>
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
                                </tr>
                            ))
                        ) : userList.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center text-[#64747a] py-6">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            userList.map((user) => (
                                <tr key={user.id}>
                                    <td className="p-3">{user.username}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">Todo</td>
                                    <td className={`p-3 font-semibold ${user.accountStatus === "ACTIVE" ? "text-green-500" : user.accountStatus === "Pending" ? "text-yellow-500" : "text-red-500"}`}>
                                        {user.accountStatus}
                                    </td>
                                    <td className="p-3 text-center flex justify-center gap-2">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition">View
                                        </button>
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition">Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition">Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </Container>
            </div>
        );
    }
;

export default UserListPage;
