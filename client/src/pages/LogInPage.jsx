import React, { useState } from "react";
import { Form, Input, Button, Divider, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { apiGET, apiPOST, getApiResource } from "../redux/slices/apiSlice";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundImageDiv, StyledCard } from "../styles/formStyles";
import colors from "../styles/colors";

const LogInPage = () => {
  const dispatch = useDispatch();

  const authenticate = useSelector((state) =>
    getApiResource(state, "authenticate")
  );

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(apiPOST({ path: "login", formData })).then(() => {
      dispatch(apiGET("authenticate"));
    });
  };

  return authenticate._id ? (
    <Redirect to="/" />
  ) : (
    <BackgroundImageDiv src="url(images/background-login.jpg)">
      <Row
        justify="space-around"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <Col>
          <StyledCard>
            <Divider>Log in</Divider>
            <Form
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  name="username"
                  value={formData.username}
                  prefix={<UserOutlined style={{ color: colors.red }} />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <LockOutlined
                      style={{ color: colors.red, fontSize: "20px" }}
                    />
                  }
                  name="password"
                  value={formData.password}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ width: "100%", backgroundColor: colors.red }}
                  type="primary"
                  danger
                  className="login-form-button"
                  onClick={onSubmit}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </StyledCard>
        </Col>
      </Row>
    </BackgroundImageDiv>
  );
};

export default LogInPage;
