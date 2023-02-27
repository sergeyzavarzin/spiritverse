"use client";

import type { AppRouter } from "@spirit/api";
import { transformer } from "@spirit/api/transformer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { PropsWithChildren } from "react";
import { getBaseUrl } from "../utils/getBaseUrl";

export const trpc = createTRPCReact<AppRouter>({
  unstable_overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});

const showDevtools =
  process.env.NEXT_PUBLIC_SHOW_REACT_QUERY_DEVTOOLS === "true";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: () => true,
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
  transformer,
});

export function TRPCProvider(props: PropsWithChildren) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
        {false &&
          showDevtools && ( // TODO: not working -> failing on mount - fix
            <ReactQueryDevtools
              initialIsOpen={false}
              panelPosition="bottom"
              position="bottom-right"
            />
          )}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
