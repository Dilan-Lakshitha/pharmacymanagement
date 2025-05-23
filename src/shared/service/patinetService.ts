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

export const Updatepatients = createAsyncThunk(
    'Updatepatinets',
    async (patient:any, { rejectWithValue }) => {
        console.log('patient', patient);
        const api = axiosApi
        try {
            const response = await api.put(`Patinet/updatePatient/${patient.customer_id}`, patient);
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

export const deletePatient = createAsyncThunk(
    'Deletepatinets',
    async (patientId:number, { rejectWithValue }) => {
        const api = axiosApi
        try {
            const response = await api.delete(`Patinet/deletePatinet/${patientId}`);
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

