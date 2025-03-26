"use server";

import bcrypt from 'bcryptjs';
import {NextRequest, NextResponse} from "next/server";
import {serialize} from "cookie";
import {prisma} from "@/app/libs/prisma";
import {getHashedSessionId, getIpAddress, getSessionId} from "@/app/libs/authManagement";


export const POST = async (req: NextRequest) => {

    try {
        const {email, password} = await req.json();
        if (!email || !password) {
            return new NextResponse(JSON.stringify({success: false, message: "Missing required fields"}), {
                status: 400,
            });
        }

        const user = await prisma.user.findFirst({where: {email}});
        if (!user) {
            return new NextResponse(JSON.stringify({success: false, message: "User not found"}), {
                status: 404,
            });
        }

        if (!(await bcrypt.compare(password, user.passwordHash))) {
            return new NextResponse(JSON.stringify({success: false, message: "Invalid email or password"}), {
                status: 401,
            });
        }
        if (user.accountStatus === "PENDING APPROVAL") {
            return new NextResponse(JSON.stringify({
                success: false,
                message: "User account is pending approval, contact admin for approval."
            }), {
                status: 403,
            });
        }
        const sessionId: string = getSessionId();
        const hashedSessionId: string = getHashedSessionId(sessionId);
        const ipAddress: string = getIpAddress(req);

        const cookie = serialize("sessionId", sessionId, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24
        });

        await prisma.session.create({
            data: {
                userId: user.id,
                sessionId: hashedSessionId,
                ipAddress: ipAddress,
                expiresAt: new Date(Date.now() + 60 * 60 * 24 * 1000),
            }
        });

        return new NextResponse(JSON.stringify({
            success: true,
            message: "Login Successful",
            user: user
        }), {
            status: 200,
            headers: {
                'content-type': 'application/json',
                'Set-Cookie': cookie,
            }
        });

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
