"use client"
import Image from "next/image";
import {useContext} from "react";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";

export default function SiveNavigation() {
  const {toggleNightMode, theme, isNightMode} = useContext(InvoiceContext);


  return (
    <div className={`z-50 bg-red h-[72px] lg:h-[80px] xl:h-screen min-w-[7rem] sticky top-0 overflow-y-hidden 
    ${theme.background}`}>
      <div
        className="nav-container flex flex-row xl:flex-col justify-end lg:justify-start h-[72px] lg:h-[80px]  xl:h-screen
        bg-[#373B53] m-0 p-0 overflow-clip rounded-none xl:rounded-icon1 z-50  w-full"
      >
        <div
          className="icon-container  h-[72px] lg:h-[80px] xl:h-[103px]  w-[72px] xl:w-full bg-yellow-400 rounded-icon1 relative overflow-clip">
          <div className="icon1 bg-1-primary h-full w-full relative flex justify-center items-center">
            {/* logo icon*/}
            <svg className="z-50 h-[40%] w-[40%]" width="40" height="38" viewBox="0 0 40 38" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.6942 0.292175L20 18.9999L29.3058 0.292175C35.6645 3.64073 40 10.314 40 17.9999C40 29.0456 31.0457 37.9999 20 37.9999C8.9543 37.9999 0 29.0456 0 17.9999C0 10.314 4.33546 3.64073 10.6942 0.292175Z"
                fill="white"/>
            </svg>
          </div>
          <div className="icon2 bg-2-highlight h-full w-full absolute top-[50%] rounded-icon2 z-0"></div>
        </div>

        {/* nav content */}
        <div
          className="nav-content flex flex-row xl:flex-col h-full xl:h-auto grow justify-end pr-6 xl:pr-0 xl:mb-8 items-center ">
          {/* dark mode icon */}
          {isNightMode ?

            /* Sun */
            <svg className="h-5 w-5 xl:h-5 xl:w-full group flex lg:justify-center "
                 onClick={() => toggleNightMode()}
                 width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path className="group-hover:cursor-pointer group-hover:fill-5-secondary"
                d="M9.817 16.18a.96.96 0 01.953.848l.007.112v1.535a.96.96 0 01-1.913.112l-.006-.112V17.14c0-.53.43-.96.96-.96zm-4.5-1.863c.347.346.373.89.08 1.266l-.08.09-1.085 1.087a.96.96 0 01-1.437-1.267l.08-.09 1.086-1.086a.959.959 0 011.357 0zm10.356 0l1.086 1.086a.959.959 0 11-1.357 1.357l-1.085-1.086a.959.959 0 111.356-1.357zM9.817 4.9a4.924 4.924 0 014.918 4.918 4.924 4.924 0 01-4.918 4.918A4.924 4.924 0 014.9 9.818 4.924 4.924 0 019.817 4.9zm8.858 3.958a.96.96 0 110 1.919H17.14a.96.96 0 110-1.92h1.535zm-16.18 0a.96.96 0 01.112 1.912l-.112.007H.96a.96.96 0 01-.112-1.913l.112-.006h1.534zm14.264-5.983a.96.96 0 010 1.357l-1.086 1.086a.96.96 0 11-1.356-1.357l1.085-1.086a.96.96 0 011.357 0zm-12.617-.08l.09.08 1.086 1.086A.96.96 0 014.05 5.398l-.09-.08-1.086-1.086a.959.959 0 011.267-1.436zM9.817 0c.53 0 .96.43.96.96v1.535a.96.96 0 01-1.92 0V.96c0-.53.43-.96.96-.96z"
                fill="#858BB2" fillRule="nonzero"/>
            </svg>
            :
            /* Moon */
            <svg className="h-5 w-5 xl:h-5 xl:w-full group"
                 onClick={() => toggleNightMode()}
                 width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="group-hover:cursor-pointer group-hover:fill-5-secondary"
                    d="M19.5016 11.3423C19.2971 11.2912 19.0927 11.3423 18.9137 11.4701C18.2492 12.0324 17.4824 12.4924 16.639 12.7991C15.8466 13.1059 14.9776 13.2592 14.0575 13.2592C11.9872 13.2592 10.0958 12.4158 8.74121 11.0611C7.38658 9.70649 6.54313 7.81512 6.54313 5.74483C6.54313 4.87582 6.69649 4.03237 6.95208 3.26559C7.23323 2.4477 7.64217 1.70649 8.17891 1.06751C8.40895 0.786362 8.35783 0.377416 8.07668 0.147384C7.89776 0.0195887 7.69329 -0.0315295 7.48882 0.0195887C5.31629 0.607448 3.42492 1.91096 2.07029 3.64898C0.766773 5.36144 0 7.48285 0 9.78317C0 12.5691 1.1246 15.0995 2.96486 16.9397C4.80511 18.78 7.3099 19.9046 10.1214 19.9046C12.4728 19.9046 14.6454 19.0867 16.3834 17.732C18.147 16.3519 19.4249 14.3838 19.9617 12.1346C20.0639 11.7768 19.8594 11.419 19.5016 11.3423Z"
                    fill="#7E88C3"/>
            </svg>}
        </div>
        <hr className="border-[#494E6E]"/>
        {/* nav footer */}
        <div className="nav-footer h-full xl:h-[15%] w-[80px] xl:w-full px-6 py-5 xl:p-4 flex justify-center items-center
        border-l-[#494E6E] border-l-[1px] xl:border-none ">

          <div className="avatar">
            <Image
              src="/avatar.png"
              alt="avatar"
              width={50}
              height={50}
              quality={100}
              className="rounded-full h-[32px] w-[32px] "
            />
          </div>
        </div>

      </div>
    </div>
  );
}
