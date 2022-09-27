import { RouteObject } from './../types/router.d';
import generateStore from '@/hooks/useGenerateStore';

interface AppStore {
  routers: RouteObject[];
}
const appStore = generateStore<AppStore>({
  state: {
    routers: []
  },
  actions: {
    setRouters: (data, state) => {
      state.routers = data;
    }
  },
  persist: {
    key: 'appStorage',
    storage: localStorage,
    paths: ['routers']
  }
});

export default appStore;
