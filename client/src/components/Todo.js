import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

//https://ant.design/components/table/#components-table-demo-edit-row

const Todo = ({ todo }) => {
  return (
    <div>
      <Checkbox
        checked={todo.completed}
        inputProps={{ "aria-label": "pimary checkbox" }}
      />

      {todo.title}
    </div>
  );
};

export default Todo;
