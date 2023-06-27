/*
  Warnings:

  - You are about to drop the column `shortedUrl` on the `url` table. All the data in the column will be lost.
  - Added the required column `hash` to the `url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `url` DROP COLUMN `shortedUrl`,
    ADD COLUMN `hash` VARCHAR(191) NOT NULL;
