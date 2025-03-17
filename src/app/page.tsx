import NewsContainer from "@/components/home-page/news-container/news-container";
import NewsFilter from "@/components/home-page/news-filter";

export default function Home() {
  return (
    <main className="defaultPageClasses flex-row justify-between">
      <NewsFilter />
      <section className="w-full">
        <NewsContainer />
      </section>
    </main>
  );
}
