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
  Icon,
  Card,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux-store/stores/store";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  drugRegister,
  drugs,
  Updatedrugs,
} from "../../../../shared/service/drugService";
import DrugsTable from "./drugsTable";
import { suppliers } from "../../../../shared/service/supplierService";

function DrugsDashboard() {
  const { success } = useSelector((state: any) => state.auth);
  const drugList = useSelector((state: any) => state.drug.drug);
  const supplierList = useSelector((state: any) => state.supplier.supplier);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selecteddrug, setSelecteddrug] = useState<any>(null);

  const dispath: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    dispath(drugs());
  }, [dispath]);

  useEffect(() => {
    dispath(suppliers());
  }, []);

  const submitForm = async (data: any) => {
    try {
      if (isEditMode) {
        dispath(Updatedrugs({ ...selecteddrug, ...data }));
        toast.success("drug updated successfully! 🎉");
      } else {
        dispath(drugRegister(data));
        toast.success("drug added successfully! 🎉");
      }
      handleClose();
    } catch {
      toast.error("Operation failed. Please check your network.");
    }
  };

  useEffect(() => {
    if (selecteddrug) {
      setValue("name", selecteddrug.name);
      setValue("description", selecteddrug.description);
      setValue("price", selecteddrug.price);
      setValue("quantity", selecteddrug.quantity);
      setValue("supplier_id", selecteddrug.supplier_id);
    } else {
      reset();
    }
  }, [selecteddrug, setValue, reset]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelecteddrug(null);
    setIsEditMode(false);
    reset();
  };

  const handleEdit = (drug: any) => {
    setSelecteddrug(drug);
    setIsEditMode(true);
    setOpen(true);
  };

  console.log("supplierList", supplierList);

  return (
    <Container maxWidth="xl" sx={{ textAlign: "center" }}>
      <Grid spacing={{ xs: 0, md: 2 }}>
        <Grid item md={10} lg={0} mx="auto" alignItems="end">
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleClickOpen}
              size="large"
              variant="contained"
              sx={{ backgroundColor: "#064e3b" }}
            >
              Add Drug
            </Button>
          </Box>
          <Grid item md={6}>
            <Card>
              <DrugsTable Drugs={drugList || []} onEdit={handleEdit} />
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: "#064e3b", color: "white" }}>
          <PersonAddIcon sx={{ marginRight: 1 }} />
          {isEditMode ? "Update drug" : "Add drug"}
        </DialogTitle>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col space-y-4"
        >
          <DialogContent>
            <DialogContentText>
              Please fill out the form to add a new drug.
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              id="drugName"
              label="Drug Name"
              type="text"
              fullWidth
              variant="standard"
              {...register("name", {
                required: "drug Name is required",
              })}
            />
            <TextField
              required
              margin="dense"
              id="drugDescription"
              label="Drug Description"
              type="text"
              fullWidth
              variant="standard"
              {...register("description", {
                required: "drug description is required",
              })}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="drugPrice"
              label="Drug Price"
              type="number"
              fullWidth
              variant="standard"
              {...register("price", {
                required: "drug price is required",
              })}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="drugQuantity"
              label="Drug Quantity"
              type="number"
              fullWidth
              variant="standard"
              {...register("quantity", {
                required: "drug quantity is required",
              })}
            />

            <FormControl fullWidth margin="dense"  sx={{ mt: 3 }} required>
              <InputLabel id="supplier-label">Select Supplier</InputLabel>
              <Select
                labelId="supplier-label"
                id="supplier"
                defaultValue=""
                label="Select Supplier"
                {...register("supplier_id", {
                  required: "Supplier is required",
                })}
              >
                {supplierList?.map((supplier: any) => (
                  <MenuItem
                    key={supplier.supplier_id}
                    value={supplier.supplier_id}
                  >
                    {supplier.supplier_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
export default DrugsDashboard;
