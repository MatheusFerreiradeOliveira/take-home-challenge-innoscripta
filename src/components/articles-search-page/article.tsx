import { ArticleInterface } from "@/types/globals";

export default function Article({ data }: { data: ArticleInterface }) {
  return (
    <div>
      <div>
        {data.title}
        {data.date}
      </div>
      <div>
        {data.subject}
        {data.source}
      </div>
    </div>
  );
}
