export interface UserModel {
    userInfo:Users | null;
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
    avatar:string;
}