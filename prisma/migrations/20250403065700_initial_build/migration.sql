-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" DECIMAL(65,30) NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskStatus" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "permissionName" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermissions" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "RolePermissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_userId_key" ON "Roles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermissions_roleId_permissionId_key" ON "RolePermissions"("roleId", "permissionId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
