-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "kategori" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

