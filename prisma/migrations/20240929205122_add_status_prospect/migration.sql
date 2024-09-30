-- CreateEnum
CREATE TYPE "ProspectStatus" AS ENUM ('idle', 'treat');

-- AlterTable
ALTER TABLE "Prospect" ADD COLUMN     "status" "ProspectStatus" NOT NULL DEFAULT 'idle';
