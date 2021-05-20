import { notification } from "antd";

export const showNotification = (type, description) => {
  notification[type]({
    message: type.charAt(0).toUpperCase() + type.slice(1),
    description,
    placement: "bottomRight",
  });
};
