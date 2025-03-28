"use client";

import React, {useEffect, useState} from 'react';
import useTheme from "@/app/context/Theme/useTheme";
import {RolesAndPermissionsProps, UserByRoleProps} from "@/app/libs/types";
import {Close, Delete, Edit, People} from "@mui/icons-material";
import ModalContainer from "@/app/components/ModalContainer";
import {getUsersByRole} from "@/app/actions/account";

const RolesListing = ({roles}: { roles: RolesAndPermissionsProps[] }) => {
    const {darkMode} = useTheme();
    const [assignedMembers, setAssignedMembers] = useState<{
        status?: boolean,
        roleId?: number,
        users?: UserByRoleProps[]
    } | null>(null);
    const getUsers = async () => {
        if (assignedMembers?.roleId) {
            const response = await getUsersByRole({roleId: assignedMembers.roleId});
            setAssignedMembers({status: true, users: response})
        }
    }
    useEffect(() => {
        if (assignedMembers?.status) {
            getUsers().then();
        }
    }, [assignedMembers?.roleId])
    return (
        <>
            {roles.length > 0 && (
                roles.map((role) => (
                    <div
                        key={role.id}
                        className={`flex flex-col justify-between p-4 rounded-lg shadow-md min-h-30 transition 
                        ${darkMode ? "bg-[#0f172a] text-white" : "bg-white"} flex-1 min-w-1/5
                        hover:scale-105 duration-300 ease-out`}>
                        <div className={`flex flex-row items-center justify-between`}>
                            <span className="text-lg font-semibold">
                                {role.name}
                            </span>
                            <People fontSize={'small'} className={`text-gray-500`}/>
                        </div>
                        <div className={`flex flex-row items-center justify-between`}>
                            <span className={`text-sm text-blue-500 cursor-pointer hover:underline`}
                                  onClick={() => setAssignedMembers({status: true, roleId: role.id})}>
                                View Assigned Members
                            </span>
                            <div className={`flex flex-row gap-1.5`}>
                                <Edit fontSize={'small'}
                                      className={`text-gray-500 cursor-pointer transform hover:scale-110`}/>
                                <Delete fontSize={'small'}
                                        className={`text-red-500 cursor-pointer transform hover:scale-110`}/>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {(assignedMembers?.status) && (
                <ModalContainer containerWidth={`min-w-1/4`}>
                    <>
                        <div>
                            <div className={`flex flex-row justify-between items-center`}>
                                <span className={`text-lg`}>
                                    Members
                                </span>
                                <Close
                                    onClick={() => setAssignedMembers({status: false})}
                                    className={`cursor-pointer`}
                                />
                            </div>
                            <div>
                                {
                                    assignedMembers?.users &&
                                    assignedMembers?.users?.length > 0 &&
                                    assignedMembers?.users.map((user) => (
                                        <div key={user.id} className={`flex flex-row items-center p-2`}>
                                            <span className={`text-sm`}>
                                                {user.username}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                </ModalContainer>
            )}
        </>
    );
};

export default RolesListing;