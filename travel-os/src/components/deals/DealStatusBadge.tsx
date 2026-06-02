import { cn } from "@/lib/utils";
import type { DealStatus } from "@/lib/data";

const CONFIG: Record<
  DealStatus,
  { label: string; className: string; dot: string }
> = {
  LIVE: {
    label: "LIVE",
    className:
      "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    dot: "bg-emerald-400",
  },
  COOLING: {
    label: "COOLING",
    className: "bg-amber-500/15 border-amber-500/30 text-amber-400",
    dot: "bg-amber-400",
  },
  EXPIRED: {
    label: "EXPIRED",
    className: "bg-slate-700/40 border-slate-600/30 text-slate-500",
    dot: "bg-slate-500",
  },
  UNVERIFIED: {
    label: "UNVERIFIED",
    className: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    dot: "bg-blue-400",
  },
};

export default function DealStatusBadge({ status }: { status: DealStatus }) {
  const cfg = CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wider",
        cfg.className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          cfg.dot,
          status === "LIVE" && "animate-pulse"
        )}
      />
      {cfg.label}
    </span>
  );
}
