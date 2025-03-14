import { QueryClient } from "@tanstack/react-query";

const MAX_RETRIES = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
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
