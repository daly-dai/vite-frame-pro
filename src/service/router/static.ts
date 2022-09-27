const staticRouters = [
  {
    path: 'login',
    name: 'login',
    meta: {
      title: '登录页面'
    },
    element: () => import('@pages/Login/index')
  },
  {
    path: '*',
    name: '*',
    element: () => import('@pages/Login/index')
  }
];

export default staticRouters;
