import ArticlesContainer from "@/components/articles-search-page/articles-container";
import ArticlesFilter from "@/components/articles-search-page/articles-filter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ArticlesSearch() {
  return (
    <main className="defaultPageClasses flex-col">
      <section>
        <Label>Search for articles by any keyword</Label>
        <Input />
      </section>
      <section>
        <ArticlesFilter />
        <ArticlesContainer />
      </section>
    </main>
  );
}
