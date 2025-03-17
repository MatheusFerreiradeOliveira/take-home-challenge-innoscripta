import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewsContainer from "./news-container";
import { useFilters } from "@/hooks/useFilters";
import { useInfiniteNews } from "@/hooks/useInfiniteNews";
import {
  QueryClient,
  QueryClientProvider,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

jest.mock("src/hooks/useFilters");
jest.mock("src/hooks/useInfiniteNews");

global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: "0px",
  thresholds: [1],
  takeRecords: jest.fn(),
}));

const mockedUseFilters = useFilters as jest.MockedFunction<typeof useFilters>;
const mockedUseInfiniteNews = useInfiniteNews as jest.MockedFunction<
  typeof useInfiniteNews
>;

const mockUpdateValues = jest.fn();
const mockPublications = {
  pages: [
    [
      {
        title: "Publication 1",
        source: "Source 1",
        url: "https://example.com/1",
        date: "2022-01-01",
        image: "https://example.com/image1.jpg",
        author: "Author 1",
        subject: "Subject 1",
        mainText: "Main Text 1",
      },
    ],
  ],
  hasNextPage: true,
  pageParams: [1],
};

// @ts-ignore
mockedUseInfiniteNews.mockReturnValue({
  data: mockPublications as UseInfiniteQueryResult<
    typeof mockPublications,
    Error
  >["data"], // Specify the correct type for `data`
  isPending: false,
  fetchNextPage: jest.fn(),
  hasNextPage: true,
  isFetchingNextPage: false,
});

const renderComponent = () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <NewsContainer />
    </QueryClientProvider>
  );
};

beforeEach(() => {
  jest.clearAllMocks();

  mockedUseFilters.mockReturnValue({
    values: { orderBy: "date" },
    updateValues: mockUpdateValues,
  });
});

describe("NewsContainer Component", () => {
  it("renders correctly", () => {
    renderComponent();

    expect(screen.getAllByText("Publication 1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Source 1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("01/01/2022").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Author 1").length).toBeGreaterThan(0);
  });

  it("renders the Publication component for each publication", () => {
    renderComponent();

    expect(screen.getAllByText("Publication 1").length).toBeGreaterThan(0);
  });
});
