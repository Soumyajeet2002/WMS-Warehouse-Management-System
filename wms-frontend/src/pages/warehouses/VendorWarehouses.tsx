import React from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    InputAdornment,
    LinearProgress,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import MoveToInboxOutlinedIcon from "@mui/icons-material/MoveToInboxOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import WarehouseForm from "./WarehouseForm";
import EditWarehouseForm from "./EditWarehouseForm";
import api from "../../services/api";

interface Warehouse {
    id: string;
    name: string;
    code: string;
    address: string | null;
    vendorId: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

interface WarehouseFormData {
    code: string;
    name: string;
    address: string;
}

interface WarehouseMetrics {
    inventory: number;
    orders: number;
    shipments: number;
    receiving: number;
    picking: number;
    capacity: number;
}

const dummyMetrics: WarehouseMetrics[] = [
    {
        inventory: 12480,
        orders: 128,
        shipments: 63,
        receiving: 24,
        picking: 48,
        capacity: 82,
    },
    {
        inventory: 18920,
        orders: 214,
        shipments: 91,
        receiving: 38,
        picking: 76,
        capacity: 91,
    },
    {
        inventory: 9420,
        orders: 87,
        shipments: 42,
        receiving: 19,
        picking: 34,
        capacity: 64,
    },
    {
        inventory: 8100,
        orders: 62,
        shipments: 31,
        receiving: 15,
        picking: 28,
        capacity: 73,
    },
];

const recentActivity = [
    {
        title: "Stock received",
        description: "48 products added to inventory",
        time: "10 min ago",
        icon: <MoveToInboxOutlinedIcon />,
    },
    {
        title: "Order picked",
        description: "Order #ORD-10482 completed",
        time: "25 min ago",
        icon: <ShoppingCartOutlinedIcon />,
    },
    {
        title: "Shipment created",
        description: "Shipment #SHP-7842 is ready",
        time: "42 min ago",
        icon: <LocalShippingOutlinedIcon />,
    },
    {
        title: "Inventory updated",
        description: "Cycle count completed",
        time: "1 hr ago",
        icon: <Inventory2OutlinedIcon />,
    },
];

const VendorWarehouses = () => {
    const [warehouses, setWarehouses] = React.useState<Warehouse[]>([]);
    const [search, setSearch] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("ALL");

    const [loading, setLoading] = React.useState(true);
    const [creating, setCreating] = React.useState(false);
    const [updating, setUpdating] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);

    const [error, setError] = React.useState("");

    const [isFormOpen, setIsFormOpen] = React.useState(false);

    const [editingWarehouse, setEditingWarehouse] =
        React.useState<Warehouse | null>(null);

    const [deleteWarehouse, setDeleteWarehouse] =
        React.useState<Warehouse | null>(null);

    const fetchWarehouses = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/warehouses");

            setWarehouses(response.data);
        } catch (error: any) {
            console.error("Failed to fetch warehouses:", error);

            setError(
                error.response?.status === 401
                    ? "Your session has expired. Please login again."
                    : "Failed to load warehouses.",
            );
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchWarehouses();
    }, []);

    const handleCreateWarehouse = async (
        data: WarehouseFormData,
    ) => {
        try {
            setCreating(true);
            setError("");

            await api.post("/warehouses", {
                code: data.code,
                name: data.name,
                address: data.address || undefined,
            });

            setIsFormOpen(false);

            await fetchWarehouses();
        } catch (error: any) {
            console.error("Failed to create warehouse:", error);

            setError(
                error.response?.status === 409
                    ? "A warehouse with this code already exists."
                    : "Failed to create warehouse.",
            );
        } finally {
            setCreating(false);
        }
    };

    const handleUpdateWarehouse = async (
        data: WarehouseFormData,
    ) => {
        if (!editingWarehouse) {
            return;
        }

        try {
            setUpdating(true);
            setError("");

            await api.patch(
                `/warehouses/${editingWarehouse.id}`,
                {
                    code: data.code,
                    name: data.name,
                    address: data.address || undefined,
                },
            );

            setEditingWarehouse(null);

            await fetchWarehouses();
        } catch (error: any) {
            console.error("Failed to update warehouse:", error);

            setError(
                error.response?.status === 409
                    ? "A warehouse with this code already exists."
                    : "Failed to update warehouse.",
            );
        } finally {
            setUpdating(false);
        }
    };

    const handleDeleteWarehouse = async () => {
        if (!deleteWarehouse) {
            return;
        }

        try {
            setDeleting(true);
            setError("");

            await api.delete(
                `/warehouses/${deleteWarehouse.id}`,
            );

            setDeleteWarehouse(null);

            await fetchWarehouses();
        } catch (error: any) {
            console.error("Failed to delete warehouse:", error);

            setError(
                error.response?.status === 409
                    ? "Warehouse is already inactive."
                    : "Failed to deactivate warehouse.",
            );
        } finally {
            setDeleting(false);
        }
    };

    const filteredWarehouses = warehouses.filter(
        (warehouse) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                warehouse.name
                    .toLowerCase()
                    .includes(searchValue) ||
                warehouse.code
                    .toLowerCase()
                    .includes(searchValue) ||
                warehouse.address
                    ?.toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                statusFilter === "ALL" ||
                (statusFilter === "ACTIVE" &&
                    warehouse.isActive) ||
                (statusFilter === "INACTIVE" &&
                    !warehouse.isActive);

            return matchesSearch && matchesStatus;
        },
    );

    const totalWarehouses = warehouses.length;

    const activeWarehouses = warehouses.filter(
        (warehouse) => warehouse.isActive,
    ).length;

    const inactiveWarehouses = warehouses.filter(
        (warehouse) => !warehouse.isActive,
    ).length;

    const totalInventory = warehouses.reduce(
        (total, _, index) =>
            total +
            (dummyMetrics[
                index % dummyMetrics.length
            ]?.inventory ?? 0),
        0,
    );

    const averageCapacity = warehouses.length
        ? Math.round(
              warehouses.reduce(
                  (total, _, index) =>
                      total +
                      (dummyMetrics[
                          index % dummyMetrics.length
                      ]?.capacity ?? 0),
                  0,
              ) / warehouses.length,
          )
        : 0;

    const handleStatusChange = (
        event: SelectChangeEvent,
    ) => {
        setStatusFilter(event.target.value);
    };

    return (
        <Box
            sx={{
                width: "100%",
                pb: 5,
            }}
        >
            {/* =====================================================
                HEADER
            ===================================================== */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "flex-start",
                        md: "center",
                    },
                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: "-0.5px",
                        }}
                    >
                        Warehouses
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Monitor facilities, inventory and
                        warehouse operations.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddOutlinedIcon />}
                    onClick={() => setIsFormOpen(true)}
                    disabled={creating}
                    sx={{
                        px: 2.5,
                        py: 1.2,
                        borderRadius: 2,
                        fontWeight: 700,
                    }}
                >
                    Add Warehouse
                </Button>
            </Box>

            {/* =====================================================
                ERROR
            ===================================================== */}

            {error && (
                <Alert
                    severity="error"
                    sx={{
                        mb: 3,
                        borderRadius: 2,
                    }}
                >
                    {error}
                </Alert>
            )}

            {/* =====================================================
                TOP METRICS
            ===================================================== */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        lg: "repeat(5, 1fr)",
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                <MetricCard
                    icon={<WarehouseOutlinedIcon />}
                    label="Total Warehouses"
                    value={totalWarehouses}
                    footer="All registered facilities"
                />

                <MetricCard
                    icon={<TrendingUpOutlinedIcon />}
                    label="Active"
                    value={activeWarehouses}
                    footer="Currently operational"
                />

                <MetricCard
                    icon={<WarehouseOutlinedIcon />}
                    label="Inactive"
                    value={inactiveWarehouses}
                    footer="Deactivated facilities"
                />

                <MetricCard
                    icon={<Inventory2OutlinedIcon />}
                    label="Inventory Units"
                    value={totalInventory.toLocaleString()}
                    footer="Demo operational data"
                />

                <MetricCard
                    icon={<TrendingUpOutlinedIcon />}
                    label="Avg. Capacity"
                    value={`${averageCapacity}%`}
                    footer="Current utilization"
                />
            </Box>

            {/* =====================================================
                OVERVIEW PANELS
            ===================================================== */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 1.5fr",
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                {/* Inventory Overview */}

                <Card
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        background:
                            "linear-gradient(145deg, #111111, #0D0D0D)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                        }}
                    >
                        <Box>
                            <Typography fontWeight={700}>
                                Inventory Overview
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Current warehouse utilization
                            </Typography>
                        </Box>

                        <Inventory2OutlinedIcon
                            sx={{
                                color: "text.secondary",
                            }}
                        />
                    </Box>

                    <Typography
                        variant="h3"
                        fontWeight={800}
                        sx={{ mb: 1 }}
                    >
                        {totalInventory.toLocaleString()}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                    >
                        Total inventory units
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={averageCapacity || 0}
                        sx={{
                            height: 8,
                            borderRadius: 10,
                            backgroundColor: "#222222",
                            mb: 1.5,
                            "& .MuiLinearProgress-bar": {
                                borderRadius: 10,
                            },
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Utilization
                        </Typography>

                        <Typography
                            variant="caption"
                            fontWeight={700}
                        >
                            {averageCapacity}%
                        </Typography>
                    </Box>
                </Card>

                {/* Warehouse Utilization */}

                <Card
                    sx={{
                        p: 3,
                        borderRadius: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                        }}
                    >
                        <Box>
                            <Typography fontWeight={700}>
                                Warehouse Utilization
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Capacity across facilities
                            </Typography>
                        </Box>

                        <TrendingUpOutlinedIcon
                            sx={{
                                color: "text.secondary",
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {warehouses
                            .slice(0, 4)
                            .map(
                                (
                                    warehouse,
                                    index,
                                ) => {
                                    const metric =
                                        dummyMetrics[
                                            index %
                                                dummyMetrics.length
                                        ];

                                    return (
                                        <Box
                                            key={
                                                warehouse.id
                                            }
                                        >
                                            <Box
                                                sx={{
                                                    display:
                                                        "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    mb: 0.6,
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={
                                                        600
                                                    }
                                                >
                                                    {
                                                        warehouse.name
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {
                                                        metric.capacity
                                                    }
                                                    %
                                                </Typography>
                                            </Box>

                                            <LinearProgress
                                                variant="determinate"
                                                value={
                                                    metric.capacity
                                                }
                                                sx={{
                                                    height: 6,
                                                    borderRadius: 10,
                                                    backgroundColor:
                                                        "#222222",
                                                    "& .MuiLinearProgress-bar":
                                                        {
                                                            borderRadius: 10,
                                                        },
                                                }}
                                            />
                                        </Box>
                                    );
                                },
                            )}

                        {warehouses.length === 0 && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                No warehouse data available.
                            </Typography>
                        )}
                    </Box>
                </Card>
            </Box>

            {/* =====================================================
                SEARCH + FILTER
            ===================================================== */}

            <Card
                sx={{
                    p: 1.5,
                    mb: 2,
                    borderRadius: 2.5,
                    display: "flex",
                    gap: 1.5,
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                <TextField
                    size="small"
                    placeholder="Search warehouses..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    sx={{
                        flex: 1,
                        minWidth: 220,
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon
                                    fontSize="small"
                                    sx={{
                                        color: "text.secondary",
                                    }}
                                />
                            </InputAdornment>
                        ),
                    }}
                />

                <Select
                    size="small"
                    value={statusFilter}
                    onChange={handleStatusChange}
                    sx={{
                        minWidth: 140,
                    }}
                >
                    <MenuItem value="ALL">
                        All Status
                    </MenuItem>

                    <MenuItem value="ACTIVE">
                        Active
                    </MenuItem>

                    <MenuItem value="INACTIVE">
                        Inactive
                    </MenuItem>
                </Select>
            </Card>

            {/* =====================================================
                WAREHOUSE TABLE
            ===================================================== */}

            <Card
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        p: 2.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Box>
                        <Typography fontWeight={700}>
                            Warehouse Facilities
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {filteredWarehouses.length}{" "}
                            facilities displayed
                        </Typography>
                    </Box>

                    <IconButton>
                        <MoreHorizOutlinedIcon />
                    </IconButton>
                </Box>

                {loading ? (
                    <Box
                        sx={{
                            minHeight: 280,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {/* Desktop Header */}

                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "grid",
                                },
                                gridTemplateColumns:
                                    "2fr 1fr 1.5fr 1fr 1fr 100px",
                                gap: 2,
                                px: 3,
                                py: 1.5,
                                backgroundColor: "#0D0D0D",
                                borderBottom: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            {[
                                "WAREHOUSE",
                                "CODE",
                                "LOCATION",
                                "INVENTORY",
                                "STATUS",
                                "ACTIONS",
                            ].map((heading) => (
                                <Typography
                                    key={heading}
                                    variant="caption"
                                    color="text.secondary"
                                    fontWeight={700}
                                >
                                    {heading}
                                </Typography>
                            ))}
                        </Box>

                        {filteredWarehouses.map(
                            (
                                warehouse,
                                index,
                            ) => {
                                const metric =
                                    dummyMetrics[
                                        index %
                                            dummyMetrics.length
                                    ];

                                return (
                                    <Box
                                        key={
                                            warehouse.id
                                        }
                                        sx={{
                                            display: {
                                                xs: "flex",
                                                md: "grid",
                                            },
                                            gridTemplateColumns:
                                                "2fr 1fr 1.5fr 1fr 1fr 100px",
                                            flexDirection:
                                                "column",
                                            gap: {
                                                xs: 1.5,
                                                md: 2,
                                            },
                                            alignItems:
                                                "center",
                                            px: 3,
                                            py: 2.2,
                                            borderBottom:
                                                "1px solid",
                                            borderColor:
                                                "divider",
                                            transition:
                                                "background-color 0.2s",
                                            "&:hover": {
                                                backgroundColor:
                                                    "#151515",
                                            },
                                            "&:last-child": {
                                                borderBottom:
                                                    "none",
                                            },
                                        }}
                                    >
                                        {/* Warehouse */}

                                        <Box
                                            sx={{
                                                width: "100%",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    gap: 1.5,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 38,
                                                        height: 38,
                                                        borderRadius: 2,
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "center",
                                                        backgroundColor:
                                                            "#1A1A1A",
                                                    }}
                                                >
                                                    <WarehouseOutlinedIcon fontSize="small" />
                                                </Box>

                                                <Box>
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={
                                                            700
                                                        }
                                                    >
                                                        {
                                                            warehouse.name
                                                        }
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        Warehouse
                                                        facility
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        {/* Code */}

                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                        >
                                            {
                                                warehouse.code
                                            }
                                        </Typography>

                                        {/* Location */}

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                maxWidth: 180,
                                                overflow:
                                                    "hidden",
                                                textOverflow:
                                                    "ellipsis",
                                                whiteSpace:
                                                    "nowrap",
                                            }}
                                        >
                                            {warehouse.address ||
                                                "Location not specified"}
                                        </Typography>

                                        {/* Inventory */}

                                        <Box>
                                            <Typography
                                                variant="body2"
                                                fontWeight={700}
                                            >
                                                {metric.inventory.toLocaleString()}
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                units
                                            </Typography>
                                        </Box>

                                        {/* Status */}

                                        <Chip
                                            label={
                                                warehouse.isActive
                                                    ? "Active"
                                                    : "Inactive"
                                            }
                                            size="small"
                                            sx={{
                                                borderRadius: 1.5,
                                                fontWeight: 600,
                                                backgroundColor:
                                                    warehouse.isActive
                                                        ? "#1C1C1C"
                                                        : "#161616",
                                                color:
                                                    warehouse.isActive
                                                        ? "#FFFFFF"
                                                        : "#777777",
                                                border:
                                                    "1px solid #303030",
                                            }}
                                        />

                                        {/* Actions */}

                                        <Box
                                            sx={{
                                                display:
                                                    "flex",
                                                gap: 0.5,
                                                justifyContent:
                                                    "flex-end",
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    setEditingWarehouse(
                                                        warehouse,
                                                    )
                                                }
                                            >
                                                <EditOutlinedIcon fontSize="small" />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    setDeleteWarehouse(
                                                        warehouse,
                                                    )
                                                }
                                            >
                                                <DeleteOutlineOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                );
                            },
                        )}

                        {filteredWarehouses.length ===
                            0 && (
                            <Box
                                sx={{
                                    py: 8,
                                    textAlign: "center",
                                }}
                            >
                                <WarehouseOutlinedIcon
                                    sx={{
                                        fontSize: 42,
                                        color:
                                            "text.secondary",
                                        mb: 1,
                                    }}
                                />

                                <Typography fontWeight={600}>
                                    No warehouses found
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 0.5,
                                    }}
                                >
                                    Try changing your search
                                    or filter.
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </Card>

            {/* =====================================================
                BOTTOM OPERATIONS
            ===================================================== */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 1fr",
                    },
                    gap: 2,
                }}
            >
                {/* Recent Activity */}

                <Card
                    sx={{
                        p: 3,
                        borderRadius: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2.5,
                        }}
                    >
                        <Box>
                            <Typography fontWeight={700}>
                                Recent Activity
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Latest warehouse events
                            </Typography>
                        </Box>

                        <AccessTimeOutlinedIcon
                            sx={{
                                color: "text.secondary",
                            }}
                        />
                    </Box>

                    <Box>
                        {recentActivity.map(
                            (activity) => (
                                <Box
                                    key={
                                        activity.title
                                    }
                                    sx={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: 1.5,
                                        py: 1.5,
                                        borderBottom:
                                            "1px solid",
                                        borderColor:
                                            "divider",
                                        "&:last-child": {
                                            borderBottom:
                                                "none",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 2,
                                            backgroundColor:
                                                "#1A1A1A",
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center",
                                        }}
                                    >
                                        {
                                            activity.icon
                                        }
                                    </Box>

                                    <Box
                                        sx={{
                                            flex: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight={
                                                600
                                            }
                                        >
                                            {
                                                activity.title
                                            }
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {
                                                activity.description
                                            }
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {
                                            activity.time
                                        }
                                    </Typography>
                                </Box>
                            ),
                        )}
                    </Box>
                </Card>

                {/* Today's Operations */}

                <Card
                    sx={{
                        p: 3,
                        borderRadius: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2.5,
                        }}
                    >
                        <Box>
                            <Typography fontWeight={700}>
                                Operations Today
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Demo operational metrics
                            </Typography>
                        </Box>

                        <LocalShippingOutlinedIcon
                            sx={{
                                color: "text.secondary",
                            }}
                        />
                    </Box>

                    <OperationRow
                        label="Receiving"
                        value={42}
                        icon={
                            <MoveToInboxOutlinedIcon />
                        }
                    />

                    <OperationRow
                        label="Picking"
                        value={86}
                        icon={
                            <ShoppingCartOutlinedIcon />
                        }
                    />

                    <OperationRow
                        label="Shipping"
                        value={63}
                        icon={
                            <LocalShippingOutlinedIcon />
                        }
                    />

                    <OperationRow
                        label="Inventory Updates"
                        value={128}
                        icon={
                            <Inventory2OutlinedIcon />
                        }
                    />
                </Card>
            </Box>

            {/* =====================================================
                CREATE WAREHOUSE
            ===================================================== */}

            <WarehouseForm
                open={isFormOpen}
                onClose={() =>
                    setIsFormOpen(false)
                }
                onSubmit={handleCreateWarehouse}
            />

            {/* =====================================================
                EDIT WAREHOUSE
            ===================================================== */}

            <EditWarehouseForm
                open={Boolean(editingWarehouse)}
                warehouse={
                    editingWarehouse
                        ? {
                              code:
                                  editingWarehouse.code,
                              name:
                                  editingWarehouse.name,
                              address:
                                  editingWarehouse.address ??
                                  "",
                          }
                        : null
                }
                onClose={() =>
                    setEditingWarehouse(null)
                }
                onSubmit={handleUpdateWarehouse}
                loading={updating}
            />

            {/* =====================================================
                DELETE / DEACTIVATE
            ===================================================== */}

            <Dialog
                open={Boolean(deleteWarehouse)}
                onClose={
                    deleting
                        ? undefined
                        : () =>
                              setDeleteWarehouse(
                                  null,
                              )
                }
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    Deactivate Warehouse?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to
                        deactivate{" "}
                        <strong>
                            {deleteWarehouse?.name}
                        </strong>
                        ?

                        <br />
                        <br />

                        This warehouse will no longer be
                        available to the vendor.
                    </DialogContentText>
                </DialogContent>

                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2,
                    }}
                >
                    <Button
                        onClick={() =>
                            setDeleteWarehouse(
                                null,
                            )
                        }
                        color="inherit"
                        disabled={deleting}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleDeleteWarehouse
                        }
                        disabled={deleting}
                    >
                        {deleting
                            ? "Deactivating..."
                            : "Deactivate"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

/* =============================================================
   METRIC CARD
============================================================= */

interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    footer: string;
}

const MetricCard = ({
    icon,
    label,
    value,
    footer,
}: MetricCardProps) => {
    return (
        <Card
            sx={{
                p: 2.5,
                borderRadius: 3,
                background:
                    "linear-gradient(145deg, #111111, #0D0D0D)",
                transition:
                    "transform 0.2s, border-color 0.2s",
                "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: "#3A3A3A",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Box
                    sx={{
                        width: 38,
                        height: 38,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#1A1A1A",
                    }}
                >
                    {icon}
                </Box>
            </Box>

            <Typography
                variant="caption"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                variant="h4"
                fontWeight={800}
                sx={{ mt: 0.5 }}
            >
                {value}
            </Typography>

            <Typography
                variant="caption"
                color="text.secondary"
            >
                {footer}
            </Typography>
        </Card>
    );
};

/* =============================================================
   OPERATION ROW
============================================================= */

interface OperationRowProps {
    label: string;
    value: number;
    icon: React.ReactNode;
}

const OperationRow = ({
    label,
    value,
    icon,
}: OperationRowProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                py: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-child": {
                    borderBottom: "none",
                },
            }}
        >
            <Box
                sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    backgroundColor: "#1A1A1A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {icon}
            </Box>

            <Typography
                variant="body2"
                fontWeight={600}
                sx={{ flex: 1 }}
            >
                {label}
            </Typography>

            <Typography fontWeight={800}>
                {value}
            </Typography>
        </Box>
    );
};

export default VendorWarehouses;
