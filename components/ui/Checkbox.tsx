"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    // using a native checkbox with appearance-none and custom styling
    return (
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className={cn(
            "peer h-4 w-4 shrink-0 appearance-none rounded-sm border border-primary-blue bg-background focus-ring disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary-blue checked:text-white",
            className
          )}
          ref={ref}
          onChange={(e) => {
            if (onCheckedChange) onCheckedChange(e.target.checked);
            if (props.onChange) props.onChange(e);
          }}
          {...props}
        />
        <Check className="pointer-events-none absolute hidden h-3 w-3 text-white peer-checked:block" />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
