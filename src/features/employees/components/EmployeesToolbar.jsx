import React from 'react';
import { Link } from 'react-router-dom';
import { Search01Icon, PlusSignIcon } from 'hugeicons-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const EmployeesToolbar = ({ filterValue, onFilterChange }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
                <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search by name"
                    value={filterValue ?? ''}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="pl-9 h-10 border-gray-200"
                />
            </div>

            <Link to="/employees/add">
                <Button className="bg-[#2563EB] hover:bg-[#00A4FF] text-white gap-2 h-10 px-4">
                    <PlusSignIcon className="h-5 w-5" />
                    Add Employee
                </Button>
            </Link>
        </div>
    );
};

export default EmployeesToolbar;
