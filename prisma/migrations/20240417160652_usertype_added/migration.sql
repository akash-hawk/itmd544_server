-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userType" TEXT DEFAULT 'member',
ALTER COLUMN "profile_image" SET DEFAULT '';
