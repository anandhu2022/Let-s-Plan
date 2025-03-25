/*
  Warnings:

  - You are about to drop the column `IpAddress` on the `session` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipAddress` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_clientId_fkey`;

-- DropIndex
DROP INDEX `Project_clientId_fkey` ON `project`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `statusId` INTEGER NOT NULL,
    MODIFY `plannedStartDate` DATETIME(3) NULL,
    MODIFY `plannedEndDate` DATETIME(3) NULL,
    MODIFY `actualStartDate` DATETIME(3) NULL,
    MODIFY `actualEndDate` DATETIME(3) NULL,
    MODIFY `clientId` INTEGER NULL;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `IpAddress`,
    ADD COLUMN `ipAddress` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `ClientPartner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
