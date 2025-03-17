import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (req: NextRequest) => {
    const taskId:number = Number(req.nextUrl.searchParams.get("taskId"));


    const response = await prisma.task.delete({
        where: {
            id: taskId,
        },
    })


    console.log(taskId)
    return new NextResponse(JSON.stringify({response: response}), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}