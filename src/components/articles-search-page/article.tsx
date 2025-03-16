import { cn } from "@/lib/utils";
import { ArticleInterface } from "@/types/globals";
import dayjs from "dayjs";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"], // Choose the weights you need
  style: ["normal", "italic"],
});

export default function Article({ data }: { data: ArticleInterface }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-md flex flex-col shadow-sm gap-2 mb-4 w-full max-w-[1000px] p-4 relative">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p className={cn(roboto.className, "font-[600] text-lg")}>
            {data.title}
          </p>
          <a target="blank" href={data.url} className="text-blue-600 text-sm">
            View original
          </a>
        </div>

        <p>{dayjs(data.date || "").format("DD/MM/YYYY")}</p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <p>{data.subject}</p>
        {data.mainText ? (
          <div className="w-full">
            {isExpanded && <p className="mb-2">{data.mainText}</p>}
            <a
              className="mt-4 cursor-pointer w-full text-sm text-blue-500 text-center"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "Read less" : "Read more"}
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
      <p
        className={cn(
          "absolute bottom-2 right-2 p-2 w-fit text-sm rounded-md text-foreground font-[800]",
          data.source === "The Guardian"
            ? "bg-green-600/50"
            : "bg-purple-800/45"
        )}
      >
        {data.source}
      </p>
    </div>
  );
}
