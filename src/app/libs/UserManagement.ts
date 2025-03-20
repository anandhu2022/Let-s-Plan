"use server";

import {cookies} from "next/headers";
import {prisma} from "@/app/libs/prisma";

export const getCookieValue = async ({session}: { session: string }) => {
    const cookieStore = await cookies();
    return cookieStore.get(session)?.value;
}

export const getUserId = async (): Promise<number | null> => {
    try {
        const sessionToken = await getCookieValue({session: "session"});
        if (sessionToken) {
            const [userId] = sessionToken.split(":");
            return Number(userId);
        }
    } catch (err) {
        console.error("Error getting user ID from cookie:", err);
    }
    return null;
}

export const getRoleName = async (): Promise<string | null> => {
    const userId = await getUserId();
    try {
        if (userId) {
            const role = await prisma.roles.findFirst({
                where: {
                    userId,
                },
                select: {
                    roleName: true,
                },
            })
            if (role?.roleName) {
                return role.roleName;
            }
        }
    } catch (err) {
        console.error("Error getting user role:", err);
    }
    return null;
}