import { cn } from "@/app/lib/utils";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  accentColor?: "emerald" | "amber";
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  accentColor = "emerald",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl mx-auto text-center mb-16", className)}>
      <p
        className={cn(
          "font-bold text-sm uppercase tracking-widest mb-3",
          accentColor === "amber" ? "text-amber-400" : "text-emerald-400"
        )}
      >
        {badge}
      </p>
      <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 mt-4 text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
