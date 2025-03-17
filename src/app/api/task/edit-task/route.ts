import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
export const PUT = async (request: NextRequest) => {
    try {
        const {id, title, description, time, date} = await request.json();
        if (!id || !title || !description || !time || !date) {
            return new NextResponse(JSON.stringify({error: 'Missing required fields'}), {
                status: 400,
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