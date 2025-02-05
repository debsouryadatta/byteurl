/*
  Warnings:

  - You are about to drop the column `longUrl` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalUrl` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortUrl` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "longUrl",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "originalUrl" VARCHAR(3000) NOT NULL,
ADD COLUMN     "pageContent" TEXT,
ADD COLUMN     "shortUrl" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortUrl_key" ON "Url"("shortUrl");
