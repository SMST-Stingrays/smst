-- CreateTable
CREATE TABLE "Sponsor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "sponsorLink" TEXT NOT NULL,
    "listPrio" INTEGER NOT NULL DEFAULT -1,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);
