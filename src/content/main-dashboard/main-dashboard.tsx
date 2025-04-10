import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

function MainDashboard() {
    return (
      <Container maxWidth="xl" className="mt-2">
        <Card sx={{ p: 2, mb: 10, borderRadius: 1 }}>
          <Outlet />
        </Card>
      </Container>
    );
  }
export default MainDashboard;
  