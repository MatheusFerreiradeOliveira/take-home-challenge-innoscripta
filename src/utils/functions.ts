import { ArticleInterface, PublicationInterface } from "@/types/globals";
import {
  ArticleGAPI,
  isTheGuardianAPIResponse,
  isTheGuardianArticle,
} from "@/types/guardian-api";
import { ArticleNewsAPI, isNewsAPIArticle } from "@/types/news-api";
import { ArticleNYTAPI } from "@/types/nyt-api";

export const ALL_CATEGORIES_NYT = [
  "Arts",
  "Automobiles",
  "Autos",
  "Blogs",
  "Books",
  "Booming",
  "Business",
  "Business Day",
  "Corrections",
  "Crosswords & Games",
  "Crosswords/Games",
  "Dining & Wine",
  "Dining and Wine",
  "Editors' Notes",
  "Education",
  "Fashion & Style",
  "Food",
  "Front Page",
  "Giving",
  "Global Home",
  "Great Homes & Destinations",
  "Great Homes and Destinations",
  "Health",
  "Home & Garden",
  "Home and Garden",
  "International Home",
  "Job Market",
  "Learning",
  "Magazine",
  "Movies",
  "Multimedia",
  "Multimedia/Photos",
  "N.Y. / Region",
  "N.Y./Region",
  "NYRegion",
  "NYT Now",
  "National",
  "New York",
  "New York and Region",
  "Obituaries",
  "Olympics",
  "Open",
  "Opinion",
  "Paid Death Notices",
  "Public Editor",
  "Real Estate",
  "Science",
  "Sports",
  "Style",
  "Sunday Magazine",
  "Sunday Review",
  "T Magazine",
  "T:Style",
  "Technology",
  "The Public Editor",
  "The Upshot",
  "Theater",
  "Times Topics",
  "TimesMachine",
  "Today's Headlines",
  "Topics",
  "Travel",
  "U.S.",
  "Universal",
  "UrbanEye",
  "Washington",
  "Week in Review",
  "World",
  "Your Money",
];

export const convertToPublication = (item: ArticleNYTAPI | ArticleNewsAPI) => {
  let newPub: PublicationInterface = {} as PublicationInterface;

  if (isNewsAPIArticle(item)) {
    newPub = {
      date: item.publishedAt,
      image: item.urlToImage,
      mainText: item.content,
      source: item.source.name,
      subject: item.description,
      title: item.title,
      url: item.url,
      author: item.author ? `By ${item.author}` : "",
    };
  } else {
    let image = "";
    const muldimedia = item.multimedia.find(
      (multimedia) => multimedia.type === "image"
    );

    if (muldimedia) image = `https://static01.nyt.com/${muldimedia.url}`;

    newPub = {
      date: item.pub_date,
      image,
      mainText: item.abstract,
      source: item.source,
      subject: item.lead_paragraph,
      title: item.headline.main || item.headline.name,
      url: item.web_url,
      author: item.byline.original || "",
    };
  }

  return newPub;
};

export const convertToArticle = (item: ArticleNYTAPI | ArticleGAPI) => {
  let newArticle: PublicationInterface = {} as ArticleInterface;

  if (isTheGuardianArticle(item)) {
    newArticle = {
      date: item.webPublicationDate,
      image: "", // item.urlToImage,
      mainText: "",
      source: "The Guardian",
      subject: "",
      title: item.webTitle,
      url: item.webUrl,
      author: "",
    };
  } else {
    let image = "";
    const muldimedia = item.multimedia.find(
      (multimedia) => multimedia.type === "image"
    );

    if (muldimedia) image = `https://static01.nyt.com/${muldimedia.url}`;

    newArticle = {
      date: item.pub_date,
      image,
      mainText: item.lead_paragraph,
      source: item.source,
      subject: item.abstract,
      title: item.headline.main || item.headline.name,
      url: item.web_url,
      author: item.byline.original || "",
    };
  }

  return newArticle;
};
