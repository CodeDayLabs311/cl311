import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// Color Scheme:
// #ECF2F8: Light blue
// #96b6d4: Mild blue
// #477096: Dark blue
// #4F4846: Black
// #FDF8F5: White

// Define custom styles
const StyledReportDetails = styled(Box)({
    '& p': {
        margin: 0,
        padding: '5px 0',
        color: '#4F4846',
    },
    '& strong': {
        color: '#4F4846',
        textAlign: 'center',
    },
    borderRadius: '2px',
    marginRight: '10px',
    marginLeft: '10px',
    background: '#FDF8F5',
});

const Box1 = styled(Box)({
    padding: '15px',
    marginBottom: '15px',
    marginTop: '15px',
    border: '2px solid #ccc',
    borderRadius: '30px',
    background: 'linear-gradient(45deg, #ECF2F8, #FDF8F5)',

    '&:hover': {
        background: 'linear-gradient(45deg, #FDF8F5, #ECF2F8)',
    },
});

const Heading = styled(Typography)({
    color: '#477096',
    fontWeight: 'bold',
    marginBottom: '10px',
});

const FooterDetails = styled(Box)({
    borderRadius: '2px',
    marginRight: '10px',
    marginLeft: '10px',
    background: '#FDF8F5',
});

const IDText = styled('span')({
    color: '#477096',
    fontWeight: 'bold',
});

const PageTitle = styled(Typography)({
    color: '#477096',
    fontWeight: 'bold',
    textAlign: 'center',
});

export { StyledReportDetails, Box1, Heading, FooterDetails, IDText, PageTitle };
