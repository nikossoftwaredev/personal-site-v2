import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Text } from "../styles/genericStyles";
import { Button, List, Modal, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { apiDELETE, apiPUT } from "../redux/slices/apiSlice";

//https://ant.design/components/table/#components-table-demo-edit-row

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    dispatch(
      apiPUT({
        path: `todos/${todo._id}`,
        formData: { ...todo, completed: e.target.checked },
      })
    );
  };

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
        checked={todo.completed}
        inputProps={{ "aria-label": "pimary checkbox" }}
        onChange={handleChange}
      />
      <Text deleted={todo.completed} color="black">
        {todo.title}
      </Text>
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
