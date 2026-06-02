import { cn } from "../../lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      children,
      disabled,
      href,
      ...props
    },
    ref,
  ) => {
    const base = cn(
      "inline-flex items-center justify-center gap-2",
      "font-medium",
      "rounded-xl",
      "transition-all duration-200",
      "active:scale-[0.98]",
      "disabled:opacity-50 disabled:pointer-events-none",
      "focus:outline-none focus:ring-2 focus:ring-primary/30",
    );

    const variants = {
      primary: cn(
        "bg-primary",
        "text-white",
        "hover:bg-primary-dark",
        "shadow-sm",
      ),

      secondary: cn(
        "bg-surface",
        "text-text",
        "border border-border",
        "hover:bg-surface-alt",
      ),

      ghost: cn("text-text-muted", "hover:text-text", "hover:bg-surface-alt"),

      outline: cn(
        "bg-transparent",
        "text-text",
        "border border-border",
        "hover:bg-surface-alt",
      ),

      danger: cn("bg-red-500", "text-white", "hover:bg-red-600"),
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    const classes = cn(base, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              className="opacity-20"
            />
            <path
              fill="currentColor"
              className="opacity-80"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}

        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
