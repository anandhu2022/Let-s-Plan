import bcrypt from 'bcryptjs';
import {NextResponse} from "next/server";
import {UserProps} from "@/app/libs/types";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req: Response) => {

    try {
        const {email, password} = await req.json();
        if (!email || !password) {
            return new NextResponse(JSON.stringify({error: "Missing required fields"}), {
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!email || !bcrypt.compare(password, hashedPassword)) {
            return new NextResponse(JSON.stringify({error: "Invalid email or password"}));
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
