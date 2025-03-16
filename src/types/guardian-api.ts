interface ResponseGAPI {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  orderBy: string;
}
export interface ResponseGAPIContent extends ResponseGAPI {
  results: ArticleGAPI[];
}

export interface ResponseGAPISection extends ResponseGAPI {
  results: SectionGAPI[];
}
export interface ArticleGAPI {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface SectionGAPI {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  editions: EditionGAPI[];
}

export interface EditionGAPI {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  code: string;
}
