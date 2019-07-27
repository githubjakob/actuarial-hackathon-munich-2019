import { Empty, Spin } from "antd";
import ReactEcharts from "echarts-for-react";
import _ from "lodash";
import React from "react";

const defaultConfig = {
  tooltip: {
    trigger: "axis"
  },
  dataZoom: {
    type: "inside"
  },
  yAxis: {
    type: "value",
    inverse: true
  },
  color: [
    "#ff7875",
    // "#ff9c6e",
    // "#ffc069",
    "#ffd666",
    // "#fff566",
    // "#d3f261",
    "#95de64",
    "#5cdbd3",
    "#69c0ff",
    // "#85a5ff",
    "#b37feb",
    "#ff85c0"
  ]
};

const getChartOptions = (data, xLabels) => {
  const computedConfig = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xLabels
    },
    legend: {
      data: _.map(data, "name")
    },
    series: data.map(product => {
      return {
        name: product.name,
        type: "line",
        data: product.values,
        symbol: "none",
        smooth: true
      };
    })
  };

  return { ...defaultConfig, ...computedConfig };
};

const Chart = props => {
  const { data = [], labels = [], loading = false } = props;

  if (!data.length)
    return (
      <Spin tip="Loading..." spinning={loading} delay={300}>
        <Empty />
      </Spin>
    );

  const chartOptions = getChartOptions(data, labels);
  return (
    <ReactEcharts option={chartOptions} notMerge style={{ height: "600px" }} />
  );
};

export default Chart;
