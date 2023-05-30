import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "@/layout/UserLayout";
import AdminLayout from "@/layout/AdminLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ProductsManagementPage from "@/pages/admin/ProductsManagement/ProductsManagementPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductsPage from "@/pages/client/ProductsPage/ProductsPage";
import ProductDetailPage from "@/pages/client/ProductsPage/ProductDetailPage/ProductDetailPage";
import ProfilePage from "@/pages/client/ProfilePage/ProfilePage";
import OrderHistoryPage from "@/pages/client/OrderHistoryPage/OrderHistoryPage";
import CheckoutPage from "@/pages/client/CheckoutPage/CheckoutPage";
import CheckoutConfirmationPage from "@/pages/client/CheckoutPage/CheckoutConfirmationPage/CheckoutConfirmationPage";

const App: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route>
        {/* Auth Route */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/sign-up" element={<SignupPage />} />

        {/* User Routes */}
        <Route element={<UserLayout />}>
          {/* Products */}
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/detail" element={<ProductDetailPage />} />
          {/* Profile */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* Order */}
          <Route path="/order/history" element={<OrderHistoryPage />} />
          {/* Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/checkout/confirmation"
            element={<CheckoutConfirmationPage />}
          />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/products-management"
            element={<ProductsManagementPage />}
          />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
