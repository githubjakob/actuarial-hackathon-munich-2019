import { Table } from "antd";
import ReactEcharts from "echarts-for-react";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import app from "../feathers.js";

const DataTable = ({ data, loading }) => {
  if (!data) return <span />;
  const tableData = [
    {
      description: "DBO, BOY",
      "2019": 234
    },
    {
      description: "Current Service Cost",
      "2019": 234
    },
    {
      description: "Interest Cost",
      "2019": 234
    },
    {
      description: "Contributions",
      "2019": 234
    },
    {
      description: "Benefits paid",
      "2019": 234
    },
    {
      description: "Remeasurements",
      "2019": 234
    },
    {
      description: "DBO, EOY",
      "2019": 234
    }
  ];

  // const dataFromServer = [
  //   {
  //     year: 2019,
  //     data: {
  //       dbo_boy: 8,
  //       service_cost: 1,
  //       interest_cost: 9,
  //       contributions: 0,
  //       benefits_paid: 8,
  //       remeasurements: 8,
  //       dbo_eoy: 32
  //     }
  //   },
  //   {
  //     year: 2020,
  //     data: {
  //       dbo_boy: 8,
  //       service_cost: 67,
  //       interest_cost: 900,
  //       contributions: 345,
  //       benefits_paid: 8888,
  //       remeasurements: 811,
  //       dbo_eoy: 32345
  //     }
  //   }
  // ];

  const keyMap = {
    "DBO, BOY": "dbo_boy",
    "Current Service Cost": "service_cost",
    "Interest Cost": "interest_cost",
    Contributions: "contributions",
    "Benefits paid": "benefits_paid",
    Remeasurements: "remeasurements",
    "DBO, EOY": "dbo_eoy"
  };
  const years = data.map(d => d.year);

  // const keys = ["descriptions", ...years];

  // console.log("keys: ", keys);

  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  });
  years.forEach((year, i) => {
    tableData.forEach(row => {
      const resKey = keyMap[row.description];
      row[year] = formatter.format(data[i].data[resKey]);
    });
  });

  tableData.forEach(doc => {
    return {};
  });

  const columns = [
    {
      title: "IFRS-Überleitung",
      dataIndex: "description",
      key: "description"
    },
    ...years.map(year => ({
      title: year,
      dataIndex: year,
      key: year,
      align: "right"
    }))
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      loading={loading}
    />
  );
};

export default DataTable;
