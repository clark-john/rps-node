-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "History" (
    "gamenumber" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "loses" INTEGER NOT NULL,
    "tie" INTEGER NOT NULL,
    "total_games" INTEGER NOT NULL,
    "dateplayed" VARCHAR(30) NOT NULL,
    "playedBy" VARCHAR(200) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "name" VARCHAR(200) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "birthdate" SMALLINT NOT NULL,
    "birthmonth" VARCHAR(10) NOT NULL,
    "birthyear" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "highscore" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "History_dateplayed_key" ON "History"("dateplayed");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
