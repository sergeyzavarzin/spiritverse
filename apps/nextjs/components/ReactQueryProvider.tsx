'use client';

import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
    },
  },
});

const showDevtools = process.env.NEXT_PUBLIC_SHOW_REACT_QUERY_DEVTOOLS !== 'false';

export const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {showDevtools && <ReactQueryDevtools initialIsOpen={false} panelPosition="bottom" position="bottom-right" />}
    </QueryClientProvider>
  );
};
