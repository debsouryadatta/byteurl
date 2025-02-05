/*
  Warnings:

  - You are about to drop the `QRCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QRCode" DROP CONSTRAINT "QRCode_urlId_fkey";

-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "qrCodeUrl" TEXT;

-- DropTable
DROP TABLE "QRCode";
