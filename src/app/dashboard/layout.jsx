"use client"
import SiveNavigation from "@/app/dashboard/components/SiveNavigation";
import {InvoiceProvider} from "@/app/dashboard/context/InvoiceContext";
import {useContext, useEffect} from "react";
import {AuthContext} from "@/app/dashboard/context/AuthContext";
import { usePathname, redirect } from 'next/navigation'

export default function DashboardLayout({children}) {
  const {currentUser} = useContext(AuthContext);
  const pathname = usePathname();

  const checkAuth = () => {
    if (!currentUser?.uid) {
      redirect('/')
    }
  }

  useEffect(() => {
    checkAuth();
  }, [pathname, currentUser]);


  return (


    <section className="invoice-container flex flex-col xl:flex-row  m-0 p-0 justify-start  w-full relative
    h-fit">
      <InvoiceProvider>
        <SiveNavigation/>
        <div className="invoice-content w-full h-fit justify-cente min-h-screenr">
          {children}
        </div>
      </InvoiceProvider>

    </section>
  );
}
