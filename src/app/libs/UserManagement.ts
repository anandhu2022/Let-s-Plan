"use server";

import {cookies} from "next/headers";
import {prisma} from "@/app/libs/prisma";

export const getCookieValue = async ({session}: { session: string }) => {
    const cookieStore = await cookies();
    return cookieStore.get(session)?.value;
}

export const getUserId = async (cookieName:string): Promise<number | null> => {
    try {
        const sessionToken = await getCookieValue({session: cookieName});
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
    const adminUserId = await getUserId("session");
    try {
        if (adminUserId) {
            const role = await prisma.roles.findFirst({
                where: {
                    adminUserId,
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