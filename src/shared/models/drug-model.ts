export interface DrugsModel {
    loading: boolean;
    error: string | undefined;
    success: boolean;
    drug:drug[];
}
export interface drug {
    drug_id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    supplier_id: number;
}