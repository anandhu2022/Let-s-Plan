/*
  Warnings:

  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_userId_fkey`;

-- DropIndex
DROP INDEX `Task_userId_fkey` ON `Task`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `status` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `date` VARCHAR(191) NOT NULL,
    MODIFY `time` DECIMAL(65, 30) NOT NULL,
    MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
