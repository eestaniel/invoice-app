import SiveNavigation from "@/app/dashboard/components/SiveNavigation";
import {InvoiceProvider} from "@/app/dashboard/invoices/context/InvoiceContext";

export default function DashboardLayout({children}) {
  return (


    <section className="flex flex-row w-full overflow-x-hidden">
      <SiveNavigation/>
      <InvoiceProvider>
        {children}
      </InvoiceProvider>

    </section>
  );
}
