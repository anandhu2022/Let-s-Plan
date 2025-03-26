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
        select: {id: true, email: true, accountStatus: true}
    });
}