/*
  Warnings:

  - A unique constraint covering the columns `[custom_id]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invoices_custom_id_key" ON "invoices"("custom_id");
