import React, { useEffect } from 'react';
import placeStore from '@/store/placeStore';

const Main = () => {
  const store = placeStore();

  useEffect(() => {
    setTimeout(() => {
      store.changeUiStyle('test');
    }, 5000);
  }, [store]);

  return (
    <>
      首页
      {store.uiStyle}
    </>
  );
};

export default Main;
