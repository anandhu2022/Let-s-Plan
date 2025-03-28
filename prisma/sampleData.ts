import {prisma} from "@/app/libs/prisma";

const main = async () => {
    await prisma.status.createMany({
        data: [
            {name: "In Progress"},
            {name: "Completed"},
            {name: "Cancelled"},
            {name: "Pending"},
            {name: "On Hold"},
            {name: "Blocked"}
        ]
    })
    console.log("Statuses created successfully");

    await prisma.priority.createMany({
        data: [
            {name: "Low"},
            {name: "Medium"},
            {name: "High"},
            {name: "Urgent"},
        ]
    });
    console.log("Priorities created successfully");

    await prisma.role.create({
        data: {
            name: "SUPER_ADMIN",
            Permission: {
                create: {
                    name: "ADMIN_ALL"
                }
            }
        }
    });
    console.log("Super admin role created successfully");

    await prisma.permissions.createMany({
        data: [
            {name: "PROJECT-CREATE"},
            {name: "PROJECT-EDIT"},
            {name: "PROJECT-DELETE"},
            {name: "PROJECT-VIEW"},
            {name: "TASK-CREATE"},
            {name: "TASK-EDIT"},
            {name: "TASK-DELETE"},
            {name: "TASK-VIEW"},
            {name: "USER-CREATE"},
            {name: "USER-EDIT"},
            {name: "USER-DELETE"},
            {name: "USER-VIEW"},
        ]
    });
    console.log("Permissions created successfully");
}

main().catch(console.error);