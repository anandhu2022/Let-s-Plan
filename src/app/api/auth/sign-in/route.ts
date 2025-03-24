"use server";

import bcrypt from 'bcryptjs';
import {NextRequest, NextResponse} from "next/server";
import {serialize} from "cookie";
import {prisma} from "@/app/libs/prisma";
import {getHashedSessionId, getSessionId} from "@/app/libs/generateSessionId";


export const POST = async (req: NextRequest) => {

    try {
        // const {email, password} = await req.json();
        // if (!email || !password) {
        //     return new NextResponse(JSON.stringify({success: false, message: "Missing required fields"}), {
        //         status: 400,
        //     });
        // }
        //
        // const user = await prisma.user.findFirst({where: {email}});
        // if (!user) {
        //     return new NextResponse(JSON.stringify({success: false, message: "User not found"}), {
        //         status: 404,
        //     });
        // }
        // if (!(await bcrypt.compare(password, user.passwordHash))) {
        //     return new NextResponse(JSON.stringify({success: false, message: "Invalid email or password"}), {
        //         status: 401,
        //     });
        // }
        const sessionId = getSessionId();
        const hashedSessionId = getHashedSessionId(sessionId);
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "Unknown IP";
        console.log(sessionId);
        console.log(hashedSessionId);
        console.log(ip);
        // const cookie = serialize("sessionId", sessionId, {
        //     httpOnly: true,
        //     path: '/',
        //     maxAge: 60 * 60 * 24
        // });
        //
        // await prisma.session.create({
        //     data: {
        //         userId: user.id,
        //         sessionId: hashedSessionId,
        //         IpAddress: "127.0.0.1",
        //         expiresAt: new Date(Date.now() + 60 * 60 * 24),
        //     }
        // })

        return new NextResponse(JSON.stringify({
            success: true,
            message: "Login Successful",
            sessionId: sessionId,
            hashedSessionId: hashedSessionId,
            ip: ip
        }), {
            status: 200,
            headers: {
                'content-type': 'application/json',
            }
        })

    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "An error occurred while processing your request",
            user: null
        }), {
            status: 500,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
};
