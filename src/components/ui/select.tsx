import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { forwardRef } from "react";

const Select = React.forwardRef<
    HTMLSelectElement,
    React.HTMLProps<HTMLSelectElement>
>(({ className, ...props }, ref) => {
    return (
        <div className="relative">
            <select
                className={cn(
                    "h-10 w-full appearance-none truncate rounded-md border border-input bg-background py-2 pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
                ref={ref}
            />
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 ring-red-300" />
        </div>
    );
});

export default Select;
