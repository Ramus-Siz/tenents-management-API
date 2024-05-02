/*
  Warnings:

  - A unique constraint covering the columns `[code_landLoard]` on the table `LandloardModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LandloardModel_code_landLoard_key" ON "LandloardModel"("code_landLoard");
