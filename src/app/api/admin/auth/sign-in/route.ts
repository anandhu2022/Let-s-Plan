import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/libs/prisma";
import bcrypt from "bcryptjs";
import {serialize} from "cookie";

export const POST = async (request: NextRequest) => {
    try {
        const {email, password} = await request.json();
        if (!email || !password) {
            return new NextResponse(JSON.stringify({error: "Missing required fields"}), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                }
            })
        }
        const user = await prisma.admin_Users.findFirst({
            where: {email}
        });
        if (!user) {
            return new NextResponse(JSON.stringify({success: false, message: "User not found"}), {
                status: 404,
            });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return new NextResponse(JSON.stringify({success: false, message: "Invalid email or password"}), {
                status: 401,
            });
        }
        const sessionToken = `${user.id}:${Date.now()}`;

        const cookie = serialize("adminSession", sessionToken, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24
        });
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            }
        }), {
            status: 200,
            headers: {
                "Set-Cookie": cookie,
                "Content-Type": "application/json",
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
}