import { FunctionRule } from '@/types/router';
import React, { lazy, Suspense } from 'react';

function UseLazyLoad(element: any, RouterLoading: FunctionRule) {
  const Loading = RouterLoading || <></>;
  const LazyElement = lazy(element);

  return (
    <Suspense fallback={<Loading />}>
      <LazyElement />
    </Suspense>
  );
}

export default UseLazyLoad;
