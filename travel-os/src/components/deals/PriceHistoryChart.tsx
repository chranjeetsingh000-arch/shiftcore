"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { format, parseISO } from "date-fns";

interface PricePoint {
  date: string;
  price: number;
}

interface Props {
  dealId?: string;
  route?: string;
  currentPrice: number;
  currency?: string;
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs shadow-xl">
      <p className="text-slate-400 mb-1">{label ? format(parseISO(label), "d MMM yyyy") : ""}</p>
      <p className="font-black text-slate-100">£{payload[0].value.toFixed(0)}</p>
    </div>
  );
}

export default function PriceHistoryChart({ dealId, route, currentPrice, currency = "GBP" }: Props) {
  const [history, setHistory] = useState<PricePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams({ days: "30" });
    if (dealId) params.set("deal_id", dealId);
    else if (route) params.set("route", route);

    fetch(`/api/price-history?${params}`)
      .then((r) => r.json())
      .then((d) => { setHistory(d.history ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [dealId, route]);

  const prices = history.map((h) => h.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const avg = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
  const symbol = currency === "GBP" ? "£" : currency === "USD" ? "$" : "€";
  const isBelowAvg = currentPrice < avg;

  if (loading) {
    return (
      <div className="h-40 rounded-xl bg-slate-800/50 animate-pulse" />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-200">Price History — 30 days</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Range: {symbol}{minPrice.toFixed(0)} – {symbol}{maxPrice.toFixed(0)} · Avg: {symbol}{avg.toFixed(0)}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
            isBelowAvg
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-amber-500/15 text-amber-400"
          }`}
        >
          {isBelowAvg ? `${Math.round(((avg - currentPrice) / avg) * 100)}% below avg` : "Near avg"}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={history} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fill: "#475569", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => format(parseISO(v), "d MMM")}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "#475569", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${symbol}${v}`}
            domain={["auto", "auto"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={avg}
            stroke="#64748b"
            strokeDasharray="3 3"
            strokeWidth={1}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#priceGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
