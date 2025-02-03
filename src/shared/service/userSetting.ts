import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7200/api'
});

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await api.post('Auth/register', payload);
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

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await api.post('Auth/login', payload);
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