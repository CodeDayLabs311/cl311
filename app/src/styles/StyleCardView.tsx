import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import ButtonLink from '@/components/ButtonLink';
import {LIGHT_BLUE, MILD_BLUE, DARK_BLUE } from '@/styles/ColorScheme';

// Define custom styles
const StyledReportDetails = styled(Box)({
    '& p': {
        margin: 0,
        padding: '5px 0',
        color: `black`,
    },
    '& strong': {
        color: `black`,
        textAlign: 'center',
    },
    borderRadius: '2px',
    background: `white`,
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
});

const GroupedBox = styled(Box)({
    padding: '15px',
    marginBottom: '15px',
    marginTop: '15px',
    marginLeft: '15px',
    marginRight: '15px',
    border: '2px solid #ccc',
    borderRadius: '30px',
    background: `linear-gradient(45deg, ${LIGHT_BLUE}, white)`,
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',

    '&:hover': {
        background: `linear-gradient(45deg, white, ${LIGHT_BLUE})`,
    },
});

const Heading = styled('span')({
    color: `${DARK_BLUE}`,
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '1.3rem',
    fontFamily: "'Roboto', sans-serif",
    lineHeight: 1.5, 
});

const FooterDetails = styled(Box)({
    borderRadius: '2px',
    background: `white`,
    boxShadow:
        '-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.3)',
});

const IDText = styled('span')({
    color: `${DARK_BLUE}`,
    fontWeight: 'bold',
});

const PageTitle = styled(Typography)({
    color: `${DARK_BLUE}`,
    fontWeight: 'bold',
    textAlign: 'center',
});

const StyledButton = styled(ButtonLink)({
    borderRadius: '10px',
    background: `linear-gradient(45deg, ${MILD_BLUE}, white)`,
    color: `black`,
    border: '2px solid #ccc',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    fontWeight: 'bold',
    '&:hover': {
        background: `linear-gradient(45deg, white, ${MILD_BLUE})`,
        color: 'blue',
        border: '2px solid blue',
    },
});

export { StyledReportDetails, GroupedBox, Heading, FooterDetails, IDText, PageTitle, StyledButton };
