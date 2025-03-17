import { PublicationInterface } from "@/types/globals";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { Noto_Serif, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"], // Choose the weights you need
  style: ["normal", "italic"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"], // Choose the weights you need
  style: ["normal", "italic"],
});

export default function Publication({ pub }: { pub: PublicationInterface }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="shadow-sm border-b rounded-md p-4 max-w-publication w-full">
      <div className="flex py-2  justify-between">
        <div className="flex flex-col gap-1">
          <p className={notoSerif.className}>{pub.source}</p>
          <a target="blank" href={pub.url} className="text-blue-600 text-xs">
            view original
          </a>
        </div>

        <p>{pub.date ? dayjs(pub.date).format("DD/MM/YYYY") : ""}</p>
      </div>
      <div className="relative shadow-md border rounded-sm">
        <Image
          width={600}
          height={400}
          alt="Pub"
          src={pub.image || "/images/no-image.png"}
          priority={true}
          className="rounded-sm  object-cover max-h-[400px]"
        />
        <h2
          className={cn(
            "px-2 w-full font-[800] z-10 absolute text-center bottom-2 bg-black/50",
            pub.image ? "text-white" : "text-foreground",
            roboto.className
          )}
          style={{ fontSize: `calc(2.5rem - ${pub.title.length * 0.2}px)` }}
        >
          {pub.title}
        </h2>
      </div>
      <div className="flex flex-col w-full gap-4 py-2  text-justify text-sm/6 ">
        <div
          className={cn(
            "relative flex justify-end",
            pub.author?.length > 40 ? "group" : ""
          )}
        >
          <p className="text-sm text-end px-2 truncate max-w-[300px] cursor-pointer">
            {pub.author || "Unknown author"}
          </p>
          <div className="absolute bg-white text-black text-xs p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 top-full mt-1">
            {pub.author || "Unknown author"}
          </div>
        </div>
        {/* <p className="text-sm w-full text-end px-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {pub.author || "Unknown author"}
        </p> */}
        <p>{pub.subject}</p>
        {isExpanded && <p>{pub.mainText}</p>}
        <a
          className="mt-4 cursor-pointer w-full text-sm text-blue-500 text-center"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </a>
      </div>
    </div>
  );
}
