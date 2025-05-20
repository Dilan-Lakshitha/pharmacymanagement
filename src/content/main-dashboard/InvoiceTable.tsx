import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC, useState, ChangeEvent } from "react";
import { toast } from "sonner";
import { AppDispatch } from "../../../src/redux-store/stores/store";
import { useDispatch } from "react-redux";

interface PatinetTableProps {
  className?: string;
  Invoices: any[];
  onEdit: (invoice: any) => void;
  patinetList: any[];
}

interface Filters {
  name?: string;
}

const applyFilters = (Invoices: any[], filters: Filters): any[] => {
  return Invoices.filter((invoice) => {
    let matches = true;
    if (
      filters.name &&
      !invoice.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (
  Invoices: any[],
  page: number,
  limit: number
): any[] => {
  return Invoices.slice(page * limit, page * limit + limit);
};

const InvoiceTable: FC<PatinetTableProps> = ({
  Invoices = [],
  onEdit,
  patinetList = [],
}) => {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({ name: "" });
  const dispath: AppDispatch = useDispatch();

  const handleNameFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedInvoices(
      event.target.checked ? Invoices.map((p) => p.invoice_id) : []
    );
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    setSelectedInvoices((prev) =>
      event.target.checked ? [...prev, id] : prev.filter((pid) => pid !== id)
    );
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredInvoices = applyFilters(Invoices, filters);
  const paginatedInvoices = applyPagination(filteredInvoices, page, limit);
  const selectedSome =
    selectedInvoices.length > 0 && selectedInvoices.length < Invoices.length;
  const selectedAll = selectedInvoices.length === Invoices.length;

  const handleDelete = (id: number) => {
    try {
      //   dispath(deleteinvoice(id));
      toast.success("Invoice updated successfully! 🎉");
    } catch {
      toast.error("Operation failed. Please check your network.");
    }
  };

  return (
    <Card>
      <CardHeader
        title="Latest Invoice Details"
        action={
          <TextField
            label="Search by Name"
            variant="outlined"
            size="small"
            value={filters.name}
            onChange={handleNameFilterChange}
          />
        }
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Patinet Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInvoices.map((invoice) => {
              const isSelected = selectedInvoices.includes(invoice.toString());
              return (
                <TableRow key={invoice.invoiceId} selected={isSelected} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSelected}
                      onChange={(e) =>
                        handleSelectOne(e, invoice.invoiceId.toString())
                      }
                    />
                  </TableCell>
                  <TableCell>{invoice.invoiceId}</TableCell>
                  <TableCell>
                    {patinetList.find(
                      (p) => p.customer_id === invoice.customerId
                    )?.customer_name || "Unknown"}
                  </TableCell>
                  {new Date(invoice.purchaseDate).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <TableCell>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(invoice.totalAmount)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredInvoices.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>
    </Card>
  );
};

export default InvoiceTable;
