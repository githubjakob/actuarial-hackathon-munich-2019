import React, { useState } from "react";
import "./App.css";

import { Layout, Form, Select } from "antd";
import { locations, genders, plans } from "./data";

const { Option } = Select;
const { Header, Content, Footer } = Layout;

const App = () => {
  const [location, setLocation] = useState([]);

  return (
    <div className="App">
      <Content style={{ height: "100vh" }}>
        <Header>
          <h1 style={{ color: "white" }}>DBO Insights</h1>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Form layout="inline">
            <Form.Item label="Standort">
              <Select
                mode="multiple"
                style={{ minWidth: 150 }}
                defaultValue={[]}
                onChange={location => setLocation(location)}
                value={location}
                allowClear
              >
                {locations.map(location => (
                  <Option key={location} value={location}>
                    {location}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Alter"> </Form.Item>
            <Form.Item label="Geschlecht"> </Form.Item>
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
