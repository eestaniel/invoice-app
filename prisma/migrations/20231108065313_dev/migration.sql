-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "billfrom" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "address" TEXT,
    "city" TEXT,
    "post_code" TEXT,
    "country" TEXT,

    CONSTRAINT "billfrom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billto" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "client_name" TEXT,
    "client_email" TEXT,
    "address" TEXT,
    "city" TEXT,
    "post_code" TEXT,
    "country" TEXT,

    CONSTRAINT "billto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "bill_from_id" UUID,
    "bill_to_id" UUID,
    "invoice_date" DATE,
    "payment_terms" TEXT,
    "project_description" TEXT,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemlist" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "invoice_id" UUID,
    "item_name" TEXT,
    "quantity" INTEGER,
    "price" DECIMAL,

    CONSTRAINT "itemlist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_bill_from_id_fkey" FOREIGN KEY ("bill_from_id") REFERENCES "billfrom"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_bill_to_id_fkey" FOREIGN KEY ("bill_to_id") REFERENCES "billto"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "itemlist" ADD CONSTRAINT "itemlist_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
