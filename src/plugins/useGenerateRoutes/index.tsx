import { FunctionRule, RouteObject } from '@/types/router';
import {
  arrayToTree,
  getTreeMap,
  operationAttrToNodes,
  removeEmptyChildren
} from '@utils/tree';
import { cloneDeep, concat } from 'lodash-es';

import disposeRouter from '../../hooks/useDisposeRouter';

const staticPath = '/src/service/router/';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let RouterLoading: FunctionRule;
let staticRoutes: RouteObject[] = [];

function rootRouteData(modules: any): RouteObject[] {
  const root = (modules[`${staticPath}root.ts`] as any).default;

  function rootMap(arr: RouteObject[], key: string) {
    arr.forEach((item: RouteObject) => {
      item['parentId'] = key;

      if (item?.children?.length) {
        rootMap(item.children, item.path as string);
      }
    });
  }

  const result = cloneDeep(root);
  rootMap(result, '');

  return result;
}

// 生成路由配置信息
function generatePathConfig(loading?: any): RouteObject[] {
  RouterLoading = () => loading || <></>;

  const modules: any = import.meta.glob('/src/service/router/**/*.ts', {
    eager: true
  });

  let modulesList: RouteObject[] = rootRouteData(modules);

  Object.keys(modules).forEach((modulesPath) => {
    if (modulesPath.indexOf('root') > -1) {
      return;
    }
    // 静态白名单页面不作处理
    if (modulesPath.indexOf('static') > -1) {
      staticRoutes = modules[modulesPath].default;
      return;
    }

    const routerData = (modules[modulesPath] as any).default;
    const routePath = modulesPath.replace(staticPath, '').replace('.ts', '');
    const nameList = routePath.split('/');
    const parentId = nameList[nameList?.length - 2];

    routerData.forEach((item: RouteObject) => {
      item['parentId'] = parentId;
      // item.element = lazyLoadRouters(item.element);
    });

    modulesList = concat(modulesList, routerData);
  });

  const routerMap = getTreeMap(cloneDeep(modulesList));
  operationAttrToNodes(routerMap, (item: RouteObject) => {
    item.children = [];
  });

  const result: RouteObject[] = removeEmptyChildren(
    arrayToTree(routerMap, 'path')
  );

  return result;
}
// 需要权限的路由
const pageRoutes = disposeRouter(generatePathConfig());

// 默认初始路由
const defaultRoutes = disposeRouter(staticRoutes);

export { defaultRoutes };
export default pageRoutes;
