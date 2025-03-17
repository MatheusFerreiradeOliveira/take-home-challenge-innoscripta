import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ArticlesContainer from "./articles-container"; // Adjust the path
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("src/hooks/useInfiniteArticles", () => ({
  useInfiniteArticles: jest.fn(),
}));

const queryClient = new QueryClient();

global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: "0px",
  thresholds: [1],
  takeRecords: jest.fn(),
}));

describe("ArticlesContainer", () => {
  it("displays a spinner when data is loading", async () => {
    const mockUseInfiniteArticles =
      require("src/hooks/useInfiniteArticles").useInfiniteArticles;
    mockUseInfiniteArticles.mockReturnValue({
      data: null,
      isPending: true,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ArticlesContainer />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders articles when data is available", async () => {
    const mockUseInfiniteArticles =
      require("src/hooks/useInfiniteArticles").useInfiniteArticles;
    mockUseInfiniteArticles.mockReturnValue({
      data: {
        pages: [
          [
            {
              title: "Test Article",
              date: "2024-03-01",
              subject: "Test",
              mainText: "Main text",
              url: "http://example.com",
              source: "The Guardian",
            },
          ],
        ],
      },
      isPending: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ArticlesContainer />
      </QueryClientProvider>
    );

    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });
});
