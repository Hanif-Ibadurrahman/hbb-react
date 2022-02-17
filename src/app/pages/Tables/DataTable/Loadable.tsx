/**
 * Asynchronously loads the component for NotFoundPage
 */

// import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

export const DataTables = lazyLoad(
  () => import('./index'),
  module => module.DataTables,
  {
    fallback: <LoadingIndicator />,
  },
);
