import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "./userSetting";

export const drugRegister = createAsyncThunk(
    'drug/register',
    async (payload: any, { rejectWithValue }) => {
        const api = axiosApi
        try {
            const response = await api.post('drug', payload);
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

export const drugs = createAsyncThunk(
    'drugs',
    async (_, { rejectWithValue }) => {
        const api = axiosApi
        try {
            const response = await api.get('drug');
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

export const Updatedrugs = createAsyncThunk(
    'Updatedrugs',
    async (drug:any, { rejectWithValue }) => {
        console.log('drug', drug);
        const api = axiosApi
        try {
            const response = await api.put(`drug/${drug.drug_id}`, drug);
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

export const deletedrug = createAsyncThunk(
    'Deletedrugs',
    async (drugId:number, { rejectWithValue }) => {
        const api = axiosApi
        try {
            const response = await api.delete(`drug/${drugId}`);
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