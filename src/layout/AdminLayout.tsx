import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout: React.FunctionComponent = () => {
  return (
    <Layout>
      <Layout.Sider className="!fixed top-0 w-52 h-screen">
        <Sidebar />
      </Layout.Sider>
      <Layout className="pl-[200px]">
        <Layout.Header className="flex items-center justify-end gap-5 px-5 mb-[1px] bg-white">
          <AdminHeader />
        </Layout.Header>
        <Layout.Content className="bg-white">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
