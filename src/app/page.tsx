import NewsContainer from "@/components/news-container";
import NewsFilter from "@/components/news-filter";
import Separator from "@/components/separator";
import Image from "next/image";

export default function Home() {
  return (
    <main className="defaultPageClasses flex-row justify-between px-4 md:px-10 lg:px-20">
      <NewsFilter />
      {/* <Separator /> */}
      <section className="w-full">
        <NewsContainer />
      </section>
    </main>
  );
}
