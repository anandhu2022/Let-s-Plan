import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
export const PUT = async (request: NextRequest) => {
    try {
        const {id, title, description, taskStatus, time, date} = await request.json();
        if (!id || !title || !description || !taskStatus || time === null || !date) {
            return new NextResponse(JSON.stringify({error: 'Missing required fields'}), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        const task = await prisma.task.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                description,
                taskStatus,
                time,
                date,
            },
        });

        return new NextResponse(JSON.stringify({task: task}), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })

    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({error: err}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}