/**
 * Asynchronously loads the component for NotFoundPage
 */

import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

export const TimeLine = lazyLoad(
  () => import('./index'),
  module => module.TimeLine,
  {
    fallback: <LoadingIndicator />,
  },
);
