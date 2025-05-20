import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Box } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { patients } from "../../shared/service/patinetService";
import { AppDispatch } from "../../redux-store/stores/store";
import { drugs } from "../../shared/service/drugService";
import { suppliers } from "../../shared/service/supplierService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import InvoiceTable from "./InvoiceTable";
import { getInvoiceList } from "../../shared/service/invoiceService";

function MainDashboard() {
  const { patinet } = useSelector((state: any) => state.patinet);
  const { drug } = useSelector((state: any) => state.drug);
  const { invoiceList } = useSelector((state: any) => state.invoice);
  const { supplier } = useSelector((state: any) => state.supplier);
  const dispath: AppDispatch = useDispatch();
  const getPatientsCalled = useRef(false);
  const data = [
    { name: "Patients", count: patinet.length },
    { name: "Drugs", count: drug.length },
    { name: "Suppliers", count: supplier.length },
  ];

  useEffect(() => {
    if (!getPatientsCalled.current) {
      dispath(patients());
      dispath(drugs());
      dispath(suppliers());
      dispath(getInvoiceList());
      getPatientsCalled.current = true;
    }
  }, [dispath]);

  console.log("patinet", patinet);
  const handleEdit = (drug: any) => {
    // setSelecteddrug(drug);
    // setIsEditMode(true);
    // setOpen(true);
  };

  return (
    <Container maxWidth="xl" className="mt-2">
      <h1
        style={{
          color: "#064e3b",
          fontSize: "2rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        Main Dashboard
      </h1>
      <h3
        style={{
          color: "black",
          fontSize: "1.5rem",
          marginBottom: "30px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        Overview of Patients, Drugs, and Suppliers
      </h3>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, display: "flex", alignItems: "center" }}>
            <LocalHospitalIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Patients</Typography>
              <Typography variant="h4">{patinet.length}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, display: "flex", alignItems: "center" }}>
            <MedicationIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Drugs</Typography>
              <Typography variant="h4">{drug.length}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, display: "flex", alignItems: "center" }}>
            <LocalShippingIcon sx={{ color: "#4caf50", fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Suppliers</Typography>
              <Typography variant="h4">{supplier.length}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item md={6}>
          <Card>
            <InvoiceTable
              Invoices={invoiceList || []}
              onEdit={handleEdit}
              patinetList={patinet}
            />
          </Card>
        </Grid>

        <Grid item md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Statistics Overview
            </Typography>
            <ResponsiveContainer width="100%" height={395}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      <Outlet />
    </Container>
  );
}

export default MainDashboard;
