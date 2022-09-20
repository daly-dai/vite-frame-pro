const onRouteBefore = (meta: { auth: any; title: any }, to: any) => {
  const { title } = meta;
  if (title) {
    // 动态修改页面title
    document.title = title || '统一中心管理';
  }

  return to;
  // token权限验证
  // return (auth && !localStorage('access_token')) ? '/login' : to;
};

export default onRouteBefore;
