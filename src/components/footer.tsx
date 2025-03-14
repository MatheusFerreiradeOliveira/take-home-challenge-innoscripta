import Image from "next/image";
import React from "react";

const apis = [
  {
    name: "News API",
    url: "https://newsapi.org/",
  },
];

export default function Footer() {
  return (
    <div className="text-foreground order-3 bg-background border-t-[2px] border-t-slate-200 min-h-footerHeight flex flex-col md:flex-row justify-between items-center w-full text-gray-200 px-10">
      <div className="">
        <b>© Innoscripta</b>
      </div>
      <div className="flex flex-row items-center gap-10">
        <p className="text-sm ">Public APIs:</p>
        <div className="flex flex-row items-center gap-4">
          <div className="bg-blue-600 white tracking-tighter px-[5px] pt-[4px] pb-[4px]">
            News
            <span className="bg-white text-blue-600 px-[0.2rem] mx-[0.2rem] mt-[3px] mb-[8px]">
              API
            </span>
          </div>

          <Image
            width={180}
            height={180}
            alt="The Guardian"
            src={"/images/theguardian-op-logo.svg"}
          />
        </div>
      </div>
    </div>
  );
}
