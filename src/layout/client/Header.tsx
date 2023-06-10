import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { logOut } from "@/utils/auth";
import {
  BarsOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Menu, MenuProps, Popover, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const profile = useAuthStore((state) => state.profile);
  const cart = useCartStore((state) => state.cart);

  const items: MenuProps["items"] = [
    {
      key: "/orders",
      icon: <BarsOutlined />,
      onClick: () => {
        navigate("/orders");
        setOpen(!open);
      },
      label: "Orders",
    },
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
        logOut();
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
        <Badge count={cart.length} size="default">
          <div
            className="text-xl cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartOutlined />
          </div>
        </Badge>
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
              src={
                profile?.avatar ? profile.avatar : "https://picsum.photos/200"
              }
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
