import {NextResponse} from "next/server";
import {getCookieValue, getHashedSessionId} from "@/app/libs/authManagement";
import {prisma} from "@/app/libs/prisma";
import {serialize} from "cookie";

export const GET = async () => {
    try {
        const sessionId = await getCookieValue("sessionId");
        if (!sessionId) {
            return new NextResponse(JSON.stringify({success: false, message: "Session not found"}), {
                status: 401,
            });
        }
        const hashedSessionId = getHashedSessionId(sessionId);
        const session = await prisma.session.findUnique({
            select: {
                userId: true,
            },
            where: {
                sessionId: hashedSessionId,
            },
        });
        console.log(session);
        if (!session) {
            const cookie = serialize("sessionId", "", {
                maxAge: 0,
                path: "/",
                expires: new Date(0),
                sameSite: "strict",
                secure: true,
            })
            return new NextResponse(JSON.stringify({success: false, message: "Invalid session"}), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Set-Cookie': cookie,
                },
            });
        }

        //Todo: Check the user's permissions and fetch projects accordingly

        const projects = await prisma.project.findMany({
            select: {
                id: true,
                title: true,
                statusId: true,
                priorityId: true,
                actualEndDate: true
            }
        });

        const statuses = await prisma.status.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        const priorities = await prisma.priority.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        const statusMap = new Map(statuses.map(s => [s.id, s.name]));
        const priorityMap = new Map(priorities.map(p => [p.id, p.name]));

        const updatedProjects = projects.map(project => ({
            ...project,
            status: statusMap.get(project.statusId) || "Unknown",
            priority: priorityMap.get(project.priorityId) || "Unknown"
        }));

        return new NextResponse(JSON.stringify({
            success: true,
            message: "Successfully fetched projects",
            projects: updatedProjects
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({success: false, message: "Failed to fetch projects"}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}