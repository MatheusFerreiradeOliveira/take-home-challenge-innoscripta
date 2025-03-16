import NewsContainer from "@/components/news-page/news-container";
import NewsFilter from "@/components/news-page/news-filter";

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
