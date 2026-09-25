import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

const DashboardLayout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'background.default',
            }}
        >
            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Topbar />

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        p: 3,
                        overflow: 'auto',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout;