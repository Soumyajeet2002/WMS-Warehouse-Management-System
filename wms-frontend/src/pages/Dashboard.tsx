import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';

const Dashboard = () => {
    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5">
                    Dashboard
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Overview of your warehouse operations.
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Total Inventory
                            </Typography>

                            <Typography
                                variant="h4"
                                sx={{ mt: 1, fontWeight: 700 }}
                            >
                                12,480
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Pending Orders
                            </Typography>

                            <Typography
                                variant="h4"
                                sx={{ mt: 1, fontWeight: 700 }}
                            >
                                324
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Low Stock Items
                            </Typography>

                            <Typography
                                variant="h4"
                                sx={{ mt: 1, fontWeight: 700 }}
                            >
                                18
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;