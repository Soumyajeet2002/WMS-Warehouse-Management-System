import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h5" sx={{fontWeight: 700}}>
        Admin Dashboard
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.5 }}
      >
        Manage your warehouse operations and system.
      </Typography>

      <Grid container spacing={2.5} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Total Warehouses
              </Typography>

              <Typography variant="h4" sx={{fontWeight: 700, mt: 1 }}>
                3
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Total Products
              </Typography>

              <Typography variant="h4" sx={{fontWeight: 700, mt: 1 }}>
                1,248
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Users
              </Typography>

              <Typography variant="h4" sx={{fontWeight: 700, mt: 1 }}>
                24
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">
            Welcome, {user?.email}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            You are logged in as an administrator.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;