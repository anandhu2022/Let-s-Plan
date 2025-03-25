"use server";

import {NextRequest, NextResponse} from "next/server";
import {getCookieValue, getHashedSessionId, getIpAddress} from "@/app/libs/authManagement";
import {prisma} from "@/app/libs/prisma";
import {serialize} from "cookie";

export const POST = async (req: NextRequest) => {
    try {
        const sessionId = await getCookieValue("sessionId");
        if (!sessionId) {
            throw new Error("Session ID not found");
        }

        const hashedSessionId = getHashedSessionId(sessionId);
        const ipAddress = getIpAddress(req);
        const session = await prisma.session.findUnique({
            where: {
                sessionId: hashedSessionId,
                ipAddress: ipAddress
            },
        });
        if (!session) {
            throw new Error("Session not found");
        }

        if (session.expiresAt < new Date()) {
            await prisma.session.delete({
                where: {
                    sessionId: hashedSessionId,
                },
            });
            throw new Error("Session expired");
        }

        const user = await prisma.user.findUnique({
            where: {
                id: session.userId,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return new NextResponse(JSON.stringify({
            success: true,
            message: "User Data fetched successfully",
            user: user
        }), {status: 200});

    } catch (error) {
        const cookie = serialize("sessionId", "", {
            path: '/',
            httpOnly: true,
            expires: new Date(0)
        });
        return new NextResponse(JSON.stringify({
            success: false,
            message: error
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': cookie,
            },
        });
    }
}