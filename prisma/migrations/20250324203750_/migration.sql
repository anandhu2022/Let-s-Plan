/*
  Warnings:

  - You are about to drop the column `IPaddress` on the `session` table. All the data in the column will be lost.
  - Added the required column `IpAddress` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `session` DROP COLUMN `IPaddress`,
    ADD COLUMN `IpAddress` VARCHAR(191) NOT NULL;
