import { FunctionRule, GuardRule, RouteObject } from '@/types/router';
import { operationAttrToNodes } from '@/utils/tree';
import { cloneDeep, concat } from 'lodash-es';
import React, { lazy, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';

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

// 设置重定向的数据
function setRedirectData(route: RouteObject) {
  const stashRoute = cloneDeep(route);

  if (stashRoute?.children) delete stashRoute?.children;

  stashRoute['element'] = (
    <Navigate to={route.redirect as string} replace={true} />
  );

  return stashRoute;
}
// 格式化相关路由
function transRoutes(routes: RouteObject[]) {
  const stashRoutes = cloneDeep(routes);
  const redirectList: RouteObject[] = [];

  const result = operationAttrToNodes(stashRoutes, (route: RouteObject) => {
    if (route.element) {
      route.element = lazyLoadRouters(route.element, route.meta);
    }

    if (route.redirect) {
      const redirectItem = setRedirectData(route);

      redirectList.push(redirectItem);
    }

    ['redirect', 'parentId'].forEach((name) => delete route[name]);
  });

  return concat(redirectList, result);
}

function RouterGuard(params: GuardRule) {
  onRouterBefore = params.onRouterBefore;
  RouterLoading = () => params.loading || <></>;
  return useRoutes(transRoutes(params.routers));
}

export default RouterGuard;
