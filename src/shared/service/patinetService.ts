import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "./userSetting";

export const patientRegister = createAsyncThunk(
    'patinet/register',
    async (payload: any, { rejectWithValue }) => {
        const api = axiosApi
        try {
            const response = await api.post('Patinet/patinetRegister', payload);
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

export const patients = createAsyncThunk(
    'patinets',
    async (_, { rejectWithValue }) => {
        const api = axiosApi
        try {
            const response = await api.get('Patinet/patients');
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

