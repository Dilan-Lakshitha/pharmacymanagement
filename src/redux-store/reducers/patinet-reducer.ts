import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../../shared/models/user-model";
import { signIn, signUp } from "../../shared/service/userSetting";
import { PatientModel } from "../../shared/models/patinet-model";
import { patientRegister, patients } from "../../shared/service/patinetService";

const initialState:PatientModel = {
    loading: false,
    error: '',
    success: false,
    patinet: []
}

const patinetSlice = createSlice({
    name: 'patinet',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.error = '';
        },
        resetSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase( patientRegister.pending,(state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase( patientRegister.fulfilled,(state,payload:any ) => {
            state.loading = false;
            state.success = payload.success;
        })
        .addCase( patientRegister.rejected,(state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase( patients.pending,(state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase( patients.fulfilled,(state,payload:any ) => {
            state.loading = false;
            state.success = payload.success;
        })
        .addCase( patients.rejected,(state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
    });

export const { resetState, resetSuccess } = patinetSlice.actions;
export default patinetSlice.reducer;