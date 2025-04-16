import { createSlice } from "@reduxjs/toolkit";
import { DrugsModel } from "../../shared/models/drug-model";
import { deletedrug, drugRegister, drugs, Updatedrugs } from "../../shared/service/drugService";

const initialState: DrugsModel = {
  loading: false,
  error: "",
  success: false,
  drug: [],
};

const drugSlice = createSlice({
  name: "drug",
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
      .addCase(drugRegister.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(drugRegister.fulfilled, (state, payload: any) => {
        state.loading = false;
        state.success = payload.success;
        if (payload) {
          state.drug.push(payload.payload);
        }
      })
      .addCase(drugRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(drugs.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(drugs.fulfilled, (state, payload: any) => {
        state.loading = false;
        state.success = payload.success;
        state.drug = payload.payload;
      })
      .addCase(drugs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(Updatedrugs.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(Updatedrugs.fulfilled, (state, action: any) => {
        state.loading = false;
        state.success = action.payload.success;

        const Updatedrugs = action.payload;
        const index = state.drug.findIndex(
          (p: any) => p.drug_id === Updatedrugs.drug_id
        );
        if (index !== -1) {
          state.drug[index] = Updatedrugs;
        }
      })
      .addCase(Updatedrugs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deletedrug.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deletedrug.fulfilled, (state, action: any) => {
        state.loading = false;
        state.success = action.payload.success;

        console.log("action.payload", action.payload);
        const deletedId = action.payload.deletedCustomerId;
        state.drug = state.drug.filter(
          (p: any) => p.drug_id !== deletedId
        );
      })
      .addCase(deletedrug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetState, resetSuccess } = drugSlice.actions;
export default drugSlice.reducer;