import React, { useCallback, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import Axios from 'axios';

import { hzData } from './hz';
import './index.less';
// import { mockData } from './mockData.js';
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
      normal: {
        areaColor: '#323c48',
        borderColor: '#111'
      },
      emphasis: {
        areaColor: '#2a333d'
      }
    }
  },
  series: [
    {
      name: '弱',
      type: 'scatterGL',
      progressive: 1e6,
      coordinateSystem: 'geo',
      symbolSize: 1,
      zoomScale: 0.002,
      blendMode: 'lighter',
      large: true,
      itemStyle: {
        color: 'rgb(20, 15, 2)'
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

    const chartInstance = echarts.init(dom, null, {
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
      Axios.get('../../assets/mapData/hzData.json').then((res) => {
        const { mockData } = res as any;

        console.log(res, 88888);
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
      });
    };

    getChartData();
  }, [myChart]);
  return <div className="chart" id="container"></div>;
};

export default Main;
