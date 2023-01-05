import { defaultRoutes } from '@/plugins/useGenerateRoutes';
import { useRoutes } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import userStore, { UserStore } from '@/store/userStore';
import privateRoutes from '@/plugins/useGenerateRoutes';
import { useEffect, useState } from 'react';
import { RouteObject } from '@/types/router';

const RouterTree = () => {
  const { state } = userStore;
  const [permissionRoutes, setPermissionRoutes] = useState<RouteObject[]>([]);
  const userState = useSnapshot<UserStore>(state);

  useEffect(() => {
    if (userState.token) {
      setPermissionRoutes(privateRoutes);
    }
  }, [userState.token]);

  const appRoutes = [...permissionRoutes, ...defaultRoutes];

  console.log(appRoutes, 88888888888888);

  return useRoutes(appRoutes);
};

export default RouterTree;
