import { Box, Typography } from '@mui/material';

interface ModulePlaceholderProps {
    title: string;
    description: string;
}

const ModulePlaceholder = ({
    title,
    description,
}: ModulePlaceholderProps) => {
    return (
        <Box>
            <Typography variant="h5">
                {title}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
            >
                {description}
            </Typography>

            <Box
                sx={{
                    mt: 4,
                    p: 4,
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 2,
                    textAlign: 'center',
                }}
            >
                <Typography color="text.secondary">
                    This module will be built next.
                </Typography>
            </Box>
        </Box>
    );
};

export default ModulePlaceholder;