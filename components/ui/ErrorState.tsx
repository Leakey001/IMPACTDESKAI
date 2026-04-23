import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";

export function ErrorState({
  title = "Something went wrong",
  description = "We encountered an error processing your request.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-card border border-neutral-300 p-8 text-center", className)}>
      <AlertCircle className="mb-4 h-12 w-12 text-rose-500" />
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 max-w-sm text-sm text-neutral-700">{description}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
