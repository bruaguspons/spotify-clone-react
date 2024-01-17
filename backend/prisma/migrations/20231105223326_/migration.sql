-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_colorName_fkey";

-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "colorName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_colorName_fkey" FOREIGN KEY ("colorName") REFERENCES "Colors"("name") ON DELETE SET NULL ON UPDATE CASCADE;
