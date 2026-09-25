import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',

        background: {
            default: '#0A0A0A',
            paper: '#111111',
        },

        primary: {
            main: '#FFFFFF',
        },

        text: {
            primary: '#FFFFFF',
            secondary: '#A3A3A3',
        },

        divider: '#262626',
    },

    typography: {
        fontFamily: 'Inter, Arial, Helvetica, sans-serif',

        h4: {
            fontWeight: 600,
        },

        h5: {
            fontWeight: 600,
        },

        h6: {
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 8,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: '1px solid #262626',
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#111111',

                    '& fieldset': {
                        borderColor: '#2A2A2A',
                    },

                    '&:hover fieldset': {
                        borderColor: '#444444',
                    },
                },
            },
        },
    },
});

export default theme;