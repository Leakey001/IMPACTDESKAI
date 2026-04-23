import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Card ─────────────────────────────────────────────────────────────────────
// Inspiration: expanding bubble hover effect + corner arrow accent
// The ::before bubble is replicated via a <span> sibling inside the card.
// All child text transitions to white on hover via group-hover utilities.

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  /** Show the top-right corner arrow accent (default: true) */
  showCornerArrow?: boolean;
  /** Disable the bubble hover fill entirely (e.g. for plain utility cards) */
  noBubble?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass, showCornerArrow = true, noBubble = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Base
        "group relative overflow-hidden rounded-xl border border-neutral-100",
        "bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE]", // light blue gradient (brand-aligned)
        "text-neutral-900 shadow-sm",
        "transition-shadow duration-300 hover:shadow-lg",
        // Glass variant
        glass && "glass-card border-white/20",
        className
      )}
      {...props}
    >
      {/* ── Expanding bubble (the ::before equivalent) ──────────────────────── */}
      {!noBubble && (
        <span
          aria-hidden="true"
          style={{ background: "rgba(37, 99, 235, 0.18)" }}
          className={cn(
            "pointer-events-none absolute -top-4 -right-4 z-0",
            "h-8 w-8 rounded-full",
            // Scale up on group hover to fill the card
            "scale-100 transition-transform duration-[350ms] ease-out",
            "group-hover:scale-[28]"
          )}
        />
      )}

      {/* ── Corner arrow accent ─────────────────────────────────────────────── */}
      {showCornerArrow && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0 right-0 z-10",
            "flex h-8 w-8 items-center justify-center",
            "rounded-bl-3xl rounded-tr-xl",
            "bg-gradient-to-br from-primary-blue to-[#1e3a5f]",
            "text-white text-sm font-mono leading-none",
            // Fade out once bubble fills card (so it doesn't look odd)
            "transition-opacity duration-200 group-hover:opacity-0"
          )}
        >
          →
        </span>
      )}

      {/* ── Card content (sits above the bubble via z-10) ───────────────────── */}
      <div className="relative z-10">{children}</div>
    </div>
  )
);
Card.displayName = "Card";

// ─── CardHeader ───────────────────────────────────────────────────────────────
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

// ─── CardTitle ────────────────────────────────────────────────────────────────
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "font-bold leading-snug tracking-tight text-neutral-900",
        // Text stays dark — readable over transparent blue bubble
        "transition-colors duration-300",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// ─── CardDescription ──────────────────────────────────────────────────────────
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-sm text-neutral-600 leading-relaxed",
        // Text stays dark — readable over transparent blue bubble
        "transition-colors duration-300",
        className
      )}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

// ─── CardContent ──────────────────────────────────────────────────────────────
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

// ─── CardFooter ───────────────────────────────────────────────────────────────
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0",
        "transition-colors duration-500",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
