import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Text } from "../styles/genericStyles";
import { Button, List, Modal, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { apiDELETE } from "../redux/slices/apiSlice";

//https://ant.design/components/table/#components-table-demo-edit-row

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(todo.completed);
  const [open, setOpen] = useState(false);

  const deleteTodo = () => {
    dispatch(apiDELETE(`todos/${todo._id}`)).then(() => setOpen(false));
  };

  return (
    <List.Item>
      <Modal
        title="Todo Deletion"
        centered
        visible={open}
        onOk={() => deleteTodo()}
        onCancel={() => setOpen(false)}
      >
        <p>Are you sure you want to delete todo {todo._id}</p>
      </Modal>
      <Checkbox
        checked={completed}
        inputProps={{ "aria-label": "pimary checkbox" }}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <Text color="black">{todo.title}</Text>
      <Space style={{ marginLeft: "auto" }}>
        <Tooltip placement="top" title="Edit Todo">
          <Button type="primary" icon={<EditOutlined />} />
        </Tooltip>
        <Tooltip placement="top" title="Delete Todo">
          <Button
            onClick={() => setOpen(true)}
            type="primary"
            danger
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      </Space>
    </List.Item>
  );
};

export default Todo;
