import { FunctionRule, GuardRule, RouteObject } from '@/types/router';
import { operationAttrToNodes } from '@/utils/tree';
import { cloneDeep } from 'lodash-es';
import React, { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// import { useRoutes } from 'react-router-dom';

let onRouterBefore: any;
let RouterLoading: FunctionRule;

//路由导航，设置redirect重定向 和 auth权限
function Guard({ element, meta }: { element: any; meta: any }) {
  const { pathname } = useLocation();
  const nextPath = onRouterBefore ? onRouterBefore(meta, pathname) : pathname;

  if (nextPath && nextPath !== pathname) {
    element = <Navigate to={nextPath} replace={true} />;
  }

  return element;
}

// 路由懒加载
function lazyLoadRouters(element: any, meta = {}) {
  const LazyElement = lazy(element);

  const GetElement = () => {
    return (
      <Suspense fallback={<RouterLoading />}>
        <LazyElement />
      </Suspense>
    );
  };

  return Guard({ element: GetElement(), meta });
}

function transRoutes(routes: RouteObject[]) {
  const stashRoutes = cloneDeep(routes);
  const result = operationAttrToNodes(stashRoutes, (route: RouteObject) => {
    if (route.redirect) {
      route.element = <Navigate to={route.redirect} replace={true} />;
    }

    if (route.element) {
      route.element = lazyLoadRouters(route.element, route.meta);
    }

    ['redirect', 'parentId'].forEach((name) => delete route[name]);
  });

  return result;
}

function RouterGuard(params: GuardRule) {
  onRouterBefore = params.onRouterBefore;
  RouterLoading = () => params.loading || <></>;
  return useRoutes(transRoutes(params.routers));
}

export default RouterGuard;
