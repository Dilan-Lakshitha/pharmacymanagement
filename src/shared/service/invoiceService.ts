import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "./userSetting";
import { CartItem } from "../models/invoice-model";

export const addToCartAsync = createAsyncThunk(
  "invoice/addToCart",
  async (item: CartItem) => item
);


export const generateInvoice = createAsyncThunk<
  any,
  { customerId: number; cartItems: any[] }
>(
  "invoice/generate",
  async (
    { customerId, cartItems },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosApi.post("invoice", {
        customerId,
        drugs: cartItems.map((item) => ({
          drugId: item.drug_id,
          quantity: item.quantity,
        })),
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unknown error");
    }
  }
);

export const getInvoiceDetails = createAsyncThunk(
  "invoice/getDetails",
  async (invoiceId: number, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`invoice/${invoiceId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unknown error");
    }
  }
);

export const getInvoiceList = createAsyncThunk(
  "invoice/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`invoice/latest/${10}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unknown error");
    }
  }
);
