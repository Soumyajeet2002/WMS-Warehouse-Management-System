import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import AdminDashboard from "../pages/admin/AdminDashboard";
import VendorDashboard from "../pages/vendor/VendorDashboard";

import ModulePlaceholder from "../pages/ModulePlaceholder";
import RoleModulePlaceholder from "../pages/RoleModulePlaceholder";
import Warehouses from "../pages/warehouses/Warehouses";

import Vendors from "../pages/admin/Vendors";

import { useAuth } from "../context/AuthContext";

const HomeRedirect = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role === "VENDOR") {
    return <Navigate to="/vendor/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            {/* ADMIN DASHBOARD */}
            <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            {/* VENDOR DASHBOARD */}
            <Route element={<RoleRoute allowedRoles={["VENDOR"]} />}>
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            </Route>

            {/* ADMIN ONLY MODULES */}
            <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/vendors" element={<Vendors />} />

              <Route
                path="/receiving"
                element={
                  <ModulePlaceholder
                    title="Receiving"
                    description="Manage incoming stock and receiving operations."
                  />
                }
              />

              <Route
                path="/picking"
                element={
                  <ModulePlaceholder
                    title="Picking"
                    description="Manage warehouse picking operations."
                  />
                }
              />

              <Route
                path="/shipping"
                element={
                  <ModulePlaceholder
                    title="Shipping"
                    description="Manage outgoing shipments."
                  />
                }
              />

              <Route
                path="/users"
                element={
                  <ModulePlaceholder
                    title="Users"
                    description="Manage system users and access."
                  />
                }
              />
            </Route>

            {/* SHARED ROLE-AWARE MODULES */}
            <Route element={<RoleRoute allowedRoles={["ADMIN", "VENDOR"]} />}>
              <Route
                path="/products"
                element={
                  <RoleModulePlaceholder
                    title="Products"
                    adminDescription="Manage all products and SKUs in the system."
                    vendorDescription="Manage your products and SKUs."
                  />
                }
              />
              <Route path="/warehouses" element={<Warehouses />} />

              <Route
                path="/inventory"
                element={
                  <RoleModulePlaceholder
                    title="Inventory"
                    adminDescription="Track inventory across all warehouses."
                    vendorDescription="View and manage your inventory."
                  />
                }
              />

              <Route
                path="/settings"
                element={
                  <RoleModulePlaceholder
                    title="Settings"
                    adminDescription="Manage system settings."
                    vendorDescription="Manage your account settings."
                  />
                }
              />
            </Route>

            {/* VENDOR ONLY MODULES */}
            <Route element={<RoleRoute allowedRoles={["VENDOR"]} />}>
              <Route
                path="/orders"
                element={
                  <ModulePlaceholder
                    title="Orders"
                    description="Manage your orders."
                  />
                }
              />

              <Route
                path="/shipments"
                element={
                  <ModulePlaceholder
                    title="Shipments"
                    description="Track your shipments."
                  />
                }
              />
            </Route>
          </Route>
        </Route>

        {/* ROOT REDIRECT */}
        <Route path="/" element={<HomeRedirect />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
