/*
  Warnings:

  - Made the column `start` on table `BailModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `adress` on table `HousesModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `composition` on table `HousesModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `LandloardModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prenom` on table `LandloardModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `adress` on table `LandloardModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `LandloardModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephone` on table `LandloardModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code_landLoard` on table `LandloardModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `month` on table `PayementModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `PayementModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `TenantsModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prenom` on table `TenantsModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `adress` on table `TenantsModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `TenantsModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephone` on table `TenantsModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `UserModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `UserModel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BailModel" ALTER COLUMN "start" SET NOT NULL;

-- AlterTable
ALTER TABLE "HousesModel" ALTER COLUMN "adress" SET NOT NULL,
ALTER COLUMN "composition" SET NOT NULL;

-- AlterTable
ALTER TABLE "LandloardModel" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "prenom" SET NOT NULL,
ALTER COLUMN "adress" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "telephone" SET NOT NULL,
ALTER COLUMN "code_landLoard" SET NOT NULL;

-- AlterTable
ALTER TABLE "PayementModel" ALTER COLUMN "month" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL;

-- AlterTable
ALTER TABLE "TenantsModel" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "prenom" SET NOT NULL,
ALTER COLUMN "adress" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "telephone" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserModel" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;
