import type { ReactNode } from "react";

type BadgeVariant =
  | "open"
  | "limited"
  | "full"
  | "waitlist"
  | "enrolled"
  | "waitlisted"
  | "active"
  | "inactive"
  | "neutral";

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  size?: "sm" | "md";
  dot?: boolean;
}

const styles: Record<BadgeVariant, string> = {
  open:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  limited:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  full:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  waitlist:
    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
  enrolled:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  waitlisted:
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
  active:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  inactive:
    "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  neutral:
    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
};

const dotColors: Record<BadgeVariant, string> = {
  open: "bg-emerald-500",
  limited: "bg-amber-500",
  full: "bg-red-500",
  waitlist: "bg-purple-500",
  enrolled: "bg-emerald-500",
  waitlisted: "bg-orange-500",
  active: "bg-emerald-500",
  inactive: "bg-slate-400",
  neutral: "bg-slate-400",
};

export function Badge({
  variant,
  children,
  size = "sm",
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${
        styles[variant]
      } ${
        size === "sm"
          ? "px-2.5 py-0.5 text-xs"
          : "px-3 py-1 text-sm"
      }`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColors[variant]
          } ${
            variant === "open" || variant === "active"
              ? "animate-pulse"
              : ""
          }`}
        />
      )}
      {children}
    </span>
  );
}