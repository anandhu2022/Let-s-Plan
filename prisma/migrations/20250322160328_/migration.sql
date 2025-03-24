/*
  Warnings:

  - You are about to drop the column `date` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `taskStatus` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `task` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `admin_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rolepermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actualEndDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actualStartDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completionTime` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedTime` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plannedEndDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plannedStartDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priorityId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `rolepermissions` DROP FOREIGN KEY `RolePermissions_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `rolepermissions` DROP FOREIGN KEY `RolePermissions_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `Roles_adminUserId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- DropIndex
DROP INDEX `Task_userId_fkey` ON `task`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `date`,
    DROP COLUMN `taskStatus`,
    DROP COLUMN `time`,
    ADD COLUMN `actualEndDate` DATETIME(3) NOT NULL,
    ADD COLUMN `actualStartDate` DATETIME(3) NOT NULL,
    ADD COLUMN `completionTime` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    ADD COLUMN `createdBy` INTEGER NOT NULL,
    ADD COLUMN `estimatedTime` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `plannedEndDate` DATETIME(3) NOT NULL,
    ADD COLUMN `plannedStartDate` DATETIME(3) NOT NULL,
    ADD COLUMN `priorityId` INTEGER NOT NULL,
    ADD COLUMN `projectId` INTEGER NOT NULL,
    ADD COLUMN `statusId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedBy` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `password`,
    ADD COLUMN `first_name` VARCHAR(191) NULL,
    ADD COLUMN `last_name` VARCHAR(191) NULL,
    ADD COLUMN `middle_name` VARCHAR(191) NULL,
    ADD COLUMN `mobile` VARCHAR(191) NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NOT NULL,
    ADD COLUMN `registerdAt` DATETIME(3) NULL,
    ADD COLUMN `roleId` INTEGER NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `admin_users`;

-- DropTable
DROP TABLE `permissions`;

-- DropTable
DROP TABLE `rolepermissions`;

-- DropTable
DROP TABLE `roles`;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Priority` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Priority_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientPartner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ClientPartner_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientContact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NOT NULL,
    `contactType` VARCHAR(191) NOT NULL,
    `contactId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `plannedStartDate` DATETIME(3) NOT NULL,
    `plannedEndDate` DATETIME(3) NOT NULL,
    `actualStartDate` DATETIME(3) NOT NULL,
    `actualEndDate` DATETIME(3) NOT NULL,
    `projectDescription` VARCHAR(191) NOT NULL,
    `clientId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `priorityId` INTEGER NOT NULL,
    `clientContactId` INTEGER NULL,

    UNIQUE INDEX `Project_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `projectId` INTEGER NOT NULL,

    UNIQUE INDEX `Team_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `IPaddress` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `taskId` INTEGER NOT NULL,
    `activityType` VARCHAR(191) NOT NULL,
    `activityData` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Status_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` VARCHAR(191) NOT NULL,
    `taskId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userStory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `projectId` INTEGER NOT NULL,
    `taskId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `userStory_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Task_title_key` ON `Task`(`title`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientContact` ADD CONSTRAINT `ClientContact_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `ClientPartner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_priorityId_fkey` FOREIGN KEY (`priorityId`) REFERENCES `Priority`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `ClientPartner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_clientContactId_fkey` FOREIGN KEY (`clientContactId`) REFERENCES `ClientContact`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_priorityId_fkey` FOREIGN KEY (`priorityId`) REFERENCES `Priority`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userStory` ADD CONSTRAINT `userStory_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userStory` ADD CONSTRAINT `userStory_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userStory` ADD CONSTRAINT `userStory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
