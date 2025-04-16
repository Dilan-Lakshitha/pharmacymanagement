import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "./userSetting";

export const supplierRegister = createAsyncThunk(
    'supplier/register',
    async (payload: any, { rejectWithValue }) => {
        const api = axiosApi
        try {
            const response = await api.post('Supplier/supplierCreate', payload);
            return response.data;
        } catch (error:any) {
            if (error.response) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

export const suppliers = createAsyncThunk(
    'suppliers',
    async (_, { rejectWithValue }) => {
        const api = axiosApi
        try {
            const response = await api.get('Supplier/supplierList');
            return response.data;
        } catch (error:any) {
            if (error.response) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

export const Updatesuppliers = createAsyncThunk(
    'Updatesuppliers',
    async (supplier:any, { rejectWithValue }) => {
        console.log('supplier', supplier);
        const api = axiosApi
        try {
            const response = await api.put(`Supplier/updatesupplier/${supplier.supplier_id}`, supplier);
            return response.data;
        } catch (error:any) {
            if (error.response) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

export const deletesupplier = createAsyncThunk(
    'Deletesuppliers',
    async (supplierId:number, { rejectWithValue }) => {
        const api = axiosApi
        try {
            const response = await api.delete(`Supplier/${supplierId}`);
            return response.data;
        } catch (error:any) {
            if (error.response) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);
