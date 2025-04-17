import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
  } from "@mui/material";
  import { useRef } from "react";
  
  interface InvoiceDialogProps {
    open: boolean;
    onClose: () => void;
    invoice: any;
  }
  
  const InvoiceDialog: React.FC<InvoiceDialogProps> = ({ open, onClose, invoice }) => {
    const printRef = useRef<HTMLDivElement>(null);
  
    if (!invoice) return null;
  
    const handlePrint = () => {
      const printContents = printRef.current?.innerHTML;
      const win = window.open("", "PRINT", "height=650,width=900,top=100,left=150");
      if (win && printContents) {
        win.document.write(`
          <html>
            <head>
              <title>Invoice</title>
              <style>
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid #ccc;
                  padding: 8px;
                  text-align: left;
                }
                h1 {
                  color: #064e3b;
                }
              </style>
            </head>
            <body>
              ${printContents}
            </body>
          </html>
        `);
        win.document.close();
        win.focus();
        win.print();
        win.close();
      }
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ backgroundColor: "#064e3b", color: "white" }}>
          Invoice Details
        </DialogTitle>
        <DialogContent>
          <div ref={printRef}>
            <Typography variant="h6" gutterBottom>
              Drugs Purchased
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Drug</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.items.map((item: any) => (
                  <TableRow key={item.drug_id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price * item.quantity}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}>
                    <strong>Total Amount</strong>
                  </TableCell>
                  <TableCell>
                    <strong>${invoice.totalAmount}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrint} sx={{ color: "#064e3b" }}>
            Print
          </Button>
          <Button onClick={onClose} sx={{ color: "#064e3b" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default InvoiceDialog;
  