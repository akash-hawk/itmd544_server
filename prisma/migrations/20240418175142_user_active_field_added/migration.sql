/*
  Warnings:

  - Made the column `userType` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "userType" SET NOT NULL;
