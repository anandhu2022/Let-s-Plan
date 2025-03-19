import {NextRequest, NextResponse} from "next/server";
import {TaskProps} from "@/app/libs/types";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
    try {
        const {title, description, taskStatus, userId, date, time}: TaskProps = await req.json();
        if (!title || !description || !userId || !date || !time) {
            return NextResponse.json({error: "Missing required fields"}, {status: 400,});
        }
        const task = await prisma.task.create({
            data: {
                title,
                description,
                taskStatus,
                userId,
                date,
                time,
            },
        });

        return NextResponse.json({success: true, task}, {status: 201, statusText: "Task created successfully"});

    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({success: false, error: "Internal server error"}, {status: 500});
    }

}