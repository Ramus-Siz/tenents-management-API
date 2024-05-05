/*
  Warnings:

  - A unique constraint covering the columns `[adress]` on the table `HousesModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HousesModel_adress_key" ON "HousesModel"("adress");
