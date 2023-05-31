import React, { useContext, useState } from "react";
import { Avatar, Badge, Menu, MenuProps, Popover, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { AuthContext } from "@/context/AuthProvider";

const Header: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState<boolean>(false);
  const { logout } = useContext(AuthContext) as any;

  // const items: MenuProps["items"] = [
  //   {
  //     key: "/",
  //     onClick: () => navigate("/"),
  //     label: "Home",
  //   },
  //   {
  //     key: "/category",
  //     onClick: () => navigate("/category"),
  //     label: "Category",
  //   },
  // ];

  const items: MenuProps["items"] = [
    {
      key: "/settings",
      icon: <SettingOutlined />,
      onClick: () => {
        navigate("/settings");
        setOpen(!open);
      },
      label: "Settings",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        logout();
        setOpen(!open);
      },
      label: "Logout",
    },
  ];

  return (
    <div className="flex justify-between w-full">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/assets/logo.png" alt="logo" className="w-9 h-9" />
        <Typography.Title level={3} style={{ margin: 0 }}>
          BnB
        </Typography.Title>
      </div>
      {/* <div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[""]}
          selectedKeys={[location.pathname]}
          items={items}
        />
      </div> */}
      <div className="flex items-center gap-5">
        <Badge count={5} size="default">
          <div
            className="text-xl cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartOutlined />
          </div>
        </Badge>
        <div className="text-xl">
          <BellOutlined />
        </div>
        <div>
          <Popover
            content={
              <Menu
                mode="vertical"
                items={items}
                className="!border-none"
                selectedKeys={[""]}
              />
            }
            trigger="click"
            placement="bottomLeft"
            open={open}
            onOpenChange={() => setOpen(!open)}
          >
            <Avatar
              src="https://picsum.photos/200"
              size={36}
              className="cursor-pointer"
            />
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;