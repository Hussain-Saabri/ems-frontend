import React from 'react';
import { Link } from 'react-router-dom';
import { ViewIcon, PencilEdit01Icon, Delete02Icon } from 'hugeicons-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const getEmployeeColumns = (onAction) => [
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
        meta: { className: "hidden sm:table-cell w-[220px] max-w-[220px]" }
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone',
        meta: { className: "hidden md:table-cell w-[140px] max-w-[140px]" }
    },
    {
        accessorKey: 'designation',
        header: 'Designation',
        meta: { className: "w-[120px]" }
    },
    {
        accessorKey: 'department',
        header: 'Department',
        meta: { className: "w-[100px]" },
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
        cell: ({ row }) => (
            <div className="flex items-center gap-1">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link to={`/employees/${row.original.employeeId}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                                <ViewIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                        <p>View Details</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link to={`/employees/edit/${row.original.employeeId}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50">
                                <PencilEdit01Icon className="h-4 w-4" />
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                        <p>Edit Employee</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            onClick={() => onAction('delete', row.original)}
                        >
                            <Delete02Icon className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                        <p>Delete Employee</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        ),
    },
];
