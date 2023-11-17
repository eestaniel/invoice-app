/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invoices_uid_key" ON "invoices"("uid");
