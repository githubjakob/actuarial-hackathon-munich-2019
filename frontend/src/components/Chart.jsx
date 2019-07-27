import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";
import { Button } from "antd";

const defaultChartOptions = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line"
    }
  ]
};

export default function Chart() {
  const [chartOptions, setChartOptions] = useState(defaultChartOptions);
  return (
    <div>
      <Button type="primary">Click me</Button>;
      <ReactEcharts style={{ height: "500px" }} option={chartOptions} />
    </div>
  );
}
