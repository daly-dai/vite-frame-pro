import { FC, useState, useEffect } from 'react';
import './index.less';
import Overview from './components/overview';
// import SalePercent from './salePercent';
// import TimeLine from './timeLine';

const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);

  // mock timer to mimic dashboard data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <div>驾驶舱</div>;
};

export default DashBoardPage;
