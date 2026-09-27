import React from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import api from '../services/api';

interface CurrentUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'VENDOR';
  vendorId: string | null;
}

const Dashboard = () => {
  const [user, setUser] = React.useState<CurrentUser | null>(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get<CurrentUser>('/auth/me');

        setUser(response.data);
      } catch (error: any) {
        console.error('Failed to fetch current user:', error);

        setError('Could not authenticate with the backend.');
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Dashboard
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.5 }}
      >
        Overview of your warehouse operations.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {user && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6">
              Authenticated User
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Email: {user.email}
            </Typography>

            <Typography>
              Role: {user.role}
            </Typography>

            <Typography>
              User ID: {user.id}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Dashboard;