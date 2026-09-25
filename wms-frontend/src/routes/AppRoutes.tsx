import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import ModulePlaceholder from '../pages/ModulePlaceholder';

import Warehouses from '../pages/warehouses/Warehouses';

import DashboardLayout from '../layouts/DashboardLayout';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />

                {/* Application Routes */}
                <Route element={<DashboardLayout />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/warehouses"
                        element={<Warehouses />}
                    />

                    <Route
                        path="/products"
                        element={
                            <ModulePlaceholder
                                title="Products"
                                description="Manage products and SKUs."
                            />
                        }
                    />

                    <Route
                        path="/inventory"
                        element={
                            <ModulePlaceholder
                                title="Inventory"
                                description="Monitor and manage warehouse inventory."
                            />
                        }
                    />

                    <Route
                        path="/receiving"
                        element={
                            <ModulePlaceholder
                                title="Receiving"
                                description="Manage inbound stock and receiving operations."
                            />
                        }
                    />

                    <Route
                        path="/picking"
                        element={
                            <ModulePlaceholder
                                title="Picking"
                                description="Manage picking operations and pick lists."
                            />
                        }
                    />

                    <Route
                        path="/shipping"
                        element={
                            <ModulePlaceholder
                                title="Shipping"
                                description="Manage outbound shipments."
                            />
                        }
                    />

                    <Route
                        path="/users"
                        element={
                            <ModulePlaceholder
                                title="Users"
                                description="Manage system users and roles."
                            />
                        }
                    />

                    <Route
                        path="/settings"
                        element={
                            <ModulePlaceholder
                                title="Settings"
                                description="Configure your warehouse management system."
                            />
                        }
                    />
                </Route>

                {/* Default Route */}
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                {/* 404 */}
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;