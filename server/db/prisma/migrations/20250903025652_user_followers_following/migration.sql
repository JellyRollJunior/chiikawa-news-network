-- CreateTable
CREATE TABLE "_followersToFollowing" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_followersToFollowing_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_followersToFollowing_B_index" ON "_followersToFollowing"("B");

-- AddForeignKey
ALTER TABLE "_followersToFollowing" ADD CONSTRAINT "_followersToFollowing_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followersToFollowing" ADD CONSTRAINT "_followersToFollowing_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
