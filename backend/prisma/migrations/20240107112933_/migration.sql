-- CreateTable
CREATE TABLE "_PlaylistToUsers" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistToUsers_AB_unique" ON "_PlaylistToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistToUsers_B_index" ON "_PlaylistToUsers"("B");

-- AddForeignKey
ALTER TABLE "_PlaylistToUsers" ADD CONSTRAINT "_PlaylistToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToUsers" ADD CONSTRAINT "_PlaylistToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
