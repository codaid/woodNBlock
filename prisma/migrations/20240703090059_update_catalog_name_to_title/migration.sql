/*
  Warnings:

  - You are about to drop the column `name` on the `Catalog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Catalog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Catalog` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Catalog_name_key";

-- AlterTable
ALTER TABLE "Catalog" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Catalog_title_key" ON "Catalog"("title");
