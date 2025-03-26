import bcrypt from 'bcryptjs';
import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {

    try {
        const {username, first_name, last_name, email, mobile, password} = await req.json();
        if (!email || !password || !first_name || !username) {
            return new NextResponse(JSON.stringify({error: "Missing required fields"}), {
                status: 400,
            });
        }
        const existingUser = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (existingUser) {
            return new NextResponse(JSON.stringify({success: false, message: "Email already Exists"}), {
                status: 400,
                headers: {
                    'content-type': 'application/json',
                },
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                first_name,
                last_name,
                mobile,
                email,
                passwordHash: hashedPassword,
                accountStatus: "PENDING APPROVAL"
            },
        });

        if (!user) {
            return new NextResponse(JSON.stringify({error: "Failed to create user"}), {
                status: 400,
            });
        }

        return new NextResponse(JSON.stringify({
            success: true,
            message: "Account created successfully, you can login after admin approves the account"
        }), {
            status: 201,
            headers: {
                'content-type': 'application/json',
            },
        })

    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({success: false, message: "Something went wrong!!"}), {
            status: 500,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
};
