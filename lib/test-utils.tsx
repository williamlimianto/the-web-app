import type { FC, ReactElement } from 'react';

import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

/* React Testing Library */

// Ref: https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllTheProviders: FC = ({ children }) => {
  // wrap children with other providers that you may use, e.g. react-query <QueryClientProvider>
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

/* Re-export testing related helpers */
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
export { default as mockRouter } from 'next-router-mock';
