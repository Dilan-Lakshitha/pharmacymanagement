import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import pharmacyLogo from '../../assets/logoOutline.png';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        align-items: center;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(30)};
        font-weight: ${theme.typography.fontWeightBold};
        color: white;
        margin-left: ${theme.spacing(1)};
`
);

function Logo() {
  return (
    <LogoWrapper to="/overview">
      <img src={pharmacyLogo} alt="Logo" style={{ width: '200px', height: '80px' }} />
      <LogoText>MediCare</LogoText>
    </LogoWrapper>
  );
}

export default Logo;
