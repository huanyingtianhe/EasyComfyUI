/*
  Warnings:

  - You are about to alter the column `workflow` on the `app` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `app` MODIFY `workflow` JSON NOT NULL;
