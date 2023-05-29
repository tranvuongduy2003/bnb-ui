import { Menu, MenuProps } from "antd";
import React from "react";
import {
  AppstoreOutlined,
  BellOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: 1,
      icon: <AppstoreOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: 2,
      icon: <TeamOutlined />,
      label: "Clients",
      onClick: () => navigate("/admin/clients-management"),
    },
    {
      key: 3,
      icon: <ShoppingCartOutlined />,
      label: "Products",
      onClick: () => navigate("/admin/products-management"),
    },
    {
      key: 4,
      icon: <BellOutlined />,
      label: "Messages",
      onClick: () => navigate("/admin/messaging"),
    },
    {
      key: 5,
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/admin/settings"),
    },
  ];

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{ height: "100%", padding: 10 }}
      items={items}
    />
  );
};

export default Sidebar;
