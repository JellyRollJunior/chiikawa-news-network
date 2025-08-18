-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "bio" TEXT NOT NULL DEFAULT 'Thank you for visiting my profile';
