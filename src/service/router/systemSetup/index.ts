export default [
  {
    path: 'permission-mange',
    name: 'permission-mange',
    meta: {
      title: '权限设置'
    },
    element: () => import('@pages/system-setup/permission-mange/index')
  },
  {
    path: 'role-mange',
    name: 'role-mange',
    meta: {
      title: '角色设置'
    },
    element: () => import('@pages/system-setup/role-mange/index')
  },
  {
    path: 'user-mange',
    name: 'user-mange',
    meta: {
      title: '用户设置'
    },
    element: () => import('@pages/system-setup/user-mange/index')
  }
];
