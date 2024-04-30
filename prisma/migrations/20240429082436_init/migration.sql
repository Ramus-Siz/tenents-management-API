-- CreateTable
CREATE TABLE "HousesModel" (
    "id" SERIAL NOT NULL,
    "adress" TEXT,
    "type" TEXT NOT NULL,
    "composition" TEXT,
    "description" TEXT,
    "lessorId" INTEGER NOT NULL,

    CONSTRAINT "HousesModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantsModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "prenom" TEXT,
    "adress" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "lessorId" INTEGER NOT NULL,

    CONSTRAINT "TenantsModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandloardModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "prenom" TEXT,
    "adress" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "code_landLoard" TEXT,

    CONSTRAINT "LandloardModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayementModel" (
    "id" SERIAL NOT NULL,
    "month" TEXT,
    "year" TEXT,
    "amount" INTEGER,
    "payAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "residentId" INTEGER NOT NULL,
    "bailId" INTEGER NOT NULL,

    CONSTRAINT "PayementModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BailModel" (
    "id" SERIAL NOT NULL,
    "start" TEXT,
    "finish" TEXT,
    "myPropertyId" INTEGER NOT NULL,
    "residentId" INTEGER NOT NULL,

    CONSTRAINT "BailModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionModel" (
    "id" SERIAL NOT NULL,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userConectedId" INTEGER NOT NULL,

    CONSTRAINT "SessionModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HousesModel" ADD CONSTRAINT "HousesModel_lessorId_fkey" FOREIGN KEY ("lessorId") REFERENCES "LandloardModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantsModel" ADD CONSTRAINT "TenantsModel_lessorId_fkey" FOREIGN KEY ("lessorId") REFERENCES "LandloardModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayementModel" ADD CONSTRAINT "PayementModel_bailId_fkey" FOREIGN KEY ("bailId") REFERENCES "BailModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayementModel" ADD CONSTRAINT "PayementModel_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "TenantsModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BailModel" ADD CONSTRAINT "BailModel_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "TenantsModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BailModel" ADD CONSTRAINT "BailModel_myPropertyId_fkey" FOREIGN KEY ("myPropertyId") REFERENCES "HousesModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionModel" ADD CONSTRAINT "SessionModel_userConectedId_fkey" FOREIGN KEY ("userConectedId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
