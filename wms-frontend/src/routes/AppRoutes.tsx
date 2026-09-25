import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import ModulePlaceholder from '../pages/ModulePlaceholder';
import DashboardLayout from '../layouts/DashboardLayout';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/login" element={<Login />} />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    }
                />

                {/* Warehouses */}
                <Route
                    path="/warehouses"
                    element={
                        <DashboardLayout>
                            <ModulePlaceholder
                                title="Warehouses"
                                description="Manage your warehouses and warehouse locations."
                            />
                        </DashboardLayout>
                    }
                />

                {/* Products */}
                <Route
                    path="/products"
                    element={
                        <DashboardLayout>
                            <ModulePlaceholder
                                title="Products"
                                description="Manage products and SKUs."
                            />
                        </DashboardLayout>
                    }
                />

                {/* Inventory */}
                <Route
                    path="/inventory"
                    element={
                        <DashboardLayout>
                            <ModulePlaceholder
                                title="Inventory"
                                description="Monitor and manage warehouse inventory."
                            />
                        </DashboardLayout>
                    }
                />

                {/* Receiving */}
                <Route
                    path="/receiving"
                    element={
                        <DashboardLayout>
                            <ModulePlaceholder
                                title="Receiving"
                                description="Manage inbound stock and receiving operations."
                            />
                        </DashboardLayout>
                    }
                />

                {/* Picking */}
                <Route
                    path="/picking"
                    element={
                        <DashboardLayout>
                            <ModulePlaceholder
                                title="Picking"
                                description="Manage picking operations and pick lists."
                            />
                        </DashboardLayout>
                    }
                />

                {/* Shipping */}
                <Route
                    path="/shipping"
                    element={
                        <DashboardLayout>
                            <ModulePlaceholder
                                title="Shipping"
                                description="Manage outbound shipments."
                            />
                        </DashboardLayout>
                    }
                />

                {/* Users */}
                <Route
                    path="/users"
                    element={
                        <DashboardLayout>
                            <ModulePlaceholder
                                title="Users"
                                description="Manage system users and roles."
                            />
                        </DashboardLayout>
                    }
                />

                {/* Settings */}
                <Route
                    path="/settings"
                    element={
                        <DashboardLayout>
                            <ModulePlaceholder
                                title="Settings"
                                description="Configure your warehouse management system."
                            />
                        </DashboardLayout>
                    }
                />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;