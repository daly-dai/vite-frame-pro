import { RouteObject } from './../types/router.d';
import generateStore from '@/plugins/useGenerateStore';

interface AppStore {
  routers: RouteObject[];
  asideMenu: any;
}
const appStore = generateStore<AppStore>({
  key: 'appStore',
  state: {
    routers: [],
    asideMenu: []
  },
  actions: {
    setRouters: (data, state) => {
      state.routers = data;
    },
    setAsideMenu: (data, state) => {
      state.asideMenu = data;
    }
  },
  persist: true
});

export default appStore;
