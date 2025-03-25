import {NextRequest, NextResponse} from "next/server";
import {ProjectInputProps} from "@/app/libs/types";
import {prisma} from "@/app/libs/prisma";

export const POST = async (request: NextRequest) => {
    try {
        const {
            title,
            statusId,
            plannedEndDate,
            plannedStartDate,
            actualStartDate,
            actualEndDate,
            projectDescription,
            priorityId,
            userId
        }: ProjectInputProps = await request.json();
        console.log(statusId);
        if (!userId) {
            throw new Error("User ID is required");
        }
        const project = await prisma.project.create({
            data: {
                title,
                statusId,
                plannedEndDate,
                plannedStartDate,
                actualStartDate,
                actualEndDate,
                projectDescription,
                priorityId,
                userId
            }
        });
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Project Successfully Created",
            projectId: project.id
        }), {
            status: 201,
        })
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Project creation error",
            error: error
        }), {
            status: 500,
        })
    }
}