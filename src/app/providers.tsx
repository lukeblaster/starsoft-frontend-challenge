'use client';

import { store } from '@/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { getQueryClient } from './get-query-client';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
