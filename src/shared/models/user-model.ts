export interface UserModel {
    loading: boolean;
    error: string | undefined;
    success: boolean;
    user:Users[];
}
export interface Users {
    id: number;
    PharmarcyName: string;
    email: string;
    phone: string;
}