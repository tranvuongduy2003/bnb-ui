import { BellOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

const AdminHeader: React.FunctionComponent = () => {
  return (
    <>
      <div className="text-xl">
        <BellOutlined />
      </div>
      <div>
        <Avatar src="https://picsum.photos/200" size={36} />
      </div>
    </>
  );
};

export default AdminHeader;
