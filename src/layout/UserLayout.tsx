import { Layout } from "antd";
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const UserLayout: React.FunctionComponent = () => {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default UserLayout;
