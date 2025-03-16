import { APIErrorInterface } from "@/types/error";
import { QueryClient } from "@tanstack/react-query";

const MAX_RETRIES = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if ((error as APIErrorInterface).response?.status === 429) {
          if (failureCount < MAX_RETRIES) {
            return true;
          }
        }

        const canRetry =
          error.message.includes("timeout") || error.message.includes("500");

        if (canRetry) {
          return failureCount < MAX_RETRIES;
        }
        return false;
      },
      retryDelay: 3 * 1000,
    },
  },
});
