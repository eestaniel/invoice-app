/*
  Warnings:

  - You are about to drop the column `address` on the `billfrom` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `billto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "billfrom" DROP COLUMN "address",
ADD COLUMN     "street_address" TEXT;

-- AlterTable
ALTER TABLE "billto" DROP COLUMN "address",
ADD COLUMN     "street_address" TEXT;
