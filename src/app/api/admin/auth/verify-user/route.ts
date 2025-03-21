import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {getUserId} from "@/app/libs/UserManagement";

const prisma = new PrismaClient();

export const POST = async () => {
    try {
        const userId = await getUserId("adminSession");
        if (userId) {
            const user = await prisma.admin_Users.findUnique({
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