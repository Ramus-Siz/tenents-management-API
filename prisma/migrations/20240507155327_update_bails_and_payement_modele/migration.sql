-- DropForeignKey
ALTER TABLE "BailModel" DROP CONSTRAINT "BailModel_residentId_fkey";

-- DropForeignKey
ALTER TABLE "PayementModel" DROP CONSTRAINT "PayementModel_residentId_fkey";

-- AddForeignKey
ALTER TABLE "PayementModel" ADD CONSTRAINT "PayementModel_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "TenantsModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BailModel" ADD CONSTRAINT "BailModel_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "TenantsModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
