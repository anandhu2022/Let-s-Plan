/*
  Warnings:

  - You are about to alter the column `time` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,3)`.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `description` VARCHAR(255) NOT NULL,
    MODIFY `time` DECIMAL(65, 3) NOT NULL;
