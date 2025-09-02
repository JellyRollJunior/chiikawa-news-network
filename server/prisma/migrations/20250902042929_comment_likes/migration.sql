/*
  Warnings:

  - You are about to drop the `_likersToLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_likersToLikes" DROP CONSTRAINT "_likersToLikes_A_fkey";

-- DropForeignKey
ALTER TABLE "_likersToLikes" DROP CONSTRAINT "_likersToLikes_B_fkey";

-- DropTable
DROP TABLE "_likersToLikes";

-- CreateTable
CREATE TABLE "_likersToPostLikes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_likersToPostLikes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_likersToCommentLikes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_likersToCommentLikes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_likersToPostLikes_B_index" ON "_likersToPostLikes"("B");

-- CreateIndex
CREATE INDEX "_likersToCommentLikes_B_index" ON "_likersToCommentLikes"("B");

-- AddForeignKey
ALTER TABLE "_likersToPostLikes" ADD CONSTRAINT "_likersToPostLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likersToPostLikes" ADD CONSTRAINT "_likersToPostLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likersToCommentLikes" ADD CONSTRAINT "_likersToCommentLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likersToCommentLikes" ADD CONSTRAINT "_likersToCommentLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
