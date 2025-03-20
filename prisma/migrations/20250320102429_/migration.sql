/*
  Warnings:

  - You are about to drop the column `userId` on the `Roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminUserId]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Roles` DROP FOREIGN KEY `Roles_userId_fkey`;

-- DropIndex
DROP INDEX `Roles_userId_key` ON `Roles`;

-- AlterTable
ALTER TABLE `Roles` DROP COLUMN `userId`,
    ADD COLUMN `adminUserId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Admin_Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Roles_adminUserId_key` ON `Roles`(`adminUserId`);

-- AddForeignKey
ALTER TABLE `Roles` ADD CONSTRAINT `Roles_adminUserId_fkey` FOREIGN KEY (`adminUserId`) REFERENCES `Admin_Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
