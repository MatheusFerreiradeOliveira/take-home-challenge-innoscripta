import { render, screen, fireEvent } from "@testing-library/react";
import Article from "./article"; // Adjust import path
import { ArticleInterface } from "@/types/globals";

const mockData: ArticleInterface = {
  title: "Test Article Title",
  url: "https://example.com",
  date: "2024-03-01",
  subject: "Test Subject",
  mainText: "This is the main text of the article.",
  source: "The Guardian",
  image: "",
  author: "",
};

describe("Article Component", () => {
  it("renders title, date, and subject correctly", () => {
    render(<Article data={mockData} />);

    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText("01/03/2024")).toBeInTheDocument();
    expect(screen.getByText(mockData.subject)).toBeInTheDocument();
  });

  it("toggles 'Read more' and 'Read less' text", () => {
    render(<Article data={mockData} />);

    const readMoreButton = screen.getByText("Read more");

    fireEvent.click(readMoreButton);

    expect(screen.getByText(mockData.mainText)).toBeInTheDocument();
    expect(screen.getByText("Read less")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Read less"));

    expect(screen.queryByText(mockData.mainText)).not.toBeInTheDocument();
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  it("renders the 'View original' link correctly", () => {
    render(<Article data={mockData} />);

    const link = screen.getByText("View original");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", mockData.url);
  });

  it("renders the correct source badge with appropriate style", () => {
    const { container } = render(<Article data={mockData} />);
    const sourceBadge = screen.getByText("The Guardian");

    expect(sourceBadge).toBeInTheDocument();
    expect(sourceBadge).toHaveClass("bg-green-600/50");
  });
});
