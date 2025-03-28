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
}

main().catch(console.error);