import { cn } from "@/app/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "accent" | "danger";
}

export default function DarkCard({
  children,
  className,
  hover = false,
  variant = "default",
}: CardProps) {
  const variants = {
    default: "bg-[#111] border border-white/5",
    accent: "bg-emerald-950/40 border border-emerald-500/30",
    danger: "bg-red-950/20 border border-red-900/20",
  };

  return (
    <div
      className={cn(
        "rounded-2xl",
        variants[variant],
        hover &&
          "hover:border-emerald-500/30 hover:bg-emerald-950/10 transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
