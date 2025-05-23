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
import { AppDispatch } from "../../../../redux-store/stores/store";
import { useDispatch } from "react-redux";
import { deletesupplier } from "../../../../shared/service/supplierService";

interface SupplierTableProps {
  className?: string;
  Suppliers: any[];
  onEdit: (supplier: any) => void;
}

interface Filters {
  name?: string;
}

const applyFilters = (Suppliers: any[], filters: Filters): any[] => {
  return Suppliers.filter((supplier) => {
    let matches = true;
    if (
      filters.name &&
      !supplier.customer_name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (
  Suppliers: any[],
  page: number,
  limit: number
): any[] => {
  return Suppliers.slice(page * limit, page * limit + limit);
};

const SupplierTable: FC<SupplierTableProps> = ({
  Suppliers = [],
  onEdit,
}) => {
  const [selectedsuppliers, setSelectedsuppliers] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({ name: "" });
  const dispath: AppDispatch = useDispatch();

  const handleNameFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedsuppliers(
      event.target.checked ? Suppliers.map((p) => p.supplier_id) : []
    );
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    setSelectedsuppliers((prev) =>
      event.target.checked ? [...prev, id] : prev.filter((pid) => pid !== id)
    );
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredsuppliers = applyFilters(Suppliers, filters);
  const paginatedsuppliers = applyPagination(filteredsuppliers, page, limit);
  const selectedSome =
    selectedsuppliers.length > 0 && selectedsuppliers.length < Suppliers.length;
  const selectedAll = selectedsuppliers.length === Suppliers.length;


  const handleDelete = (id: number) => {
    try {
      dispath(deletesupplier(id));
      toast.success("supplier updated successfully! 🎉");
    } catch {
      toast.error("Operation failed. Please check your network.");
    }
  };

  return (
    <Card>
      <CardHeader
        title="supplier Details"
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
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedsuppliers.map((supplier) => {
              const isSelected = selectedsuppliers.includes(
                supplier.supplier_id.toString()
              );
              return (
                <TableRow key={supplier.supplier_id} selected={isSelected} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSelected}
                      onChange={(e) =>
                        handleSelectOne(e, supplier.supplier_id.toString())
                      }
                    />
                  </TableCell>
                  <TableCell>{supplier.supplier_id}</TableCell>
                  <TableCell>{supplier.supplier_name}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.supplier_contact}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => onEdit(supplier)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(supplier.supplier_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
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
          count={filteredsuppliers.length}
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

export default SupplierTable;
