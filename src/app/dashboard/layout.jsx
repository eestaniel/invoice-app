import SiveNavigation from "@/app/dashboard/components/SiveNavigation";
import {InvoiceProvider} from "@/app/dashboard/context/InvoiceContext";

export default function DashboardLayout({children}) {
  return (


    <section className="invoice-container flex flex-row  m-0 p-0 justify-start  w-full relative
    h-fit">
      <SiveNavigation/>
      <div className="w-full h-fit justify-center">
        <InvoiceProvider>
          {children}
        </InvoiceProvider>
      </div>

    </section>
  );
}
