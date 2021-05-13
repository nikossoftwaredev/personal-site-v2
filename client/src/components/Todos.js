import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiGET, getApiResource } from "../redux/slices/apiSlice";
import { Table, Tag, Space } from "antd";

//https://ant.design/components/table/#components-table-demo-edit-row

const TestApi = () => {
  const todos = useSelector((state) => getApiResource(state, "todos"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGET("todos"));
  }, [dispatch]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (userId) => <p>{userId}</p>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => <Tag>{completed ? "True" : "False"}</Tag>,
    },
    {
      title: "Date",
      key: "date",
      render: (text, record) => (
        <Space size="middle">
          <p></p>
          <p></p>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div>
        {console.log(todos)}
        {todos && todos.status === "done" && todos.data ? (
          <Table columns={columns} dataSource={Object.values(todos.data)} />
        ) : (
          <div>Fetching...</div>
        )}
      </div>
    </div>
  );
};

export default TestApi;
