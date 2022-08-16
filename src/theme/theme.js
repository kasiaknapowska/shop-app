import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00BE96',
        },
        secondary: {
            main: '#802C6E',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Poppins"',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderRadius: '5px',
                    border: '1px solid #E0E0E0'
                },
                root: {
                    fontSize: '1rem',
                    fontWeight: '400',
                    margin: '.8rem 0'
                },
                input: {
                    padding: '.8rem',
                }
            }
        },
    }
});

export default theme;
