/*
  Warnings:

  - Made the column `username` on table `admin_users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `admin_users` MODIFY `username` VARCHAR(191) NOT NULL;
