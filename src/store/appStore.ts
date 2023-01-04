import { RouteObject } from './../types/router.d';
import generateStore from '@/plugins/useGenerateStore';

export interface CurrentPath {
  key: string;
  label: string;
}
export interface AppStore {
  routers: RouteObject[];
  asideMenu: any;
  currentPath: CurrentPath[];
}

const appStore = generateStore<AppStore>({
  key: 'appStore',
  state: {
    routers: [],
    asideMenu: [],
    currentPath: []
  },
  actions: {
    setRouters: (data, state) => {
      state.routers = data;
    },
    setAsideMenu: (data, state) => {
      state.asideMenu = data;
    },
    setCurrentPath: (data, state) => {
      state.currentPath = data;
    }
  },
  persist: true
});

export default appStore;
