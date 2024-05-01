/*
  Warnings:

  - The `start` column on the `BailModel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `finish` column on the `BailModel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `LandloardModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `TenantsModel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BailModel" DROP COLUMN "start",
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "finish",
ADD COLUMN     "finish" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "LandloardModel_email_key" ON "LandloardModel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TenantsModel_email_key" ON "TenantsModel"("email");
