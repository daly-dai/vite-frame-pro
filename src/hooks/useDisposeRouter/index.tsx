import { FunctionRule, RouteObject } from '@/types/router';
import { operationAttrToNodes } from '@/utils/tree';
import { cloneDeep, concat } from 'lodash-es';
import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
// import { RouteObject } from 'react-router-dom';
// import UseLazyLoad from '../useLazyLoad';

function UseLazyLoad(element: any, RouterLoading?: FunctionRule) {
  const Loading = RouterLoading || (() => <></>);
  const LazyElement = lazy(element);

  return (
    <Suspense fallback={<Loading />}>
      <LazyElement />
    </Suspense>
  );
}

// 设置重定向的数据
function setRedirectData(route: RouteObject) {
  const stashRoute = cloneDeep(route);

  ['redirect', 'parentId', 'meta', 'children'].forEach(
    (name) => delete stashRoute[name]
  );

  if (stashRoute?.children) delete stashRoute?.children;

  stashRoute['element'] = (
    <Navigate to={route.redirect as string} replace={true} />
  );

  return stashRoute;
}

// 处理路由相关的静态数据
const useDisposeRouter = (routes: RouteObject[], loading?: FunctionRule) => {
  const Loading = loading || (() => <></>);
  const stashRoutes = cloneDeep(routes);
  const redirectList: RouteObject[] = [];

  const result = operationAttrToNodes(stashRoutes, (route: RouteObject) => {
    if (route.redirect) {
      const redirectItem = setRedirectData(route);

      redirectList.push(redirectItem);
    }

    if (route.element) {
      route.element = UseLazyLoad(route.element, Loading);
    }

    ['redirect', 'parentId'].forEach((name) => delete route[name]);
  });

  return concat(redirectList, result);
};

export default useDisposeRouter;
