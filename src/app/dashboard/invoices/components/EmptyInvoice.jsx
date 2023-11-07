import Image from "next/image";

export default function EmptyInvoice() {
  return (
    <div className="w-full h-full group flex flex-col justify-center items-center gap-[4.125rem]">
      <Image
        src="/illustration-empty.svg"
        alt="avatar"
        width={240}
        height={200}
        quality={100}
        className="rounded-full"
      />
      <div className="text-group flex flex-col gap-[1.5rem]">
        <p className="heading-m">There is nothing here</p>
        <p className="body-v w-[193px] text-6-muted text-center"> Create an invoice by clicking the
          New Invoice button and get started</p>
      </div>

    </div>
  );
}
