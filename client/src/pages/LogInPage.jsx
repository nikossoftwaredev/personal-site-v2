import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Avatar } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { apiGET, apiPOST, getApiResource } from "../redux/slices/apiSlice";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundImageDiv, StyledCard } from "../styles/formStyles";
import { Text, LinkStyled } from "../styles/genericStyles";
import { showNotification } from "../utils/notification.js";
import colors from "../styles/colors";

const LogInPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const authenticate = useSelector((state) =>
    getApiResource(state, "authenticate")
  );

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(apiPOST({ path: "login", formData })).then(() => {
      setLoading(false);
      dispatch(apiGET("authenticate")).then(({ payload }) => {
        return showNotification(
          payload.error ? "error" : "success",
          payload.error ? payload.error : "Successfully logged in!"
        );
      });
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
              <Form.Item>
                <Avatar src="/images/logo.png"></Avatar>
                <Text size="20px">Log in here</Text>
              </Form.Item>
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
                  prefix={<LockOutlined style={{ color: colors.red }} />}
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
                  loading={loading}
                >
                  Log in
                </Button>
              </Form.Item>
              <Form.Item>
                <Text>Don't have an account?</Text>
                <Text color={colors.blue}>
                  <LinkStyled to="/register">Register</LinkStyled>
                </Text>
              </Form.Item>
            </Form>
          </StyledCard>
        </Col>
      </Row>
    </BackgroundImageDiv>
  );
};

export default LogInPage;
