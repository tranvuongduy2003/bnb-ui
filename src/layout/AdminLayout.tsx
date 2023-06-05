import { Layout } from "antd";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import { useAuthStore } from "@/stores/useAuthStore";
import { Role } from "@/constants/role";

const AdminLayout: React.FunctionComponent = () => {
  const profile = useAuthStore((state) => state.profile);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  return loggedIn && profile.role === Role.ADMIN ? (
    <Layout>
      <Layout.Sider className="!fixed top-0 !w-64 !max-w-full h-screen">
        <Sidebar />
      </Layout.Sider>
      <Layout className="pl-[256px]">
        <Layout.Header className="flex items-center justify-end gap-5 px-5 bg-white border-0 border-b-2 border-solid border-neutral-100">
          <AdminHeader />
        </Layout.Header>
        <Layout.Content className="bg-white">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default AdminLayout;
