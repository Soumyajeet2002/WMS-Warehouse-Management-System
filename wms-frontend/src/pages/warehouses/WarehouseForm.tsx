import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export interface WarehouseFormData {
  code: string;
  name: string;
  address: string;
}

interface WarehouseFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: WarehouseFormData) => void;
}

const WarehouseForm = ({
  open,
  onClose,
  onSubmit,
}: WarehouseFormProps) => {
  const [formData, setFormData] =
    React.useState<WarehouseFormData>({
      code: "",
      name: "",
      address: "",
    });

  const [error, setError] = React.useState("");

  const handleChange = (
    field: keyof WarehouseFormData,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleSubmit = () => {
    if (!formData.code.trim()) {
      setError("Warehouse code is required.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Warehouse name is required.");
      return;
    }

    onSubmit({
      code: formData.code.trim(),
      name: formData.name.trim(),
      address: formData.address.trim(),
    });

    setFormData({
      code: "",
      name: "",
      address: "",
    });

    setError("");
  };

  const handleClose = () => {
    setFormData({
      code: "",
      name: "",
      address: "",
    });

    setError("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
        }}
      >
        Add Warehouse
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 1,
          }}
        >
          <TextField
            label="Warehouse Code"
            placeholder="WH-001"
            value={formData.code}
            onChange={(event) =>
              handleChange("code", event.target.value)
            }
            fullWidth
            required
            autoFocus
          />

          <TextField
            label="Warehouse Name"
            placeholder="Main Warehouse"
            value={formData.name}
            onChange={(event) =>
              handleChange("name", event.target.value)
            }
            fullWidth
            required
          />

          <TextField
            label="Address"
            placeholder="Bhubaneswar, Odisha, India"
            value={formData.address}
            onChange={(event) =>
              handleChange("address", event.target.value)
            }
            fullWidth
            multiline
            minRows={3}
          />

          {error && (
            <Box
              sx={{
                color: "error.main",
                fontSize: 13,
              }}
            >
              {error}
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
        }}
      >
        <Button
          onClick={handleClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Create Warehouse
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarehouseForm;