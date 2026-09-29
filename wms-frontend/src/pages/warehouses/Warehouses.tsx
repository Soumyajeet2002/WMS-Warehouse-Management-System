import React from "react";
import { useAuth } from "../../context/AuthContext";
import VendorWarehouses from "./VendorWarehouses";
// import AdminWarehouses from "./AdminWarehouses"; // later

const Warehouses = () => {
    const { user } = useAuth();

    if (user?.role === "VENDOR") {
        return <VendorWarehouses />;
    }

    // Admin version will come here later
    return null;
};

export default Warehouses;