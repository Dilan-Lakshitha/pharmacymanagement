export interface PatientModel {
    loading: boolean;
    error: string | undefined;
    success: boolean;
    patinet:patient[];
}
export interface patient {
    patinetid: number;
    patinetName: string;
    patinetAge: number;
    dateOfBirth: Date;
}