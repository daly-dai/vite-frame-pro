import React, { useCallback, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

import { hzData } from './hz';
import './index.less';
import mockHzData from '@/assets/mapData/hzData.json';

const option = {
  backgroundColor: '#000',
  title: {
    text: '10000000 GPS Points',
    left: 'center',
    textStyle: {
      color: '#fff'
    }
  },
  geo: {
    map: 'hangzhou',
    roam: true,
    label: {
      emphasis: {
        show: false
      }
    },
    silent: true,
    itemStyle: {
      areaColor: '#323c48',
      borderColor: '#111'
    }
  },
  series: [
    {
      name: '弱',
      type: 'scatterGL',
      progressive: 1e6,
      coordinateSystem: 'geo',
      symbolSize: 2,
      zoomScale: 0.022,
      blendMode: 'lighter',
      large: true,
      itemStyle: {
        color: 'rgb(152, 152, 15)'
      },
      postEffect: {
        enable: true
      },
      silent: true,
      dimensions: ['lng', 'lat'],
      data: []
    }
  ]
};

const Main = () => {
  const [myChart, setMyChart] = useState<any>({});

  const initChart = useCallback(() => {
    const dom = document.getElementById('container') as any;

    echarts.registerMap('hangzhou', hzData);

    const chartInstance = (echarts as any).init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    chartInstance.setOption(option);

    setMyChart(chartInstance);
  }, []);

  useEffect(() => {
    initChart();
  }, [initChart]);

  useEffect(() => {
    if (!myChart) return;

    const getChartData = () => {
      const { mockData } = mockHzData as any;

      const chartData = [];

      for (let i = 0; i < 20000; i++) {
        if (!mockData[i]) return;

        const dataItem = [mockData[i].lon, mockData[i].lat];

        chartData.push(dataItem);
      }
      myChart.appendData({
        seriesIndex: 0,
        data: chartData
      });
    };

    myChart.appendData && getChartData();
  }, [myChart]);
  return <div className="chart" id="container"></div>;
};

export default Main;
