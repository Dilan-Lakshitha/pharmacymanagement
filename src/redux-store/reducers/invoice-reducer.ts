import { createSlice } from "@reduxjs/toolkit";
import { InvoiceState } from "../../shared/models/invoice-model";
import { deletedrug, drugRegister, drugs, Updatedrugs } from "../../shared/service/drugService";
import { addToCartAsync, generateInvoice, getInvoiceDetails } from "../../shared/service/invoiceService";

const initialState: InvoiceState = {
    cart: [],
    loading: false,
    success: false,
    error: "",
    invoice: null,
    invoiceId: null,
  };
  
  const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
      removeFromCart: (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      },
      resetInvoice: (state) => {
        state.cart = [];
        state.invoice = null;
        state.success = false;
        state.error = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(addToCartAsync.fulfilled, (state, action) => {
          const exists = state.cart.find((item) => item.id === action.payload.id);
          if (exists) {
            exists.quantity += 1;
          } else {
            state.cart.push({ ...action.payload, quantity: 1 });
          }
        })
        .addCase(generateInvoice.pending, (state) => {
          state.loading = true;
          state.success = false;
          state.error = "";
        })
        .addCase(generateInvoice.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.invoiceId = action.payload;
        })
        .addCase(generateInvoice.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload as string;
        })

        .addCase(getInvoiceDetails.pending, (state) => {
          state.loading = true;
          state.success = false;
          state.error = "";
        })
        .addCase(getInvoiceDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.invoice = action.payload;
        })
        .addCase(getInvoiceDetails.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { removeFromCart, resetInvoice } = invoiceSlice.actions;
  export default invoiceSlice.reducer;