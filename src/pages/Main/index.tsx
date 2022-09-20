import React, { useEffect } from 'react';
import placeStore from '@/store/placeStore';
import { getTest } from './api';

const Main = () => {
  const store = placeStore();

  useEffect(() => {
    setTimeout(() => {
      store.changeUiStyle('test');

      getTest({});
    }, 5000);
  }, []);

  return (
    <>
      首页
      {store.uiStyle}
    </>
  );
};

export default Main;
