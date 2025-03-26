import {getCookieValue} from "@/app/libs/authManagement";
import {NextResponse} from "next/server";
import {serialize} from "cookie";
import {prisma} from "@/app/libs/prisma";

export const GET = async () => {
    try {
        const sessionId = await getCookieValue('sessionId');
        if (!sessionId) {
            const cookie = serialize("sessionId", "", {
                path: '/',
                expires: new Date(0),
                sameSite: 'lax',
                secure: true,
            });
            return new NextResponse(JSON.stringify({success: false, message: "Session expired!!"}), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Set-Cookie': cookie,
                },
            });
        }
        const pendingUsers = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                registerdAt: true,
                mobile: true
            },
            where: {
                accountStatus: 'PENDING APPROVAL'
            }
        });
        return new NextResponse(JSON.stringify({success: true, data: pendingUsers}), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}