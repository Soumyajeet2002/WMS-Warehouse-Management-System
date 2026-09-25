import React from 'react';

import {
    Box,
    Button,
    Card,
    Chip,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import WarehouseForm from './WarehouseForm';

interface Warehouse {
    id: number;
    name: string;
    code: string;
    locations: number;
    status: 'Active' | 'Inactive';
}

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

const initialWarehouses: Warehouse[] = [
    {
        id: 1,
        name: 'Bhubaneswar Warehouse',
        code: 'WH-BBSR-01',
        locations: 128,
        status: 'Active',
    },
    {
        id: 2,
        name: 'Delhi Warehouse',
        code: 'WH-DEL-01',
        locations: 84,
        status: 'Active',
    },
    {
        id: 3,
        name: 'Mumbai Warehouse',
        code: 'WH-MUM-01',
        locations: 156,
        status: 'Inactive',
    },
];

const Warehouses = () => {
    const [warehouses, setWarehouses] =
        React.useState<Warehouse[]>(
            initialWarehouses,
        );

    const [search, setSearch] =
        React.useState('');

    const [isFormOpen, setIsFormOpen] =
        React.useState(false);

    const handleCreateWarehouse = (
        data: WarehouseFormData,
    ) => {
        const newWarehouse: Warehouse = {
            id: Date.now(),
            name: data.name,
            code: data.code,
            locations: 0,
            status: data.status,
        };

        setWarehouses((previous) => [
            ...previous,
            newWarehouse,
        ]);

        setIsFormOpen(false);
    };

    const filteredWarehouses =
        warehouses.filter((warehouse) => {
            const searchValue =
                search.toLowerCase();

            return (
                warehouse.name
                    .toLowerCase()
                    .includes(searchValue) ||
                warehouse.code
                    .toLowerCase()
                    .includes(searchValue)
            );
        });

    return (
        <Box>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: {
                        xs: 'flex-start',
                        sm: 'center',
                    },
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box>
                    <Typography variant="h5">
                        Warehouses
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Manage your warehouse facilities.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={
                        <AddOutlinedIcon />
                    }
                    onClick={() =>
                        setIsFormOpen(true)
                    }
                >
                    Add Warehouse
                </Button>
            </Box>

            {/* Search */}
            <Card
                sx={{
                    p: 2,
                    mb: 2,
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Search warehouses..."
                    size="small"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon
                                    sx={{
                                        color:
                                            'text.secondary',
                                    }}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
            </Card>

            {/* Warehouse Table */}
            <Card
                sx={{
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns:
                            '2fr 1fr 1fr 1fr 60px',
                        gap: 2,
                        px: 3,
                        py: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: '#0D0D0D',
                    }}
                >
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                    >
                        WAREHOUSE
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                    >
                        CODE
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                    >
                        LOCATIONS
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                    >
                        STATUS
                    </Typography>

                    <Box />
                </Box>

                {/* Rows */}
                {filteredWarehouses.map(
                    (warehouse) => (
                        <Box
                            key={warehouse.id}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns:
                                    '2fr 1fr 1fr 1fr 60px',
                                gap: 2,
                                alignItems: 'center',
                                px: 3,
                                py: 2,
                                borderBottom: '1px solid',
                                borderColor: 'divider',

                                '&:last-child': {
                                    borderBottom: 'none',
                                },

                                '&:hover': {
                                    backgroundColor:
                                        '#151515',
                                },
                            }}
                        >
                            <Typography
                                variant="body2"
                                fontWeight={600}
                            >
                                {warehouse.name}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {warehouse.code}
                            </Typography>

                            <Typography variant="body2">
                                {warehouse.locations}
                            </Typography>

                            <Chip
                                label={warehouse.status}
                                size="small"
                                variant="outlined"
                                sx={{
                                    width: 'fit-content',
                                    borderColor:
                                        warehouse.status ===
                                            'Active'
                                            ? '#555555'
                                            : '#333333',
                                    color:
                                        warehouse.status ===
                                            'Active'
                                            ? '#FFFFFF'
                                            : '#777777',
                                }}
                            />

                            <IconButton
                                size="small"
                                sx={{
                                    color:
                                        'text.secondary',
                                }}
                            >
                                <MoreVertOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ),
                )}

                {/* Empty State */}
                {filteredWarehouses.length ===
                    0 && (
                        <Box
                            sx={{
                                py: 6,
                                textAlign: 'center',
                            }}
                        >
                            <Typography
                                color="text.secondary"
                            >
                                No warehouses found.
                            </Typography>
                        </Box>
                    )}
            </Card>

            {/* Add Warehouse Dialog */}
            <WarehouseForm
                open={isFormOpen}
                onClose={() =>
                    setIsFormOpen(false)
                }
                onSubmit={
                    handleCreateWarehouse
                }
            />
        </Box>
    );
};

export default Warehouses;