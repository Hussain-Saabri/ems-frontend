import React from 'react';
import { ArrowLeft01Icon, ArrowRight01Icon } from 'hugeicons-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const EmployeesPagination = ({ table, position = 'bottom' }) => {
    const rowCount = table.getFilteredRowModel().rows.length;

    if (rowCount <= 5 && table.getPageCount() <= 1) return null;

    return (
        <div className={cn(
            "flex flex-col sm:flex-row items-center justify-end px-4 py-4 text-sm text-gray-500 gap-4",
            position === 'top' ? 'border-b hidden sm:flex' : 'border-t flex'
        )}>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-gray-500 w-full sm:w-auto justify-center sm:justify-end">
                {((position === 'top' && rowCount > 5) || (position === 'bottom' && rowCount > 5)) && (
                    <div className={cn(
                        "items-center gap-2",
                        position === 'top' ? "flex" : "flex sm:hidden"
                    )}>
                        Rows per page:
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => table.setPageSize(Number(e.target.value))}
                            className="bg-white border border-gray-200 rounded px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                        >
                            {[5, 10, 20].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {table.getPageCount() > 1 && (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0 border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ArrowLeft01Icon className="h-4 w-4 text-gray-600" />
                        </Button>
                        <div className="flex items-center gap-1.5 px-2">
                            <span className="text-gray-900 font-bold min-w-[1.25rem] text-center">
                                {table.getState().pagination.pageIndex + 1}
                            </span>
                            <span className="text-gray-400">of</span>
                            <span className="text-gray-900 font-bold min-w-[1.25rem] text-center">
                                {table.getPageCount()}
                            </span>
                        </div>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0 border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ArrowRight01Icon className="h-4 w-4 text-gray-600" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeesPagination;
