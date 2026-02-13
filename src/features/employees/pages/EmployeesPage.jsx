import React, { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';
import { useDebounce } from '@/hooks/useDebounce';
import { useEmployeesList, useDeleteEmployee, useSoftDeleteEmployee } from '../hooks/useEmployees';
import { getEmployeeColumns } from '../components/EmployeeColumns';
import EmployeesTable from '../components/EmployeesTable';
import EmployeesToolbar from '../components/EmployeesToolbar';
import DeleteEmployeeDialog from '../components/DeleteEmployeeDialog';

const EmployeesPage = () => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const debouncedSearch = useDebounce(globalFilter, 500);

    const { data: employees = [], isLoading, error } = useEmployeesList(debouncedSearch);
    const deleteMutation = useDeleteEmployee();
    const softDeleteMutation = useSoftDeleteEmployee();

    const handleAction = (type, employee) => {
        if (type === 'delete') {
            setSelectedEmployee(employee);
            setIsDeleteDialogOpen(true);
        }
    };

    const handleDelete = async (type) => {
        if (!selectedEmployee) return;

        if (type === 'soft') {
            await softDeleteMutation.mutateAsync(selectedEmployee.employeeId);
        } else {
            await deleteMutation.mutateAsync(selectedEmployee.employeeId);
        }

        setIsDeleteDialogOpen(false);
        setSelectedEmployee(null);
    };

    const columns = useMemo(() => getEmployeeColumns(handleAction), []);

    const table = useReactTable({
        data: employees,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        autoResetPageIndex: false,
    });

    return (
        <div className="p-1 space-y-6">
            <EmployeesToolbar
                filterValue={globalFilter}
                onFilterChange={setGlobalFilter}
            />

            <EmployeesTable
                table={table}
                isLoading={isLoading}
                error={error}
            />

            <DeleteEmployeeDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setSelectedEmployee(null);
                }}
                onConfirm={handleDelete}
                employeeName={selectedEmployee?.fullName}
                isSubmitting={deleteMutation.isLoading || softDeleteMutation.isLoading}
            />
        </div>
    );
};

export default EmployeesPage;
