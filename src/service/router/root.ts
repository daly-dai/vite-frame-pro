const routerConfig = [
  {
    path: '/',
    meta: {
      title: '首页'
    },
    name: '/',
    redirect: '/home',
    element: () => import('@/layout/default-layout/index'),
    children: [
      {
        path: 'home',
        meta: {
          title: '首页'
        },
        name: 'index',
        element: () => import('@/pages/Main/index')
      }
    ]
  },
  // {
  //   path: 'login',
  //   name: 'login',
  //   meta: {
  //     title: '登录页面'
  //   },
  //   element: () => import('@pages/Login/index')
  // },
  {
    path: 'dashboard',
    name: 'dashboard',
    meta: {
      title: '子路由页面'
    },
    element: () => import('@pages/Dashboard/index')
  }
];

export default routerConfig;
