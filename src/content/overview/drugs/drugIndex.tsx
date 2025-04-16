import {  Container, Card } from '@mui/material';

import Dashboard from './drugDashboard/drugs';

function Overview() {
  return (
      <Container maxWidth="xl" className='mt-2'>
        <Card sx={{ p: 2, mb: 10, borderRadius: 1 }}>
          <Dashboard />
        </Card>
      </Container>
  );
}

export default Overview;
