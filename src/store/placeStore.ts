import generateStore from '@/hooks/useGenerateStore';

const placeStore = generateStore({
  state: {
    uiStyle: ''
  },
  actions: {
    changeUiStyle: (data, state) => {
      state.uiStyle = data;
    }
  },
  persist: [
    {
      key: 'placeCode',
      storage: sessionStorage,
      paths: ['healthCode', 'communityCode', 'uiStyle']
    }
  ]
});

export default placeStore;
