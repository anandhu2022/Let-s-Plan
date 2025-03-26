"use client";

import {useEffect, useState} from "react";
import useTheme from "@/app/context/Theme/useTheme";
import Container from "@/app/components/Container";
import {PendingApprovalProps} from "@/app/libs/types";
import Button from "@/app/components/form/Button";
import {changeAccountStatus} from "@/app/actions/account";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const ApproveAccounts = () => {
    const {darkMode} = useTheme();

    const fetchPendingUsers = async () => {
        const response = await fetch("/api/account/pendingApprovals");
        const {success, data}: { success: boolean, data: PendingApprovalProps[] } = await response.json();
        if (success) {
            setPendingUsers(data);
        }
    }

    useEffect(() => {
        fetchPendingUsers()
            .then();
    }, []);

    const [pendingUsers, setPendingUsers] = useState<PendingApprovalProps[] | []>([]);

    const handleApprove = async (id: number) => {
        await changeAccountStatus({id: id, status: "ACTIVE"});
        await fetchPendingUsers();
    };

    const handleReject = async (id: number) => {
        await changeAccountStatus({id: id, status: "REJECTED"});
        await fetchPendingUsers();
    };

    return (
        <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            <h1 className="text-2xl font-semibold mb-4">Pending Account Approvals</h1>

            {pendingUsers.length === 0 ? (
                <p className="text-gray-500">No pending approvals.</p>
            ) : (
                <Container className={"overflow-x-auto rounded-md"}>
                    <table className="w-full border-collapse rounded-lg overflow-hidden">
                        <thead className={darkMode ? "text-[#64747a] bg-[#0f172a]" : "text-[#4e5c59] bg-[#f0f4f8]"}>
                        <tr className={`text-left`}>
                            <th className="p-3">Username</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Mobile</th>
                            <th className="p-3">Registration Date</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pendingUsers.map(user => (
                            <tr
                                key={user.id}
                                className={`border-b ${darkMode ? "border-gray-700" : "border-gray-300"} hover:bg-opacity-50 transition`}
                            >
                                <td className="p-3">{user.username}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.mobile}</td>
                                <td className="p-3">{user.registeredAt}</td>
                                <td className="p-3 flex justify-center gap-2">
                                    <div onClick={() => handleApprove(user.id)}>
                                        <Button label={"Approve"}/>
                                    </div>
                                    <button
                                        onClick={() => handleReject(user.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Container>
            )}
        </div>
    );
};

export default ApproveAccounts;
