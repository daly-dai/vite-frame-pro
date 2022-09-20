import generateStore from '@/hooks/useGenerateStore';

const userStore = generateStore({
  state: {
    token: ''
  },
  actions: {
    setToken: (data, state) => {
      state.token = data;
    }
  }
});

export default userStore;
