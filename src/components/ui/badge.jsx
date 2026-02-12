import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
                success: "border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-200/80",
                warning: "border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200/80",
                info: "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200/80",
                purple: "border-transparent bg-purple-100 text-purple-700 hover:bg-purple-200/80",
                pink: "border-transparent bg-pink-100 text-pink-700 hover:bg-pink-200/80",
                amber: "border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200/80",
                cyan: "border-transparent bg-cyan-100 text-cyan-700 hover:bg-cyan-200/80",
                slate: "border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200/80",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function Badge({ className, variant, ...props }) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
