import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import React from 'react';

interface WarehouseFormData {
    name: string;
    code: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    status: 'Active' | 'Inactive';
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
    const [formData, setFormData] = React.useState<WarehouseFormData>({
        name: '',
        code: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        status: 'Active',
    });

    const handleChange = (
        field: keyof WarehouseFormData,
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

        onSubmit(formData);

        setFormData({
            name: '',
            code: '',
            address: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            status: 'Active',
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Add Warehouse
            </DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: '1fr 1fr',
                        },
                        gap: 2,
                        pt: 1,
                    }}
                >
                    <TextField
                        label="Warehouse Name"
                        value={formData.name}
                        onChange={(event) =>
                            handleChange('name', event.target.value)
                        }
                        fullWidth
                        required
                    />

                    <TextField
                        label="Warehouse Code"
                        value={formData.code}
                        onChange={(event) =>
                            handleChange('code', event.target.value)
                        }
                        fullWidth
                        required
                    />

                    <TextField
                        label="Address"
                        value={formData.address}
                        onChange={(event) =>
                            handleChange('address', event.target.value)
                        }
                        fullWidth
                        sx={{
                            gridColumn: {
                                xs: 'auto',
                                sm: '1 / -1',
                            },
                        }}
                    />

                    <TextField
                        label="City"
                        value={formData.city}
                        onChange={(event) =>
                            handleChange('city', event.target.value)
                        }
                        fullWidth
                    />

                    <TextField
                        label="State"
                        value={formData.state}
                        onChange={(event) =>
                            handleChange('state', event.target.value)
                        }
                        fullWidth
                    />

                    <TextField
                        label="Country"
                        value={formData.country}
                        onChange={(event) =>
                            handleChange('country', event.target.value)
                        }
                        fullWidth
                    />

                    <TextField
                        label="Postal Code"
                        value={formData.postalCode}
                        onChange={(event) =>
                            handleChange('postalCode', event.target.value)
                        }
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>

                        <Select
                            label="Status"
                            value={formData.status}
                            onChange={(event) =>
                                handleChange(
                                    'status',
                                    event.target.value,
                                )
                            }
                        >
                            <MenuItem value="Active">
                                Active
                            </MenuItem>

                            <MenuItem value="Inactive">
                                Inactive
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={onClose}
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