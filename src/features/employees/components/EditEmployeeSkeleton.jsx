import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function EditEmployeeSkeleton() {
    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            {/* Header Section Skeleton */}
            <div className="flex items-center gap-4">
                <div className="rounded-full h-10 w-10 bg-gray-100 animate-shimmer" />
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-gray-100 rounded-lg animate-shimmer" />
                    <div className="h-4 w-64 bg-gray-50 rounded-md animate-shimmer" />
                </div>
            </div>

            {/* Form Card Skeleton */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 w-24 bg-gray-100 rounded animate-shimmer" />
                                <div className="h-11 w-full bg-gray-50 rounded-xl animate-shimmer border border-gray-100/50" />
                            </div>
                        ))}

                        {/* Status Toggle Skeleton */}
                        <div className="space-y-3 col-span-full md:col-span-1">
                            <div className="h-4 w-20 bg-gray-100 rounded animate-shimmer" />
                            <div className="flex gap-6">
                                <div className="h-6 w-20 bg-gray-50 rounded-full animate-shimmer" />
                                <div className="h-6 w-24 bg-gray-50 rounded-full animate-shimmer" />
                            </div>
                        </div>
                    </div>

                    {/* Actions Skeleton */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                        <div className="h-11 w-24 bg-gray-100 rounded-lg animate-shimmer" />
                        <div className="h-11 w-32 bg-gray-200 rounded-lg animate-shimmer" />
                    </div>
                </div>
            </div>
        </div>
    );
}
