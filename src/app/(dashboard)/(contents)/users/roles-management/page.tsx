"use client";

import React, { useState } from "react";
import Container from "@/app/components/Container";
import useTheme from "@/app/context/Theme/useTheme";
import Button from "@/app/components/form/Button";
import Input from "@/app/components/form/Input";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";

// Role Interface
interface Role {
    id: number;
    name: string;
    description: string;
    permissions: string[];
    assignedUsers: number;
}

// Hardcoded Role List
const initialRoles: Role[] = [
    { id: 1, name: "Admin", description: "Full system access", permissions: ["Manage Users", "Manage Roles", "Manage Projects"], assignedUsers: 3 },
    { id: 2, name: "Manager", description: "Manages projects & assigns tasks", permissions: ["View Reports", "Edit Projects", "Assign Tasks"], assignedUsers: 5 },
    { id: 3, name: "Editor", description: "Can edit and publish content", permissions: ["Edit Content", "Publish Articles", "Moderate Comments"], assignedUsers: 2 },
];

const RolesPage = () => {
    const { darkMode } = useTheme();
    const [roles, setRoles] = useState<Role[]>(initialRoles);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showForm, setShowForm] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [roleName, setRoleName] = useState("");
    const [roleDescription, setRoleDescription] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [editingRoleId, setEditingRoleId] = useState<number | null>(null);

    // Filter roles based on search query
    const filteredRoles = roles.filter((role) => role.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleCreateRole = () => {
        if (!roleName.trim() || selectedPermissions.length === 0) {
            alert("Please enter a role name and select at least one permission.");
            return;
        }

        const newRole: Role = {
            id: roles.length + 1,
            name: roleName,
            description: roleDescription,
            permissions: selectedPermissions,
            assignedUsers: Math.floor(Math.random() * 10), // Mock user count
        };

        setRoles([...roles, newRole]);
        setRoleName("");
        setRoleDescription("");
        setSelectedPermissions([]);
        setShowForm(false);
    };

    const handleDeleteRole = (id: number) => {
        if (confirm("Are you sure you want to delete this role?")) {
            setRoles(roles.filter((role) => role.id !== id));
        }
    };

    const handleEditRole = (role: Role) => {
        setIsEditing(true);
        setEditingRoleId(role.id);
        setRoleName(role.name);
        setRoleDescription(role.description);
        setSelectedPermissions(role.permissions);
        setShowForm(true);
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            <span className="text-[#64747a] pb-4 text-2xl font-bold">Roles Management</span>

            {/* Search Bar */}
            <Container className="p-4 rounded-md">
                <div className="flex items-center gap-2">
                    <SearchIcon fontSize="small" />
                    <Input
                        type="text"
                        placeholder="Search Roles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </Container>

            {/* Roles List Section */}
            <Container className="p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Create New Role Card */}
                    <div
                        onClick={() => setShowForm(true)}
                        className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md border-dashed border-2 cursor-pointer transition ${
                            darkMode ? "border-gray-500 bg-gray-800 text-white hover:border-gray-300" : "border-gray-400 bg-gray-100 hover:border-gray-600"
                        }`}
                    >
                        <AddIcon fontSize="large" />
                        <span className="mt-2 text-lg font-semibold">Create New Role</span>
                    </div>

                    {/* Role Cards */}
                    {filteredRoles.map((role) => (
                        <div key={role.id} className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}>
                            {/* Assigned Users */}
                            <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <GroupIcon fontSize="small" />
                    {role.assignedUsers} {role.name}s
                </span>
                            </div>

                            {/* Role Title */}
                            <h3 className="text-xl font-semibold">{role.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{role.description}</p>

                            {/* Bottom Buttons */}
                            <div className="flex justify-between items-center mt-6">
                                <button className="text-blue-500 hover:underline">View Assigned Members</button>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEditRole(role)}>
                                        <EditIcon fontSize="small" className="text-gray-500 hover:text-gray-700 transition" />
                                    </button>
                                    <button onClick={() => handleDeleteRole(role.id)}>
                                        <DeleteIcon fontSize="small" className="text-red-500 hover:text-red-700 transition" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>

            {/* Create/Edit Role Modal */}
            {showForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className={`p-6 rounded-lg w-96 shadow-lg ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
                        <h2 className="text-lg font-semibold mb-3">{isEditing ? "Edit Role" : "Create a Role"}</h2>

                        {/* Role Name Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Role Name</label>
                            <Input type="text" placeholder="Enter Role Name" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
                        </div>

                        {/* Role Description Input */}
                        <div className="flex flex-col gap-2 mt-2">
                            <label className="text-sm font-medium">Description</label>
                            <Input type="text" placeholder="Enter Role Description" value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-2 mt-6">
                            <button className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition" onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                            <Button label={isEditing ? "Update Role" : "Create Role"} onClick={isEditing ? handleEditRole : handleCreateRole} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RolesPage;
