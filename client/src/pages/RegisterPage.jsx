import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Avatar } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { apiPOST, getApiResource } from "../redux/slices/apiSlice";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StyledCard } from "../styles/formStyles";
import { Text, LinkStyled, BackgroundImageDiv } from "../styles/genericStyles";
import { showNotification } from "../utils/notification.js";
import colors from "../styles/colors";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const authenticate = useSelector((state) =>
    getApiResource(state, "authenticate")
  );

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(apiPOST({ path: "register", data })).then(({ payload }) => {
      setLoading(false);

      showNotification(
        payload.error ? "error" : "success",
        payload.error ? payload.error.message : "Successfully registered!"
      );

      if (!payload.error) {
        history.push("/login");
      }
    });
  };

  return authenticate._id ? (
    <Redirect to="/" />
  ) : (
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
              setData({ ...data, [e.target.name]: e.target.value })
            }
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item>
              <Avatar src="/images/logo.png"></Avatar>
              <Text size="20px">Register here</Text>
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
                value={data.username}
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
                value={data.password}
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
                Register
              </Button>
            </Form.Item>
            <Form.Item>
              <Text>Already have an account?</Text>
              <Text color={colors.blue}>
                <LinkStyled to="/login">Log in</LinkStyled>
              </Text>
            </Form.Item>
          </Form>
        </StyledCard>
      </Col>
    </Row>
  );
};

export default RegisterPage;
