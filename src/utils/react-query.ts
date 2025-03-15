import { QueryClient } from "@tanstack/react-query";

const MAX_RETRIES = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        console.log("this is the error", error);

        if (error instanceof APIError && error.response?.status === 429) {
          // Retry after the retry interval based on 'Retry-After' header or a default value
          const retryAfter = error.response.headers.get("Retry-After") || "60"; // Default to 60 seconds if not provided
          console.log(
            `Rate limit exceeded. Retrying in ${retryAfter} seconds...`
          );

          // You can adjust the retry logic as needed
          if (failureCount < MAX_RETRIES) {
            return true; // Delay in milliseconds
          }
        }

        const canRetry =
          error.message.includes("timeout") ||
          // error.code === "ERR_BAD_RESPONSE" ||
          error.message.includes("500");

        if (canRetry) {
          return failureCount < MAX_RETRIES;
        }
        return false;
      },
      retryDelay: 2 * 1000,
    },
    mutations: {
      retry: (failureCount, error) => {
        const canRetry =
          error.message.includes("timeout") ||
          // error.code === "ERR_BAD_RESPONSE" ||
          // error.code === "ERR_BAD_REQUEST" ||
          error.message.includes("500");
        if (canRetry) {
          return failureCount < MAX_RETRIES;
        }
        return false;
      },
      retryDelay: 2 * 1000,
    },
  },
});
