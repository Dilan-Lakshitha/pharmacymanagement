export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface InvoiceState {
    cart: CartItem[];
    loading: boolean;
    success: boolean;
    error: string;
    invoice: any;
    invoiceId: any;
  }