import { ArticleNYTAPI, NYTArticlesAPIResponse } from "./nyt-api";

export interface ArticleNewsAPI {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsAPISource {
  id: string;
  name: string;
}

export interface NewsAPISourceResponse {
  status: string;
  sources: NewsAPISource[];
}

export interface NewsAPIArticlesResponse {
  status: string;
  totalResults: number;
  articles: ArticleNewsAPI[];
}

export function isNewsAPIArticle(
  response: ArticleNewsAPI | ArticleNYTAPI
): response is ArticleNewsAPI {
  return (response as ArticleNewsAPI).publishedAt !== undefined;
}

export function isNewsAPIResponse(
  response: NYTArticlesAPIResponse | NewsAPIArticlesResponse
): response is NewsAPIArticlesResponse {
  return (response as NewsAPIArticlesResponse).articles !== undefined;
}
