import { cn } from "../../lib/utils";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  accentColor?: "emerald" | "amber";
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  accentColor = "emerald",
  align = "center",
  className,
}: SectionHeaderProps) {
  const isAmber = accentColor === "amber";

  return (
    <div
      className={cn(
        "mb-14",
        align === "center" ? "max-w-2xl mx-auto text-center" : "max-w-2xl",
        className,
      )}
    >
      {/* Badge pill */}
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1 mb-5",
          isAmber
            ? "bg-amber-500/8 border-amber-500/20"
            : "bg-emerald-500/8 border-emerald-500/20",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            isAmber ? "bg-amber-400" : "bg-emerald-400",
          )}
        />
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-widest",
            isAmber ? "text-amber-400" : "text-emerald-400",
          )}
        >
          {badge}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-black text-white leading-[1.12] tracking-tight">
        {title}
      </h2>

      {/* Accent underline */}
      <div
        className={cn(
          "mt-4 h-px w-12 rounded-full",
          align === "center" ? "mx-auto" : "",
          isAmber
            ? "bg-gradient-to-r from-amber-500/60 to-transparent"
            : "bg-gradient-to-r from-emerald-500/60 to-transparent",
        )}
      />

      {/* Optional subtitle */}
      {subtitle && (
        <p className="text-gray-400 mt-5 text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
