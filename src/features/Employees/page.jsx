import React, { useState, useMemo } from 'react';
import apiClient from '@/api/apiClient';
import { useQuery } from '@tanstack/react-query';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import {
    MoreHorizontalIcon,
    ArrowLeft01Icon,
    ArrowRight01Icon,
    ArrowLeftDoubleIcon,
    ArrowRightDoubleIcon,
    Search01Icon,
    ViewIcon,
    PencilEdit01Icon,
    Delete02Icon
} from 'hugeicons-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';



const Employees = () => {
    const [globalFilter, setGlobalFilter] = useState('');

    const { data: employeesData, isLoading, error } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const response = await apiClient.get('/employees');
            return response.data.data;
        },
        staleTime: 1 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    const employees = employeesData || [];

    const columns = useMemo(() => [
        {
            accessorKey: 'fullName',
            header: 'User',
            meta: { className: "w-[140px] max-w-[140px]" },
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{row.original.fullName}</span>
                </div>
            ),
        },
        {
            accessorKey: 'email',
            header: 'Email',
            meta: { className: "hidden lg:table-cell w-[220px] max-w-[220px]" }
        },
        {
            accessorKey: 'phoneNumber',
            header: 'Phone',
            meta: { className: "hidden md:table-cell w-[140px] max-w-[140px]" }
        },
        {
            accessorKey: 'designation',
            header: 'Designation',
            meta: { className: "hidden md:table-cell" }
        },
        {
            accessorKey: 'department',
            header: 'Department',
            meta: { className: "hidden sm:table-cell" },
            cell: ({ row }) => {
                const dept = row.getValue('department');
                const variants = {
                    'Engineering': 'info',
                    'HR': 'purple',
                    'Design': 'pink',
                    'Marketing': 'amber',
                    'Operations': 'cyan'
                };
                return (
                    <Badge variant={variants[dept] || 'default'} className="rounded font-medium text-[11px] px-2 py-0 border-0">
                        {dept}
                    </Badge>
                );
            }
        },
        {
            accessorKey: 'status',
            header: 'User status',
            cell: ({ row }) => {
                const status = row.getValue('status');
                const normalizedStatus = status?.toUpperCase();
                let variant = normalizedStatus === 'ACTIVE' ? 'success' : 'slate';

                return (
                    <Badge variant={variant} className="rounded font-bold text-[10px] px-2">
                        {status}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            header: () => <div className="pl-6">Action</div>,
            cell: () => (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                        <ViewIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50">
                        <PencilEdit01Icon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                        <Delete02Icon className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ], []);

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
    });

    return (
        <div className="p-1 space-y-6">


            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-72">
                    <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search by ID"
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-9 h-10 border-gray-200"
                    />
                </div>

            </div>

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
                                        <TableCell className="hidden lg:table-cell py-4 w-[220px] max-w-[220px]">
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell py-4 w-[140px] max-w-[140px]">
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell py-4">
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell py-4">
                                            <Skeleton className="h-6 w-20 rounded" />
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
                                        {error}
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

                <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t text-sm text-gray-500 gap-4">
                    <div>
                        Total <span className="text-gray-900 font-medium">{table.getFilteredRowModel().rows.length}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                            Rows per page:
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => table.setPageSize(Number(e.target.value))}
                                className="bg-white border border-gray-200 rounded px-1 py-0.5 outline-none"
                            >
                                {[5, 10, 20].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ArrowLeft01Icon className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-1">
                                <span className="bg-gray-900 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs">
                                    {table.getState().pagination.pageIndex + 1}
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ArrowRight01Icon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employees;
