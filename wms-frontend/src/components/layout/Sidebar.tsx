import {
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { NavLink } from 'react-router-dom';

const navigation = [
    {
        section: 'GENERAL',
        items: [
            {
                label: 'Dashboard',
                path: '/dashboard',
                icon: <DashboardOutlinedIcon />,
            },
        ],
    },
    {
        section: 'OPERATIONS',
        items: [
            {
                label: 'Warehouses',
                path: '/warehouses',
                icon: <WarehouseOutlinedIcon />,
            },
            {
                label: 'Products',
                path: '/products',
                icon: <Inventory2OutlinedIcon />,
            },
            {
                label: 'Inventory',
                path: '/inventory',
                icon: <Inventory2OutlinedIcon />,
            },
        ],
    },
    {
        section: 'WAREHOUSE',
        items: [
            {
                label: 'Receiving',
                path: '/receiving',
                icon: <MoveToInboxOutlinedIcon />,
            },
            {
                label: 'Picking',
                path: '/picking',
                icon: <ShoppingCartOutlinedIcon />,
            },
            {
                label: 'Shipping',
                path: '/shipping',
                icon: <LocalShippingOutlinedIcon />,
            },
        ],
    },
    {
        section: 'SYSTEM',
        items: [
            {
                label: 'Users',
                path: '/users',
                icon: <PeopleOutlinedIcon />,
            },
            {
                label: 'Settings',
                path: '/settings',
                icon: <SettingsOutlinedIcon />,
            },
        ],
    },
];

const Sidebar = () => {
    return (
        <Box
            sx={{
                width: 250,
                height: '100vh',
                backgroundColor: '#0D0D0D',
                borderRight: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
            }}
        >
            {/* Logo */}
            <Box
                sx={{
                    height: 70,
                    display: 'flex',
                    alignItems: 'center',
                    px: 3,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 800,
                        letterSpacing: 1,
                    }}
                >
                    WMS
                </Typography>
            </Box>

            <Divider />

            {/* Navigation */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    py: 2,
                }}
            >
                {navigation.map((group) => (
                    <Box key={group.section} sx={{ mb: 2 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                display: 'block',
                                px: 3,
                                mb: 1,
                                color: 'text.secondary',
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: 1,
                            }}
                        >
                            {group.section}
                        </Typography>

                        <List disablePadding>
                            {group.items.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    style={{ textDecoration: 'none' }}
                                >
                                    {({ isActive }) => (
                                        <ListItemButton
                                            sx={{
                                                mx: 1,
                                                mb: 0.5,
                                                borderRadius: 1,
                                                color: isActive
                                                    ? 'text.primary'
                                                    : 'text.secondary',

                                                backgroundColor: isActive
                                                    ? '#1A1A1A'
                                                    : 'transparent',

                                                '& .MuiListItemIcon-root': {
                                                    color: isActive
                                                        ? 'text.primary'
                                                        : 'text.secondary',
                                                    minWidth: 38,
                                                },

                                                '&:hover': {
                                                    backgroundColor: '#1A1A1A',
                                                    color: 'text.primary',

                                                    '& .MuiListItemIcon-root': {
                                                        color: 'text.primary',
                                                    },
                                                },
                                            }}
                                        >
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>

                                            <ListItemText
                                                primary={item.label}
                                                slotProps={{
                                                    primary: {
                                                        sx: {
                                                            fontSize: 14,
                                                            fontWeight: 600,
                                                        },
                                                    },
                                                }}
                                            />
                                        </ListItemButton>
                                    )}
                                </NavLink>
                            ))}
                        </List>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Sidebar;