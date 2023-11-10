-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_bill_from_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_bill_to_id_fkey";

-- AlterTable
ALTER TABLE "billfrom" ADD COLUMN     "invoice_id" UUID;

-- AlterTable
ALTER TABLE "billto" ADD COLUMN     "invoice_id" UUID;

-- AddForeignKey
ALTER TABLE "billfrom" ADD CONSTRAINT "billfrom_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "billto" ADD CONSTRAINT "billto_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
