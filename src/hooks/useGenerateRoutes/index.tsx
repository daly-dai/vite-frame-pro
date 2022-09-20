import { RouteObject } from '@/types/router';
import { arrayToTree } from '@utils/tree';
import { concat } from 'lodash-es';

const staticPath = '/src/service/router/';

function rootRouteData(modules: any): RouteObject[] {
  const root = (modules[`${staticPath}root.ts`] as any).default;

  root.forEach((item: RouteObject) => {
    item['parentId'] = '';
    // item.element = lazyLoad(item.element)
  });

  return root;
}

// 生成路由配置信息
function generatePathConfig(): RouteObject[] {
  const modules = import.meta.glob('/src/service/router/**/*.ts', {
    eager: true
  });
  let modulesList: RouteObject[] = rootRouteData(modules);

  Object.keys(modules).forEach((modulesPath) => {
    if (modulesPath.indexOf('root') > -1) {
      return;
    }

    const routerData = (modules[modulesPath] as any).default;
    const routePath = modulesPath.replace(staticPath, '').replace('.ts', '');
    const nameList = routePath.split('/');
    const parentId = nameList[nameList?.length - 2];

    routerData.forEach((item: RouteObject) => {
      item['parentId'] = parentId;
      // item.element = lazyLoad(item.element)
    });

    modulesList = concat(modulesList, routerData);
  });

  const result: RouteObject[] = arrayToTree(modulesList, 'path');

  return result;
}

export default generatePathConfig();
