import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "error" | "warning" | "neutral";
  className?: string;
}

export default function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  const variants = {
    success: "bg-bubble-out text-primary-dark border-primary/20",
    error:
      "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/40",
    warning: "bg-surface-alt text-text border-border",
    neutral: "bg-surface-alt text-text-muted border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
