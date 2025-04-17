import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
  Snackbar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { drugs } from "../../../shared/service/drugService";
import { AppDispatch } from "../../../redux-store/stores/store";
import {
  generateInvoice,
  getInvoiceDetails,
} from "../../../shared/service/invoiceService";
import { patients } from "../../../shared/service/patinetService";
import InvoiceDialog from "./invoiceDialog";

const InvoiceComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { drug, loading, error } = useSelector((state: any) => state.drug);
  const { success, invoice, invoiceId } = useSelector((state: any) => state.invoice);
  const patientList = useSelector((state: any) => state.patinet.patinet);
  const [selectedDrugId, setSelectedDrugId] = useState<number | "">("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<any[]>([]);
  const [snackbar, setSnackbar] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<number | "">("");
  const getInvoiceDetailsCalled = useRef(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(drugs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(patients());
  }, [dispatch]);

  const handleAddToCart = () => {
    const selectedDrug = drug.find((d: any) => d.drug_id === selectedDrugId);
    if (!selectedDrug) return;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.drug_id === selectedDrug.drug_id
      );

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      }

      return [...prevCart, { ...selectedDrug, quantity }];
    });

    setSnackbar("Drug added to cart!");
    setSelectedDrugId("");
    setQuantity(1);
  };

  const handlePurchase = () => {
    if (!selectedPatientId) {
      setSnackbar("Please select a patient.");
      return;
    }

    dispatch(
      generateInvoice({ customerId: selectedPatientId, cartItems: cart })
    );
  };

  useEffect(() => {
    if (success && invoiceId) {
      console.log("Invoice generated successfully:", invoiceId);
      if (!getInvoiceDetailsCalled.current) {
        console.log("Fetching invoice details...");
        dispatch(getInvoiceDetails(invoiceId.invoiceId));
        getInvoiceDetailsCalled.current = true;
      }
      if (invoice) {
        setInvoiceDialogOpen(true);
      }
    }


    if (error) {
      setSnackbar(error);
    }
  }, [success, error, dispatch]);

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Card sx={{ m: 3 }}>
      <CardContent>
      <h1 style={{ color: "black", fontSize: "2rem", fontWeight:"bold" , marginBottom: "2px" ,display: "flex", justifyContent: "flex-start" }}>
        Bill Invoice
      </h1>
      <h3 style={{ color: "black", fontSize: "1.5rem" , marginBottom: "10px" ,display: "flex", justifyContent: "flex-start" }}>
        Add and manage your invoice here
      </h3>
        <Typography variant="h5" gutterBottom>
          Select Patient
        </Typography>

        <FormControl sx={{ minWidth: 500, mb: 3 }}>
          <InputLabel>Select a patient</InputLabel>
          <Select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value as number)}
            label="Select a patient"
          >
            {patientList.map((p: any) => (
              <MenuItem key={p.customer_id} value={p.customer_id}>
                {p.customer_name} - {p.customer_contact}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h5" gutterBottom>
          Select Drug
        </Typography>

        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        {drug.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <FormControl sx={{ minWidth: 500 }}>
              <InputLabel>Select a drug</InputLabel>
              <Select
                value={selectedDrugId}
                onChange={(e) => setSelectedDrugId(e.target.value as number)}
                label="Select a drug"
              >
                {drug.map((d: any) => (
                  <MenuItem key={d.drug_id} value={d.drug_id}>
                    {d.name} - ${d.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Quantity"
              type="number"
              size="medium"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              sx={{ width: "500px" }}
              inputProps={{ min: 1 }}
            />

            <Button
              size="large"
              sx={{ backgroundColor: "#064e3b" }}
              variant="contained"
              onClick={handleAddToCart}
              disabled={!selectedDrugId}
            >
              Add to Cart
            </Button>
          </Box>
        )}

        <Typography variant="h6" mt={4}>
          🛒 Cart Items
        </Typography>

        {cart.length === 0 ? (
          <Typography>No items in cart.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Drug</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.drug_id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price * item.quantity}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2}>
                  <strong>Total Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>${totalAmount}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 20 }}
        >
          <Button
            sx={{ backgroundColor: "#064e3b" }}
            variant="contained"
            color="success"
            onClick={handlePurchase}
            disabled={cart.length === 0}
          >
            Purchase & Generate Invoice
          </Button>
        </Box>
        <Snackbar
          open={!!snackbar}
          autoHideDuration={3000}
          onClose={() => setSnackbar("")}
          message={snackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />

        <InvoiceDialog
          open={invoiceDialogOpen}
          onClose={() => setInvoiceDialogOpen(false)}
          invoice={invoice}
        />
      </CardContent>
    </Card>
  );
};

export default InvoiceComponent;
