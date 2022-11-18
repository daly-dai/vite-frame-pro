import { RouteObject } from './../types/router.d';
import generateStore from '@/plugins/useGenerateStore';

interface AppStore {
  routers: RouteObject[];
}
const appStore = generateStore<AppStore>({
  key: 'appStore',
  state: {
    routers: []
  },
  actions: {
    setRouters: (data, state) => {
      state.routers = data;
    }
  },
  persist: true
});

export default appStore;
