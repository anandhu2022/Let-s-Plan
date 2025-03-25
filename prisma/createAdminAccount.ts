import {prisma} from "@/app/libs/prisma";
import bcrypt from "bcryptjs";
import readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query: string): Promise<string> => {
    return new Promise((resolve) => rl.question(query, resolve));
};

async function main() {
    const email: string = await askQuestion("Enter admin email: ");
    const existingUser = await prisma.user.findUnique({where: {email}});

    if (!existingUser) {
        const username: string = await askQuestion("Enter admin username: ");
        const first_name: string = await askQuestion("Enter first name: ");
        const last_name: string = await askQuestion("Enter admin last name: ");
        let password: string;
        let confirmPassword: string;

        do {
            password = await askQuestion("Enter admin password: ");
            confirmPassword = await askQuestion("Confirm admin password: ");

            if (password !== confirmPassword) {
                console.log("❌ Passwords do not match! Please try again.");
            }
        } while (password !== confirmPassword);


        const accountStatus = "ACTIVE";
        const passwordHash: string = await bcrypt.hash(password, 10);

        if (!email || !username || !password) {
            console.error("Email, username, password cannot be empty.");
            process.exit(1);
        }

        const user = await prisma.user.create({
            data: {
                username,
                first_name: first_name ? first_name : null,
                last_name: last_name ? last_name : null,
                email,
                passwordHash,
                accountStatus,
            },
        });

        console.log("Admin account created:", user.email);

        const existingRole = await prisma.role.findUnique({where: {name: "SUPER_ADMIN"}});
        if (!existingRole) {
            const role = await prisma.role.create({
                data: {
                    name: "SUPER_ADMIN",
                },
            });
            console.log("Role created for Admin:", role.name);

            const permissions = await prisma.permissions.create({
                data: {
                    name: "ADMIN_ALL",
                    roleId: role.id,
                    userId: user.id
                },
            });
            console.log("Permission created for Admin:", permissions.name);

            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    roleId: role.id,
                },
            });
            console.log("Super Admin role assigned to Admin account");
        } else {
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    roleId: existingRole.id,
                },
            });
            console.log("Super Admin role assigned to Admin account");
        }
    } else {
        console.log(`Admin account already exists for ${email}. Skipping...`);
        const changePassword = await askQuestion("Change admin password? (yes/no): ");

        if (changePassword.toLowerCase() === "yes") {
            const newPassword: string = await askQuestion("Enter new admin password: ");
            const passwordHash: string = await bcrypt.hash(newPassword, 10);

            await prisma.user.update({
                where: {
                    id: existingUser.id,
                },
                data: {
                    passwordHash,
                },
            });

            console.log("Admin password changed successfully");
        }
    }

    rl.close();
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
