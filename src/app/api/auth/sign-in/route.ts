import bcrypt from 'bcryptjs';
import {NextResponse} from "next/server";
import {PrismaClient} from '@prisma/client';
import {serialize} from "cookie";

const prisma = new PrismaClient();

export const POST = async (req: Response) => {

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
        if (!(await bcrypt.compare(password, user.password))) {
            return new NextResponse(JSON.stringify({success: false, message: "Invalid email or password"}), {
                status: 401,
            });
        } else {
            const sessionToken = `${user.id}:${Date.now()}`;
            const cookie = serialize("session", sessionToken, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24
            })

            return new NextResponse(JSON.stringify({
                success: true,
                message: "Login Successful",
                user: {
                    id: user.id,
                    email: user.email,
                }
            }), {
                status: 200,
                headers: {
                    'Set-Cookie': cookie,
                    'content-type': 'application/json',
                }
            })
        }

    } catch (err) {
        return new NextResponse(JSON.stringify({error: err}), {
            status: 500,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
};
