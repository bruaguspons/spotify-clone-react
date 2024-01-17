/*
  Warnings:

  - The primary key for the `Playlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uuid` on the `Playlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Playlist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Playlist_uuid_key";

-- AlterTable
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_pkey",
DROP COLUMN "uuid",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_id_key" ON "Playlist"("id");
