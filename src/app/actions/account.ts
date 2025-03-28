"use server";

import {prisma} from "@/app/libs/prisma";

export const changeAccountStatus = async ({id, status}: { id: number, status: string }) => {
    return prisma.user.update({
        select: {id: true, accountStatus: true},
        where: {id: id},
        data: {accountStatus: status}
    });
}

export const getUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            email: true,
            username: true,
            accountStatus: true,
            roleId: true
        }
    });
}

export const createRoleAndAssignPermissions = async (roleName: string, permissionNames: string[]) => {
    try {
        const existingRole = await prisma.role.findFirst({
            where: {name: roleName}
        });

        if (existingRole) {
            return {
                success: false,
                message: "Role already exists."
            }
        }
        const permissions = await Promise.all(
            permissionNames.map(async (permissionName) => {
                return prisma.permissions.findFirst({
                    where: {name: permissionName}
                });
            })
        );

        const validPermissions = permissions.filter((p) => p !== null) as { id: number }[];

        await prisma.role.create({
            data: {
                name: roleName,
                Permission: {
                    connect: validPermissions.map((permission) => ({id: permission.id})),
                },
            },
        });

        return {
            success: true,
            message: permissionNames.length > 0 ? "Successfully created roles and permissions" :
                "Created role successfully.",
        };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create role and assign permissions.");
    }
};


export const getAllPermissions = async () => {
    return prisma.permissions.findMany({
        select: {name: true}
    });
}

export const getRolesAndPermissions = async () => {
    return prisma.role.findMany({
        select: {
            id: true,
            name: true,
            Permission: {
                select: {name: true}
            }
        }
    });
}

export const getUsersByRole = async ({roleId}: {roleId: number}) => {
    return prisma.user.findMany({
        where: {roleId: roleId},
        select: {
            id: true,
            email: true,
            username: true,
            accountStatus: true,
            roleId: true
        }
    })
}