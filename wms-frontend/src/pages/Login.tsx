import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from '@mui/material';

const Login = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 420,
                    p: 4,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                    }}
                >
                    WMS
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    {/* Warehouse Management System */}
                </Typography>

                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        py: 1.3,
                        backgroundColor: '#FFFFFF',
                        color: '#000000',

                        '&:hover': {
                            backgroundColor: '#E5E5E5',
                        },
                    }}
                >
                    Sign in
                </Button>
            </Paper>
        </Box>
    );
};

export default Login;