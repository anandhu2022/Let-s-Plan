"use server";

import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
    const userId = Number(request.nextUrl.searchParams.get('userId'));
    const dateObj = new Date();
    const today = `${String(dateObj.getDate()).padStart(2, "0")}-${String(dateObj.getMonth() + 1)
        .padStart(2, "0")}-${dateObj.getFullYear()}`;
    const yesterday = `${String(dateObj.getDate() - 1).padStart(2, "0")}-${String(dateObj.getMonth() + 1)
        .padStart(2, "0")}-${dateObj.getFullYear()}`;
    const tasks = await prisma.task.findMany({
        where: {
            OR: [
                {date: today, userId},
                {date: yesterday, userId},
            ],
        },
        select: {
            title: true,
            description: true,
            taskStatus: true,
            time: true,
            date: true,
        },
    });

    const taskToday = tasks.filter(task => task.date === today);
    const taskYesterday = tasks.filter(task => task.date === yesterday);
    

    return new NextResponse(JSON.stringify({taskToday: taskToday, taskYesterday: taskYesterday}), {
        status: 200,
        statusText: "Successfully authenticated"
    })
}