/*
  Warnings:

  - You are about to drop the `_PlaylistToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlaylistToUsers" DROP CONSTRAINT "_PlaylistToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToUsers" DROP CONSTRAINT "_PlaylistToUsers_B_fkey";

-- DropTable
DROP TABLE "_PlaylistToUsers";

-- CreateTable
CREATE TABLE "UserPlaylist" (
    "userUuid" UUID NOT NULL,
    "playlistId" INTEGER NOT NULL,

    CONSTRAINT "UserPlaylist_pkey" PRIMARY KEY ("userUuid","playlistId")
);

-- AddForeignKey
ALTER TABLE "UserPlaylist" ADD CONSTRAINT "UserPlaylist_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlaylist" ADD CONSTRAINT "UserPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
