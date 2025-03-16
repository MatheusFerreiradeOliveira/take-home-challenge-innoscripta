import ArticlesContainer from "@/components/articles-search-page/articles-container";
import ArticlesFilter from "@/components/articles-search-page/articles-filter";
import KeyworkInput from "@/components/articles-search-page/keyword-input";

export default function ArticlesSearch() {
  return (
    <main className="defaultPageClasses flex-col items-center py-10 px-4 md:px-10">
      <section className="w-full flex flex-col items-center justify-center gap-4">
        <KeyworkInput />
        <ArticlesFilter />
      </section>
      <section className="w-full flex flex-col justify-center items-center">
        <ArticlesContainer />
      </section>
    </main>
  );
}
