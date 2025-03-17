import { render, screen, fireEvent } from "@testing-library/react";
import Publication from "./publication";
import { PublicationInterface } from "@/types/globals";

jest.mock("dayjs", () => () => ({
  format: jest.fn(() => "01/01/2022"),
}));

const mockPublication: PublicationInterface = {
  source: "News Source",
  url: "https://example.com",
  date: "2022-01-01",
  image: "https://example.com/image.jpg",
  title: "Sample Publication Title",
  author: "John Doe",
  subject: "Technology",
  mainText: "This is the main text of the publication.",
};

describe("Publication Component", () => {
  it("renders publication source, title, and date correctly", () => {
    render(<Publication pub={mockPublication} />);

    expect(screen.getAllByText("News Source").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Sample Publication Title").length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("01/01/2022").length).toBeGreaterThan(0);
    expect(screen.getAllByText("John Doe").length).toBeGreaterThan(0);
  });

  it("renders a fallback image when no pub.image is provided", () => {
    const publicationWithoutImage = { ...mockPublication, image: "" };
    render(<Publication pub={publicationWithoutImage} />);
    const image = screen.getByAltText("Pub");
    expect(image).toBeInTheDocument();
  });

  it("shows 'Read more' and expands content when clicked", () => {
    render(<Publication pub={mockPublication} />);
    expect(screen.getByText("Read more")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Read more"));
    expect(screen.getByText("Read less")).toBeInTheDocument();
    expect(screen.getByText(mockPublication.mainText)).toBeInTheDocument();
  });

  it("shows 'Read less' and collapses content when clicked", () => {
    render(<Publication pub={mockPublication} />);
    fireEvent.click(screen.getByText("Read more"));
    expect(screen.getByText("Read less")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Read less"));
    expect(screen.getByText("Read more")).toBeInTheDocument();
    expect(
      screen.queryByText(mockPublication.mainText)
    ).not.toBeInTheDocument();
  });

  it("formats the date using dayjs correctly", () => {
    render(<Publication pub={mockPublication} />);
    expect(screen.getAllByText("01/01/2022").length).toBeGreaterThan(0);
  });

  it("handles missing author and displays 'Unknown author'", () => {
    const publicationWithoutAuthor = { ...mockPublication, author: "" };
    render(<Publication pub={publicationWithoutAuthor} />);
    expect(screen.getAllByText("Unknown author").length).toBeGreaterThan(0);
  });

  it("correctly displays author tooltip when hovering over a long author name", () => {
    const longAuthor =
      "A very long author name that should trigger the tooltip";
    const publicationWithLongAuthor = {
      ...mockPublication,
      author: longAuthor,
    };
    render(<Publication pub={publicationWithLongAuthor} />);
    const authorElement = screen.getAllByText(longAuthor);
    fireEvent.mouseOver(authorElement[0]);
    expect(screen.getAllByText(longAuthor).length).toBeGreaterThan(0);
  });
});
