import Link from "next/link";
import { cn } from "../../lib/utils";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";

  const variants = {
    primary:
      "bg-emerald-500 text-black hover:bg-emerald-400 active:scale-[0.98] shadow-lg shadow-emerald-500/20",
    outline:
      "border border-white/15 bg-transparent hover:border-white/30 hover:bg-white/5 active:scale-[0.98]",
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-6 py-3.5 font-bold",
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
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
