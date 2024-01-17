/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "uuid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Colors" (
    "name" TEXT NOT NULL,
    "accent" VARCHAR(7) NOT NULL,
    "dark" VARCHAR(7) NOT NULL,

    CONSTRAINT "Colors_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "uuid" SERIAL NOT NULL,
    "albumId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "colorName" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "artists" TEXT[],

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_uuid_key" ON "Users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Colors_name_key" ON "Colors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_uuid_key" ON "Playlist"("uuid");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_colorName_fkey" FOREIGN KEY ("colorName") REFERENCES "Colors"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
