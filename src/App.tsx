import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "@/layout/UserLayout";
import AdminLayout from "@/layout/AdminLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ProductsManagementPage from "@/pages/admin/ProductsManagement/ProductsManagementPage";
import NotFoundPage from "@/pages/NotFoundPage";

const App: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route>
        {/* Auth Route */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/sign-up" element={<SignupPage />} />

        {/* User Routes */}
        <Route element={<UserLayout />} />

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/products-management"
            element={<ProductsManagementPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
