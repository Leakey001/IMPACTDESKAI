"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Variant Styles ────────────────────────────────────────────────────────────
const buttonVariants = cva(
  // Base: layout, font, transitions, focus ring, disabled states
  [
    "relative inline-flex items-center justify-center gap-2",
    "overflow-hidden whitespace-nowrap font-medium",
    "transition-all duration-200 ease-in-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-blue",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-95",
  ].join(" "),
  {
    variants: {
      variant: {
        // Solid blue — primary CTA
        primary:
          "bg-primary-blue text-white rounded-2xl shadow-sm hover:bg-hoverBlue hover:-translate-y-0.5 hover:shadow-md",
        // Solid green — secondary CTA
        secondary:
          "bg-primary-green text-white rounded-2xl shadow-sm hover:brightness-110 hover:-translate-y-0.5 hover:shadow-md",
        // Outlined — tertiary action
        outline:
          "border border-neutral-300 bg-transparent text-neutral-900 rounded-2xl hover:bg-neutral-100 hover:border-primary-blue hover:text-primary-blue",
        // Subtle fill — low emphasis
        subtle:
          "bg-neutral-100 text-neutral-900 rounded-2xl hover:bg-neutral-300",
        // Ghost — minimal, usually for icon-only or nav actions
        ghost:
          "bg-transparent text-neutral-700 rounded-xl hover:bg-neutral-100 hover:text-neutral-900",
        // Link — inline text link style
        link: "bg-transparent text-primary-blue underline-offset-4 hover:underline rounded-none p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

// ─── Icon SVG (paper-plane — adapated from user inspiration) ──────────────────
function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      aria-hidden="true"
      className={className}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="currentColor"
        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
      />
    </svg>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** When true, renders the animated paper-plane icon on the right side */
  withIcon?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, withIcon = false, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // For link, ghost, icon sizes — skip the animated icon wrapper
    const showIcon =
      withIcon &&
      variant !== "link" &&
      variant !== "ghost" &&
      size !== "icon";

    if (asChild) {
      // When used as a wrapper (e.g. around <Link>), keep it plain
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          showIcon && "group pl-4 pr-5"
        )}
        ref={ref}
        {...props}
      >
        {showIcon && (
          // Icon wrapper — animates up/down on hover (fly effect)
          <span
            className="relative flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:animate-fly"
          >
            <PaperPlaneIcon
              className="
                block origin-center
                transition-transform duration-300 ease-in-out
                group-hover:translate-x-4 group-hover:rotate-45 group-hover:scale-110
              "
            />
          </span>
        )}

        {/* Label — slides right on hover when icon is shown */}
        <span
          className={cn(
            "flex items-center justify-center transition-transform duration-300 ease-in-out",
            showIcon && "group-hover:translate-x-8"
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
