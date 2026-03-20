/*
  Warnings:

  - Added the required column `type` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CHAT_TYPE" AS ENUM ('PRIVATE', 'GROUP', 'PUBLIC');

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "type" "CHAT_TYPE" NOT NULL;
