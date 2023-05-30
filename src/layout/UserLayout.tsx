import { Layout } from "antd";
import React, { useContext } from "react";
import Header from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { AuthContext } from "@/context/AuthProvider";

const UserLayout: React.FunctionComponent = () => {
  const profile = useAuthStore((state) => state.profile);
  const { loggedIn } = useContext(AuthContext) as any;

  return loggedIn && profile.role === "user" ? (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default UserLayout;
