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
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: '驾驶舱'
        },
        element: () => import('@pages/Dashboard/index')
      },
      {
        path: 'systemSetup',
        name: 'systemSetup',
        meta: {
          title: '系统设置'
        },
        element: () => import('@pages/system-setup/index')
      }
    ]
  }
];

export default routerConfig;
