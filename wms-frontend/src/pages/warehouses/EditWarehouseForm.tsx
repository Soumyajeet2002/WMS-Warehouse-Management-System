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

export interface EditWarehouseData {
    code: string;
    name: string;
    address: string;
}

interface EditWarehouseFormProps {
    open: boolean;
    warehouse: EditWarehouseData | null;
    onClose: () => void;
    onSubmit: (data: EditWarehouseData) => void;
    loading?: boolean;
}

const EditWarehouseForm = ({
    open,
    warehouse,
    onClose,
    onSubmit,
    loading = false,
}: EditWarehouseFormProps) => {
    const [formData, setFormData] =
        React.useState<EditWarehouseData>({
            code: "",
            name: "",
            address: "",
        });

    React.useEffect(() => {
        if (warehouse) {
            setFormData({
                code: warehouse.code,
                name: warehouse.name,
                address: warehouse.address ?? "",
            });
        }
    }, [warehouse]);

    const handleChange = (
        field: keyof EditWarehouseData,
        value: string,
    ) => {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            return;
        }

        if (!formData.code.trim()) {
            return;
        }

        onSubmit({
            code: formData.code.trim(),
            name: formData.name.trim(),
            address: formData.address.trim(),
        });
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Edit Warehouse
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
                        label="Warehouse Name"
                        value={formData.name}
                        onChange={(event) =>
                            handleChange(
                                "name",
                                event.target.value,
                            )
                        }
                        fullWidth
                        required
                    />

                    <TextField
                        label="Warehouse Code"
                        value={formData.code}
                        onChange={(event) =>
                            handleChange(
                                "code",
                                event.target.value,
                            )
                        }
                        fullWidth
                        required
                    />

                    <TextField
                        label="Address"
                        value={formData.address}
                        onChange={(event) =>
                            handleChange(
                                "address",
                                event.target.value,
                            )
                        }
                        fullWidth
                        multiline
                        minRows={2}
                    />
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 2,
                }}
            >
                <Button
                    onClick={onClose}
                    color="inherit"
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                        loading ||
                        !formData.name.trim() ||
                        !formData.code.trim()
                    }
                >
                    {loading
                        ? "Saving..."
                        : "Save Changes"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditWarehouseForm;