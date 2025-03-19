import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
    const userId: number = Number(req.nextUrl.searchParams.get('userId'));
    const dateObj = new Date();
    const today = `${String(dateObj.getDate()).padStart(2, "0")}-${String(dateObj.getMonth() + 1)
        .padStart(2, "0")}-${dateObj.getFullYear()}`;


    const timeEntries = await prisma.task.findMany({
        where: {
            taskStatus: "Completed",
            date: today,
            userId: userId,
        },
        select: {
            time: true,
        },
    });

    const totalTime: number = timeEntries.reduce((sum: number, {time}) => sum + Number(time), 0);

    return NextResponse.json({totalTime}, {status: 200});
};
