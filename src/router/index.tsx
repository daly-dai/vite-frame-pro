import { defaultRoutes } from '@hooks/useGenerateRoutes';
import { useRoutes } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import userStore, { UserStore } from '@/store/userStore';
import privateRoutes from '@/hooks/useGenerateRoutes';
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

  const appRoutes = [...defaultRoutes, ...permissionRoutes];

  return useRoutes(appRoutes);
};

export default RouterTree;
