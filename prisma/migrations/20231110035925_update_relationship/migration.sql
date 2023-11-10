/*
  Warnings:

  - You are about to drop the column `bill_from_id` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `bill_to_id` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_date` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "bill_from_id",
DROP COLUMN "bill_to_id",
DROP COLUMN "invoice_date";
