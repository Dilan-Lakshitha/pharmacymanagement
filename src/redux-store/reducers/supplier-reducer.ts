import { createSlice } from "@reduxjs/toolkit";
import {
  deletesupplier,
  supplierRegister,
  suppliers,
  Updatesuppliers,
} from "../../shared/service/supplierService";
import { SupplierModel } from "../../shared/models/supplier-model";

const initialState: SupplierModel = {
  loading: false,
  error: "",
  success: false,
  supplier: [],
};

const supplierSlice = createSlice({
  name: "supplier",
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
      .addCase(supplierRegister.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(supplierRegister.fulfilled, (state, payload: any) => {
        state.loading = false;
        state.success = payload.success;
        if (payload) {
          state.supplier.push(payload.payload);
        }
      })
      .addCase(supplierRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(suppliers.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(suppliers.fulfilled, (state, payload: any) => {
        state.loading = false;
        state.success = payload.success;
        state.supplier = payload.payload;
      })
      .addCase(suppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(Updatesuppliers.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(Updatesuppliers.fulfilled, (state, action: any) => {
        state.loading = false;
        state.success = action.payload.success;

        const updatedSupplier = action.payload;
        const index = state.supplier.findIndex(
          (p: any) => p.supplier_id === updatedSupplier.supplier_id
        );
        if (index !== -1) {
          state.supplier[index] = updatedSupplier;
        }
      })
      .addCase(Updatesuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deletesupplier.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deletesupplier.fulfilled, (state, action: any) => {
        state.loading = false;
        state.success = action.payload.success;

        console.log("action.payload", action.payload);
        const deletedId = action.payload.deletedCustomerId;
        state.supplier = state.supplier.filter(
          (p: any) => p.supplier_id !== deletedId
        );
      })
      .addCase(deletesupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetState, resetSuccess } = supplierSlice.actions;
export default supplierSlice.reducer;
