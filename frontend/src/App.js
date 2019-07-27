import React, { useState, useEffect } from "react";
import "./App.css";
import Chart from "./components/Chart";

import { Layout, Form, Select, InputNumber, Divider } from "antd";
import {
  locations as locationsData,
  genders as gendersData,
  plans as plansData
} from "./data";
import app from "./feathers";

const { Option } = Select;
const { Header, Content, Footer } = Layout;

const MultiSelect = ({ options = [], state, setState, placeholder }) => {
  return (
    <Select
      placeholder={placeholder}
      mode="multiple"
      style={{ minWidth: 150 }}
      defaultValue={[]}
      onChange={values => setState(values)}
      value={state}
      allowClear
    >
      {options.map(option => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

const App = () => {
  const [locations, setLocations] = useState([]);
  const [gender, setGender] = useState("");
  const [plans, setPlans] = useState([]);
  const [age, setAge] = useState({});
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const query = {
        Geschlecht: gender || undefined,
        Standort: locations.length ? { $in: locations } : undefined,
        Alter: age.from && age.to ? { $gt: age.from, $lte: age.to } : undefined,
        JahrZins: [{ jahr: "2019", zins: 0.013 }]
      };
      try {
        setLoading(true);
        const res = await app.service("aggregator").find({ query });
        setLoading(false);
        setData(res);
      } catch (err) {
        console.log("err.message: ", err.message);
      }
    })();
  }, [locations, gender, age]);

  return (
    <div className="App">
      <Content style={{ height: "100vh" }}>
        <Header>
          <h1 style={{ color: "white" }}>DBO Insights</h1>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Form layout="inline">
            <Form.Item label="Standort">
              <MultiSelect
                placeholder="Standort auswählen"
                options={locationsData}
                state={locations}
                setState={setLocations}
              />
            </Form.Item>
            <Form.Item label="Alter">
              <InputNumber
                placeholder="Von"
                onChange={value => setAge({ ...age, from: value })}
              />
              {" - "}
              <InputNumber
                placeholder="Bis"
                onChange={value => setAge({ ...age, to: value })}
              />
            </Form.Item>
            <Form.Item label="Geschlecht">
              <Select
                style={{ minWidth: 150 }}
                onChange={value => setGender(value)}
                value={gender}
                allowClear
              >
                <Option key="-" value="">
                  Alle
                </Option>
                {Object.entries(gendersData).map(([value, text]) => (
                  <Option key={value} value={value}>
                    {text}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Zusage / Plan">
              <MultiSelect
                placeholder="Plan auswählen"
                options={plansData}
                state={plans}
                setState={setPlans}
              />
            </Form.Item>
          </Form>
          <Divider />
          <Chart loading={loading} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Created by team h4ckerm3n
        </Footer>
      </Content>
    </div>
  );
};

export default App;
