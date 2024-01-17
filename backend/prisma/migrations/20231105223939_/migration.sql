/*
  Warnings:

  - Made the column `colorName` on table `Playlist` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_colorName_fkey";

-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "colorName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_colorName_fkey" FOREIGN KEY ("colorName") REFERENCES "Colors"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
