/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `session_sessionId_key` ON `session`(`sessionId`);
