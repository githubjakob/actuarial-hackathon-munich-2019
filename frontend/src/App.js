import React, { useState } from "react";
import "./App.css";

import { Layout, Form, Select } from "antd";
import { locations, genders, plans } from "./data";

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
  const [location, setLocation] = useState([]);
  const [gender, setGender] = useState("");

  console.log({ location, gender });

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
                options={locations}
                state={location}
                setState={setLocation}
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
                {Object.entries(genders).map(([value, text]) => (
                  <Option key={value} value={value}>
                    {text}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Zusage / Plan"> </Form.Item>
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
