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

export const createRoleAndPermissions = async (roleName: string, permissions: string[]) => {
    const newRole = await prisma.role.create({
        data: {name: roleName}
    });

    await Promise.all(permissions.map(async (permission) => {
        await prisma.permissions.create({
            data: {
                roleId: newRole.id,
                name: permission
            }
        });
    }));

    return newRole;
}
