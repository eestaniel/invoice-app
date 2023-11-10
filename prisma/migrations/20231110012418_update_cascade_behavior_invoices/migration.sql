-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_bill_from_id_fkey";

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_bill_from_id_fkey" FOREIGN KEY ("bill_from_id") REFERENCES "billfrom"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
