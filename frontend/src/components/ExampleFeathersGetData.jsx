import React, { useState, useEffect } from "react";
import app from "../feathers";

export default function ExampleFeathersGetData() {
  const [someData, setSomeData] = useState("");

  useEffect(() => {
    app
      .service("data")
      .find({ query: {} })
      .then(res => {
        console.log("res: ", res);
        if (res.data.length) {
          setSomeData(res.data[0].text);
        }
      })
      .catch(err => {
        console.warn("Err: ", err.message);
      });

    getDataAsCsv();
  }, [getDataAsCsv]);

  function getDataAsCsv() {
    app
      .service("data")
      .find({ query: { __options: { csv: true } } })
      .then(res => {
        console.log("res: ", res);
        // startCsvDownload(res.data);
      });
  }

  function startCsvDownload(csvStr) {
    const csvData = new Blob([csvStr], { type: "text/csv;charset=utf-8;" });
    const exportFilename = "data.csv";
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(csvData);
    link.setAttribute("download", exportFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  app.service("data").on("created", doc => {
    console.log("Doc was created: ", doc);
  });

  return (
    <div>
      <p>here some data</p>
      <p>{someData}</p>
    </div>
  );
}
