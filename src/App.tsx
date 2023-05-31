import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "@/layout/UserLayout";
import AdminLayout from "@/layout/AdminLayout";
import AuthProtectedRoute from "@/layout/AuthProtectedRoute";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ProductManagementPage from "@/pages/admin/ProductManagementPage/ProductManagementPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductsPage from "@/pages/client/ProductsPage/ProductsPage";
import ProductDetailPage from "@/pages/client/ProductsPage/ProductDetailPage/ProductDetailPage";
import ProfilePage from "@/pages/client/ProfilePage/ProfilePage";
import OrderHistoryPage from "@/pages/client/OrderHistoryPage/OrderHistoryPage";
import CheckoutPage from "@/pages/client/CheckoutPage/CheckoutPage";
import CartPage from "@/pages/client/CartPage/CartPage";
import CheckoutConfirmationPage from "@/pages/client/CheckoutPage/CheckoutConfirmationPage/CheckoutConfirmationPage";
import DashboardPage from "@/pages/admin/DashboardPage/DashboardPage";
import ClientManagementPage from "@/pages/admin/ClientManagementPage/ClientManagementPage";
import SettingsPage from "@/pages/admin/SettingsPage/SettingsPage";

const App: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route>
        {/* Auth Route */}
        <Route element={<AuthProtectedRoute />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/sign-up" element={<SignupPage />} />
        </Route>

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
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout/confirmation"
            element={<CheckoutConfirmationPage />}
          />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route
            path="/admin/product-management"
            element={<ProductManagementPage />}
          />
          <Route
            path="/admin/client-management"
            element={<ClientManagementPage />}
          />
          <Route path="/admin/settings" element={<SettingsPage />} />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
