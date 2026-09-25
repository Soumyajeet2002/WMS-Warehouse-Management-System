import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const Topbar = () => {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: '#0A0A0A',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Toolbar
                sx={{
                    minHeight: '70px !important',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {/* Page title */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    Dashboard
                </Typography>

                {/* Right side */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <IconButton
                        sx={{
                            color: 'text.secondary',
                        }}
                    >
                        <NotificationsNoneOutlinedIcon />
                    </IconButton>

                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            ml: 1,
                            backgroundColor: '#2A2A2A',
                            color: '#FFFFFF',
                            fontSize: 14,
                        }}
                    >
                        A
                    </Avatar>

                    <Box sx={{ ml: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            Admin
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Administrator
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;