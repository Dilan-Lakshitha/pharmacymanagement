export interface SupplierModel {
    loading: boolean;
    error: string | undefined;
    success: boolean;
    supplier:supplier[];
}
export interface supplier {
    supllier_id: number;
    supplier_name: string;
    email: string;
    supplier_contact: number;
}