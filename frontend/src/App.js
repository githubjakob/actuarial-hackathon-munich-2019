import React, { useState } from "react";
import "./App.css";

import { Layout, Form, Select } from "antd";
import {
  locations as locationsData,
  genders as gendersData,
  plans as plansData
} from "./data";

const { Option } = Select;
const { Header, Content, Footer } = Layout;

const MultiSelect = ({ options = [], state, setState }) => {
  return (
    <Select
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

  console.log({ location: locations, gender, plan: plans });

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
                options={locationsData}
                state={locations}
                setState={setLocations}
              />
            </Form.Item>
            <Form.Item label="Alter"> </Form.Item>
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
                options={plansData}
                state={plans}
                setState={setPlans}
              />
            </Form.Item>
          </Form>
          {/* <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
            Content
          </div> */}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Created by team h4ckerm3n
        </Footer>
      </Content>
    </div>
  );
};

export default App;
