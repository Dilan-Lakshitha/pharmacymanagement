import { createSlice } from "@reduxjs/toolkit";
import { PatientModel } from "../../shared/models/patinet-model";
import {
  deletePatient,
  patientRegister,
  patients,
  Updatepatients,
} from "../../shared/service/patinetService";

const initialState: PatientModel = {
  loading: false,
  error: "",
  success: false,
  patinet: [],
};

const patinetSlice = createSlice({
  name: "patinet",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = "";
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(patientRegister.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(patientRegister.fulfilled, (state, payload: any) => {
        state.loading = false;
        state.success = payload.success;
        if (payload) {
          state.patinet.push(payload.payload);
        }
      })
      .addCase(patientRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(patients.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(patients.fulfilled, (state, payload: any) => {
        state.loading = false;
        state.success = payload.success;
        state.patinet = payload.payload;
      })
      .addCase(patients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(Updatepatients.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(Updatepatients.fulfilled, (state, action: any) => {
        state.loading = false;
        state.success = action.payload.success;

        const updatedPatient = action.payload;
        const index = state.patinet.findIndex(
          (p: any) => p.customer_id === updatedPatient.customer_id
        );
        if (index !== -1) {
          state.patinet[index] = updatedPatient;
        }
      })
      .addCase(Updatepatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deletePatient.fulfilled, (state, action: any) => {
        state.loading = false;
        state.success = action.payload.success;

        console.log("action.payload", action.payload);
        const deletedId = action.payload.deletedCustomerId;
        state.patinet = state.patinet.filter(
          (p: any) => p.customer_id !== deletedId
        );
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetState, resetSuccess } = patinetSlice.actions;
export default patinetSlice.reducer;
