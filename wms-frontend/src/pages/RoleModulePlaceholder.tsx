import { Box, Card, CardContent, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface RoleModulePlaceholderProps {
  title: string;
  adminDescription: string;
  vendorDescription: string;
}

const RoleModulePlaceholder = ({
  title,
  adminDescription,
  vendorDescription,
}: RoleModulePlaceholderProps) => {
  const { user } = useAuth();

  const description =
    user?.role === 'ADMIN'
      ? adminDescription
      : vendorDescription;

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight:700}}>
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.5 }}
      >
        {description}
      </Typography>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6">
            Module coming soon
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            This module will be built and connected to the backend later.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RoleModulePlaceholder;