import Image from "next/image";
import { useState } from "react";

export default function Publication() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b-slate-200 border-b-[2px] rounded-md p-4 max-w-publication">
      <div className="flex py-4 items-center justify-between">
        <p>The New York Times</p>
        <p>31/12/1998</p>
      </div>
      <div className="relative">
        <Image
          width={500}
          height={700}
          alt="Pub"
          src={
            "https://www.irishtimes.com/resizer/v2/5Q6GGLLXWFA7DCEMVQLJ6XJUW4.jpg?smart=true&auth=99db1fb18a6bc9b3fbc5453efd5000eed4e4ca882867133f4e0334e5f9d77ff9&width=1200&height=630"
          }
          className="rounded-sm"
        />
        <h2 className="text-white w-full font-[600] z-50 absolute text-center bottom-2 shadow-lg">
          Title
        </h2>
      </div>
      <div className="flex flex-col w-full">
        <p>Subject</p>
        <p>Source</p>
        {isExpanded && <p>Content</p>}
        <a
          className="cursor-pointer w-full text-sm text-blue-500 text-center"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </a>
      </div>
    </div>
  );
}
