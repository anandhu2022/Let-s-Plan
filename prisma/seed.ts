import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const args = process.argv.slice(2);
    const email = args[0];
    const password = args[1];

    if (!email || !password) {
        console.error("❌ Please provide an email and password: `npm run seed admin@example.com secure_password`");
        process.exit(1);
    }

    const existingAdmin = await prisma.admin_Users.findUnique({where: {email}});

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const permissions = await prisma.permissions.create({
            data: {
                permissionName: "ADMIN_ALL",
                status: true
            },
        });
        console.log("Permission created for Admin:", permissions.permissionName);
        const role = await prisma.roles.create({
            data: {
                roleName: "SUPER_ADMIN",
            },
        });
        console.log("Role created for Admin:", role.roleName);
        await prisma.rolePermissions.create({
            data: {
                roleId: role.id,
                permissionId: permissions.id
            },
        });
        const adminUser = await prisma.admin_Users.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        console.log("Admin account created:", adminUser.email);
        await prisma.roles.update({
            where: {
                id: role.id,
            },
            data: {
                adminUserId: adminUser.id,
            },
        });
        console.log("Super Admin role assigned to Admin account");
    } else {
        console.log(`⚠️ Admin account already exists for ${email}. Skipping...`);
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        prisma.$disconnect();
    });
