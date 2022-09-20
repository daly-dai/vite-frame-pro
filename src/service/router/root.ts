const routerConfig = [
  {
    path: '/',
    meta: {
      title: '首页'
    },
    name: '/',
    element: () => import('@pages/Main/index')
  },
  {
    path: 'login',
    name: 'login',
    meta: {
      title: '登录页面'
    },
    element: () => import('@pages/Login/index')
  }
  // {
  //   path: 'dashboard',
  //   name: 'dashboard',
  //   meta: {
  //     title: '子路由页面'
  //   },
  //   element: () => import('@pages/Dashboard/index')
  // }
];

export default routerConfig;
