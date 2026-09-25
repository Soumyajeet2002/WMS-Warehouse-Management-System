import { Box } from '@mui/material';

import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout;