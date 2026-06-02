import { cn } from "../../lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className,
      )}
    >
      {icon && (
        <div className="mb-4 h-16 w-16 bg-bubble-out rounded-2xl flex items-center justify-center text-primary-dark">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-bold text-text mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-text-muted mb-6 max-w-xs leading-relaxed">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
