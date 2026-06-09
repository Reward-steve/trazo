import { cn } from "../../lib/utils";

type DarkCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "danger" | "accent";
  hover?: boolean;
};

export default function DarkCard({
  children,
  className,
  variant = "default",
  hover = false,
}: DarkCardProps) {
  const variants = {
    default: "bg-[#111] border-white/[0.07]",
    danger: "bg-red-500/[0.04] border-red-500/12",
    accent:
      "bg-gradient-to-b from-emerald-500/[0.06] to-[#111] border-emerald-500/30",
  };

  return (
    <div
      className={cn(
        "border rounded-2xl",
        variants[variant],
        hover &&
          "transition-all duration-200 hover:border-emerald-500/30 hover:-translate-y-px",
        className,
      )}
    >
      {children}
    </div>
  );
}
