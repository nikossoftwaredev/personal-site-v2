import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiGET, apiPOST, getApiResource } from "../redux/slices/apiSlice";
import Todo from "./Todo";
import { Space, Button, Input, Typography, List } from "antd";
import { BodyWithPadding } from "../styles/genericStyles";
import { showNotification } from "../utils/notification";

const { Title } = Typography;
const { TextArea } = Input;

//https://ant.design/components/table/#components-table-demo-edit-row

const TodoList = () => {
  const todos = Object.values(
    useSelector((state) => getApiResource(state, "todos")) || {}
  );

  const authenticate = useSelector((state) =>
    getApiResource(state, "authenticate")
  );
  const [showCreate, setShowCreate] = useState(false);
  const [data, setData] = useState({ title: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticate._id) {
      dispatch(
        apiGET({ path: "todos", query: { filter: { user: authenticate._id } } })
      );
    }
  }, [dispatch, authenticate]);

  const onUpsert = () =>
    dispatch(
      apiPOST({
        path: "todos",
        data: { user: authenticate._id, ...data },
      })
    ).then(({ payload }) => {
      setShowCreate(false);
      console.log(payload.error);
      showNotification(
        payload.error ? "error" : "success",
        payload.error
          ? payload.error.message || payload.error
          : "Successfully registered!"
      );
    });

  return (
    <BodyWithPadding padding="1%">
      <Title>Todo List</Title>
      <Space direction="vertical" style={{ width: "80%" }}>
        {todos && todos.length > 0 ? (
          <List
            size="small"
            bordered
            dataSource={todos}
            renderItem={(todo) => <Todo todo={todo}></Todo>}
          />
        ) : (
          <Typography>No todos yet</Typography>
        )}

        {todos && todos.status === "fetching" && (
          <Typography>Fetching</Typography>
        )}
        {showCreate && (
          <TextArea
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            name="title"
          />
        )}

        <Space>
          {!showCreate && (
            <Button
              disabled={showCreate}
              variant="contained"
              type="primary"
              onClick={() => setShowCreate(true)}
            >
              Create todo
            </Button>
          )}
          {showCreate && (
            <>
              <Button
                disabled={!data.title}
                variant="contained"
                type="primary"
                onClick={() => onUpsert()}
              >
                Add
              </Button>
              <Button
                variant="contained"
                type="primary"
                danger
                onClick={() => setShowCreate(false)}
              >
                Cancel
              </Button>
            </>
          )}
        </Space>
      </Space>
    </BodyWithPadding>
  );
};

export default TodoList;
