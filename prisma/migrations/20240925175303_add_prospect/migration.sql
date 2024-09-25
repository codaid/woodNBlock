-- CreateTable
CREATE TABLE "Prospect" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT,
    "postCode" TEXT,
    "city" TEXT,
    "rdvTypes" TEXT[],
    "haveBuildingSite" BOOLEAN NOT NULL DEFAULT false,
    "buildingPostCode" TEXT,
    "parcelNumber" TEXT,
    "havePlan" BOOLEAN NOT NULL DEFAULT false,
    "haveIdeaProject" BOOLEAN NOT NULL DEFAULT false,
    "wantSeeTemplate" BOOLEAN NOT NULL DEFAULT false,
    "haveIndividualBusiness" BOOLEAN NOT NULL DEFAULT false,
    "legalRepresentativ" BOOLEAN NOT NULL DEFAULT false,
    "wantMoreBeforeOpeningBusiness" BOOLEAN NOT NULL DEFAULT false,
    "providerServices" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);
