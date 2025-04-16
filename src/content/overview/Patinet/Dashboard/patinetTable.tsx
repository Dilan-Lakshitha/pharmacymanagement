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
import { deletePatient } from "../../../../shared/service/patinetService";

interface PatinetTableProps {
  className?: string;
  Patinets: any[];
  onEdit: (patient: any) => void;
}

interface Filters {
  name?: string;
}

const applyFilters = (Patinets: any[], filters: Filters): any[] => {
  return Patinets.filter((patient) => {
    let matches = true;
    if (
      filters.name &&
      !patient.customer_name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (
  Patinets: any[],
  page: number,
  limit: number
): any[] => {
  return Patinets.slice(page * limit, page * limit + limit);
};

const PatinetTable: FC<PatinetTableProps> = ({
  Patinets = [],
  onEdit,
}) => {
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({ name: "" });
  const dispath: AppDispatch = useDispatch();

  const handleNameFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedPatients(
      event.target.checked ? Patinets.map((p) => p.customer_id) : []
    );
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    setSelectedPatients((prev) =>
      event.target.checked ? [...prev, id] : prev.filter((pid) => pid !== id)
    );
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredPatients = applyFilters(Patinets, filters);
  const paginatedPatients = applyPagination(filteredPatients, page, limit);
  const selectedSome =
    selectedPatients.length > 0 && selectedPatients.length < Patinets.length;
  const selectedAll = selectedPatients.length === Patinets.length;

  const handleDelete = (id: number) => {
    try {
      dispath(deletePatient(id));
      toast.success("Patient updated successfully! 🎉");
    } catch {
      toast.error("Operation failed. Please check your network.");
    }
  };

  return (
    <Card>
      <CardHeader
        title="Patient Details"
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
              <TableCell>Age</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPatients.map((patient) => {
              const isSelected = selectedPatients.includes(
                patient.customer_id.toString()
              );
              return (
                <TableRow key={patient.customer_id} selected={isSelected} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSelected}
                      onChange={(e) =>
                        handleSelectOne(e, patient.customer_id.toString())
                      }
                    />
                  </TableCell>
                  <TableCell>{patient.customer_id}</TableCell>
                  <TableCell>{patient.customer_name}</TableCell>
                  <TableCell>{patient.customer_age}</TableCell>
                  <TableCell>{patient.customer_contact}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => onEdit(patient)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(patient.customer_id)}
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
          count={filteredPatients.length}
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

export default PatinetTable;
