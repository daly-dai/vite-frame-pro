import generateStore from '@/hooks/useGenerateStore';

const userStore = generateStore({
  state: {
    token: '',
    userInfo: {
      userName: '',
      permission: ''
    },
    routers: []
  },
  actions: {
    setToken: (data, state) => {
      state.token = data;
    },
    setRouters: (data, state) => {
      state.routers = data;
    }
  }
});

export default userStore;
