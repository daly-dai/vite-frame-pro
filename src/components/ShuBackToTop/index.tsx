import { UpOutlined } from '@ant-design/icons';
import { debounce } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import SvgCom from '../SvgCom';
import './index.less';

interface BackToTopBtnProps {
  iconName?: string;
  container?: string;
}

const ShuBackToTop: React.FC<BackToTopBtnProps> = ({ iconName, container }) => {
  // 定义 visibleBackTopBtn 变量控制 返回顶部 按钮的显隐
  const [visibleBackTopBtn, setVisibleBackTopBtn] = useState(false);

  // 滚动事件监听函数
  const handleScroll = debounce(() => {
    const scrollTop =
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop ||
      0;

    if (scrollTop > 200) {
      setVisibleBackTopBtn(true);
    } else {
      setVisibleBackTopBtn(false);
    }
  });

  // 点击按钮事件处理函数
  const backToTopHandle = () => {
    console.log(8888888);
    // 把页面滚动到页面顶部
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // 在 React 中使用 addEventListener 监听事件
    document.addEventListener('scroll', handleScroll, true);
    // 组件卸载时移除事件监听
    return () => document.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      {visibleBackTopBtn && (
        <div id="backToTop" onClick={backToTopHandle}>
          {iconName ? <SvgCom iconName={iconName} /> : <UpOutlined />}
        </div>
      )}
    </>
  );
};

export default ShuBackToTop;
