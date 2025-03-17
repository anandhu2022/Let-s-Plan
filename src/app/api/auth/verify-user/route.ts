import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async () => {
    try {
        // const request = await req.json();

        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('session')?.value;

        if (sessionToken) {
            const [userId] = sessionToken.split(":");
            const user = await prisma.user.findUnique({
                where: {id: Number(userId)}
            });
            if (!user) return new NextResponse(JSON.stringify({user: null}), {status: 401});
            return new NextResponse(JSON.stringify({user: {id: user.id, email: user.email, username: user.username}}), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        return NextResponse.json({error: "Not authenticated"}, {
            status: 401,
            statusText: "Unauthorized",
        })
    } catch (error) {
        console.log(error);
    }
}