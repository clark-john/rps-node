-- CreateTable
CREATE TABLE "History" (
    "gamenumber" SERIAL NOT NULL,
    "wins" INTEGER NOT NULL,
    "loses" INTEGER NOT NULL,
    "tie" INTEGER NOT NULL,
    "total_games" INTEGER NOT NULL,
    "dateplayed" VARCHAR(30) NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("gamenumber")
);

-- CreateIndex
CREATE UNIQUE INDEX "History_dateplayed_key" ON "History"("dateplayed");
