import React from "react";

const apis = [
  {
    name: "News API",
    url: "https://newsapi.org/",
  },
  {
    name: "The Guardian API",
    url: "https://open-platform.theguardian.com/documentation/",
  },
  {
    name: "The New York Times API",
    url: "https://developer.nytimes.com/docs/articlesearch-product/1/overview",
  },
];

export default function Footer() {
  return (
    <div className="text-foreground order-3 bg-background border-t-[2px] py-2 border-t-slate-200 min-h-footerHeight flex flex-col md:flex-row gap-6 justify-between items-center w-full px-10">
      <div className="text-sm md:text-lg">
        <b>© Innoscripta</b>
      </div>
      <div className="flex flex-row items-center gap-6 md:gap-10 text-sm xl:text-lg">
        <p className="">Public APIs:</p>
        <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4">
          {apis.map((api) => (
            <a
              key={api.name}
              target="blank"
              className="w-full sm:w-fit text-center cursor-pointer p-2 rounded-sm bg-foreground text-background "
              href={api.url}
            >
              {api.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
