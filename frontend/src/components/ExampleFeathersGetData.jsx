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
  }, []);

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
