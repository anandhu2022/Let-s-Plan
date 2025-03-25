import {NextRequest, NextResponse} from 'next/server';
import {serialize} from "cookie";
import {prisma} from "@/app/libs/prisma";
import {getCookieValue, getHashedSessionId, getIpAddress} from "@/app/libs/authManagement";

export const GET = async (req: NextRequest) => {
    const sessionId = await getCookieValue("sessionId");
    if (sessionId) {
        const hashedSessionId: string = getHashedSessionId(sessionId);
        const IpAddress = getIpAddress(req);
        const session = await prisma.session.findFirst({
            select: {
                id: true,
            },
            where: {
                sessionId: hashedSessionId,
                ipAddress: ipAddress
            }
        });
        if (session) {
            await prisma.session.delete({
                where: {
                    id: session.id,
                }
            })
        }
    }

    const cookie = serialize("sessionId", "", {
        path: '/',
        httpOnly: true,
        expires: new Date(0)
    });
    return new NextResponse(JSON.stringify({
        status: true,
        message: "Cookie expired",
        user: null
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookie
        }
    });
}
