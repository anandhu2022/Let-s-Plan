"use client";

import {useForm} from "react-hook-form";
import {Close} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Input from "@/app/components/form/Input";
import React, {useEffect, useState} from "react";
import {PermissionProps} from "@/app/libs/types";
import Button from "@/app/components/form/Button";
import Container from "@/app/components/Container";
import useTheme from "@/app/context/Theme/useTheme";
import SearchIcon from "@mui/icons-material/Search";
import ModalContainer from "@/app/components/ModalContainer";
import {createRoleAndAssignPermissions, getAllPermissions} from "@/app/actions/account";
import Modal from "@/app/components/Modal";


const RolesPage = () => {

    const [modal, setModal] = useState<{ status: boolean; message: string; success?: boolean }>({
        status: false,
        message: "",
        success: false,
    });

    // Get all permissions from the Database and set to a state variable
    const [allPermissions, setAllPermissions] = useState<{ name: string }[]>([]);
    const [formattedPermissions, setFormattedPermissions] = useState<PermissionProps>({});
    const getPermissions = async () => {
        setAllPermissions(await getAllPermissions());
    }

    useEffect(() => {
        getPermissions()
            .then();
    }, []);

    useEffect(() => {
        const formatted = allPermissions.reduce<PermissionProps>((acc, { name }) => {
            const [category, action] = name.split("-");
            if (!category || !action) return acc; // Skip invalid data

            const categoryName = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(); // Make it plural (e.g., "Project" -> "Projects")

            const actionFormatted = action.charAt(0).toUpperCase() + action.slice(1).toLowerCase();

            acc[categoryName] = [...(acc[categoryName] || []), actionFormatted];
            return acc;
        }, {});

        setFormattedPermissions(formatted);
    }, [allPermissions]);

    const {darkMode} = useTheme();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showForm, setShowForm] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState<string>("");
    const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>({});

    const {register, handleSubmit, reset, formState} = useForm({
        defaultValues: {roleName: ""},
    });
    const {errors, isSubmitting} = formState;

    const handlePermissionGroupChange = (permissionGroup: string) => {
        setSelectedPermissions((prev) => {
            const isSelectedAll = prev[permissionGroup]?.length === formattedPermissions[permissionGroup].length;
            const newSelection = {...prev};
            newSelection[permissionGroup] = isSelectedAll ? [] : [...formattedPermissions[permissionGroup]];
            return newSelection;

        });

    };

    const handleMenuClick = (menu: string) => {
        setOpenMenu((prev) => (prev === menu ? "" : menu));
    };

    const handlePermissionChange =
        (permissionGroup: string, permission: string) => {
            setSelectedPermissions((prev) => {
                const newSelection = {...prev};
                const groupPermissions = newSelection[permissionGroup] || [];
                if (groupPermissions.includes(permission)) {
                    // Remove permission if already selected
                    newSelection[permissionGroup] = groupPermissions.filter((p) => p !== permission);
                } else {
                    // Add permission if not selected
                    newSelection[permissionGroup] = [...groupPermissions, permission];
                }
                return newSelection;
            });
        };

    const onSubmit = async ({roleName}: { roleName: string }) => {
        const updatedPermissions = Object.entries(selectedPermissions).flatMap(([key, permissions]) =>
            permissions.map(permission => `${key}-${permission}`.toUpperCase())
        );
        const {success, message} = await createRoleAndAssignPermissions(roleName, updatedPermissions);
        setModal({status: true, success, message})
        if (success) {
            setShowForm(false);
            reset();
            await getPermissions();
        }
    }

    return (
        <div className="flex flex-col gap-6 h-full">
            <span className="text-[#64747a] text-2xl font-bold">Roles Management</span>

            {/* Search Bar */}
            <Container className="rounded-md">
                <div className="flex items-center gap-2">
                    <SearchIcon fontSize="small"/>
                    <Input
                        id={"search"}
                        type="text"
                        placeholder="Search Roles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </Container>

            {/* Roles List Section */}
            <Container className="rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        onClick={() => setShowForm(true)}
                        className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md border-dashed 
                        border-2 cursor-pointer transition ${darkMode ? "border-gray-500 bg-gray-800 text-white" +
                            " hover:border-gray-300" : "border-gray-400 bg-gray-100 hover:border-gray-600"}`}>
                        <AddIcon fontSize="large"/>
                        <span className="mt-2 text-lg font-semibold">
                            Create New Role
                        </span>
                    </div>
                </div>
            </Container>

            {/* Modal for add new role */}
            {showForm && (
                <ModalContainer containerWidth={"min-w-1/3 h-auto"} className={`backdrop-blur-xs`}>
                    <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-3`}>
                        <span className={`text-xl pb-4 flex flex-row justify-between items-center`}>
                            Create New Role
                            <Close className={`cursor-pointer`} onClick={() => setShowForm(false)}/>
                        </span>

                        <div className={`flex flex-col gap-2`}>
                            <label htmlFor="add-new-role">
                                Role Title
                            </label>
                            <Input
                                id={"roleName"}
                                type="text"
                                placeholder="Enter the role title"
                                {...register("roleName", {required: "Role title is required."})}
                            />
                            {errors.roleName && <span className="text-red-500">{errors.roleName.message}</span>}
                        </div>

                        <div className={`flex flex-col gap-2`}>
                            <label htmlFor="permissions">Permissions</label>
                            <div className={`flex gap-2 flex-col`}>
                                {Object.keys(formattedPermissions).map((permissionGroup) => {
                                    const groupPermissions = selectedPermissions[permissionGroup] || [];
                                    const allSelected = groupPermissions.length ===
                                        formattedPermissions[permissionGroup].length;
                                    return (
                                        <div key={permissionGroup}
                                             className={`border p-2 rounded-md flex gap-1.5 flex-col`}>
                                            {/* Parent Checkbox */}
                                            <div className={`flex flex-row items-center gap-1.5`}
                                                 onClick={() => handleMenuClick(permissionGroup)}>
                                                <input
                                                    id={`group-${permissionGroup}`}
                                                    type="checkbox"
                                                    name={permissionGroup}
                                                    value={permissionGroup}
                                                    checked={allSelected}
                                                    onChange={() => handlePermissionGroupChange(permissionGroup)}
                                                    onClick={(event =>
                                                        event.stopPropagation())}
                                                />
                                                {permissionGroup}
                                            </div>

                                            {/* Child Permissions */}
                                            <div className={`flex flex-col gap-1.5 pl-6`}>
                                                {formattedPermissions[permissionGroup].map((permission) => (
                                                    <div key={permission} className={`flex flex-row items-center gap-1.5
                                                transition-all overflow-hidden duration-500 ease-out
                                                 ${openMenu === permissionGroup ? "opacity-100" : "max-h-0 " +
                                                        "opacity-0 hidden"}`}>
                                                        <input
                                                            id={`perm-${permission}`}
                                                            type="checkbox"
                                                            name={permission}
                                                            value={permission}
                                                            checked={groupPermissions.includes(permission)}
                                                            onChange={() =>
                                                                handlePermissionChange(permissionGroup, permission)}
                                                        />
                                                        {permission}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                            <Button label={isSubmitting ? "Creating role ..." : "Create"}/>
                    </form>
                </ModalContainer>
            )}
            <Modal
                isOpen={modal.status}
                message={modal.message}
                success={modal.success}
                onClose={() => setModal({...modal, status: false})}
            />
        </div>
    );
};

export default RolesPage;
