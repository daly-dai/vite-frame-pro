import generateStore from '@/hooks/useGenerateStore';

export interface UserStore {
  token: string;
  userInfo: {
    userName: string;
    useId: string;
  };
}

const userStore = generateStore<UserStore>({
  key: 'userStore',
  state: {
    token: '',
    userInfo: {
      userName: '',
      useId: ''
    }
  },
  actions: {
    // 登录
    login: async (params, state) => {
      setTimeout(() => {
        state.token = 'params';
      }, 1000);
    },
    // 退出
    loginOut: async (params, state) => {
      setTimeout(() => {
        state.token = '';
      }, 1000);
    }
  },
  persist: true
});

export default userStore;
