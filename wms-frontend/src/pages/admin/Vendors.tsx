import React from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";

import VendorForm from "./VendorForm";
import api from "../../services/api";

interface Vendor {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  isActive: boolean;
  createdAt?: string;
}

const Vendors = () => {
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  const [vendors, setVendors] = React.useState<Vendor[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/vendors");

      setVendors(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("Your session has expired. Please login again.");
      } else if (error.response?.status === 403) {
        setError("Only administrators can view vendors.");
      } else {
        setError(error.response?.data?.message || "Failed to load vendors.");
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchVendors();
  }, []);

  const handleVendorCreated = () => {
    setShowCreateForm(false);
    fetchVendors();
  };

  return (
    <Box>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Vendors
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage vendors and their login accounts.
          </Typography>
        </Box>

        <Button variant="contained" onClick={() => setShowCreateForm(true)}>
          Create Vendor
        </Button>
      </Box>

      {/* Create Vendor Modal */}
      <Dialog
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        fullWidth
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#5913b5",
              backgroundImage: "none",
              border: "1px solid",
              borderColor: "divider",
            },
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <VendorForm
            onCancel={() => setShowCreateForm(false)}
            onSuccess={handleVendorCreated}
          />
        </DialogContent>
      </Dialog>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {/* Vendor List */}

      {/* Vendor List */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Vendor List
          </Typography>

          <Divider sx={{ my: 2 }} />

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 5,
              }}
            >
              <CircularProgress />
            </Box>
          ) : vendors.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 3 }}>
              No vendors found.
            </Typography>
          ) : (
            <Box sx={{ overflowX: "auto" }}>
              <Box
                component="table"
                sx={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: 900,

                  "& th": {
                    textAlign: "left",
                    padding: "12px 16px",
                    color: "text.secondary",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    whiteSpace: "nowrap",
                  },

                  "& td": {
                    padding: "16px",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    fontSize: "0.875rem",
                  },

                  "& tbody tr:last-child td": {
                    borderBottom: "none",
                  },

                  "& tbody tr:hover": {
                    backgroundColor: "#151515",
                  },
                }}
              >
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Vendor</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {vendor.code}
                        </Typography>
                      </td>

                      <td>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {vendor.name}
                        </Typography>
                      </td>

                      <td>
                        <Typography variant="body2" color="text.secondary">
                          {vendor.email}
                        </Typography>
                      </td>

                      <td>
                        <Typography variant="body2" color="text.secondary">
                          {vendor.phone || "—"}
                        </Typography>
                      </td>

                      <td>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxWidth: 220,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {vendor.address || "—"}
                        </Typography>
                      </td>

                      <td>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            px: 1.25,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            backgroundColor: vendor.isActive
                              ? "rgba(46, 125, 50, 0.12)"
                              : "rgba(255, 255, 255, 0.06)",
                            color: vendor.isActive
                              ? "success.light"
                              : "text.secondary",
                          }}
                        >
                          {vendor.isActive ? "Active" : "Inactive"}
                        </Typography>
                      </td>

                      <td>
                        <Button size="small" variant="outlined" disabled>
                          Manage
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Vendors;
