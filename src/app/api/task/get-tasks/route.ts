"use server";

import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prism = new PrismaClient();

export const GET = async (req: NextRequest) => {
    const userId = Number(req.nextUrl.searchParams.get("userId"));
    const tasks = await prism.task.findMany({where: {userId: userId}});
    return new NextResponse(JSON.stringify({tasks: tasks}), {
        status: 200,
        statusText: "Success"
    });
}