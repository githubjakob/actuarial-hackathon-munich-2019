import { Empty, Spin } from "antd";
import ReactEcharts from "echarts-for-react";
import _ from "lodash";
import React from "react";

const defaultConfig = {
  tooltip: {
    trigger: "axis"
  },
  yAxis: {
    type: "value"
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

const getChartOptions = data => {
  console.log({ data });
  const computedConfig = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map(x => x.year)
    },
    legend: {
      data: data.year
    },
    series: [
      {
        name: "DBO EOY",
        lineStyle: {
          width: 5
        },
        data: data.map(x => Math.floor(x.data.dbo_eoy)),
        type: "line",
        smooth: true
      },
      {
        name: "Service Cost",
        data: data.map(x => Math.floor(x.data.service_cost)),
        type: "line",
        smooth: true
      },
      {
        name: "Interest Cost",
        data: data.map(x => Math.floor(x.data.interest_cost)),
        type: "line",
        smooth: true
      },
      {
        name: "Contributions",
        data: data.map(x => Math.floor(x.data.contributions)),
        type: "line",
        smooth: true
      },
      {
        name: "Benefits Paid",
        data: data.map(x => Math.floor(x.data.benefits_paid)),
        type: "line",
        smooth: true
      },
      {
        name: "Remeasurements",
        data: data.map(x => Math.floor(x.data.remeasurements)),
        type: "line",
        smooth: true
      },
      {
        name: "DBO BOY",
        data: data.map(x => Math.floor(x.data.dbo_boy)),
        type: "line",
        smooth: true
      }
    ]
    // series: data.map((value, index) => {
    //   console.log({ value });
    //   return {
    //     name: index,
    //     type: "line",
    //     data: value.data.dbo_eoy,
    //     smooth: true
    //   };
    // })
  };

  return { ...defaultConfig, ...computedConfig };
};

const Chart = props => {
  const { data = [], loading = false } = props;

  if (!data.length || loading)
    return (
      <Spin tip="Loading..." spinning={loading} delay={300}>
        <Empty />
      </Spin>
    );

  const chartOptions = getChartOptions(data);
  return (
    <ReactEcharts option={chartOptions} notMerge style={{ height: "600px" }} />
  );
};

export default Chart;
