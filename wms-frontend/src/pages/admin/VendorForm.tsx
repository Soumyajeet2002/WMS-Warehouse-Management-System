import React from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import api from "../../services/api";

interface VendorFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}
const VendorForm = ({ onCancel, onSuccess }: VendorFormProps) => {
  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!code.trim()) {
      setError("Please enter the vendor code.");
      return;
    }

    if (code.trim().length < 2) {
      setError("Vendor code must be at least 2 characters.");
      return;
    }

    if (!name.trim()) {
      setError("Please enter the vendor name.");
      return;
    }

    if (name.trim().length < 2) {
      setError("Vendor name must be at least 2 characters.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter the vendor email.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (phone && (phone.length < 10 || phone.length > 20)) {
      setError("Phone number must be between 10 and 20 characters.");
      return;
    }

    if (address.length > 255) {
      setError("Address must not exceed 255 characters.");
      return;
    }

    if (!password) {
      setError("Please enter the initial password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/vendors", {
        code: code.trim(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
        password,
      });

   onSuccess();
    } catch (error: any) {
      if (error.response?.status === 409) {
        setError(
          error.response?.data?.message ||
            "Vendor code or email already exists.",
        );
      } else if (error.response?.status === 401) {
        setError("Your session has expired. Please login again.");
      } else if (error.response?.status === 403) {
        setError("Only administrators can create vendors.");
      } else {
        setError(
          error.response?.data?.message ||
            "Failed to create vendor. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Create Vendor
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, mb: 3 }}
          >
            Create a vendor and their login account.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Vendor Code"
                placeholder="VEND-001"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Vendor Name"
                placeholder="ABC Suppliers"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                placeholder="abc@suppliers.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                placeholder="9876543210"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                placeholder="Bhubaneswar, Odisha, India"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                multiline
                minRows={3}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Initial Password"
                placeholder="Password123!"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                helperText="Minimum 6 characters"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon />
                          ) : (
                            <VisibilityOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
              mt: 3,
            }}
          >
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Creating..." : "Create Vendor"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VendorForm;
