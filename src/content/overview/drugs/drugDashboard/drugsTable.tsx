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
import { deletedrug } from "../../../../shared/service/drugService";

interface PatinetTableProps {
  className?: string;
  Drugs: any[];
  onEdit: (drug: any) => void;
}

interface Filters {
  name?: string;
}

const applyFilters = (Drugs: any[], filters: Filters): any[] => {
  return Drugs.filter((drug) => {
    let matches = true;
    if (
      filters.name &&
      !drug.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (
  Drugs: any[],
  page: number,
  limit: number
): any[] => {
  return Drugs.slice(page * limit, page * limit + limit);
};

const DrugsTable: FC<PatinetTableProps> = ({
  Drugs = [],
  onEdit,
}) => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({ name: "" });
  const dispath: AppDispatch = useDispatch();

  const handleNameFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedDrugs(
      event.target.checked ? Drugs.map((p) => p.drug_id) : []
    );
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    setSelectedDrugs((prev) =>
      event.target.checked ? [...prev, id] : prev.filter((pid) => pid !== id)
    );
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredDrugs = applyFilters(Drugs, filters);
  const paginatedDrugs = applyPagination(filteredDrugs, page, limit);
  const selectedSome =
    selectedDrugs.length > 0 && selectedDrugs.length < Drugs.length;
  const selectedAll = selectedDrugs.length === Drugs.length;

  const handleDelete = (id: number) => {
    try {
      dispath(deletedrug(id));
      toast.success("Drug updated successfully! 🎉");
    } catch {
      toast.error("Operation failed. Please check your network.");
    }
  };

  return (
    <Card>
      <CardHeader
        title="Drug Details"
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
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>One Tablet Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDrugs.map((drug) => {
              const isSelected = selectedDrugs.includes(
                drug.drug_id.toString()
              );
              return (
                <TableRow key={drug.drug_id} selected={isSelected} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSelected}
                      onChange={(e) =>
                        handleSelectOne(e, drug.drug_id.toString())
                      }
                    />
                  </TableCell>
                  <TableCell>{drug.drug_id}</TableCell>
                  <TableCell>{drug.name}</TableCell>
                  <TableCell>{drug.description}</TableCell>
                  <TableCell>{drug.quantity}</TableCell>
                  <TableCell>{drug.price}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => onEdit(drug)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(drug.drug_id)}
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
          count={filteredDrugs.length}
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

export default DrugsTable;