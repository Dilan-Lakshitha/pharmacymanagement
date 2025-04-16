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
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux-store/stores/store";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  patientRegister,
  patients,
  Updatepatients,
} from "../../../../shared/service/patinetService";
import DrugsTable from "./drugsTable";

function DrugsDashboard() {
  const { success } = useSelector((state: any) => state.auth);
  const patientList = useSelector((state: any) => state.patinet.patinet);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const dispath: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    dispath(patients());
  }, [dispath]);

  const submitForm = async (data: any) => {
    try {
      if (isEditMode) {
        dispath(Updatepatients({ ...selectedPatient, ...data }));
        toast.success("Patient updated successfully! 🎉");
      } else {
        dispath(patientRegister(data));
        toast.success("Patient added successfully! 🎉");
      }
      handleClose();
    } catch {
      toast.error("Operation failed. Please check your network.");
    }
  };

  useEffect(() => {
    if (selectedPatient) {
      setValue("customer_name", selectedPatient.customer_name);
      setValue("customer_age", selectedPatient.customer_age);
      setValue("customer_contact", selectedPatient.customer_contact);
    } else {
      reset();
    }
  }, [selectedPatient, setValue, reset]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null);
    setIsEditMode(false);
    reset();
  };

  const handleEdit = (patient: any) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
    setOpen(true);
  };
  

  console.log("patientList", patientList);

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
              Add Patinet
            </Button>
          </Box>
          <Grid item md={6}>
            <Card>
            <DrugsTable Patinets={patientList || []} onEdit={handleEdit} />
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: "#064e3b", color: "white" }}>
          <PersonAddIcon sx={{ marginRight: 1 }} />
          {isEditMode ? "Update Patient" : "Add Patient"}
        </DialogTitle>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col space-y-4"
        >
          <DialogContent>
            <DialogContentText>
              Please fill out the form to add a new patient.
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              id="patientName"
              label="Patient Name"
              type="text"
              fullWidth
              variant="standard"
              {...register("customer_name", {
                required: "Patient Name is required",
              })}
            />
            <TextField
              required
              margin="dense"
              id="patientAge"
              label="Patient Age"
              type="number"
              fullWidth
              variant="standard"
              {...register("customer_age", {
                required: "Patient Age is required",
                valueAsNumber: true,
              })}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="patientContact"
              label="Patient Contact Number"
              type="text"
              fullWidth
              variant="standard"
              {...register("customer_contact", {
                required: "Patient Name is required",
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
              sx={{ backgroundColor: "#064e3b" }}>
              {isEditMode ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}
export default DrugsDashboard;