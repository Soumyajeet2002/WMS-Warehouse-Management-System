import { Box, Typography } from '@mui/material';

const Dashboard = () => {
    return (
        <Box>
            <Typography variant="h4">
                Dashboard
            </Typography>

            <Typography sx={{ mt: 2 }}>
                Welcome to the Warehouse Management System.
            </Typography>
        </Box>
    );
};

export default Dashboard;