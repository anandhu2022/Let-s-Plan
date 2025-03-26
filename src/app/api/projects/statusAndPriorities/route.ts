import {prisma} from "@/app/libs/prisma";
import {NextResponse} from "next/server";

export const GET = async () => {
    try {
        const statuses = await prisma.status.findMany();
        const priorities = await prisma.priority.findMany();
        return new NextResponse(JSON.stringify({statuses, priorities}), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: error}),
        };
    }
}