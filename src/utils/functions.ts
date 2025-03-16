import { PublicationInterface } from "@/types/globals";
import { ArticleNewsAPI, isNewsAPIArticle } from "@/types/news-api";
import { ArticleNYTAPI } from "@/types/nyt-api";

export const ALL_CATEGORIES = [
  "Adventure Sports",
  "Arts & Leisure",
  "Arts",
  "Automobiles",
  "Blogs",
  "Books",
  "Booming",
  "Business Day",
  "Business",
  "Cars",
  "Circuits",
  "Classifieds",
  "Connecticut",
  "Crosswords & Games",
  "Culture",
  "DealBook",
  "Dining",
  "Editorial",
  "Education",
  "Energy",
  "Entrepreneurs",
  "Environment",
  "Escapes",
  "Fashion & Style",
  "Fashion",
  "Favorites",
  "Financial",
  "Flight",
  "Food",
  "Foreign",
  "Generations",
  "Giving",
  "Global Home",
  "Health & Fitness",
  "Health",
  "Home & Garden",
  "Home",
  "Jobs",
  "Key",
  "Letters",
  "Long Island",
  "Magazine",
  "Market Place",
  "Media",
  "Men's Health",
  "Metro",
  "Metropolitan",
  "Movies",
  "Museums",
  "National",
  "Nesting",
  "Obits",
  "Obituaries",
  "Obituary",
  "OpEd",
  "Opinion",
  "Outlook",
  "Personal Investing",
  "Personal Tech",
  "Play",
  "Politics",
  "Regionals",
  "Retail",
  "Retirement",
  "Science",
  "Small Business",
  "Society",
  "Sports",
  "Style",
  "Sunday Business",
  "Sunday Review",
  "Sunday Styles",
  "T Magazine",
  "T Style",
  "Technology",
  "Teens",
  "Television",
  "The Arts",
  "The Business of Green",
  "The City Desk",
  "The City",
  "The Marathon",
  "The Millennium",
  "The Natural World",
  "The Upshot",
  "The Weekend",
  "The Year in Pictures",
  "Theater",
  "Then & Now",
  "Thursday Styles",
  "Times Topics",
  "Travel",
  "U.S.",
  "Universal",
  "Upshot",
  "UrbanEye",
  "Vacation",
  "Washington",
  "Wealth",
  "Weather",
  "Week in Review",
  "Week",
  "Weekend",
  "Westchester",
  "Wireless Living",
  "Women's Health",
  "Working",
  "Workplace",
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
      mainText: item.lead_paragraph,
      source: item.source,
      subject: item.abstract,
      title: item.headline.main || item.headline.name,
      url: item.web_url,
      author: item.byline.original || "",
    };
  }

  return newPub;
};
