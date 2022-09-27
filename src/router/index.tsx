import { defaultRoutes } from '@hooks/useGenerateRoutes';
import appStore from '@/store/appStore';
import { useRoutes } from 'react-router-dom';
import { RouteObject } from '@/types/router';
export const pageRoutesInstance: RouteObject[] = [];

const RouterTree = () => {
  // const appStoreInstance = appStore();
  // console.log(defaultRoutes, appStoreInstance, '动态路由');

  // const appStorgRoutes = appStoreInstance.routers;
  const appRoutes = [...defaultRoutes, ...pageRoutesInstance];
  console.log(appRoutes, 88888);

  return useRoutes(appRoutes);
};

export default RouterTree;
