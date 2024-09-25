/*
  Warnings:

  - You are about to drop the column `buildingPostCode` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `haveBuildingSite` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `haveIdeaProject` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `haveIndividualBusiness` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `havePlan` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `legalRepresentativ` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `parcelNumber` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `postCode` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `wantMoreBeforeOpeningBusiness` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `wantSeeTemplate` on the `Prospect` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prospect" DROP COLUMN "buildingPostCode",
DROP COLUMN "city",
DROP COLUMN "haveBuildingSite",
DROP COLUMN "haveIdeaProject",
DROP COLUMN "haveIndividualBusiness",
DROP COLUMN "havePlan",
DROP COLUMN "legalRepresentativ",
DROP COLUMN "parcelNumber",
DROP COLUMN "postCode",
DROP COLUMN "street",
DROP COLUMN "wantMoreBeforeOpeningBusiness",
DROP COLUMN "wantSeeTemplate",
ADD COLUMN     "address_city" TEXT,
ADD COLUMN     "address_postCode" TEXT,
ADD COLUMN     "address_street" TEXT,
ADD COLUMN     "constructionProject_buildingPostCode" TEXT,
ADD COLUMN     "constructionProject_haveBuildingSite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "constructionProject_haveIdeaProject" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "constructionProject_havePlan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "constructionProject_parcelNumber" TEXT,
ADD COLUMN     "constructionProject_wantSeeTemplate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reseller_haveIndividualBusiness" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reseller_legalRepresentativ" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reseller_wantMoreBeforeOpeningBusiness" BOOLEAN NOT NULL DEFAULT false;
