import {
  Box,
  Button,
  Container,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Card,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux-store/stores/store";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SupplierTable from "./supplierTable";
import {
  supplierRegister,
  suppliers,
} from "../../../../shared/service/supplierService";

function SupplierDashboard() {
  const { success } = useSelector((state: any) => state.auth);
  const supplierList = useSelector((state: any) => state.supplier.supplier);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedsupplier, setSelectedsupplier] = useState<any>(null);
  const dispath: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    dispath(suppliers());
  }, []);

  const submitForm = async (payload: any) => {
    try {
      dispath(supplierRegister(payload));
      handleClose();
      toast.success("Supplier added successful! 🎉");
    } catch {
      toast.error("Supplier added failed. Please check your network.");
    }
  };

  useEffect(() => {
    if (selectedsupplier) {
      setValue("supplier_name", selectedsupplier.supplier_name);
      setValue("email", selectedsupplier.email);
      setValue("supplier_contact", selectedsupplier.supplier_contact);
    } else {
      reset();
    }
  }, [selectedsupplier, setValue, reset]);

  const handleEdit = (supplier: any) => {
    setSelectedsupplier(supplier);
    setIsEditMode(true);
    setOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedsupplier(null);
    setIsEditMode(false);
    reset();
  };

  return (
    <Container maxWidth="xl" sx={{ textAlign: "center" }}>
      <h1
        style={{
          color: "black",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "2px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        Supplier Dashboard
      </h1>
      <h3
        style={{
          color: "black",
          fontSize: "1.5rem",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        Add and manage your supplier here
      </h3>
      <Grid spacing={{ xs: 0, md: 2 }}>
        <Grid item md={10} lg={0} mx="auto" alignItems="end">
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleClickOpen}
              size="large"
              variant="contained"
              sx={{ backgroundColor: "#064e3b" }}
            >
              Add Supplier
            </Button>
          </Box>
          <Card>
            <SupplierTable Suppliers={supplierList || []} onEdit={handleEdit} />
          </Card>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: "#064e3b", color: "white" }}>
          <PersonAddIcon sx={{ marginRight: 1 }} />
          {isEditMode ? "Update Supplier" : "Add Supplier"}
        </DialogTitle>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col space-y-4"
        >
          <DialogContent>
            <DialogContentText>
              Please fill out the form to add a new supplier.
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              id="supplierName"
              label="Supplier Name"
              type="text"
              fullWidth
              variant="standard"
              {...register("supplier_name", {
                required: "Supplier Name is required",
              })}
            />
            <TextField
              required
              margin="dense"
              id="supplierContact"
              label="Supplier Contact"
              type="number"
              fullWidth
              variant="standard"
              {...register("supplier_contact", {
                required: "Supplier Age is required",
                valueAsNumber: true,
              })}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="email"
              label="Supplier Email"
              type="text"
              fullWidth
              variant="standard"
              {...register("email", {
                required: "Supplier Email is required",
              })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: "#064e3b" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#064e3b" }}
            >
              {isEditMode ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

export default SupplierDashboard;
