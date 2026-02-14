import React from 'react';
import { Link } from 'react-router-dom';
import { Search01Icon, PlusSignIcon } from 'hugeicons-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const EmployeesToolbar = ({ filterValue, onFilterChange, totalResults }) => {
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

            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-sm">
                <span className="font-bold text-[#2563EB]">{totalResults}</span>
                <span className="text-gray-500 font-medium">
                    {`result${totalResults !== 1 ? 's' : ''} found`}
                </span>
            </div>
        </div>
    );
};

export default EmployeesToolbar;
