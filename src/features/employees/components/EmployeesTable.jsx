import React from 'react';
import { flexRender } from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import EmployeesPagination from './EmployeesPagination';

const EmployeesTable = ({ table, isLoading, error }) => {
    const columns = table.getAllColumns();

    return (
        <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={cn(
                                            "text-gray-900 font-semibold h-11 whitespace-nowrap",
                                            header.column.columnDef.meta?.className
                                        )}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i} className="hover:bg-transparent">
                                    <TableCell className="py-4 w-[140px] max-w-[140px]">
                                        <Skeleton className="h-4 w-full" />
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell py-4 w-[220px] max-w-[220px]">
                                        <Skeleton className="h-4 w-full" />
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell py-4 w-[140px] max-w-[140px]">
                                        <Skeleton className="h-4 w-full" />
                                    </TableCell>
                                    <TableCell className="py-4 w-[120px]">
                                        <Skeleton className="h-4 w-full" />
                                    </TableCell>
                                    <TableCell className="py-4 w-[100px]">
                                        <Skeleton className="h-6 w-full rounded" />
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Skeleton className="h-6 w-16 rounded" />
                                    </TableCell>
                                    <TableCell className="py-4 pl-6">
                                        <div className="flex items-center gap-1">
                                            <Skeleton className="h-8 w-8 rounded-md" />
                                            <Skeleton className="h-8 w-8 rounded-md" />
                                            <Skeleton className="h-8 w-8 rounded-md" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-red-500">
                                    {error.message || 'An error occurred'}
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                "py-3 whitespace-nowrap",
                                                cell.column.columnDef.meta?.className
                                            )}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <EmployeesPagination table={table} />
        </div>
    );
};

export default EmployeesTable;
