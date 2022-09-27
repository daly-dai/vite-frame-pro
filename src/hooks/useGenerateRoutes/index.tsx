import { FunctionRule, RouteObject } from '@/types/router';
import { arrayToTree } from '@utils/tree';
import { concat } from 'lodash-es';
import disposeRouter from '../useDisposeRouter';

const staticPath = '/src/service/router/';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let RouterLoading: FunctionRule;
let staticRoutes: RouteObject[] = [];

function rootRouteData(modules: any): RouteObject[] {
  const root = (modules[`${staticPath}root.ts`] as any).default;

  root.forEach((item: RouteObject) => {
    item['parentId'] = '';
  });

  return root;
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
      console.log(modules[modulesPath].default, modulesPath, 9090999999);
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

  const result: RouteObject[] = arrayToTree(modulesList, 'path');

  return result;
}
// 需要权限的路由
const pageRoutes = disposeRouter(generatePathConfig());

// 默认初始路由
const defaultRoutes = disposeRouter(staticRoutes);
console.log(staticRoutes, 8888888);

export { defaultRoutes };
export default pageRoutes;
