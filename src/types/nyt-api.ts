export interface ArticleNYTAPI {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_section: string;
  print_page: string;
  source: string;
  multimedia: MultimedumNYTAPI[];
  headline: HeadlineNYTAPI;
  keywords: KeywordNYTAPI[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: BylineNYTAPI;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface MultimedumNYTAPI {
  rank: number;
  subtype: string;
  caption: any;
  credit: any;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: LegacyNYTAPI;
  subType: string;
  crop_name: string;
}

export interface LegacyNYTAPI {
  xlarge?: string;
  xlargewidth?: number;
  xlargeheight?: number;
  thumbnail?: string;
  thumbnailwidth?: number;
  thumbnailheight?: number;
  widewidth?: number;
  wideheight?: number;
  wide?: string;
}

export interface HeadlineNYTAPI {
  main: string;
  kicker: any;
  content_kicker: any;
  print_headline: string;
  name: any;
  seo: any;
  sub: any;
}

export interface KeywordNYTAPI {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface BylineNYTAPI {
  original: string;
  person: PersonNYTAPI[];
  organization: any;
}

export interface PersonNYTAPI {
  firstname: string;
  middlename: any;
  lastname: string;
  qualifier: any;
  title: any;
  role: string;
  organization: string;
  rank: number;
}

export interface NYTArticlesAPIResponse {
  status: string;
  copyright: string;
  response: {
    docs: ArticleNYTAPI[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}
