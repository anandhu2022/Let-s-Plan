import bcrypt from 'bcryptjs';
import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {

    try {
        const {email, password, username} = await req.json();
        if (!email || !password) {
            return new NextResponse(JSON.stringify({error: "Missing required fields"}), {
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username
            },
        });

        if (!user) {
            return new NextResponse(JSON.stringify({error: "Failed to create user"}), {
                status: 400,
            });
        }

        return NextResponse.json(
            {message: "User created successfully"},
        );

    } catch (err) {
        return new NextResponse(JSON.stringify({error: err}), {
            status: 500,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
};
