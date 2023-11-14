/*
  Warnings:

  - The `post_code` column on the `billfrom` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `post_code` column on the `billto` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "billfrom" DROP COLUMN "post_code",
ADD COLUMN     "post_code" INTEGER;

-- AlterTable
ALTER TABLE "billto" DROP COLUMN "post_code",
ADD COLUMN     "post_code" INTEGER;
